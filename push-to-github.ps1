param(
  [string]$Branch = "main",
  [string]$Message = "chore: update project files"
)

$repoUrl = 'https://github.com/BethelhemSolomon/BERCHimart.git'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git is not installed. Install git and try again."
  exit 1
}

# Initialize repo if not a git repo
try {
  git rev-parse --is-inside-work-tree 2>$null | Out-Null
} catch {
  Write-Output "Not a git repository. Initializing..."
  git init
}

# Set remote origin if missing
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  Write-Output "Setting remote origin to $repoUrl"
  git remote add origin $repoUrl
} else {
  Write-Output "Remote origin already set to: $remote"
}

# Stage changes
git add -A

# Commit if changes
$staged = git diff --cached --quiet; if ($LASTEXITCODE -ne 0) { $hasStaged = $true } else { $hasStaged = $false }
if ($hasStaged) {
  git commit -m $Message
} else {
  Write-Output "No changes to commit."
}

# Ensure branch name
git branch -M $Branch

# Push
git push -u origin $Branch

Write-Output "Push completed (origin/$Branch)."