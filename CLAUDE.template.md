# {{PROJECT_NAME}}

## Language Rule

**IMPORTANT**: Always communicate in English. All code comments, documentation, commit messages, and responses must be in English.

## Project Description

{{PROJECT_DESCRIPTION}}

## Tech Stack

<!-- Claude: Update this section based on the actual project -->
- **Framework**: {{FRAMEWORK}} (e.g., Next.js, React, Vue, Angular, Express, FastAPI, Django)
- **Language**: {{LANGUAGE}} (e.g., TypeScript, JavaScript, Python, Go, Rust)
- **Database**: {{DATABASE}} (e.g., PostgreSQL, MongoDB, SQLite, none)
- **Styling**: {{STYLING}} (e.g., Tailwind CSS, CSS Modules, styled-components)

## Project Structure

```
{{PROJECT_NAME}}/
├── CLAUDE.md                    # Project memory for Claude Code
├── .gitignore                   # Git ignore rules
├── .mcp.json                    # MCP server configuration
└── .claude/
    ├── settings.json            # Hooks configuration (shared)
    ├── settings.local.json      # Local settings (not committed)
    ├── settings.example.json    # Example configuration
    ├── skills/
    │   └── claude-code-expert/
    │       └── SKILL.md         # Claude Code expert skill
    ├── commands/
    │   ├── setup-claude.md      # /setup-claude command
    │   ├── create-skill.md      # /create-skill command
    │   └── audit-claude-config.md # /audit-claude-config command
    └── hooks/
        ├── protect-branch.js    # Prevents edits on main/master
        ├── validate-command.js  # Blocks dangerous commands
        ├── enrich-context.js    # Adds context to prompts
        └── on-task-complete.js  # Completion notifications
```

## Getting Started (For Claude)

When starting a new project from this template, follow these steps:

### 1. Initialize the Project
```bash
# Ask the user what type of project they want to create
# Then initialize with the appropriate tool:

# For Node.js/TypeScript:
npm init -y

# For Python:
python -m venv venv && pip init

# For other frameworks, use their CLI:
npx create-next-app@latest .
npx create-vite@latest .
npm create astro@latest .
```

### 2. Update CLAUDE.md
- Replace all `{{PLACEHOLDERS}}` with actual project values
- Update the Tech Stack section
- Add project-specific commands
- Define architecture patterns used

### 3. Configure MCP Servers
Update `.mcp.json` if additional MCP servers are needed:
- `@modelcontextprotocol/server-github` - GitHub integration
- `@modelcontextprotocol/server-filesystem` - File operations
- `@modelcontextprotocol/server-postgres` - PostgreSQL access
- `@modelcontextprotocol/server-sqlite` - SQLite access

### 4. Set Up Git
```bash
git remote remove origin  # Remove template remote
git remote add origin https://github.com/{{USERNAME}}/{{REPO_NAME}}.git
git push -u origin main
```

## Available Skills

This project includes a Claude Code expert skill at `.claude/skills/claude-code-expert/SKILL.md` that provides guidance on:
- CLAUDE.md configuration
- Skills creation and management
- Custom commands
- Hooks and automation
- MCP server integration
- Project architecture for AI-assisted development

## Custom Commands

| Command | Description |
|---------|-------------|
| `/setup-claude` | Analyze project and generate Claude Code configuration |
| `/create-skill [topic]` | Create a new skill on specified topic |
| `/audit-claude-config` | Audit current Claude Code configuration |

## Development Commands

<!-- Claude: Update these based on the project's package.json or equivalent -->
```bash
# Node.js / npm
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Check code quality

# Python
python -m pytest     # Run tests
python main.py       # Run application
pip install -r requirements.txt  # Install dependencies

# Docker
docker-compose up -d # Start services
docker-compose down  # Stop services
```

## Code Conventions

### Naming
- Components: PascalCase (`UserProfile.tsx`)
- Functions/variables: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: kebab-case (`user-profile.ts`)
- Python: snake_case for functions/variables (`get_user_data`)

### Style
- Use ES Modules (import/export), NOT CommonJS (require)
- Use TypeScript strict mode when available
- Follow consistent naming conventions
- Write self-documenting code
- Prefer arrow functions for components
- Use type annotations (TypeScript/Python type hints)

## Important Rules

1. **NEVER** commit credentials or .env files
2. **ALWAYS** write tests for new functionality
3. **PREFER** composition over inheritance
4. **AVOID** using `any` in TypeScript
5. **DO NOT** edit directly on main/master branch
6. **ALWAYS** create feature branches for new work
7. **RUN** linters and tests before committing

## Active Hooks

- **PreToolUse**: Branch protection (blocks edits on main/master)
- **PostToolUse**: Auto-format with Prettier after edits

## MCP Servers

- **github**: GitHub API access for repository operations
- **filesystem**: Local filesystem access for file operations

## Environment Variables

<!-- Claude: Document required environment variables here -->
```env
# Required
GITHUB_TOKEN=        # GitHub Personal Access Token

# Optional (add as needed)
# DATABASE_URL=      # Database connection string
# API_KEY=           # External API key
```

## Architecture Decisions

<!-- Claude: Document important architectural decisions here -->
| Decision | Choice | Rationale |
|----------|--------|-----------|
| State Management | TBD | TBD |
| API Layer | TBD | TBD |
| Testing Strategy | TBD | TBD |

---

## Notes for Claude

When working on this project:

1. **First time setup**: Run `/setup-claude` to analyze the project and update this file
2. **Before coding**: Always read relevant files first to understand context
3. **After changes**: Ensure tests pass and code is formatted
4. **Commits**: Use conventional commit messages (feat:, fix:, docs:, etc.)
5. **Questions**: Ask the user for clarification on business logic or preferences
