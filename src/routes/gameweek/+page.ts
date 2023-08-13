import type { PageLoad } from './$types';
import type { Selection } from '@lib/types';

export const load = (async ({ fetch, parent, params, url }) => {
	const { streamed: { fixtures, selections }, currentGameweek } = await parent();

	return {
		currentGameweek,
		fixtures,
		selections
	};
}) satisfies PageLoad;

