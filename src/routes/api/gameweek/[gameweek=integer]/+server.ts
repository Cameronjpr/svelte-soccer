import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ url, fetch, params, setHeaders }) => {
	const res = await fetch(
		`https://fantasy.premierleague.com/api/fixtures/?event=${params.gameweek}`,
		{
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}
	);

	if (!res.ok) {
		return {
			status: res.status
		};
	}

	const fixtures = await res.json();
	const formattedFixtures = formatFixtures(fixtures);

	const gameweekFixtures = formattedFixtures.filter(
		(fixture: Fixture) => fixture.event === Number(params.gameweek)
	);

	setHeaders({
		age: res?.headers?.get('age'),
		'cache-control': 'max-age=60'
	});

	return json({
		event: Number(params.gameweek),
		fixtures: gameweekFixtures as Array<Fixture>
	});
};
