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
      const { data: users } = await supabaseClient.from('Users').select();
      const { data: selections } = await supabaseClient.from('Selections').select();
      const fixtures: Fixture[] = await res.json();

      users?.forEach(async (u) => {
        console.log(u)
        let tally = 0;
        selections?.forEach((s) => {
          console.log(s)
          const fixture = fixtures.find(f => f.code === s.fixture)
          console.log(fixture)
          const { team_a_score, team_h_score, team_a, team_h, finished_provisional } = fixture as Fixture;

          if (!finished_provisional || team_a_score === null || team_h_score === null) {
            return;
          }

          if (team_h_score === team_a_score) {
            return;
          }


          if (team_h_score > team_a_score) { // home win
            if (s.selection === team_h) {
              tally++
            } else {
              tally--
            }
          } else { // away win
            if (s.selection === team_a) {
              tally++
            } else {
              tally--
            }
          }
        });

        const { error, status, data } = await supabaseClient.from('Users').update({ score: tally }).eq('id', u.id);

        console.log({ error, status, data })
      });

      return {
        ok: true
      };
    }
  }
};
