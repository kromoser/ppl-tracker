<script>
	import { createEventDispatcher } from 'svelte';
	import { getVideoUrl } from '$lib/data/resources.js';

	export let exercise;

	const dispatch = createEventDispatcher();

	let expanded = false;
	let videoUrl = getVideoUrl(exercise.name);

	function updateSet(setIndex, field, value) {
		exercise.sets[setIndex][field] = value;
		if (field === 'reps' || field === 'weight') {
			exercise.sets[setIndex].completed = true;
		}
		dispatch('update', exercise);
	}

	function addSet() {
		const newSetNumber = exercise.sets.length + 1;
		exercise.sets = [...exercise.sets, {
			setNumber: newSetNumber,
			reps: null,
			weight: null,
			completed: false
		}];
		dispatch('update', exercise);
	}

	function removeSet(setIndex) {
		exercise.sets = exercise.sets.filter((_, i) => i !== setIndex);
		// Renumber sets
		exercise.sets.forEach((set, i) => {
			set.setNumber = i + 1;
		});
		dispatch('update', exercise);
	}

	function removeExercise() {
		dispatch('remove');
	}
</script>

<div class="exercise-entry">
	<div class="exercise-header" on:click={() => expanded = !expanded}>
		<div class="exercise-info">
			<h3>{exercise.name}</h3>
			<div class="exercise-meta">
				<span class="equipment">{exercise.equipment}</span>
				{#if exercise.recommendedReps}
					<span class="recommended-reps">Target: {exercise.recommendedReps} reps</span>
				{/if}
			</div>
		</div>
		<div class="exercise-actions">
			{#if videoUrl}
				<a href={videoUrl} target="_blank" rel="noopener noreferrer" class="video-link" on:click|stopPropagation>
					📹
				</a>
			{/if}
			<button class="remove-btn" on:click|stopPropagation={removeExercise}>×</button>
		</div>
	</div>

	{#if expanded}
		<div class="exercise-sets">
			<div class="sets-header">
				<span>Set</span>
				<span>Reps</span>
				<span>Weight</span>
				<span></span>
			</div>
			{#each exercise.sets as set, setIndex}
				<div class="set-row">
					<span class="set-number">{set.setNumber}</span>
					<input
						type="number"
						placeholder={exercise.recommendedReps ? `Reps (${exercise.recommendedReps})` : 'Reps'}
						value={set.reps}
						on:input={(e) => updateSet(setIndex, 'reps', parseInt(e.target.value) || null)}
						min="0"
					/>
					<input
						type="number"
						placeholder={exercise.equipment === 'Bodyweight' ? 'BW' : 'Weight (lbs)'}
						value={set.weight}
						on:input={(e) => updateSet(setIndex, 'weight', parseFloat(e.target.value) || null)}
						min="0"
						step="0.5"
						disabled={exercise.equipment === 'Bodyweight'}
					/>
					<button class="remove-set-btn" on:click={() => removeSet(setIndex)}>×</button>
				</div>
			{/each}
			<button class="add-set-btn" on:click={addSet}>+ Add Set</button>
		</div>
	{/if}
</div>

<style>
	.exercise-entry {
		background: white;
		border: 1px solid var(--border);
		border-radius: 8px;
		margin-bottom: 1rem;
		overflow: hidden;
	}

	.exercise-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		cursor: pointer;
		background: var(--bg);
		transition: background 0.2s;
	}

	.exercise-header:hover {
		background: #f5f5f5;
	}

	.exercise-info {
		flex: 1;
	}

	.exercise-info h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
	}

	.exercise-meta {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 0.25rem;
	}

	.equipment {
		font-size: 0.85rem;
		color: var(--text-light);
	}

	.recommended-reps {
		font-size: 0.85rem;
		color: var(--accent);
		font-weight: 500;
	}

	.exercise-actions {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.video-link {
		font-size: 1.2rem;
		text-decoration: none;
	}

	.remove-btn {
		background: var(--error);
		color: white;
		width: 32px;
		height: 32px;
		padding: 0;
		border-radius: 50%;
		font-size: 1.5rem;
		line-height: 1;
		min-height: auto;
	}

	.remove-btn:hover {
		background: #d32f2f;
	}

	.exercise-sets {
		padding: 1rem;
		border-top: 1px solid var(--border);
		background: white;
	}

	.sets-header {
		display: grid;
		grid-template-columns: 40px 1fr 1fr 40px;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--text-light);
	}

	.set-row {
		display: grid;
		grid-template-columns: 40px 1fr 1fr 40px;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		align-items: center;
	}

	.set-number {
		text-align: center;
		font-weight: 600;
	}

	.set-row input {
		width: 100%;
	}

	.remove-set-btn {
		background: transparent;
		color: var(--error);
		width: 32px;
		height: 32px;
		padding: 0;
		font-size: 1.5rem;
		line-height: 1;
		min-height: auto;
	}

	.remove-set-btn:hover {
		background: rgba(244, 67, 54, 0.1);
	}

	.add-set-btn {
		margin-top: 0.5rem;
		width: 100%;
		background: var(--secondary);
	}

	@media (max-width: 768px) {
		.exercise-header {
			padding: 0.75rem;
		}

		.exercise-info h3 {
			font-size: 1rem;
		}

		.sets-header,
		.set-row {
			grid-template-columns: 30px 1fr 1fr 30px;
			gap: 0.25rem;
		}

		.set-row input {
			font-size: 0.9rem;
			padding: 0.5rem;
		}
	}
</style>
