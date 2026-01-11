<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { workouts } from '$lib/stores/workouts.js';
	import { workoutTemplates } from '$lib/data/templates.js';
	import WorkoutTracker from '$lib/components/WorkoutTracker.svelte';

	let workout = null;
	let workoutType = 'Custom';
	let workoutDate = new Date().toISOString().split('T')[0];

	onMount(() => {
		const params = $page.url.searchParams;
		const dateParam = params.get('date');
		const typeParam = params.get('type');
		
		if (dateParam) {
			workoutDate = dateParam;
		}
		
		if (typeParam) {
			workoutType = decodeURIComponent(typeParam);
		}
	});

	function handleSave(savedWorkout) {
		goto('/');
	}
</script>

<div class="workout-page">
	<WorkoutTracker {workoutType} {workoutDate} on:save={handleSave} />
</div>

<style>
	.workout-page {
		max-width: 100%;
	}
</style>
