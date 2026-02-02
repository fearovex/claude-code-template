# Claude Code Template

Template repository with pre-configured Claude Code setup for AI-assisted development.

## Complete Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FROM IDEA TO CODE                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  STEP 1: Clone Template                                             │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  git clone <template-url> my-app                             │   │
│  │  cd my-app                                                   │   │
│  │  claude                                                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  STEP 2: Define Requirements (/define-project)                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  /define-project my-app                                      │   │
│  │                                                              │   │
│  │  → Interview: vision, features, users, tech constraints      │   │
│  │  → Creates docs/requirements/PRD-my-app.md                   │   │
│  │  → Creates docs/architecture/TSD-my-app.md                   │   │
│  │  → Creates docs/planning/activities.md                       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  STEP 3: Create Project (/new-project)                              │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  /new-project my-app                                         │   │
│  │                                                              │   │
│  │  → Removes template .git history                             │   │
│  │  → Initializes framework (Next.js, Express, FastAPI, etc.)   │   │
│  │  → Creates NEW repository on GitHub                          │   │
│  │  → Pushes code + documentation                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                              ↓                                      │
│  RESULT: New Independent Repository                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  github.com/YOUR_USER/my-app (NEW REPO)                      │   │
│  │  ├── docs/           ← Requirements & architecture           │   │
│  │  ├── src/            ← Application code                      │   │
│  │  ├── .claude/        ← Claude Code configuration             │   │
│  │  └── CLAUDE.md       ← Project memory                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Template remains UNCHANGED for future projects                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## What's Included

```
├── CLAUDE.md              # Project memory (rename from CLAUDE.template.md)
├── CLAUDE.template.md     # Template with placeholders
├── .gitignore             # Standard ignores
├── .mcp.json              # MCP servers (GitHub + Filesystem)
└── .claude/
    ├── settings.json      # Hooks configuration
    ├── commands/          # Custom slash commands
    │   ├── define-project.md    # 📋 Define requirements & specs
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
        ├── claude-code-expert/
        │   └── SKILL.md
        └── requirements-architect/
            └── SKILL.md         # 🏗️ Requirements & Architecture
```

## Quick Start

### Option 1: Full Workflow (Recommended)

```bash
# 1. Clone template
git clone <template-url> my-app
cd my-app

# 2. Start Claude Code
claude

# 3. Define requirements (creates documentation)
/define-project my-app

# 4. Create new repository (initializes code + pushes)
/new-project my-app
```

### Option 2: Use as GitHub Template

1. Click **"Use this template"** → **"Create a new repository"**
2. Clone your new repository
3. Rename `CLAUDE.template.md` to `CLAUDE.md`
4. Update placeholders in `CLAUDE.md`
5. Start Claude Code: `claude`

### Option 3: Manual Clone

```bash
# Clone and rename
git clone <template-url> my-project
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

## Custom Commands

| Command | Description |
|---------|-------------|
| `/define-project [name]` | Define requirements, architecture & technical specs |
| `/new-project [name]` | Create new repository with framework initialized |
| `/setup-claude` | Analyze project and update CLAUDE.md |
| `/create-skill [topic]` | Create a new skill |
| `/audit-claude-config` | Audit Claude Code configuration |

## Skills

### Requirements Architect
Expert in software requirements and architecture:
- Requirements engineering (User Stories, Use Cases)
- Architecture design (Microservices, Monolith, Serverless)
- Tech stack selection (React, Vue, Node.js, Python, etc.)
- Database design (PostgreSQL, MongoDB, Redis)
- API design (REST, GraphQL)

### Claude Code Expert
Guidance on Claude Code configuration:
- CLAUDE.md setup
- Skills and commands creation
- Hooks and automation
- MCP server integration

## Hooks

| Hook | Trigger | Action |
|------|---------|--------|
| `protect-branch.js` | PreToolUse (Edit/Write) | Blocks edits on main/master |
| `validate-command.js` | PreToolUse (Bash) | Blocks dangerous commands |
| `enrich-context.js` | UserPromptSubmit | Adds context to prompts |
| `on-task-complete.js` | Stop | Notifications on completion |

## MCP Servers

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
