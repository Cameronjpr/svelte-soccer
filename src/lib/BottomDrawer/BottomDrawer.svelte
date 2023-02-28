<script>
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	export let isOpen = false;
	export let toggleDrawer = () => {};
</script>

<section class={isOpen ? 'open' : 'closed'}>
	{#if isOpen}
		<div
			class="bottom-drawer-safe-area"
			on:click={toggleDrawer}
			transition:fade={{ delay: 0, duration: 300 }}
		/>
		<div
			class="bottom-drawer-content"
			transition:fly={{ delay: 0, duration: 300, x: 0, y: 500, opacity: 0.5 }}
		>
			<slot />
			<button class="appearance-tertiary" on:click={toggleDrawer}>Cancel</button>
		</div>
	{/if}
</section>

<style>
	.bottom-drawer-safe-area {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.bottom-drawer-content {
		height: auto;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		max-width: 768px;
		border-radius: 0.5rem 0.5rem 0 0;
		padding: 1rem;
		gap: 1rem;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.open .bottom-drawer-content {
		transform: translateY(0);
	}

	section {
		height: 100%;
	}
</style>
