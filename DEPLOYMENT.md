# Deployment Guide

This SvelteKit PWA can be deployed to any static hosting service. Here are the recommended options:

## Prerequisites

1. **Build the app**:
   ```bash
   npm run build
   ```
   This creates a `build/` directory with all static files.

2. **Test the build locally**:
   ```bash
   npm run preview
   ```
   Visit `http://localhost:4173` to verify everything works.

## Deployment Options

### Option 1: Netlify (Recommended - Easiest)

**Pros**: Free tier, automatic HTTPS, easy setup, great for PWAs

1. **Install Netlify CLI** (optional, but recommended):
   ```bash
   npm install -g netlify-cli
   ```

2. **Create a `netlify.toml` file** in the project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**:
   - **Via CLI**:
     ```bash
     netlify login
     netlify deploy --prod
     ```
   - **Via Drag & Drop**: 
     - Go to [app.netlify.com](https://app.netlify.com)
     - Drag the `build/` folder to the deploy area
   - **Via Git** (recommended for updates):
     - Connect your GitHub repo to Netlify
     - Netlify will auto-deploy on every push

**Note**: Netlify automatically provides HTTPS, which is required for PWAs.

---

### Option 2: Vercel

**Pros**: Free tier, automatic HTTPS, excellent performance, easy Git integration

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create a `vercel.json` file** (optional):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "build",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

3. **Deploy**:
   ```bash
   vercel login
   vercel --prod
   ```

   Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

---

### Option 3: GitHub Pages ✅ (Already Configured!)

**Pros**: Free, works with GitHub repos, automatic deployments

**Setup is already done!** Just follow these steps:

1. **Enable GitHub Pages** in your repo:
   - Go to Settings → Pages
   - Source: Select **GitHub Actions**
   - Click Save

2. **Push your code** (if you haven't already):
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to the **Actions** tab in your GitHub repo
   - Watch the "Deploy to GitHub Pages" workflow run
   - Your site will be live at: `https://kromoser.github.io/ppl-tracker/`

**See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for detailed instructions.**

---

### Option 4: Cloudflare Pages

**Pros**: Free, fast CDN, automatic HTTPS, great for PWAs

1. **Connect your GitHub repo** at [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Build settings**:
   - Build command: `npm run build`
   - Build output directory: `build`
   - Node version: `20`

3. **Deploy**: Cloudflare will automatically deploy on every push to your main branch.

---

### Option 5: Any Static Host

You can deploy the `build/` directory to:
- **AWS S3 + CloudFront**
- **Firebase Hosting**
- **Surge.sh** (simple CLI: `surge build/`)
- **Any web server** (Apache, Nginx, etc.)

## Important Notes for PWA Deployment

### 1. HTTPS is Required
PWAs require HTTPS. All the services above provide it automatically.

### 2. Service Worker Updates
After deployment, users may need to:
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Or clear cache and reload

### 3. Icons
Make sure to add PWA icons before deploying:
- `static/icons/icon-192.png` (192x192)
- `static/icons/icon-512.png` (512x512)

You can generate these using:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

### 4. Testing After Deployment
1. Visit your deployed site
2. Open DevTools → Application → Service Workers
3. Verify the service worker is registered
4. Test offline functionality
5. Try installing as PWA (Chrome: address bar → install icon)

## Quick Start (Netlify - Easiest)

```bash
# 1. Build the app
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Login and deploy
netlify login
netlify deploy --prod --dir=build
```

That's it! You'll get a URL like `https://your-app-name.netlify.app`

## Updating the App

After making changes:

1. **Build again**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - If using CLI: `netlify deploy --prod --dir=build` (or `vercel --prod`)
   - If using Git integration: Just push to your repo (auto-deploys)

3. **Users will get updates**:
   - Service worker will auto-update
   - Users may need to refresh to see changes

## Custom Domain

All hosting services allow custom domains:
- **Netlify**: Domain settings → Add custom domain
- **Vercel**: Project settings → Domains
- **Cloudflare Pages**: Custom domains tab

## Recommended: Netlify

For this PWA, I recommend **Netlify** because:
- ✅ Easiest setup
- ✅ Free tier is generous
- ✅ Automatic HTTPS
- ✅ Great PWA support
- ✅ Easy custom domains
- ✅ Git integration for auto-deploys
