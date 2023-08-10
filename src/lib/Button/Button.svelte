<script lang="ts">
	export let formaction: any = null;
	export let disabled = false;
	export let isLoading = false;
</script>

<button
	{disabled}
	{formaction}
	class="w-full dark:text-slate-950 flex justify-center items-center py-6 space-x-2 text-lg font-bold px-5 rounded-xl bg-emerald-300 border-2 border-emerald-400 shadow"
>
	<slot />
</button>
