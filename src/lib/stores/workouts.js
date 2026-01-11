import { writable } from 'svelte/store';
import { getAllWorkouts, saveWorkout, deleteWorkout, getWorkoutsByDateRange } from '../db/db.js';

function createWorkoutsStore() {
	const { subscribe, set, update } = writable([]);
	
	return {
		subscribe,
		load: async () => {
			const workouts = await getAllWorkouts();
			set(workouts);
			return workouts;
		},
		add: async (workout) => {
			const id = await saveWorkout(workout);
			const newWorkout = { ...workout, id };
			update(workouts => [...workouts, newWorkout].sort((a, b) => new Date(b.date) - new Date(a.date)));
			return newWorkout;
		},
		update: async (workout) => {
			await saveWorkout(workout);
			update(workouts => {
				const index = workouts.findIndex(w => w.id === workout.id);
				if (index !== -1) {
					workouts[index] = workout;
				}
				return [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));
			});
		},
		remove: async (id) => {
			await deleteWorkout(id);
			update(workouts => workouts.filter(w => w.id !== id));
		},
		getByDateRange: async (startDate, endDate) => {
			return await getWorkoutsByDateRange(startDate, endDate);
		}
	};
}

export const workouts = createWorkoutsStore();
