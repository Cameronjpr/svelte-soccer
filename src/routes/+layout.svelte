<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';

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
	console.log(data);

	function handleSignout() {
		const { error } = supabaseClient.auth.signOut();

		if (error) {
			console.log(error);
		}
		throw redirect(303, '/');
	}
</script>

<nav>
	<a href="/">Home</a>
	{#if data?.session}
		<button on:click={handleSignout}>Sign out</button>
	{:else}
		<a href="/signin">Sign in</a>
	{/if}
	<a href="/leaderboard">Leaderboard</a>
	<a href="/gameweek/1">Fixtures</a>
</nav>

<main>
	<slot />
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 2rem;
	}

	main {
		padding: 2rem;
	}
</style>
