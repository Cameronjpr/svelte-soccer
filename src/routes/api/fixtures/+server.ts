import { formatFixtures } from '@lib/util/fixture';
import { fail } from '@sveltejs/kit';

export async function GET({ fetch }) {
	console.log('gameweek GET handler');
	const fixturesCacheLifetime = 60; // in seconds

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

	return new Response(JSON.stringify(formattedFixtures), {
		headers: {
			'cache-control': `public, max-age=${fixturesCacheLifetime}`
		}
	});
}
