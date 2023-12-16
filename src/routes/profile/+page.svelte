<script lang="ts">
	import { enhance } from '$app/forms';
	import BottomDrawer from '@lib/BottomDrawer/BottomDrawer.svelte';
	import type { ActionData, PageServerData } from './$types';
	import Button from '@lib/Button/Button.svelte';
	import toast from 'svelte-french-toast';

	export let data: PageServerData;
	export let form: ActionData;

	let drawerOpen = false;

	const toggleDrawer = () => {
		drawerOpen = !drawerOpen;
	};
</script>

<div
	class="flex flex-col gap-8 justify-between align-middle items-stretch content-stretch place-content-stretch place-items-stretch"
>
	{#if data?.user?.username}
		<div>
			<h1>Hey {data?.user?.username}!</h1>
			<Button appearance="link" onClick={toggleDrawer}>Change username</Button>
		</div>
		<BottomDrawer isOpen={drawerOpen} {toggleDrawer}>
			<form method="POST" action="?/updateUsername" use:enhance class="flex flex-col gap-2">
				<label class="flex flex-col gap-1" for="username">
					Username
					<input placeholder={data?.user?.username} class="px-3" type="text" name="username" />
				</label>
				<Button>Update</Button>
			</form>
		</BottomDrawer>
	{:else}
		<section class="flex flex-col justify-stretch gap-4">
			<span>You don't have a <strong>username</strong> set.</span>
			<form method="POST" action="?/updateUsername" use:enhance class="flex flex-col gap-2">
				<label class="flex flex-col gap-1 font-semibold" for="username">
					Username
					<input class="px-3" type="text" name="username" />
				</label>
				<Button>Save</Button>
			</form>
			{#if form?.error}
				<span class="error">{form?.error}</span>
			{/if}
		</section>
	{/if}

	<section class="flex flex-row gap-4"></section>

	<details class="flex flex-col gap-4">
		<summary> Communication preferences </summary>
		<form
			class="flex items-start flex-col gap-2 rounded-xl"
			method="POST"
			action="?/optOut"
			use:enhance={({ action }) => {
				return async ({ result }) => {
					if (result?.type === 'success') {
						toast.success('Contact preferences updated');
					} else {
						toast.error('Something went wrong updating your contact preferences');
					}
				};
			}}
		>
			<p class="text-sm text-gray-600 dark:text-gray-500 italic">
				We may periodically send game updates and announcements to your email address. If you do not
				wish to receive these emails, please click the button below.
			</p>
			<Button appearance="link">Opt out of emails</Button>
		</form>
	</details>
	<details class="flex flex-col gap-4">
		<summary> Delete account </summary>

		<form method="POST" action="?/deleteAccount" class="pt-2">
			<Button appearance="danger">Delete account</Button>
		</form>
	</details>
</div>
