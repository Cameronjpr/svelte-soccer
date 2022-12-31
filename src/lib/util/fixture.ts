import { teams } from '@lib/teams';
import type { Fixture, FormattedFixture } from '@lib/types';

export const formatFixtures = (fixtures: Array<any>): Array<FormattedFixture> => {
	return fixtures.map((fixture) => {
		return {
			...fixture,
			team_h: {
				id: fixture.team_h,
				name: teams[fixture.team_h - 1].name,
				shortName: teams[fixture.team_h - 1].shortName,
				primaryColor: teams[fixture.team_h - 1].primaryColor
			},
			team_a: {
				id: fixture.team_a,
				name: teams[fixture.team_a - 1].name,
				shortName: teams[fixture.team_a - 1].shortName,
				primaryColor: teams[fixture.team_a - 1].primaryColor
			}
		};
	});
};
