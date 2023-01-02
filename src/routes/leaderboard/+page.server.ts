import { supabaseClient } from '@lib/db';

export const load = (async ({ fetch, params }) => {
	const { data, error } = await supabaseClient.from('Users').select();

	return {
		users: data
	};
}) satisfies PageServerLoad;
