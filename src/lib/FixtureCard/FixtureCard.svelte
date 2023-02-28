<script lang="ts">
	import { enhance } from '$app/forms';
	import BottomDrawer from '@lib/BottomDrawer/BottomDrawer.svelte';
	import { teams } from '@lib/teams';
	import type { Fixture, Selection } from '@lib/types';
	import type { ActionData, PageData } from '../../routes/gameweek/[gameweek=integer]/$types';

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

	let preselectedTeam = 1;

	const homeColor = teams[fixture.team_h.id - 1]?.primaryColor;
	const awayColor = teams[fixture.team_a.id - 1]?.primaryColor;

	let drawerOpen = false;

	const toggleDrawer = () => {
		drawerOpen = !drawerOpen;
	};

	function handlePreselect(teamId: number) {
		preselectedTeam = teamId;

		toggleDrawer();
	}
</script>

<article>
	<button
		disabled={!isSelectable}
		class={`fixture-button ${homeTeamSelected ? 'selected' : ''}`}
		on:click={() => handlePreselect(fixture.team_h.id)}
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
		class={`fixture-button ${awayTeamSelected ? 'selected' : ''}`}
		on:click={() => handlePreselect(fixture.team_a.id)}
		style="border-right: 0.25rem solid {awayColor}">{fixture.team_a.shortName}</button
	>

	<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
		<strong>You have selected {teams[preselectedTeam - 1]?.shortName}.</strong>
		<form
			method="POST"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ result, update }) => {
					if (result?.type === 'success') {
						toggleDrawer();
						update();
					}
				};
			}}
		>
			<button
				style="width: 100%;"
				class="appearance-primary"
				disabled={!isSelectable || !drawerOpen}
				formaction="?/select&selection={preselectedTeam -
					1}&fixture={fixture.code}&gameweek={fixture.event}">Confirm</button
			>
		</form>
	</BottomDrawer>
</article>

<style>
	article {
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

	article > button {
		background: var(--color-base);
		border: 1px solid var(--color-accent);
		height: 3rem;
		border-radius: 0rem;
		box-shadow: none;
		font: inherit;
		outline: none;
		color: var(--color-text);
		font-size: large;
		transition: all 0.1s ease-in-out;
	}

	button:enabled:hover {
		background: var(--color-accent);
		color: var(--color-text);
		cursor: pointer;
	}
</style>
