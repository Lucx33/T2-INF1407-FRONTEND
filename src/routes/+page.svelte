<script lang="ts">
	import { goto } from '$app/navigation';

	const features = [
		{
			icon: '🏀',
			title: 'Monte seu time dos sonhos!',
			description: 'Escale jogadores da NBA e crie a melhor formação possível'
		},
		{
			icon: '🏆',
			title: 'Desafie seus amigos',
			description: 'Participe de ligas privadas e públicas para ver quem é o melhor'
		},
		{
			icon: '📊',
			title: 'Estatísticas detalhadas',
			description: 'Acompanhe o desempenho dos seus jogadores em tempo real'
		},
		{
			icon: '💰',
			title: 'Mercado dinâmico',
			description: 'Compre e venda jogadores aproveitando as melhores oportunidades'
		}
	];

	const howToPlay = [
		{ step: 1, text: 'Crie sua conta e escolha o nome do seu time' },
		{ step: 2, text: 'Monte seu "5 inicial" com o orçamento disponível' },
		{ step: 3, text: 'Ganhe pontos com base no desempenho real dos jogadores da NBA' },
		{ step: 4, text: 'Suba no ranking e mostre suas habilidades de GM' }
	];
</script>

<svelte:head>
	<title>NBA Fantasy Game - Monte Seu Time dos Sonhos</title>
</svelte:head>

<div class="home">
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">Bem-vindo ao NBA Fantasy</h1>
				<p class="hero-subtitle">
					Monte seu time dos sonhos, recrute os melhores jogadores e compita com milhares de fãs de
					basquete ao redor do mundo.
				</p>
				<div class="hero-actions">
					<button class="btn btn-primary btn-lg" on:click={() => goto('/dashboard')}>
						Começar Agora
					</button>
					<button class="btn btn-outline btn-lg" on:click={() => goto('/market')}>
						Ver Jogadores
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
			<h2 class="section-title">Por que Jogar?</h2>
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
			<h2 class="section-title">Como Jogar</h2>
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
