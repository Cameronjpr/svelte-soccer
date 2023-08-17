import { render } from 'svelte-email';
import Reminder from '$lib/emails/reminder.svelte';
import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';

export async function GET() {
	const html = await render({
		template: Reminder,
		props: {
			firstName: 'John'
		}
	});

	return new Response(html);
}
// transporter.sendMail(options);