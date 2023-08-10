import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Selection } from '@lib/types';

export const load = (async ({ fetch, parent, params, depends }) => {
	const { activeGameweek, session, supabase } = await parent();

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

	const res = await fetch(`/api/gameweek/${params.gameweek}`);

	if (!res.ok) {
		throw redirect(307, '/maintenance');
	}

	const plData = await res.json();

	return {
		activeGameweek,
		gameweek: plData,
		selections: selections ?? []
	};
}) satisfies PageLoad;
