import { EDGE_CONFIG, EDGE_CONFIG_ID, EDGE_CONFIG_TOKEN } from '$env/static/private';
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
			console.log(res.status);

			console.log(res);

			return new Response(String(1));
		}

		// const readSingle = await fetch(
		// 	`https://edge-config.vercel.com/${EDGE_CONFIG_ID}/item/config?token=${EDGE_CONFIG_TOKEN}`
		// );
		// const result = await readSingle.json();

		const fixtures = await res.json();
		const activeGameweek = getActiveGameweek(fixtures);

		return new Response(String(activeGameweek));
	} catch (error) {
		console.log(error);
		return fail(500);
	}

	// return new Response(String(random));
}) satisfies RequestHandler;
