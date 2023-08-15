<script lang="ts">
	import { enhance } from '$app/forms';
	import BottomDrawer from '@lib/BottomDrawer/BottomDrawer.svelte';
	import { teams } from '@lib/teams';
	import type { Fixture, Selection } from '@lib/types';
	import { page } from '$app/stores';
	import Button from '@lib/Button/Button.svelte';
	import toast from 'svelte-french-toast';
	import Score from './Score.svelte';
	import SelectButton from './SelectButton.svelte';

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

	$: preselectedTeamSelections = selections
		.filter((selection) => {
			return selection.selection == preselectedTeam;
		})
		.sort((a, b) => a.gameweek - b.gameweek);

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

<article class="grid grid-cols-[3fr_1fr_3fr] grid-rows-1 items-center text-center">
	<SelectButton
		team={fixture.team_h}
		{isSelectable}
		{selectionLoading}
		{gameweekSelection}
		{handlePreselect}
		isHome
	/>
	<Score {fixture} />
	<SelectButton
		team={fixture.team_a}
		{isSelectable}
		{selectionLoading}
		{gameweekSelection}
		{handlePreselect}
	/>

	{#if session}
		<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
			<div>
				<h3>Select {teams[preselectedTeam - 1]?.name}?</h3>
				<p class="text-center mt-0">
					You have <strong>{2 - preselectedTeamSelections?.length ?? '2'}</strong> available selections
					for this team.
				</p>
				{#if preselectedTeamSelections?.length > 0}
					<p class="text-center mt-0">
						You have already selected {teams[preselectedTeam - 1]?.name} in:
					</p>
					<ul class="flex flex-col gap-2 mt-4">
						{#each preselectedTeamSelections as selection}
							<a
								class="text-center border-2 border-slate-300 rounded-3xl items-center p-2 px-4 font-semibold flex justify-center align-middle"
								href={`/gameweek?gameweek=${selection.gameweek}`}
							>
								<li>Week {selection.gameweek}</li>
							</a>
						{/each}
					</ul>
				{/if}
			</div>
			<form
				method="POST"
				action="?/select"
				use:enhance={({ action }) => {
					selectionLoading = true;
					return async ({ result, update }) => {
						if (result?.type === 'success') {
							toggleDrawer();
							update();
							toast.success(`You selected ${teams[preselectedTeam - 1].shortName}!`);
						}
						selectionLoading = false;
					};
				}}
			>
				{#if preselectedTeamSelections?.length < 2}
					<Button
						isLoading={selectionLoading}
						disabled={!isSelectable ||
							!drawerOpen ||
							selectionLoading ||
							preselectedTeamSelections?.length >= 2}
						formaction="?/select&selection={preselectedTeam}&fixture={fixture.code}&gameweek={fixture.event}"
						>Select</Button
					>
				{/if}
			</form>
		</BottomDrawer>
	{:else}
		<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
			<strong>Sign in to play GameweekGurus</strong>
			<form method="POST" action="/login?/login&provider=google">
				<Button>Join with Google</Button>
			</form>
		</BottomDrawer>
	{/if}
</article>
