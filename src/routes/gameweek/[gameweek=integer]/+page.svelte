<script lang="ts">
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	import Paginator from '@lib/Paginator/Paginator.svelte';
	import SimplePaginator from '@lib/Paginator/SimplePaginator.svelte';
	import type { Fixture } from '@lib/types';

	dayjs.extend(advancedFormat);
	export let data: PageData;

	$: hasStarted = data.gameweek.fixtures.some((f: Fixture) => f.started);
	$: isFinished = data.gameweek.fixtures.every((f: Fixture) => f.finished_provisional);
	$: isSelectable = !hasStarted && !isFinished;
</script>

<h1>Gameweek {data.gameweek.event}</h1>
<!-- {#if data.gameweek.event === data?.activeGameweek}
	<span id="live-chip">live</span>
{/if} -->
<SimplePaginator currentGameweek={data.gameweek.event} />
{#if isFinished}
	<p>Selections are locked because this gameweek has finished</p>
{:else if hasStarted}
	<p>Selections are locked because this gameweek has started</p>
{/if}
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

	p {
		padding-inline: 1rem;
		padding-block: 0.5rem;
		background: var(--color-accent);
		border-radius: 0.5rem;
		text-align: center;
	}

	#live-chip {
		background: var(--color-primary);
		color: var(--color-text);
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		margin-left: 0.5rem;
	}
</style>
