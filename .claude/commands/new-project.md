# New Project Command

Create a new project from the claude-code-template.

## Usage

```
/new-project [project-name]
```

## Instructions for Claude

When the user runs this command, follow these steps:

### Step 1: Gather Project Information

Ask the user for:

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

### Step 2: Create Project Directory

```bash
# Clone template to new directory
git clone https://github.com/fearovex/claude-code-template.git {{PROJECT_PATH}}
cd {{PROJECT_PATH}}

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

### Step 5: Create GitHub Repository (if requested)

```bash
# Create repo via API
curl -X POST -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -d '{"name":"{{REPO_NAME}}","description":"{{DESCRIPTION}}","private":false}' \
  https://api.github.com/user/repos

# Add remote and push
git remote add origin https://github.com/fearovex/{{REPO_NAME}}.git
git add .
git commit -m "Initial commit from claude-code-template"
git push -u origin main
```

### Step 6: Final Setup

1. Create `.env.example` with required environment variables
2. Update `.gitignore` for the specific tech stack
3. Install dependencies
4. Verify the project runs

### Step 7: Summary

Present a summary to the user:

```
✅ Project Created: {{PROJECT_NAME}}

📁 Location: {{PROJECT_PATH}}
🔗 Repository: https://github.com/fearovex/{{REPO_NAME}}
🛠️ Tech Stack: {{FRAMEWORK}} + {{LANGUAGE}}

📋 Next Steps:
1. cd {{PROJECT_PATH}}
2. Open in your editor
3. Run: {{DEV_COMMAND}}

🚀 Available Commands:
- {{DEV_COMMAND}} - Start development
- {{BUILD_COMMAND}} - Build for production
- {{TEST_COMMAND}} - Run tests
```

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
