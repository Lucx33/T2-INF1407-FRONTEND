import { PUBLIC_API_URL } from '$env/static/public';
import { browser } from '$app/environment';

// Helper para fazer requisições autenticadas
export async function apiRequest(
	endpoint: string,
	options: RequestInit = {}
): Promise<Response> {
	const token = browser ? localStorage.getItem('auth_token') : null;

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...options.headers
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const response = await fetch(`${PUBLIC_API_URL}${endpoint}`, {
		...options,
		headers
	});

	// Se receber 401 (Não autorizado), redireciona para login
	if (response.status === 401 && browser) {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_user');
		window.location.href = '/login';
	}

	return response;
}

// Helper para fazer requisições GET
export async function apiGet<T>(endpoint: string): Promise<T> {
	const response = await apiRequest(endpoint, { method: 'GET' });

	if (!response.ok) {
		const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
		throw new Error(error.detail || 'Erro na requisição');
	}

	return await response.json();
}

// Helper para fazer requisições POST
export async function apiPost<T>(endpoint: string, data?: any): Promise<T> {
	const response = await apiRequest(endpoint, {
		method: 'POST',
		body: data ? JSON.stringify(data) : undefined
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
		throw new Error(error.detail || 'Erro na requisição');
	}

	return await response.json();
}

// Helper para fazer requisições PUT
export async function apiPut<T>(endpoint: string, data?: any): Promise<T> {
	const response = await apiRequest(endpoint, {
		method: 'PUT',
		body: data ? JSON.stringify(data) : undefined
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
		throw new Error(error.detail || 'Erro na requisição');
	}

	return await response.json();
}

// Helper para fazer requisições DELETE
export async function apiDelete<T>(endpoint: string): Promise<T> {
	const response = await apiRequest(endpoint, { method: 'DELETE' });

	if (!response.ok) {
		const error = await response.json().catch(() => ({ detail: 'Erro na requisição' }));
		throw new Error(error.detail || 'Erro na requisição');
	}

	return await response.json();
}
