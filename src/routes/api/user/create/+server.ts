import { supabaseClient } from '@lib/db';
import type { Fixture } from '@lib/types';
import { formatFixtures } from '@lib/util/fixture';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ url, fetch, params, setHeaders }) => {
  

	const { data, error } = await supabaseClient
  .from('Users')
  .upsert({ id: 1, name: 'Albania' })
  .select()

	return json({
		event: Number(params.gameweek),
		fixtures: gameweekFixtures as Array<Fixture>
	});
} satisfies RequestHandler;
