<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { workouts } from '$lib/stores/workouts.js';
	import { workoutTemplates, getAllExercises } from '$lib/data/templates.js';
	import ExerciseEntry from './ExerciseEntry.svelte';

	export let workout = null;
	export let workoutType = 'Custom';
	export let workoutDate = new Date().toISOString().split('T')[0];

	const dispatch = createEventDispatcher();

	let exercises = [];
	let duration = null;
	let notes = '';
	let allExerciseNames = getAllExercises();
	let showExerciseSelector = false;
	let customExerciseName = '';

	// Initialize from existing workout
	if (workout) {
		exercises = workout.exercises || [];
		duration = workout.duration;
		notes = workout.notes || '';
		workoutType = workout.type;
		workoutDate = new Date(workout.date).toISOString().split('T')[0];
	}

	// Function to initialize exercises from template
	function initializeFromTemplate() {
		if (!workout && exercises.length === 0 && workoutType && workoutTemplates[workoutType]) {
			const template = workoutTemplates[workoutType];
			exercises = template.exercises.map(ex => ({
				name: ex.name,
				equipment: ex.equipment,
				recommendedReps: ex.reps, // Store recommended reps
				restTime: ex.rest, // Store rest time
				sets: Array(ex.sets).fill(null).map((_, i) => ({
					setNumber: i + 1,
					reps: null,
					weight: null,
					completed: false
				}))
			}));
		}
	}

	// Initialize on mount (after props are set)
	onMount(() => {
		initializeFromTemplate();
	});

	// Also react to workoutType changes
	$: if (workoutType) {
		initializeFromTemplate();
	}

	function addExerciseFromQuickButton(exerciseName) {
		const templateExercise = workoutTemplates[workoutType]?.exercises.find(ex => ex.name === exerciseName);
		if (templateExercise) {
			addExercise(templateExercise);
		} else {
			// Add as custom exercise
			addExercise({
				name: exerciseName,
				equipment: 'Custom',
				sets: 3,
				reps: '10-12',
				rest: 60
			});
		}
		showExerciseSelector = false;
	}

	function addExercise(templateExercise) {
		const sets = Array(templateExercise.sets).fill(null).map((_, i) => ({
			setNumber: i + 1,
			reps: null,
			weight: null,
			completed: false
		}));

		exercises = [...exercises, {
			name: templateExercise.name,
			equipment: templateExercise.equipment,
			recommendedReps: templateExercise.reps,
			restTime: templateExercise.rest,
			sets
		}];
	}

	function addCustomExercise() {
		if (customExerciseName.trim()) {
			exercises = [...exercises, {
				name: customExerciseName.trim(),
				equipment: 'Custom',
				sets: [{
					setNumber: 1,
					reps: null,
					weight: null,
					completed: false
				}]
			}];
			customExerciseName = '';
		}
	}

	function removeExercise(index) {
		exercises = exercises.filter((_, i) => i !== index);
	}

	function updateExercise(index, updatedExercise) {
		exercises[index] = updatedExercise;
		exercises = [...exercises]; // Trigger reactivity
	}

	async function saveWorkout() {
		const workoutData = {
			id: workout?.id,
			date: new Date(workoutDate).toISOString(),
			type: workoutType,
			exercises: exercises,
			duration: duration || null,
			notes: notes || null
		};

		if (workout?.id) {
			await workouts.update(workoutData);
		} else {
			await workouts.add(workoutData);
		}

		dispatch('save', workoutData);
	}

	function cancel() {
		history.back();
	}
</script>

<div class="workout-tracker">
	<div class="workout-header">
		<h2>{workoutType}</h2>
		<div class="workout-meta">
			<input type="date" bind:value={workoutDate} />
			<input type="number" placeholder="Duration (min)" bind:value={duration} min="0" />
		</div>
	</div>

	<div class="exercises">
		{#each exercises as exercise, index}
			<ExerciseEntry
				{exercise}
				on:update={(e) => updateExercise(index, e.detail)}
				on:remove={() => removeExercise(index)}
			/>
		{/each}
	</div>

	{#if exercises.length === 0}
		<div class="no-exercises">
			<p>No exercises yet. Add exercises to get started.</p>
		</div>
	{/if}

	<div class="add-exercise">
		{#if showExerciseSelector}
			<div class="exercise-selector">
				<h3>Quick Add Exercise</h3>
				<div class="exercise-buttons">
					{#each allExerciseNames as name}
						<button class="exercise-btn" on:click={() => addExerciseFromQuickButton(name)}>
							{name}
						</button>
					{/each}
				</div>
				<div class="custom-exercise">
					<input
						type="text"
						placeholder="Or enter custom exercise name"
						bind:value={customExerciseName}
						on:keydown={(e) => e.key === 'Enter' && addCustomExercise()}
					/>
					<button on:click={addCustomExercise}>Add</button>
				</div>
				<button class="secondary" on:click={() => showExerciseSelector = false}>Cancel</button>
			</div>
		{:else}
			<button class="add-btn secondary" on:click={() => showExerciseSelector = true}>
				+ Add Additional Exercise
			</button>
		{/if}
	</div>

	<div class="notes-section">
		<label>Notes (optional)</label>
		<textarea bind:value={notes} placeholder="Add any notes about this workout..." rows="3"></textarea>
	</div>

	<div class="actions">
		<button class="secondary" on:click={cancel}>Cancel</button>
		<button on:click={saveWorkout}>Save Workout</button>
	</div>
</div>

<style>
	.workout-tracker {
		max-width: 800px;
		margin: 0 auto;
	}

	.workout-header {
		margin-bottom: 1.5rem;
	}

	.workout-header h2 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.workout-meta {
		display: flex;
		gap: 1rem;
	}

	.workout-meta input {
		flex: 1;
	}

	.exercises {
		margin-bottom: 1.5rem;
	}

	.add-exercise {
		margin-bottom: 1.5rem;
	}

	.exercise-selector {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.exercise-selector h3 {
		margin-bottom: 1rem;
	}

	.exercise-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.exercise-btn {
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		background: var(--secondary);
		min-height: auto;
	}

	.exercise-btn:hover {
		background: #3a3a3a;
	}

	.custom-exercise {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.custom-exercise input {
		flex: 1;
	}

	.no-exercises {
		text-align: center;
		padding: 2rem;
		color: var(--text-light);
		margin-bottom: 1rem;
	}

	.add-btn {
		width: 100%;
		background: var(--secondary);
	}

	.notes-section {
		margin-bottom: 1.5rem;
	}

	.notes-section label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.notes-section textarea {
		width: 100%;
		resize: vertical;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
	}

	.actions button {
		flex: 1;
		max-width: 200px;
	}

	@media (max-width: 768px) {
		.workout-meta {
			flex-direction: column;
		}

		.exercise-buttons {
			justify-content: center;
		}

		.exercise-btn {
			font-size: 0.85rem;
			padding: 0.4rem 0.8rem;
		}
	}
</style>
