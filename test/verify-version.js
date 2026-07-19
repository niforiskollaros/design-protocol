#!/usr/bin/env node

/**
 * Verify bin/install.js derives its version from package.json (single source
 * of truth) instead of a hardcoded constant that can drift.
 * Run before every publish via `npm run verify`.
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const installSrc = fs.readFileSync(path.join(root, 'bin/install.js'), 'utf8');

if (!/const VERSION = require\('\.\.\/package\.json'\)\.version/.test(installSrc)) {
  console.error('✗ bin/install.js must derive VERSION from package.json:');
  console.error("  const VERSION = require('../package.json').version;");
  process.exit(1);
}

// Sanity-check: loading the installer's version source resolves to the same value
const resolved = require(path.join(root, 'package.json')).version;
if (resolved !== pkg.version) {
  console.error('✗ Version resolution mismatch — this should be impossible.');
  process.exit(1);
}

console.log(`✓ Version single-sourced from package.json: ${pkg.version}`);
