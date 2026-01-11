import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		// Set base path for GitHub Pages (change 'ppl-tracker' to your repo name if different)
		paths: {
			base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true' 
				? '/ppl-tracker' 
				: ''
		}
	}
};

export default config;
