<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page, navigating } from '$app/stores';
	import { teams } from '@lib/teams';
	import Header from '@lib/Header/Header.svelte';
	import Footer from '@lib/Footer/Footer.svelte';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	export let data: LayoutData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
			invalidate('user');
			invalidate('supabase');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	let menuOpen = false;
	let debugMode = false;

	const authenticated = !!data.session

	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}

	$: if ($navigating) {
		menuOpen = false;
	}
</script>

<svelte:head>
	<meta />
	<title>PremPredictor</title>
	<script>
		const theme = localStorage.getItem('theme') ?? 'light';
		document.documentElement.setAttribute('data-theme', theme ?? 'light');
	</script>
</svelte:head>

<Header {authenticated} {menuOpen} {toggleMenu} />

<main>
	<slot />
	{#if debugMode}
		<footer>
			<span>Debugging info:</span>
			<ul>
				<li>Session: {$page?.data?.session}</li>
				<li>Active gameweek: {data?.activeGameweek}</li>
				{#if $page?.data?.selections}
					<li>
						Selections:
						<ul>
							{#each $page?.data?.selections as selection}
								<li>GW {selection?.gameweek}, {teams[selection?.selection].shortName}</li>
							{/each}
						</ul>
					</li>
				{/if}
			</ul>
		</footer>
	{/if}
</main>
<Footer />

<style>
	main {
		margin: auto;
		padding: 0.5rem;
		max-width: 768px;
		min-height: 75vh;
	}

	footer {
		margin-top: 5rem;
	}
</style>
