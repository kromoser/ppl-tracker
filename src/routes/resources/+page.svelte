<script>
	import { videoResources } from '$lib/data/resources.js';
</script>

<div class="resources-page">
	<h1>Exercise Form Videos</h1>
	
	{#each Object.entries(videoResources) as [category, exercises]}
		<div class="card">
			<h2>{category}</h2>
			<div class="video-list">
				{#each exercises as exercise}
					<a href={exercise.url} target="_blank" rel="noopener noreferrer" class="video-item">
						<span class="video-name">{exercise.name}</span>
						<span class="video-icon">▶️</span>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.resources-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.resources-page h1 {
		margin-bottom: 1.5rem;
		font-size: 2rem;
	}

	.video-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.video-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 4px;
		transition: background 0.2s;
		text-decoration: none;
		color: var(--text);
	}

	.video-item:hover {
		background: #f5f5f5;
		text-decoration: none;
	}

	.video-name {
		font-weight: 500;
	}

	.video-icon {
		font-size: 1.2rem;
	}
</style>
