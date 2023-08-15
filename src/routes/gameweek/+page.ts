import { getActiveGameweek } from '@lib/util/gameweek';
import type { PageLoad } from './$types';
import type { Selection } from '@lib/types';

export async function load({ parent }) {
	const { streamed: { fixtures, selections }, currentGameweek } = await parent();

	return {
		currentGameweek: currentGameweek ?? null,
		fixtures,
		selections
	};
}

