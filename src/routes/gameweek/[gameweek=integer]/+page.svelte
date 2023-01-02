<script lang="ts">
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import { getActiveGameweek } from '@lib/util/gameweek';
	import { redirect } from '@sveltejs/kit';
	import Paginator from '@lib/Paginator/Paginator.svelte';

	dayjs.extend(advancedFormat);
	export let data: PageData;
	$: isSelectable = !data.gameweek.fixtures.sort((a, b) => a.kickoff_time - b.kickoff_time)[0]
		?.started;

	function handleGameweekSelect(event: CustomEvent) {
		const gameweek = event.detail.value;
		throw redirect(303, `/gameweek/${gameweek}`);
	}

	export const prerender = true;
</script>

<h1>Gameweek {data.gameweek.event}</h1>
<main>
	{#each data.gameweek.fixtures as fixture, index}
		{#if index === 0 || dayjs(data.gameweek.fixtures[index - 1]?.kickoff_time).date() !== dayjs(fixture.kickoff_time).date()}
			<h2>{dayjs(fixture.kickoff_time).format('dddd Do MMMM')}</h2>
		{/if}
		<FixtureCard {fixture} selections={data?.selections} {isSelectable} />
	{/each}
</main>
<Paginator currentPage={data?.gameweek?.event} />

<style>
	section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	section a {
		background: seagreen;
		padding: 0.5rem;
		font-weight: bold;
		font-size: large;
		color: white;
		border-radius: 0.5rem;
		text-decoration: none;
	}

	#gameweek-pagination {
		margin-top: 1rem;
	}

	#gameweek-live {
		background: seagreen;
		color: white;
	}

	main {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}
</style>
