<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Button from '@lib/Button/Button.svelte';

	export let data: PageData;
	let ready = false;
	onMount(() => (ready = true));
</script>

<h1>Thanks for playing Gameweek Gurus!</h1>
<p>I hope you enjoyed playing along for the 23/24 season! Gameweek Gurus is taking a break for a while, as I work on other projects (and look after a 🐣)</p>

<style>
	h2 mark {
		background-color: #eb1717;
		color: var(--color-text-light);
		text-decoration: underline;
		padding-inline: 4px;
	}

	mark {
		background-color: #000;
		color: var(--color-text-light);
		padding-inline: 2px;
	}

	ol {
		margin: 0;
		margin-top: 2rem;
		padding: 0;
		padding-left: 1rem;
		list-style: none;
	}

	li {
		margin-bottom: 1rem;
		font-size: 1rem;
		font-weight: 700;
	}

	li::before {
		content: '⚽️';
		margin-right: 0.5rem;
	}
</style>
