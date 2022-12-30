import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { readable } from 'svelte/store';
import type { Fixture } from '@lib/types';
import { teams } from '@lib/teams';
import { getActiveGameweek } from '@lib/util/gameweek';

export const load: LayoutLoad = async (event) => {
	const { session } = await getSupabase(event);
	return { session };
};
