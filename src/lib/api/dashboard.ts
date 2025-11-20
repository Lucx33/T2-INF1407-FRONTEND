import { apiGet } from './client';

export interface UserStats {
	totalPoints: number;
	rank: number;
	weeklyPoints: number;
	weeklyRankChange: number;
	totalPlayers: number;
	budgetUsed: number;
	budgetRemaining: number;
}

export interface RecentActivity {
	id: string;
	type: 'player_added' | 'player_removed' | 'points_earned' | 'rank_change';
	message: string;
	timestamp: string;
	points?: number;
}

export interface League {
	id: string;
	name: string;
	members: number;
	yourRank: number;
}

export interface DashboardData {
	stats: UserStats;
	recentActivity: RecentActivity[];
	leagues: League[];
	topPerformers?: {
		playerId: string;
		playerName: string;
		points: number;
	}[];
}

// Busca dados do dashboard
export async function fetchDashboard(): Promise<DashboardData> {
	return await apiGet<DashboardData>('/dashboard');
}

// Busca estatísticas do usuário
export async function fetchUserStats(): Promise<UserStats> {
	return await apiGet<UserStats>('/dashboard/stats');
}

// Busca atividades recentes
export async function fetchRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
	return await apiGet<RecentActivity[]>(`/dashboard/activity?limit=${limit}`);
}

// Busca ligas do usuário
export async function fetchUserLeagues(): Promise<League[]> {
	return await apiGet<League[]>('/dashboard/leagues');
}
