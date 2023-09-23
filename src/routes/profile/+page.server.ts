import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Selection } from '@lib/types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	const { data: selections } = await supabase
		.from('Selections')
		.select()
		.eq('selector', session?.user.id) as { data: Array<Selection> };

	const { data: users } = await supabase
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
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	},
	optOut: async ({  locals: { supabase, getSession } }) => {
		const session = await getSession();

		const { error } = await supabase.from('Users').update({ receives_emails: false }).eq('auth_user', session?.user.id);

		if (error) {
			console.log(error);
			return {
				error: 'Something went wrong deleting your account.'
			};
		}
	},
	deleteAccount: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();

		const { error } = await supabase
			.from('Users')
			.delete()
			.eq('auth_user', session?.user.id);

		if (error) {
			console.log(error);
			return {
				error: 'Something went wrong deleting your account.'
			};
		}

		await supabase.auth.signOut();
	},
	updateUsername: async ({ request, locals: { getSession, supabase } }) => {
		const session = await getSession();
		const data = await request.formData();
		const username = data.get('username');

		const { data: users } = await supabase
			.from('Users')
			.select()
			.eq('auth_user', session?.user?.id);

		if (users?.length) {
			console.log('user exists. updating username...');

			const { data, error } = await supabase
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
			const { error } = await supabase.from('Users').insert({
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
