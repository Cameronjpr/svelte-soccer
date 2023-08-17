import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ url, fetch, params, setHeaders }) => {
  const res = await fetch(
    `https://fantasy.premierleague.com/api/fixtures`,
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  );

  if (!res.ok) {
    throw error(res.status, 'Could not fetch fixtures')
  }

  const fixtures = await res.json();
  const formattedFixtures = formatFixtures(fixtures);

  setHeaders({
    age: res?.headers?.get('age'),
    'cache-control': 'max-age=60'
  });

  return json({
    fixtures: formattedFixtures as Array<Fixture>
  });
};
