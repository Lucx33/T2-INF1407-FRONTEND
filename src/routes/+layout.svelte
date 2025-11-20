<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let menuOpen: boolean = false;

	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}
</script>

<div class="app">
	<header class="header">
		<div class="container">
			<nav class="nav">
				<div class="nav-brand">
					<a href="/">
						<h2>🏀 NBA Fantasy</h2>
					</a>
				</div>

				<button class="menu-toggle" on:click={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</button>

				<ul class="nav-links" class:open={menuOpen}>
					<li>
						<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
					</li>
					<li>
						<a href="/dashboard" class:active={$page.url.pathname === '/dashboard'}>Dashboard</a>
					</li>
					<li>
						<a href="/my-team" class:active={$page.url.pathname === '/my-team'}>My Roster</a>
					</li>
					<li>
						<a href="/market" class:active={$page.url.pathname === '/market'}>Market</a>
					</li>
					<li>
						<a href="/leaderboard" class:active={$page.url.pathname === '/leaderboard'}>Leaderboard</a>
					</li>
					<li class="user-menu">
						<a href="/login" class="btn btn-outline btn-sm">Login</a>
					</li>
					<li class="user-menu">
						<a href="/register" class="btn btn-primary btn-sm">Sign Up</a>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="main-content">
		<slot />
	</main>

	<footer class="footer">
		<div class="container">
			<div class="footer-content">
				<div class="footer-section">
					<h3>NBA Fantasy</h3>
					<p>Build your dream team and compete with basketball fans worldwide.</p>
				</div>
				<div class="footer-section">
					<h4>Quick Links</h4>
					<ul>
						<li><a href="/">Home</a></li>
						<li><a href="/dashboard">Dashboard</a></li>
						<li><a href="/market">Market</a></li>
						<li><a href="/leaderboard">Leaderboard</a></li>
					</ul>
				</div>
				<div class="footer-section">
					<h4>Legal</h4>
					<ul>
						<li><a href="/terms">Terms of Service</a></li>
						<li><a href="/privacy">Privacy Policy</a></li>
						<li><a href="/about">About Us</a></li>
					</ul>
				</div>
			</div>
			<div class="footer-bottom">
				<p>&copy; 2024 NBA Fantasy. All rights reserved.</p>
			</div>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.header {
		background-color: var(--surface);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: var(--shadow-sm);
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-md) 0;
	}

	.nav-brand h2 {
		font-size: 1.5rem;
		margin: 0;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		gap: 4px;
		background: none;
		padding: 8px;
	}

	.menu-toggle span {
		display: block;
		width: 25px;
		height: 3px;
		background-color: var(--text-primary);
		border-radius: 2px;
		transition: all 0.3s;
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: var(--spacing-md);
		align-items: center;
		margin: 0;
	}

	.nav-links a {
		color: var(--text-secondary);
		font-weight: 500;
		padding: 8px 12px;
		border-radius: 6px;
		transition: all 0.2s;
		text-decoration: none;
	}

	.nav-links a:not(.btn):hover,
	.nav-links a:not(.btn).active {
		color: var(--text-primary);
		background-color: var(--surface-light);
	}

	.btn-sm {
		padding: 8px 16px;
		font-size: 0.875rem;
	}

	.main-content {
		flex: 1;
		padding: var(--spacing-xl) 0;
	}

	.footer {
		background-color: var(--surface);
		border-top: 1px solid var(--border);
		padding: var(--spacing-xl) 0;
		color: var(--text-secondary);
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-xl);
		margin-bottom: var(--spacing-lg);
	}

	.footer-section h3 {
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin: 0 0 var(--spacing-sm) 0;
	}

	.footer-section h4 {
		color: var(--text-primary);
		margin: 0 0 var(--spacing-md) 0;
		font-size: 1rem;
	}

	.footer-section p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.footer-section ul li a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s;
	}

	.footer-section ul li a:hover {
		color: var(--primary-color);
	}

	.footer-bottom {
		text-align: center;
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border);
		font-size: 0.875rem;
	}

	.footer-bottom p {
		margin: 0;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}

		.nav-links {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background-color: var(--surface);
			flex-direction: column;
			padding: var(--spacing-md);
			border-top: 1px solid var(--border);
			transform: translateY(-100%);
			opacity: 0;
			pointer-events: none;
			transition: all 0.3s;
		}

		.nav-links.open {
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}

		.nav-links li {
			width: 100%;
		}

		.nav-links a {
			display: block;
			width: 100%;
			text-align: center;
		}

		.footer-content {
			grid-template-columns: 1fr;
		}
	}
</style>
