<script lang="ts">
	let formData = {
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	};

	let loading: boolean = false;
	let error: string = '';
	let success: boolean = false;
	let errors: Record<string, string> = {};

	function validateForm(): boolean {
		errors = {};

		if (!formData.currentPassword) {
			errors.currentPassword = 'Current password is required';
		}

		if (!formData.newPassword) {
			errors.newPassword = 'New password is required';
		} else if (formData.newPassword.length < 8) {
			errors.newPassword = 'Password must be at least 8 characters';
		} else if (formData.newPassword === formData.currentPassword) {
			errors.newPassword = 'New password must be different from current password';
		}

		if (!formData.confirmPassword) {
			errors.confirmPassword = 'Please confirm your new password';
		} else if (formData.newPassword !== formData.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(e: Event): Promise<void> {
		e.preventDefault();
		error = '';
		success = false;

		if (!validateForm()) {
			return;
		}

		loading = true;

		try {
			// TODO: Integrate with backend API
			// const token = localStorage.getItem('authToken');
			// const response = await fetch('/api/auth/change-password', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//     'Authorization': `Bearer ${token}`
			//   },
			//   body: JSON.stringify({
			//     currentPassword: formData.currentPassword,
			//     newPassword: formData.newPassword,
			//     confirmPassword: formData.confirmPassword
			//   })
			// });

			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1500));

			success = true;
			formData = {
				currentPassword: '',
				newPassword: '',
				confirmPassword: ''
			};

			// Redirect to dashboard after 2 seconds
			setTimeout(() => {
				window.location.href = '/dashboard';
			}, 2000);
		} catch (err: any) {
			error = err.message || 'Failed to change password. Please try again.';
		} finally {
			loading = false;
		}
	}

	function checkPasswordStrength(password: string): string {
		if (!password) return '';
		if (password.length < 8) return 'weak';
		if (password.length < 12) {
			if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 'medium';
			return 'weak';
		}
		if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
			return 'strong';
		}
		return 'medium';
	}

	$: passwordStrength = checkPasswordStrength(formData.newPassword);
</script>

<svelte:head>
	<title>Change Password - NBA Fantasy</title>
</svelte:head>

