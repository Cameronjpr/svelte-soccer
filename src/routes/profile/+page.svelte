<script lang="ts">
	import { enhance } from '$app/forms';
	import { teams } from '@lib/teams';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;
</script>

<h1>My profile</h1>
{#if data?.session?.user?.username}
	<h2>Signed in as {data?.session?.user?.username}</h2>
{:else}
	<span>You don't have a <strong>username</strong> set.</span>
	<form method="POST" action="?/updateUsername" use:enhance>
		<input type="text" name="username" />
		<button>Set username</button>
	</form>
	{#if form?.error}
		<span class="error">{form?.error}</span>
	{/if}
{/if}

<main>
	<h2>Your selections</h2>
	<ul>
		{#each data?.selections as selection}
			<li>
				<span>GW {selection?.gameweek}</span>
				<span>{teams[selection?.selection].shortName}</span>
			</li>
		{/each}
	</ul>
</main>
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

	ul {
		padding: 0px;
		margin-top: 0px;
		list-style: none;
	}
</style>
