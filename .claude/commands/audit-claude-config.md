# Audit Claude Code Configuration

Perform a complete audit of Claude Code configuration in this project.

## Audit Checklist

### CLAUDE.md
- [ ] CLAUDE.md exists at root or .claude/
- [ ] Contains project description
- [ ] Lists main commands (dev, build, test)
- [ ] Documents project structure
- [ ] Defines code conventions
- [ ] Includes important rules
- [ ] Is up to date with current project state

### Skills (.claude/skills/)
- [ ] Skills organized in individual folders
- [ ] Each skill has SKILL.md
- [ ] Descriptions with relevant triggers
- [ ] Content under 500 lines per skill
- [ ] Code examples included

### Commands (.claude/commands/)
- [ ] Frequent commands documented
- [ ] Correct use of variables ($ARGUMENTS, $FILE)
- [ ] Clear instructions in each command

### Hooks (settings.json)
- [ ] Hooks configured for automation
- [ ] PreToolUse for validations
- [ ] PostToolUse for formatting/lint
- [ ] Hook scripts with correct permissions

### MCP (.mcp.json)
- [ ] Relevant servers configured
- [ ] Environment variables correctly referenced
- [ ] Tokens/credentials in environment variables (not hardcoded)

### Git
- [ ] settings.local.json in .gitignore
- [ ] Shareable configuration committed
- [ ] Credentials excluded

## Output

Generate report with:
1. Configuration score (0-100%)
2. Issues found by category
3. Prioritized improvement recommendations
4. Commands/code to fix each issue
