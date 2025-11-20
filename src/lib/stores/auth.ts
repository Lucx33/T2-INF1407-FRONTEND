import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { loginUser, registerUser } from '$lib/api/auth';

export interface AuthUser {
	id: string;
	username: string;
	email: string;
	teamName?: string;
}

interface AuthState {
	user: AuthUser | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

// Inicializa o estado de forma síncrona durante a criação do store
function getInitialState(): AuthState {
	// Se não estiver no browser (SSR), retorna estado com loading = true
	// para evitar flash durante hidratação
	if (!browser) {
		return {
			user: null,
			token: null,
			isAuthenticated: false,
			isLoading: true // ✓ Mantém loading durante SSR
		};
	}

	// No cliente, lê o localStorage de forma síncrona
	const storedToken = localStorage.getItem('auth_token');
	const storedUser = localStorage.getItem('auth_user');

	if (storedToken && storedUser) {
		try {
			const user = JSON.parse(storedUser);
			return {
				user,
				token: storedToken,
				isAuthenticated: true,
				isLoading: false // ✓ Carregamento completo
			};
		} catch (error) {
			console.error('Error parsing stored user:', error);
			localStorage.removeItem('auth_token');
			localStorage.removeItem('auth_user');
			return {
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false // ✓ Carregamento completo (erro)
			};
		}
	}

	// Não autenticado, mas carregamento completo
	return {
		user: null,
		token: null,
		isAuthenticated: false,
		isLoading: false // ✓ Carregamento completo
	};
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>(getInitialState());

	return {
		subscribe,

		// Login
		login: async (email: string, password: string, rememberMe: boolean = false) => {
			try {
				const response = await loginUser({ email, password, rememberMe });

				// Assumindo que a API retorna { user: {...}, token: "..." }
				// Ajuste conforme a estrutura real da sua API
				const { user, token, access_token } = response;
				const authToken = token || access_token;

				if (!authToken) {
					throw new Error('Token não recebido da API');
				}

				const authUser: AuthUser = {
					id: user.id || user._id || user.userId,
					username: user.username || user.name,
					email: user.email,
					teamName: user.teamName || user.team_name
				};

				// Salva no localStorage
				if (browser) {
					localStorage.setItem('auth_token', authToken);
					localStorage.setItem('auth_user', JSON.stringify(authUser));
				}

				// Atualiza o store
				set({
					user: authUser,
					token: authToken,
					isAuthenticated: true,
					isLoading: false
				});

				// Redireciona para o dashboard
				goto('/dashboard');

				return { success: true };
			} catch (error: any) {
				console.error('Login error:', error);
				throw error;
			}
		},

		// Register
		register: async (formData: {
			username: string;
			email: string;
			password: string;
			confirmPassword: string;
			teamName: string;
		}) => {
			try {
				const response = await registerUser(formData);

				// Assumindo que a API retorna { user: {...}, token: "..." }
				// Ou pode fazer login automático após registro
				const { user, token, access_token } = response;
				const authToken = token || access_token;

				if (authToken) {
					// Se a API retornar token no registro, faz login automático
					const authUser: AuthUser = {
						id: user.id || user._id || user.userId,
						username: user.username || user.name,
						email: user.email,
						teamName: user.teamName || user.team_name
					};

					if (browser) {
						localStorage.setItem('auth_token', authToken);
						localStorage.setItem('auth_user', JSON.stringify(authUser));
					}

					set({
						user: authUser,
						token: authToken,
						isAuthenticated: true,
						isLoading: false
					});

					goto('/dashboard');
				} else {
					// Se não retornar token, redireciona para login
					goto('/login');
				}

				return { success: true };
			} catch (error: any) {
				console.error('Register error:', error);
				throw error;
			}
		},

		// Logout
		logout: () => {
			if (browser) {
				localStorage.removeItem('auth_token');
				localStorage.removeItem('auth_user');
			}

			set({
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false
			});

			goto('/');
		},

		// Atualiza dados do usuário
		updateUser: (userData: Partial<AuthUser>) => {
			update((state) => {
				if (state.user) {
					const updatedUser = { ...state.user, ...userData };

					if (browser) {
						localStorage.setItem('auth_user', JSON.stringify(updatedUser));
					}

					return {
						...state,
						user: updatedUser
					};
				}
				return state;
			});
		},

		// Verifica se o usuário está autenticado
		checkAuth: () => {
			if (browser) {
				const token = localStorage.getItem('auth_token');
				return !!token;
			}
			return false;
		}
	};
}

export const authStore = createAuthStore();
