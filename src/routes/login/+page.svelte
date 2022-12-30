<script>
	import { page } from '$app/stores';
	import { supabaseClient } from '@lib/db';
	export let form;

	console.log('login page');
	console.log($page);
</script>

<main>
	{#if !$page?.data?.session}
		<h1>Sign in</h1>
		<form method="POST">
			<!-- <label for="email"
				>Email

				<input type="text" name="email" placeholder="email" />
			</label> -->

			<button formaction="?/login&provider=google">Sign in with Google</button>
		</form>
	{:else}
		<h1>Welcome {$page?.data?.session?.user?.email}</h1>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 300px;
	}
</style>
