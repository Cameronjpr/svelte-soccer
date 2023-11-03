import type { FormattedFixture, Selection } from "@lib/types";
import type { LayoutLoad } from "./$types";
import { formatFixtures } from "@lib/util/fixture";

export const load = (async ({ parent, url }) => {
  const { session, supabase } = await parent();
  let selections: Array<Selection> = [];
  let fixtures: Array<FormattedFixture> = [];

  if (session) {
    const { data, error } = await supabase
      .from('Selections')
      .select()
      .eq('selector', session?.user?.id);

    if (!error) {
      selections = data;
    }
  }
  
  const { data: fixturesData, error: fixturesError } = await supabase
    .from('Fixtures')
    .select()
    .order('kickoff_time', { ascending: true });

  if (!fixturesError) {
    fixtures = formatFixtures(fixturesData);
  }

  return {
    currentGameweek: url?.searchParams?.get('gameweek'),
    streamed: {
      fixtures: fixtures ?? [],
      selections: selections ?? []
    },
  };
}) satisfies LayoutLoad;
