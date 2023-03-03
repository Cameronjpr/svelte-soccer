import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);

	const { data: selections } = await supabaseClient
		.from('Selections')
		.select()
		.eq('selector', session?.user.id);

	const { data: users } = await supabaseClient
		.from('Users')
		.select()
		.eq('auth_user', session?.user.id);

	if (users?.length) {
		return {
			selections: selections?.sort((a, b) => a.fixture - b.fixture),
			user: users[0]
		};
	}

	return {
		selections: selections?.sort((a, b) => a.fixture - b.fixture),
		user: null
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

		const { data: users } = await supabaseClient
			.from('Users')
			.select()
			.eq('auth_user', session?.user?.id);

		if (users?.length) {
			console.log('user exists. updating username...');

			const { data } = await supabaseClient
				.from('Users')
				.select()
				.eq('auth_user', session?.user?.id);

			const { error } = await supabaseClient
				.from('Users')
				.update({ username: username as string })
				.eq('auth_user', session?.user?.id);

			if (error) {
				console.log(error);
				return {
					error: 'Something went wrong updating your username.'
				};
			}
		} else {
			const { error } = await supabaseClient.from('Users').insert({
				username: username as string,
				auth_user: session?.user?.id,
				email: session?.user?.email
			});

			if (error) {
				console.log(error);
				return {
					error: 'Something went wrong updating your username.'
				};
			}
		}

		return {
			success: true
		};
	}
};
