import type { LayoutServerLoad } from './$types';

import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { fail } from '@sveltejs/kit';
import { getActiveGameweek } from '@lib/util/gameweek';

export const load: LayoutServerLoad = async (event) => {
	const { fetch } = event;
	const url = 'https://fantasy.premierleague.com/api/fixtures';
	const res = await fetch(url);

	if (!res.ok) {
		throw fail(500, {
			message: 'Unable to fetch fixtures'
		});
	}

	const fixtures = await res.json();

	const activeGameweek = getActiveGameweek(fixtures);

	console.log('activeGameweek', activeGameweek);
	return {
		session: await getServerSession(event),
		activeGameweek
	};
};
