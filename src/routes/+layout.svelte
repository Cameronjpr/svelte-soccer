<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData, LayoutServerData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { teams } from '@lib/teams';
	import Header from '@lib/Header/Header.svelte';

	onMount(() => {
		console.log('the component just mounted');
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	export let data: LayoutData;
</script>

<Header />

<main>
	<slot />
	{#if data?.debugMode}
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
		margin-top: 20px;
	}
</style>
