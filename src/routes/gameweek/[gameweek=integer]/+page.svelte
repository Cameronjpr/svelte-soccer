<script lang="ts">
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData, PageServerData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import SimplePaginator from '@lib/Paginator/SimplePaginator.svelte';
	import type { Fixture } from '@lib/types';
	import LockClosed from '@lib/icons/LockClosed.svelte';
	import { page } from '$app/stores';

	dayjs.extend(advancedFormat);
	export let data: PageData;

	console.log(data?.popular);

	$: hasStarted = data.gameweek.fixtures.some((f: Fixture) => f.started);
	$: isFinished = data.gameweek.fixtures.every((f: Fixture) => f.finished_provisional);
	$: isSelectable = !hasStarted && !isFinished;
</script>

<h1>Gameweek {data.gameweek.event}</h1>
<SimplePaginator currentGameweek={data.gameweek.event} />
{#if isFinished}
	<section class="alert">
		<LockClosed />
		<p>This gameweek has finished</p>
	</section>
{:else if hasStarted}
	<section class="alert">
		<LockClosed />
		<p>This gameweek has already started</p>
	</section>
{/if}
<main>
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
		background: var(--color-accent);
		border-radius: 0.5rem;
		text-align: center;
	}

	p {
		margin: 0;
	}
</style>
