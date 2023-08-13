import type { PageLoad } from './$types';
import type { Selection } from '@lib/types';

export const load = (async ({ fetch, parent, params, url }) => {
	const { streamed: { activeGameweek }, session, supabase } = await parent();

	let selections: Array<Selection> = [];

	if (session) {
		const { data, error } = await supabase
			.from('Selections')
			.select()
			.eq('selector', session?.user?.id);

		if (!error) {
			selections = data;
		}
	}

	return {
		activeGameweek,
		currentGameweek: url.searchParams.get('gameweek') ?? activeGameweek,
		streamed: {
			fixtures: getFixtures(fetch),
			selections: selections ?? []
		},
	};
}) satisfies PageLoad;

async function getFixtures(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
) {
	const res = await fetch(`/api/fixtures`);

	if (!res.ok) {
		return null
	}

	return await res.json();
}