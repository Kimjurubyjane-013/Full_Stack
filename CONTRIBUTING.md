# Git Collaboration & Contributing Guide

Welcome to the team! This document outlines our Git workflow, branching strategy, commit conventions, and Pull Request (PR) standards to ensure seamless collaboration between the Frontend Specialist (Person 2), Backend Specialist (Person 3), and Lead System Architect (Person 1).

---

## 1. Branching Strategy

We follow a structured Git Feature Branch Workflow to protect the `main` branch from unstable or breaking changes.

### Branch Roles
- **`main`**: The single source of truth for stable, production-ready code. Direct pushes to `main` are strictly forbidden. All code enters `main` via reviewed and approved Pull Requests that pass CI checks.
- **`feature/frontend-<feature-name>`**: Dedicated branches for Frontend Specialist work (UI components, client state, styling, pages).
- **`feature/backend-<feature-name>`**: Dedicated branches for Backend Specialist work (API endpoints, database queries, controllers, middlewares).
- **`fix/<issue-description>`**: Bug fixes across frontend or backend.
- **`chore/<task-name>`**: DevOps, CI/CD, dependency upgrades, or architecture scaffolding.

### Branch Naming Conventions
Use lowercase, hyphen-separated kebab-case:
```
feature/frontend-auth-modal
feature/frontend-dashboard-charts
feature/backend-user-api
feature/backend-auth-jwt
fix/backend-cors-headers
chore/ci-pipeline-update
```

---

## 2. Commit Message Conventions (Conventional Commits)

We enforce the **[Conventional Commits](https://www.conventionalcommits.org/)** specification. Each commit message must follow this structure:

```
<type>(<scope>): <short description>
```

### Allowed Types
- **`feat`**: A new user-facing or API feature.
- **`fix`**: A bug fix.
- **`chore`**: Maintenance tasks, package updates, tooling config changes.
- **`docs`**: Documentation updates (README, CONTRIBUTING, API docs).
- **`style`**: Code formatting, missing semicolons, white-space changes (no functional impact).
- **`refactor`**: Code restructuring without bug fixing or adding features.
- **`test`**: Adding or modifying automated unit/integration tests.
- **`ci`**: Changes to CI/CD workflows and automation scripts.

### Allowed Scopes
Use scopes to designate the layer modified:
- `(client)` or `(frontend)`
- `(server)` or `(backend)`
- `(root)` or `(deps)`

### Examples
- `feat(client): implement responsive navigation bar`
- `feat(server): add user registration endpoint with bcrypt hashing`
- `fix(server): correct CORS origin validation on production`
- `fix(client): resolve layout shift on mobile devices`
- `docs: update API setup instructions in README`
- `test(server): add unit tests for token verification middleware`
- `chore(deps): update concurrently to v9.1.2`

---

## 3. Developer Workflow: Step-by-Step

### Step 1: Sync Your Local `main`
Always branch off the latest `main`:
```bash
git checkout main
git pull origin main
```

### Step 2: Create a Feature Branch
```bash
# Frontend Specialist example:
git checkout -b feature/frontend-login-form

# Backend Specialist example:
git checkout -b feature/backend-auth-controller
```

### Step 3: Implement, Test & Commit Locally
Work within your designated workspace (`/client` or `/server`). Keep commits atomic and informative:
```bash
git add client/src/components/LoginForm.jsx
git commit -m "feat(client): create controlled login form with validation"
```

### Step 4: Keep Your Branch Updated with `main`
Before opening a PR, rebase or merge from the latest `main`:
```bash
git fetch origin
git rebase origin/main
# or: git merge origin/main
```

### Step 5: Push Branch and Open a Pull Request
Push your branch to GitHub:
```bash
git push -u origin feature/frontend-login-form
```

Then open a Pull Request targeting `main` on GitHub:
- **Title**: Follow conventional commit style (e.g., `feat(client): add responsive login form`).
- **Description**: Include what changes were made, testing instructions, and screenshots (for UI changes).
- **Reviewers**: Request a review from the Lead System Architect and peer specialist.

---

## 4. Handling Merge Conflicts Safely

Merge conflicts occur when two teammates modify overlapping lines in the same file. Follow these steps to resolve them cleanly:

1. **Fetch the latest upstream changes**:
   ```bash
   git checkout main
   git pull origin main
   git checkout <your-feature-branch>
   ```

2. **Rebase onto `main`**:
   ```bash
   git rebase origin/main
   ```

3. **Identify conflicted files**:
   Git will halt at conflicting commits and mark files with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

4. **Resolve conflicts**:
   - Open the conflicting files in VS Code / your editor.
   - Coordinate with your teammate if you are unsure which change takes precedence.
   - Remove conflict markers and retain the intended code.

5. **Stage and continue**:
   ```bash
   git add <resolved-files>
   git rebase --continue
   ```
   *(If at any point you get confused, abort safely with `git rebase --abort`).*

6. **Force-push safely with lease**:
   Because rebasing rewrites branch history, push using `--force-with-lease`:
   ```bash
   git push --force-with-lease origin <your-feature-branch>
   ```

---

## 5. Pull Request Checklist

Before hitting "Ready for Review":
- [ ] Code strictly resides in the relevant workspace (`/client` or `/server`).
- [ ] No `.env` secrets or credentials committed.
- [ ] Code passes local builds (`npm run build` or workspace build scripts).
- [ ] GitHub Actions CI pipeline passes with green checkmarks.
- [ ] At least 1 code review approval received.
- [ ] Branch is up-to-date with `main`.
