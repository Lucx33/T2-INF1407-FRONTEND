import { writable, type Writable } from 'svelte/store';
import type { Player } from './players';

export interface Formation {
	name: string;
	guards: number;
	forwards: number;
	center: number;
}

export interface UserTeam {
	name: string;
	budget: number;
	players: Player[];
	formation: 'standard' | 'small-ball' | 'twin-towers';
}

export const formations: Record<string, Formation> = {
	'standard': {
		name: 'Standard',
		guards: 2,      // PG + SG
		forwards: 2,    // SF + PF
		center: 1       // C
	},
	'small-ball': {
		name: 'Small Ball',
		guards: 3,      // Multiple guards
		forwards: 2,    // Forwards
		center: 0       // No traditional center
	},
	'twin-towers': {
		name: 'Twin Towers',
		guards: 2,      // Guards
		forwards: 1,    // One forward
		center: 2       // Two centers
	}
};

export const userTeam: Writable<UserTeam> = writable({
	name: 'My Team',
	budget: 200,
	players: [],
	formation: 'standard'
});
