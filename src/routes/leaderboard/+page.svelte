<script lang="ts">
	import type { PageServerData } from './$types';
	import { teams } from '@lib/teams';
	import Star from '@lib/icons/Star.svelte';
	import { isGameweekUnderway } from '@lib/util/gameweek';
	export let data: PageServerData;

	let showInactivePlayers = false;

	const sorted = data.users.sort?.((a, b) => b.score - a.score);
	$: visible = showInactivePlayers ? sorted : sorted.filter((user) => user.selection?.selection);
	const hiscore = sorted[0].score;

	const currentUser = data?.users?.filter((user) => user.auth_user == data?.session?.user?.id)[0];
</script>

<h1>Leaderboard</h1>
<p>Scores are updated after each gameweek. Selections will be revealed once the gameweek starts!</p>
{#if !currentUser?.username}
	<p>
		If you don’t see yourself on the leaderboard, make sure you have <a
			class="underline"
			href="/profile">set a username!</a
		>
	</p>
{/if}
<section class="py-8">
	<form class="flex items-center gap-2 pt-4 justify-end">
		<input bind:checked={showInactivePlayers} name="inactive-players" type="checkbox" />
		<label for="inactive-players">Show inactive players </label>
	</form>
	<ul class="p-0">
		{#each visible as user, index}
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
						{#if data?.isGameweekUnderway}
							{#if user?.selection?.selection}
								<span class="text-sm italic"
									>{teams[user?.selection?.selection - 1]?.shortName ?? '?'}</span
								>
							{:else}
								<span class="text-sm">...</span>
							{/if}
						{:else}
							<span class="text-sm italic">?</span>
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
