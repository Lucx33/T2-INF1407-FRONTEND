import { writable, type Writable } from 'svelte/store';

export interface League {
	id: number;
	name: string;
	rank: number;
}

export interface User {
	name: string;
	rank: number;
	points: number;
	leagues: League[];
}

export interface LeaderboardEntry {
	rank: number;
	name: string;
	points: number;
	team: string;
}

export const currentUser: Writable<User> = writable({
	name: 'Player',
	rank: 1542,
	points: 1850,
	leagues: [
		{ id: 1, name: 'Friends League', rank: 3 },
		{ id: 2, name: 'Global League', rank: 1542 }
	]
});

export const leaderboard: Writable<LeaderboardEntry[]> = writable([
	{ rank: 1, name: 'Supreme Champion', points: 2450, team: 'The Unbeatable' },
	{ rank: 2, name: 'Tactical Master', points: 2380, team: 'Hoops Dynasty' },
	{ rank: 3, name: 'Pro Player', points: 2310, team: 'Dream Team' },
	{ rank: 4, name: 'Strategist', points: 2250, team: 'Ballers United' },
	{ rank: 5, name: 'Top Scorer', points: 2180, team: 'Court Kings' },
	{ rank: 6, name: 'Winner', points: 2120, team: 'The Legends' },
	{ rank: 7, name: 'Star', points: 2050, team: 'Slam Dunkers' },
	{ rank: 8, name: 'Champion', points: 1990, team: 'Fast Break FC' },
	{ rank: 9, name: 'All-Star', points: 1920, team: 'Triple Threats' },
	{ rank: 10, name: 'Competitor', points: 1850, team: 'My Team' }
]);
