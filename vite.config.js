import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';

import Icons from 'unplugin-icons/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "gameweek-gurus",
            project: "javascript-sveltekit"
        },
    }), sveltekit(), Icons({
        compiler: 'svelte'
    })],
    define: {
    'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
  }
};

export default config;