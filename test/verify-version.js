#!/usr/bin/env node

/**
 * Verify version is in sync between package.json and bin/install.js.
 * Run before every publish via `npm run verify`.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const installSrc = fs.readFileSync(path.join(root, 'bin/install.js'), 'utf8');

const match = installSrc.match(/const VERSION = '([^']+)'/);
if (!match) {
  console.error('✗ Could not find VERSION constant in bin/install.js');
  process.exit(1);
}

const pkgVersion = pkg.version;
const jsVersion = match[1];

if (pkgVersion !== jsVersion) {
  console.error(`✗ Version mismatch!`);
  console.error(`  package.json:  ${pkgVersion}`);
  console.error(`  bin/install.js: ${jsVersion}`);
  console.error(`\n  Update both files before publishing.`);
  process.exit(1);
}

console.log(`✓ Version in sync: ${pkgVersion}`);
