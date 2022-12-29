<script>
	import { page } from '$app/stores';
</script>

{#if !$page.data.session}
	<h1>Sign in</h1>
	<form method="POST">
		<label for="email"
			>Email

			<input type="text" name="email" placeholder="email" />
		</label>
		<label for="password"
			>Password
			<input type="password" name="password" placeholder="password" />
		</label>
		<button>Sign in</button>
	</form>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
		max-width: 300px;
	}
</style>
