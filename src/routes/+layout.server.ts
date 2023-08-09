export const load = async ({ fetch, locals: { getSession, supabase } }) => {
	const res = await fetch('/api/active-gameweek');
	let activeGameweek = 1;

	if (res.ok) {
		activeGameweek = await res.json();
	}

	const session = await getSession();

	let selections = [];

	if (session) {
		const { data, error } = await supabase
			.from('Selections')
			.select()
			.eq('selector', session?.user?.id);

		selections = data;
	}

	const { data: popular } = await supabase
		.from('Selections')
		.select('*', { count: 'exact', head: true });

	const { data: users } = await supabase.from('Users').select('*');

	return {
		session,
		selections: selections || [],
		popular,
		users: users?.length,
		activeGameweek: activeGameweek || 1
	};
};

