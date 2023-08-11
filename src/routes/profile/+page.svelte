<script lang="ts">
	import { enhance } from '$app/forms';
	import { teams } from '@lib/teams';
	import type { ActionData, PageServerData } from './$types';
	import Button from '@lib/Button/Button.svelte';
	export let data: PageServerData;
	export let form: ActionData;
</script>

{#if data?.user?.username}
	<h1>Hello, {data?.user?.username}</h1>
	<form
		method="POST"
		action="?/updateUsername"
		use:enhance
		class="flex flex-col gap-2 max-w-sm m-auto"
	>
		<label class="flex flex-col gap-1 font-semibold" for="username">
			Update username
			<input placeholder={data?.user?.username} class="px-3" type="text" name="username" />
		</label>
		<Button>Update</Button>
	</form>
{:else}
	<section class="flex flex-col justify-stretch gap-4 max-w-sm m-auto">
		<span>You don't have a <strong>username</strong> set.</span>
		<form method="POST" action="?/updateUsername" use:enhance class="flex flex-col gap-2">
			<label class="flex flex-col gap-1 font-semibold" for="username">
				Username
				<input class="px-3" type="text" name="username" />
			</label>
			<Button>Save</Button>
		</form>
		{#if form?.error}
			<span class="error">{form?.error}</span>
		{/if}
	</section>
{/if}

{#if data?.selections}
	<section class="flex flex-col justify-stretch gap-0 max-w-sm m-auto my-12">
		<h2>Your selections</h2>
		<ul class="text-center">
			{#each data?.selections as selection}
				<li>
					<span>Week {selection?.gameweek}:</span>
					<span>{teams[selection?.selection - 1]?.name}</span>
				</li>
			{/each}
		</ul>
	</section>
{/if}
<section class="flex flex-col justify-stretch gap-4 max-w-sm m-auto">
	<form method="POST" action="?/signout" class="max-w-sm m-auto w-full">
		<Button>Sign out</Button>
	</form>
	<form method="POST" action="?/deleteAccount" class="max-w-sm m-auto w-full">
		<button
			class="w-full dark:text-slate-950 flex justify-center items-center py-6 space-x-2 text-lg font-bold px-5 rounded-xl bg-red-300 border-2 border-red-400 shadow"
			>Delete account</button
		>
	</form>
</section>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: start;
		gap: 0.5rem;
	}

	label {
		display: flex;
		flex-direction: column;
	}

	ul {
		padding: 0px;
		margin-top: 0px;
		list-style: none;
	}
</style>
