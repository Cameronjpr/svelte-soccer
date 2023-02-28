<script lang="ts">
	import { page } from '$app/stores';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import UserCircle from '@lib/icons/UserCircle.svelte';
	import Calendar from '@lib/icons/Calendar.svelte';
	import Hamburger from '@lib/icons/Hamburger.svelte';
	import Cross from '@lib/icons/Cross.svelte';
	import Trophy from '@lib/icons/Trophy.svelte';
	import Lightbulb from '@lib/icons/Lightbulb.svelte';

	let showMenu = false;

	export let menuOpen: boolean;
	const activeGameweek = $page?.data?.activeGameweek || 1;
	export let toggleMenu: () => void;
</script>

<nav>
	<div id="user-section-mobile">
		{#if menuOpen}
			<button on:click={toggleMenu}><Cross /></button>
		{:else}
			<button on:click={toggleMenu}><Hamburger /></button>
		{/if}
		{#if menuOpen}
			<ul class="mobile-menu-list" transition:slide={{ delay: 0, duration: 100, easing: quintOut }}>
				<li>
					<a href="/gameweek/{activeGameweek}"><Calendar />Fixtures</a>
				</li>
				<li>
					<a href="/leaderboard"><Trophy />Leaderboard</a>
				</li>
				<li>
					<a href="/how-to-play"><Lightbulb />How to play</a>
				</li>
			</ul>
			<div
				id="menu-safe-area"
				transition:fade={{ delay: 0, duration: 100 }}
				on:click={toggleMenu}
				on:keypress={toggleMenu}
			/>
		{/if}
	</div>
	<a href="/">PremPredictor</a>
	{#if $page?.data?.session}
		<a href="/profile" aria-label="profile"><UserCircle /></a>
	{:else}
		<a href="/login" aria-label="log in"><UserCircle /></a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem 0.5rem 1rem;
		background: var(--color-secondary);
	}

	nav a,
	nav button {
		color: var(--color-text);
		background: none;
		font-weight: bold;
		font-size: large;
		text-decoration: none;
		padding: 0px;
	}
	nav button:hover {
		cursor: pointer;
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
		background: var(--color-secondary);
		padding-block: 1.5rem;
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 2rem;
		border-bottom: 0.25rem solid var(--color-accent);
	}

	nav a {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.mobile-menu-list a {
		padding-inline: 1.5rem;
	}
</style>
