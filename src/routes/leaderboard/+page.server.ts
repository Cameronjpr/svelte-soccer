import type { Selection, User } from "@lib/types";
import type { PageServerLoad } from "../$types";
import { getUpcomingGameweek, isGameweekUnderway } from "@lib/util/gameweek";


export const load = (async ({ fetch, parent, locals: {
	supabase
} }) => {
	const { session } = await parent();
	const { data: users } = await supabase.from('Users').select('username,score,auth_user');
	const { data: selections } = await supabase.from('Selections').select()

	let fixtures = [];
	const res = await fetch('/api/fixtures');

	 if (res.ok) {
		 const { fixtures: data } = await res.json();
		 fixtures = data;
  }

	const upcomingGameweek = getUpcomingGameweek(fixtures);
	const selectionsForUpcomingGameweek = selections.filter((s: Selection) => s.gameweek === upcomingGameweek)

	const safeUsers = users.map((user: User) => {
		return {
			username: user.username,
			score: user.score,
			selection: selectionsForUpcomingGameweek?.find((s: Selection) => s.selector === user.auth_user) ?? null,
			auth_user: user.auth_user
		}
	})

	return {
		users: safeUsers as Array<User>,
		session,
		isGameweekUnderway: isGameweekUnderway(fixtures),
	};
}) satisfies PageServerLoad;
