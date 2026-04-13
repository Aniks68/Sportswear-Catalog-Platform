import { useLocation } from 'react-router';

export default function Footer() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) return null;

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">JENAJ ENTERPRISE</h3>
            <p className="text-sm text-muted-foreground">
              Your destination for premium athletic wear and sports equipment.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Home</p>
              <p>Products</p>
              <p>Categories</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Order via WhatsApp for inquiries and purchases.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jenaj Enterprise. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
