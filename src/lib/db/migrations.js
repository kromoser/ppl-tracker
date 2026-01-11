import { DB_VERSION } from './version.js';

/**
 * Migration system for database schema updates
 * Each migration is idempotent and can be run multiple times safely
 */
export const migrations = [
	{
		version: 1,
		up: async (db) => {
			// Migration 1: Initial schema
			// Stores are created synchronously in db.js onupgradeneeded
			// This migration just marks version 1 as complete
			// Data initialization happens in db.js onsuccess handler
			console.log('Migration 1: Schema already created in onupgradeneeded');
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
	// Check if meta store exists (for version checking)
	const hasMetaStore = db.objectStoreNames.contains('meta');
	
	// Get current version (only if meta store exists)
	let currentVersion = 0;
	if (hasMetaStore) {
		try {
			const metaTransaction = db.transaction('meta', 'readonly');
			const metaStore = metaTransaction.objectStore('meta');
			const versionRecord = await new Promise((resolve, reject) => {
				const request = metaStore.get('dbVersion');
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);
			});
			
			if (versionRecord) {
				currentVersion = versionRecord.value || 0;
			}
		} catch (e) {
			// If we can't read version, assume 0 (first time setup)
			console.log('Could not read version, assuming first setup:', e);
			currentVersion = 0;
		}
	}

	// Run migrations
	for (const migration of migrations) {
		if (migration.version > currentVersion) {
			console.log(`Running migration ${migration.version}...`);
			await migration.up(db);
			
			// Update version (only if meta store exists now)
			if (db.objectStoreNames.contains('meta')) {
				const metaTransaction = db.transaction('meta', 'readwrite');
				const metaStore = metaTransaction.objectStore('meta');
				await new Promise((resolve, reject) => {
					const request = metaStore.put({ key: 'dbVersion', value: migration.version });
					request.onsuccess = () => resolve();
					request.onerror = () => reject(request.error);
				});
			}
			currentVersion = migration.version;
		}
	}

	return currentVersion;
}
