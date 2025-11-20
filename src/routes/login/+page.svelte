<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string = '';
	let password: string = '';
	let rememberMe: boolean = false;
	let loading: boolean = false;
	let error: string = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		loading = true;

		// TODO: Integrate with backend API
		setTimeout(() => {
			console.log('Login attempt:', { email, password, rememberMe });
			loading = false;
			// Simulate successful login
			goto('/dashboard');
		}, 1000);
	}

	function handleGoogleLogin() {
		console.log('Google login clicked');
		// TODO: Implement Google OAuth
	}

	function handleFacebookLogin() {
		console.log('Facebook login clicked');
		// TODO: Implement Facebook OAuth
	}
</script>

<svelte:head>
	<title>Login - NBA Fantasy</title>
</svelte:head>

<div class="login-page">
	<div class="login-container">
		<div class="login-card">
			<div class="login-header">
				<h1>Bem-vindo de volta!</h1>
				<p>Faça login para continuar com seu time da NBA Fantasy</p>
			</div>

			{#if error}
				<div class="error-message">
					<span class="error-icon">⚠️</span>
					<span>{error}</span>
				</div>
			{/if}

			<form on:submit={handleSubmit} class="login-form">
				<div class="form-group">
					<label for="email">Endereço de e-mail</label>
					<input
						id="email"
						type="email"
						placeholder="seu.email@exemplo.com"
						bind:value={email}
						required
						disabled={loading}
					/>
				</div>

				<div class="form-group">
					<label for="password">Senha</label>
					<input
						id="password"
						type="password"
						placeholder="Digite sua senha"
						bind:value={password}
						required
						disabled={loading}
					/>
				</div>

				<div class="form-options">
					<label class="checkbox-label">
						<input type="checkbox" bind:checked={rememberMe} disabled={loading} />
						<span>Lembrar de mim</span>
					</label>
					<a href="/forgot-password" class="forgot-link">Esqueceu a senha?</a>
				</div>

				<button type="submit" class="btn btn-primary btn-block" disabled={loading}>
					{#if loading}
						Entrando...
					{:else}
						Entrar
					{/if}
				</button>
			</form>

			<div class="divider">
				<span>ou continue com</span>
			</div>

			<div class="login-footer">
				<p>
					Ainda não tem uma conta?
					<a href="/register" class="register-link">Criar conta</a>
				</p>
			</div>
		</div>
	</div>
</div>


<style>
	.login-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--background) 0%, var(--surface) 100%);
		padding: var(--spacing-lg);
	}

	.login-container {
		width: 100%;
		max-width: 450px;
	}

	.login-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-lg);
	}

	.login-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.login-header h1 {
		font-size: 2rem;
		margin: 0 0 var(--spacing-sm) 0;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.login-header p {
		color: var(--text-secondary);
		margin: 0;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background-color: rgba(214, 48, 49, 0.1);
		border: 1px solid var(--danger);
		border-radius: 8px;
		color: var(--danger);
		margin-bottom: var(--spacing-lg);
		font-size: 0.875rem;
	}

	.error-icon {
		font-size: 1.2rem;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-group label {
		font-weight: 600;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.form-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: calc(var(--spacing-sm) * -1);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		cursor: pointer;
		font-size: 0.875rem;
	}

	.checkbox-label input[type='checkbox'] {
		width: auto;
		cursor: pointer;
	}

	.forgot-link {
		font-size: 0.875rem;
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 600;
	}

	.forgot-link:hover {
		text-decoration: underline;
	}

	.btn-block {
		width: 100%;
		margin-top: var(--spacing-md);
	}

	.divider {
		position: relative;
		text-align: center;
		margin: var(--spacing-xl) 0;
	}

	.divider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background-color: var(--border);
	}

	.divider span {
		position: relative;
		background-color: var(--surface);
		padding: 0 var(--spacing-md);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.social-login {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);
	}

	.btn-social {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		border: 1px solid var(--border);
		background-color: var(--surface-light);
		color: var(--text-primary);
		font-weight: 600;
		transition: all 0.3s;
	}

	.btn-social:hover {
		background-color: var(--background);
		border-color: var(--primary-color);
	}

	.social-icon {
		width: 20px;
		height: 20px;
	}

	.btn-google:hover {
		border-color: #4285f4;
	}

	.btn-facebook:hover {
		border-color: #1877f2;
	}

	.login-footer {
		text-align: center;
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border);
	}

	.login-footer p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.register-link {
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 600;
		margin-left: var(--spacing-xs);
	}

	.register-link:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.login-page {
			padding: var(--spacing-md);
		}

		.login-card {
			padding: var(--spacing-lg);
		}

		.login-header h1 {
			font-size: 1.5rem;
		}

		.social-login {
			grid-template-columns: 1fr;
		}
	}
</style>
