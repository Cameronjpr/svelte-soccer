<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData, LayoutServerData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { page, navigating } from '$app/stores';
	import { teams } from '@lib/teams';
	import Header from '@lib/Header/Header.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
			invalidate('user');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	let menuOpen = false;
	let debugMode = false;

	function toggleMenu(): void {
		console.log(menuOpen);
		menuOpen = !menuOpen;
	}

	$: if ($navigating) {
		menuOpen = false;
	}

	export let data: LayoutData;
</script>

<Header {menuOpen} {toggleMenu} />

<main>
	<slot />
	{#if debugMode}
		<footer>
			<span>Debugging info:</span>
			<ul>
				<li>Session: {$page?.data?.session}</li>
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

<style>
	nav {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		background: seagreen;
	}

	nav a {
		font-weight: bold;
		font-size: large;
		text-decoration: none;
		color: white;
	}

	#user-section {
		display: flex;
		gap: 1.5rem;
	}

	main {
		margin: auto;
		padding: 0.5rem;
		max-width: 768px;
	}

	footer {
		margin-top: 5rem;
	}
</style>
