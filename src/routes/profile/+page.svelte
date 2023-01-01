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
<h2>Signed in as {data?.session?.user?.username ?? data?.session?.user?.email}</h2>
<form method="POST" action="?/signout">
	<button>Sign out</button>
</form>

<main>
	<h2>Badges</h2>
	<ul>
		<li>Hot streak</li>
		<li>Underdog</li>
		<li>Global Winner, GW5</li>
		<li>Top 50, 22/23</li>
	</ul>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	ul {
		padding-left: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	li {
		list-style: none;
		background: seagreen;
		border-radius: 0.25em;
		padding: 0.5em;
		width: 30%;
	}
</style>
