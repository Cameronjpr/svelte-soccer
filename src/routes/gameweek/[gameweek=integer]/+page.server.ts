import type { Actions } from './$types';
import { getServerSession, getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Fixture } from '@lib/types';
import { supabaseClient } from '@lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	select: async (event) => {
		const selection = event.url.searchParams.get('selection');
		const fixture = event.url.searchParams.get('fixture');
		const gameweek = event.url.searchParams.get('gameweek');

		const { session, supabaseClient } = await getSupabase(event);
		if (!session) {
			throw redirect(303, '/login');
		}

		const { data: selections } = await supabaseClient
			.from('Selections')
			.select()
			.eq('selector', session?.user.id);

		const existingGameweekSelection = selections?.find(
			(selection) => selection?.gameweek === Number(gameweek)
		);

		if (existingGameweekSelection?.id) {
			console.log('overwriting selection');
			const { data, error } = await supabaseClient
				.from('Selections')
				.update({
					selection: selection,
					selector: session?.user?.id,
					fixture: fixture,
					gameweek: gameweek
				})
				.eq('id', existingGameweekSelection?.id);

			if (error) {
				console.log(error);
				return fail(400, {
					message: 'We were unable to process your selection.'
				});
			}
		} else {
			const { data, error } = await supabaseClient.from('Selections').insert({
				selection: selection,
				selector: session?.user?.id,
				fixture: fixture,
				gameweek: gameweek
			});

			if (error) {
				console.log(error);
				return fail(400, {
					message: 'We were unable to process your selection.'
				});
			}
		}
	}
};

export const load = (async (event: any) => {
	const { formattedFixtures, activeGameweek } = await event.parent();
	console.log('parent fixtures', formattedFixtures?.length);

	const { params } = event;

	const session = await getServerSession(event);

	const { data, error } = await supabaseClient
		.from('Selections')
		.select()
		.eq('selector', session?.user?.id);

	const gameweekFixtures = formattedFixtures.filter(
		(fixture: Fixture) => fixture.event === Number(params.gameweek)
	);

	return {
		selections: data ?? [],
		activeGameweek: activeGameweek,
		formattedFixtures,
		gameweek: {
			event: Number(params.gameweek),
			fixtures: gameweekFixtures as Array<Fixture>
		}
	};
}) satisfies PageServerLoad;
