<script lang="ts">
	import { enhance } from '$app/forms';
	import { teams } from '@lib/teams';
	import type { ActionData, PageData, PageServerData } from './$types';
	export let data: PageServerData;
	export let form: ActionData;

	console.log(data);
</script>

<h1>My profile</h1>
{#if data?.user?.username}
	<h2>Signed in as {data?.user?.username}</h2>
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
	<ul>
		{#each data?.selections as selection}
			<li>
				<span>GW {selection?.gameweek}</span>
				<span>{teams[selection?.selection].name}</span>
			</li>
		{/each}
	</ul>
{/if}
<form method="POST" action="?/signout">
	<button>Sign out</button>
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
