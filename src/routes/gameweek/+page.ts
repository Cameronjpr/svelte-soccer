import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const { activeGameweek } = await event.parent();

	if (activeGameweek) {
		throw redirect(303, `/gameweek/${activeGameweek}`);
	} else {
		throw redirect(303, `/gameweek/1`);
	}
};
