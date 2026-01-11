// Enable prerendering for static adapter
// Since we use fallback: 'index.html', this allows the app to work as an SPA
export const prerender = true;
export const ssr = false; // Disable SSR since all data is client-side (IndexedDB)
