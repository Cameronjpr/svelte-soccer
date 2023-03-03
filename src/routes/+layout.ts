// import type { LayoutLoad } from './$types';
// import { getSupabase } from '@supabase/auth-helpers-sveltekit';

// export const load: LayoutLoad = async (event) => {
// 	const { session } = await getSupabase(event);
// 	const { selections } = await event.parent();
// 	const { fetch } = event;
// 	const res = await fetch('/api/active-gameweek');
// 	let activeGameweek = 1;

// 	if (res.ok) {
// 		activeGameweek = await res.json();
// 	}

// 	return { session, activeGameweek, selections };
// };
