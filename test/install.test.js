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

test('install.js derives VERSION from package.json', () => {
  const src = readFile('bin/install.js');
  assert.ok(
    /const VERSION = require\('\.\.\/package\.json'\)\.version/.test(src),
    'install.js should single-source VERSION from package.json'
  );
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
  'dp-discuss', 'dp-skip', 'dp-back',
  'dp-prd', 'dp-journey', 'dp-roadmap', 'dp-color', 'dp-storytell'
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

test('expected command list matches actual command files', () => {
  const actual = fs.readdirSync(path.join(ROOT, 'commands'))
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort();
  assert.deepStrictEqual(actual, [...expectedCommands].sort(),
    'commands/ directory and expectedCommands list are out of sync');
});

// ── Template drift ──────────────────────────────────────────────────────────

console.log('\n\x1b[36mTemplate Drift\x1b[0m');

test('config template in dp-start.md matches templates/config.json', () => {
  const canonical = JSON.parse(readFile('templates/config.json'));
  const cmd = readFile('commands/dp-start.md');
  const match = cmd.match(/### config\.json\n\n```json\n([\s\S]*?)\n```/);
  assert.ok(match, 'config.json code block not found in dp-start.md');
  const inline = JSON.parse(match[1]);
  assert.deepStrictEqual(inline, canonical,
    'Inline config template in dp-start.md has drifted from templates/config.json');
});

// ── Installer integration (real install/uninstall in a temp dir) ────────────

console.log('\n\x1b[36mInstaller Integration\x1b[0m');

const os = require('os');
const { execSync } = require('child_process');

test('install --global --auto copies skills, commands, and agents; uninstall removes them', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-test-'));
  try {
    const env = { ...process.env, CLAUDE_CONFIG_DIR: tmpDir };
    const run = (args) => execSync(`node ${path.join(ROOT, 'bin/install.js')} ${args}`, {
      env, encoding: 'utf8', stdio: 'pipe'
    });

    run('--global --auto');

    expectedSkills.forEach(skill => {
      assert.ok(fs.existsSync(path.join(tmpDir, 'skills', skill, 'SKILL.md')),
        `Installed skill missing: ${skill}`);
    });
    expectedCommands.forEach(cmd => {
      assert.ok(fs.existsSync(path.join(tmpDir, 'commands', `${cmd}.md`)),
        `Installed command missing: ${cmd}`);
    });
    expectedAgents.forEach(agent => {
      assert.ok(fs.existsSync(path.join(tmpDir, 'agents', `${agent}.md`)),
        `Installed agent missing: ${agent}`);
    });

    run('--global --uninstall');

    expectedSkills.forEach(skill => {
      assert.ok(!fs.existsSync(path.join(tmpDir, 'skills', skill)),
        `Skill not removed on uninstall: ${skill}`);
    });
    expectedCommands.forEach(cmd => {
      assert.ok(!fs.existsSync(path.join(tmpDir, 'commands', `${cmd}.md`)),
        `Command not removed on uninstall: ${cmd}`);
    });
    expectedAgents.forEach(agent => {
      assert.ok(!fs.existsSync(path.join(tmpDir, 'agents', `${agent}.md`)),
        `Agent not removed on uninstall: ${agent}`);
    });
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
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

// ── Semantic consistency ─────────────────────────────────────────────────────
// These guard the cross-file invariants documented in CONTRIBUTING.md. Structural
// tests above check files exist; these check files AGREE with each other.

console.log('\n\x1b[36mSemantic Consistency\x1b[0m');

const workflowSkills = [
  'dp-discovery', 'dp-prd', 'dp-ux', 'dp-ui', 'dp-color',
  'dp-eng_review', 'dp-journey', 'dp-roadmap', 'dp-storytell', 'dp-research'
];

test('every optional_phases.<key> referenced in a skill exists in the config schema', () => {
  const config = JSON.parse(readFile('templates/config.json'));
  const validKeys = new Set(Object.keys(config.optional_phases));
  const offenders = [];
  workflowSkills.forEach(skill => {
    const content = readFile(`skills/${skill}/SKILL.md`);
    const re = /optional_phases\.([a-z_]+)/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      if (!validKeys.has(m[1])) offenders.push(`${skill}: optional_phases.${m[1]}`);
    }
  });
  assert.strictEqual(offenders.length, 0,
    `Unknown optional_phases keys (would silently lose state):\n  ${offenders.join('\n  ')}\n  Valid: ${[...validKeys].join(', ')}`);
});

function extractRows(content, prefix, cols = 1) {
  // Map "<Prefix><n>" -> first `cols` normalized columns joined, from table rows
  const map = {};
  const re = new RegExp(`\\|\\s*(${prefix}\\d+)\\s*\\|([^\\n]*)`, 'g');
  let m;
  while ((m = re.exec(content)) !== null) {
    // Keep the FIRST occurrence — the canonical definition table precedes any
    // illustrative example tables that reuse the same T/W ids.
    if (m[1] in map) continue;
    const parts = m[2].split('|').map(s => s.trim()).filter(Boolean);
    map[m[1]] = parts.slice(0, cols).join(' | ');
  }
  return map;
}

test('verify T1-T10 truth labels match between dp-verify command and dp-verifier agent', () => {
  const cmd = extractRows(readFile('commands/dp-verify.md'), 'T');
  const agent = extractRows(readFile('agents/dp-verifier.md'), 'T');
  for (let i = 1; i <= 10; i++) {
    const id = `T${i}`;
    assert.ok(cmd[id], `${id} missing from dp-verify.md`);
    assert.ok(agent[id], `${id} missing from dp-verifier.md`);
    assert.strictEqual(cmd[id], agent[id],
      `${id} label drifted:\n  command: "${cmd[id]}"\n  agent:   "${agent[id]}"`);
  }
});

test('wiring W1-W6 From→To matches between dp-verify command and dp-verifier agent', () => {
  const cmd = extractRows(readFile('commands/dp-verify.md'), 'W', 2);
  const agent = extractRows(readFile('agents/dp-verifier.md'), 'W', 2);
  for (let i = 1; i <= 6; i++) {
    const id = `W${i}`;
    assert.ok(cmd[id], `${id} missing from dp-verify.md`);
    assert.ok(agent[id], `${id} missing from dp-verifier.md`);
    assert.strictEqual(cmd[id], agent[id],
      `${id} From→To drifted:\n  command: "${cmd[id]}"\n  agent:   "${agent[id]}"`);
  }
});

test('every workflow skill contains the canonical workflow-mode-detection sentence', () => {
  const marker = 'detect the mode by checking for `.design/config.json`';
  const missing = workflowSkills.filter(skill =>
    !readFile(`skills/${skill}/SKILL.md`).includes(marker));
  assert.strictEqual(missing.length, 0,
    `Skills missing the canonical mode-detection sentence: ${missing.join(', ')}`);
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
