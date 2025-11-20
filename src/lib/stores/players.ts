import { writable, type Writable } from 'svelte/store';

export interface PlayerStats {
	points: number;
	rebounds: number;
	assists: number;
	steals: number;
	blocks: number;
}

export interface Player {
	id: number;
	name: string;
	position: string;
	positionShort: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
	team: string;
	price: number;
	points: number;
	photo: string;
	stats: PlayerStats;
}

export const mockPlayers: Player[] = [
	{
		id: 1,
		name: 'LeBron James',
		position: 'Small Forward',
		positionShort: 'SF',
		team: 'Los Angeles Lakers',
		price: 42.5,
		points: 1850,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 25.7,
			rebounds: 7.3,
			assists: 7.5,
			steals: 1.3,
			blocks: 0.5
		}
	},
	{
		id: 2,
		name: 'Stephen Curry',
		position: 'Point Guard',
		positionShort: 'PG',
		team: 'Golden State Warriors',
		price: 45.0,
		points: 1920,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 29.4,
			rebounds: 6.1,
			assists: 6.3,
			steals: 0.9,
			blocks: 0.4
		}
	},
	{
		id: 3,
		name: 'Giannis Antetokounmpo',
		position: 'Power Forward',
		positionShort: 'PF',
		team: 'Milwaukee Bucks',
		price: 44.0,
		points: 1880,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 31.1,
			rebounds: 11.8,
			assists: 5.7,
			steals: 0.8,
			blocks: 1.2
		}
	},
	{
		id: 4,
		name: 'Kevin Durant',
		position: 'Power Forward',
		positionShort: 'PF',
		team: 'Phoenix Suns',
		price: 40.0,
		points: 1750,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 29.1,
			rebounds: 6.7,
			assists: 5.0,
			steals: 0.9,
			blocks: 1.1
		}
	},
	{
		id: 5,
		name: 'Nikola Jokic',
		position: 'Center',
		positionShort: 'C',
		team: 'Denver Nuggets',
		price: 43.0,
		points: 1900,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 24.5,
			rebounds: 11.8,
			assists: 9.8,
			steals: 1.3,
			blocks: 0.7
		}
	},
	{
		id: 6,
		name: 'Joel Embiid',
		position: 'Center',
		positionShort: 'C',
		team: 'Philadelphia 76ers',
		price: 41.5,
		points: 1800,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 33.1,
			rebounds: 10.2,
			assists: 4.2,
			steals: 1.0,
			blocks: 1.7
		}
	},
	{
		id: 7,
		name: 'Luka Doncic',
		position: 'Point Guard',
		positionShort: 'PG',
		team: 'Dallas Mavericks',
		price: 43.5,
		points: 1870,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 32.4,
			rebounds: 8.6,
			assists: 8.0,
			steals: 1.4,
			blocks: 0.5
		}
	},
	{
		id: 8,
		name: 'Jayson Tatum',
		position: 'Small Forward',
		positionShort: 'SF',
		team: 'Boston Celtics',
		price: 38.0,
		points: 1680,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 30.1,
			rebounds: 8.8,
			assists: 4.6,
			steals: 1.1,
			blocks: 0.7
		}
	},
	{
		id: 9,
		name: 'Damian Lillard',
		position: 'Point Guard',
		positionShort: 'PG',
		team: 'Milwaukee Bucks',
		price: 37.5,
		points: 1650,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 32.2,
			rebounds: 4.8,
			assists: 7.3,
			steals: 0.9,
			blocks: 0.3
		}
	},
	{
		id: 10,
		name: 'Anthony Davis',
		position: 'Power Forward',
		positionShort: 'PF',
		team: 'Los Angeles Lakers',
		price: 39.0,
		points: 1720,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 25.9,
			rebounds: 12.5,
			assists: 3.1,
			steals: 1.1,
			blocks: 2.0
		}
	},
	{
		id: 11,
		name: 'Devin Booker',
		position: 'Shooting Guard',
		positionShort: 'SG',
		team: 'Phoenix Suns',
		price: 36.0,
		points: 1590,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 27.8,
			rebounds: 4.5,
			assists: 6.2,
			steals: 0.8,
			blocks: 0.4
		}
	},
	{
		id: 12,
		name: 'Donovan Mitchell',
		position: 'Shooting Guard',
		positionShort: 'SG',
		team: 'Cleveland Cavaliers',
		price: 35.5,
		points: 1560,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 28.3,
			rebounds: 4.3,
			assists: 4.4,
			steals: 1.5,
			blocks: 0.4
		}
	},
	{
		id: 13,
		name: 'Kawhi Leonard',
		position: 'Small Forward',
		positionShort: 'SF',
		team: 'LA Clippers',
		price: 38.5,
		points: 1700,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 23.8,
			rebounds: 6.5,
			assists: 3.9,
			steals: 1.6,
			blocks: 0.5
		}
	},
	{
		id: 14,
		name: 'Jimmy Butler',
		position: 'Shooting Guard',
		positionShort: 'SG',
		team: 'Miami Heat',
		price: 34.0,
		points: 1500,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 22.9,
			rebounds: 5.9,
			assists: 5.3,
			steals: 1.8,
			blocks: 0.4
		}
	},
	{
		id: 15,
		name: 'Bam Adebayo',
		position: 'Center',
		positionShort: 'C',
		team: 'Miami Heat',
		price: 32.0,
		points: 1420,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 20.4,
			rebounds: 10.1,
			assists: 3.4,
			steals: 1.2,
			blocks: 0.8
		}
	},
	{
		id: 16,
		name: 'Trae Young',
		position: 'Point Guard',
		positionShort: 'PG',
		team: 'Atlanta Hawks',
		price: 33.5,
		points: 1480,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 26.2,
			rebounds: 2.8,
			assists: 10.2,
			steals: 1.1,
			blocks: 0.1
		}
	},
	{
		id: 17,
		name: 'Zion Williamson',
		position: 'Power Forward',
		positionShort: 'PF',
		team: 'New Orleans Pelicans',
		price: 31.0,
		points: 1380,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 26.0,
			rebounds: 7.0,
			assists: 4.6,
			steals: 1.1,
			blocks: 0.6
		}
	},
	{
		id: 18,
		name: 'Kyrie Irving',
		position: 'Point Guard',
		positionShort: 'PG',
		team: 'Dallas Mavericks',
		price: 34.5,
		points: 1520,
		photo: 'https://via.placeholder.com/100',
		stats: {
			points: 27.1,
			rebounds: 5.1,
			assists: 5.5,
			steals: 1.1,
			blocks: 0.5
		}
	}
];

export const availablePlayers: Writable<Player[]> = writable(mockPlayers);