<div class="container">
	<div class="change-password-page">
		<div class="page-header">
			<h1>🔒 Change Password</h1>
			<p>Update your account password</p>
		</div>

		<div class="content-grid">
			<div class="form-section">
				<div class="card">
					{#if success}
						<div class="success-banner">
							<div class="success-icon">✓</div>
							<div>
								<h3>Password Changed Successfully</h3>
								<p>Your password has been updated. Redirecting to dashboard...</p>
							</div>
						</div>
					{:else}
						<form on:submit={handleSubmit} class="password-form">
							{#if error}
								<div class="alert alert-error">
									{error}
								</div>
							{/if}

							<div class="form-group">
								<label for="currentPassword">Current Password</label>
								<input
									type="password"
									id="currentPassword"
									bind:value={formData.currentPassword}
									placeholder="Enter your current password"
									disabled={loading}
									class:error={errors.currentPassword}
								/>
								{#if errors.currentPassword}
									<span class="error-message">{errors.currentPassword}</span>
								{/if}
							</div>

							<div class="divider"></div>

							<div class="form-group">
								<label for="newPassword">New Password</label>
								<input
									type="password"
									id="newPassword"
									bind:value={formData.newPassword}
									placeholder="Enter your new password"
									disabled={loading}
									class:error={errors.newPassword}
								/>
								{#if errors.newPassword}
									<span class="error-message">{errors.newPassword}</span>
								{/if}

								{#if formData.newPassword && !errors.newPassword}
									<div class="password-strength">
										<div class="strength-bar">
											<div
												class="strength-fill strength-{passwordStrength}"
												style="width: {passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%'}"
											></div>
										</div>
										<span class="strength-label strength-{passwordStrength}">
											{passwordStrength === 'weak' ? 'Weak' : passwordStrength === 'medium' ? 'Medium' : 'Strong'}
										</span>
									</div>
								{/if}
							</div>

							<div class="form-group">
								<label for="confirmPassword">Confirm New Password</label>
								<input
									type="password"
									id="confirmPassword"
									bind:value={formData.confirmPassword}
									placeholder="Confirm your new password"
									disabled={loading}
									class:error={errors.confirmPassword}
								/>
								{#if errors.confirmPassword}
									<span class="error-message">{errors.confirmPassword}</span>
								{/if}
							</div>

							<div class="form-actions">
								<a href="/dashboard" class="btn btn-outline">Cancel</a>
								<button type="submit" class="btn btn-primary" disabled={loading}>
									{#if loading}
										<span class="spinner"></span>
										Updating...
									{:else}
										Change Password
									{/if}
								</button>
							</div>
						</form>
					{/if}
				</div>
			</div>

			<div class="info-section">
				<div class="card info-card">
					<h3>💡 Password Requirements</h3>
					<ul class="requirements-list">
						<li class:met={formData.newPassword.length >= 8}>
							<span class="icon">{formData.newPassword.length >= 8 ? '✓' : '○'}</span>
							At least 8 characters long
						</li>

						<li class:met={( /[A-Z]/.test(formData.newPassword) )}>
							<span class="icon">{( /[A-Z]/.test(formData.newPassword) ) ? '✓' : '○'}</span>
							Contains uppercase letter
						</li>

						<li class:met={( /[0-9]/.test(formData.newPassword) )}>
							<span class="icon">{( /[0-9]/.test(formData.newPassword) ) ? '✓' : '○'}</span>
							Contains number
						</li>

						<li class:met={( /[^A-Za-z0-9]/.test(formData.newPassword) )}>
							<span class="icon">{( /[^A-Za-z0-9]/.test(formData.newPassword) ) ? '✓' : '○'}</span>
							Contains special character
						</li>
					</ul>
				</div>

				<div class="card info-card">
					<h3>🔐 Security Tips</h3>
					<ul class="tips-list">
						<li>Use a unique password for your account</li>
						<li>Avoid using personal information</li>
						<li>Consider using a password manager</li>
						<li>Change your password regularly</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.change-password-page {
		padding: var(--spacing-xl) 0;
		min-height: calc(100vh - 200px);
	}

	.page-header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.page-header h1 {
		margin: 0 0 var(--spacing-sm) 0;
		font-size: 2.5rem;
		background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-header p {
		color: var(--text-secondary);
		margin: 0;
		font-size: 1.1rem;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xl);
		max-width: 1000px;
		margin: 0 auto;
	}

	.card {
		background-color: var(--surface);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-md);
		padding: var(--spacing-xl);
	}

	.password-form {
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

	.form-group input.error {
		border-color: #ef4444;
	}

	.form-group input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.error-message {
		color: #ef4444;
		font-size: 0.85rem;
		margin-top: -4px;
	}

	.divider {
		height: 1px;
		background-color: var(--border);
		margin: var(--spacing-sm) 0;
	}

	.password-strength {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.strength-bar {
		flex: 1;
		height: 6px;
		background-color: var(--border);
		border-radius: 3px;
		overflow: hidden;
	}

	.strength-fill {
		height: 100%;
		transition: all 0.3s;
		border-radius: 3px;
	}

	.strength-fill.strength-weak {
		background-color: #ef4444;
	}

	.strength-fill.strength-medium {
		background-color: #f59e0b;
	}

	.strength-fill.strength-strong {
		background-color: #10b981;
	}

	.strength-label {
		font-size: 0.85rem;
		font-weight: 600;
		min-width: 60px;
	}

	.strength-label.strength-weak {
		color: #ef4444;
	}

	.strength-label.strength-medium {
		color: #f59e0b;
	}

	.strength-label.strength-strong {
		color: #10b981;
	}

	.form-actions {
		display: flex;
		gap: var(--spacing-md);
		margin-top: var(--spacing-md);
	}

	.form-actions .btn {
		flex: 1;
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

	.success-banner {
		display: flex;
		gap: var(--spacing-lg);
		align-items: center;
		padding: var(--spacing-lg);
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
		border: 2px solid #10b981;
		border-radius: var(--border-radius);
	}

	.success-icon {
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, #10b981 0%, #059669 100%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		color: white;
		font-weight: bold;
		flex-shrink: 0;
	}

	.success-banner h3 {
		margin: 0 0 var(--spacing-xs) 0;
		color: var(--text-primary);
		font-size: 1.25rem;
	}

	.success-banner p {
		margin: 0;
		color: var(--text-secondary);
		font-size: 0.9rem;
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

	.info-card {
		height: fit-content;
	}

	.info-card h3 {
		margin: 0 0 var(--spacing-md) 0;
		color: var(--text-primary);
		font-size: 1.1rem;
	}

	.requirements-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.requirements-list li {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--text-secondary);
		font-size: 0.9rem;
		transition: color 0.2s;
	}

	.requirements-list li.met {
		color: #10b981;
	}

	.requirements-list .icon {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 0.75rem;
		font-weight: bold;
	}

	.requirements-list li.met .icon {
		background-color: #10b981;
		color: white;
	}

	.requirements-list li:not(.met) .icon {
		border: 2px solid var(--border);
		color: var(--text-secondary);
	}

	.tips-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.tips-list li {
		color: var(--text-secondary);
		font-size: 0.9rem;
		padding-left: var(--spacing-md);
		position: relative;
	}

	.tips-list li::before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--primary-color);
		font-weight: bold;
	}

	@media (max-width: 768px) {
		.content-grid {
			grid-template-columns: 1fr;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.card {
			padding: var(--spacing-lg);
		}

		.form-actions {
			flex-direction: column;
		}
	}
</style>
