import type { Fixture } from '@lib/types';
import dayjs from 'dayjs';

export const getActiveGameweek = (fixtures: Array<Fixture>): number => {
	const now = dayjs();

	const activeGameweek = fixtures.find((fixture) => {
		const kickoffTime = dayjs(fixture.kickoff_time);
		return kickoffTime.isBefore(now);
	});

	return activeGameweek ? activeGameweek.event : 1;
};

export const getUpcomingGameweek = (fixtures: Array<Fixture>): number => {
	const now = dayjs();

	const upcomingGameweek = fixtures.find((fixture) => {
		const kickoffTime = dayjs(fixture.kickoff_time);
		return kickoffTime.isAfter(now);
	});

	return upcomingGameweek ? upcomingGameweek.event : 1;
};
