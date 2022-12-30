import type { Actions } from './$types';
import { getServerSession, getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Fixture } from '@lib/types';
import { teams } from '@lib/teams';
import { supabaseClient } from '@lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { USER } from '$env/static/private';
import { getActiveGameweek } from '@lib/util/gameweek';
import { writable } from 'svelte/store';

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
			(selection) => selection.gameweek === Number(gameweek)
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

			console.log(data);

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

		throw redirect(303, `/gameweek/${gameweek}`);
	}
};

export const load = (async (event) => {
	const { params } = event;
	const res = await fetch('https://fantasy.premierleague.com/api/fixtures/', {
		headers: {
			'Access-Control-Allow-Origin': 'https://fantasy.premierleague.com'
		}
	});
	const fixtures = await res.json();
	const session = await getServerSession(event);

	const { data, error } = await supabaseClient
		.from('Selections')
		.select()
		.eq('selector', session?.user.id);

	const gameweekFixtures = fixtures
		.filter((fixture: Fixture) => fixture.event === Number(params.gameweek))
		.map((fixture: Fixture) => {
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

	const activeGameweek = getActiveGameweek(fixtures);

	return {
		selections: data,
		activeGameweek: activeGameweek,
		gameweek: {
			event: Number(params.gameweek),
			fixtures: gameweekFixtures as Array<Fixture>
		}
	};
}) satisfies PageServerLoad;
