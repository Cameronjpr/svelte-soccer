<script lang="ts">
	import ChevLeft from '@lib/icons/ChevLeft.svelte';
	import ChevRight from '@lib/icons/ChevRight.svelte';

	export let currentGameweek = 1;
	export let setGameweek: (gameweek: number) => void;

	$: prevGameweek = currentGameweek > 1 ? currentGameweek - 1 : 1;
	$: nextGameweek = currentGameweek < 38 ? currentGameweek + 1 : 38;
</script>

<section
	class="text-gray-800 dark:text-gray-800 py-1 rounded-lg grid grid-cols-[1fr_1fr_1fr] items-center"
>
	<button
		class={`flex items-center gap-1  justify-self-start ${
			currentGameweek === 1 ? 'opacity-0' : ''
		}`}
		on:click={() => setGameweek(currentGameweek === 1 ? 1 : prevGameweek)}
		data-sveltekit-noscroll
	>
		<ChevLeft />Previous
	</button>
	<h2 class="text-xl justify-self-center px-4 rounded-xl py-0.5 my-0 text-center">
		Week {currentGameweek}
	</h2>
	<button
		class={`flex items-center gap-1 justify-self-end ${currentGameweek === 38 ? 'opacity-0' : ''}`}
		on:click={() => setGameweek(currentGameweek === 38 ? 38 : nextGameweek)}
		data-sveltekit-noscroll>Next<ChevRight /></button
	>
</section>
