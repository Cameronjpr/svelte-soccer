import type { Actions, PageServerLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Fixture } from '@lib/types';
import { teams } from '@lib/teams';
import { supabaseClient } from '@lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { USER } from '$env/static/private';

export const actions: Actions = {
	select: async (event) => {
		const selection = event.url.searchParams.get('selection');
		const fixture = event.url.searchParams.get('fixture');

		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(303, '/login');
		}

		const { data, error } = await supabaseClient
			.from('Selections')
			.insert({ selection: selection, selector: session?.user?.id, fixture: fixture });

		if (error) {
			console.log(error);
			return fail(400, {
				message: 'We were unable to process your selection.'
			});
		}
	}
};

export const load = (async ({ fetch, params }) => {
	const res = await fetch('https://fantasy.premierleague.com/api/fixtures/', {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});
	const fixtures = await res.json();

	const gameweekFixtures = fixtures
		.filter((fixture: Fixture) => fixture.event === Number(params.gameweek))
		.map((fixture) => {
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

	return {
		gameweek: {
			event: Number(params.gameweek),
			fixtures: gameweekFixtures as Array<Fixture>
		}
	};
}) satisfies PageServerLoad;
