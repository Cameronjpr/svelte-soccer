<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to PremPredictor</h1>

<section>
	<a href="/login">Join {data?.users} players by creating your account today!</a>
</section>
