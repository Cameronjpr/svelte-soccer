import type { LayoutServerLoad } from './$types';

import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect } from '@sveltejs/kit';
import { getActiveGameweek } from '@lib/util/gameweek';

export const load: LayoutServerLoad = async (event) => {
	const { fetch } = event;
	const res = await fetch('/api/active-gameweek');
	const activeGameweek = await res.json();

	return {
		session: await getServerSession(event),
		activeGameweek: activeGameweek ?? 1
	};
};
