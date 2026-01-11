<script>
	import { nutritionTips, progressionWeeks } from '$lib/data/nutrition.js';
	import { exportData } from '$lib/db/db.js';

	async function handleExport() {
		try {
			const data = await exportData();
			const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `ppl-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			alert('Data exported successfully!');
		} catch (error) {
			console.error('Export failed:', error);
			alert('Failed to export data. Please try again.');
		}
	}
</script>

<div class="nutrition-page">
	<h1>Nutrition & Recovery</h1>

	<div class="nutrition-tips">
		{#each Object.values(nutritionTips) as tip}
			<div class="card">
				<h2>{tip.title}</h2>
				<p>{tip.content}</p>
			</div>
		{/each}
	</div>

	<div class="progression-section">
		<h2>Progressive Overload & Progression Structure</h2>
		{#each Object.entries(progressionWeeks) as [weeks, info]}
			<div class="card">
				<h3>{info.title}</h3>
				<ul>
					{#each info.points as point}
						<li>{point}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<div class="export-section">
		<div class="card">
			<h2>Data Export</h2>
			<p>Export all your workout data as a JSON file. This is useful for backups or if you need to migrate your data.</p>
			<button on:click={handleExport}>Export Data</button>
		</div>
	</div>
</div>

<style>
	.nutrition-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.nutrition-page h1 {
		margin-bottom: 1.5rem;
		font-size: 2rem;
	}

	.nutrition-tips {
		margin-bottom: 2rem;
	}

	.progression-section {
		margin-bottom: 2rem;
	}

	.progression-section h2 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	.progression-section h3 {
		margin-bottom: 0.75rem;
		font-size: 1.2rem;
	}

	.progression-section ul {
		margin-left: 1.5rem;
	}

	.progression-section li {
		margin-bottom: 0.5rem;
	}

	.export-section {
		margin-top: 2rem;
	}

	.export-section p {
		margin-bottom: 1rem;
		color: var(--text-light);
	}
</style>
