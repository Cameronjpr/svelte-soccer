<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import Header from '@lib/Header/Header.svelte';
	import Footer from '@lib/Footer/Footer.svelte';

	import { browser, dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { Toaster } from 'svelte-french-toast';
	import { webVitals } from '@lib/vitals';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	let hasUsername: boolean;

	$: supabase
		.from('Users')
		.select()
		.eq('auth_user', session?.user.id ?? '')
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

		return subscription.unsubscribe();
	});

	const authenticated = !!data.session;

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
	<title>Gameweek Gurus</title>
	<script>
		const theme = localStorage.getItem('theme') ?? 'light';
		document.documentElement.setAttribute('data-theme', theme ?? 'light');
	</script>
</svelte:head>

<Header {hasUsername} {authenticated} />
<Toaster />

<main class="py-2 px-4 max-w-2xl m-auto min-h-screen flex flex-col justify-between">
	<slot />
	<Footer />
</main>
