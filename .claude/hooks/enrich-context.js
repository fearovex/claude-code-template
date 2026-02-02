/**
 * Hook: Enrich prompt context
 * Automatically adds useful information to the context
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const context = [];

try {
  // Add current branch
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  context.push(`Current branch: ${branch}`);

  // Check for uncommitted changes
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (status) {
    const changedFiles = status.split('\n').length;
    context.push(`Uncommitted files: ${changedFiles}`);
  }

} catch (e) {
  // Not a git repo, ignore
}

try {
  // Detect framework/stack
  if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    const frameworks = [];
    if (deps.react) frameworks.push('React');
    if (deps.vue) frameworks.push('Vue');
    if (deps.angular) frameworks.push('Angular');
    if (deps.next) frameworks.push('Next.js');
    if (deps.nuxt) frameworks.push('Nuxt');
    if (deps.express) frameworks.push('Express');
    if (deps.fastify) frameworks.push('Fastify');
    if (deps.nest) frameworks.push('NestJS');

    if (frameworks.length > 0) {
      context.push(`Detected stack: ${frameworks.join(', ')}`);
    }
  }
} catch (e) {
  // Error reading package.json, ignore
}

// Output enriched context
if (context.length > 0) {
  console.log(JSON.stringify({
    block: false,
    feedback: `[Context] ${context.join(' | ')}`
  }));
} else {
  console.log(JSON.stringify({ block: false }));
}
