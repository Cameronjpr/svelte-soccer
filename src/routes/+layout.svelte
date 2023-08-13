<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page, navigating } from '$app/stores';
	import { teams } from '@lib/teams';
	import Header from '@lib/Header/Header.svelte';
	import Footer from '@lib/Footer/Footer.svelte';

	import { browser, dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import dayjs from 'dayjs';
	import toast, { Toaster } from 'svelte-french-toast';
	import { webVitals } from '@lib/vitals';
	import { fade, slide } from 'svelte/transition';

	inject({ mode: dev ? 'development' : 'production' });

	export let data: LayoutData;
	$: ({ supabase, session, streamed } = data);

	let hasUsername: boolean;

	$: supabase
		.from('Users')
		.select()
		.eq('auth_user', session?.user?.id)
		.then(({ data }) => {
			hasUsername = !!data?.[0]?.username;
		});

	onMount(async () => {
		const {
			data: { subscription }
		} = await supabase.auth.onAuthStateChange((event, _session) => {
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

	$: {
		if (authenticated) {
			toast.success(`You’re signed in`);
		}
	}

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<svelte:head>
	<meta />
	<title>GameweekGurus</title>
	<script>
		const theme = localStorage.getItem('theme') ?? 'light';
		document.documentElement.setAttribute('data-theme', theme ?? 'light');
	</script>
</svelte:head>

<Header {hasUsername} {authenticated} {menuOpen} {toggleMenu} />
<Toaster />

{#await streamed then resolved}
	<main class="px-4 max-w-2xl m-auto">
		<slot />
	</main>
	{#if debugMode}
		<footer>
			<span>Debugging info</span>
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

	<Footer />
{/await}
