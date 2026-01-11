#!/usr/bin/env node
/**
 * Fix GitHub Pages routing for SPA
 * GitHub Pages needs a 404.html that redirects to index.html for client-side routing
 */

import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

const buildDir = join(process.cwd(), 'build');
const indexPath = join(buildDir, 'index.html');
const notFoundPath = join(buildDir, '404.html');

console.log('Checking build directory...');
console.log('Current working directory:', process.cwd());
console.log('Build directory path:', buildDir);

if (!existsSync(buildDir)) {
	console.error('ERROR: Build directory does not exist!');
	console.error('Expected path:', buildDir);
	process.exit(1);
}

if (!existsSync(indexPath)) {
	console.error('ERROR: index.html does not exist in build directory!');
	console.error('Expected path:', indexPath);
	console.log('Files in build directory:');
	try {
		const files = readdirSync(buildDir);
		console.log('Files found:', files.join(', '));
	} catch (e) {
		console.error('Could not list build directory:', e?.message || e);
	}
	process.exit(1);
}

console.log('✓ Found index.html');

// Read index.html
const indexContent = readFileSync(indexPath, 'utf-8');

// Create 404.html with the same content
// GitHub Pages will serve this for 404s, allowing client-side routing to work
writeFileSync(notFoundPath, indexContent, 'utf-8');

// Verify it was created
if (existsSync(notFoundPath)) {
	const stats = statSync(notFoundPath);
	console.log('✓ Created 404.html for GitHub Pages SPA routing');
	console.log(`  File size: ${stats.size} bytes`);
	console.log(`  Path: ${notFoundPath}`);
} else {
	console.error('ERROR: Failed to create 404.html!');
	process.exit(1);
}
