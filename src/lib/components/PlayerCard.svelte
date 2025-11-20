<script lang="ts">
	import type { Player } from '$lib/stores/players';

	export let player: Player;
	export let onSelect: ((player: Player) => void) | null = null;
	export let onRemove: ((player: Player) => void) | null = null;
	export let compact: boolean = false;
</script>

<div class="player-card" class:compact>
	<div class="player-header">
		<span class="position-badge" class:pg={player.positionShort === 'PG'}
			class:sg={player.positionShort === 'SG'}
			class:sf={player.positionShort === 'SF'}
			class:pf={player.positionShort === 'PF'}
			class:c={player.positionShort === 'C'}>
			{player.positionShort}
		</span>
		<span class="player-points">{player.points} pts</span>
	</div>

	<div class="player-photo">
		<img src={player.photo} alt={player.name} />
	</div>

	<div class="player-info">
		<h4 class="player-name">{player.name}</h4>
		<p class="player-team">{player.team}</p>
	</div>

	{#if !compact}
		<div class="player-stats">
			<div class="stat">
				<span class="stat-label">PPG</span>
				<span class="stat-value">{player.stats.points || 0}</span>
			</div>
			<div class="stat">
				<span class="stat-label">REB</span>
				<span class="stat-value">{player.stats.rebounds || 0}</span>
			</div>
			<div class="stat">
				<span class="stat-label">AST</span>
				<span class="stat-value">{player.stats.assists || 0}</span>
			</div>
			<div class="stat">
				<span class="stat-label">STL</span>
				<span class="stat-value">{player.stats.steals || 0}</span>
			</div>
			<div class="stat">
				<span class="stat-label">BLK</span>
				<span class="stat-value">{player.stats.blocks || 0}</span>
			</div>
		</div>
	{/if}

	<div class="player-footer">
		<span class="player-price">$ {player.price}M</span>
		{#if onSelect}
			<button class="btn btn-primary btn-sm" on:click={() => onSelect(player)}>
				Sign
			</button>
		{/if}
		{#if onRemove}
			<button class="btn btn-outline btn-sm" on:click={() => onRemove(player)}>
				Release
			</button>
		{/if}
	</div>
</div>

<style>
	.player-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		padding: var(--spacing-md);
		transition: all 0.3s;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.player-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-md);
		border-color: var(--primary-color);
	}

	.player-card.compact {
		padding: var(--spacing-sm);
	}

	.player-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.position-badge {
		background-color: var(--surface-light);
		color: var(--text-primary);
		padding: 4px 10px;
		border-radius: 6px;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.position-badge.pg {
		background-color: #e74c3c;
		color: white;
	}

	.position-badge.sg {
		background-color: #e67e22;
		color: white;
	}

	.position-badge.sf {
		background-color: #f39c12;
		color: white;
	}

	.position-badge.pf {
		background-color: #3498db;
		color: white;
	}

	.position-badge.c {
		background-color: #9b59b6;
		color: white;
	}

	.player-points {
		font-weight: 600;
		color: var(--primary-color);
		font-size: 0.875rem;
	}

	.player-photo {
		display: flex;
		justify-content: center;
		margin: var(--spacing-sm) 0;
	}

	.player-photo img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid var(--border);
	}

	.compact .player-photo img {
		width: 60px;
		height: 60px;
	}

	.player-info {
		text-align: center;
	}

	.player-name {
		font-size: 1rem;
		margin: 0 0 4px 0;
		color: var(--text-primary);
	}

	.compact .player-name {
		font-size: 0.875rem;
	}

	.player-team {
		font-size: 0.75rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.player-stats {
		display: flex;
		justify-content: space-around;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) 0;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
	}

	.stat-label {
		font-size: 0.65rem;
		color: var(--text-secondary);
		font-weight: 600;
	}

	.stat-value {
		font-weight: 700;
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.player-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.player-price {
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--primary-color);
	}

	.btn-sm {
		padding: 6px 12px;
		font-size: 0.75rem;
	}
</style>
