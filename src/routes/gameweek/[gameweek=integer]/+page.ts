import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Selection } from '@lib/types';

export const load = (async ({ fetch, parent, params, depends }) => {
	const { activeGameweek, session, supabase, streamed: { fixtures } } = await parent();

	let selections = [];
	if (session) {
		const { data, error } = await supabase
			.from('Selections')
			.select()
			.eq('selector', session?.user?.id);

		if (!error) {
			selections = data;
		}
	}

	return {
		activeGameweek,
		streamed: { fixtures },
		currentGameweek: params.gameweek,
		selections: selections ?? []
	};
}) satisfies PageLoad;
