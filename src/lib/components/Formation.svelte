<script lang="ts">
	import type { Player } from '$lib/stores/players';

	export let players: Player[] = [];
	export let formation: string = 'standard';
	export let onPlayerClick: ((player: Player | { position: string; index: number }) => void) | null = null;

	$: guards = players.filter(p => p.positionShort === 'PG' || p.positionShort === 'SG');
	$: forwards = players.filter(p => p.positionShort === 'SF' || p.positionShort === 'PF');
	$: centers = players.filter(p => p.positionShort === 'C');

	const formationMap = {
		'standard': { guards: 2, forwards: 2, center: 1 },
		'small-ball': { guards: 3, forwards: 2, center: 0 },
		'twin-towers': { guards: 2, forwards: 1, center: 2 }
	};

	$: config = formationMap[formation] || formationMap['standard'];
</script>

<div class="formation-container">
	<div class="court">
		<div class="court-lines">
			<div class="center-circle"></div>
			<div class="three-point-arc three-point-top"></div>
			<div class="three-point-arc three-point-bottom"></div>
			<div class="paint paint-top"></div>
			<div class="paint paint-bottom"></div>
		</div>

		<div class="formation-grid">
			<!-- Guards (Top) -->
			<div class="line guards" style="--count: {config.guards}">
				{#each Array(config.guards) as _, i}
					{#if guards[i]}
						<button class="player-slot filled" on:click={() => onPlayerClick?.(guards[i])}>
							<div class="player-avatar">
								<img src={guards[i].photo} alt={guards[i].name} />
							</div>
							<span class="player-slot-name">{guards[i].name.split(' ').pop()}</span>
							<span class="player-position">{guards[i].positionShort}</span>
						</button>
					{:else}
						<button class="player-slot empty" on:click={() => onPlayerClick?.({ position: i === 0 ? 'PG' : 'SG', index: i })}>
							<div class="player-avatar">
								<span class="position-letter">{i === 0 ? 'PG' : 'SG'}</span>
							</div>
							<span class="player-slot-name">Empty</span>
						</button>
					{/if}
				{/each}
			</div>

			<!-- Forwards (Middle) -->
			<div class="line forwards" style="--count: {config.forwards}">
				{#each Array(config.forwards) as _, i}
					{#if forwards[i]}
						<button class="player-slot filled" on:click={() => onPlayerClick?.(forwards[i])}>
							<div class="player-avatar">
								<img src={forwards[i].photo} alt={forwards[i].name} />
							</div>
							<span class="player-slot-name">{forwards[i].name.split(' ').pop()}</span>
							<span class="player-position">{forwards[i].positionShort}</span>
						</button>
					{:else}
						<button class="player-slot empty" on:click={() => onPlayerClick?.({ position: i === 0 ? 'SF' : 'PF', index: i })}>
							<div class="player-avatar">
								<span class="position-letter">{i === 0 ? 'SF' : 'PF'}</span>
							</div>
							<span class="player-slot-name">Empty</span>
						</button>
					{/if}
				{/each}
			</div>

			<!-- Centers (Bottom) -->
			{#if config.center > 0}
				<div class="line centers" style="--count: {config.center}">
					{#each Array(config.center) as _, i}
						{#if centers[i]}
							<button class="player-slot filled" on:click={() => onPlayerClick?.(centers[i])}>
								<div class="player-avatar">
									<img src={centers[i].photo} alt={centers[i].name} />
								</div>
								<span class="player-slot-name">{centers[i].name.split(' ').pop()}</span>
								<span class="player-position">C</span>
							</button>
						{:else}
							<button class="player-slot empty" on:click={() => onPlayerClick?.({ position: 'C', index: i })}>
								<div class="player-avatar">
									<span class="position-letter">C</span>
								</div>
								<span class="player-slot-name">Empty</span>
							</button>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.formation-container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
	}

	.court {
		background: linear-gradient(135deg, #c47a3a 0%, #a0672f 100%);
		border: 4px solid #2c1810;
		border-radius: var(--border-radius);
		padding: var(--spacing-lg);
		position: relative;
		aspect-ratio: 3/4;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}

	.court-lines {
		position: absolute;
		inset: 0;
		opacity: 0.3;
	}

	.center-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100px;
		height: 100px;
		border: 3px solid white;
		border-radius: 50%;
	}

	.three-point-arc {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 70%;
		height: 25%;
		border: 3px solid white;
		border-radius: 50%;
	}

	.three-point-top {
		top: 0;
		border-bottom: none;
	}

	.three-point-bottom {
		bottom: 0;
		border-top: none;
	}

	.paint {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 30%;
		height: 15%;
		border: 3px solid white;
		background: rgba(255, 255, 255, 0.05);
	}

	.paint-top {
		top: 0;
		border-top: none;
	}

	.paint-bottom {
		bottom: 0;
		border-bottom: none;
	}

	.formation-grid {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		z-index: 1;
	}

	.line {
		display: grid;
		grid-template-columns: repeat(var(--count), 1fr);
		gap: var(--spacing-sm);
		justify-items: center;
	}

	.player-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.player-slot:hover {
		transform: scale(1.1);
	}

	.player-avatar {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid white;
		background-color: var(--surface);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
	}

	.player-slot.filled .player-avatar {
		border-color: #ff6b35;
	}

	.player-slot.empty .player-avatar {
		border-color: rgba(255, 255, 255, 0.5);
		border-style: dashed;
	}

	.player-avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
	}

	.position-letter {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.player-slot-name {
		font-size: 0.8rem;
		font-weight: 700;
		color: white;
		text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.9);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 90px;
	}

	.player-position {
		font-size: 0.65rem;
		font-weight: 600;
		color: #ff6b35;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
	}

	@media (max-width: 768px) {
		.player-avatar {
			width: 55px;
			height: 55px;
		}

		.player-slot-name {
			font-size: 0.7rem;
		}

		.player-position {
			font-size: 0.6rem;
		}
	}
</style>
