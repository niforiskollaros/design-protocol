#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const VERSION = '2.1.4';
const PACKAGE_NAME = 'design-shit-properly';
const PACKAGE_DIR = path.join(__dirname, '..');

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

function printBanner() {
  console.log(`\n${c.magenta}${c.bright}  DSP ${c.reset}${c.cyan}Design Shit Properly${c.reset} ${c.dim}v${VERSION}${c.reset}`);
  console.log(`${c.dim}  Complete design workflow for Claude Code${c.reset}\n`);
}

function getClaudeDir(location) {
  if (location === 'global') {
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    return process.env.CLAUDE_CONFIG_DIR || path.join(homeDir, '.claude');
  }
  return path.join(process.cwd(), '.claude');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest, indent = '  ') {
  if (!fs.existsSync(src)) return 0;

  const stats = fs.statSync(src);
  let count = 0;

  if (stats.isDirectory()) {
    ensureDir(dest);
    const files = fs.readdirSync(src);
    for (const file of files) {
      count += copyRecursive(
        path.join(src, file),
        path.join(dest, file),
        indent
      );
    }
  } else {
    fs.copyFileSync(src, dest);
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
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
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
  log(`\nUpdating DSP...`, 'bright');

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

  if (showVersion) {
    console.log(`dsp v${VERSION}`);
    process.exit(0);
  }

  if (isHelp) {
    console.log(`
${c.bright}DSP - Design Shit Properly v${VERSION}${c.reset}

Usage: npx design-shit-properly [options]

Options:
  --global, -g     Install to ~/.claude/ (all projects)
  --local, -l      Install to ./.claude/ (current project only)
  --auto           Non-interactive install (default: global)
  --update         Update to the latest version
  --check-update   Check if updates are available
  --uninstall, -u  Remove DSP from specified location
  --version, -v    Show version number
  --help, -h       Show this help message

Examples:
  npx design-shit-properly              # Interactive installation
  npx design-shit-properly --global     # Install globally
  npx design-shit-properly --local      # Install to current project
  npx design-shit-properly --update     # Update to latest version
  npx design-shit-properly -g -u        # Uninstall from global

${c.bright}What Gets Installed:${c.reset}
  ~/.claude/skills/      5 design skills (ux-jesus, ux, ui, design-engineer, ux-research)
  ~/.claude/commands/    7 workflow commands (dsp:start, dsp:execute, etc.)
  ~/.claude/agents/      2 specialized agents

${c.bright}Workflow:${c.reset}
  /dsp:start → /ux-jesus → /ux → /dsp:execute → /ui → /dsp:execute → /design-engineer → /dsp:verify
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
    log('\nWhere would you like to install DSP?\n', 'bright');
    console.log('  1. Global (~/.claude/) - Available in all projects');
    console.log('  2. Local  (./.claude/) - Current project only\n');
    const answer = await prompt('Choose [1/2] (default: 1): ');
    location = answer === '2' ? 'local' : 'global';
  }

  const claudeDir = getClaudeDir(location);
  const skillsDir = path.join(claudeDir, 'skills');
  const commandsDir = path.join(claudeDir, 'commands');
  const agentsDir = path.join(claudeDir, 'agents');

  // Uninstall
  if (isUninstall) {
    log(`\nUninstalling from ${location} location...`, 'yellow');
    log(`Target: ${claudeDir}`, 'dim');

    let removed = 0;

    // Remove skills
    const skillNames = ['ux-jesus', 'ux-excellence', 'ui-excellence', 'design-engineer', 'ux-research'];
    for (const name of skillNames) {
      const skillPath = path.join(skillsDir, name);
      if (fs.existsSync(skillPath)) {
        fs.rmSync(skillPath, { recursive: true, force: true });
        logSuccess(`Removed skill: ${name}`);
        removed++;
      }
    }

    // Remove commands
    const commandFiles = fs.readdirSync(PACKAGE_DIR + '/commands').filter(f => f.endsWith('.md'));
    for (const file of commandFiles) {
      const cmdPath = path.join(commandsDir, file);
      if (fs.existsSync(cmdPath)) {
        fs.unlinkSync(cmdPath);
        logSuccess(`Removed command: ${file}`);
        removed++;
      }
    }

    // Remove agents
    const agentFiles = fs.readdirSync(PACKAGE_DIR + '/agents').filter(f => f.endsWith('.md'));
    for (const file of agentFiles) {
      const agentPath = path.join(agentsDir, file);
      if (fs.existsSync(agentPath)) {
        fs.unlinkSync(agentPath);
        logSuccess(`Removed agent: ${file}`);
        removed++;
      }
    }

    if (removed > 0) {
      log(`\n${c.green}DSP uninstalled successfully!${c.reset}\n`);
    } else {
      log(`\n${c.yellow}No DSP installation found at ${claudeDir}${c.reset}\n`);
    }
    process.exit(0);
  }

  // Install
  const totalSteps = 4;
  log(`\nInstalling to ${location} location...`, 'bright');
  log(`Target: ${claudeDir}\n`, 'dim');

  // Step 1: Skills
  logStep(1, totalSteps, 'Installing skills...');
  const srcSkills = path.join(PACKAGE_DIR, 'skills');
  const skillDirs = fs.readdirSync(srcSkills).filter(f =>
    fs.statSync(path.join(srcSkills, f)).isDirectory()
  );

  for (const skill of skillDirs) {
    const src = path.join(srcSkills, skill);
    const dest = path.join(skillsDir, skill);

    // Check for existing
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
  ensureDir(commandsDir);
  const srcCommands = path.join(PACKAGE_DIR, 'commands');
  const commandFiles = fs.readdirSync(srcCommands).filter(f => f.endsWith('.md'));

  for (const file of commandFiles) {
    const src = path.join(srcCommands, file);
    const dest = path.join(commandsDir, file);
    fs.copyFileSync(src, dest);
    logSuccess(file.replace('.md', ''));
  }

  // Step 3: Agents
  logStep(3, totalSteps, 'Installing agents...');
  ensureDir(agentsDir);
  const srcAgents = path.join(PACKAGE_DIR, 'agents');
  const agentFiles = fs.readdirSync(srcAgents).filter(f => f.endsWith('.md'));

  for (const file of agentFiles) {
    const src = path.join(srcAgents, file);
    const dest = path.join(agentsDir, file);
    fs.copyFileSync(src, dest);
    logSuccess(file.replace('.md', ''));
  }

  // Step 4: Summary
  logStep(4, totalSteps, 'Installation complete!');

  // Count what was installed
  const skillCount = skillDirs.length;
  const cmdCount = commandFiles.length;
  const agentCount = agentFiles.length;

  console.log(`
${c.green}${c.bright}DSP ${VERSION} installed successfully!${c.reset}

${c.bright}Installed:${c.reset}
  ${c.cyan}${skillCount}${c.reset} skills      → ${skillsDir}
  ${c.cyan}${cmdCount}${c.reset} commands   → ${commandsDir}
  ${c.cyan}${agentCount}${c.reset} agents     → ${agentsDir}

${c.bright}Quick Start:${c.reset}
  ${c.cyan}/dsp:start${c.reset}       Start a new design workflow
  ${c.cyan}/dsp:progress${c.reset}    Check workflow status
  ${c.cyan}/dsp:execute${c.reset}     Generate implementation

${c.bright}Design Skills:${c.reset}
  ${c.cyan}/ux-jesus${c.reset}        Discovery & requirements
  ${c.cyan}/ux${c.reset}              UX principles & states
  ${c.cyan}/ui${c.reset}              Visual design & tokens
  ${c.cyan}/design-engineer${c.reset} Code review & a11y

${c.bright}Workflow:${c.reset}
  Discovery → UX → ${c.yellow}Execute(wireframe)${c.reset} → UI → ${c.yellow}Execute(polished)${c.reset} → Review

${c.dim}Restart Claude Code to load DSP.${c.reset}
`);
}

main().catch((err) => {
  logError(`Installation failed: ${err.message}`);
  console.error(err);
  process.exit(1);
});
