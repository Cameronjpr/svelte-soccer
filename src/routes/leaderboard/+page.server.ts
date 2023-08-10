

export const load = (async ({ locals: {
	supabase
} }) => {
	const { data } = await supabase.from('Users').select('username,score');

	const safeUsers = data.map((user) => {
		return {
			username: user.username,
			score: user.score,
		}

	})

	return {
		users: safeUsers
	};
}) satisfies PageServerLoad;
