<script lang="ts">
	export let currentPage: number;

	$: offset = 0;
	$: {
		switch (currentPage) {
			case 1:
				offset = 0;
				break;
			case 38:
				offset = -2;
				break;
			default:
				offset = -1;
		}
	}

	$: pages = Array.from({ length: 3 }, (_, i) => i + currentPage + offset);
</script>

<section>
	<a data-sveltekit-noscroll href="/gameweek/1">First</a>
	{#each pages as page}
		<a data-sveltekit-noscroll href="/gameweek/{page}" class:active={page === currentPage}>{page}</a
		>
	{/each}
	<a data-sveltekit-noscroll href="/gameweek/38">Last</a>
</section>

<style>
	section {
		margin-top: 1rem;
		padding-block: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	a {
		font-weight: bold;
		color: #111;
		text-decoration: none;
		background: white;
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
		border: 0.2rem solid coral;
	}
</style>
