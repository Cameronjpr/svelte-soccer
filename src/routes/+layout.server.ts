import type { LayoutServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '@lib/db';
import { getActiveGameweek } from '@lib/util/gameweek';
import { fail } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const { fetch, setHeaders } = event;
	const { session } = await getSupabase(event);

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

	setHeaders({
		'cache-control': 'max-age=60'
	});

	return {
		session: session
		// formattedFixtures: fixtures,
		// activeGameweek: activeGameweek
	};
};
