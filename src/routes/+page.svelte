<script lang="ts">
	import type { PageData } from './$types';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let data: PageData;
	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<h1>Welcome to <mark in:fade={{ delay: 0, duration: 400 }}>GameweekGurus</mark> 👋</h1>

	<h2>
		the <mark in:fade={{ delay: 800, duration: 400 }}>live</mark> football predictor game
	</h2>

	<ol>
		<li>Make your predictions for the upcoming gameweek</li>
		<li>Score points for correct predictions</li>
		<li>Climb the leaderboard and win!</li>
	</ol>

	<section class="w-full flex flex-col justify-center">
		<form method="POST">
			<button
				class="w-full h-auto bg-emerald-500 p-3 rounded-lg mt-8 text-center text-black font-semibold text-lg shadow-md"
				formaction="?/login&provider=google">Join with Google</button
			>
		</form>
	</section>
{/if}

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
