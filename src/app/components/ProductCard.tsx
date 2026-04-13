import { Link } from 'react-router';
import { Product } from '../data/products';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden bg-muted mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 bg-black/80">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="font-bold">₦{product.price.toLocaleString()}</p>
        </div>
      </motion.div>
    </Link>
  );
}
