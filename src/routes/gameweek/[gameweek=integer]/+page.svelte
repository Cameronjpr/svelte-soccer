<script lang="ts">
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';
	import dayjs from 'dayjs';
	import advancedFormat from 'dayjs/plugin/advancedFormat';
	dayjs.extend(advancedFormat);

	export let data: PageData;

	console.log(data.gameweek.fixtures);
</script>

<section>
	<h1>Gameweek {data.gameweek.event}</h1>
	{#if !(data.gameweek.event === data.activeGameweek)}
		<a id="gameweek-live" href={`/gameweek/${data.activeGameweek}`}>Jump to current gameweek</a>
	{/if}
</section>
<main>
	{#each data.gameweek.fixtures as fixture, index}
		{#if index === 0 || dayjs(data.gameweek.fixtures[index - 1]?.kickoff_time).date() !== dayjs(fixture.kickoff_time).date()}
			<h2>{dayjs(fixture.kickoff_time).format('dddd Do MMMM')}</h2>
		{/if}
		<FixtureCard {fixture} selections={data?.selections} />
	{/each}
	<section id="gameweek-pagination">
		<a id="gameweek-previous" href={`/gameweek/${data.gameweek.event - 1}`}>Previous</a>
		<a id="gameweek-next" href={`/gameweek/${data.gameweek.event + 1}`}>Next</a>
	</section>
</main>

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
