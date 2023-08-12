<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';
	import Button from '@lib/Button/Button.svelte';
	import toast from 'svelte-french-toast';

	export let data: PageServerData;
	export let form: ActionData;

	let emailConsent = data?.user?.receives_emails;
</script>

<div
	class="max-w-sm m-auto flex flex-col gap-8 justify-between align-middle items-stretch content-stretch place-content-stretch place-items-stretch"
>
	{#if data?.user?.username}
		<h1>Hello, {data?.user?.username}</h1>
		<form method="POST" action="?/updateUsername" use:enhance class="flex flex-col gap-2">
			<label class="flex flex-col gap-1" for="username">
				Username
				<input placeholder={data?.user?.username} class="px-3" type="text" name="username" />
			</label>
			<Button>Update</Button>
		</form>
	{:else}
		<section class="flex flex-col justify-stretch gap-4 max-w-sm m-auto">
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

	<form
		class="flex flex-col gap-2 p-2 rounded-xl"
		method="POST"
		action="?/optOut"
		use:enhance={({ action }) => {
			return async ({ result, update }) => {
				if (result?.type === 'success') {
					toast.success('Contact preferences updated');
				} else {
					toast.error('Something went wrong updating your contact preferences');
				}
			};
		}}
	>
		<p class="text-sm text-gray-600 italic">
			We may periodically send game updates and announcements to your email address. If you do not
			wish to receive these emails, please uncheck the checkbox below.
		</p>
		<label for="emailConsent" class="flex flex-row gap-2 align-middle items-center font-semibold">
			<input
				bind:checked={emailConsent}
				class="inline w-6 h-6"
				id="emailConsent"
				name="emailConsent"
				type="checkbox"
			/>
			Yes, I would like to receive emails
		</label>
		<Button>Save preferences</Button>
	</form>

	<section class="flex flex-col gap-4">
		<form method="POST" action="?/signout" class="max-w-sm m-auto w-full">
			<Button>Sign out</Button>
		</form>

		<h2><a href="https://www.youtube.com/watch?v=siwpn14IE7E">The Danger Zone</a></h2>
		<form method="POST" action="?/deleteAccount" class="max-w-sm m-auto w-full">
			<Button appearance="danger">Delete account</Button>
		</form>
	</section>
</div>
