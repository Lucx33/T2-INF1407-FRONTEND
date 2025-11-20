import { apiGet, apiPost, apiPut, apiDelete } from './client';
import type { Player } from './players';

export interface UserTeam {
	id: string;
	userId: string;
	teamName: string;
	budget: number;
	totalBudget: number;
	formation: string;
	players: Player[];
	points: number;
	rank?: number;
}

export interface AddPlayerRequest {
	playerId: string;
	position?: string;
}

export interface RemovePlayerRequest {
	playerId: string;
}

export interface UpdateFormationRequest {
	formation: string;
}

// Busca o time do usuário
export async function fetchUserTeam(): Promise<UserTeam> {
	return await apiGet<UserTeam>('/team');
}

// Adiciona um jogador ao time
export async function addPlayerToTeam(playerId: string, position?: string): Promise<UserTeam> {
	return await apiPost<UserTeam>('/team/players', { playerId, position });
}

// Remove um jogador do time
export async function removePlayerFromTeam(playerId: string): Promise<UserTeam> {
	return await apiDelete<UserTeam>(`/team/players/${playerId}`);
}

// Atualiza a formação do time
export async function updateTeamFormation(formation: string): Promise<UserTeam> {
	return await apiPut<UserTeam>('/team/formation', { formation });
}

// Atualiza o nome do time
export async function updateTeamName(teamName: string): Promise<UserTeam> {
	return await apiPut<UserTeam>('/team/name', { teamName });
}

// Valida se pode adicionar um jogador ao time
export async function validatePlayerAddition(playerId: string): Promise<{
	valid: boolean;
	message?: string;
	budgetRemaining?: number;
}> {
	return await apiPost<{ valid: boolean; message?: string; budgetRemaining?: number }>(
		'/team/validate',
		{ playerId }
	);
}
