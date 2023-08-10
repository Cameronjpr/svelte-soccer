<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page, navigating } from '$app/stores';
	import { teams } from '@lib/teams';
	import Header from '@lib/Header/Header.svelte';
	import Footer from '@lib/Footer/Footer.svelte';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import dayjs from 'dayjs';

	inject({ mode: dev ? 'development' : 'production' });

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	let menuOpen = false;
	let debugMode = false;

	const authenticated = !!data.session;

	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}

	$: if ($navigating) {
		menuOpen = false;
	}

	const startTime = dayjs('2023-08-11 21:00:00');
	const timeUntilStart = startTime.diff(dayjs(), 'hour');
</script>

<svelte:head>
	<meta />
	<title>GameweekGurus</title>
	<script>
		const theme = localStorage.getItem('theme') ?? 'light';
		document.documentElement.setAttribute('data-theme', theme ?? 'light');
	</script>
</svelte:head>

{#if timeUntilStart > 0 && !authenticated}
	<div class="bg-black text-white p-2 text-center">
		<span
			>The new season kicks off in <strong
				>{timeUntilStart} hour{timeUntilStart > 1 ? 's' : ''}</strong
			>. <a class="text-white underline" href="/login">Join now!</a></span
		>
	</div>
{/if}

<Header {authenticated} {menuOpen} {toggleMenu} />

<main class="p-2">
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

	#banner a {
		color: white;
	}
</style>
