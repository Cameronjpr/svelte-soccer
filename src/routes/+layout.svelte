<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';

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

	export let data: LayoutData;
	// console.log('layout page data', data);
</script>

<nav>
	<a href="/">Home</a>
	{#if $page?.data?.session}
		<a href="/profile">Profile</a>
	{:else}
		<a href="/login">Sign in</a>
	{/if}
	<a href="/leaderboard">Leaderboard</a>
	<a href="/gameweek/1">Fixtures</a>
</nav>

<main>
	<slot />
	{$page?.data?.session}
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		background: green;
	}

	nav a {
		font-weight: bold;
		font-size: large;
		color: white;
	}

	main {
		padding: 2rem;
	}
</style>
