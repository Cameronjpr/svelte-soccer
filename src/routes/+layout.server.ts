export const load = async ({ fetch, locals: { getSession, supabase } }) => {
	const res = await fetch('/api/active-gameweek');
	let activeGameweek = 1;

	if (res.ok) {
		activeGameweek = await res.json();
	}

	const session = await getSession();

	return {
		session,
		streamed: {
			fixtures: await getFixtures(fetch)
		},
		activeGameweek: activeGameweek || 1
	};
};


async function getFixtures(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
) {
	const res = await fetch(`/api/fixtures`);

	if (!res.ok) {
		return null
	}

	return await res.json();
}