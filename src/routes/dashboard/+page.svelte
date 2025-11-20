<script lang="ts">
	import { currentUser, leaderboard } from '$lib/stores/user';
	import { userTeam } from '$lib/stores/team';
	import StatsCard from '$lib/components/StatsCard.svelte';
	import PlayerCard from '$lib/components/PlayerCard.svelte';
	import { goto } from '$app/navigation';

	$: teamValue = $userTeam.players.reduce((sum, p) => sum + p.price, 0).toFixed(1);
	$: teamPoints = $userTeam.players.reduce((sum, p) => sum + p.points, 0);
</script>

<svelte:head>
	<title>Dashboard - NBA Fantasy</title>
</svelte:head>

<div class="dashboard">
	<div class="container">
		<div class="dashboard-header">
			<div>
				<h1>Dashboard</h1>
				<p class="text-secondary">Welcome back, {$currentUser.name}!</p>
			</div>
			<button class="btn btn-primary" on:click={() => goto('/my-team')}>
				Manage Roster
			</button>
		</div>

		<div class="stats-grid">
			<StatsCard
				title="Total Points"
				value={$currentUser.points}
				icon="🏆"
				trend={125}
				subtitle="This week"
			/>
			<StatsCard
				title="League Ranking"
				value="#{$currentUser.rank}"
				icon="📊"
				trend={-42}
				subtitle="Up 42 positions"
			/>
			<StatsCard
				title="Team Salary"
				value="${teamValue}M"
				icon="💰"
				subtitle="of ${$userTeam.budget}M cap"
			/>
			<StatsCard
				title="Players"
				value="{$userTeam.players.length}/5"
				icon="🏀"
				subtitle="{5 - $userTeam.players.length} remaining"
			/>
		</div>

		<div class="dashboard-content">
			<div class="main-column">
				<section class="card">
					<div class="section-header">
						<h2>My Roster</h2>
						<a href="/my-team" class="btn btn-outline">View full roster</a>
					</div>
					{#if $userTeam.players.length > 0}
						<div class="team-preview">
							<div class="team-info">
								<div class="info-item">
									<span class="info-label">Formation:</span>
									<span class="info-value">{$userTeam.formation}</span>
								</div>
								<div class="info-item">
									<span class="info-label">Points:</span>
									<span class="info-value">{teamPoints}</span>
								</div>
							</div>
							<div class="players-preview">
								{#each $userTeam.players.slice(0, 3) as player}
									<PlayerCard {player} compact={true} />
								{/each}
							</div>
						</div>
					{:else}
						<div class="empty-state">
							<div class="empty-icon">🏀</div>
							<h3>Your roster is empty</h3>
							<p>Start adding players from the market</p>
							<button class="btn btn-primary" on:click={() => goto('/market')}>
								Go to Market
							</button>
						</div>
					{/if}
				</section>

				<section class="card">
					<div class="section-header">
						<h2>Recent Activity</h2>
					</div>
					<div class="activity-list">
						<div class="activity-item">
							<div class="activity-icon">🏀</div>
							<div class="activity-content">
								<p class="activity-text">LeBron James scored 28 points</p>
								<span class="activity-time">2 hours ago</span>
							</div>
							<span class="activity-points">+28 pts</span>
						</div>
						<div class="activity-item">
							<div class="activity-icon">🎯</div>
							<div class="activity-content">
								<p class="activity-text">Stephen Curry hit 7 three-pointers</p>
								<span class="activity-time">4 hours ago</span>
							</div>
							<span class="activity-points">+35 pts</span>
						</div>
						<div class="activity-item">
							<div class="activity-icon">🤝</div>
							<div class="activity-content">
								<p class="activity-text">Luka Doncic had 12 assists</p>
								<span class="activity-time">Yesterday</span>
							</div>
							<span class="activity-points">+18 pts</span>
						</div>
					</div>
				</section>
			</div>

			<div class="sidebar">
				<section class="card">
					<h3>My Leagues</h3>
					<div class="leagues-list">
						{#each $currentUser.leagues as league}
							<div class="league-item">
								<div class="league-info">
									<h4>{league.name}</h4>
									<span class="league-rank">#{league.rank}</span>
								</div>
								<button class="btn btn-outline btn-sm">View League</button>
							</div>
						{/each}
						<button class="btn btn-primary" style="margin-top: var(--spacing-md)">
							Create New League
						</button>
					</div>
				</section>

				<section class="card">
					<h3>Top 5 Leaderboard</h3>
					<div class="top-players">
						{#each $leaderboard.slice(0, 5) as entry}
							<div class="top-player-item">
								<span class="rank">#{entry.rank}</span>
								<div class="player-info">
									<span class="player-name">{entry.name}</span>
									<span class="player-points">{entry.points} pts</span>
								</div>
							</div>
						{/each}
					</div>
					<button class="btn btn-outline" style="width: 100%; margin-top: var(--spacing-md)" on:click={() => goto('/leaderboard')}>
						Full Leaderboard
					</button>
				</section>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		padding: var(--spacing-lg) 0;
	}

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xl);
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.dashboard-content {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: var(--spacing-lg);
	}

	.main-column {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
	}

	.section-header h2 {
		margin: 0;
	}

	.team-preview {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.team-info {
		display: flex;
		gap: var(--spacing-lg);
		padding: var(--spacing-md);
		background-color: var(--surface-light);
		border-radius: 8px;
	}

	.info-item {
		display: flex;
		gap: var(--spacing-sm);
	}

	.info-label {
		color: var(--text-secondary);
	}

	.info-value {
		font-weight: 600;
	}

	.players-preview {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-md);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-xl);
		text-align: center;
	}

	.empty-icon {
		font-size: 4rem;
		opacity: 0.5;
	}

	.empty-state h3 {
		margin: 0;
	}

	.empty-state p {
		color: var(--text-secondary);
		margin: 0;
	}

	.activity-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.activity-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		background-color: var(--surface-light);
		border-radius: 8px;
	}

	.activity-icon {
		font-size: 1.5rem;
	}

	.activity-content {
		flex: 1;
	}

	.activity-text {
		margin: 0 0 4px 0;
		font-weight: 500;
	}

	.activity-time {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.activity-points {
		font-weight: 700;
		color: var(--success);
	}

	.leagues-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.league-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md);
		background-color: var(--surface-light);
		border-radius: 8px;
	}

	.league-info h4 {
		margin: 0 0 4px 0;
		font-size: 0.9rem;
	}

	.league-rank {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.top-players {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.top-player-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-sm);
		background-color: var(--surface-light);
		border-radius: 8px;
	}

	.rank {
		font-weight: 700;
		color: var(--primary-color);
		min-width: 40px;
	}

	.player-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.player-name {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.player-points {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.btn-sm {
		padding: 6px 12px;
		font-size: 0.75rem;
	}

	@media (max-width: 1024px) {
		.dashboard-content {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
