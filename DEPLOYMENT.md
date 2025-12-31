# Deploying WCIE to Netlify

## Quick Fix for "Bad Request" Error

The error was likely caused by:
1. Missing TypeScript configuration files
2. Incomplete build settings in netlify.toml
3. Node version mismatch

**All issues have been fixed!**

## Prerequisites
- GitHub account
- Netlify account (free tier works)
- Google Maps API key: `AIzaSyBn0N5UdlZ6ix8QPUh2D_WlJF0uD6DIj8s`

## Step-by-Step Deployment

### 1. Test Build Locally (Important!)
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# If successful, you should see a 'dist' folder
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Fix Netlify deployment configuration"
git push origin main
```

### 3. Deploy on Netlify

#### Option A: Via Netlify Dashboard (Recommended)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your WCIE repository
5. Build settings (auto-detected from netlify.toml):
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18.17.0
6. Click "Show advanced" → "New variable"
   - **Key**: `VITE_GOOGLE_MAPS_API_KEY`
   - **Value**: `AIzaSyBn0N5UdlZ6ix8QPUh2D_WlJF0uD6DIj8s`
7. Click "Deploy site"

#### Option B: Via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### 4. Verify Deployment

Once deployed, check:
- ✅ Site loads without errors
- ✅ All routes work (landing, results, details, profile)
- ✅ Google Maps displays correctly
- ✅ Geolocation works
- ✅ Dark/light mode toggle works

## Environment Variables

**Required:**
- `VITE_GOOGLE_MAPS_API_KEY` = `AIzaSyBn0N5UdlZ6ix8QPUh2D_WlJF0uD6DIj8s`

**How to add in Netlify:**
1. Site settings → Environment variables
2. Click "Add a variable"
3. Enter key and value
4. Click "Create variable"
5. Trigger a new deploy

## Troubleshooting

### Build Still Fails?
1. Check build logs in Netlify dashboard
2. Look for TypeScript errors
3. Verify all imports are correct
4. Check for missing dependencies

### Environment Variable Not Working?
1. Ensure it starts with `VITE_`
2. Redeploy after adding (automatic)
3. Clear cache: Site settings → Build & deploy → Clear cache

### Routes Return 404?
- The `netlify.toml` redirect rule handles this
- Ensure the file is committed to Git

### Google Maps Not Loading?
1. Verify API key in environment variables
2. Check browser console for errors
3. Ensure API key has Places API enabled

## Performance Optimization

The build is configured with:
- Code splitting for React and UI vendors
- No source maps in production
- Optimized chunk sizes

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. SSL certificate auto-provisions

## Monitoring

- **Build logs**: Deploys tab
- **Function logs**: Functions tab
- **Real-time logs**: `netlify dev` locally

## Support Resources

- [Netlify Docs](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
