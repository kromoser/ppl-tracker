/**
 * Exercise form videos and resources from the plan
 */

export const videoResources = {
	'Push Day Exercises': [
		{
			name: 'Dumbbell Bench Press',
			url: 'https://www.youtube.com/watch?v=VeqYnSgdBgc'
		},
		{
			name: 'Incline Dumbbell Press',
			url: 'https://www.youtube.com/watch?v=8iPEnn-ltC8'
		},
		{
			name: 'Dumbbell Shoulder Press',
			url: 'https://www.youtube.com/watch?v=VS1kz0tnxtg'
		},
		{
			name: 'Lateral Raises',
			url: 'https://www.youtube.com/watch?v=3VcKaXpapvk'
		},
		{
			name: 'Bench Dips',
			url: 'https://www.youtube.com/watch?v=0326dy_-CzM'
		},
		{
			name: 'Overhead Tricep Extension',
			url: 'https://www.youtube.com/watch?v=I9f0hU9JDLY'
		}
	],
	'Pull Day Exercises': [
		{
			name: 'Lat Pulldown',
			url: 'https://www.youtube.com/watch?v=CAwf7n6Luuc'
		},
		{
			name: 'Single Arm Dumbbell Row',
			url: 'https://www.youtube.com/watch?v=pYcpY20QrgE'
		},
		{
			name: 'Bent-Over Dumbbell Row',
			url: 'https://www.youtube.com/watch?v=ZlRrW8PlVOE'
		},
		{
			name: 'Dumbbell Bicep Curls',
			url: 'https://www.youtube.com/watch?v=oa6aX14XRCU'
		},
		{
			name: 'Incline Dumbbell Curls',
			url: 'https://www.youtube.com/watch?v=sKzDQcUPFmE'
		},
		{
			name: 'Face Pulls',
			url: 'https://www.youtube.com/watch?v=0vvhUaFwT5o'
		},
		{
			name: 'Dumbbell Reverse Flyes',
			url: 'https://www.youtube.com/watch?v=4Aq84corHr0'
		}
	],
	'Core Exercises': [
		{
			name: 'Plank Variations',
			url: 'https://www.youtube.com/watch?v=p-vVWMqOvVU'
		},
		{
			name: 'Pallof Press',
			url: 'https://www.youtube.com/watch?v=cs2k5I-P4bU'
		},
		{
			name: 'Dead Bug',
			url: 'https://www.youtube.com/watch?v=fnr3W7E-vwU'
		},
		{
			name: 'Russian Twists',
			url: 'https://www.youtube.com/watch?v=2kNr-Kqd3Ow'
		},
		{
			name: 'Bicycle Crunches',
			url: 'https://www.youtube.com/watch?v=MKm2xqxhsuY'
		}
	],
	'Glute Activation Exercises': [
		{
			name: 'Single-Leg Glute Bridge',
			url: 'https://www.youtube.com/watch?v=1NZr3bBDLWw'
		},
		{
			name: 'Donkey Kicks',
			url: 'https://www.youtube.com/watch?v=1V8Zg7o2cW0'
		},
		{
			name: 'Side Plank Hip Lifts',
			url: 'https://www.youtube.com/watch?v=EQJaUbPqU8Q'
		},
		{
			name: 'Fire Hydrants',
			url: 'https://www.youtube.com/watch?v=hkCGfcbbpQs'
		}
	]
};

/**
 * Get video URL for an exercise by name
 */
export function getVideoUrl(exerciseName) {
	for (const category of Object.values(videoResources)) {
		const exercise = category.find(ex => ex.name === exerciseName);
		if (exercise) {
			return exercise.url;
		}
	}
	return null;
}
