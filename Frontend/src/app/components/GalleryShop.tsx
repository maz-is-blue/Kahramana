import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArtworkCard } from '@/app/components/ArtworkCard';
import { SlidersHorizontal, X } from 'lucide-react';

export function GalleryShop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNote, setSelectedNote] = useState('all');
  const [selectedIntensity, setSelectedIntensity] = useState('all');

  const products = [
    {
      id: 'amber-nights',
      name: 'Amber Nights',
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Eau de Parfum',
      notes: ['Amber', 'Vanilla', 'Tobacco'],
      isNew: true,
      category: 'amber',
      intensity: 'strong',
    },
    {
      id: 'oud-royal',
      name: 'Oud Royal',
      nameAr: 'عود ملكي',
      price: 349,
      image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2025',
      concentration: 'Parfum',
      notes: ['Oud', 'Rose', 'Saffron'],
      category: 'oud',
      intensity: 'strong',
    },
    {
      id: 'rose-mystique',
      name: 'Rose Mystique',
      nameAr: 'الوردة الغامضة',
      price: 279,
      image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Eau de Parfum',
      notes: ['Rose', 'Jasmine', 'Musk'],
      category: 'floral',
      intensity: 'moderate',
    },
    {
      id: 'musk-noir',
      name: 'Musk Noir',
      nameAr: 'المسك الأسود',
      price: 319,
      image: 'https://images.unsplash.com/photo-1729101807924-3446ca9aa480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2025',
      concentration: 'Eau de Parfum',
      notes: ['Musk', 'Patchouli', 'Vetiver'],
      category: 'musk',
      intensity: 'moderate',
    },
    {
      id: 'saffron-gold',
      name: 'Saffron Gold',
      nameAr: 'الزعفران الذهبي',
      price: 329,
      image: 'https://images.unsplash.com/photo-1749497636434-82e53b6358b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Parfum',
      notes: ['Saffron', 'Leather', 'Amber'],
      isNew: true,
      category: 'spicy',
      intensity: 'strong',
    },
    {
      id: 'white-lotus',
      name: 'White Lotus',
      nameAr: 'اللوتس الأبيض',
      price: 269,
      image: 'https://images.unsplash.com/photo-1664470740442-f5de3e512e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Eau de Toilette',
      notes: ['Lotus', 'Water Notes', 'White Musk'],
      category: 'floral',
      intensity: 'light',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Artworks' },
    { id: 'oud', name: 'Oud' },
    { id: 'amber', name: 'Amber' },
    { id: 'musk', name: 'Musk' },
    { id: 'floral', name: 'Floral' },
    { id: 'spicy', name: 'Spicy' },
  ];

  const notes = [
    { id: 'all', name: 'All Notes' },
    { id: 'oud', name: 'Oud' },
    { id: 'amber', name: 'Amber' },
    { id: 'rose', name: 'Rose' },
    { id: 'musk', name: 'Musk' },
  ];

  const intensities = [
    { id: 'all', name: 'All' },
    { id: 'light', name: 'Light' },
    { id: 'moderate', name: 'Moderate' },
    { id: 'strong', name: 'Strong' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Gallery</p>
          <h1 className="text-5xl lg:text-7xl font-display text-[#101010] mb-4">The Collection</h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl">
            A curated selection of our finest fragrance artworks
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="mb-12 pb-8 border-b border-[#E8E5E0]">
          <div className="flex flex-wrap items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E8E5E0] text-[#101010] hover:border-[#101010] transition-colors text-sm"
            >
              <SlidersHorizontal size={16} />
              <span className="text-xs tracking-wider uppercase">Filter</span>
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-8 flex-wrap">
              {/* Category */}
              <div className="flex items-center gap-3">
                <label className="text-xs tracking-wider uppercase text-[#A0A0A0]">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-[#E8E5E0] bg-white text-[#101010] text-sm focus:outline-none focus:border-[#101010] transition-colors cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="flex items-center gap-3">
                <label className="text-xs tracking-wider uppercase text-[#A0A0A0]">Notes</label>
                <select
                  value={selectedNote}
                  onChange={(e) => setSelectedNote(e.target.value)}
                  className="px-4 py-2 border border-[#E8E5E0] bg-white text-[#101010] text-sm focus:outline-none focus:border-[#101010] transition-colors cursor-pointer"
                >
                  {notes.map((note) => (
                    <option key={note.id} value={note.id}>
                      {note.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Intensity */}
              <div className="flex items-center gap-3">
                <label className="text-xs tracking-wider uppercase text-[#A0A0A0]">
                  Intensity
                </label>
                <select
                  value={selectedIntensity}
                  onChange={(e) => setSelectedIntensity(e.target.value)}
                  className="px-4 py-2 border border-[#E8E5E0] bg-white text-[#101010] text-sm focus:outline-none focus:border-[#101010] transition-colors cursor-pointer"
                >
                  {intensities.map((intensity) => (
                    <option key={intensity.id} value={intensity.id}>
                      {intensity.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="ml-auto text-xs tracking-wider uppercase text-[#A0A0A0]">
              <span className="text-[#101010] font-medium">{products.length}</span> Artworks
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ marginTop: index % 3 === 1 ? '3rem' : '0' }}
            >
              <ArtworkCard {...product} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-[#E8E5E0] p-6 flex items-center justify-between z-10">
                <h2 className="text-lg font-display text-[#101010]">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-[#F3F1ED] rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filters */}
              <div className="p-6 space-y-8">
                {/* Category */}
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#A0A0A0] mb-4">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-4 py-3 border transition-all ${
                          selectedCategory === cat.id
                            ? 'border-[#101010] bg-[#F3F1ED]'
                            : 'border-[#E8E5E0] hover:border-[#D4D1CC]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#A0A0A0] mb-4">
                    Notes
                  </label>
                  <div className="space-y-2">
                    {notes.map((note) => (
                      <button
                        key={note.id}
                        onClick={() => setSelectedNote(note.id)}
                        className={`w-full text-left px-4 py-3 border transition-all ${
                          selectedNote === note.id
                            ? 'border-[#101010] bg-[#F3F1ED]'
                            : 'border-[#E8E5E0] hover:border-[#D4D1CC]'
                        }`}
                      >
                        {note.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#A0A0A0] mb-4">
                    Intensity
                  </label>
                  <div className="space-y-2">
                    {intensities.map((intensity) => (
                      <button
                        key={intensity.id}
                        onClick={() => setSelectedIntensity(intensity.id)}
                        className={`w-full text-left px-4 py-3 border transition-all ${
                          selectedIntensity === intensity.id
                            ? 'border-[#101010] bg-[#F3F1ED]'
                            : 'border-[#E8E5E0] hover:border-[#D4D1CC]'
                        }`}
                      >
                        {intensity.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
