# New Project Command

Create a new project from the claude-code-template.

## Usage

```
/new-project [project-name]
```

## Workflow Context

This command is typically run AFTER `/define-project`:

```
1. git clone claude-code-template my-app && cd my-app
2. /define-project my-app    ← Creates requirements docs
3. /new-project my-app       ← YOU ARE HERE (creates new repo)
```

## Instructions for Claude

When the user runs this command, follow these steps:

### Step 0: Check for Existing Requirements

First, check if `docs/requirements/` exists:

```bash
# Check if requirements were already defined
ls docs/requirements/*.md 2>/dev/null
```

**If docs exist:**
- Read `docs/requirements/PRD-*.md` to get project info
- Read `docs/architecture/TSD-*.md` to get tech stack
- Skip questions that are already answered
- Confirm with user: "I found existing requirements. Use these? [Y/n]"

**If docs don't exist:**
- Suggest running `/define-project` first, OR
- Proceed with quick setup (minimal questions)

### Step 1: Gather Project Information

Ask the user for (skip if already in docs):

1. **Project name** (if not provided as argument)
2. **Project description** (1-2 sentences)
3. **Tech stack** - Present these options:

| Option | Stack |
|--------|-------|
| 1 | Next.js + TypeScript + Tailwind |
| 2 | React + Vite + TypeScript |
| 3 | Node.js + Express + TypeScript |
| 4 | Python + FastAPI |
| 5 | Python + Django |
| 6 | Astro + TypeScript |
| 7 | Vue + Nuxt + TypeScript |
| 8 | Custom (ask for details) |

4. **GitHub repository** - Ask if they want to create a new repo or use existing

### Step 2: Prepare for New Repository

**IMPORTANT**: This creates a NEW repository, NOT a branch of the template.

```bash
# If we're inside the cloned template, remove template's git history
rm -rf .git

# Backup docs/ if it exists (from /define-project)
if [ -d "docs" ]; then
  mv docs docs_backup
fi

# Initialize fresh git repository
git init
```

**If running from scratch (not inside template):**
```bash
# Clone template to new directory
git clone https://github.com/fearovex/claude-code-template.git {{PROJECT_NAME}}
cd {{PROJECT_NAME}}

# Remove template git history
rm -rf .git
git init
```

### Step 3: Initialize Framework

Based on the selected tech stack, run the appropriate initializer:

```bash
# Next.js
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# React + Vite
npm create vite@latest . -- --template react-ts

# Node.js + Express
npm init -y
npm install express typescript @types/express @types/node ts-node nodemon
npx tsc --init

# Python + FastAPI
python -m venv venv
pip install fastapi uvicorn[standard]

# Python + Django
python -m venv venv
pip install django
django-admin startproject config .

# Astro
npm create astro@latest . -- --template basics --typescript strict

# Vue + Nuxt
npx nuxi@latest init .
```

### Step 4: Update CLAUDE.md

1. Delete `CLAUDE.md` (the Alhurg-specific one)
2. Rename `CLAUDE.template.md` to `CLAUDE.md`
3. Replace all placeholders:

| Placeholder | Replace With |
|-------------|--------------|
| `{{PROJECT_NAME}}` | User's project name |
| `{{PROJECT_DESCRIPTION}}` | User's description |
| `{{FRAMEWORK}}` | Selected framework |
| `{{LANGUAGE}}` | TypeScript/Python/etc |
| `{{DATABASE}}` | Selected database or "none" |
| `{{STYLING}}` | Tailwind/CSS Modules/etc |
| `{{USERNAME}}` | GitHub username (fearovex) |
| `{{REPO_NAME}}` | Repository name |

4. Update the Development Commands section with actual commands from package.json or equivalent
5. Remove the "Getting Started (For Claude)" section (no longer needed)

### Step 5: Restore Documentation

If docs were backed up from `/define-project`:

```bash
# Restore docs folder
if [ -d "docs_backup" ]; then
  mv docs_backup docs
fi
```

### Step 6: Create NEW GitHub Repository

**IMPORTANT**: This creates a completely NEW repository, NOT related to the template.

```bash
# Create NEW repo via API
curl -X POST -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{"name":"{{REPO_NAME}}","description":"{{DESCRIPTION}}","private":false}' \
  https://api.github.com/user/repos

# Add remote (NEW repo, not template)
git remote add origin https://github.com/{{GITHUB_USER}}/{{REPO_NAME}}.git

# Commit everything (code + docs)
git add .
git commit -m "Initial commit: {{PROJECT_NAME}}

Created with claude-code-template
Tech stack: {{TECH_STACK}}
"

# Push to NEW repository
git push -u origin main
```

The new repository will contain:
- `/docs/` - Requirements and architecture (from /define-project)
- `/src/` or `/app/` - Code structure (from framework init)
- `/.claude/` - Claude Code configuration
- `/CLAUDE.md` - Project memory

### Step 7: Final Setup

1. Create `.env.example` with required environment variables
2. Update `.gitignore` for the specific tech stack
3. Install dependencies
4. Verify the project runs

### Step 8: Summary

Present a summary to the user:

```
✅ NEW Repository Created: {{PROJECT_NAME}}

📁 Location: {{PROJECT_PATH}}
🔗 Repository: https://github.com/{{GITHUB_USER}}/{{REPO_NAME}}
🛠️ Tech Stack: {{FRAMEWORK}} + {{LANGUAGE}}

📂 Project Structure:
├── docs/                    # From /define-project
│   ├── requirements/        # PRD document
│   ├── architecture/        # Technical specs
│   └── planning/            # User stories & activities
├── src/ (or app/)           # Application code
├── .claude/                 # Claude Code config
└── CLAUDE.md                # Project memory

📋 Next Steps:
1. cd {{PROJECT_PATH}}
2. Open in your editor
3. Run: {{DEV_COMMAND}}
4. Start implementing from docs/planning/activities.md

🚀 Available Commands:
- {{DEV_COMMAND}} - Start development
- {{BUILD_COMMAND}} - Build for production
- {{TEST_COMMAND}} - Run tests
```

**Note**: This is a NEW repository. The template (claude-code-template) remains unchanged.

## Example Interaction

**User:** `/new-project my-awesome-app`

**Claude:**
```
Creating new project: my-awesome-app

I need a few details:

1. Project description:
   > What does this project do?

2. Tech stack:
   1. Next.js + TypeScript + Tailwind
   2. React + Vite + TypeScript
   3. Node.js + Express + TypeScript
   4. Python + FastAPI
   5. Python + Django
   6. Astro + TypeScript
   7. Vue + Nuxt + TypeScript
   8. Custom

3. Create GitHub repository?
   - Yes, public
   - Yes, private
   - No, local only
```

## Notes

- Always use the GitHub token from environment variable
- Handle errors gracefully (network issues, existing repos, etc.)
- If the user is in an existing project, ask where to create the new one
- Preserve any user customizations if they've modified the template
