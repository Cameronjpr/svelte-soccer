import { supabaseClient } from '@lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		console.log('attempting to sign out');
		const { error } = supabaseClient.auth.signOut();

		if (error) {
			console.log(error);
		}
		throw redirect(303, '/');
	}
};
