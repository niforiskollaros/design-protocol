#!/usr/bin/env node

/**
 * DP Installer Test Suite
 *
 * Zero dependencies — uses Node.js built-in assert.
 * Compatible with Node 14+.
 *
 * Run: npm test
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ─── Test runner ────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } catch (err) {
    failed++;
    failures.push({ name, error: err.message });
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    ${err.message}`);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function readFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim();
  });
  return fm;
}

// ─── Tests ──────────────────────────────────────────────────────────────────

console.log('\n\x1b[1mDP Test Suite\x1b[0m\n');

// ── Version sync ────────────────────────────────────────────────────────────

console.log('\x1b[36mVersion Sync\x1b[0m');

test('package.json and install.js versions match', () => {
  const pkg = JSON.parse(readFile('package.json'));
  const src = readFile('bin/install.js');
  const match = src.match(/const VERSION = '([^']+)'/);
  assert.ok(match, 'VERSION constant not found in install.js');
  assert.strictEqual(pkg.version, match[1]);
});

test('version follows semver format', () => {
  const pkg = JSON.parse(readFile('package.json'));
  assert.ok(/^\d+\.\d+\.\d+$/.test(pkg.version), `"${pkg.version}" is not valid semver`);
});

// ── Source files ─────────────────────────────────────────────────────────────

console.log('\n\x1b[36mSource Files\x1b[0m');

const expectedSkills = ['dp-discovery', 'dp-prd', 'dp-journey', 'dp-roadmap', 'dp-ux', 'dp-color', 'dp-ui', 'dp-eng_review', 'dp-research', 'dp-storytell'];
const expectedCommands = [
  'dp-start', 'dp-progress', 'dp-execute', 'dp-verify',
  'dp-discuss', 'dp-skip', 'dp-back'
];
const expectedAgents = ['dp-researcher', 'dp-verifier'];
const expectedTemplates = ['config.json', 'state.md', 'project.md', 'requirements.md', 'roadmap.md', 'context.md'];

expectedSkills.forEach(skill => {
  test(`skill "${skill}" has SKILL.md`, () => {
    assert.ok(fileExists(`skills/${skill}/SKILL.md`), `skills/${skill}/SKILL.md not found`);
  });
});

expectedCommands.forEach(cmd => {
  test(`command "${cmd}" exists`, () => {
    assert.ok(fileExists(`commands/${cmd}.md`), `commands/${cmd}.md not found`);
  });
});

expectedAgents.forEach(agent => {
  test(`agent "${agent}" exists`, () => {
    assert.ok(fileExists(`agents/${agent}.md`), `agents/${agent}.md not found`);
  });
});

expectedTemplates.forEach(tpl => {
  test(`template "${tpl}" exists`, () => {
    assert.ok(fileExists(`templates/${tpl}`), `templates/${tpl} not found`);
  });
});

// ── Frontmatter ─────────────────────────────────────────────────────────────

console.log('\n\x1b[36mSkill Frontmatter\x1b[0m');

expectedSkills.forEach(skill => {
  test(`skill "${skill}" has valid frontmatter with name and description`, () => {
    const content = readFile(`skills/${skill}/SKILL.md`);
    const fm = parseFrontmatter(content);
    assert.ok(fm, `No frontmatter found in skills/${skill}/SKILL.md`);
    assert.ok(fm.name, 'Missing "name" in frontmatter');
    assert.ok(fm.description, 'Missing "description" in frontmatter');
  });
});

console.log('\n\x1b[36mCommand Frontmatter\x1b[0m');

expectedCommands.forEach(cmd => {
  test(`command "${cmd}" has valid frontmatter with name and description`, () => {
    const content = readFile(`commands/${cmd}.md`);
    const fm = parseFrontmatter(content);
    assert.ok(fm, `No frontmatter found in commands/${cmd}.md`);
    assert.ok(fm.name, 'Missing "name" in frontmatter');
    assert.ok(fm.description, 'Missing "description" in frontmatter');
  });
});

// ── Config template ─────────────────────────────────────────────────────────

console.log('\n\x1b[36mConfig Template\x1b[0m');

test('config.json template is valid JSON', () => {
  const content = readFile('templates/config.json');
  const config = JSON.parse(content);
  assert.ok(config);
});

test('config.json has required top-level keys', () => {
  const config = JSON.parse(readFile('templates/config.json'));
  const required = ['version', 'workflow', 'settings', 'phases'];
  required.forEach(key => {
    assert.ok(key in config, `Missing key: "${key}"`);
  });
});

test('config.json workflow has required fields', () => {
  const config = JSON.parse(readFile('templates/config.json'));
  const wf = config.workflow;
  assert.ok('current_phase' in wf, 'Missing workflow.current_phase');
  assert.ok(Array.isArray(wf.phases_completed), 'workflow.phases_completed should be an array');
  assert.ok('workflow_status' in wf, 'Missing workflow.workflow_status');
  assert.ok('executions' in wf, 'Missing workflow.executions');
});

test('config.json phases has all four phases', () => {
  const config = JSON.parse(readFile('templates/config.json'));
  const phases = ['discovery', 'ux', 'ui', 'review'];
  phases.forEach(phase => {
    assert.ok(phase in config.phases, `Missing phase: "${phase}"`);
    assert.ok('enabled' in config.phases[phase], `Phase "${phase}" missing "enabled" field`);
  });
});

// ── Installer internals ─────────────────────────────────────────────────────

console.log('\n\x1b[36mInstaller Logic\x1b[0m');

test('installer uninstall list matches actual skill directories', () => {
  const src = readFile('bin/install.js');
  const match = src.match(/const skillNames = \[([^\]]+)\]/);
  assert.ok(match, 'skillNames array not found in install.js');

  const namesInCode = match[1].match(/'([^']+)'/g).map(s => s.replace(/'/g, ''));
  const actualDirs = fs.readdirSync(path.join(ROOT, 'skills')).filter(f =>
    fs.statSync(path.join(ROOT, 'skills', f)).isDirectory()
  );

  actualDirs.forEach(dir => {
    assert.ok(namesInCode.includes(dir), `Skill dir "${dir}" missing from uninstall list`);
  });
  namesInCode.forEach(name => {
    assert.ok(actualDirs.includes(name), `Uninstall list has "${name}" but directory doesn't exist`);
  });
});

test('installer has symlink protection', () => {
  const src = readFile('bin/install.js');
  assert.ok(src.includes('lstatSync'), 'Missing lstatSync — no symlink detection');
  assert.ok(src.includes('isSymbolicLink'), 'Missing isSymbolicLink check');
});

test('installer has depth protection', () => {
  const src = readFile('bin/install.js');
  assert.ok(src.includes('MAX_COPY_DEPTH'), 'Missing MAX_COPY_DEPTH constant');
});

test('installer skips .git and .DS_Store', () => {
  const src = readFile('bin/install.js');
  assert.ok(src.includes('.git'), 'Missing .git in skip list');
  assert.ok(src.includes('.DS_Store'), 'Missing .DS_Store in skip list');
});

// ── No hardcoded paths ──────────────────────────────────────────────────────

console.log('\n\x1b[36mNo Hardcoded Paths\x1b[0m');

test('no absolute user paths in commands', () => {
  const cmdDir = path.join(ROOT, 'commands');
  const files = fs.readdirSync(cmdDir).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const content = fs.readFileSync(path.join(cmdDir, file), 'utf8');
    assert.ok(!/\/Users\/[a-zA-Z]/.test(content), `Hardcoded user path found in commands/${file}`);
  });
});

test('no absolute user paths in skills', () => {
  const skillsDir = path.join(ROOT, 'skills');
  const skills = fs.readdirSync(skillsDir).filter(f =>
    fs.statSync(path.join(skillsDir, f)).isDirectory()
  );
  skills.forEach(skill => {
    const skillFile = path.join(skillsDir, skill, 'SKILL.md');
    if (fs.existsSync(skillFile)) {
      const content = fs.readFileSync(skillFile, 'utf8');
      assert.ok(!/\/Users\/[a-zA-Z]/.test(content), `Hardcoded user path found in skills/${skill}/SKILL.md`);
    }
  });
});

// ── Package.json ────────────────────────────────────────────────────────────

console.log('\n\x1b[36mPackage Configuration\x1b[0m');

test('package.json has no postinstall script', () => {
  const pkg = JSON.parse(readFile('package.json'));
  assert.ok(!pkg.scripts.postinstall, 'postinstall should be removed — it surprises users in CI');
});

test('package.json files array includes all directories', () => {
  const pkg = JSON.parse(readFile('package.json'));
  const required = ['bin/', 'skills/', 'commands/', 'agents/', 'templates/'];
  required.forEach(dir => {
    assert.ok(pkg.files.includes(dir), `Missing "${dir}" in files array`);
  });
});

test('package.json has prepublishOnly guard', () => {
  const pkg = JSON.parse(readFile('package.json'));
  assert.ok(pkg.scripts.prepublishOnly, 'Missing prepublishOnly script');
  assert.ok(pkg.scripts.prepublishOnly.includes('verify'), 'prepublishOnly should run verify');
});

// ─── Summary ────────────────────────────────────────────────────────────────

console.log(`\n\x1b[1m${'─'.repeat(60)}\x1b[0m`);
if (failed === 0) {
  console.log(`\x1b[32m\x1b[1m  All ${passed} tests passed.\x1b[0m\n`);
} else {
  console.log(`\x1b[31m\x1b[1m  ${failed} of ${passed + failed} tests failed.\x1b[0m\n`);
  failures.forEach(f => {
    console.log(`  \x1b[31m✗\x1b[0m ${f.name}: ${f.error}`);
  });
  console.log('');
  process.exit(1);
}
