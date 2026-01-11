import { DB_VERSION } from './version.js';

/**
 * Migration system for database schema updates
 * Each migration is idempotent and can be run multiple times safely
 */
export const migrations = [
	{
		version: 1,
		up: async (db) => {
			// Create workouts store
			if (!db.objectStoreNames.contains('workouts')) {
				const workoutStore = db.createObjectStore('workouts', {
					keyPath: 'id',
					autoIncrement: true
				});
				workoutStore.createIndex('date', 'date', { unique: false });
				workoutStore.createIndex('type', 'type', { unique: false });
			}

			// Create exercises store (for custom exercises)
			if (!db.objectStoreNames.contains('exercises')) {
				const exerciseStore = db.createObjectStore('exercises', {
					keyPath: 'id',
					autoIncrement: true
				});
				exerciseStore.createIndex('name', 'name', { unique: true });
			}

			// Create settings store
			if (!db.objectStoreNames.contains('settings')) {
				const settingsStore = db.createObjectStore('settings', {
					keyPath: 'key'
				});
			}

			// Create meta store
			if (!db.objectStoreNames.contains('meta')) {
				const metaStore = db.createObjectStore('meta', {
					keyPath: 'key'
				});
			}

			// Initialize default schedule
			const metaTransaction = db.transaction('meta', 'readwrite');
			const metaStore = metaTransaction.objectStore('meta');
			
			// Set default schedule: Monday (1), Wednesday (3), Thursday (4), Saturday (6)
			await metaStore.put({ key: 'schedule', value: [1, 3, 4, 6] });
			await metaStore.put({ key: 'dbVersion', value: 1 });
			await metaStore.put({ key: 'appVersion', value: '1.0.0' });
		}
	}
	// Future migrations go here:
	// {
	//   version: 2,
	//   up: async (db) => {
	//     // Migration logic
	//   }
	// }
];

/**
 * Run migrations to bring database to current version
 */
export async function runMigrations(db) {
	const metaTransaction = db.transaction('meta', 'readwrite');
	const metaStore = metaTransaction.objectStore('meta');
	
	// Get current version
	let currentVersion = 0;
	try {
		const versionRecord = await metaStore.get('dbVersion');
		if (versionRecord) {
			currentVersion = versionRecord.value || 0;
		}
	} catch (e) {
		// First time setup
		currentVersion = 0;
	}

	// Run migrations
	for (const migration of migrations) {
		if (migration.version > currentVersion) {
			console.log(`Running migration ${migration.version}...`);
			await migration.up(db);
			
			// Update version
			await metaStore.put({ key: 'dbVersion', value: migration.version });
			currentVersion = migration.version;
		}
	}

	return currentVersion;
}
