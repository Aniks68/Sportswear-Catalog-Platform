# Firebase Setup Guide for Jenaj Enterprise

This guide will help you set up Firebase for the Jenaj Enterprise sportswear catalog platform.

## Prerequisites

- A Google account
- Node.js and pnpm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `jenaj-enterprise` (or your preferred name)
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the web icon (</>) to add a web app
2. Register app with nickname: `Jenaj Enterprise Web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object - you'll need this next

## Step 3: Configure Firebase in Your Project

1. Open `src/lib/firebase.ts`
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 4: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database** in the left menu
2. Click "Create database"
3. Start in **Production mode** (we'll set up rules next)
4. Choose your Cloud Firestore location (select closest to your users)
5. Click "Enable"

### Set Up Firestore Security Rules

Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products and settings
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /settings/{settingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 5: Enable Firebase Authentication

1. In Firebase Console, go to **Authentication** in the left menu
2. Click "Get started"
3. Click on the "Sign-in method" tab
4. Enable **Email/Password** authentication
5. Click "Save"

### Create Admin User

1. Go to the **Users** tab in Authentication
2. Click "Add user"
3. Enter your admin email and password
4. Click "Add user"

**Important:** Use these credentials to log in to the admin panel!

## Step 6: Set Up Firestore Indexes (if needed)

If you get index errors when querying, Firebase will provide a direct link in the console error. Click it to automatically create the required index.

## Step 7: Initialize Sample Data (Optional)

You can manually add sample products through the admin panel, or use the Firebase Console:

1. Go to **Firestore Database**
2. Click "Start collection"
3. Collection ID: `products`
4. Add documents with these fields:
   - `name` (string)
   - `price` (number)
   - `description` (string)
   - `category` (string): one of "Shoes", "Jerseys", "Gym Wear", "Accessories"
   - `images` (array of base64 strings)
   - `isAvailable` (boolean)
   - `isFeatured` (boolean)
   - `sizes` (array of strings, optional)
   - `colors` (array of strings, optional)
   - `createdAt` (timestamp)

## Step 8: Configure WhatsApp Settings

1. Go to **Firestore Database**
2. Click "Start collection"
3. Collection ID: `settings`
4. Document ID: `general`
5. Add field:
   - `whatsappNumber` (string): e.g., "+2348012345678"

## Environment Variables (Optional)

For better security, you can move Firebase config to environment variables:

1. Create `.env` file in project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

2. Update `src/lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Testing Your Setup

1. Run the development server: `pnpm dev`
2. Visit the application
3. Try logging in at `/admin/login` with your Firebase admin credentials
4. Add a product with images through the admin panel
5. Verify the product appears on the homepage and products page

## Common Issues

### "Firebase: Error (auth/user-not-found)"
- Make sure you created an admin user in Firebase Authentication
- Double-check your email and password

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you're logged in as an authenticated user for admin operations

### Images not displaying
- Ensure images are under 5MB
- Check browser console for base64 encoding errors
- Verify image formats are JPG, PNG, GIF, or WebP

## Production Deployment

When deploying to production:

1. Update Firestore rules for stricter security
2. Use environment variables for Firebase config
3. Enable Firebase App Check for additional security
4. Set up Firebase Hosting (optional)
5. Configure custom domain in Firebase Hosting settings

## Support

For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
