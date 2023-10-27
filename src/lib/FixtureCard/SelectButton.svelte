<script lang="ts">
	import type { Selection, Team } from '@lib/types';
	import { fade } from 'svelte/transition';

	export let team: Team;
	export let isSelectable: boolean;
	export let isHome = false;
	export let selectionLoading: boolean;
	export let priorSelections: Array<Selection>;
	export let gameweekSelection: number | null | undefined;
	export let handlePreselect: (teamId: number) => void;
</script>

<button
	disabled={!isSelectable || gameweekSelection == team.id}
	class="flex justify-between items-center font-semibold border-0 rounded p-2 text-center h-12 dark:text-gray-900
    {selectionLoading ? 'animate-pulse' : ''}
		{gameweekSelection == team.id ? 'bg-green-300' : 'bg-gray-200 dark:bg-gray-300'}"
	on:click={() => handlePreselect(team.id)}
	style="border-color: {team.primaryColor}; border-{isHome ? 'left' : 'right'}-width: 4px;"
>
	<span class="h-4 leading-3 px-1">{team.shortName}</span>
	<div class="flex flex-col h-full justify-between {isHome ? 'order-first' : ''}">
		{#each priorSelections as _}
			<div class="w-2 h-3 rounded-md bg-slate-800 relative"></div>
		{/each}
	</div>
</button>
