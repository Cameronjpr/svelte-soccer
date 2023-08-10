import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getActiveGameweek } from '$lib/util/gameweek';

export const GET = (async ({ fetch }) => {
	try {
		const res = await fetch(`https://fantasy.premierleague.com/api/fixtures`, {
			headers: {
				'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
			}
		});

		if (!res.ok) {
			return new Response(String(1));
		}

		const fixtures = await res.json();
		const activeGameweek = getActiveGameweek(fixtures);

		return new Response(String(activeGameweek));
	} catch (error) {
		return new Response(String(1));
	}

	// return new Response(String(random));
}) satisfies RequestHandler;
