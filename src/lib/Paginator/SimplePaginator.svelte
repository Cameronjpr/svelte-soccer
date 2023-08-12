<script lang="ts">
	import { preloadCode, preloadData } from '$app/navigation';
	import ChevLeft from '@lib/icons/ChevLeft.svelte';
	import ChevRight from '@lib/icons/ChevRight.svelte';
	import { onMount } from 'svelte';

	export let currentGameweek = 1;

	$: prevGameweek = currentGameweek > 1 ? currentGameweek - 1 : 1;
	$: nextGameweek = currentGameweek < 38 ? currentGameweek + 1 : 38;
</script>

<section>
	<a
		class={`justify-self-start ${currentGameweek === 1 ? 'opacity-0' : ''}`}
		data-sveltekit-noscroll
		href="/gameweek/{prevGameweek}"><ChevLeft />Previous</a
	>
	<h2
		class="text-xl justify-self-center px-4 bg-amber-100 border-2 border-amber-200 rounded-xl py-0.5"
	>
		Week {currentGameweek}
	</h2>
	<a
		class={`justify-self-end ${currentGameweek === 38 ? 'opacity-0' : ''}`}
		data-sveltekit-noscroll
		href="/gameweek/{nextGameweek}">Next<ChevRight /></a
	>
</section>

<style>
	section {
		display: grid;
		margin: auto;
		grid-template-columns: 1fr 2fr 1fr;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
	}

	a {
		font-weight: bold;
		text-decoration: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.35rem;
		height: 2rem;
		width: fit-content;
		text-align: center;
		transition: all 0.2s ease-in-out;
	}
</style>
