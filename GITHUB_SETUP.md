# GitHub Setup Instructions

## Prerequisites
- GitHub account
- Git installed on your machine

## Steps to Push to GitHub

### 1. Create a New Repository on GitHub

1. Go to [GitHub.com](https://github.com/new)
2. Click "New repository"
3. Fill in the details:
   - **Repository name**: `truestate-sales-management` (or your preferred name)
   - **Description**: "Full-stack Retail Sales Management System with advanced search, filtering, sorting, and pagination"
   - **Visibility**: Public (for portfolio) or Private (for security)
   - **Initialize repository**: Leave unchecked (we already have commits)
4. Click "Create repository"

### 2. Add Remote and Push to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```powershell
cd "c:\Users\pc\OneDrive\Documents\Truestate"

# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (optional but recommended)
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace:
- `YOUR_USERNAME`: Your GitHub username
- `REPO_NAME`: Your repository name (e.g., `truestate-sales-management`)

### 3. Verify Upload

1. Go to your GitHub repository URL
2. Verify all files are present
3. Check that the README.md displays correctly

## Using SSH (Optional - More Secure)

If you have SSH keys configured:

```powershell
# Add remote with SSH
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# Push
git push -u origin main
```

### Generate SSH Keys (if needed)

```powershell
ssh-keygen -t ed25519 -C "your.email@example.com"
# Follow prompts, then add public key to GitHub settings
```

## Future Updates

After the initial push, use these commands to update your repository:

```powershell
# Make changes to files
# ... edit code ...

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

## Common Commands

```powershell
# Check status
git status

# View commit history
git log --oneline

# View branches
git branch -a

# Create a new branch
git checkout -b feature/feature-name

# Switch to a branch
git checkout branch-name

# Merge branches
git merge branch-name
```

## Repository Structure for GitHub

Your repository includes:

```
├── README.md                 # Main documentation
├── DEPLOYMENT.md            # Deployment guide
├── QUICKSTART.md            # Quick start guide
├── docs/
│   └── architecture.md       # Architecture documentation
├── backend/
│   ├── src/                  # Backend source code
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/                  # Frontend source code
│   ├── package.json
│   └── README.md
└── .gitignore              # Git ignore file
```

## .env Files

**Important**: The `.env` file is included in `.gitignore` for security. If you need to share environment variables:

1. Create `.env.example` with template values
2. Commit `.env.example` to GitHub
3. Users can copy and customize it

Example `.env.example`:
```
PORT=5000
NODE_ENV=development
```

## Collaboration Tips

1. **Branching**: Create branches for features
   ```powershell
   git checkout -b feature/new-feature
   ```

2. **Pull Requests**: Use for code reviews
3. **Issues**: Report bugs and request features
4. **Discussions**: Use GitHub Discussions for questions

## Troubleshooting

### Push rejected

```powershell
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Wrong remote URL

```powershell
# Check current remote
git remote -v

# Change remote
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Authentication issues

- Make sure you're logged into GitHub CLI or have SSH keys set up
- Run: `gh auth login` for GitHub CLI authentication

## Next Steps

1. Push code to GitHub
2. Add the repository URL to your portfolio
3. Update README with live demo link (if deployed)
4. Add GitHub link to your resume
5. Share with potential employers

---

**For more help**, visit [GitHub Docs](https://docs.github.com)
