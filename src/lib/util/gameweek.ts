import type { Fixture } from '@lib/types';
import dayjs from 'dayjs';

export const getActiveGameweek = (fixtures: Array<Fixture>): number => {
	const now = dayjs();
	
	const activeGameweek = fixtures?.findLast((fixture) => {
		const kickoffTime = dayjs(fixture.kickoff_time);
		return kickoffTime.isBefore(now);
	});

	return activeGameweek ? activeGameweek.event : 1;
};

export const getUpcomingGameweek = (fixtures: Array<Fixture>): number => {
	const now = dayjs();

	const upcomingGameweek = fixtures?.find((fixture) => {
		const kickoffTime = dayjs(fixture.kickoff_time);
		return kickoffTime.isAfter(now);
	});

	return upcomingGameweek ? upcomingGameweek.event : 1;
};

export const isGameweekUnderway = (fixtures: Array<Fixture>): boolean => {
	const now = dayjs();

	const mostRecentGame = fixtures?.reverse()?.find((fixture) => {
		const kickoffTime = dayjs(fixture.kickoff_time);
		return kickoffTime.isBefore(now);
	});

	const gameAfterNow = fixtures.reverse().find((fixture) => {
		const kickoffTime = dayjs(fixture.kickoff_time);
		return kickoffTime.isAfter(now);
	});
	
	if (!mostRecentGame || !gameAfterNow) {
		return false;
	}

	if (dayjs(mostRecentGame.kickoff_time).add(2, 'hour').isAfter(now)) {
		return true;
	}

	return mostRecentGame.event === gameAfterNow.event;
}

export const sortFixturesByGameweek = (fixtures: Array<Fixture>): Array<Fixture> => {
	const sorted = fixtures;
	return sorted?.sort((a, b) => a.event - b.event);
}