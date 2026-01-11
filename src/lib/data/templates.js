/**
 * Workout templates extracted from the plan
 */

export const workoutTemplates = {
	'Push': {
		type: 'Push',
		name: 'Push Day (Upper Body Emphasis)',
		duration: '35-40 minutes',
		focus: 'Chest, shoulders, triceps',
		exercises: [
			{
				name: 'Dumbbell Bench Press',
				machineOption: 'Chest Press Machine',
				dumbbellOption: 'Dumbbell Bench Press',
				sets: 4,
				reps: '8-10',
				rest: 90,
				equipment: 'Dumbbell'
			},
			{
				name: 'Incline Dumbbell Press',
				machineOption: 'Incline Chest Machine',
				dumbbellOption: 'Incline Dumbbell Press',
				sets: 3,
				reps: '10-12',
				rest: 75,
				equipment: 'Dumbbell'
			},
			{
				name: 'Overhead Shoulder Press',
				machineOption: 'Shoulder Press Machine',
				dumbbellOption: 'Dumbbell Shoulder Press',
				sets: 3,
				reps: '8-10',
				rest: 90,
				equipment: 'Dumbbell'
			},
			{
				name: 'Lateral Raises',
				machineOption: 'Lateral Raise Machine',
				dumbbellOption: 'Dumbbell Lateral Raises',
				sets: 3,
				reps: '12-15',
				rest: 60,
				equipment: 'Dumbbell'
			},
			{
				name: 'Tricep Dips',
				machineOption: 'Tricep Dip Machine',
				dumbbellOption: 'Bench Dips (bodyweight)',
				sets: 3,
				reps: '8-12',
				rest: 75,
				equipment: 'Bodyweight'
			},
			{
				name: 'Overhead Tricep Extension',
				machineOption: 'Cable Extension Machine',
				dumbbellOption: 'Single Dumbbell Overhead Extension',
				sets: 2,
				reps: '10-12',
				rest: 60,
				equipment: 'Dumbbell'
			}
		],
		notes: 'Start with weights that allow you to complete reps 1-3 with moderate difficulty but reps 8-10 with high effort. Compound movements (bench and shoulder press) come first when energy is highest.'
	},
	'Pull': {
		type: 'Pull',
		name: 'Pull Day (Back & Biceps)',
		duration: '35-40 minutes',
		focus: 'Lats, back, biceps',
		exercises: [
			{
				name: 'Lat Pulldown',
				machineOption: 'Lat Pulldown Machine',
				dumbbellOption: 'Single Arm Dumbbell Rows',
				sets: 4,
				reps: '8-10',
				rest: 90,
				equipment: 'Machine'
			},
			{
				name: 'Bent-Over Dumbbell Row',
				machineOption: 'Seated Row Machine',
				dumbbellOption: 'Bent-Over Dumbbell Rows',
				sets: 3,
				reps: '8-10',
				rest: 90,
				equipment: 'Dumbbell'
			},
			{
				name: 'Bicep Curls',
				machineOption: 'Cable Bicep Curl',
				dumbbellOption: 'Dumbbell Bicep Curls',
				sets: 3,
				reps: '10-12',
				rest: 75,
				equipment: 'Dumbbell'
			},
			{
				name: 'Incline Dumbbell Curls',
				machineOption: 'Adjustable Cable Curl',
				dumbbellOption: 'Incline Bench Dumbbell Curls',
				sets: 3,
				reps: '10-12',
				rest: 75,
				equipment: 'Dumbbell'
			},
			{
				name: 'Face Pulls',
				machineOption: 'Cable Face Pull Machine',
				dumbbellOption: 'Resistance Band Face Pulls',
				sets: 2,
				reps: '12-15',
				rest: 60,
				equipment: 'Machine'
			},
			{
				name: 'Reverse Flyes',
				machineOption: 'Pec Deck (Reverse)',
				dumbbellOption: 'Dumbbell Reverse Flyes',
				sets: 2,
				reps: '12-15',
				rest: 60,
				equipment: 'Dumbbell'
			}
		],
		notes: 'Rowing movements emphasize back thickness while bicep curls build arm definition. Incline curls target the long head of the biceps for peak definition. Face pulls and reverse flyes help posture and shoulder health.'
	},
	'Push + Core': {
		type: 'Push + Core',
		name: 'Push Day + Core',
		duration: '40-45 minutes',
		focus: 'Upper chest/shoulders, triceps, core',
		exercises: [
			{
				name: 'Incline Bench Press',
				machineOption: 'Incline Press Machine',
				dumbbellOption: 'Incline Dumbbell Press',
				sets: 4,
				reps: '8-10',
				rest: 90,
				equipment: 'Dumbbell'
			},
			{
				name: 'Dumbbell Shoulder Press',
				machineOption: 'Shoulder Press Machine',
				dumbbellOption: 'Dumbbell Shoulder Press',
				sets: 3,
				reps: '8-10',
				rest: 90,
				equipment: 'Dumbbell'
			},
			{
				name: 'Push-Ups',
				machineOption: 'Assisted Push-Up Machine',
				dumbbellOption: 'Bodyweight or Elevated Push-Ups',
				sets: 3,
				reps: '8-15',
				rest: 75,
				equipment: 'Bodyweight'
			},
			{
				name: 'Tricep Pushdown',
				machineOption: 'Rope Pushdown Machine',
				dumbbellOption: 'Overhead Dumbbell Extension',
				sets: 3,
				reps: '10-12',
				rest: 60,
				equipment: 'Machine'
			},
			{
				name: 'Plank Variations',
				machineOption: 'Core Machine',
				dumbbellOption: 'High Plank or Forearm Plank',
				sets: 3,
				reps: '30-60 sec',
				rest: 60,
				equipment: 'Bodyweight'
			},
			{
				name: 'Pallof Press',
				machineOption: 'Cable Pallof Machine',
				dumbbellOption: 'Single Dumbbell Pallof Press',
				sets: 3,
				reps: '10/side',
				rest: 60,
				equipment: 'Dumbbell'
			},
			{
				name: 'Dead Bug',
				machineOption: 'N/A (Bodyweight)',
				dumbbellOption: 'Bodyweight Dead Bug',
				sets: 2,
				reps: '12/side',
				rest: 45,
				equipment: 'Bodyweight'
			}
		],
		notes: 'This day targets the upper chest from a different angle and provides substantial core work. The Pallof press is excellent for anti-rotation core strength and oblique definition. Reduce tricep volume slightly since you worked it on Day 1.'
	},
	'Pull + Lower Body': {
		type: 'Pull + Lower Body',
		name: 'Pull + Lower Body (Glute Focused)',
		duration: '40-45 minutes',
		focus: 'Back, biceps, glute activation',
		exercises: [
			{
				name: 'Single Arm Dumbbell Row',
				machineOption: 'Seated Row Machine',
				dumbbellOption: 'Single Arm Dumbbell Rows',
				sets: 4,
				reps: '8-10',
				rest: 90,
				equipment: 'Dumbbell'
			},
			{
				name: 'Lat Pulldown',
				machineOption: 'Lat Pulldown Machine',
				dumbbellOption: 'Resistance Band Pulldowns',
				sets: 3,
				reps: '10-12',
				rest: 75,
				equipment: 'Machine'
			},
			{
				name: 'Hammer Curls',
				machineOption: 'Cable Hammer Curl',
				dumbbellOption: 'Dumbbell Hammer Curls',
				sets: 3,
				reps: '10-12',
				rest: 75,
				equipment: 'Dumbbell'
			},
			{
				name: 'Cable Curls',
				machineOption: 'Cable Bicep Machine',
				dumbbellOption: 'Single Arm Dumbbell Curls',
				sets: 2,
				reps: '12-15',
				rest: 60,
				equipment: 'Machine'
			},
			{
				name: 'Single-Leg Glute Bridge',
				machineOption: 'Glute Bridge Machine',
				dumbbellOption: 'Bodyweight Single-Leg Glute Bridge',
				sets: 3,
				reps: '10-12/leg',
				rest: 60,
				equipment: 'Bodyweight'
			},
			{
				name: 'Donkey Kicks',
				machineOption: 'Glute Kickback Machine',
				dumbbellOption: 'Bodyweight Donkey Kicks',
				sets: 3,
				reps: '15/leg',
				rest: 45,
				equipment: 'Bodyweight'
			},
			{
				name: 'Side Plank Hip Lifts',
				machineOption: 'Core Machine',
				dumbbellOption: 'Bodyweight Side Plank Hip Lifts',
				sets: 2,
				reps: '10-15/side',
				rest: 60,
				equipment: 'Bodyweight'
			}
		],
		notes: 'This day emphasizes back variation with additional pulling volume. The glute work addresses muscles underactivated by running. Donkey kicks and single-leg glute bridges activate the glute medius, crucial for hip stability and running efficiency.'
	}
};

/**
 * Get all unique exercise names for quick button selection
 */
export function getAllExercises() {
	const exercises = new Set();
	Object.values(workoutTemplates).forEach(template => {
		template.exercises.forEach(ex => {
			exercises.add(ex.name);
		});
	});
	return Array.from(exercises).sort();
}

/**
 * Get exercise by name from any template
 */
export function getExerciseByName(name) {
	for (const template of Object.values(workoutTemplates)) {
		const exercise = template.exercises.find(ex => ex.name === name);
		if (exercise) {
			return exercise;
		}
	}
	return null;
}
