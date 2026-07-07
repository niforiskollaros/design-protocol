#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const VERSION = require('../package.json').version;
const PACKAGE_NAME = 'design-protocol';
const PACKAGE_DIR = path.join(__dirname, '..');
let VERBOSE = false;

// ANSI colors
const c = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(msg, color = 'reset') {
  console.log(`${c[color]}${msg}${c.reset}`);
}

function logStep(step, total, msg) {
  console.log(`${c.cyan}[${step}/${total}]${c.reset} ${msg}`);
}

function logSuccess(msg) {
  console.log(`  ${c.green}✓${c.reset} ${msg}`);
}

function logSkip(msg) {
  console.log(`  ${c.yellow}○${c.reset} ${msg}`);
}

function logError(msg) {
  console.log(`  ${c.red}✗${c.reset} ${msg}`);
}

function logVerbose(msg) {
  if (VERBOSE) console.log(`  ${c.dim}  → ${msg}${c.reset}`);
}

function printBanner() {
  console.log(`\n${c.magenta}${c.bright}  DP ${c.reset}${c.cyan}Design Protocol${c.reset} ${c.dim}v${VERSION}${c.reset}`);
  console.log(`${c.dim}  Complete design workflow for Claude Code${c.reset}\n`);
}

function getClaudeDir(location) {
  if (location === 'global') {
    if (process.env.CLAUDE_CONFIG_DIR) return process.env.CLAUDE_CONFIG_DIR;
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      throw new Error('Cannot determine home directory: neither HOME nor USERPROFILE is set.\n  Set CLAUDE_CONFIG_DIR to your Claude config directory and retry.');
    }
    return path.join(homeDir, '.claude');
  }
  return path.join(process.cwd(), '.claude');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    logVerbose(`mkdir ${dir}`);
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      if (err.code === 'EACCES') {
        throw new Error(`Permission denied creating directory: ${dir}\n  Try running with sudo or check folder permissions.`);
      }
      throw new Error(`Failed to create directory: ${dir}\n  ${err.message}`);
    }
  }
}

const MAX_COPY_DEPTH = 10;
const SKIP_ENTRIES = new Set(['.git', '.DS_Store', '.env', 'node_modules', '.next']);

function copyRecursive(src, dest, depth = 0) {
  if (!fs.existsSync(src)) return 0;
  if (depth > MAX_COPY_DEPTH) {
    logError(`Skipping deeply nested path (>${MAX_COPY_DEPTH} levels): ${src}`);
    return 0;
  }

  // Skip symlinks — only copy real files
  const lstats = fs.lstatSync(src);
  if (lstats.isSymbolicLink()) return 0;

  let count = 0;

  if (lstats.isDirectory()) {
    ensureDir(dest);
    const files = fs.readdirSync(src);
    for (const file of files) {
      if (SKIP_ENTRIES.has(file)) continue;
      count += copyRecursive(
        path.join(src, file),
        path.join(dest, file),
        depth + 1
      );
    }
  } else {
    try {
      fs.copyFileSync(src, dest);
      logVerbose(`${path.basename(src)}`);
    } catch (err) {
      if (err.code === 'EACCES') {
        throw new Error(`Permission denied writing file: ${dest}`);
      }
      throw new Error(`Failed to copy ${path.basename(src)} → ${dest}\n  ${err.message}`);
    }
    count = 1;
  }
  return count;
}

function countFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      count += countFiles(itemPath);
    } else {
      count++;
    }
  }
  return count;
}

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function getLatestVersion() {
  try {
    const result = execSync(`npm view ${PACKAGE_NAME} version`, { encoding: 'utf8' });
    return result.trim();
  } catch (err) {
    return null;
  }
}

function compareVersions(v1, v2) {
  // Split off pre-release tags (e.g. "1.0.0-beta.1")
  const [base1, pre1] = v1.split('-');
  const [base2, pre2] = v2.split('-');
  const parts1 = base1.split('.').map(Number);
  const parts2 = base2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  // Same base version: a pre-release sorts before the release
  if (pre1 && !pre2) return -1;
  if (!pre1 && pre2) return 1;
  if (pre1 && pre2) return pre1 < pre2 ? -1 : pre1 > pre2 ? 1 : 0;
  return 0;
}

async function checkForUpdate() {
  log('\nChecking for updates...', 'dim');

  const latest = getLatestVersion();
  if (!latest) {
    logError('Could not check for updates. Are you online?');
    return false;
  }

  const comparison = compareVersions(latest, VERSION);

  if (comparison > 0) {
    log(`\n${c.yellow}Update available!${c.reset} ${VERSION} → ${c.green}${latest}${c.reset}\n`);
    return latest;
  } else if (comparison === 0) {
    log(`\n${c.green}✓${c.reset} You have the latest version (${VERSION})\n`);
    return false;
  } else {
    log(`\n${c.green}✓${c.reset} You have a newer version (${VERSION}) than npm (${latest})\n`);
    return false;
  }
}

