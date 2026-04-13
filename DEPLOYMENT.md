# Deployment Guide - Jenaj Enterprise

This guide covers deploying your Jenaj Enterprise platform to production.

## Pre-Deployment Checklist

- [ ] Firebase project created and configured
- [ ] Firestore security rules updated for production
- [ ] Firebase Authentication enabled
- [ ] Admin user created in Firebase
- [ ] WhatsApp number configured
- [ ] Test all features locally
- [ ] Environment variables configured (if using)

## Option 1: Firebase Hosting (Recommended)

Firebase Hosting provides fast, secure hosting with automatic SSL certificates.

### Initial Setup

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase:**
```bash
firebase login
```

3. **Initialize Firebase in your project:**
```bash
firebase init hosting
```

When prompted:
- Select your existing Firebase project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds with GitHub: Optional
- Don't overwrite `dist/index.html` if asked

### Build and Deploy

1. **Build the production version:**
```bash
pnpm build
```

2. **Test locally (optional):**
```bash
firebase serve
```

3. **Deploy to Firebase Hosting:**
```bash
firebase deploy --only hosting
```

### Custom Domain Setup

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the instructions to:
   - Verify domain ownership
   - Add DNS records
4. SSL certificate will be provisioned automatically

### Continuous Deployment with GitHub Actions

Create `.github/workflows/firebase-hosting.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

## Option 2: Vercel

Vercel offers excellent performance with automatic deployments from Git.

### Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow the prompts** to link your project

4. **Set environment variables:**
```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

### Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Set environment variables in project settings
4. Deploy

## Option 3: Netlify

Netlify provides similar features to Vercel with easy setup.

### Deploy via Netlify CLI

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Build the project:**
```bash
pnpm build
```

3. **Deploy:**
```bash
netlify deploy --prod
```

### Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your Git repository for automatic deployments

### Configure Build Settings

- Build command: `pnpm build`
- Publish directory: `dist`
- Add environment variables in Site settings → Environment variables

## Option 4: Cloudflare Pages

Fast global CDN with automatic builds from Git.

1. Go to Cloudflare Pages dashboard
2. Connect your Git repository
3. Set build settings:
   - Build command: `pnpm build`
   - Build output directory: `dist`
4. Add environment variables
5. Deploy

## Production Firestore Security Rules

Update your Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Products collection
    match /products/{productId} {
      // Anyone can read products
      allow read: if true;
      
      // Only authenticated users can write
      allow create, update, delete: if request.auth != null;
      
      // Validate product data structure
      allow create, update: if request.resource.data.keys().hasAll([
        'name', 'price', 'description', 'category', 'images', 
        'isAvailable', 'createdAt'
      ]) 
      && request.resource.data.price is number
      && request.resource.data.price >= 0
      && request.resource.data.images is list
      && request.resource.data.images.size() > 0;
    }
    
    // Settings collection
    match /settings/{settingId} {
      // Anyone can read settings
      allow read: if true;
      
      // Only authenticated users can write
      allow write: if request.auth != null;
    }
  }
}
```

## Performance Optimization

### 1. Enable Firestore Caching

Already enabled in the Firebase SDK configuration.

### 2. Image Optimization

Consider these optimizations:
- Compress images before upload (client-side or server-side)
- Use WebP format when possible
- Implement lazy loading for product images
- Set maximum image dimensions

### 3. Code Splitting

Already handled by Vite, but you can optimize further:
- Lazy load admin routes
- Separate vendor chunks

### 4. CDN Configuration

Most hosting platforms provide CDN by default. For custom setups:
- Set cache headers for static assets
- Enable gzip/brotli compression
- Use HTTP/2

## Monitoring & Analytics

### Firebase Analytics

Add to `src/lib/firebase.ts`:

```typescript
import { getAnalytics } from 'firebase/analytics';

export const analytics = getAnalytics(app);
```

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Firebase Crashlytics

## Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use platform-specific secret management
   - Rotate credentials regularly

2. **Firestore:**
   - Implement strict security rules
   - Validate all inputs
   - Limit query sizes

3. **Authentication:**
   - Enable email verification (optional)
   - Implement password requirements
   - Add rate limiting for login attempts

4. **Firebase App Check:**
   - Enable App Check for production
   - Protects against unauthorized access

## Post-Deployment

1. **Test the production site:**
   - Create a test product
   - Test WhatsApp integration
   - Verify admin login
   - Check dark mode
   - Test on mobile devices

2. **Set up monitoring:**
   - Enable Firebase monitoring
   - Set up uptime checks
   - Configure error alerts

3. **Documentation:**
   - Document your deployment process
   - Keep track of environment variables
   - Note any custom configurations

## Troubleshooting

### Build Failures

- Check Node.js version (18+)
- Clear `node_modules` and reinstall
- Verify all dependencies are installed

### Firebase Connection Issues

- Verify Firebase config is correct
- Check Firestore security rules
- Ensure Firebase services are enabled

### 404 Errors on Refresh

- Configure hosting for SPA routing
- Firebase Hosting: Already configured with `firebase.json`
- Netlify: Add `_redirects` file:
  ```
  /* /index.html 200
  ```
- Vercel: Add `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

## Scaling Considerations

As your platform grows:

1. **Firestore:**
   - Monitor read/write quotas
   - Implement pagination for large datasets
   - Consider composite indexes for complex queries

2. **Images:**
   - Consider migrating to Firebase Storage
   - Implement image resizing
   - Use CDN for image delivery

3. **Authentication:**
   - Monitor active users
   - Implement session management
   - Consider multi-factor authentication

## Support

For deployment issues:
- Check hosting provider documentation
- Review Firebase Console logs
- Check browser console for errors
