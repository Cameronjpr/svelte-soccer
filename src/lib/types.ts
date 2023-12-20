export type Fixture = {
	code: number;
	event: number;
	finished: boolean;
	finished_provisional: boolean;
	id: number;
	ignore: boolean;
	kickoff_time: string;
	pulse_id: number;
	started: boolean;
	stats: never;
	team_a: Team;
	team_a_difficulty: number;
	team_a_score: number | null;
	team_h: Team;
	team_h_difficulty: number;
	team_h_score: number | null;
};

export type FormattedFixture = Fixture & {
	code: number;
	event: number;
	finished: boolean;
	finished_provisional: boolean;
	id: number;
	kickoff_time: string;
	pulse_id: number;
	started: boolean;
	stats: never;
};

export type Team = {
	id: number;
	name: string;
	shortName: string;
	primaryColor: string;
	secondaryColor: string | null;
};

export type Selection = {
	created_at: string | null;
	fixture: number | null;
	gameweek: number | null;
	id: number;
	selection: number | null;
	selector: string | null;
};

export type User = {
	auth_user: string;
	score: number;
	username: string;
	selection?: Selection;
};