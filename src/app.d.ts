// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Supabase {
			Database: import('./DatabaseDefinitions').Database;
			SchemaName: 'public';
		}

		interface Locals {
			session: import('@supabase/auth-helpers-sveltekit').SupabaseSession;
		}

		interface PageData {
			session: import('@supabase/auth-helpers-sveltekit').SupabaseSession;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
