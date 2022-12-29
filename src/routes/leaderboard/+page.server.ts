import { supabaseClient } from '@lib/db';

export const load = (async ({ fetch, params }) => {
	const { data, error } = await supabaseClient.from('Users').select();

	console.log(data, error);
	return {
		users: data
	};
}) satisfies PageServerLoad;
