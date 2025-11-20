<script lang="ts">
	import { availablePlayers } from '$lib/stores/players';
	import { userTeam } from '$lib/stores/team';
	import type { Player } from '$lib/stores/players';
	import PlayerCard from '$lib/components/PlayerCard.svelte';

	let searchTerm = '';
	let selectedPosition = 'all';
	let sortBy = 'points';
	let maxPrice = 50;

	$: filteredPlayers = $availablePlayers
		.filter(player => {
			const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				player.team.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesPosition = selectedPosition === 'all' || player.positionShort === selectedPosition;
			const matchesPrice = player.price <= maxPrice;
			const notInTeam = !$userTeam.players.find(p => p.id === player.id);

			return matchesSearch && matchesPosition && matchesPrice && notInTeam;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'points':
					return b.points - a.points;
				case 'price-high':
					return b.price - a.price;
				case 'price-low':
					return a.price - b.price;
				case 'name':
					return a.name.localeCompare(b.name);
				default:
					return 0;
			}
		});

	$: teamValue = $userTeam.players.reduce((sum, p) => sum + p.price, 0).toFixed(1);
	$: remainingBudget = ($userTeam.budget - parseFloat(teamValue)).toFixed(1);

	function addPlayerToTeam(player) {
		if ($userTeam.players.length >= 5) {
			alert('Your roster is full! (5 players)');
			return;
		}

		const playerCost = player.price;
		if (parseFloat(remainingBudget) < playerCost) {
			alert('Insufficient salary cap to sign this player!');
			return;
		}

		userTeam.update(team => ({
			...team,
			players: [...team.players, player]
		}));
	}

	const positions = [
		{ value: 'all', label: 'All Positions' },
		{ value: 'PG', label: 'Point Guard' },
		{ value: 'SG', label: 'Shooting Guard' },
		{ value: 'SF', label: 'Small Forward' },
		{ value: 'PF', label: 'Power Forward' },
		{ value: 'C', label: 'Center' }
	];
</script>

<svelte:head>
	<title>Player Market - NBA Fantasy</title>
</svelte:head>

<div class="market">
	<div class="container">
		<div class="page-header">
			<div>
				<h1>Player Market</h1>
				<p class="text-secondary">Find and sign the best NBA players</p>
			</div>
			<div class="budget-info">
				<div class="budget-item">
					<span class="budget-label">Available Cap</span>
					<span class="budget-value">${remainingBudget}M</span>
				</div>
				<div class="budget-item">
					<span class="budget-label">Players</span>
					<span class="budget-value">{$userTeam.players.length}/5</span>
				</div>
			</div>
		</div>

		<div class="filters-section card">
			<div class="filters-row">
				<div class="filter-group">
					<label for="search">Search</label>
					<input
						id="search"
						type="text"
						placeholder="Name or team..."
						bind:value={searchTerm}
					/>
				</div>

				<div class="filter-group">
					<label for="position">Position</label>
					<select id="position" bind:value={selectedPosition}>
						{#each positions as position}
							<option value={position.value}>{position.label}</option>
						{/each}
					</select>
				</div>

				<div class="filter-group">
					<label for="sort">Sort by</label>
					<select id="sort" bind:value={sortBy}>
						<option value="points">Highest Points</option>
						<option value="price-high">Highest Salary</option>
						<option value="price-low">Lowest Salary</option>
						<option value="name">Name (A-Z)</option>
					</select>
				</div>

				<div class="filter-group">
					<label for="price">Max Salary: ${maxPrice}M</label>
					<input
						id="price"
						type="range"
						min="0"
						max="50"
						step="0.5"
						bind:value={maxPrice}
						class="price-slider"
					/>
				</div>
			</div>

			<div class="results-info">
				<span>{filteredPlayers.length} players found</span>
				{#if searchTerm || selectedPosition !== 'all' || maxPrice < 50}
					<button class="btn-reset" on:click={() => {
						searchTerm = '';
						selectedPosition = 'all';
						sortBy = 'points';
						maxPrice = 50;
					}}>
						Clear Filters
					</button>
				{/if}
			</div>
		</div>

		{#if filteredPlayers.length > 0}
			<div class="players-grid">
				{#each filteredPlayers as player (player.id)}
					<PlayerCard {player} onSelect={addPlayerToTeam} />
				{/each}
			</div>
		{:else}
			<div class="empty-state card">
				<div class="empty-icon">🔍</div>
				<h3>No players found</h3>
				<p>Try adjusting your search filters</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.market {
		padding: var(--spacing-lg) 0;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xl);
		flex-wrap: wrap;
		gap: var(--spacing-lg);
	}

	.budget-info {
		display: flex;
		gap: var(--spacing-lg);
		padding: var(--spacing-md);
		background-color: var(--surface);
		border-radius: var(--border-radius);
		border: 1px solid var(--border);
	}

	.budget-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 120px;
	}

	.budget-label {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.budget-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--primary-color);
	}

	.filters-section {
		margin-bottom: var(--spacing-xl);
	}

	.filters-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.filter-group label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.price-slider {
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: var(--surface-light);
		outline: none;
		-webkit-appearance: none;
	}

	.price-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--primary-color);
		cursor: pointer;
		border: 2px solid var(--surface);
	}

	.price-slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--primary-color);
		cursor: pointer;
		border: 2px solid var(--surface);
	}

	.results-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--border);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.btn-reset {
		background: none;
		color: var(--primary-color);
		font-weight: 600;
		font-size: 0.875rem;
		padding: 6px 12px;
		border-radius: 6px;
	}

	.btn-reset:hover {
		background-color: var(--surface-light);
	}

	.players-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--spacing-lg);
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

	@media (max-width: 768px) {
		.page-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.budget-info {
			width: 100%;
			justify-content: space-between;
		}

		.filters-row {
			grid-template-columns: 1fr;
		}

		.players-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
