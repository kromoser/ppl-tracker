<script>
	import { goto } from '$app/navigation';
	import { workoutTemplates } from '$lib/data/templates.js';

	export let currentWeek;
	export let workouts = [];
	export let schedule = [1, 3, 4, 6]; // Monday, Wednesday, Thursday, Saturday

	const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const workoutTypeNames = {
		'Push': 'Push',
		'Pull': 'Pull',
		'Push + Core': 'Push + Core',
		'Pull + Lower Body': 'Pull + Lower'
	};

	function getWeekStart(date) {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1);
		return new Date(d.setDate(diff));
	}

	function getWeekDays(startDate) {
		const days = [];
		// Start with Monday (index 1)
		for (let i = 0; i < 7; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			days.push(date);
		}
		return days;
	}

	function getFullDayName(dayIndex) {
		const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return names[dayIndex];
	}

	function formatDateDisplay(date) {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${months[date.getMonth()]} ${date.getDate()}`;
	}

	function formatDate(date) {
		return date.toISOString().split('T')[0];
	}

	function getWorkoutForDate(date) {
		const dateStr = formatDate(date);
		return workouts.find(w => formatDate(new Date(w.date)) === dateStr);
	}

	function getScheduledWorkoutType(date) {
		const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
		const scheduleIndex = schedule.indexOf(dayOfWeek);
		if (scheduleIndex === -1) return null;
		
		// Map schedule position to workout type
		const types = ['Push', 'Pull', 'Push + Core', 'Pull + Lower Body'];
		return types[scheduleIndex] || null;
	}

	function createWorkout(date, type) {
		const dateStr = formatDate(date);
		const typeEncoded = encodeURIComponent(type);
		goto(`/workout?date=${dateStr}&type=${typeEncoded}`);
	}

	function viewWorkout(workout) {
		goto(`/workout/${workout.id}`);
	}

	// Reactive statements to recalculate when currentWeek changes
	$: weekStart = getWeekStart(currentWeek);
	$: weekDays = getWeekDays(weekStart);
	
	// Format week range for display
	function getWeekRange() {
		const start = weekDays[0];
		const end = weekDays[6];
		return `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`;
	}
</script>

<div class="calendar">
	<div class="week-header">
		<h3>Week of {formatDateDisplay(weekDays[0])}</h3>
	</div>

	<div class="week-list">
		{#each weekDays as day}
			{@const workout = getWorkoutForDate(day)}
			{@const scheduledType = getScheduledWorkoutType(day)}
			{@const isToday = formatDate(day) === formatDate(new Date())}
			{@const dayOfWeek = day.getDay()}
			
			<div class="day-item" class:today={isToday}>
				<div class="day-info">
					<div class="day-header-info">
						<span class="day-name-full">{getFullDayName(dayOfWeek)}</span>
						<span class="day-date">{formatDateDisplay(day)}</span>
					</div>
					{#if isToday}
						<span class="today-badge">Today</span>
					{/if}
				</div>
				
				<div class="workout-content">
					{#if workout}
						<button class="workout-completed" on:click={() => viewWorkout(workout)}>
							<div class="workout-main">
								<span class="workout-type">{workout.type}</span>
								<span class="workout-status">✓ Completed</span>
							</div>
							<div class="workout-details">
								<span class="workout-time">{new Date(workout.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
								{#if workout.exercises?.length}
									<span class="workout-exercises">{workout.exercises.length} exercises</span>
								{/if}
							</div>
						</button>
					{:else if scheduledType}
						<button class="workout-scheduled" on:click={() => createWorkout(day, scheduledType)}>
							<div class="workout-main">
								<span class="workout-type">{scheduledType}</span>
								<span class="workout-hint">Tap to start</span>
							</div>
						</button>
					{:else}
						<button class="workout-empty" on:click={() => createWorkout(day, 'Custom')}>
							<span class="workout-hint">+ Add workout</span>
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.calendar {
		background: white;
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
	}

	.week-header {
		padding: 1rem 1.5rem;
		background: var(--primary);
		color: white;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.week-header h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.week-list {
		display: flex;
		flex-direction: column;
	}

	.day-item {
		border-bottom: 1px solid var(--border);
		padding: 1rem 1.5rem;
		transition: background 0.2s;
	}

	.day-item:last-child {
		border-bottom: none;
	}

	.day-item.today {
		background: rgba(74, 158, 255, 0.05);
		border-left: 3px solid var(--accent);
	}

	.day-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.day-header-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.day-name-full {
		font-weight: 600;
		font-size: 1rem;
		color: var(--text);
	}

	.day-date {
		font-size: 0.85rem;
		color: var(--text-light);
	}

	.today-badge {
		background: var(--accent);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.workout-content {
		width: 100%;
	}

	.workout-completed,
	.workout-scheduled,
	.workout-empty {
		width: 100%;
		padding: 1rem;
		border-radius: 6px;
		cursor: pointer;
		border: none;
		text-align: left;
		transition: all 0.2s;
	}

	.workout-completed {
		background: var(--success);
		color: white;
	}

	.workout-completed:hover {
		background: #45a049;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
	}

	.workout-scheduled {
		background: var(--accent);
		color: white;
	}

	.workout-scheduled:hover {
		background: #3a8eef;
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(74, 158, 255, 0.3);
	}

	.workout-empty {
		background: var(--bg);
		border: 2px dashed var(--border);
		color: var(--text-light);
	}

	.workout-empty:hover {
		background: #f5f5f5;
		border-color: var(--accent);
		color: var(--accent);
	}

	.workout-main {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.workout-type {
		font-weight: 600;
		font-size: 1rem;
	}

	.workout-status {
		font-size: 0.85rem;
		opacity: 0.9;
	}

	.workout-hint {
		font-size: 0.9rem;
		opacity: 0.9;
	}

	.workout-details {
		display: flex;
		gap: 1rem;
		font-size: 0.85rem;
		opacity: 0.85;
	}

	.workout-time,
	.workout-exercises {
		display: flex;
		align-items: center;
	}

	@media (max-width: 768px) {
		.day-item {
			padding: 0.75rem 1rem;
		}

		.week-header {
			padding: 0.75rem 1rem;
		}

		.week-header h3 {
			font-size: 1rem;
		}

		.day-name-full {
			font-size: 0.95rem;
		}

		.workout-completed,
		.workout-scheduled,
		.workout-empty {
			padding: 0.75rem;
		}

		.workout-type {
			font-size: 0.95rem;
		}

		.workout-details {
			flex-direction: column;
			gap: 0.25rem;
		}
	}
</style>
