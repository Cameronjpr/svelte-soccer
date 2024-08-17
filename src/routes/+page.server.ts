import { AuthApiError, type Provider } from "@supabase/supabase-js";
import { type Actions, redirect, fail } from "@sveltejs/kit";

const isProd = process.env.NODE_ENV === 'production';

export const actions: Actions = {
  login: async ({ url, locals: {
    getSession,
    supabase
  } }) => {
    const session = await getSession();

    if (session) {
      redirect(303, '/');
    }

    const provider = url.searchParams.get('provider') as Provider;

    if (provider) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: isProd ? 'https://svelte-soccer.vercel.app/' : 'http://localhost:5173/'
        }
      });

      if (error) {
        if (error instanceof AuthApiError && error.status === 400) {
          return fail(400, {
            error: 'Invalid credentials.'
          });
        }
        return fail(500, {
          error: 'Server error. Try again later.'
        });
      }

      redirect(303, data.url);
    }
  }
};
