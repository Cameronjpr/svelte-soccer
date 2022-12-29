import { supabaseClient } from '@lib/db';
import type { Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
	login: async ({ request, url }) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			const { data, error } = await supabaseClient.auth.signInWithOAuth({
				provider: provider
			});

			if (error) {
				console.log(error);
				return fail(400, {
					message: 'We were unable to log you in. Please try again.'
				});
			}

			throw redirect(303, data.url);
		}
	}
};
