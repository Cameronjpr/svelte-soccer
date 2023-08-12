import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	select: async ({ url, locals: { getSession, supabase } }) => {
		console.log('selecting fixture');
		const selection = url.searchParams.get('selection');
		const fixture = url.searchParams.get('fixture');
		const gameweek = url.searchParams.get('gameweek');

		const session = await getSession();
		if (!session) {
			throw redirect(303, '/login');
		}

		// Find selections for this user
		const { data: selections } = await supabase
			.from('Selections')
			.select()
			.eq('selector', session?.user.id);

		const existingGameweekSelection = selections?.find(
			(selection) => selection?.gameweek === Number(gameweek)
		);

		// Get previous selections for this team
		const previousSelectionCount = selections?.filter(s => s.selection == selection).length

		if (previousSelectionCount >= 2) {
			return fail(400, {
				message: 'You have already selected this team twice'
			});
		}

		if (existingGameweekSelection?.id) {
			console.log('overwriting selection');
			const { data, error } = await supabase
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
			const { error } = await supabase.from('Selections').insert({
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
		return { success: true };
	}
};

