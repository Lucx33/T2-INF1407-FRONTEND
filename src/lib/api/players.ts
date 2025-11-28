import { apiGet } from './client';

export interface Player {
	id: number;
	name: string;
	position: string;
	positionShort: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
	team: string;
	price: string;
	points: number;
	photo: string;
	stats: {
		points: string;
		rebounds: string;
		assists: string;
		steals: string;
		blocks: string;
	};
}

// Busca jogadores disponíveis no mercado
export async function fetchPlayers(): Promise<Player[]> {
	return await apiGet<Player[]>('/players/');
}

// Busca detalhes de um jogador específico
export async function fetchPlayerById(playerId: string): Promise<Player> {
	return await apiGet<Player>(`/players/${playerId}`);
}

// Busca jogadores por posição
export async function fetchPlayersByPosition(position: string): Promise<Player[]> {
	return await apiGet<Player[]>(`/players?position=${position}`);
}
