import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useProducts } from '@/app/context/ProductsContext';
import { productsAPI } from '@/app/services/api';
import { toast } from 'sonner';

export function ProductsManagement() {
  const { products, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getStatus = (stock: number) => {
    if (stock === 0) return 'out-of-stock';
    if (stock <= 10) return 'low-stock';
    return 'active';
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameAr.includes(searchQuery) ||
      (product.slug || '').includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(productId);
    try {
      await productsAPI.delete(productId);
      toast.success('Product deleted');
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const categories = [...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#EC4899] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display mb-2">Products</h1>
          <p className="text-[#6B6B6B]">Manage your perfume collection</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-2 border-[#E8E5E0] p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or Arabic name..."
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0A0]" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors bg-white appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E8E5E0]">
          <div>
            <p className="text-2xl font-display">{products.length}</p>
            <p className="text-xs text-[#6B6B6B]">Total Products</p>
          </div>
          <div>
            <p className="text-2xl font-display text-green-600">{products.filter((p) => getStatus(p.stock) === 'active').length}</p>
            <p className="text-xs text-[#6B6B6B]">Active</p>
          </div>
          <div>
            <p className="text-2xl font-display text-yellow-600">{products.filter((p) => getStatus(p.stock) === 'low-stock').length}</p>
            <p className="text-xs text-[#6B6B6B]">Low Stock</p>
          </div>
          <div>
            <p className="text-2xl font-display text-red-600">{products.filter((p) => getStatus(p.stock) === 'out-of-stock').length}</p>
            <p className="text-xs text-[#6B6B6B]">Out of Stock</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => {
          const status = getStatus(product.stock);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border-2 border-[#E8E5E0] hover:shadow-lg transition-shadow group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F1]">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    status === 'active' ? 'bg-green-100 text-green-700' :
                    status === 'low-stock' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {status === 'active' ? 'Active' : status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-[#101010]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Link to={`/product/${product.id}`} target="_blank"
                    className="p-3 bg-white rounded-full hover:bg-[#FAF7F1] transition-colors">
                    <Eye className="w-5 h-5" />
                  </Link>
                  <Link to={`/admin/products/${product._id}/edit`}
                    className="p-3 bg-white rounded-full hover:bg-[#FAF7F1] transition-colors">
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id || product.id)}
                    disabled={deletingId === product.id}
                    className="p-3 bg-white rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-display mb-1">{product.name}</h3>
                  <p className="text-sm text-[#6B6B6B] font-arabic">{product.nameAr}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#FAF7F1] text-xs text-[#6B6B6B]">{product.category}</span>
                  <span className="px-2 py-1 border border-[#E8E5E0] text-xs">{product.size || '50ml'}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#E8E5E0]">
                  <div>
                    <p className="text-2xl font-display">${product.price}</p>
                    <p className="text-xs text-[#6B6B6B]">Stock: {product.stock}</p>
                  </div>
                  <Link
                    to={`/admin/products/${product._id}/edit`}
                    className="px-4 py-2 border-2 border-[#E8E5E0] hover:border-[#EC4899] hover:text-[#EC4899] text-sm font-medium transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white border-2 border-[#E8E5E0]">
          <p className="text-[#6B6B6B] mb-4">No products found matching your criteria</p>
          <button onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
            className="text-[#EC4899] hover:text-[#A855F7]">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
