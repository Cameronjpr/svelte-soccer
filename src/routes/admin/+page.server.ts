import { PUBLIC_ADMIN_EMAIL, } from '$env/static/public';
import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { getActiveGameweek, getUpcomingGameweek, isGameweekUnderway } from '@lib/util/gameweek';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  syncFixtures: async ({ fetch, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session || session.user.email !== PUBLIC_ADMIN_EMAIL) {
      redirect(303, '/');
    }

    // Get premier league fixrures
    const res = await fetch(`https://fantasy.premierleague.com/api/fixtures`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    if (res.ok) {
      const fixtures: Fixture[] = await res.json();

      // Get existing fixtures
      const { data: existingFixtures } = await supabase.from('Fixtures').select();

      console.log(existingFixtures.length)

     existingFixtures.forEach(async (f) => {
        const fixture = fixtures.find(fix => fix.code === f.code);

        if (fixture) {
      
          const { error: updateError } = await supabase.from('Fixtures').update({
            ...f,
            team_a_score: fixture.team_a_score,
            team_h_score: fixture.team_h_score,
            kickoff_time: fixture.kickoff_time,
          }
          ).eq('code', f.code);

          if (fixture.code !== f.code) {
            console.log('code mismatch: ', fixture.code, f.code)

            const { data: relevantSelections } = await supabase.from('Selections').select().eq('fixture', f.code);

            console.log(relevantSelections)
          }

          if (updateError) {
            console.log(updateError);
          }
        }
      })

      // Add missing fixtures
      const missingFixtures = fixtures.filter(f => !existingFixtures.find(ef => ef.code === f.code));
      const { _, error } = await supabase.from('Fixtures').insert([
        ...missingFixtures.map(f => ({
          code: f.code,
          event: f.event,
          team_a: f.team_a,
          team_a_score: f.team_a_score,
          team_h: f.team_h,
          team_h_score: f.team_h_score,
          kickoff_time: f.kickoff_time,
        }))
      ]);

      if (error) {
        console.log(error);
      }
    }
  },
  calculate: async ({ fetch, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session || session.user.email !== PUBLIC_ADMIN_EMAIL) {
      redirect(303, '/');
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
        let tally = 0;
        selections?.forEach((s) => {
          const fixture = fixtures?.find(f => f.code === s.fixture)
          const { team_a_score, team_h_score, team_a, team_h, started } = fixture as Fixture;

          if (!started || team_a_score === null || team_h_score === null || fixture?.ignore) {
            return;
          }

          if (team_h_score == team_a_score) {
            tally++
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

        const { error, status, data } = await supabase.from('Users').update({ score: tally ?? u.score }).eq('auth_user', u.auth_user).select();

        console.log({ error, status, data })
      });

      return {
        ok: true
      };
    }
  }
};

export const load = async ({ locals: { supabase } }) => {
  let fixtures: Array<Fixture> = []
  const { data: fixturesData, error: fixturesError } = await supabase
		.from('Fixtures')
		.select()
		.order('kickoff_time', { ascending: true });
    
    if (!fixturesError) {
		fixtures = formatFixtures(fixturesData);
	}

	const upcomingGameweek = getUpcomingGameweek(fixtures);
  const activeGameweek = getActiveGameweek(fixtures);
	const gameweek = isGameweekUnderway(fixtures) ? upcomingGameweek - 1 : upcomingGameweek;

    return {
      fixtures,
      gameweek,
      upcomingGameweek,
      activeGameweek
    }
}