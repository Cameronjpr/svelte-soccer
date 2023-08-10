<script lang="ts">
	import ChevLeft from '@lib/icons/ChevLeft.svelte';
	import ChevRight from '@lib/icons/ChevRight.svelte';

	export let currentGameweek = 1;

	$: prevGameweek = currentGameweek > 1 ? currentGameweek - 1 : 1;
	$: nextGameweek = currentGameweek < 38 ? currentGameweek + 1 : 38;
</script>

<section class="flex align-middle justify-between mb-2">
	<a data-sveltekit-noscroll href="/gameweek/{prevGameweek}"><ChevLeft />Previous</a>
	<a data-sveltekit-noscroll href="/gameweek/{nextGameweek}">Next<ChevRight /></a>
</section>

<style>
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
