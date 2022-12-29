import { supabaseClient } from '@lib/db';
import type { Actions } from './$types';

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email) {
			return null;
		}

		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: email as string,
			password: password as string
		});

		console.log(data, error);
	}
};
