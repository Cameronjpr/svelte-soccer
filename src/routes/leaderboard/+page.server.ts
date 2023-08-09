import { supabaseClient } from '@lib/db';
import type { Fixture } from '@lib/types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const { data, error } = await supabaseClient.from('Users').select();

	return {
		users: data
	};
}) satisfies PageServerLoad;
