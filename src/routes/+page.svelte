<script lang="ts">
	import { goto } from '$app/navigation';

	const features = [
		{
			icon: '🏀',
			title: 'Build Your Dream Team',
			description: 'Choose the best NBA players and create winning strategies'
		},
		{
			icon: '🏆',
			title: 'Compete with Friends',
			description: 'Create private leagues and challenge your friends in real-time'
		},
		{
			icon: '📊',
			title: 'Detailed Stats',
			description: 'Track player and team performance with comprehensive analytics'
		},
		{
			icon: '💰',
			title: 'Dynamic Market',
			description: 'Buy and trade players strategically'
		}
	];

	const howToPlay = [
		{ step: 1, text: 'Create your account and choose your team name' },
		{ step: 2, text: 'Build your lineup within the salary cap' },
		{ step: 3, text: 'Earn points based on real NBA player performances' },
		{ step: 4, text: 'Climb the rankings and showcase your GM skills' }
	];
</script>

<svelte:head>
	<title>NBA Fantasy Game - Build Your Dream Team</title>
</svelte:head>

<div class="home">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">Welcome to NBA Fantasy</h1>
				<p class="hero-subtitle">
					Build your dream team, draft the best players, and compete with thousands of
					basketball fans around the world
				</p>
				<div class="hero-actions">
					<button class="btn btn-primary btn-lg" on:click={() => goto('/dashboard')}>
						Get Started
					</button>
					<button class="btn btn-outline btn-lg" on:click={() => goto('/market')}>
						Browse Players
					</button>
				</div>
			</div>
			<div class="hero-image">
				<div class="ball-animation">🏀</div>
			</div>
		</div>
	</section>

	<section class="features">
		<div class="container">
			<h2 class="section-title">Why Play?</h2>
			<div class="features-grid">
				{#each features as feature}
					<div class="feature-card">
						<div class="feature-icon">{feature.icon}</div>
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-description">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="how-to-play">
		<div class="container">
			<h2 class="section-title">How to Play</h2>
			<div class="steps">
				{#each howToPlay as item}
					<div class="step-card">
						<div class="step-number">{item.step}</div>
						<p class="step-text">{item.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<div class="cta-content">
				<h2>Ready to Start?</h2>
				<p>Build your team now and start competing!</p>
				<button class="btn btn-primary btn-lg" on:click={() => goto('/dashboard')}>
					Create My Team
				</button>
			</div>
		</div>
	</section>
</div>

<style>
	.home {
		min-height: 100vh;
	}

	.hero {
		padding: var(--spacing-xl) 0;
		background: linear-gradient(135deg, var(--surface) 0%, var(--background) 100%);
	}

	.hero .container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
		align-items: center;
		min-height: 500px;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.hero-title {
		font-size: 3rem;
		line-height: 1.2;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
	}

	.btn-lg {
		padding: 14px 28px;
		font-size: 1rem;
	}

	.hero-image {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ball-animation {
		font-size: 10rem;
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-30px) rotate(180deg);
		}
	}

	.section-title {
		text-align: center;
		margin-bottom: var(--spacing-xl);
		font-size: 2.5rem;
	}

	.features {
		padding: var(--spacing-xl) 0;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.feature-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		padding: var(--spacing-lg);
		text-align: center;
		transition: all 0.3s;
	}

	.feature-card:hover {
		transform: translateY(-8px);
		box-shadow: var(--shadow-lg);
		border-color: #ff6b35;
	}

	.feature-icon {
		font-size: 3rem;
		margin-bottom: var(--spacing-md);
	}

	.feature-title {
		font-size: 1.25rem;
		margin-bottom: var(--spacing-sm);
	}

	.feature-description {
		color: var(--text-secondary);
	}

	.how-to-play {
		padding: var(--spacing-xl) 0;
		background-color: var(--surface);
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.step-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		background-color: var(--background);
		border-radius: var(--border-radius);
		border: 2px solid var(--border);
	}

	.step-number {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.step-text {
		text-align: center;
		color: var(--text-secondary);
	}

	.cta {
		padding: var(--spacing-xl) 0;
	}

	.cta-content {
		text-align: center;
		padding: var(--spacing-xl);
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		border-radius: var(--border-radius);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.cta-content h2 {
		font-size: 2.5rem;
	}

	.cta-content p {
		font-size: 1.25rem;
		opacity: 0.9;
	}

	@media (max-width: 768px) {
		.hero .container {
			grid-template-columns: 1fr;
		}

		.hero-title {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.ball-animation {
			font-size: 6rem;
		}

		.section-title {
			font-size: 2rem;
		}

		.cta-content h2 {
			font-size: 1.75rem;
		}

		.cta-content p {
			font-size: 1rem;
		}
	}
</style>
