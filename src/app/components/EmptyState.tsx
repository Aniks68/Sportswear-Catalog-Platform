import { Link } from 'react-router';
import { Package, Plus } from 'lucide-react';

interface EmptyStateProps {
  isAdmin?: boolean;
}

export default function EmptyState({ isAdmin = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-muted/50 p-6 rounded-full mb-6">
        <Package className="w-16 h-16 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No Products Yet</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {isAdmin
          ? "Get started by adding your first product to the catalog."
          : "Check back soon! New products will be added shortly."}
      </p>
      {isAdmin && (
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add First Product
        </Link>
      )}
    </div>
  );
}
