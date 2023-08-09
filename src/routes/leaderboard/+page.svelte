<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Leaderboard</h1>
<p>Scores are updated after each gameweek.</p>

<main>
	<ul>
		{#each data.users as user}
			<li>
				<span>{user.username}</span>
				<span>{user.score ?? '?'} pts</span>
			</li>
		{/each}
	</ul>
</main>

<style>
	ul {
		padding: 0px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	li {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		border-radius: 00.25rem;
		color: var(--color-text-light);
		background: var(--color-secondary);
	}
</style>
