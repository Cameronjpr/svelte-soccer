import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event,
	})

	event.locals.getSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	// protect requests to all routes that start with /protected-routes
	if (event.url.pathname.startsWith('/profile')) {
		const session = await event.locals.getSession()


		if (!session) {
			redirect(303, '/login');
		}
	}

	if (event.url.pathname === '/gameweek/1') {
		redirect(303, '/');
	}

	// protect POST requests to all routes that start with /protected-posts
	if (event.url.pathname.startsWith('/gameweek') && event.request.method === 'POST') {
		const session = await event.locals.getSession()

		if (!session) {
			redirect(303, '/login?redirectTo=' + event.url.pathname);
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
	})
}
