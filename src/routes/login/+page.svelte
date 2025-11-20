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
				<h1>Welcome Back!</h1>
				<p>Sign in to continue to your NBA Fantasy team</p>
			</div>

			{#if error}
				<div class="error-message">
					<span class="error-icon">⚠️</span>
					<span>{error}</span>
				</div>
			{/if}

			<form on:submit={handleSubmit} class="login-form">
				<div class="form-group">
					<label for="email">Email Address</label>
					<input
						id="email"
						type="email"
						placeholder="your.email@example.com"
						bind:value={email}
						required
						disabled={loading}
					/>
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						bind:value={password}
						required
						disabled={loading}
					/>
				</div>

				<div class="form-options">
					<label class="checkbox-label">
						<input type="checkbox" bind:checked={rememberMe} disabled={loading} />
						<span>Remember me</span>
					</label>
					<a href="/forgot-password" class="forgot-link">Forgot password?</a>
				</div>

				<button type="submit" class="btn btn-primary btn-block" disabled={loading}>
					{#if loading}
						Signing in...
					{:else}
						Sign In
					{/if}
				</button>
			</form>

			<div class="divider">
				<span>or continue with</span>
			</div>

			<div class="social-login">
				<button
					type="button"
					class="btn btn-social btn-google"
					on:click={handleGoogleLogin}
					disabled={loading}
				>
					<svg class="social-icon" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="currentColor"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="currentColor"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="currentColor"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					Google
				</button>

				<button
					type="button"
					class="btn btn-social btn-facebook"
					on:click={handleFacebookLogin}
					disabled={loading}
				>
					<svg class="social-icon" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
						/>
					</svg>
					Facebook
				</button>
			</div>

			<div class="login-footer">
				<p>
					Don't have an account?
					<a href="/register" class="register-link">Sign up</a>
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
