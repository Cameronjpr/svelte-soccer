import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

import { redirect, error, type Handle } from '@sveltejs/kit';

Sentry.init({
	dsn: "https://39d6598b1f4633ea39cb73c4a753c585@o4505675782946816.ingest.sentry.io/4505675785175040",
	tracesSampleRate: 1
})

export const handle: Handle = sequence(Sentry.sentryHandle(), async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event,
	})

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
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
			throw redirect(303, '/login');
		}
	}

	if (event.url.pathname === '/') {
		const session = await event.locals.getSession()


		if (!!session) {
			throw redirect(303, '/gameweek/1');
		}
	}

	// protect POST requests to all routes that start with /protected-posts
	if (event.url.pathname.startsWith('/gameweek') && event.request.method === 'POST') {
		const session = await event.locals.getSession()

		if (!session) {
			throw redirect(303, '/login?redirectTo=' + event.url.pathname);
		}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
	})
});

export const handleError = Sentry.handleErrorWithSentry();