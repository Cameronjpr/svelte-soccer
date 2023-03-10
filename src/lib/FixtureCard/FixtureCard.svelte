<script lang="ts">
	import { enhance } from '$app/forms';
	import BottomDrawer from '@lib/BottomDrawer/BottomDrawer.svelte';
	import { teams } from '@lib/teams';
	import type { Fixture, Selection } from '@lib/types';
	import type { ActionData, PageData } from '../../routes/gameweek/[gameweek=integer]/$types';
	import { page } from '$app/stores';

	export let fixture: Fixture;
	export let isSelectable: boolean;
	export let selections: Array<Selection>;

	if (!fixture) {
		throw new Error('FixtureCard must be passed a fixture');
	}

	let preselectedTeam = 1;
	let selectionLoading = false;
	$: gameweekSelection = selections.find(
		(selection) => selection.gameweek === fixture.event
	)?.selection;

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

	const session = $page.data.session;
</script>

<article>
	<button
		disabled={!isSelectable}
		class={gameweekSelection === fixture?.team_h.id ? 'selected' : ''}
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
		class={gameweekSelection === fixture?.team_a.id ? 'selected' : ''}
		on:click={() => handlePreselect(fixture.team_a.id)}
		style="border-right: 0.25rem solid {awayColor}">{fixture.team_a.shortName}</button
	>

	{#if session}
		<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
			<p>
				<strong>Select {teams[preselectedTeam - 1]?.name}?</strong><br />
				You have <strong>two</strong> available selections for this team.
			</p>
			<form
				method="POST"
				use:enhance={({ form, data, action, cancel }) => {
					selectionLoading = true;
					return async ({ result, update }) => {
						if (result?.type === 'success') {
							toggleDrawer();
							update();
						}
						selectionLoading = false;
					};
				}}
			>
				<button
					style="width: 100%; {selectionLoading ? 'cursor: wait;' : ''}"
					class="appearance-primary"
					disabled={!isSelectable || !drawerOpen || selectionLoading}
					formaction="?/select&selection={preselectedTeam}&fixture={fixture.code}&gameweek={fixture.event}"
					>Confirm</button
				>
			</form>
		</BottomDrawer>
	{:else}
		<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
			<strong>Sign in to play PremPredictor</strong>
			<a class="linkbutton" href="/login">Sign in</a>
		</BottomDrawer>
	{/if}
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 3fr 1fr 3fr;
		gap: 0.5rem;
		padding: 0px;
		max-height: 3rem;
	}

	span {
		max-height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: medium;
		background: none;
		color: var(--color-text);
	}

	span.score-live {
		background: var(--color-secondary);
	}

	.selected {
		background: var(--color-secondary);
		color: var(--color-text);
	}

	article > button {
		background: var(--color-accent-bright);
		border: 1px solid var(--color-accent);
		height: 3rem;
		border-radius: 0rem;
		box-shadow: none;
		padding-inline: 0px;
		font: inherit;
		outline: none;
		color: var(--color-text);
		font-size: large;
		transition: all 0.1s ease-in-out;
	}
</style>
