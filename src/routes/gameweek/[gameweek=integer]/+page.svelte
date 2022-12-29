<script lang="ts">
	import FixtureCard from '@lib/FixtureCard/FixtureCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Gameweek {data.gameweek.event}</h1>
<section>
	<a href={`/gameweek/${data.gameweek.event - 1}`}>Previous</a>
	<a href={`/gameweek/${data.gameweek.event + 1}`}>Next</a>
</section>
<main>
	{#each data.gameweek.fixtures as fixture}
		<FixtureCard {fixture} />
	{/each}
</main>

<style>
	section {
		display: flex;
		justify-content: space-between;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
