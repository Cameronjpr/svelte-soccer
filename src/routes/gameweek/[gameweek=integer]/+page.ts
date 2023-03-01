import { supabaseClient } from '@lib/db';
import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { fetch, params } = event;
	const { activeGameweek } = await event.parent();

	const res = await fetch(`/api/gameweek/${params.gameweek}`);

	if (!res.ok) {
		console.log(res.status);

		console.log(res);
		throw redirect(307, '/maintenance');
	}

	const data = await res.json();

	return {
		// selections: data ?? [],
		activeGameweek: activeGameweek,
		gameweek: data
	};
}) satisfies PageLoad;
