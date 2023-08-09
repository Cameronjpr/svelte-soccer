<script lang="ts">
</script>

<h1>Admin</h1>

<form method="POST">
	<button class="appearance-primary" formaction="?/calculate"> Calculate scores </button>
</form>

<button
	on:click={() => {
		throw new Error('Sentry Frontend Error');
	}}
>
	Throw error
</button>
