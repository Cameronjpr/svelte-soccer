<script lang="ts">
	import Button from '@lib/Button/Button.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>Admin</h1>

<section class="flex flex-col gap-4">
	<form method="POST">
		<Button appearance="primary" formaction="?/calculate">Calculate scores</Button>
	</form>
	<form method="POST">
		<Button appearance="primary" formaction="?/syncFixtures">Sync fixtures</Button>
	</form>
	<section>
		<span>Upcoming gameweek: {data?.upcomingGameweek}</span>
	</section>
</section>
