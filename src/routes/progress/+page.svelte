<script>
	import { onMount } from 'svelte';
	import { checkpoints } from '$lib/data/checkpoints.js';
	import { settings } from '$lib/stores/settings.js';
	import { workouts } from '$lib/stores/workouts.js';

	let currentWeek = 0;

	onMount(async () => {
		await workouts.load();
	});

	function setProgramStartDate() {
		const date = prompt('Enter program start date (YYYY-MM-DD):', $settings?.programStartDate || new Date().toISOString().split('T')[0]);
		if (date) {
			settings.setProgramStartDate(date);
			const now = new Date();
			const start = new Date(date);
			currentWeek = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
		}
	}

	// Reactive statement to update currentWeek when settings change
	$: if ($settings?.programStartDate) {
		const now = new Date();
		const start = new Date($settings.programStartDate);
		currentWeek = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
	}
</script>

<div class="progress-page">
	<h1>Progress Checkpoints</h1>

	{#if !$settings.programStartDate}
		<div class="card">
			<p>Set your program start date to track progress:</p>
			<button on:click={setProgramStartDate}>Set Start Date</button>
		</div>
	{:else}
		<div class="card">
			<p><strong>Program Start:</strong> {new Date($settings.programStartDate).toLocaleDateString()}</p>
			<p><strong>Current Week:</strong> {currentWeek}</p>
			<button on:click={setProgramStartDate}>Change Start Date</button>
		</div>
	{/if}

	<div class="checkpoints">
		{#each checkpoints as checkpoint}
			{@const isCurrent = currentWeek >= checkpoint.week - 2 && currentWeek <= checkpoint.week + 2}
			{@const isPast = currentWeek > checkpoint.week + 2}
			
			<div class="card checkpoint" class:current={isCurrent} class:past={isPast}>
				<div class="checkpoint-header">
					<h2>{checkpoint.label}</h2>
					<span class="timeframe">{checkpoint.timeframe}</span>
				</div>
				
				<div class="checkpoint-content">
					<h3>Expected Progress:</h3>
					<ul>
						{#each checkpoint.expectedProgress as item}
							<li>{item}</li>
						{/each}
					</ul>
					
					<h3>Strength Benchmarks:</h3>
					<ul>
						{#each checkpoint.strengthBenchmarks as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<div class="workout-history">
		<h2>Workout History</h2>
		<div class="workout-list">
			{#each $workouts.slice(0, 10) as workout}
				<div class="workout-item">
					<div class="workout-date">{new Date(workout.date).toLocaleDateString()}</div>
					<div class="workout-type">{workout.type}</div>
					<div class="workout-exercises">{workout.exercises?.length || 0} exercises</div>
				</div>
			{/each}
			{#if $workouts.length === 0}
				<p class="empty">No workouts yet. Start tracking your workouts!</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.progress-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.progress-page h1 {
		margin-bottom: 1.5rem;
		font-size: 2rem;
	}

	.checkpoints {
		margin-bottom: 2rem;
	}

	.checkpoint {
		margin-bottom: 1.5rem;
	}

	.checkpoint.current {
		border: 2px solid var(--accent);
		background: rgba(74, 158, 255, 0.05);
	}

	.checkpoint.past {
		opacity: 0.7;
	}

	.checkpoint-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.checkpoint-header h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	.timeframe {
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.checkpoint-content h3 {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		font-size: 1.1rem;
	}

	.checkpoint-content ul {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
	}

	.checkpoint-content li {
		margin-bottom: 0.5rem;
	}

	.workout-history {
		margin-top: 2rem;
	}

	.workout-history h2 {
		margin-bottom: 1rem;
	}

	.workout-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.workout-item {
		display: grid;
		grid-template-columns: 120px 1fr auto;
		gap: 1rem;
		padding: 0.75rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 4px;
		align-items: center;
	}

	.workout-date {
		font-weight: 600;
	}

	.workout-type {
		color: var(--text-light);
	}

	.workout-exercises {
		font-size: 0.9rem;
		color: var(--text-light);
	}

	.empty {
		text-align: center;
		padding: 2rem;
		color: var(--text-light);
	}

	@media (max-width: 768px) {
		.workout-item {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}
</style>
