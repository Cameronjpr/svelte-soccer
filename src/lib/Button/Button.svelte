<script lang="ts">
	import Spinner from '@lib/icons/Spinner.svelte';

	export let formaction: any = null;
	export let disabled = false;
	export let isLoading = false;
	export let onClick: any = null;

	export let appearance = 'primary';
</script>

<button
	{disabled}
	{formaction}
	on:click={onClick}
	class={`dark:text-slate-950 w-full flex justify-center items-center py-6 space-x-2 text-lg font-bold px-5 rounded-xl  border-2 shadow ${
		appearance === 'primary'
			? 'bg-green-300 border-green-400 text-green-900'
			: appearance === 'secondary'
				? 'bg-stone-200 border-stone-400 text-stone-900'
				: appearance === 'link'
					? 'font-semibold bg-transparent border-transparent shadow-none text-slate-950 underline !p-0 w-auto'
					: 'bg-red-300 border-red-400 text-red-900'
	}   ${disabled ? 'cursor-not-allowed' : ''}`}
>
	{#if isLoading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>
