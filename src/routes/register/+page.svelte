<script lang="ts">
	import { goto } from '$app/navigation';

	let formData = {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		teamName: '',
		agreeToTerms: false
	};

	let loading: boolean = false;
	let errors: { [key: string]: string } = {};

	function validateForm(): boolean {
		errors = {};

		if (formData.username.length < 3) {
			errors.username = 'Username must be at least 3 characters';
		}

		if (!formData.email.includes('@')) {
			errors.email = 'Please enter a valid email address';
		}

		if (formData.password.length < 8) {
			errors.password = 'Password must be at least 8 characters';
		}

		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		if (formData.teamName.length < 3) {
			errors.teamName = 'Team name must be at least 3 characters';
		}

		if (!formData.agreeToTerms) {
			errors.terms = 'You must agree to the terms and conditions';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		loading = true;

		// TODO: Integrate with backend API
		setTimeout(() => {
			console.log('Registration attempt:', formData);
			loading = false;
			// Simulate successful registration
			goto('/dashboard');
		}, 1000);
	}

	function handleGoogleSignup() {
		console.log('Google signup clicked');
		// TODO: Implement Google OAuth
	}

	function handleFacebookSignup() {
		console.log('Facebook signup clicked');
		// TODO: Implement Facebook OAuth
	}
</script>

<svelte:head>
	<title>Sign Up - NBA Fantasy</title>
</svelte:head>

<div class="register-page">
	<div class="register-container">
		<div class="register-card">
			<div class="register-header">
				<h1>Join NBA Fantasy</h1>
				<p>Create your account and start building your dream team</p>
			</div>

			<form on:submit={handleSubmit} class="register-form">
				<div class="form-row">
					<div class="form-group">
						<label for="username">Username</label>
						<input
							id="username"
							type="text"
							placeholder="Choose a username"
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
						<label for="teamName">Team Name</label>
						<input
							id="teamName"
							type="text"
							placeholder="Your team name"
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
					<label for="email">Email Address</label>
					<input
						id="email"
						type="email"
						placeholder="your.email@example.com"
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
						<label for="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="At least 8 characters"
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
						<label for="confirmPassword">Confirm Password</label>
						<input
							id="confirmPassword"
							type="password"
							placeholder="Repeat password"
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

				<div class="form-group checkbox-group">
					<label class="checkbox-label">
						<input
							type="checkbox"
							bind:checked={formData.agreeToTerms}
							class:error={errors.terms}
							disabled={loading}
						/>
						<span>
							I agree to the
							<a href="/terms" target="_blank">Terms of Service</a>
							and
							<a href="/privacy" target="_blank">Privacy Policy</a>
						</span>
					</label>
					{#if errors.terms}
						<span class="error-text">{errors.terms}</span>
					{/if}
				</div>

				<button type="submit" class="btn btn-primary btn-block" disabled={loading}>
					{#if loading}
						Creating Account...
					{:else}
						Create Account
					{/if}
				</button>
			</form>

			<div class="divider">
				<span>or sign up with</span>
			</div>

			<div class="social-signup">
				<button
					type="button"
					class="btn btn-social btn-google"
					on:click={handleGoogleSignup}
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
					on:click={handleFacebookSignup}
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

			<div class="register-footer">
				<p>
					Already have an account?
					<a href="/login" class="login-link">Sign in</a>
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

	.social-signup {
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
