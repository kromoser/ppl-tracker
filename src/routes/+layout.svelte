<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { initDB } from '$lib/db/db.js';
	import { workouts } from '$lib/stores/workouts.js';
	import { settings } from '$lib/stores/settings.js';
	import '../app.css';

	let dbInitialized = false;
	let loading = true;

	onMount(async () => {
		try {
			await initDB();
			dbInitialized = true;
			await workouts.load();
			await settings.load();
		} catch (error) {
			console.error('Failed to initialize database:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else}
	<nav class="nav">
		<a href="{base}/" class="nav-link">Calendar</a>
		<a href="{base}/resources" class="nav-link">Resources</a>
		<a href="{base}/progress" class="nav-link">Progress</a>
		<a href="{base}/nutrition" class="nav-link">Nutrition</a>
	</nav>
	
	<main class="main">
		<slot />
	</main>
	
	<nav class="bottom-nav">
		<a href="{base}/" class="nav-link">📅</a>
		<a href="{base}/resources" class="nav-link">📚</a>
		<a href="{base}/progress" class="nav-link">📊</a>
		<a href="{base}/nutrition" class="nav-link">🥗</a>
	</nav>
{/if}

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		font-size: 1.2rem;
	}

	.nav {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background: #1a1a1a;
		color: white;
		justify-content: center;
		flex-wrap: wrap;
	}

	.nav-link {
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		transition: background 0.2s;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.main {
		min-height: calc(100vh - 120px);
		padding: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.bottom-nav {
		display: none;
	}

	@media (max-width: 768px) {
		.nav {
			display: none;
		}

		.bottom-nav {
			display: flex;
			justify-content: space-around;
			padding: 1rem;
			background: #1a1a1a;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 100;
		}

		.bottom-nav .nav-link {
			font-size: 1.5rem;
			padding: 0.5rem;
		}

		.main {
			padding-bottom: 80px;
		}
	}
</style>
