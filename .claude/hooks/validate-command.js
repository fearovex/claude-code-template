/**
 * Hook: Validate dangerous commands
 * Blocks destructive commands that could cause data loss
 */

const dangerousPatterns = [
  /rm\s+-rf\s+[\/~]/,           // rm -rf on dangerous paths
  /rm\s+-rf\s+\*/,              // rm -rf *
  /git\s+push\s+--force/,       // force push
  /git\s+reset\s+--hard/,       // hard reset
  /git\s+clean\s+-fd/,          // forced git clean
  /DROP\s+DATABASE/i,           // drop database
  /DROP\s+TABLE/i,              // drop table
  /TRUNCATE\s+TABLE/i,          // truncate table
  /DELETE\s+FROM\s+\w+\s*;/i,   // delete without where
  />\s*\/dev\/sda/,             // write to disk
  /mkfs\./,                     // format disk
  /dd\s+if=/,                   // dd command
];

// Get command from environment (passed by Claude Code)
const command = process.env.CLAUDE_COMMAND || process.argv[2] || '';

for (const pattern of dangerousPatterns) {
  if (pattern.test(command)) {
    console.log(JSON.stringify({
      block: true,
      message: `Command blocked for security. This command could cause data loss. If you really need to run it, do so manually in the terminal.`
    }));
    process.exit(0);
  }
}

// Safe command
console.log(JSON.stringify({ block: false }));
