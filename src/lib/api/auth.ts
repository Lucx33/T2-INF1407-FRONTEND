import { PUBLIC_API_URL } from '$env/static/public';

// Função de registro
export async function registerUser(payload: Record<string, any>) {
    const res = await fetch(`${PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.detail || 'Erro ao registrar usuário');
    }

    return await res.json();
}

// Função de login
export async function loginUser(payload: { email: string; password: string; rememberMe?: boolean }) {
    const res = await fetch(`${PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.detail || 'Erro no login');
    }

    return await res.json();
}