async function performUpdate(location) {
  log(`\nUpdating DP...`, 'bright');

  try {
    // Run npx with latest version
    log('Downloading latest version...', 'dim');
    execSync(`npx ${PACKAGE_NAME}@latest --${location} --auto`, {
      stdio: 'inherit',
      encoding: 'utf8'
    });
    return true;
  } catch (err) {
    logError(`Update failed: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const isGlobal = args.includes('--global') || args.includes('-g');
  const isLocal = args.includes('--local') || args.includes('-l');
  const isAuto = args.includes('--auto');
  const isUninstall = args.includes('--uninstall') || args.includes('-u');
  const isUpdate = args.includes('--update') || args.includes('--upgrade');
  const isCheckUpdate = args.includes('--check-update');
  const isHelp = args.includes('--help') || args.includes('-h');
  const showVersion = args.includes('--version') || args.includes('-v');
  VERBOSE = args.includes('--verbose');

  if (showVersion) {
    console.log(`dp v${VERSION}`);
    process.exit(0);
  }

  if (isHelp) {
    console.log(`
${c.bright}DP - Design Protocol v${VERSION}${c.reset}

Usage: npx design-protocol [options]

Options:
  --global, -g     Install to ~/.claude/ (all projects)
  --local, -l      Install to ./.claude/ (current project only)
  --auto           Non-interactive install (default: global)
  --update         Update to the latest version
  --check-update   Check if updates are available
  --uninstall, -u  Remove DP from specified location
  --verbose        Show detailed output for troubleshooting
  --version, -v    Show version number
  --help, -h       Show this help message

Examples:
  npx design-protocol              # Interactive installation
  npx design-protocol --global     # Install globally
  npx design-protocol --local      # Install to current project
  npx design-protocol --update     # Update to latest version
  npx design-protocol -g -u        # Uninstall from global

${c.bright}What Gets Installed:${c.reset}
  ~/.claude/skills/      10 design skills (dp-discovery, dp-prd, dp-journey, dp-roadmap, dp-ux, dp-color, dp-ui, dp-eng_review, dp-research, dp-storytell)
  ~/.claude/commands/    12 workflow commands (dp:start, dp:execute, dp:prd, dp:journey, dp:roadmap, dp:color, dp:storytell, etc.)
  ~/.claude/agents/      2 specialized agents

${c.bright}Workflow:${c.reset}
  /dp:start → /dp:discovery → /dp:ux → /dp:execute → /dp:ui → /dp:execute → /dp:eng_review → /dp:verify
`);
    process.exit(0);
  }

  // Check for updates only
  if (isCheckUpdate) {
    printBanner();
    await checkForUpdate();
    process.exit(0);
  }

  // Update mode
  if (isUpdate) {
    printBanner();
    const latest = await checkForUpdate();
    if (latest) {
      const location = isLocal ? 'local' : 'global';
      const answer = await prompt(`Update to v${latest}? [Y/n]: `);
      if (answer !== 'n' && answer !== 'no') {
        await performUpdate(location);
      } else {
        log('Update cancelled.', 'yellow');
      }
    }
    process.exit(0);
  }

  printBanner();

  // Determine installation location
  let location;
  if (isGlobal || isAuto) {
    location = 'global';
  } else if (isLocal) {
    location = 'local';
  } else {
    log('\nWhere would you like to install DP?\n', 'bright');
    console.log('  1. Global (~/.claude/) - Available in all projects');
    console.log('  2. Local  (./.claude/) - Current project only\n');
    const answer = await prompt('Choose [1/2] (default: 1): ');
    location = answer === '2' ? 'local' : 'global';
  }

  const claudeDir = getClaudeDir(location);
  const skillsDir = path.join(claudeDir, 'skills');
  const commandsDir = path.join(claudeDir, 'commands');
  const agentsDir = path.join(claudeDir, 'agents');

  if (VERBOSE) {
    log('', 'dim');
    log('  Resolved paths:', 'dim');
    log(`    PACKAGE_DIR:     ${PACKAGE_DIR}`, 'dim');
    log(`    claudeDir:       ${claudeDir}`, 'dim');
    log(`    CLAUDE_CONFIG_DIR: ${process.env.CLAUDE_CONFIG_DIR || '(not set)'}`, 'dim');
    log(`    HOME:            ${process.env.HOME || process.env.USERPROFILE}`, 'dim');
    log('', 'dim');
  }

  if (isUninstall) {
    await runUninstall(location, { skillsDir, commandsDir, agentsDir, claudeDir });
  } else {
    await runInstall(location, { skillsDir, commandsDir, agentsDir, claudeDir }, isAuto);
  }
}

// ─── Uninstall ────────────────────────────────────────────────────────────────

async function runUninstall(location, dirs) {
  log(`\nUninstalling from ${location} location...`, 'yellow');
  log(`Target: ${dirs.claudeDir}`, 'dim');

  let removed = 0;

  const skillNames = ['dp-discovery', 'dp-prd', 'dp-journey', 'dp-roadmap', 'dp-ux', 'dp-color', 'dp-ui', 'dp-eng_review', 'dp-research', 'dp-storytell'];
  for (const name of skillNames) {
    const skillPath = path.join(dirs.skillsDir, name);
    if (fs.existsSync(skillPath)) {
      fs.rmSync(skillPath, { recursive: true, force: true });
      logSuccess(`Removed skill: ${name}`);
      removed++;
    }
  }

  const commandFiles = fs.readdirSync(path.join(PACKAGE_DIR, 'commands')).filter(f => f.endsWith('.md'));
  for (const file of commandFiles) {
    const cmdPath = path.join(dirs.commandsDir, file);
    if (fs.existsSync(cmdPath)) {
      fs.unlinkSync(cmdPath);
      logSuccess(`Removed command: ${file}`);
      removed++;
    }
  }

  const agentFiles = fs.readdirSync(path.join(PACKAGE_DIR, 'agents')).filter(f => f.endsWith('.md'));
  for (const file of agentFiles) {
    const agentPath = path.join(dirs.agentsDir, file);
    if (fs.existsSync(agentPath)) {
      fs.unlinkSync(agentPath);
      logSuccess(`Removed agent: ${file}`);
      removed++;
    }
  }

  if (removed > 0) {
    log(`\n${c.green}DP uninstalled successfully!${c.reset}\n`);
  } else {
    log(`\n${c.yellow}No DP installation found at ${dirs.claudeDir}${c.reset}\n`);
  }
}

// ─── Install ──────────────────────────────────────────────────────────────────

async function runInstall(location, dirs, isAuto) {
  const totalSteps = 4;
  log(`\nInstalling to ${location} location...`, 'bright');
  log(`Target: ${dirs.claudeDir}\n`, 'dim');

  // Step 1: Skills
  logStep(1, totalSteps, 'Installing skills...');
  const srcSkills = path.join(PACKAGE_DIR, 'skills');
  const skillDirs = fs.readdirSync(srcSkills).filter(f =>
    fs.statSync(path.join(srcSkills, f)).isDirectory()
  );

  for (const skill of skillDirs) {
    const src = path.join(srcSkills, skill);
    const dest = path.join(dirs.skillsDir, skill);

    if (fs.existsSync(dest) && !isAuto) {
      const answer = await prompt(`  Overwrite ${skill}? [y/N]: `);
      if (answer !== 'y' && answer !== 'yes') {
        logSkip(skill);
        continue;
      }
      fs.rmSync(dest, { recursive: true, force: true });
    }

    const count = copyRecursive(src, dest);
    logSuccess(`${skill} (${count} files)`);
  }

  // Step 2: Commands
  logStep(2, totalSteps, 'Installing commands...');
  ensureDir(dirs.commandsDir);
  const srcCommands = path.join(PACKAGE_DIR, 'commands');
  const commandFiles = fs.readdirSync(srcCommands).filter(f => f.endsWith('.md'));

  for (const file of commandFiles) {
    fs.copyFileSync(path.join(srcCommands, file), path.join(dirs.commandsDir, file));
    logSuccess(file.replace('.md', ''));
  }

  // Step 3: Agents
  logStep(3, totalSteps, 'Installing agents...');
  ensureDir(dirs.agentsDir);
  const srcAgents = path.join(PACKAGE_DIR, 'agents');
  const agentFiles = fs.readdirSync(srcAgents).filter(f => f.endsWith('.md'));

  for (const file of agentFiles) {
    fs.copyFileSync(path.join(srcAgents, file), path.join(dirs.agentsDir, file));
    logSuccess(file.replace('.md', ''));
  }

  // Step 4: Summary
  logStep(4, totalSteps, 'Installation complete!');
  printSummary(
    { skills: skillDirs.length, commands: commandFiles.length, agents: agentFiles.length },
    dirs
  );
}

// ─── Summary ──────────────────────────────────────────────────────────────────

function printSummary(counts, dirs) {
  console.log(`
${c.green}${c.bright}DP ${VERSION} installed successfully!${c.reset}

${c.bright}Installed:${c.reset}
  ${c.cyan}${counts.skills}${c.reset} skills      → ${dirs.skillsDir}
  ${c.cyan}${counts.commands}${c.reset} commands   → ${dirs.commandsDir}
  ${c.cyan}${counts.agents}${c.reset} agents     → ${dirs.agentsDir}

${c.bright}Quick Start:${c.reset}
  ${c.cyan}/dp:start${c.reset}       Start a new design workflow
  ${c.cyan}/dp:progress${c.reset}    Check workflow status
  ${c.cyan}/dp:execute${c.reset}     Generate implementation

${c.bright}Design Skills:${c.reset}
  ${c.cyan}/dp:discovery${c.reset}        Discovery & requirements
  ${c.cyan}/dp:ux${c.reset}              UX principles & states
  ${c.cyan}/dp:ui${c.reset}              Visual design & tokens
  ${c.cyan}/dp:eng_review${c.reset} Code review & a11y

${c.bright}Workflow:${c.reset}
  Discovery → UX → ${c.yellow}Execute(wireframe)${c.reset} → UI → ${c.yellow}Execute(polished)${c.reset} → Review

${c.dim}Restart Claude Code to load DP.${c.reset}
`);
}

main().catch((err) => {
  logError(`Installation failed: ${err.message}`);
  console.error(err);
  process.exit(1);
});
