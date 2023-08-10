export const load = async ({ fetch, locals: { getSession, supabase } }) => {
	const res = await fetch('/api/active-gameweek');
	let activeGameweek = 1;

	if (res.ok) {
		activeGameweek = await res.json();
	}

	const session = await getSession();

	return {
		session,
		activeGameweek: activeGameweek || 1
	};
};

