import type { FormattedFixture, Selection, User } from "@lib/types";
import type { PageServerLoad } from "../$types";
import { getActiveGameweek, isGameweekUnderway } from "@lib/util/gameweek";
import { formatFixtures } from "@lib/util/fixture";


export const load = (async ({ parent, locals: {
	supabase
} }) => {
	const { session } = await parent();
	const { data: users } = await supabase.from('Users').select('username,score,auth_user');
	const { data: selections } = await supabase.from('Selections').select()

let fixtures: Array<FormattedFixture> = [];
const { data: fixturesData, error: fixturesError } = await supabase
		.from('Fixtures')
		.select()
		.order('kickoff_time', { ascending: true });

	if (!fixturesError) {
		fixtures = formatFixtures(fixturesData);
	}

	const selectionsForGameweek = selections.filter((s: Selection) => s.gameweek === getActiveGameweek(fixtures))


	const safeUsers = users.map((user: User) => {
		return {
			username: user.username,
			score: user.score,
			selection: selectionsForGameweek?.find((s: Selection) => s.selector === user.auth_user) ?? null,
			auth_user: user.auth_user
		}
	})

	return {
		users: safeUsers as Array<User>,
		session,
		isGameweekUnderway: isGameweekUnderway(fixtures),
	};
}) satisfies PageServerLoad;
