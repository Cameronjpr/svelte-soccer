<script>
	import { page } from '$app/stores';

	async function signInWithEmail() {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: 'example@email.com',
			options: {
				emailRedirectTo: 'https://example.com/welcome'
			}
		});
	}
</script>

{#if !$page.data.session}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>I am logged in!</p>
{/if}

<form method="POST">
	<input type="text" name="email" placeholder="email" />
	<label for="email">Email</label>
	<button>Log in</button>
</form>
