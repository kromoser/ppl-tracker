<script>
	import { onMount } from 'svelte';
	import { workouts } from '$lib/stores/workouts.js';
	import { settings } from '$lib/stores/settings.js';
	import { workoutTemplates } from '$lib/data/templates.js';
	import Calendar from '$lib/components/Calendar.svelte';

	let currentWeek = new Date();

	function getWeekStart(date) {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
		return new Date(d.setDate(diff));
	}

	function previousWeek() {
		const newDate = new Date(currentWeek);
		newDate.setDate(newDate.getDate() - 7);
		currentWeek = newDate;
	}

	function nextWeek() {
		const newDate = new Date(currentWeek);
		newDate.setDate(newDate.getDate() + 7);
		currentWeek = newDate;
	}

	function today() {
		currentWeek = new Date();
	}
</script>

<div class="calendar-page">
	<div class="header">
		<button class="nav-btn" on:click={previousWeek}>← Previous Week</button>
		<button class="nav-btn today-btn" on:click={today}>Today</button>
		<button class="nav-btn" on:click={nextWeek}>Next Week →</button>
	</div>
	
	<Calendar {currentWeek} workouts={$workouts} schedule={$settings.schedule || [1, 3, 4, 6]} />
</div>

<style>
	.calendar-page {
		max-width: 100%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.nav-btn {
		flex: 1;
		min-width: 120px;
		background: var(--secondary);
	}

	.today-btn {
		background: var(--accent);
		flex: 0 0 auto;
		min-width: 100px;
	}

	@media (max-width: 768px) {
		.header {
			flex-direction: column;
		}

		.nav-btn {
			width: 100%;
		}

		.today-btn {
			order: -1;
		}
	}
</style>
