import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ fetch, setHeaders }) => {
  const res = await fetch(
    `https://fantasy.premierleague.com/api/fixtures`,
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  );

  if (!res.ok) {
  console.log(res?.statusText)
    throw error(res.status, 'Could not fetch fixtures')
  }

  const fixtures = await res.json();
  const formattedFixtures = formatFixtures(fixtures);

  setHeaders({
    'cache-control': 'max-age=60'
  });

  return json({
    fixtures: formattedFixtures as Array<Fixture>
  });
};
