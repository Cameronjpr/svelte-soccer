<script>
	import { page } from '$app/stores';
</script>

<main>
	{#if !$page?.data?.session}
		<h1>Sign in</h1>
		<form method="POST">
			<button
				class="w-full h-auto bg-emerald-500 p-3 rounded-lg mt-8 text-center text-black font-semibold text-lg shadow-md"
				formaction="?/login&provider=google">Sign in with Google</button
			>
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
