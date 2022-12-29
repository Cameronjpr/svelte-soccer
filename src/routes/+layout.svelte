<script>
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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
</script>

<nav>
	<a href="/">Home</a>
	<a href="/signin">Sign in</a>
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
