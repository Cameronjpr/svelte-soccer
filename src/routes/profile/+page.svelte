<script lang="ts">
	import { each } from 'svelte/internal';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Your profile</h1>
<h2>{data?.session?.user?.email}</h2>

<main>
	<h2>Your selections</h2>
	{#each data?.selections as selection}
		<div>
			<span>{selection.selection}</span>
			<span>{selection.fixture}</span>
			<span>{selection.selector}</span>
		</div>
	{/each}
</main>
