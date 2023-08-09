// src/routes/+layout.ts
import { invalidate } from '$app/navigation'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'
import type { Database } from '../database.types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

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

  const { data: selections, error } = await supabase
    .from('Selections')
    .select()
    .eq('selector', session?.user?.id);

  const { data: users } = await supabase.from('Users').select('username');

  return {
    supabase,
    session,
    selections: selections || [],
    users: users?.length,
    activeGameweek: activeGameweek || 1
  }
}