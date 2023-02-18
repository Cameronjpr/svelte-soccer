<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
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

	export let data: LayoutData;
	let menuOpen = false;
	let debugMode = true;

	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}

	$: if ($navigating) {
		menuOpen = false;
	}
</script>

<Header {menuOpen} {toggleMenu} />

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

<style>
	main {
		margin: auto;
		padding: 0.5rem;
		max-width: 768px;
	}

	footer {
		margin-top: 5rem;
	}
</style>
