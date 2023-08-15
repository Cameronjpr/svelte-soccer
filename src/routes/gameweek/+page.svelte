<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import SimplePaginator from '@lib/Paginator/SimplePaginator.svelte';
	import Spinner from '@lib/icons/Spinner.svelte';
	import { goto } from '$app/navigation';
	import { getActiveGameweek, getUpcomingGameweek } from '@lib/util/gameweek';

	dayjs.extend(advancedFormat);
	dayjs.extend(relativeTime);

	export let data: PageData;

	function setGameweek(gameweek: number) {
		goto(`/gameweek?gameweek=${gameweek}`);
	}
</script>

<Toaster />

{#await data?.streamed?.fixtures}
	<section
		class="text-green-600 text-lg flex flex-col gap-4 justify-center p-4 h-[90vh] align-middle items-center"
	>
		<Spinner />
	</section>
{:then res}
	{@const activeGameweek = getActiveGameweek(res?.fixtures)}
	{@const upcomingGameweek = getUpcomingGameweek(res?.fixtures)}
	{@const currentGameweek = Number(data?.currentGameweek) || upcomingGameweek || activeGameweek}
	{@const gameweek = {
		fixtures: res?.fixtures?.filter((f) => f.event === currentGameweek)
	}}
	{@const hasStarted = gameweek?.fixtures?.some((f) => f.started)}
	{@const isFinished = gameweek?.fixtures?.every((f) => f.finished_provisional)}
	{@const kickoffs = gameweek?.fixtures?.map((f) => f.kickoff_time)}
	{@const firstKickoff = dayjs(kickoffs.sort()[0])}
	{@const isSelectable = !hasStarted && !isFinished && dayjs().isBefore(firstKickoff)}
	<div class="flex flex-col gap-4 align-middle">
		<SimplePaginator {currentGameweek} {setGameweek} />
		{#if isFinished}
			<p class="text-sm text-center text-gray-700">This week has finished.</p>
		{:else if hasStarted || (!isFinished && !dayjs().isBefore(firstKickoff))}
			<p class="text-sm text-center text-amber-700">
				Selections are locked because week {currentGameweek} has already started.
			</p>
		{:else}
			<section class={` text-center `}>
				<p class="bg-black text-white p-2 rounded-lg font-semibold">
					Selection deadline: {dayjs().to(firstKickoff)}
				</p>
				<p class="text-center pt-2">
					Select <strong>one</strong> team you think will win this week!
				</p>
			</section>
		{/if}
		{#key gameweek}
			<section class="flex flex-col gap-4">
				{#each gameweek.fixtures as fixture, index}
					{#if fixture.event == currentGameweek}
						{#if index === 0 || dayjs(gameweek.fixtures[index - 1]?.kickoff_time).date() !== dayjs(fixture.kickoff_time).date()}
							<h2 class="pt-8 mb-0 text-xl">
								{dayjs(fixture.kickoff_time).format('dddd Do MMMM')}
							</h2>
						{/if}
						{#await data?.streamed?.selections then selections}
							<FixtureCard {fixture} {isSelectable} {selections} />
						{/await}
					{/if}
				{/each}
			</section>
		{/key}
	</div>
{:catch}
	<section class="h-[90vh] flex flex-col justify-center">
		<h2 class="text-lg text-center text-red-500">Unable to fetch gameweek fixtures.</h2>
		<p class="text-center text-gray-600">Please try again in a few minutes</p>
	</section>
{/await}
