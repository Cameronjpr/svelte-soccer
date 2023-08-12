<script lang="ts">
	import ChevLeft from '@lib/icons/ChevLeft.svelte';
	import ChevRight from '@lib/icons/ChevRight.svelte';

	export let currentGameweek = 1;

	$: prevGameweek = currentGameweek > 1 ? currentGameweek - 1 : 1;
	$: nextGameweek = currentGameweek < 38 ? currentGameweek + 1 : 38;
</script>

<section
	class=" bg-gray-300 text-gray-800 p-1 px-2 rounded-lg grid grid-cols-[1fr_1fr_1fr] items-center"
>
	<a
		class={`flex justify-self-start ${currentGameweek === 1 ? 'opacity-0' : ''}`}
		data-sveltekit-noscroll
		href="/gameweek/{prevGameweek}"><ChevLeft />Previous</a
	>
	<h2 class="text-xl justify-self-center px-4 rounded-xl py-0.5 my-0 text-center">
		Week {currentGameweek}
	</h2>
	<a
		class={`flex justify-self-end ${currentGameweek === 38 ? 'opacity-0' : ''}`}
		data-sveltekit-noscroll
		href="/gameweek/{nextGameweek}">Next<ChevRight /></a
	>
</section>
