<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Leaderboard</h1>

<main>
	{#each data.users as user}
		<div>
			<span>{user.username}</span>
			<span>{user.score}</span>
		</div>
	{/each}
</main>
