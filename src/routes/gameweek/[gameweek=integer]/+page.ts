import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, parent, params, depends }) => {
	const { activeGameweek } = await parent();

	const res = await fetch(`/api/gameweek/${params.gameweek}`);

	if (!res.ok) {
		console.log(res.status);

		console.log(res);
		throw redirect(307, '/maintenance');
	}

	const plData = await res.json();

	return {
		activeGameweek: activeGameweek,
		gameweek: plData
	};
}) satisfies PageLoad;
