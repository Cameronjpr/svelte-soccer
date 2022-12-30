import '$lib/db';
import type { RequestHandler } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// protect requests to all routes that start with /protected-routes
	if (event.url.pathname.startsWith('/profile')) {
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) {
			throw redirect(303, '/login');
		}
	}

	// protect POST requests to all routes that start with /protected-posts
	if (event.url.pathname.startsWith('/gameweek') && event.request.method === 'POST') {
		const { session, supabaseClient } = await getSupabase(event);

		if (!session) {
			throw redirect(303, '/login?redirectTo=' + event.url.pathname);
		}
	}

	return resolve(event);
};
