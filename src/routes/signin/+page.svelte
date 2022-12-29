<script>
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	export let form;

	console.log($page);
</script>

{#if !$page?.data?.session}
	<h1>Sign in</h1>
	<form method="POST">
		<label for="email"
			>Email

			<input type="text" name="email" placeholder="email" />
		</label>

		<button>Send magic link</button>
	</form>
	<h2>Need an account?</h2>
	<a href="/signup">Register</a>
{:else}
	<h1>Welcome {$page?.data?.session?.user?.email}</h1>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 300px;
	}
</style>
