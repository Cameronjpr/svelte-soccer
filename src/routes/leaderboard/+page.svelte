<script lang="ts">
	import type { PageServerData } from './$types';
	import { teams } from '@lib/teams';
	import Star from '@lib/icons/Star.svelte';
	export let data: PageServerData;

	const sorted = data.users.sort?.((a, b) => b.score - a.score);
	const hiscore = sorted[0].score;

	const currentUser = data?.users?.filter((user) => user.auth_user == data?.session?.user?.id)[0];
</script>

<h1>Leaderboard</h1>
<p>Scores are updated after each gameweek.</p>
{#if !currentUser?.username}
	<p>
		If you don’t see yourself on the leaderboard, make sure you have <a
			class="underline"
			href="/profile">set a username!</a
		>
	</p>
{/if}
<section class="py-8">
	<ul class="p-0">
		{#each sorted as user, index}
			<li
				class={`border-b-2 border-slate-300 px-2 py-3 font-semibold text-lg flex justify-between items-center}`}
			>
				<div class="flex items-center gap-4">
					{#if user.score === hiscore}
						<span class="text-amber-500">
							<Star />
						</span>
					{:else}
						<span class="text-slate-500">#{index + 1}</span>
					{/if}

					<div class="flex flex-col items-start pr-2 text-base w-fit">
						<span
							class={user.auth_user == data?.session?.user?.id
								? 'text-green-700 dark:text-amber-500'
								: ''}>{user.username ?? 'Anonymous player'}</span
						>
						{#if user?.selection}
							<span class="text-sm italic"
								>{teams[user?.selection?.selection - 1]?.shortName ?? '?'}</span
							>
						{:else}
							<span class="text-sm">No selection</span>
						{/if}
					</div>
				</div>
				<div
					class={`flex flex-col items-center justify-center bg-slate-200 border-2 border-slate-300 rounded-full h-12 w-12 content-center`}
				>
					<span class="dark:text-black">{user.score}</span>
				</div>
			</li>
		{/each}
	</ul>
</section>
