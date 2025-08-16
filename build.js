#!/usr/bin/env node

// Simple build script for Vercel deployment
import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

console.log('Building for Vercel deployment...');

try {
  // Run Vite build
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Update package.json to include vercel-build script
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['vercel-build'] = 'node build.js && npx vite build';
  
  writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}