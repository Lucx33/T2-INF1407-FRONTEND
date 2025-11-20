<script lang="ts">
	let email: string = '';
	let loading: boolean = false;
	let error: string = '';
	let success: boolean = false;

	async function handleSubmit(e: Event): Promise<void> {
		e.preventDefault();
		error = '';
		loading = true;

		// Validate email
		if (!email || !email.includes('@')) {
			error = 'Please enter a valid email address';
			loading = false;
			return;
		}

		try {
			// TODO: Integrate with backend API
			// const response = await fetch('/api/auth/forgot-password', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ email })
			// });

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1500));

			success = true;
		} catch (err: any) {
			error = err.message || 'Failed to send reset email. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Forgot Password - NBA Fantasy</title>
</svelte:head>

<div class="container">
	<div class="auth-page">
		<div class="auth-card">
			<div class="auth-header">
				<h1>🏀 Reset Password</h1>
				<p>Enter your email address and we'll send you a link to reset your password.</p>
			</div>

			{#if !success}
				<form on:submit={handleSubmit} class="auth-form">
					{#if error}
						<div class="alert alert-error">
							{error}
						</div>
					{/if}

					<div class="form-group">
						<label for="email">Email Address</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							placeholder="your.email@example.com"
							required
							disabled={loading}
						/>
					</div>

					<button type="submit" class="btn btn-primary btn-block" disabled={loading}>
						{#if loading}
							<span class="spinner"></span>
							Sending...
						{:else}
							Send Reset Link
						{/if}
					</button>
				</form>

				<div class="auth-footer">
					<p>
						Remember your password?
						<a href="/login">Back to Login</a>
					</p>
					<p>
						Don't have an account?
						<a href="/register">Sign up</a>
					</p>
				</div>
			{:else}
				<div class="success-message">
					<div class="success-icon">✓</div>
					<h2>Check Your Email</h2>
					<p>
						We've sent a password reset link to <strong>{email}</strong>
					</p>
					<p class="text-secondary">
						If you don't see the email, check your spam folder.
					</p>
					<a href="/login" class="btn btn-primary">Back to Login</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.auth-page {
		min-height: calc(100vh - 200px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) 0;
	}

	.auth-card {
		background-color: var(--surface);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-lg);
		padding: var(--spacing-xl);
		width: 100%;
		max-width: 450px;
	}

	.auth-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.auth-header h1 {
		margin: 0 0 var(--spacing-sm) 0;
		font-size: 2rem;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.auth-header p {
		color: var(--text-secondary);
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.5;
	}

	.auth-form {
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
		color: var(--text-primary);
		font-size: 0.9rem;
	}

	.form-group input {
		padding: 12px 16px;
		border: 2px solid var(--border);
		border-radius: 8px;
		background-color: var(--background);
		color: var(--text-primary);
		font-size: 1rem;
		transition: all 0.2s;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
	}

	.form-group input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.alert {
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 0.9rem;
	}

	.alert-error {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.btn-block {
		width: 100%;
	}

	.spinner {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
		margin-right: 8px;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.auth-footer {
		margin-top: var(--spacing-lg);
		text-align: center;
		font-size: 0.9rem;
	}

	.auth-footer p {
		margin: var(--spacing-sm) 0;
		color: var(--text-secondary);
	}

	.auth-footer a {
		color: var(--primary-color);
		text-decoration: none;
		font-weight: 600;
	}

	.auth-footer a:hover {
		text-decoration: underline;
	}

	.success-message {
		text-align: center;
		padding: var(--spacing-lg) 0;
	}

	.success-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto var(--spacing-lg);
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		color: white;
		font-weight: bold;
	}

	.success-message h2 {
		margin: 0 0 var(--spacing-md) 0;
		color: var(--text-primary);
	}

	.success-message p {
		margin: var(--spacing-sm) 0;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.success-message .text-secondary {
		font-size: 0.875rem;
		margin-bottom: var(--spacing-lg);
	}

	.success-message strong {
		color: var(--primary-color);
	}

	@media (max-width: 768px) {
		.auth-card {
			padding: var(--spacing-lg);
		}

		.auth-header h1 {
			font-size: 1.75rem;
		}
	}
</style>
