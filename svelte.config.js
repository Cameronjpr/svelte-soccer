import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@lib': './src/lib'
		},
		adapter: adapter(),
		csp: {
      directives: {
        'script-src': ['self'],
				'connect-src': ['vitals.vercel-insights.com'],
      },
      reportOnly: {
        'script-src': ['self']
      }
    }
	}
};

export default config;
