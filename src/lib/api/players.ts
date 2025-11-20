import { apiGet } from './client';

export interface Player {
	id: string;
	name: string;
	team: string;
	position: string;
	price: number;
	avatar?: string;
	stats: {
		ppg: number;
		rpg: number;
		apg: number;
		spg?: number;
		bpg?: number;
		fgPercentage?: number;
	};
	points?: number;
	fantasyPoints?: number;
}

export interface PlayersResponse {
	players: Player[];
	total: number;
	page: number;
	pageSize: number;
}

export interface PlayerFilters {
	search?: string;
	position?: string;
	minPrice?: number;
	maxPrice?: number;
	sortBy?: 'name' | 'price' | 'points' | 'ppg';
	sortOrder?: 'asc' | 'desc';
	page?: number;
	pageSize?: number;
}

// Busca jogadores disponíveis no mercado
export async function fetchPlayers(filters?: PlayerFilters): Promise<PlayersResponse> {
	const params = new URLSearchParams();

	if (filters) {
		if (filters.search) params.append('search', filters.search);
		if (filters.position) params.append('position', filters.position);
		if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
		if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
		if (filters.sortBy) params.append('sortBy', filters.sortBy);
		if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
		if (filters.page) params.append('page', filters.page.toString());
		if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());
	}

	const queryString = params.toString();
	const endpoint = queryString ? `/players?${queryString}` : '/players';

	return await apiGet<PlayersResponse>(endpoint);
}

// Busca detalhes de um jogador específico
export async function fetchPlayerById(playerId: string): Promise<Player> {
	return await apiGet<Player>(`/players/${playerId}`);
}

// Busca jogadores por posição
export async function fetchPlayersByPosition(position: string): Promise<Player[]> {
	return await apiGet<Player[]>(`/players?position=${position}`);
}
