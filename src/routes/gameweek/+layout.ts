import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch, parent, params, url }) => {
  const { session, supabase } = await parent();
  let selections: Array<Selection> = [];

  if (session) {
    const { data, error } = await supabase
      .from('Selections')
      .select()
      .eq('selector', session?.user?.id);

    if (!error) {
      selections = data;
    }
  }

  return {
    currentGameweek: url?.searchParams?.get('gameweek'),
    streamed: {
      fixtures: getFixtures(fetch),
      selections: selections ?? []
    },
  };
}) satisfies LayoutLoad;

async function getFixtures(
  fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
) {
  const res = await fetch(`/api/fixtures`);

  if (!res.ok) {
    return null
  }

  return await res.json();
}