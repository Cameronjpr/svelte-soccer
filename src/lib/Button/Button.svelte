<script lang="ts">
	export let appearance: 'primary' | 'secondary' = 'primary';
	export let formaction;
</script>

<button {formaction} class={appearance}>
	<slot />
</button>

<style>
	button {
		height: 3rem;
		padding-inline: 1.5rem;
		background: var(--color-primary);
		color: var(--color-text-light);
		font-size: large;
		border: 2px solid transparent;
		box-sizing: border-box;
		cursor: pointer;
		border-radius: 0.75rem;
	}

	button:hover {
		background: var(--color-secondary);
	}
</style>
