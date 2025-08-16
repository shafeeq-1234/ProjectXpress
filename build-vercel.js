#!/usr/bin/env node
// Build script specifically for Vercel deployment
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

console.log('🚀 Building Project Xpress for Vercel...');

try {
  // 1. Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (existsSync('dist')) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }

  // 2. Build frontend
  console.log('🏗️ Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });

  // 3. Create package.json for Vercel build
  console.log('📦 Creating Vercel build configuration...');
  const originalPackage = JSON.parse(readFileSync('package.json', 'utf8'));
  
  const vercelPackage = {
    ...originalPackage,
    scripts: {
      ...originalPackage.scripts,
      'vercel-build': 'node build-vercel.js'
    }
  };

  writeFileSync('package.json', JSON.stringify(vercelPackage, null, 2));

  console.log('✅ Vercel build completed successfully!');
  console.log('📂 Frontend built to: dist/public');
  console.log('🔧 API functions ready in: api/');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}