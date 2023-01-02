<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let showMenu = false;

	export let menuOpen: boolean;
	export let toggleMenu: () => void;
</script>

<nav>
	<div id="logo">
		<a href="/">SvelteSoccer</a>
	</div>
	<div id="user-section-desktop">
		{#if $page?.data?.session}
			<a href="/profile">👋 Profile</a>
		{:else}
			<a href="/login">👋 Sign in</a>
		{/if}
		<a href="/leaderboard">Leaderboard</a>
		<a href="/gameweek/{$page?.data?.activeGameweek ?? 1}">Fixtures</a>
	</div>
	<div id="user-section-mobile">
		<button on:click={toggleMenu}>Menu</button>
		{#if menuOpen}
			<ul class="mobile-menu-list" transition:slide={{ delay: 0, duration: 300, easing: quintOut }}>
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
		padding: 0.5rem;
		background: seagreen;
	}

	nav a,
	nav button {
		font-weight: bold;
		font-size: large;
		text-decoration: none;
		color: white;
	}
	nav button:hover {
		background: seagreen;
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

	.mobile-menu-list {
		z-index: 2;
		position: absolute;
		top: 3.5rem;
		right: 0;
		background: seagreen;
		list-style: none;
		padding-block: 1.5rem;
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 2rem;
		border-bottom: 0.25rem solid darkslategray;
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
