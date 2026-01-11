import { runMigrations } from './migrations.js';
import { DB_VERSION } from './version.js';

const DB_NAME = 'ppl-tracker';
let dbInstance = null;

/**
 * Initialize and return database instance
 */
export async function initDB() {
	if (dbInstance) {
		return dbInstance;
	}

	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => {
			reject(new Error('Failed to open database'));
		};

		request.onsuccess = async () => {
			const db = request.result;
			
			// Run migrations
			try {
				await runMigrations(db);
				dbInstance = db;
				resolve(db);
			} catch (error) {
				reject(error);
			}
		};

		request.onupgradeneeded = async (event) => {
			const db = event.target.result;
			// Migrations handle schema creation/updates
			await runMigrations(db);
		};
	});
}

/**
 * Get database instance (must call initDB first)
 */
export function getDB() {
	if (!dbInstance) {
		throw new Error('Database not initialized. Call initDB() first.');
	}
	return dbInstance;
}

// Workout operations
export async function saveWorkout(workout) {
	const db = await initDB();
	const transaction = db.transaction('workouts', 'readwrite');
	const store = transaction.objectStore('workouts');
	
	return new Promise((resolve, reject) => {
		const request = store.put(workout);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function getWorkout(id) {
	const db = await initDB();
	const transaction = db.transaction('workouts', 'readonly');
	const store = transaction.objectStore('workouts');
	
	return new Promise((resolve, reject) => {
		const request = store.get(id);
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllWorkouts() {
	const db = await initDB();
	const transaction = db.transaction('workouts', 'readonly');
	const store = transaction.objectStore('workouts');
	const index = store.index('date');
	
	return new Promise((resolve, reject) => {
		const request = index.getAll();
		request.onsuccess = () => {
			const workouts = request.result || [];
			// Sort by date descending
			workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
			resolve(workouts);
		};
		request.onerror = () => reject(request.error);
	});
}

export async function getWorkoutsByDateRange(startDate, endDate) {
	const db = await initDB();
	const transaction = db.transaction('workouts', 'readonly');
	const store = transaction.objectStore('workouts');
	const index = store.index('date');
	
	return new Promise((resolve, reject) => {
		const range = IDBKeyRange.bound(startDate, endDate);
		const request = index.getAll(range);
		request.onsuccess = () => resolve(request.result || []);
		request.onerror = () => reject(request.error);
	});
}

export async function deleteWorkout(id) {
	const db = await initDB();
	const transaction = db.transaction('workouts', 'readwrite');
	const store = transaction.objectStore('workouts');
	
	return new Promise((resolve, reject) => {
		const request = store.delete(id);
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

// Settings operations
export async function getSetting(key) {
	const db = await initDB();
	const transaction = db.transaction('settings', 'readonly');
	const store = transaction.objectStore('settings');
	
	return new Promise((resolve, reject) => {
		const request = store.get(key);
		request.onsuccess = () => {
			const result = request.result;
			resolve(result ? result.value : null);
		};
		request.onerror = () => reject(request.error);
	});
}

export async function setSetting(key, value) {
	const db = await initDB();
	const transaction = db.transaction('settings', 'readwrite');
	const store = transaction.objectStore('settings');
	
	return new Promise((resolve, reject) => {
		const request = store.put({ key, value });
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

// Meta operations
export async function getMeta(key) {
	const db = await initDB();
	const transaction = db.transaction('meta', 'readonly');
	const store = transaction.objectStore('meta');
	
	return new Promise((resolve, reject) => {
		const request = store.get(key);
		request.onsuccess = () => {
			const result = request.result;
			resolve(result ? result.value : null);
		};
		request.onerror = () => reject(request.error);
	});
}

export async function setMeta(key, value) {
	const db = await initDB();
	const transaction = db.transaction('meta', 'readwrite');
	const store = transaction.objectStore('meta');
	
	return new Promise((resolve, reject) => {
		const request = store.put({ key, value });
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});
}

// Export all data
export async function exportData() {
	const db = await initDB();
	
	const workouts = await getAllWorkouts();
	
	// Get all custom exercises
	const exerciseTransaction = db.transaction('exercises', 'readonly');
	const exerciseStore = exerciseTransaction.objectStore('exercises');
	const exercises = await new Promise((resolve, reject) => {
		const request = exerciseStore.getAll();
		request.onsuccess = () => resolve(request.result || []);
		request.onerror = () => reject(request.error);
	});
	
	// Get all settings
	const settingsTransaction = db.transaction('settings', 'readonly');
	const settingsStore = settingsTransaction.objectStore('settings');
	const settings = await new Promise((resolve, reject) => {
		const request = settingsStore.getAll();
		request.onsuccess = () => {
			const result = request.result || [];
			const settingsObj = {};
			result.forEach(item => {
				settingsObj[item.key] = item.value;
			});
			resolve(settingsObj);
		};
		request.onerror = () => reject(request.error);
	});
	
	const { APP_VERSION } = await import('./version.js');
	
	return {
		version: APP_VERSION,
		exportDate: new Date().toISOString(),
		workouts,
		exercises,
		settings
	};
}
