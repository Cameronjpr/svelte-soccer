import type { LayoutServerLoad } from './$types';

import { getServerSession } from '@supabase/auth-helpers-sveltekit';

export const load: LayoutServerLoad = async (event) => {
	const { fetch } = event;
	const res = await fetch('/api/active-gameweek');
	let activeGameweek = 1;

	if (res.ok) {
		activeGameweek = await res.json();
	}

	return {
		session: await getServerSession(event),
		activeGameweek: activeGameweek || 1
	};
};
