import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '@lib/db';
import { getActiveGameweek } from '@lib/util/gameweek';
import { fail } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const { fetch } = event;
	const { session } = await getSupabase(event);

	const res = await fetch('/api/fixtures');

	if (!res.ok) {
		throw fail(500, {
			message: 'Unable to fetch fixtures'
		});
	}

	const fixtures = await res.json();

	if (session?.user?.id) {
		supabaseClient
			.from('Users')
			.select('*')
			.eq('auth_user', session?.user?.id)
			.then((res) => {
				if (res?.data?.length === 0) {
					console.log('inserting user', session?.user?.id);
					supabaseClient
						.from('Users')
						.insert({
							auth_user: session?.user?.id,
							email: session?.user?.email,
							username: 'anonymous player'
						})
						.then((res) => {
							if (res.error) {
								console.log('auth user error');
								console.log(res.error);
							}
						});
				}
			});
	}

	const activeGameweek = getActiveGameweek(fixtures);

	return {
		session: session,
		formattedFixtures: fixtures,
		activeGameweek: activeGameweek
	};
};
