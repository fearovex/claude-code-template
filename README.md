# Claude Code Template

Template repository with pre-configured Claude Code setup for AI-assisted development.

## What's Included

```
├── CLAUDE.md              # Project memory (rename from CLAUDE.template.md)
├── CLAUDE.template.md     # Template with placeholders
├── .gitignore             # Standard ignores
├── .mcp.json              # MCP servers (GitHub + Filesystem)
└── .claude/
    ├── settings.json      # Hooks configuration
    ├── commands/          # Custom slash commands
    │   ├── new-project.md       # 🚀 Create new projects
    │   ├── setup-claude.md
    │   ├── create-skill.md
    │   └── audit-claude-config.md
    ├── hooks/             # Automation scripts
    │   ├── protect-branch.js
    │   ├── validate-command.js
    │   ├── enrich-context.js
    │   └── on-task-complete.js
    └── skills/
        └── claude-code-expert/
            └── SKILL.md
```

## Quick Start

### Option 1: Use `/new-project` Command (Recommended)

If you already have the template cloned or the global skill installed:

```bash
claude
```

Then in Claude Code:
```
/new-project my-awesome-app
```

Claude will:
1. Ask for project details (description, tech stack)
2. Clone the template to a new directory
3. Initialize the framework (Next.js, Vite, Express, etc.)
4. Update CLAUDE.md with your project info
5. Create GitHub repository (optional)
6. Push initial commit

### Option 2: Use as GitHub Template

1. Click **"Use this template"** → **"Create a new repository"**
2. Clone your new repository
3. Rename `CLAUDE.template.md` to `CLAUDE.md`
4. Update placeholders in `CLAUDE.md`
5. Start Claude Code: `claude`

### Option 3: Manual Clone

```bash
# Clone and rename
git clone https://github.com/fearovex/claude-code-template.git my-project
cd my-project

# Remove template origin
rm -rf .git
git init

# Setup CLAUDE.md
mv CLAUDE.template.md CLAUDE.md
# Edit CLAUDE.md to replace {{PLACEHOLDERS}}

# Connect to your repo
git remote add origin https://github.com/YOUR_USER/my-project.git
git add . && git commit -m "Initial commit from template"
git push -u origin main
```

## Prerequisites

### GitHub Token (Required for MCP GitHub Server)

1. Go to https://github.com/settings/tokens
2. Generate new token (classic) with scopes: `repo`, `read:org`, `workflow`
3. Set environment variable:

**Windows (PowerShell):**
```powershell
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'ghp_xxx', 'User')
```

**macOS/Linux:**
```bash
echo 'export GITHUB_TOKEN="ghp_xxx"' >> ~/.bashrc
source ~/.bashrc
```

## Features

### Hooks

| Hook | Trigger | Action |
|------|---------|--------|
| `protect-branch.js` | PreToolUse (Edit/Write) | Blocks edits on main/master |
| `validate-command.js` | PreToolUse (Bash) | Blocks dangerous commands |
| `enrich-context.js` | UserPromptSubmit | Adds context to prompts |
| `on-task-complete.js` | Stop | Notifications on completion |

### Custom Commands

| Command | Description |
|---------|-------------|
| `/new-project [name]` | **Create a new project from template** |
| `/setup-claude` | Analyze project and update CLAUDE.md |
| `/create-skill [topic]` | Create a new skill |
| `/audit-claude-config` | Audit Claude Code configuration |

### MCP Servers

- **github**: Full GitHub API access (repos, issues, PRs)
- **filesystem**: Local file operations

## Customization

### Add More MCP Servers

Edit `.mcp.json`:

```json
{
  "mcpServers": {
    "postgres": {
      "type": "stdio",
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

### Add Custom Hooks

1. Create script in `.claude/hooks/`
2. Register in `.claude/settings.json`

### Add Custom Commands

1. Create `.md` file in `.claude/commands/`
2. Use with `/command-name` in Claude Code

## License

MIT

---

Created with Claude Code
