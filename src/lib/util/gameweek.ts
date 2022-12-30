import type { Fixture } from '@lib/types';

export const getActiveGameweek = (fixtures: Array<Fixture>): number => {
	const now = new Date();

	const activeGameweek = fixtures.find((fixture) => {
		const kickoffTime = new Date(fixture.kickoff_time);
		return now < kickoffTime;
	});

	return activeGameweek ? activeGameweek.event : 1;
};
