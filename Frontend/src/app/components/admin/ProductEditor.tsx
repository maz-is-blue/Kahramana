import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

export function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    // Basic Info
    name: isEditing ? 'Oud Royal' : '',
    nameAr: isEditing ? 'عود ملكي' : '',
    category: isEditing ? 'Oud' : '',
    price: isEditing ? '349' : '',
    
    // Description
    description: isEditing ? 'An opulent composition celebrating the richness of Cambodian oud.' : '',
    descriptionAr: isEditing ? 'تركيبة فاخرة تحتفي بغنى العود الكمبودي.' : '',
    
    // Notes
    topNotes: isEditing ? 'Saffron, Rose, Bergamot' : '',
    heartNotes: isEditing ? 'Cambodian Oud, Jasmine, Patchouli' : '',
    baseNotes: isEditing ? 'Amber, White Musk, Sandalwood' : '',
    
    // Details
    perfumer: isEditing ? 'Layla Al-Rashid' : '',
    year: isEditing ? '2025' : '',
    concentration: isEditing ? '20-30% Parfum' : '',
    
    // Inventory
    sizes: isEditing ? ['30ml', '50ml', '100ml'] : [],
    stock: isEditing ? '45' : '',
    
    // Images
    mainImage: '',
    additionalImages: [],
    
    // Status
    status: isEditing ? 'active' : 'draft',
    featured: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would send data to your backend:
    // const response = await fetch('/api/products', {
    //   method: isEditing ? 'PUT' : 'POST',
    //   body: JSON.stringify(formData)
    // });

    console.log('Product data:', formData);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="p-2 hover:bg-[#FAF7F1] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-display">{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
            <p className="text-[#6B6B6B]">{isEditing ? 'Update product information' : 'Create a new perfume artwork'}</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Saving...' : 'Save Product'}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-2xl font-display mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Product Name (English) *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Oud Royal"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Product Name (Arabic) *
                </label>
                <input
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleChange}
                  required
                  placeholder="عود ملكي"
                  dir="rtl"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors font-arabic"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Oud">Oud</option>
                  <option value="Amber">Amber</option>
                  <option value="Musk">Musk</option>
                  <option value="Floral">Floral</option>
                  <option value="Spicy">Spicy</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Base Price (USD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="349"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-2xl font-display mb-6">Description</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Description (English) *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="An opulent composition celebrating the richness of Cambodian oud..."
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Description (Arabic) *
                </label>
                <textarea
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={handleChange}
                  required
                  rows={4}
                  dir="rtl"
                  placeholder="تركيبة فاخرة تحتفي بغنى العود الكمبودي..."
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors resize-none font-arabic"
                />
              </div>
            </div>
          </motion.div>

          {/* Scent Composition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-2xl font-display mb-6">Scent Composition</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Top Notes *
                </label>
                <input
                  type="text"
                  name="topNotes"
                  value={formData.topNotes}
                  onChange={handleChange}
                  required
                  placeholder="Saffron, Rose, Bergamot"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
                <p className="text-xs text-[#A0A0A0] mt-1">Separate notes with commas</p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Heart Notes *
                </label>
                <input
                  type="text"
                  name="heartNotes"
                  value={formData.heartNotes}
                  onChange={handleChange}
                  required
                  placeholder="Cambodian Oud, Jasmine, Patchouli"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Base Notes *
                </label>
                <input
                  type="text"
                  name="baseNotes"
                  value={formData.baseNotes}
                  onChange={handleChange}
                  required
                  placeholder="Amber, White Musk, Sandalwood"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-2xl font-display mb-6">Product Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Perfumer
                </label>
                <input
                  type="text"
                  name="perfumer"
                  value={formData.perfumer}
                  onChange={handleChange}
                  placeholder="Layla Al-Rashid"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2025"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Concentration
                </label>
                <input
                  type="text"
                  name="concentration"
                  value={formData.concentration}
                  onChange={handleChange}
                  placeholder="20-30% Parfum"
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-xl font-display mb-6">Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                  Product Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors bg-white"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-[#EC4899] border-[#E8E5E0] rounded focus:ring-[#EC4899]"
                />
                <span className="text-sm">Featured Product</span>
              </label>
            </div>
          </motion.div>

          {/* Sizes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-xl font-display mb-6">Available Sizes</h2>
            <div className="space-y-3">
              {['30ml', '50ml', '100ml'].map(size => (
                <label key={size} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                    className="w-5 h-5 text-[#EC4899] border-[#E8E5E0] rounded focus:ring-[#EC4899]"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-xl font-display mb-6">Inventory</h2>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#6B6B6B] mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="45"
                className="w-full px-4 py-3 border-2 border-[#E8E5E0] focus:border-[#EC4899] focus:outline-none transition-colors"
              />
            </div>
          </motion.div>

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-2 border-[#E8E5E0] p-6"
          >
            <h2 className="text-xl font-display mb-6">Product Image</h2>
            <div className="border-2 border-dashed border-[#E8E5E0] p-8 text-center hover:border-[#EC4899] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#A0A0A0]" />
              <p className="text-sm text-[#6B6B6B] mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-[#A0A0A0]">PNG, JPG up to 10MB</p>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </motion.div>
        </div>
      </div>
    </form>
  );
}