import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '@lib/db';
import { teams } from '@lib/teams';
import type { Fixture } from '@lib/types';
import { getActiveGameweek } from '@lib/util/gameweek';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);

	const res = await fetch('https://fantasy.premierleague.com/api/fixtures/', {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});
	const fixtures = await res.json();
	const formattedFixtures = fixtures.map((fixture: Fixture) => {
		return {
			...fixture,
			team_h: {
				id: fixture.team_h,
				name: teams[fixture.team_h - 1].name,
				shortName: teams[fixture.team_h - 1].shortName,
				primaryColor: teams[fixture.team_h - 1].primaryColor
			},
			team_a: {
				id: fixture.team_a,
				name: teams[fixture.team_a - 1].name,
				shortName: teams[fixture.team_a - 1].shortName,
				primaryColor: teams[fixture.team_a - 1].primaryColor
			}
		};
	});

	const activeGameweek = getActiveGameweek(fixtures);

	console.log('layout gameweek', activeGameweek);

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

	console.log('formatted fixtures', formattedFixtures?.length);
	console.log('activeGameweek', activeGameweek);

	return {
		session: await getServerSession(event),
		formattedFixtures: formattedFixtures,
		activeGameweek: activeGameweek
	};
};
