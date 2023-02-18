<script lang="ts">
	import { onMount } from 'svelte';

	export let currentPage: number;

	const pages = Array.from({ length: 38 }).map((_, i) => i + 1);

	const itemWidth = 90;

	onMount(() => {
		const paginator = document?.querySelector('#paginator');

		console.log(itemWidth * currentPage);

		if (paginator !== null) {
			paginator.scrollLeft = itemWidth * currentPage;
		}
	});

	function scroll() {
		const paginator = document?.querySelector('#paginator');

		console.log(paginator?.scrollLeft);

		if (paginator !== null) {
			paginator.scrollLeft = (itemWidth + 2) * (90 + 16);
		}
	}
</script>

<ul id="paginator">
	{#each pages as page}
		<li class:active={page === currentPage}>
			<a data-sveltekit-noscroll href="/gameweek/{page}">{page}</a>
		</li>
	{/each}
</ul>

<button on:click={scroll}>Click me</button>

<style>
	ul {
		margin: 0 auto;
		display: grid;
		grid-auto-flow: column;
		gap: 16px;
		height: calc(90px + 1rem);
		padding: 1rem;
		max-width: 480px;
		overflow-y: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
	}

	li {
		width: 90px;
		max-width: none;
		border-radius: 1rem;
		list-style: none;
		display: flex;
		justify-content: center;
		align-items: center;
		scroll-snap-align: center;
		background: white;
	}

	a {
		font-weight: bold;
		color: #111;
		text-decoration: none;
		padding: 0.5rem;
		width: 20%;
		height: 20%;
		text-align: center;
		border-radius: 0.5rem;
		border: 0.25rem solid transparent;
		transition: all 0.2s ease-in-out;
	}
	a:visited {
		color: #111;
	}

	.active {
		background: coral;
	}
</style>
