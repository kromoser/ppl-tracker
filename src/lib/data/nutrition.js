/**
 * Nutrition and recovery tips from the plan
 */

export const nutritionTips = {
	protein: {
		title: 'Protein Intake',
		content: 'Aim for 0.8-1 gram per pound of bodyweight (130-160g daily for you) to support muscle growth while maintaining lean body composition.'
	},
	calories: {
		title: 'Caloric Balance',
		content: 'To maintain leanness while building muscle, eat at maintenance calories or a slight deficit (200-300 calories below maintenance). Since you run 25 miles weekly, your caloric expenditure is already high.'
	},
	frequency: {
		title: 'Training Frequency',
		content: 'Your 4-day lifting split combined with 4-6 running days works well because you\'re distributing volume across the week and leveraging your running for conditioning without interfering with strength training recovery.'
	},
	sleep: {
		title: 'Sleep & Recovery',
		content: 'Aim for 7-9 hours nightly; strength gains and muscle definition occur during sleep. Post-run, perform glute activation (donkey kicks, glute bridges) to reinforce proper motor patterns.'
	}
};

export const progressionWeeks = {
	'1-4': {
		title: 'Weeks 1-4: Technique Foundation',
		points: [
			'Focus on perfect form and mind-muscle connection',
			'Choose weights where the last 2-3 reps feel challenging',
			'Target weight increases: +2.5-5 lbs every 2-3 sessions on main lifts (bench, rows, shoulder press)'
		]
	},
	'5-8': {
		title: 'Weeks 5-8: Volume Building',
		points: [
			'Increase reps or sets rather than always chasing heavier weight',
			'Example: If you hit 4×10 at 35 lbs, next session try 4×12',
			'Once you hit target reps at a weight, increase weight by 5 lbs and drop back to lower rep range'
		]
	},
	'9-12': {
		title: 'Weeks 9-12: Strength Focus',
		points: [
			'Lower reps slightly (6-8 range) on main compounds to chase heavier weight',
			'Maintain higher reps on isolation lifts (10-15 range)',
			'Add 2.5-5 lbs weekly on main lifts'
		]
	},
	'13-16': {
		title: 'Weeks 13-16: Peaking & Definition',
		points: [
			'Focus on moderate weight (10-12 reps) with perfect form',
			'Emphasize the squeeze at the top of each rep for definition',
			'Drop sets on final sets of isolation exercises for metabolic fatigue'
		]
	}
};
