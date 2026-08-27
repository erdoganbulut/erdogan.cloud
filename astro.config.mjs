// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://erdogan.cloud',
	integrations: [react(), mdx(), sitemap()],
	// Blog covers are trusted local SVGs rasterized for social previews.
	image: { dangerouslyProcessSVG: true },
	i18n: {
		locales: ['en', 'tr'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
