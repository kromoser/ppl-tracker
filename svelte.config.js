import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', // Enable SPA mode - all routes fallback to index.html
			precompress: false,
			strict: false // Allow dynamic routes (they're handled client-side)
		}),
		// Set base path for GitHub Pages (change 'ppl-tracker' to your repo name if different)
		paths: {
			base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true' 
				? '/ppl-tracker' 
				: ''
		},
		// Handle 404 errors and unseen routes during prerender
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for favicon and other common missing files
				if (path.includes('favicon') || path.includes('robots.txt') || path.includes('.ico') || path.includes('.png')) {
					console.warn(`Ignoring 404 for: ${path}`);
					return;
				}
				// For other errors, throw to fail the build
				throw new Error(`${path} ${message}`);
			},
			// Handle dynamic routes that can't be prerendered (they're handled client-side in SPA mode)
			handleUnseenRoutes: (route) => {
				// Ignore all unseen routes - they'll be handled client-side with fallback in SPA mode
				const path = route?.path || route?.route || '';
				if (path && (path.includes('[') || path.includes(']'))) {
					console.warn(`Ignoring unseen dynamic route: ${path}`);
					return;
				}
				// For all other unseen routes, just ignore them (SPA mode handles them)
				console.warn(`Ignoring unseen route: ${path || JSON.stringify(route)}`);
				return;
			}
		}
	}
};

export default config;
