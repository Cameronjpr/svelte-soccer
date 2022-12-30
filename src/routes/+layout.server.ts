import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '@lib/db';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);

	if (session?.user?.id) {
		supabaseClient
			.from('Users')
			.select('*')
			.eq('auth_user', session?.user?.id)
			.then((res) => {
				console.log(res);
				if (res?.data?.length === 0) {
					console.log('inserting user', session?.user?.id);
					supabaseClient
						.from('Users')
						.insert({
							auth_user: session?.user?.id,
							email: session?.user?.email,
							username: session?.user?.email
						})
						.then((res) => {
							if (res.error) {
								console.log('auth user error');
								console.log(res.error);
							}
							console.log(res.data);
						});
				}
			});
	}

	return {
		session: await getServerSession(event)
	};
};
