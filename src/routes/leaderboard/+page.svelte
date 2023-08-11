<script lang="ts">
	import User from '@lib/icons/User.svelte';
	import type { PageData } from './$types';
	import { teams } from '@lib/teams';
	export let data: PageData;

	console.log(data?.session?.user?.id);
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
		{#each data.users as user, index}
			<li
				class={`border-b-2 border-slate-300 px-2 py-3 font-semibold text-lg flex justify-between items-center ${
					user.uuid == data?.session?.user?.id ? 'bg-amber-100' : ''
				}`}
			>
				<div class="flex items-center gap-4">
					<span class="text-slate-500">#{index + 1}</span>
					<div class="flex flex-col items-start pr-2 text-base w-fit">
						<span class={user.uuid == data?.session?.user?.id ? 'text-green-700' : ''}
							>{user.username ?? 'Anonymous player'}</span
						>
						{#if user?.selection}
							<span class="text-sm italic"
								>{teams[user?.selection.selection - 1]?.shortName ?? '?'}</span
							>
						{:else}
							<span class="text-sm">No selection</span>
						{/if}
					</div>
				</div>
				<div
					class="flex flex-col items-center justify-center bg-slate-200 border-2 border-slate-300 rounded-full h-12 w-12 content-center"
				>
					<span>{user.score}</span>
				</div>
			</li>
		{/each}
	</ul>
</main>
