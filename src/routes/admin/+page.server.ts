import type { Fixture } from '@lib/types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  calculate: async (event) => {
    const { session, supabaseClient } = await getSupabase(event);
    if (!session || session.user.email !== 'cameronjpr@gmail.com') {
      throw redirect(303, '/');
    }

    // Get premier league fixrures
    const res = await fetch(`https://fantasy.premierleague.com/api/fixtures`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    if (res.ok) {
      // Find selections for this user
      const { data: selections } = await supabaseClient.from('Selections').select();
      const fixtures: Fixture[] = await res.json();


      selections?.forEach((s) => {
        console.log(s)
        const fixture = fixtures.find(f => f.code === s.fixture)
        console.log(fixture)
        const { team_a_score, team_h_score, team_a, team_h } = fixture

        if (team_h_score === team_a_score) {
          return;
        }

        if (team_h_score > team_a_score) {
          if (s.selection === team_h) {
            console.log('winning selection')
          } else {
            console.log('losing selection')
          }
        } else {
          if (s.selection === team_a) {
            console.log('wining selection')
          } else {
            console.log('losing selection')
          }
        }
      });

      return {
        ok: true
      };
    }
  }
};
