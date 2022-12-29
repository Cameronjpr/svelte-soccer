import type { PageServerLoad } from './$types';
import type { Fixture } from '@lib/types';
import { teams } from '@lib/teams';

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
