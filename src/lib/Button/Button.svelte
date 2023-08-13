<script lang="ts">
	import Spinner from '@lib/icons/Spinner.svelte';

	export let formaction: any = null;
	export let disabled = false;
	export let isLoading = false;

	export let appearance = 'primary';
</script>

<button
	{disabled}
	{formaction}
	class={`${
		appearance === 'primary'
			? 'bg-green-300 border-green-400 text-green-900'
			: 'bg-red-300 border-red-400 text-red-900'
	} w-full dark:text-slate-950 flex justify-center items-center py-6 space-x-2 text-lg font-bold px-5 rounded-xl  border-2 shadow ${
		disabled ? 'cursor-not-allowed' : ''
	}`}
>
	{#if isLoading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>
