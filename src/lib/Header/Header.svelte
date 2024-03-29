<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import UserCircle from '@lib/icons/UserCircle.svelte';
	import Calendar from '@lib/icons/Calendar.svelte';
	import Hamburger from '@lib/icons/Hamburger.svelte';
	import Cross from '@lib/icons/Cross.svelte';
	import Trophy from '@lib/icons/Trophy.svelte';
	import Lightbulb from '@lib/icons/Lightbulb.svelte';
	import Moon from '@lib/icons/Moon.svelte';
	import Sun from '@lib/icons/Sun.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_ADMIN_EMAIL } from '$env/static/public';
	import Message from '@lib/icons/Message.svelte';
	import Button from '@lib/Button/Button.svelte';

	export let authenticated: boolean;
	export let hasUsername: boolean;

	let menuOpen = false;

	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}

	$: if ($navigating) {
		menuOpen = false;
	}

	$: theme = '';

	let notification = false;

	$: {
		notification = !!authenticated && !hasUsername;
	}

	onMount(() => {
		theme = localStorage.getItem('theme') ?? 'light';
		document.documentElement.setAttribute('data-theme', theme ?? 'light');
	});

	function toggleTheme(): void {
		document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
		localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
		theme = document.documentElement.getAttribute('data-theme') ?? 'light';

		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<nav class="flex justify-between">
	<div id="hamburger-wrapper">
		<button on:click={toggleMenu} aria-label="Toggle menu">
			{#if menuOpen}
				<Cross />
			{:else}
				<Hamburger />
			{/if}
		</button>
		{#if menuOpen}
			<ul class="mobile-menu-list" transition:slide={{ delay: 0, duration: 100, easing: quintOut }}>
				<li>
					<a href="/gameweek"><Calendar />Fixtures</a>
				</li>
				<li>
					<a href="/leaderboard"><Trophy />Leaderboard</a>
				</li>
				<li>
					<a href="/how-to-play"><Lightbulb />How to play</a>
				</li>
				<li>
					<button on:click={toggleTheme}>
						{#if theme === 'dark'}
							<Moon />
						{:else}
							<Sun />
						{/if}
						Toggle theme
					</button>
				</li>
				<li>
					<a href="mailto:gameweekgurus@gmail.com?subject=Help with Gameweek Gurus"
						><Message />Support</a
					>
				</li>
				{#if $page?.data?.session?.user?.email === PUBLIC_ADMIN_EMAIL}
					<li>
						<a href="/admin">Admin</a>
					</li>
				{/if}
				{#if authenticated}
					<li>
						<form method="POST" action="?/signout">
							<Button appearance="link">Sign out</Button>
						</form>
					</li>
				{/if}
			</ul>
			<div
				id="menu-safe-area"
				transition:fade={{ delay: 0, duration: 100 }}
				on:click={toggleMenu}
				on:keypress={toggleMenu}
			/>
		{/if}
	</div>
	<a href={authenticated ? '/gameweek' : '/'}>GameweekGurus</a>
	<div class="icon-controls">
		{#if $page?.data?.session}
			<a class="relative" href="/profile" aria-label="profile"
				><UserCircle />{#if notification}
					<span class="w-2 h-2 bg-red-600 rounded-full absolute left-7 top-0 animate-pulse"></span>
				{/if}</a
			>
		{:else}
			<a href="/login" aria-label="log in"><UserCircle /></a>
		{/if}
	</div>
</nav>

<style>
	nav {
		padding: 0.5rem 0.75rem 0.5rem 0.75rem;
	}

	nav a,
	nav button {
		font-weight: bold;
		font-size: large;
		text-decoration: none;
		display: flex;
		align-items: center;
	}
	nav button:hover {
		cursor: pointer;
	}

	.icon-controls {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	#menu-safe-area {
		display: block;
		position: absolute;
		top: 4rem;
		left: 0;
		height: calc(100vh - 2.5rem);
		width: 100%;
		background: hsla(0, 0%, 0%, 0.8);
	}

	ul {
		list-style: none;
		padding: 0px;
		margin: 0px;
	}

	.mobile-menu-list {
		z-index: 2;
		position: absolute;
		top: 3.5rem;
		right: 0;
		background: var(--color-base);
		padding-block: 1.5rem;
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2rem;
		border-bottom: 0.25rem solid var(--color-accent);
	}

	.mobile-menu-list li {
		padding-inline: 1.5rem;
	}

	.mobile-menu-list button {
		display: flex;
		gap: 1rem;
		align-items: center;
		height: 2rem;
		border: none;
	}

	nav a {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
</style>
