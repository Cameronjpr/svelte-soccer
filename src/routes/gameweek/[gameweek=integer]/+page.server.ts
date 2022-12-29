import type { Actions, PageServerLoad } from './$types';
import type { Fixture } from '@lib/types';
import { teams } from '@lib/teams';
import { supabaseClient } from '@lib/db';
import { fail } from '@sveltejs/kit';
import { USER } from '$env/static/private';

export const actions: Actions = {
	select: async ({ request, url }) => {
		const selection = url.searchParams.get('selection');
		const fixture = url.searchParams.get('fixture');

		const {
			data: { user }
		} = await supabaseClient.auth.getUser();

		console.log(user);

		if (!user) {
			return fail(401, {
				message: 'You must be logged in to make a selection.'
			});
		}
		const { data, error } = await supabaseClient
			.from('Selections')
			.insert({ selection: selection, selector: user?.id, fixture: fixture });

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

	const { data, error } = await supabaseClient.from('Selections').select().eq('user', Number(1));

	console.log(data, error);

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
