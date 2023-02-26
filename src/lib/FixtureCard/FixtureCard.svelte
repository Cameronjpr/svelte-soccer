<script lang="ts">
	import { teams } from '@lib/teams';
	import type { Fixture, Selection } from '@lib/types';

	export let fixture: Fixture;
	export let selections: Array<Selection>;
	export let isSelectable: boolean;

	$: homeTeamSelected =
		selections?.findIndex(
			(s) => s.fixture === fixture.code && s.selection === fixture.team_h.id - 1
		) > -1;
	$: awayTeamSelected =
		selections?.findIndex(
			(s) => s.fixture === fixture.code && s.selection === fixture.team_a.id - 1
		) > -1;

	const homeColor = teams[fixture.team_h.id - 1]?.primaryColor;
	const awayColor = teams[fixture.team_a.id - 1]?.primaryColor;
</script>

<article>
	<form method="POST">
		<button
			disabled={!isSelectable}
			class={`${homeTeamSelected ? 'selected' : ''} test`}
			formaction="?/select&selection={fixture.team_h.id -
				1}&fixture={fixture.code}&gameweek={fixture.event}"
			style="border-left: 0.25rem solid {homeColor}">{fixture.team_h.shortName}</button
		>
		{#if fixture.started}
			<span id="score" class={fixture?.finished_provisional ? 'score-ft' : 'score-live'}
				>{fixture.team_h_score} : {fixture.team_a_score}</span
			>
		{:else}
			<span id="kickoff-time"
				>{new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(
					new Date(fixture.kickoff_time)
				)}</span
			>
		{/if}
		<button
			disabled={!isSelectable}
			class={awayTeamSelected ? 'selected' : ''}
			formaction="?/select&selection={fixture.team_a.id -
				1}&fixture={fixture.code}&gameweek={fixture.event}"
			style="border-right: 0.25rem solid {awayColor}">{fixture.team_a.shortName}</button
		>
	</form>
</article>

<style>
	form {
		display: grid;
		grid-template-columns: 3fr 1fr 3fr;
		gap: 0.5rem;
		align-items: center;
		padding: 0px;
	}

	span#kickoff-time {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: medium;
		background: none;
		height: 100%;
	}

	span#score {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	span.score-ft {
	}
	span.score-live {
		background: var(--color-secondary);
	}

	.selected {
		background: var(--color-accent);
		color: var(--color-text);
	}

	button {
		background: var(--color-base);
		border: 1px solid var(--color-accent);
		height: 3rem;
		border-radius: 0rem;
		padding: 0;
		box-shadow: none;
		font: inherit;
		outline: none;
		color: var(--color-text);
		font-size: large;
		transition: all 0.1s ease-in-out;
	}

	button:enabled:hover {
		background: var(--color-primary);
		color: var(--color-text);
		cursor: pointer;
	}
</style>
