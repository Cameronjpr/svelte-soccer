<script lang="ts">
	import { enhance } from '$app/forms';
	import { teams } from '@lib/teams';
	import type { ActionData, PageServerData } from './$types';
	export let data: PageServerData;
	export let form: ActionData;
</script>

{#if data?.user?.username}
	<h1>Signed in as {data?.user?.username}</h1>
{:else}
	<span>You don't have a <strong>username</strong> set.</span>
	<form method="POST" action="?/updateUsername" use:enhance>
		<label for="username">
			Username
			<input type="text" name="username" />
		</label>
		<button>Set username</button>
	</form>
	{#if form?.error}
		<span class="error">{form?.error}</span>
	{/if}
{/if}

{#if data?.selections}
	<h2>Your selections</h2>
	<ul class="text-center">
		{#each data?.selections as selection}
			<li>
				<span>Week {selection?.gameweek}:</span>
				<span>{teams[selection?.selection - 1].name}</span>
			</li>
		{/each}
	</ul>
{/if}
<form method="POST" action="?/signout" class="py-12 max-w-sm m-auto">
	<button class="linkbutton">Sign out</button>
</form>

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
