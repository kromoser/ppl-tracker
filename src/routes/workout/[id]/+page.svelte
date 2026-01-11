<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { workouts } from '$lib/stores/workouts.js';
	import WorkoutTracker from '$lib/components/WorkoutTracker.svelte';

	let workout = null;
	let loading = true;

	onMount(async () => {
		const id = parseInt($page.params.id);
		const allWorkouts = await workouts.load();
		workout = allWorkouts.find(w => w.id === id);
		loading = false;
	});

	function handleSave() {
		goto(`${base}/`);
	}
</script>

{#if loading}
	<div class="loading">Loading workout...</div>
{:else if workout}
	<WorkoutTracker workout={workout} on:save={handleSave} />
{:else}
	<div class="error">Workout not found</div>
{/if}

<style>
	.loading, .error {
		text-align: center;
		padding: 2rem;
		font-size: 1.2rem;
	}
</style>
