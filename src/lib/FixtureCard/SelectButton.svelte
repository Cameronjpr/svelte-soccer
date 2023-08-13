<script lang="ts">
	import type { Team } from '@lib/types';
	import { fade } from 'svelte/transition';

	export let team: Team;
	export let isSelectable: boolean;
	export let isHome = false;
	export let selectionLoading: boolean;
	export let gameweekSelection: number | undefined;
	export let handlePreselect: (teamId: number) => void;
</script>

<button
	disabled={!isSelectable || gameweekSelection == team.id}
	class="
    font-semibold border-0 rounded p-2 text-center h-12 dark:text-gray-900
    {selectionLoading ? 'animate-pulse' : ''}
		{gameweekSelection == team.id ? 'bg-green-300' : 'bg-gray-200'}"
	on:click={() => handlePreselect(team.id)}
	style="border-color: {team.primaryColor}; border-{isHome ? 'left' : 'right'}-width: 4px;"
>
	{team.shortName}
</button>
