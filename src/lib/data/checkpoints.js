/**
 * Progress checkpoints from the plan
 */

export const checkpoints = [
	{
		week: 4,
		label: '4-Week Checkpoint',
		timeframe: 'Mid-February',
		expectedProgress: [
			'Neural adaptations occurring; form becomes natural and lifts feel easier',
			'Dumbbell Bench Press: 35-40 lbs × 10 reps (from estimated 30 lbs starting)',
			'Dumbbell Shoulder Press: 20-25 lbs × 10 reps (from estimated 15 lbs)',
			'Bicep Curls: 17.5-20 lbs × 12 reps (from 15 lbs)',
			'Push-ups: 25-30 consecutive (improvement from 20)',
			'Visual changes: Minimal, but arm definition begins appearing'
		],
		strengthBenchmarks: [
			'Dumbbell bench should feel more stable',
			'Shoulder press form is solid',
			'Bicep curls no longer create excessive fatigue'
		]
	},
	{
		week: 8,
		label: '8-Week Checkpoint',
		timeframe: 'Mid-March',
		expectedProgress: [
			'Noticeable muscle definition in arms, shoulders, and chest',
			'Dumbbell Bench Press: 45-50 lbs × 10 reps',
			'Dumbbell Shoulder Press: 25-30 lbs × 10 reps',
			'Bicep Curls: 22.5-25 lbs × 12 reps',
			'Push-ups: 35-40 consecutive',
			'Body composition change: Visible arm striations; shirts fit differently in shoulders'
		],
		strengthBenchmarks: [
			'Single-leg glute bridges feel strong and controlled',
			'Pull exercises show significant strength gains',
			'Confidence in the weight room increases noticeably'
		]
	},
	{
		week: 12,
		label: '12-Week Checkpoint',
		timeframe: 'Early April',
		expectedProgress: [
			'Lean muscle definition across entire upper body',
			'Clear separation between muscle groups',
			'Dumbbell Bench Press: 50-55 lbs × 10 reps',
			'Dumbbell Shoulder Press: 30-35 lbs × 10 reps',
			'Bicep Curls: 25-30 lbs × 12 reps',
			'Push-ups: 40-50 consecutive',
			'Running performance: Improved running economy from increased core stability',
			'Body composition: Visible abs showing; arms look noticeably larger in fitted shirts'
		],
		strengthBenchmarks: [
			'Approaching novice standards (shoulder press ~65 lbs)',
			'Core strength allows for proper running form with less fatigue'
		]
	},
	{
		week: 16,
		label: '16-Week Final Result',
		timeframe: 'Late May / Early June',
		expectedProgress: [
			'Lean, defined beach physique',
			'Dumbbell Bench Press: 55-60 lbs × 10 reps',
			'Dumbbell Shoulder Press: 35-40 lbs × 10 reps',
			'Bicep Curls: 30+ lbs × 12 reps',
			'Push-ups: 50+ consecutive',
			'Overall upper body definition: Shoulders have clear shape; biceps have visible peak; chest has striations',
			'Core: Visible abdominal definition; improved posture',
			'Running: Improved efficiency and glute activation'
		],
		strengthBenchmarks: [
			'Upper body strength increase: ~50-60%',
			'Arm definition: Dramatic improvement',
			'Bodyweight strength: Push-ups doubled',
			'Overall body composition: Lean appearance with clear muscularity'
		]
	}
];

/**
 * Get checkpoint by week number
 */
export function getCheckpoint(week) {
	return checkpoints.find(cp => cp.week === week);
}

/**
 * Get current checkpoint based on program start date
 */
export function getCurrentCheckpoint(startDate) {
	if (!startDate) return null;
	
	const now = new Date();
	const weeksElapsed = Math.floor((now - new Date(startDate)) / (7 * 24 * 60 * 60 * 1000));
	
	// Find the most recent checkpoint that hasn't been reached
	for (let i = checkpoints.length - 1; i >= 0; i--) {
		if (weeksElapsed >= checkpoints[i].week) {
			return checkpoints[i];
		}
	}
	
	return null;
}
