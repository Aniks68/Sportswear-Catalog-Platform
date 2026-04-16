import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/products';
import { SlidersHorizontal } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductListing() {
  const { products, loading } = useApp();

  if (loading) {
    return <LoadingSpinner />;
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const availabilityMatch = !showAvailableOnly || product.isAvailable;
      return categoryMatch && priceMatch && availabilityMatch;
    });
  }, [products, selectedCategory, priceRange, showAvailableOnly]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const FilterSection = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold mb-4">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === 'All'}
              onChange={() => handleCategoryChange('All')}
              className="w-4 h-4"
            />
            <span>All Products</span>
          </label>
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full px-3 py-2 bg-input-background border border-border rounded"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full px-3 py-2 bg-input-background border border-border rounded"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={e => setShowAvailableOnly(e.target.checked)}
            className="w-4 h-4"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg"
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Filters Overlay */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-background p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)} className="text-2xl">×</button>
                </div>
                <FilterSection />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
