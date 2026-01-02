# Deploying to GitHub Pages

Since you prefer GitHub Pages, we have configured the app to work seamlessly with it.

## Prerequisites (Already Configured for You)
1.  **Router**: Switched to `HashRouter` (prevents "Page Not Found" errors on refresh).
2.  **Base URL**: Updated `vite.config.js` to point to `/Read-with-your-Crew-in-Kindle/`.
3.  **Scripts**: Added `predeploy` and `deploy` scripts to `package.json`.

## How to Deploy (1-Step)

To publish your app live, simply run this command in your terminal:

```bash
npm run deploy
```

### What happens next?
1.  Vite will build your project using `npm run build`.
2.  The `gh-pages` tool will take the resulting `dist` folder and push it to a `gh-pages` branch on GitHub.
3.  GitHub will detect this branch and serve your site.

### Accessing Your Site
After a few minutes, your site will be live at:
**[https://Pranavd0828.github.io/Read-with-your-Crew-in-Kindle](https://Pranavd0828.github.io/Read-with-your-Crew-in-Kindle)**

> Note: If you visit the link immediately, you might get a 404. It takes GitHub about 1-2 minutes to process the deployment.
