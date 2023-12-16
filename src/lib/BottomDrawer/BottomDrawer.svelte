<script>
	import Button from '@lib/Button/Button.svelte';
	import { fade, fly } from 'svelte/transition';
	export let isOpen = false;
	export let toggleDrawer = () => {};
</script>

{#if isOpen}
	<section>
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
			<Button appearance="secondary" on:click={toggleDrawer}>Close</Button>
		</div>
	</section>
{/if}

<style>
	.bottom-drawer-safe-area {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.bottom-drawer-content {
		display: flex;
		flex-direction: column;
		align-content: center;
		margin: 0 auto;
		max-width: 560px;
		border-radius: 0.5rem 0.5rem 0 0;
		padding: 1rem;
		gap: 1rem;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		background: var(--color-base);
	}

	section {
		height: 100%;
	}
</style>
