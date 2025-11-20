<script lang="ts">
	import { leaderboard, currentUser } from '$lib/stores/user';

	let selectedLeague: string = 'global';
	let timeframe: string = 'overall';

	const leagues = [
		{ id: 'global', name: 'Global Leaderboard' },
		{ id: 'friends', name: 'Friends League' },
		{ id: 'country', name: 'USA League' }
	];

	const timeframes = [
		{ value: 'overall', label: 'Overall' },
		{ value: 'month', label: 'Last Month' },
		{ value: 'week', label: 'Last Week' }
	];

	function getRankColor(rank: number): string {
		if (rank === 1) return 'gold';
		if (rank === 2) return 'silver';
		if (rank === 3) return 'bronze';
		return 'default';
	}

	function getRankEmoji(rank: number): string {
		if (rank === 1) return '🥇';
		if (rank === 2) return '🥈';
		if (rank === 3) return '🥉';
		return '';
	}
</script>

<svelte:head>
	<title>Leaderboard - NBA Fantasy</title>
</svelte:head>

<div class="leaderboard-page">
	<div class="container">
		<div class="page-header">
			<div>
				<h1>Classificação</h1>
				<p class="text-secondary">Veja os melhores técnicos e times</p>
			</div>
		</div>

		<div class="user-position card">
			<div class="user-badge">👤</div>
			<div class="user-info">
				<h3>Sua Posição</h3>
				<div class="user-stats">
					<div class="user-stat">
						<span class="stat-label">Colocação</span>
						<span class="stat-value">#{$currentUser.rank}</span>
					</div>
					<div class="user-stat">
						<span class="stat-label">Pontos</span>
						<span class="stat-value">{$currentUser.points}</span>
					</div>
					<div class="user-stat">
						<span class="stat-label">Time</span>
						<span class="stat-value">Meu Time</span>
					</div>
				</div>
			</div>
		</div>

		<div class="filters-section card">
			<div class="filter-group">
				<label for="league">Liga</label>
				<select id="league" bind:value={selectedLeague}>
					{#each leagues as league}
						<option value={league.id}>{league.name}</option>
					{/each}
				</select>
			</div>

			<div class="filter-group">
				<label for="timeframe">Período</label>
				<select id="timeframe" bind:value={timeframe}>
					{#each timeframes as tf}
						<option value={tf.value}>{tf.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="leaderboard-table card">
			<div class="table-header">
				<div class="header-cell rank-col">Colocação</div>
				<div class="header-cell name-col">Técnico</div>
				<div class="header-cell team-col">Time</div>
				<div class="header-cell points-col">Pontos</div>
			</div>

			<div class="table-body">
				{#each $leaderboard as entry, index (entry.rank)}
					<div
						class="table-row"
						class:highlight={entry.rank === $currentUser.rank}
						class:top-three={entry.rank <= 3}
					>
						<div class="cell rank-col">
							<span class="rank-badge {getRankColor(entry.rank)}">
								{getRankEmoji(entry.rank)}
								#{entry.rank}
							</span>
						</div>
						<div class="cell name-col">
							<span class="player-name">{entry.name}</span>
						</div>
						<div class="cell team-col">
							<span class="team-name">{entry.team}</span>
						</div>
						<div class="cell points-col">
							<span class="points-value">{entry.points}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="podium">
			<div class="podium-places">
				{#if $leaderboard[1]}
					<div class="podium-place second">
						<div class="podium-trophy">🥈</div>
						<div class="podium-info">
							<span class="podium-rank">#2</span>
							<span class="podium-name">{$leaderboard[1].name}</span>
							<span class="podium-points">{$leaderboard[1].points} pts</span>
						</div>
						<div class="podium-block second-place">2º</div>
					</div>
				{/if}

				{#if $leaderboard[0]}
					<div class="podium-place first">
						<div class="podium-trophy">🥇</div>
						<div class="podium-info">
							<span class="podium-rank">#1</span>
							<span class="podium-name">{$leaderboard[0].name}</span>
							<span class="podium-points">{$leaderboard[0].points} pts</span>
						</div>
						<div class="podium-block first-place">1º</div>
					</div>
				{/if}

				{#if $leaderboard[2]}
					<div class="podium-place third">
						<div class="podium-trophy">🥉</div>
						<div class="podium-info">
							<span class="podium-rank">#3</span>
							<span class="podium-name">{$leaderboard[2].name}</span>
							<span class="podium-points">{$leaderboard[2].points} pts</span>
						</div>
						<div class="podium-block third-place">3º</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>


<style>
	.leaderboard-page {
		padding: var(--spacing-lg) 0;
	}

	.page-header {
		margin-bottom: var(--spacing-xl);
	}

	.user-position {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
		padding: var(--spacing-lg);
		background: linear-gradient(135deg, var(--surface) 0%, var(--surface-light) 100%);
	}

	.user-badge {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
	}

	.user-info {
		flex: 1;
	}

	.user-info h3 {
		margin: 0 0 var(--spacing-md) 0;
	}

	.user-stats {
		display: flex;
		gap: var(--spacing-xl);
	}

	.user-stat {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.filters-section {
		display: flex;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
		padding: var(--spacing-md);
	}

	.filter-group {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.filter-group label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.leaderboard-table {
		margin-bottom: var(--spacing-xl);
		overflow-x: auto;
	}

	.table-header {
		display: grid;
		grid-template-columns: 120px 1fr 1fr 120px;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		background-color: var(--surface-light);
		border-radius: 8px 8px 0 0;
		font-weight: 700;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.table-body {
		display: flex;
		flex-direction: column;
	}

	.table-row {
		display: grid;
		grid-template-columns: 120px 1fr 1fr 120px;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--border);
		transition: background-color 0.2s;
	}

	.table-row:hover {
		background-color: var(--surface-light);
	}

	.table-row.highlight {
		background-color: rgba(0, 184, 148, 0.1);
		border-left: 4px solid var(--primary-color);
	}

	.table-row.top-three {
		font-weight: 600;
	}

	.cell {
		display: flex;
		align-items: center;
	}

	.rank-badge {
		padding: 6px 12px;
		border-radius: 20px;
		font-weight: 700;
		font-size: 0.875rem;
	}

	.rank-badge.gold {
		background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
		color: #000;
	}

	.rank-badge.silver {
		background: linear-gradient(135deg, #C0C0C0 0%, #808080 100%);
		color: #000;
	}

	.rank-badge.bronze {
		background: linear-gradient(135deg, #CD7F32 0%, #8B4513 100%);
		color: #fff;
	}

	.rank-badge.default {
		background-color: var(--surface-light);
		color: var(--text-secondary);
	}

	.player-name {
		font-weight: 600;
	}

	.team-name {
		color: var(--text-secondary);
	}

	.points-value {
		font-weight: 700;
		color: var(--primary-color);
		font-size: 1.1rem;
	}

	.podium {
		padding: var(--spacing-xl) 0;
	}

	.podium-places {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		gap: var(--spacing-lg);
	}

	.podium-place {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
	}

	.podium-trophy {
		font-size: 3rem;
		animation: bounce 2s ease-in-out infinite;
	}

	.podium-place.first .podium-trophy {
		animation-delay: 0s;
	}

	.podium-place.second .podium-trophy {
		animation-delay: 0.2s;
	}

	.podium-place.third .podium-trophy {
		animation-delay: 0.4s;
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.podium-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
		text-align: center;
	}

	.podium-rank {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 600;
	}

	.podium-name {
		font-size: 1.1rem;
		font-weight: 700;
	}

	.podium-points {
		font-size: 0.9rem;
		color: var(--primary-color);
		font-weight: 600;
	}

	.podium-block {
		width: 150px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px 8px 0 0;
		font-size: 2rem;
		font-weight: 700;
		color: white;
	}

	.first-place {
		height: 200px;
		background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
		order: 2;
	}

	.second-place {
		height: 160px;
		background: linear-gradient(135deg, #C0C0C0 0%, #808080 100%);
		order: 1;
	}

	.third-place {
		height: 120px;
		background: linear-gradient(135deg, #CD7F32 0%, #8B4513 100%);
		order: 3;
	}

	@media (max-width: 768px) {
		.table-header,
		.table-row {
			grid-template-columns: 80px 1fr 100px;
		}

		.team-col {
			display: none;
		}

		.user-position {
			flex-direction: column;
			text-align: center;
		}

		.user-stats {
			flex-direction: column;
			gap: var(--spacing-md);
			width: 100%;
		}

		.filters-section {
			flex-direction: column;
		}

		.podium-places {
			flex-direction: column;
			align-items: center;
		}

		.podium-block {
			width: 100%;
			max-width: 300px;
		}
	}
</style>
