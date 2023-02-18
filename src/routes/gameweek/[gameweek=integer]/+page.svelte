<script lang="ts">
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import { getActiveGameweek } from '@lib/util/gameweek';
	import { redirect } from '@sveltejs/kit';
	import Paginator from '@lib/Paginator/Paginator.svelte';
	import type { Fixture } from '@lib/types';
	import ScrollingPaginator from '@lib/Paginator/ScrollingPaginator.svelte';

	dayjs.extend(advancedFormat);
	export let data: PageData;
	$: isSelectable = !data.gameweek.fixtures.sort(
		(a: Fixture, b: Fixture) => dayjs(a.kickoff_time).valueOf() - dayjs(b.kickoff_time).valueOf()
	)[0]?.started;

	function handleGameweekSelect(event: CustomEvent) {
		const gameweek = event.detail.value;
		throw redirect(303, `/gameweek/${gameweek}`);
	}
</script>

<h1>Gameweek {data.gameweek.event}</h1>
<Paginator currentPage={data?.gameweek?.event} />
<!-- <ScrollingPaginator currentPage={data?.gameweek?.event} /> -->
<main>
	{#each data.gameweek.fixtures as fixture, index}
		{#if index === 0 || dayjs(data.gameweek.fixtures[index - 1]?.kickoff_time).date() !== dayjs(fixture.kickoff_time).date()}
			<h2>{dayjs(fixture.kickoff_time).format('dddd Do MMMM')}</h2>
		{/if}
		<FixtureCard {fixture} selections={data?.selections} {isSelectable} />
	{/each}
</main>

<style>
	main {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}
</style>
