import { USER } from '$env/static/private';
import { supabaseClient } from '@lib/db';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	// if (!session) {
	// 	throw redirect(303, '/login');
	// }

	const { data, error } = await supabaseClient
		.from('Selections')
		.select()
		.eq('selector', session?.user.id);

	return {
		selections: data?.sort((a, b) => a.fixture - b.fixture)
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	signout: async (event) => {
		const { supabaseClient } = await getSupabase(event);
		await supabaseClient.auth.signOut();
		throw redirect(303, '/');
	}
};
