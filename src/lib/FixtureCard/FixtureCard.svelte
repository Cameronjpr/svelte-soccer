<script lang="ts">
	import { teams } from '@lib/teams';
	import type { Fixture, Selection } from '@lib/types';
	import { fade } from 'svelte/transition';

	export let fixture: Fixture;
	export let selections: Array<Selection>;
	const homeTeamSelected =
		selections?.findIndex(
			(s) => s.fixture === fixture.code && s.selection === fixture.team_h.id - 1
		) > -1;
	const awayTeamSelected =
		selections?.findIndex(
			(s) => s.fixture === fixture.code && s.selection === fixture.team_a.id - 1
		) > -1;
</script>

<article transition:fade={{ delay: 0, duration: 300 }}>
	<form method="POST">
		<button
			class={homeTeamSelected ? 'selected' : ''}
			formaction="?/select&selection={fixture.team_h.id -
				1}&fixture={fixture.code}&gameweek={fixture.event}"
			style="border-top: 2px solid {teams[fixture.team_h.id - 1]?.primaryColor}"
			>{fixture.team_h.shortName}</button
		>
		{#if fixture.finished_provisional}
			<span id="score">{fixture.team_h_score} : {fixture.team_a_score}</span>
		{:else}
			<span id="kickoff-time"
				>{new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(
					new Date(fixture.kickoff_time)
				)}</span
			>
		{/if}
		<button
			class={awayTeamSelected ? 'selected' : ''}
			formaction="?/select&selection={fixture.team_a.id -
				1}&fixture={fixture.code}&gameweek={fixture.event}"
			style="border-top: 2px solid {teams[fixture.team_a.id - 1]?.primaryColor}"
			>{fixture.team_a.shortName}</button
		>
	</form>
</article>

<style>
	form {
		display: grid;
		grid-template-columns: 3fr 2fr 3fr;
		align-items: center;
		padding: 0px;
	}

	span#kickoff-time,
	span#score {
		text-align: center;
	}

	.selected {
		background: black;
		color: ivory;
	}

	button {
		background: ivory;
		height: 3rem;
		border: none;
		padding: 0;
		box-shadow: none;
		font: inherit;
		cursor: pointer;
		outline: none;
		font-size: large;
		color: seagreen;
	}

	button:hover {
		background: mediumseagreen;
		color: ivory;
	}
</style>
