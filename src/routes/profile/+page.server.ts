import { USER } from '$env/static/private';
import { supabaseClient } from '@lib/db';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

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
	},
	updateUsername: async (event) => {
		const { session, supabaseClient } = await getSupabase(event);
		const data = await event.request.formData();
		const username = data.get('username');

		const { error } = await supabaseClient
			.from('Users')
			.update({ username: username })
			.eq('auth_user', session?.user.id);

		if (error) {
			console.log(error);
			return {
				error: 'Something went wrong updating your username.'
			};
		}

		return {
			success: true
		};
	}
};
