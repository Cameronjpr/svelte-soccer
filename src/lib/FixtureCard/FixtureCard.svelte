<script lang="ts">
	import type { Fixture } from '@lib/types';

	export let fixture: Fixture;

	function handleSelectTeam(teamId: number) {
		console.log({ teamId });
	}
</script>

<article>
	<button on:click={() => handleSelectTeam(fixture.team_h.id)}>{fixture.team_h.name}</button>
	{#if fixture.finished_provisional}
		<span id="score">{fixture.team_h_score} : {fixture.team_a_score}</span>
	{:else}
		<span id="kickoff-time"
			>{new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(
				new Date(fixture.kickoff_time)
			)}</span
		>
	{/if}
	<button on:click={() => handleSelectTeam(fixture.team_a.id)}>{fixture.team_a.name}</button>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 3fr 2fr 3fr;
		padding: 0px;
		border: 1px solid black;
	}

	span#kickoff-time,
	span#score {
		text-align: center;
	}

	button {
		font-size: large;
		background: none;
		border: none;
	}
	button:hover {
		text-decoration: underline;
		background: #eee;
		cursor: pointer;
	}
</style>
