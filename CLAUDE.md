# Alhurg Turismo

## Language Rule

**IMPORTANT**: Always communicate in English. All code comments, documentation, commit messages, and responses must be in English.

## Project Description

Tourism project for Alhurg.

## Project Structure

```
alhurg_turismo/
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

Run common development commands:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Check code quality

## Code Conventions

### Naming
- Components: PascalCase (`UserProfile.tsx`)
- Functions/variables: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- Files: kebab-case (`user-profile.ts`)

### Style
- Use ES Modules (import/export), NOT CommonJS (require)
- Use TypeScript strict mode when available
- Follow consistent naming conventions
- Write self-documenting code
- Prefer arrow functions for components

## Important Rules

1. **NEVER** commit credentials or .env files
2. **ALWAYS** write tests for new functionality
3. **PREFER** composition over inheritance
4. **AVOID** using `any` in TypeScript
5. **DO NOT** edit directly on main/master branch

## Active Hooks

- **PreToolUse**: Branch protection (blocks edits on main/master)
- **PostToolUse**: Auto-format with Prettier after edits

## MCP Servers

- **filesystem**: Local filesystem access for file operations
