import { supabaseClient } from '@lib/db';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const { data, error } = await supabaseClient.from('Users').select();

	console.log(data);

	throw redirect(303, '/');
}) satisfies PageServerLoad;
