# Troubleshooting Build Failures

## Common Build Issues

### 1. Missing Icons Error

**Error**: `Cannot find icon file` or similar

**Solution**: The workflow now automatically creates placeholder icons. If you want real icons:

1. Create or download icons (192x192 and 512x512 PNG)
2. Place them in `static/icons/`:
   - `icon-192.png`
   - `icon-512.png`
3. Commit and push

### 2. TypeScript Errors

**Error**: TypeScript compilation errors

**Solution**: 
```bash
npm run check
```
Fix any TypeScript errors before pushing.

### 3. Missing Dependencies

**Error**: `Cannot find module` or `package not found`

**Solution**:
```bash
npm install
git add package-lock.json
git commit -m "Add package-lock.json"
git push
```

### 4. SvelteKit Sync Issues

**Error**: `.svelte-kit` related errors

**Solution**: The workflow now runs `svelte-kit sync` automatically. If issues persist:
```bash
rm -rf .svelte-kit
npm run build
```

### 5. Base Path Issues

**Error**: 404 errors or assets not loading

**Solution**: Verify the base path in `svelte.config.js` matches your repo name:
```js
paths: {
  base: '/ppl-tracker'  // Should match your GitHub repo name
}
```

## Getting More Information

If the build still fails:

1. **Check the Actions log**: 
   - Go to your repo → Actions tab
   - Click on the failed workflow
   - Expand the "Build" step to see the full error

2. **Test locally**:
   ```bash
   GITHUB_PAGES=true npm run build
   ```

3. **Check for common issues**:
   - Missing files in `static/`
   - Import errors in components
   - TypeScript errors
   - Missing environment variables

## Quick Fixes

### Reset and Rebuild
```bash
rm -rf node_modules .svelte-kit build
npm install
npm run build
```

### Verify Configuration
```bash
# Check Node version (should be 20+)
node -v

# Check if build works locally
npm run build

# Check if preview works
npm run preview
```

## Still Having Issues?

1. Check the full error message in GitHub Actions
2. Try building locally with: `GITHUB_PAGES=true npm run build`
3. Share the error message for more specific help
