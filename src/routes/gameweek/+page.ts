import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async (event) => {
	const { activeGameweek } = await event.parent();

	console.log('gameweek page');
	console.log(activeGameweek);

	if (activeGameweek) {
		throw redirect(303, `/gameweek/${activeGameweek}`);
	} else {
		throw redirect(303, `/gameweek/1`);
	}
};
