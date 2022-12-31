<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { teams } from '@lib/teams';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	export let activeGameweek: number;
	export let data: LayoutData;
	console.log('layout page data', activeGameweek);
</script>

<nav>
	<div>
		<a href="/">🏠 Home</a>
	</div>
	<div id="user-section">
		{#if $page?.data?.session}
			<a href="/profile">👋 Profile</a>
		{:else}
			<a href="/login">👋 Sign in</a>
		{/if}
		<a href="/leaderboard">🏆 Leaderboard</a>
		<a href="/gameweek/{$page?.data?.activeGameweek ?? 1}">🗓 Fixtures</a>
	</div>
</nav>

<main>
	<slot />
	<footer>
		<span>Debugging info:</span>
		<ul>
			<li>Session: {$page?.data?.session}</li>
			{#if $page?.data?.selections}
				<li>
					Selections:
					<ul>
						{#each $page?.data?.selections as selection}
							<li>GW {selection?.gameweek}, {teams[selection?.selection].shortName}</li>
						{/each}
					</ul>
				</li>
			{/if}
		</ul>
	</footer>
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		background: seagreen;
	}

	nav a {
		font-weight: bold;
		font-size: large;
		text-decoration: none;
		color: white;
	}

	#user-section {
		display: flex;
		gap: 1.5rem;
	}

	main {
		margin: auto;
		padding: 0.5rem;
		max-width: 768px;
	}

	footer {
		margin-top: 20px;
	}
</style>
