#!/usr/bin/env bash
set -e

REPO_URL="https://github.com/BethelhemSolomon/BERCHimart.git"
BRANCH="${1:-main}"
MSG="${2:-chore: update project files}"

# Ensure git is available
if ! command -v git >/dev/null 2>&1; then
  echo "Error: git is not installed. Install git and try again."
  exit 1
fi

# Initialize repo if not a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository. Initializing..."
  git init
fi

# Set remote origin if missing
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Setting remote origin to $REPO_URL"
  git remote add origin "$REPO_URL"
else
  echo "Remote origin already set to: $(git remote get-url origin)"
fi

# Stage all changes
git add -A

# Commit (if there are staged changes)
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$MSG"
fi

# Ensure branch name
git branch -M "$BRANCH"

# Push
git push -u origin "$BRANCH"

echo "Push completed (origin/$BRANCH)."