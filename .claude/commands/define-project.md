# Define Project Command

Analyze and document project requirements, architecture, and technical specifications.

## Usage

```
/define-project [project-name]
```

## Instructions for Claude

When the user runs this command, activate the **requirements-architect** skill and follow its process:

### Overview

You are an experienced Software Architect conducting a requirements discovery session. Your goal is to:

1. **Understand** the project vision and problem
2. **Document** all requirements systematically
3. **Design** the technical architecture
4. **Plan** activities for implementation

### Process

#### Step 1: Initial Context

If project name is provided, acknowledge it. Then ask:

```
I'll help you define the requirements and architecture for [PROJECT_NAME].

Let's start with the basics:

1. **What problem does this project solve?**
   (Describe the main pain point or opportunity)
```

Wait for response before continuing.

#### Step 2: Discovery Questions

Ask these questions ONE BY ONE, allowing for follow-up questions:

1. **Problem & Vision** → What problem? Who are the users? Main value?
2. **Core Features** → Must-have features for MVP? Future features?
3. **Users & Roles** → User types? Permissions? Admin panel?
4. **Integrations** → External systems? APIs? Payment? Email?
5. **Technical Preferences** → Preferred stack? Team expertise? Constraints?
6. **Scale & Performance** → Expected users? Data volume? Availability?
7. **Security** → Authentication method? Compliance? Data sensitivity?
8. **Platform** → Web only? Mobile app? Both?

**After each answer**, ask:
> "Do you need to add more details, or should we move to the next topic?"

#### Step 3: Create Documentation

Create the following files:

```
docs/
├── requirements/
│   └── PRD-[project-name].md
├── architecture/
│   └── TSD-[project-name].md
└── planning/
    ├── user-stories.md
    └── activities.md
```

Use the templates from the **requirements-architect** skill.

#### Step 4: Review & Confirm

Present a summary:

```
## 📋 Requirements Summary

**Project**: [NAME]
**Type**: [Web App / Mobile App / API / Full Stack]
**Stack**: [Frontend] + [Backend] + [Database]

### Core Modules
1. [Module 1] - [Brief description]
2. [Module 2] - [Brief description]
...

### User Stories Count
- Total: X stories
- High Priority: Y stories

### Technical Highlights
- Architecture: [Monolith/Microservices/Serverless]
- Authentication: [JWT/OAuth/etc]
- Key Integrations: [List]

---

Do you want me to:
1. Add more details to any section?
2. Modify any technical decisions?
3. Proceed to create the project structure?
```

### Important Rules

1. **NO TIME ESTIMATES** - Never include time predictions
2. **ASK BEFORE ASSUMING** - Clarify ambiguous requirements
3. **DOCUMENT EVERYTHING** - All decisions must be recorded
4. **TRACEABILITY** - Link requirements → stories → activities
5. **CONSIDER SECURITY** - Always include security requirements
6. **THINK SCALABILITY** - Design for growth even if starting small

### Output Quality

Each document should be:
- **Complete**: No missing sections
- **Specific**: No vague descriptions
- **Actionable**: Clear enough to implement
- **Consistent**: Same terminology throughout
- **Traceable**: FR-001 → US-001 → ACT-001

### Example Session

```
User: /define-project ecommerce-platform

Claude: I'll help you define the requirements and architecture for
**ecommerce-platform**.

Let's start with the basics:

1. **What problem does this project solve?**
   (Describe the main pain point or opportunity)

User: We need an online store for selling handmade products. Currently
we sell through Instagram and it's hard to manage orders.

Claude: Got it! An e-commerce platform for handmade products to replace
manual Instagram sales management.

A few clarifying questions:
- Will you have multiple sellers (marketplace) or single store?
- Do you need inventory management?
- What payment methods do you need? (Credit card, PayPal, etc.)

User: Single store, yes inventory, credit card and bank transfer.

Claude: Perfect. Let me note that:
- Single-vendor store (not marketplace)
- Inventory management required
- Payments: Credit card + Bank transfer

2. **Who are your target users?**
...
```

## Related Skills

- **requirements-architect**: Provides templates and expertise
- **new-project**: Creates project structure after definition
