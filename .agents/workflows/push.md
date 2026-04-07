---
description: Push changes to GitHub and deploy to Firebase Hosting
---

This workflow automates the process of synchronizing the local codebase with the remote GitHub repository and deploying the latest build to Firebase Hosting.

// turbo-all
1. Stage all current changes
```powershell
git add .
```

2. Commit changes with a descriptive message
```powershell
git commit -m "refactor: simplify landing page and prepare for deployment"
```

3. Push to GitHub
```powershell
git push origin main
```

4. Deploy to Firebase Hosting
```powershell
firebase deploy --only hosting
```
