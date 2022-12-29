import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '$env/static/private';

const supabaseUrl = 'https://keigskwruocgwhoomqyh.supabase.co';
const supabase = createClient(supabaseUrl, SUPABASE_KEY);

export const load = (async ({ fetch, params }) => {
	const { data, error } = await supabase.from('Users').select();

	console.log(data, error);
	return {
		users: data
	};
}) satisfies PageServerLoad;
