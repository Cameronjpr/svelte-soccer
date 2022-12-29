import { supabaseClient } from '@lib/db';
import type { Actions } from './$types';

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		if (!email) {
			return null;
		}

		const { data, error } = await supabaseClient.auth.signInWithOtp({
			email: email as string,
			options: {
				emailRedirectTo: isProd
					? 'https://svelte-soccer.vercel.app/signin'
					: 'http://localhost:5173/signin'
			}
		});
	}
};
