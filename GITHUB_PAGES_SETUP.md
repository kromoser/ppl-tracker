# GitHub Pages Deployment Setup

Follow these steps to deploy your PPL Tracker app to GitHub Pages.

## Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/kromoser/ppl-tracker`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Click **Save**

## Step 2: Push Your Code

The GitHub Actions workflow will automatically deploy when you push to the `main` or `master` branch:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

## Step 3: Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Once green, your site will be live!

## Step 4: Access Your Site

Your app will be available at:
```
https://kromoser.github.io/ppl-tracker/
```

## Important Notes

### Base Path Configuration

The app is configured with base path `/ppl-tracker`. If your repository name is different, update `svelte.config.js`:

```js
paths: {
  base: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true' 
    ? '/your-repo-name'  // Change this
    : ''
}
```

### Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow**

### Updating the App

Every time you push to `main`/`master`, the app will automatically rebuild and redeploy. No manual steps needed!

### Troubleshooting

**Build fails?**
- Check the Actions tab for error messages
- Ensure Node.js 20+ is available (workflow uses Node 20)
- Verify all dependencies are in `package.json`

**404 errors?**
- Make sure the base path in `svelte.config.js` matches your repo name
- Check that GitHub Pages is enabled and using GitHub Actions as source

**Service worker not working?**
- GitHub Pages provides HTTPS automatically
- Clear browser cache and hard refresh (Ctrl+Shift+R)

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `static/` directory with your domain:
   ```
   yourdomain.com
   ```

2. Update your DNS settings to point to GitHub Pages:
   - Add a CNAME record: `yourdomain.com` → `kromoser.github.io`

3. In GitHub repo Settings → Pages, add your custom domain

## Local Testing

To test the production build locally with the GitHub Pages base path:

```bash
# Build with GitHub Pages base path
GITHUB_PAGES=true npm run build

# Preview
npm run preview
```

Visit `http://localhost:4173/ppl-tracker/` to see how it will look on GitHub Pages.
