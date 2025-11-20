<script lang="ts">
	export let title: string;
	export let value: string | number;
	export let icon: string = '';
	export let trend: number | null = null;
	export let subtitle: string = '';
</script>

<div class="stats-card">
	<div class="stats-header">
		{#if icon}
			<span class="stats-icon">{icon}</span>
		{/if}
		<span class="stats-title">{title}</span>
	</div>
	<div class="stats-value">{value}</div>
	{#if subtitle}
		<div class="stats-subtitle">{subtitle}</div>
	{/if}
	{#if trend}
		<div class="stats-trend" class:positive={trend > 0} class:negative={trend < 0}>
			{#if trend > 0}
				↑ +{trend}
			{:else if trend < 0}
				↓ {trend}
			{/if}
		</div>
	{/if}
</div>

<style>
	.stats-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		transition: all 0.3s;
	}

	.stats-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.stats-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.stats-icon {
		font-size: 1.5rem;
	}

	.stats-title {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.stats-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stats-subtitle {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.stats-trend {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.stats-trend.positive {
		color: var(--success);
	}

	.stats-trend.negative {
		color: var(--error);
	}
</style>
