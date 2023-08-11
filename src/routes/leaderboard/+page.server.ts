

export const load = (async ({ locals: {
	supabase
} }) => {
	const { data: users } = await supabase.from('Users').select('username,score,auth_user');
	const { data: selections } = await supabase.from('Selections').select()

	const selectionsForGameweek = selections.filter(s => s.gameweek === 1)


	const safeUsers = users.map((user) => {
		return {
			username: user.username,
			score: user.score,
			selection: selectionsForGameweek.find(s => s.selector === user.auth_user)
		}
	})

	return {
		users: safeUsers
	};
}) satisfies PageServerLoad;
