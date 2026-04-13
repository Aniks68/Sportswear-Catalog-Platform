import { AlertCircle, ExternalLink } from 'lucide-react';

export default function FirebaseSetupNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/20">
      <div className="max-w-2xl w-full bg-background border-2 border-yellow-500 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full flex-shrink-0">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Firebase Setup Required</h1>
            <p className="text-muted-foreground mb-6">
              This application requires Firebase configuration to function. Please follow the setup instructions to get started.
            </p>

            <div className="bg-muted p-4 rounded mb-6">
              <h2 className="font-bold mb-2">Quick Setup Steps:</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Create a Firebase project at console.firebase.google.com</li>
                <li>Enable Firestore Database and Authentication</li>
                <li>Copy your Firebase config to src/lib/firebase.ts</li>
                <li>Create an admin user in Firebase Authentication</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:bg-primary/90 transition-colors"
              >
                Open Firebase Console
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="/FIREBASE_SETUP.md"
                className="inline-flex items-center justify-center gap-2 border-2 border-border px-6 py-3 rounded font-medium hover:bg-secondary transition-colors"
              >
                View Setup Guide
              </a>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> After configuring Firebase, refresh this page to start using the application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
