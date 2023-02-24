import { EDGE_CONFIG, EDGE_CONFIG_ID, EDGE_CONFIG_TOKEN } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ fetch }) => {
	try {
		const readSingle = await fetch(
			`https://edge-config.vercel.com/${EDGE_CONFIG_ID}/item/config?token=${EDGE_CONFIG_TOKEN}`
		);
		const result = await readSingle.json();

		const { currentGameweek } = result;

		return new Response(String(currentGameweek));
	} catch (error) {
		console.log(error);
		return fail(500);
	}

	// return new Response(String(random));
}) satisfies RequestHandler;
