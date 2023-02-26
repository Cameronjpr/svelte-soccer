<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import UserCircle from '@lib/icons/UserCircle.svelte';
	import Calendar from '@lib/icons/Calendar.svelte';
	import Hamburger from '@lib/icons/Hamburger.svelte';
	import Cross from '@lib/icons/Cross.svelte';
	import Trophy from '@lib/icons/Trophy.svelte';

	let showMenu = false;

	export let menuOpen: boolean;
	const activeGameweek = $page?.data?.activeGameweek || 1;
	export let toggleMenu: () => void;
</script>

<nav>
	<a href="/">SvelteSoccer</a>
	<ul class="desktop-menu-list">
		<div id="user-section-desktop">
			{#if $page?.data?.session}
				<li>
					<a href="/profile"><UserCircle />Profile</a>
				</li>
			{:else}
				<li>
					<a href="/login"><UserCircle />Sign in</a>
				</li>
			{/if}
			<li>
				<a href="/gameweek/{activeGameweek}"><Calendar />Fixtures</a>
			</li>
			<li>
				<a href="/leaderboard"><Trophy />Leaderboard</a>
			</li>
		</div>
	</ul>
	<div id="user-section-mobile">
		{#if menuOpen}
			<button on:click={toggleMenu}><Cross /></button>
		{:else}
			<button on:click={toggleMenu}><Hamburger /></button>
		{/if}
		{#if menuOpen}
			<ul class="mobile-menu-list" transition:slide={{ delay: 0, duration: 100, easing: quintOut }}>
				{#if $page?.data?.session}
					<li>
						<a href="/profile">Profile</a>
					</li>
				{:else}
					<li>
						<a href="/login">Sign in</a>
					</li>
				{/if}
				<li>
					<a href="/leaderboard">Leaderboard</a>
				</li>
				<li>
					<a href="/gameweek/{$page?.data?.activeGameweek ?? 1}">Fixtures</a>
				</li>
			</ul>
			<div
				id="menu-safe-area"
				class={menuOpen ? '' : 'hidden'}
				on:click={toggleMenu}
				on:keypress={toggleMenu}
			/>
		{/if}
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		color: var(--color-text);
		background: var(--color-secondary);
	}

	nav a,
	nav button {
		color: var(--color-text);
		background: none;
		font-weight: bold;
		font-size: large;
		text-decoration: none;
	}
	nav button:hover {
		cursor: pointer;
	}

	#logo {
		padding-inline: 1rem;
	}

	#user-section-desktop {
		display: flex;
		gap: 1.5rem;
	}

	#user-section-mobile {
		display: none;
	}

	#menu-safe-area {
		display: block;
		position: absolute;
		top: 3.5rem;
		left: 0;
		height: calc(100vh - 3.5rem);
		width: 100%;
	}

	ul {
		list-style: none;
		padding: 0px;
		margin: 0px;
	}

	.desktop-menu-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 0.5rem;
		color: var(--color-text);
		background: var(--color-secondary);
	}
	.desktop-menu-list li {
	}
	.desktop-menu-list a {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 2.75rem;
		width: 4rem;
		font-size: 0.75rem;
		line-height: 0.75rem;
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
		border-bottom: 0.25rem solid var(--color-primary);
	}

	.mobile-menu-list li {
		padding-inline: 1.5rem;
	}

	@media (max-width: 600px) {
		#user-section-desktop {
			display: none;
		}

		#user-section-mobile {
			display: flex;
		}
	}
</style>
