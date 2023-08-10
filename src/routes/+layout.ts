// src/routes/+layout.ts
import { invalidate } from '$app/navigation'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import type { Database } from '../database.types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  inject({ mode: dev ? 'development' : 'production' });

  const res = await fetch('/api/active-gameweek');
  let activeGameweek = 1;

  if (res.ok) {
    activeGameweek = await res.json();
  }


  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })


  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    supabase,
    session,
    activeGameweek: activeGameweek || 1
  }
}