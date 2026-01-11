import { writable } from 'svelte/store';
import { getSetting, setSetting, getMeta, setMeta } from '../db/db.js';

function createSettingsStore() {
	const { subscribe, set, update } = writable({
		schedule: [1, 3, 4, 6], // Monday, Wednesday, Thursday, Saturday
		programStartDate: null
	});
	
	return {
		subscribe,
		load: async () => {
			const schedule = await getMeta('schedule') || [1, 3, 4, 6];
			const programStartDate = await getSetting('programStartDate');
			const settings = { schedule, programStartDate };
			set(settings);
			return settings;
		},
		setSchedule: async (schedule) => {
			await setMeta('schedule', schedule);
			update(s => ({ ...s, schedule }));
		},
		setProgramStartDate: async (date) => {
			await setSetting('programStartDate', date);
			update(s => ({ ...s, programStartDate: date }));
		}
	};
}

export const settings = createSettingsStore();
