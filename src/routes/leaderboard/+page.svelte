<script lang="ts">
	import User from '@lib/icons/User.svelte';
	import type { PageData } from './$types';
	import { teams } from '@lib/teams';
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
				class="border-b-2 border-emerald-600 px-1 py-3 font-semibold text-lg flex justify-between items-center"
			>
				<div class="flex items-center gap-4">
					<User />
					<div class="flex flex-col items-start">
						<span>{user.username}</span>
						{#if user?.selection}
							<span class="text-sm italic"
								>{teams[user?.selection.selection - 1]?.shortName ?? '?'}</span
							>
						{:else}
							<span class="text-sm">No selection</span>
						{/if}
					</div>
				</div>
				<div class="flex flex-col items-end">
					<span>{user.score} pts</span>
				</div>
			</li>
		{/each}
	</ul>
</main>
