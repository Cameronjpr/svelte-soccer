
<script lang="ts">
  export let currentGameweek = 1;

  $: prevGameweek = currentGameweek > 1 ? currentGameweek - 1 : 1
  $: nextGameweek = currentGameweek < 38 ? currentGameweek + 1 : 38
</script>

<section>
	<a data-sveltekit-noscroll href="/gameweek/{prevGameweek}">Previous</a>
	<a data-sveltekit-noscroll href="/gameweek/{nextGameweek}">Next</a>
</section>

<style>
	section {
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	a {
		font-weight: bold;
		text-decoration: none;
		width: 20%;
		height: 2.5rem;
		line-height: 2.5rem;
		text-align: center;
		border-radius: 0.75rem;
		border: 0.2rem solid var(--color-accent);
		transition: all 0.2s ease-in-out;
	}

	.active {
		border: 0.2rem solid coral;
	}
</style>
