import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Actions } from './$types';

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
	login: async (event) => {
		const { request, cookies, url } = event;
		const { session, supabaseClient } = await getSupabase(event);
		const provider = url.searchParams.get('provider') as Provider;
		const redirectTo = url.searchParams.get('redirectTo') ?? '';

		if (provider) {
			const { data, error } = await supabaseClient.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo:
						(isProd ? 'https://svelte-soccer.vercel.app' : 'http://localhost:5173') + redirectTo
				}
			});

			console.log(data);
			if (error) {
				if (error instanceof AuthApiError && error.status === 400) {
					return fail(400, {
						error: 'Invalid credentials.'
					});
				}
				return fail(500, {
					error: 'Server error. Try again later.'
				});
			}

			throw redirect(303, data.url);
		}
	}
};
