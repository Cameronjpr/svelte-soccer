<script lang="ts">
	import { supabaseClient } from '@lib/db';
	import { teams } from '@lib/teams';
	import { fail, redirect } from '@sveltejs/kit';
	import { each } from 'svelte/internal';
	import type { PageData } from './$types';
	import { getSupabase } from '@supabase/auth-helpers-sveltekit';
	export let data: PageData;
</script>

<h1>Hey!</h1>
<h2>Signed in as {data?.session?.user?.username ?? 'anonymous'}</h2>

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
</style>
