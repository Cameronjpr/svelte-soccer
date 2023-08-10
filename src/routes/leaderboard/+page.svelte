<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Leaderboard</h1>
<p class="text-center">Scores are updated after each gameweek.</p>

<main class="py-8">
	<ul class="p-0">
		{#each data.users as user}
			<li class="border-b-2 border-red-600 p-4 font-semibold text-lg flex justify-between">
				<span>{user.username}</span>
				<span>{user.score ?? '?'} pts</span>
			</li>
		{/each}
	</ul>
</main>
