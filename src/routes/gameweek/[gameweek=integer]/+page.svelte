<script lang="ts">
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData, PageServerData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import SimplePaginator from '@lib/Paginator/SimplePaginator.svelte';
	import type { Fixture } from '@lib/types';
	import LockClosed from '@lib/icons/LockClosed.svelte';
	import { page } from '$app/stores';
	import { teams } from '@lib/teams';

	dayjs.extend(advancedFormat);
	dayjs.extend(relativeTime);
	export let data: PageData;

	$: hasStarted = data.gameweek.fixtures.some((f: Fixture) => f.started);
	$: isFinished = data.gameweek.fixtures.every((f: Fixture) => f.finished_provisional);

	$: kickoffs = data.gameweek.fixtures.map((f: Fixture) => f.kickoff_time);
	$: firstKickoff = dayjs(kickoffs.sort()[0]);
	$: deadline = firstKickoff.subtract(1, 'hour');

	$: isSelectable = !hasStarted && !isFinished && dayjs().isBefore(deadline);
</script>

<Toaster />
<h1>Week {data.gameweek.event}</h1>
<p class="text-center pb-4">Select <strong>one</strong> team you think will win this week!</p>
<SimplePaginator currentGameweek={data.gameweek.event} fixtures={data.gameweek.fixtures} />
{#if isFinished}
	<section class={`alert bg-slate-600 text-white p-2 rounded-lg text-center font-semibold`}>
		<LockClosed />
		<p>This gameweek has finished</p>
	</section>
{:else if hasStarted || (!isFinished && !dayjs().isBefore(deadline))}
	<section class={`alert bg-red-700 text-white p-2 rounded-lg text-center font-semibold`}>
		<LockClosed />
		<p>This gameweek is LIVE!</p>
	</section>
{:else}
	<section class={`bg-black text-white p-2 rounded-lg text-center font-semibold`}>
		<p>Selection deadline: {dayjs().to(deadline)}</p>
	</section>
{/if}
<main class="py-8">
	{#each data.gameweek.fixtures as fixture, index}
		{#if index === 0 || dayjs(data.gameweek.fixtures[index - 1]?.kickoff_time).date() !== dayjs(fixture.kickoff_time).date()}
			<h2>{dayjs(fixture.kickoff_time).format('dddd Do MMMM')}</h2>
		{/if}
		<FixtureCard {fixture} {isSelectable} selections={data?.selections} />
	{/each}
</main>

<style>
	main {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}

	.alert {
		display: grid;
		grid-template-columns: 1fr 6fr 1fr;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding-inline: 1rem;
		padding-block: 0.5rem;
	}

	p {
		margin: 0;
	}
</style>
