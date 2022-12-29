<script>
	import { page } from '$app/stores';
</script>

{#if !$page.data.session}
	<h1>Enter your email to get started</h1>
	<form method="POST">
		<input type="text" name="email" placeholder="email" />
		<label for="email">Email</label>
		<button>Sign in</button>
	</form>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
{/if}
