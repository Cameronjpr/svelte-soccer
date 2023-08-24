import type { User } from "@lib/types";
import type { PageServerLoad } from "../$types";
import { getUpcomingGameweek } from "@lib/util/gameweek";


export const load = (async ({ parent, locals: {
	supabase
} }) => {
	const { session } = await parent();
	const { data: users } = await supabase.from('Users').select('username,score,auth_user');
	const { data: selections } = await supabase.from('Selections').select()

	const selectionsForUpcomingGameweek = selections.filter(s => s.gameweek === 3)


	const safeUsers = users.map((user: User) => {
		return {
			username: user.username,
			score: user.score,
			selection: selectionsForUpcomingGameweek.find(s => s.selector === user.auth_user),
			auth_user: user.auth_user
		}
	})

	return {
		users: safeUsers as Array<User>,
		session
	};
}) satisfies PageServerLoad;
