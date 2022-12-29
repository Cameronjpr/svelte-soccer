import { supabaseClient } from '@lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		console.log(email, password);

		console.log(isProd ? 'https://svelte-soccer.vercel.app/' : 'http://localhost:5173/');

		const { data, error } = await supabaseClient.auth.signInWithOtp({
			email: email as string,
			options: {
				emailRedirectTo: isProd ? 'https://svelte-soccer.vercel.app/' : 'http://localhost:5173/'
			}
		});

		console.log(data, error);

		throw redirect(303, '/');
	}
};
