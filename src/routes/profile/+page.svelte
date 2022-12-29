<script lang="ts">
	import { teams } from '@lib/teams';
	import { each } from 'svelte/internal';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Your profile</h1>
<h2>{data?.session?.user?.email}</h2>

<main>
	<h2>Your selections</h2>
	{#each data?.selections as selection}
		<div class="selection">
			<span>{teams[selection.selection].shortName}</span>
			<span>{selection.fixture}</span>
			<span>by: {selection.selector}</span>
		</div>
	{/each}
</main>

<style>
	.selection {
		display: flex;
		flex-direction: column;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
