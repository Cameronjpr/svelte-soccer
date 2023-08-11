<script lang="ts">
	import User from '@lib/icons/User.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Leaderboard</h1>
<p class="text-center">Scores are updated after each gameweek.</p>
<p class="text-center">
	If you don’t see yourself on the leaderboard, make sure you have <a
		class="underline"
		href="/profile">set a username!</a
	>
</p>

<main class="py-8">
	<ul class="p-0">
		{#each data.users as user}
			<li
				class="border-b-2 border-emerald-600 px-1 py-4 font-semibold text-lg flex justify-between"
			>
				<div class="flex gap-2 align-middle">
					<User />
					<span>{user.username}</span>
				</div>
				<span>{user.score ?? '?'} pts</span>
			</li>
		{/each}
	</ul>
</main>
