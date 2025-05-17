const fs = require('fs');
const path = require('path');

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.error('Error: node_modules directory not found. Please run "pnpm install" first.');
  process.exit(1);
}

// Check if .next exists
const nextPath = path.join(process.cwd(), '.next');
if (fs.existsSync(nextPath)) {
  console.log('Cleaning .next directory...');
  fs.rmSync(nextPath, { recursive: true, force: true });
}

console.log('Dependencies check passed.');
process.exit(0); 