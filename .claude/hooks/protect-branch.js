/**
 * Hook: Protect main branch
 * Blocks edits when on main/master branch
 */

const { execSync } = require('child_process');

try {
  const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

  const protectedBranches = ['main', 'master', 'production', 'prod'];

  if (protectedBranches.includes(branch)) {
    console.log(JSON.stringify({
      block: true,
      message: `Protected branch: Cannot edit directly on '${branch}'. Create a new branch first with: git checkout -b feature/my-change`
    }));
    process.exit(0);
  }

  // Allow the operation
  console.log(JSON.stringify({ block: false }));

} catch (error) {
  // If not a git repo or error, allow the operation
  console.log(JSON.stringify({ block: false }));
}
