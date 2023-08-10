<script>
	import { page } from '$app/stores';
	import Button from '@lib/Button/Button.svelte';
</script>

<main>
	{#if !$page?.data?.session}
		<h1>Sign in</h1>
		<form method="POST" action="?/login&provider=google">
			<Button>Join with Google</Button>
		</form>
	{:else}
		<h1>You're already signed in.</h1>
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
