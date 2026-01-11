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

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			// Create stores if they don't exist (synchronous during upgrade)
			if (!db.objectStoreNames.contains('workouts')) {
				const workoutStore = db.createObjectStore('workouts', {
					keyPath: 'id',
					autoIncrement: true
				});
				workoutStore.createIndex('date', 'date', { unique: false });
				workoutStore.createIndex('type', 'type', { unique: false });
			}

			if (!db.objectStoreNames.contains('exercises')) {
				const exerciseStore = db.createObjectStore('exercises', {
					keyPath: 'id',
					autoIncrement: true
				});
				exerciseStore.createIndex('name', 'name', { unique: true });
			}

			if (!db.objectStoreNames.contains('settings')) {
				db.createObjectStore('settings', {
					keyPath: 'key'
				});
			}

			if (!db.objectStoreNames.contains('meta')) {
				db.createObjectStore('meta', {
					keyPath: 'key'
				});
			}
		};

		request.onsuccess = async () => {
			const db = request.result;
			
			// Initialize defaults and run migrations after database is open
			try {
				// Check if meta store exists
				const hasMeta = db.objectStoreNames.contains('meta');
				if (!hasMeta) {
					console.error('ERROR: meta store does not exist!');
					reject(new Error('Database stores not created properly'));
					return;
				}
				
				// Check if database is initialized (has version)
				let isInitialized = false;
				try {
					const metaTransaction = db.transaction('meta', 'readonly');
					const metaStore = metaTransaction.objectStore('meta');
					const versionCheck = await new Promise((resolve, reject) => {
						const request = metaStore.get('dbVersion');
						request.onsuccess = () => resolve(request.result);
						request.onerror = () => reject(request.error);
					});
					
					isInitialized = !!versionCheck;
				} catch (e) {
					console.log('Could not check version, will initialize:', e);
					isInitialized = false;
				}
				
				// If not initialized, set defaults
				if (!isInitialized) {
					console.log('Initializing database defaults...');
					const initTransaction = db.transaction('meta', 'readwrite');
					const initStore = initTransaction.objectStore('meta');
					await new Promise((resolve, reject) => {
						const putSchedule = initStore.put({ key: 'schedule', value: [1, 3, 4, 6] });
						putSchedule.onsuccess = () => {
							const putVersion = initStore.put({ key: 'dbVersion', value: 1 });
							putVersion.onsuccess = () => {
								const putAppVersion = initStore.put({ key: 'appVersion', value: '1.0.0' });
								putAppVersion.onsuccess = () => {
									console.log('Database initialized successfully');
									resolve();
								};
								putAppVersion.onerror = () => reject(putAppVersion.error);
							};
							putVersion.onerror = () => reject(putVersion.error);
						};
						putSchedule.onerror = () => reject(putSchedule.error);
					});
				}
				
				// Run migrations to check for updates (should be no-op for version 1)
				await runMigrations(db);
			} catch (error) {
				console.error('Error initializing database:', error);
				reject(error);
				return;
			}
			
			dbInstance = db;
			resolve(db);
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
