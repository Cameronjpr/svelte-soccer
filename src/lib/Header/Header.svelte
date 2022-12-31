<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let showMenu = false;

	function handleMenuClick() {
		showMenu = !showMenu;
	}
</script>

<nav>
	<div>
		<a href="/">Home</a>
	</div>
	<div id="user-section-desktop">
		{#if $page?.data?.session}
			<a href="/profile">👋 Profile</a>
		{:else}
			<a href="/login">👋 Sign in</a>
		{/if}
		<a href="/leaderboard">🏆 Leaderboard</a>
		<a href="/gameweek/{$page?.data?.activeGameweek ?? 1}">🗓 Fixtures</a>
	</div>
	<div id="user-section-mobile">
		<button on:click={handleMenuClick}>Menu</button>
		{#if showMenu}
			<ul class="mobile-menu-list" transition:slide={{ delay: 0, duration: 300, easing: quintOut }}>
				{#if $page?.data?.session}
					<li>
						<a href="/profile">👋 Profile</a>
					</li>
				{:else}
					<li>
						<a href="/login">👋 Sign in</a>
					</li>
				{/if}
				<li>
					<a href="/leaderboard">🏆 Leaderboard</a>
				</li>
				<li>
					<a href="/gameweek/{$page?.data?.activeGameweek ?? 1}">🗓 Fixtures</a>
				</li>
			</ul>
			<div
				id="menu-safe-area"
				class={showMenu ? '' : 'hidden'}
				on:click={handleMenuClick}
				on:keypress={handleMenuClick}
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
		background: darkslategray;
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: 2rem;
		padding: 0.5rem;
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
