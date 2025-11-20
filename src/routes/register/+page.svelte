<script lang="ts">
	import { authStore } from '$lib/stores/auth';

	let formData = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		teamName: ''
	};

	let loading: boolean = false;
	let errors: { [key: string]: string } = {};
	let apiError: string = '';

	function validateForm(): boolean {
		errors = {};
		if (formData.username.length < 3) errors.username = 'Nome de usuário deve ter pelo menos 3 caracteres';
		if (!formData.email.includes('@')) errors.email = 'Por favor, insira um e-mail válido';
		if (formData.password.length < 8) errors.password = 'Senha deve ter pelo menos 8 caracteres';
		if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'As senhas não coincidem';
		if (formData.teamName.length < 3) errors.teamName = 'Nome do time deve ter pelo menos 3 caracteres';

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		apiError = '';

		if (!validateForm()) return;

		loading = true;
		try {
			await authStore.register(formData);
		} catch (err: any) {
			apiError = err.message || 'Erro ao criar conta. Tente novamente.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Sign Up - NBA Fantasy</title>
</svelte:head>

<div class="register-page">
	<div class="register-container">
		<div class="register-card">
			<div class="register-header">
				<h1>Junte-se ao NBA Fantasy</h1>
				<p>Crie sua conta e comece a montar seu time dos sonhos</p>
			</div>

			{#if apiError}
				<div class="error-message">
					<span class="error-icon">⚠️</span>
					<span>{apiError}</span>
				</div>
			{/if}

			<form on:submit={handleSubmit} class="register-form">
				<div class="form-row">
					<div class="form-group">
						<label for="username">Nome de Usuário</label>
						<input
							id="username"
							type="text"
							placeholder="Escolha um nome de usuário"
							bind:value={formData.username}
							class:error={errors.username}
							required
							disabled={loading}
						/>
						{#if errors.username}
							<span class="error-text">{errors.username}</span>
						{/if}
					</div>

					<div class="form-group">
						<label for="teamName">Nome do Time</label>
						<input
							id="teamName"
							type="text"
							placeholder="Nome do seu time"
							bind:value={formData.teamName}
							class:error={errors.teamName}
							required
							disabled={loading}
						/>
						{#if errors.teamName}
							<span class="error-text">{errors.teamName}</span>
						{/if}
					</div>
				</div>

				<div class="form-group">
					<label for="email">E-mail</label>
					<input
						id="email"
						type="email"
						placeholder="seu.email@exemplo.com"
						bind:value={formData.email}
						class:error={errors.email}
						required
						disabled={loading}
					/>
					{#if errors.email}
						<span class="error-text">{errors.email}</span>
					{/if}
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="password">Senha</label>
						<input
							id="password"
							type="password"
							placeholder="Pelo menos 8 caracteres"
							bind:value={formData.password}
							class:error={errors.password}
							required
							disabled={loading}
						/>
						{#if errors.password}
							<span class="error-text">{errors.password}</span>
						{/if}
					</div>

					<div class="form-group">
						<label for="confirmPassword">Confirmar Senha</label>
						<input
							id="confirmPassword"
							type="password"
							placeholder="Repita a senha"
							bind:value={formData.confirmPassword}
							class:error={errors.confirmPassword}
							required
							disabled={loading}
						/>
						{#if errors.confirmPassword}
							<span class="error-text">{errors.confirmPassword}</span>
						{/if}
					</div>
				</div>

				<button type="submit" class="btn btn-primary btn-block" disabled={loading}>
					{#if loading}
						Criando Conta...
					{:else}
						Criar Conta
					{/if}
				</button>
			</form>

			<div class="divider">
				<span>ou cadastre-se com</span>
			</div>

			<div class="register-footer">
				<p>
					Já tem uma conta?
					<a href="/login" class="login-link">Entrar</a>
				</p>
			</div>
		</div>
	</div>
</div>


<style>
	.register-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--background) 0%, var(--surface) 100%);
		padding: var(--spacing-lg);
	}

	.register-container {
		width: 100%;
		max-width: 600px;
	}

	.register-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--border-radius);
		padding: var(--spacing-xl);
		box-shadow: var(--shadow-lg);
	}

	.register-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.register-header h1 {
		font-size: 2rem;
		margin: 0 0 var(--spacing-sm) 0;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.register-header p {
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

	.register-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-md);
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

	.form-group input.error {
		border-color: var(--danger);
	}

	.error-text {
		font-size: 0.75rem;
		color: var(--danger);
	}

	.checkbox-group {
		margin-top: calc(var(--spacing-sm) * -1);
	}

	.checkbox-label {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-xs);
		cursor: pointer;
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.checkbox-label input[type='checkbox'] {
		width: auto;
		cursor: pointer;
		margin-top: 2px;
	}

	.checkbox-label a {
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 600;
	}

	.checkbox-label a:hover {
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


	.register-footer {
		text-align: center;
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--border);
	}

	.register-footer p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.login-link {
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 600;
		margin-left: var(--spacing-xs);
	}

	.login-link:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.register-page {
			padding: var(--spacing-md);
		}

		.register-card {
			padding: var(--spacing-lg);
		}

		.register-header h1 {
			font-size: 1.5rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.social-signup {
			grid-template-columns: 1fr;
		}
	}
</style>
