import { apiGet } from './client';

export interface LeaderboardEntry {
	rank: number;
	userId: string;
	username: string;
	teamName: string;
	points: number;
	avatar?: string;
	wins?: number;
	losses?: number;
	draws?: number;
}

export interface LeaderboardResponse {
	leaderboard: LeaderboardEntry[];
	userPosition?: LeaderboardEntry;
	total: number;
	page?: number;
	pageSize?: number;
}

// Busca o leaderboard global
export async function fetchLeaderboard(page: number = 1, pageSize: number = 50): Promise<LeaderboardResponse> {
	return await apiGet<LeaderboardResponse>(`/leaderboard?page=${page}&pageSize=${pageSize}`);
}

// Busca a posição do usuário no leaderboard
export async function fetchUserPosition(): Promise<LeaderboardEntry> {
	return await apiGet<LeaderboardEntry>('/leaderboard/me');
}

// Busca o top N jogadores
export async function fetchTopPlayers(limit: number = 10): Promise<LeaderboardEntry[]> {
	return await apiGet<LeaderboardEntry[]>(`/leaderboard/top?limit=${limit}`);
}