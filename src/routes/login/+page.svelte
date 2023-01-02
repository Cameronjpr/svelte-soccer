<script>
	import { page } from '$app/stores';
</script>

<main>
	{#if !$page?.data?.session}
		<h1>Sign in</h1>
		<form method="POST">
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
