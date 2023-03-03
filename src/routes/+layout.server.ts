import type { LayoutServerLoad } from './$types';

import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '@lib/db';

export const load: LayoutServerLoad = async (event) => {
	const { fetch } = event;
	const res = await fetch('/api/active-gameweek');
	let activeGameweek = 1;

	if (res.ok) {
		activeGameweek = await res.json();
	}

	const session = await getServerSession(event);

	const { data: selections, error } = await supabaseClient
		.from('Selections')
		.select()
		.eq('selector', session?.user?.id);

	const { data: popular } = await supabaseClient
		.from('Selections')
		.select('*', { count: 'exact', head: true });

	const { data: users } = await supabaseClient.from('Users').select('*');

	return {
		session: await getServerSession(event),
		selections: selections || [],
		popular,
		users: users?.length,
		activeGameweek: activeGameweek || 1
	};
};
