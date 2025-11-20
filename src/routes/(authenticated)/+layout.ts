import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export const load = async () => {
	if (browser) {
		const token = localStorage.getItem('auth_token');

		if (!token) {
			goto('/login');
			return { authenticated: false };
		}

		return { authenticated: true };
	}

	return { authenticated: false };
};
