<script lang="ts">
	import { userTeam, formations } from '$lib/stores/team';
	import type { Player } from '$lib/stores/players';
	import Formation from '$lib/components/Formation.svelte';
	import PlayerCard from '$lib/components/PlayerCard.svelte';
	import { goto } from '$app/navigation';

	let selectedFormation = $userTeam.formation;

	$: teamValue = $userTeam.players.reduce((sum, p) => sum + p.price, 0).toFixed(1);
	$: remainingBudget = ($userTeam.budget - parseFloat(teamValue)).toFixed(1);
	$: teamPoints = $userTeam.players.reduce((sum, p) => sum + p.points, 0);

	function handleFormationChange() {
		userTeam.update(team => ({
			...team,
			formation: selectedFormation
		}));
	}

	function handlePlayerClick(player: Player | { position: string; index: number }) {
		if ('id' in player) {
			console.log('Player clicked:', player);
		} else {
			goto('/market');
		}
	}

	function removePlayer(player: Player) {
		userTeam.update(team => ({
			...team,
			players: team.players.filter(p => p.id !== player.id)
		}));
	}
</script>

<svelte:head>
	<title>My Roster - NBA Fantasy</title>
</svelte:head>

<div class="my-team">
	<div class="container">
		<div class="page-header">
			<div>
				<h1>My Roster</h1>
				<p class="text-secondary">Build and manage your lineup</p>
			</div>
			<button class="btn btn-primary" on:click={() => goto('/market')}>
				Add Players
			</button>
		</div>

		<div class="team-stats-bar">
			<div class="stat-item">
				<span class="stat-label">Players</span>
				<span class="stat-value">{$userTeam.players.length}/5</span>
			</div>
			<div class="stat-item">
				<span class="stat-label">Team Salary</span>
				<span class="stat-value">${teamValue}M</span>
			</div>
			<div class="stat-item">
				<span class="stat-label">Remaining Cap</span>
				<span class="stat-value" class:low={parseFloat(remainingBudget) < 20}>
					${remainingBudget}M
				</span>
			</div>
			<div class="stat-item">
				<span class="stat-label">Total Points</span>
				<span class="stat-value">{teamPoints} pts</span>
			</div>
		</div>

		<div class="team-content">
			<div class="formation-section">
				<div class="card">
					<div class="section-header">
						<h2>Formation</h2>
						<select bind:value={selectedFormation} on:change={handleFormationChange} class="formation-select">
							{#each Object.keys(formations) as formation}
								<option value={formation}>{formations[formation].name}</option>
							{/each}
						</select>
					</div>

					<Formation
						players={$userTeam.players}
						formation={$userTeam.formation}
						onPlayerClick={handlePlayerClick}
					/>

					<div class="formation-info">
						<div class="info-row">
							<span>Guards:</span>
							<span>{$userTeam.players.filter(p => p.positionShort === 'PG' || p.positionShort === 'SG').length}/{formations[$userTeam.formation].guards}</span>
						</div>
						<div class="info-row">
							<span>Forwards:</span>
							<span>{$userTeam.players.filter(p => p.positionShort === 'SF' || p.positionShort === 'PF').length}/{formations[$userTeam.formation].forwards}</span>
						</div>
						<div class="info-row">
							<span>Center:</span>
							<span>{$userTeam.players.filter(p => p.positionShort === 'C').length}/{formations[$userTeam.formation].center}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="players-section">
				<div class="card">
					<h2>Roster Players</h2>
					{#if $userTeam.players.length > 0}
						<div class="players-grid">
							{#each $userTeam.players as player}
								<PlayerCard {player} onRemove={removePlayer} />
							{/each}
						</div>
					{:else}
						<div class="empty-state">
							<div class="empty-icon">🏀</div>
							<h3>No players on roster</h3>
							<p>Start adding players from the market</p>
							<button class="btn btn-primary" on:click={() => goto('/market')}>
								Go to Market
							</button>
						</div>
					{/if}
				</div>

				{#if $userTeam.players.length === 5}
					<div class="card success-message">
						<h3>✅ Roster complete!</h3>
						<p>Your roster is ready to compete. Good luck!</p>
					</div>
				{:else if $userTeam.players.length > 0}
					<div class="card info-message">
						<h3>ℹ️ Incomplete roster</h3>
						<p>You need {5 - $userTeam.players.length} more player(s) to complete your roster.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.my-team {
		padding: var(--spacing-lg) 0;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xl);
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.team-stats-bar {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-xl);
		padding: var(--spacing-lg);
		background-color: var(--surface);
		border-radius: var(--border-radius);
		border: 1px solid var(--border);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		text-align: center;
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	.stat-value.low {
		color: var(--warning);
	}

	.team-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-lg);
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.section-header h2 {
		margin: 0;
	}

	.formation-select {
		padding: 8px 16px;
		font-weight: 600;
		font-size: 1rem;
	}

	.formation-info {
		margin-top: var(--spacing-lg);
		padding: var(--spacing-md);
		background-color: var(--surface-light);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		font-size: 0.875rem;
	}

	.info-row span:first-child {
		color: var(--text-secondary);
	}

	.info-row span:last-child {
		font-weight: 600;
	}

	.players-section {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.players-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
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

	.success-message {
		background-color: rgba(0, 184, 148, 0.1);
		border-color: var(--success);
	}

	.success-message h3 {
		color: var(--success);
		margin: 0 0 var(--spacing-sm) 0;
	}

	.success-message p {
		margin: 0;
		color: var(--text-secondary);
	}

	.info-message {
		background-color: rgba(116, 185, 255, 0.1);
		border-color: var(--info);
	}

	.info-message h3 {
		color: var(--info);
		margin: 0 0 var(--spacing-sm) 0;
	}

	.info-message p {
		margin: 0;
		color: var(--text-secondary);
	}

	@media (max-width: 1200px) {
		.team-content {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.team-stats-bar {
			grid-template-columns: 1fr 1fr;
		}

		.players-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
