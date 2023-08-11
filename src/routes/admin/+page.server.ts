import { PUBLIC_ADMIN_EMAIL, } from '$env/static/public';
import type { Fixture } from '@lib/types';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  calculate: async ({ fetch, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session || session.user.email !== PUBLIC_ADMIN_EMAIL) {
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
      const { data: users } = await supabase.from('Users').select('auth_user, score');
      const fixtures: Fixture[] = await res.json();

      users?.forEach(async (u) => {
        const { data: selections } = await supabase.from('Selections').select().eq('selector', u?.auth_user);
        console.log(u.auth_user)
        let tally = u.score;
        selections?.forEach((s) => {
          const fixture = fixtures.find(f => f.code === s.fixture)
          const { team_a_score, team_h_score, team_a, team_h, started } = fixture as Fixture;

          if (!started || team_a_score === null || team_h_score === null) {
            return;
          }

          if (team_h_score == team_a_score) {
            return;
          }


          if (team_h_score > team_a_score) { // home win
            console.log('home win')
            if (s.selection === team_h) {
              tally += 3
            } else {
              tally--
            }
          } else if (team_h_score < team_a_score) { // away win
            if (s.selection === team_a) {
              console.log('away win')
              tally += 3
            } else {
              tally--
            }
          }
        });

        const { error, status, data } = await supabase.from('Users').update({ score: tally }).eq('auth_user', u.auth_user).select();

        console.log({ error, status, data })
      });

      return {
        ok: true
      };
    }
  }
};
