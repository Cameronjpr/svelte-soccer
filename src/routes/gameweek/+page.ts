export async function load({ parent }) {
	const { streamed: { fixtures, selections }, currentGameweek } = await parent();

	return {
		currentGameweek: currentGameweek ?? null,
		fixtures,
		selections
	};
}

