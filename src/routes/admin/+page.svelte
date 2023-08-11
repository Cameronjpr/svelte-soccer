<script lang="ts">
	import Button from '@lib/Button/Button.svelte';
</script>

<h1>Admin</h1>

<section class="flex flex-col gap-4">
	<form method="POST">
		<Button class="appearance-primary" formaction="?/calculate">Calculate scores</Button>
	</form>
</section>
