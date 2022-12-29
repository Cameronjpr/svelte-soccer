import { USER } from '$env/static/private';
import { supabaseClient } from '@lib/db';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		throw redirect(303, '/login');
	}

	const { data, error } = await supabaseClient
		.from('Selections')
		.select()
		.eq('selector', session.user.id);

	console.log(data);

	return {
		selections: data
	};
}) satisfies PageServerLoad;
