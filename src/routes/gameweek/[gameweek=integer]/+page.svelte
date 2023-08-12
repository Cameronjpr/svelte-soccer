<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import SimplePaginator from '@lib/Paginator/SimplePaginator.svelte';
	import LockClosed from '@lib/icons/LockClosed.svelte';

	dayjs.extend(advancedFormat);
	dayjs.extend(relativeTime);
	export let data: PageData;

	$: currentGameweek = Number(data?.currentGameweek);
</script>

<Toaster />

{#await data?.streamed?.fixtures then res}
	{@const gameweek = { fixtures: res?.fixtures?.filter((f) => f.event === currentGameweek) }}
	{@const hasStarted = gameweek?.fixtures.some((f) => f.started)}
	{@const isFinished = gameweek?.fixtures.every((f) => f.finished_provisional)}
	{@const kickoffs = gameweek?.fixtures.map((f) => f.kickoff_time)}
	{@const firstKickoff = dayjs(kickoffs.sort()[0])}
	{@const isSelectable = !hasStarted && !isFinished && dayjs().isBefore(firstKickoff)}
	<div class="flex flex-col align-middle">
		<SimplePaginator {currentGameweek} />
		{#if isFinished}
			<section class={`alert bg-slate-600 text-white p-2 rounded-lg text-center font-semibold`}>
				<LockClosed />
				<p>This gameweek has finished</p>
			</section>
		{:else if hasStarted || (!isFinished && !dayjs().isBefore(firstKickoff))}
			<section
				class={`alert border-2 bg-red-700 text-red-100 p-2 rounded-lg text-center font-semibold`}
			>
				<LockClosed />
				<p>This gameweek is LIVE!</p>
			</section>
		{:else}
			<section class={`bg-black text-white p-2 rounded-lg text-center font-semibold`}>
				<p>Selection deadline: {dayjs().to(firstKickoff)}</p>
			</section>
			<p class="text-center pt-2">
				Select <strong>one</strong> team you think will win this week!
			</p>
		{/if}
		{#key gameweek}
			<main class="py-8">
				{#each gameweek.fixtures as fixture, index}
					{#if fixture.event == data?.currentGameweek}
						{#if index === 0 || dayjs(gameweek.fixtures[index - 1]?.kickoff_time).date() !== dayjs(fixture.kickoff_time).date()}
							<h2 class="pt-8">{dayjs(fixture.kickoff_time).format('dddd Do MMMM')}</h2>
						{/if}
						<FixtureCard
							{fixture}
							{isSelectable}
							selections={data?.selections}
							activeGameweek={data?.activeGameweek}
						/>
					{/if}
				{/each}
			</main>
		{/key}
	</div>
{/await}

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
