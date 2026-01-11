#!/usr/bin/env node
/**
 * Fix GitHub Pages routing for SPA
 * GitHub Pages needs a 404.html that redirects to index.html for client-side routing
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const buildDir = join(process.cwd(), 'build');
const indexPath = join(buildDir, 'index.html');
const notFoundPath = join(buildDir, '404.html');

if (!existsSync(buildDir)) {
	console.error('Build directory does not exist!');
	process.exit(1);
}

if (!existsSync(indexPath)) {
	console.error('index.html does not exist in build directory!');
	process.exit(1);
}

// Read index.html
const indexContent = readFileSync(indexPath, 'utf-8');

// Create 404.html with the same content
// GitHub Pages will serve this for 404s, allowing client-side routing to work
writeFileSync(notFoundPath, indexContent, 'utf-8');

console.log('✓ Created 404.html for GitHub Pages SPA routing');
