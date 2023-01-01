import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '@lib/db';
import { teams } from '@lib/teams';
import type { Fixture } from '@lib/types';
import { getActiveGameweek } from '@lib/util/gameweek';
import { invalidate } from '$app/navigation';
import { formatFixtures } from '@lib/util/fixture';
import { fail } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);

	const res = await fetch('https://fantasy.premierleague.com/api/fixtures/', {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});

	if (!res.ok) {
		throw fail(500, {
			message: 'Unable to fetch fixtures'
		});
	}

	const fixtures = await res.json();
	const formattedFixtures = formatFixtures(fixtures);

	if (session?.user?.id) {
		supabaseClient
			.from('Users')
			.select('*')
			.eq('auth_user', session?.user?.id)
			.then((res) => {
				console.log(res);
				if (res?.data?.length === 0) {
					console.log('inserting user', session?.user?.id);
					supabaseClient
						.from('Users')
						.insert({
							auth_user: session?.user?.id,
							email: session?.user?.email,
							username: session?.user?.email
						})
						.then((res) => {
							if (res.error) {
								console.log('auth user error');
								console.log(res.error);
							}
							console.log(res.data);
						});
				}
			});
	}

	const activeGameweek = getActiveGameweek(fixtures);

	return {
		session: session,
		formattedFixtures: formattedFixtures,
		activeGameweek: activeGameweek
	};
};
