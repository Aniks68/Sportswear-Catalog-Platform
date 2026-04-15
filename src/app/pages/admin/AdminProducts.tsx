import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import AdminLayout from '../../components/AdminLayout';
import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Product } from '../../data/products';
import { categories } from '../../data/products';
import { deleteMultipleImages, uploadMultipleImages } from '../../../lib/imageUtils';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: categories[0],
    images: [] as string[],
    isAvailable: true,
    isFeatured: false,
    sizes: '',
    colors: '',
  });
  const [uploadError, setUploadError] = useState('');

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        images: product.images || [],
        isAvailable: product.isAvailable,
        isFeatured: product.isFeatured || false,
        sizes: product.sizes?.join(', ') || '',
        colors: product.colors?.join(', ') || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: categories[0],
        images: [],
        isAvailable: true,
        isFeatured: false,
        sizes: '',
        colors: '',
      });
    }

    setSelectedFiles([]);
    setUploadError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setSelectedFiles([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSelectedFiles(prev => [...prev, ...Array.from(files)]);
  };

  const removeImage = async (index: number) => {
    const imageToDelete = formData.images[index];

    try {
      await deleteMultipleImages([imageToDelete]);

      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));

    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  try {
    let imageUrls: string[] = [...formData.images];

    // =========================
    // 🟢 EDIT FLOW
    // =========================
    if (editingProduct) {
      const productId = editingProduct.id;

      // Upload new images (if any)
      if (selectedFiles.length > 0) {
        const uploadedUrls = await uploadMultipleImages(
          selectedFiles,
          productId
        );

        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      if (imageUrls.length === 0) {
        setUploadError('Please upload at least one product image');
        return;
      }

      const updatedProductData = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        images: imageUrls,
        isAvailable: formData.isAvailable,
        isFeatured: formData.isFeatured,
        sizes: formData.sizes
          ? formData.sizes.split(',').map(s => s.trim())
          : undefined,
        colors: formData.colors
          ? formData.colors.split(',').map(c => c.trim())
          : undefined,
      };

      await updateProduct(productId, updatedProductData);
    } else {
      const baseProductData = {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        category: formData.category,
        images: [], // 🔥 initially empty
        isAvailable: formData.isAvailable,
        isFeatured: formData.isFeatured,
        sizes: formData.sizes
          ? formData.sizes.split(',').map(s => s.trim())
          : undefined,
        colors: formData.colors
          ? formData.colors.split(',').map(c => c.trim())
          : undefined,
      };

      // 1. Create product FIRST
      const productId = await addProduct(baseProductData);

      // 2. Upload images using REAL product ID
      if (selectedFiles.length > 0) {
        imageUrls = await uploadMultipleImages(
          selectedFiles,
          productId
        );
      }

    // =========================
    // 🔵 CREATE FLOW (PERFECT VERSION)
    // =========================

      if (imageUrls.length === 0) {
        setUploadError('Please upload at least one product image');
        return;
      }

      // 3. Update product with image URLs
      await updateProduct(productId, {
        ...baseProductData,
        images: imageUrls,
      });
    }

    handleCloseModal();

  } catch (error: any) {
    console.error("Upload error:", error);
    setUploadError(error?.message || "Error saving product");
  }
};

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const product = products.find(p => p.id === id);

      if (!product) return;

      // 🔥 Step 1: Delete images from Firebase Storage
      if (product.images && product.images.length > 0) {
        await deleteMultipleImages(product.images);
      }

      // 🔥 Step 2: Delete product from Firestore
      await deleteProduct(id);

    } catch (error) {
      console.error("Delete error:", error);
      alert('Error deleting product. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>

        <div className="bg-background border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/30">
                <tr>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Price</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Featured</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{product.category}</td>
                    <td className="p-4">₦{product.price.toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          product.isAvailable
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.isAvailable ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      {product.isFeatured && (
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                          aria-label="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={handleCloseModal} className="p-1 hover:bg-secondary rounded">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Price (₦)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded h-24"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Product Images</label>
                <div className="border-2 border-dashed border-border rounded p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer py-4"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">Click to upload images</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, GIF, or WebP (Max 5MB each)
                    </span>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {uploadError && (
                  <p className="text-sm text-destructive mt-2">{uploadError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Sizes (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={e => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded"
                    placeholder="S, M, L, XL"
                  />
                </div>

                <div>
                  <label className="block mb-2">Colors (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={e => setFormData({ ...formData, colors: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded"
                    placeholder="Black, White, Red"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 font-bold hover:bg-primary/90 transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-8 py-3 border border-border hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
