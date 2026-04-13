# Jenaj Enterprise - Sportswear Catalog Platform

A modern, responsive web platform for showcasing sportswear products with WhatsApp integration for customer inquiries.

## Features

### Customer-Facing
- 🏠 **Homepage** with hero section, featured products, and category navigation
- 🛍️ **Product Catalog** with advanced filtering (category, price, availability)
- 🔍 **Product Details** with image carousel, size/color selection
- 📱 **WhatsApp Integration** for instant purchase inquiries
- 🌓 **Dark Mode** toggle for comfortable viewing
- 📱 **Fully Responsive** design for all devices

### Admin Panel
- 🔐 **Secure Authentication** via Firebase
- 📊 **Dashboard** with product statistics
- ➕ **Product Management** (Create, Read, Update, Delete)
- 🖼️ **Image Upload** with blob storage in Firestore
- ⚙️ **Settings** for WhatsApp number configuration
- 📱 **Real-time Updates** across all connected clients

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router 7
- **Styling:** Tailwind CSS v4
- **Animations:** Motion (Framer Motion)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Icons:** Lucide React
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Firebase account

### Installation

1. **Clone or download the project**

2. **Install dependencies:**
```bash
pnpm install
```

3. **Set up Firebase:**
   - Follow the detailed instructions in `FIREBASE_SETUP.md`
   - Create a Firebase project
   - Enable Firestore and Authentication
   - Configure Firebase in `src/lib/firebase.ts`

4. **Run the development server:**
```bash
pnpm dev
```

5. **Open your browser:**
   - The app will be running (check your terminal for the URL)

## Firebase Configuration

Before running the application, you **must** configure Firebase:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database and Authentication (Email/Password)
3. Update `src/lib/firebase.ts` with your Firebase configuration
4. Create an admin user in Firebase Authentication
5. See `FIREBASE_SETUP.md` for detailed step-by-step instructions

## Project Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.tsx     # Navigation header with dark mode
│   │   ├── Footer.tsx     # Site footer
│   │   ├── ProductCard.tsx
│   │   └── AdminLayout.tsx
│   ├── context/           # React context providers
│   │   └── AppContext.tsx # Global state management
│   ├── data/              # Data types and mock data
│   │   └── products.ts
│   ├── pages/             # Route components
│   │   ├── Home.tsx
│   │   ├── ProductListing.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── admin/         # Admin panel pages
│   │   └── NotFound.tsx
│   ├── routes.tsx         # Route configuration
│   └── App.tsx           # Root component
├── lib/
│   ├── firebase.ts       # Firebase initialization
│   └── imageUtils.ts     # Image processing utilities
├── services/             # Firebase service layer
│   ├── productService.ts # Product CRUD operations
│   ├── settingsService.ts # Settings management
│   └── authService.ts    # Authentication
└── styles/              # Global styles and themes

## Admin Access

1. Navigate to `/admin/login`
2. Use the credentials you created in Firebase Authentication
3. Access the admin dashboard to:
   - View product statistics
   - Add new products with image uploads
   - Edit existing products
   - Delete products
   - Configure WhatsApp number

## Image Upload

The platform stores product images as base64-encoded strings in Firestore:

- **Format:** JPG, PNG, GIF, or WebP
- **Size Limit:** 5MB per image
- **Multiple Images:** Upload multiple images per product
- **Storage:** Images are stored as base64 strings in the Firestore document

## WhatsApp Integration

When customers click "Order via WhatsApp":
1. A pre-filled message is generated with product details
2. They're redirected to WhatsApp Web/App
3. The message includes product name, price, and link
4. Configure the WhatsApp number in Admin → Settings

## Dark Mode

Dark mode is available throughout the application:
- Toggle via the moon/sun icon in the header
- Preference is saved to localStorage
- Applies to all pages including admin panel

## Customization

### Branding
- Update company name in `Header.tsx` and `Footer.tsx`
- Modify logo/icon in `Header.tsx`

### Categories
- Edit categories in `src/app/data/products.ts`

### Colors & Styling
- Modify theme in `src/styles/theme.css`
- Tailwind configuration in `tailwind.config.js`

### WhatsApp Message Template
- Edit in `src/app/pages/ProductDetail.tsx` (handleWhatsAppOrder function)

## Build for Production

```bash
pnpm build
```

The build output will be in the `dist/` directory.

## Deployment

### Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Deploy
firebase deploy
```

### Other Platforms

The app can also be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

Make sure to set up environment variables for Firebase configuration if using environment-based config.

## Security Considerations

- ✅ Firebase Authentication protects admin routes
- ✅ Firestore security rules control data access
- ✅ Images are validated before upload (size, type)
- ✅ Admin credentials never stored in frontend code
- ⚠️ Remember to update Firestore security rules for production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for Jenaj Enterprise.

## Support

For issues or questions:
1. Check `FIREBASE_SETUP.md` for configuration issues
2. Verify Firebase console settings
3. Check browser console for errors
