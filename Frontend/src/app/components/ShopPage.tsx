import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '@/app/components/ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/app/components/Button';

export function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const products = [
    {
      id: 'amber-nights',
      name: 'Amber Nights',
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGVyZnVtZSUyMGFtYmVyJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAwMjc5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 234,
      category: 'amber',
      isNew: true,
    },
    {
      id: 'oud-royal',
      name: 'Oud Royal',
      nameAr: 'عود ملكي',
      price: 349,
      image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwb3VkJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcwMDI3OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 456,
      category: 'oud',
      isBestseller: true,
    },
    {
      id: 'rose-mystique',
      name: 'Rose Mystique',
      nameAr: 'الوردة الغامضة',
      price: 279,
      image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwcm9zZSUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzcwMDI3OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 189,
      category: 'floral',
    },
    {
      id: 'musk-noir',
      name: 'Musk Noir',
      nameAr: 'المسك الأسود',
      price: 319,
      image: 'https://images.unsplash.com/photo-1729101807924-3446ca9aa480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwbXVzayUyMGJvdHRsZXxlbnwxfHx8fDE3NzAwMjc5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 321,
      category: 'musk',
      isBestseller: true,
    },
    {
      id: 'saffron-gold',
      name: 'Saffron Gold',
      nameAr: 'الزعفران الذهبي',
      price: 329,
      image: 'https://images.unsplash.com/photo-1749497636434-82e53b6358b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lJTIwYm90dGxlJTIwZ29sZCUyMGRhcmt8ZW58MXx8fHwxNzcwMDI3OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 287,
      category: 'spicy',
      isNew: true,
    },
    {
      id: 'white-lotus',
      name: 'White Lotus',
      nameAr: 'اللوتس الأبيض',
      price: 269,
      image: 'https://images.unsplash.com/photo-1664470740442-f5de3e512e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWNoZSUyMHBlcmZ1bWUlMjBib3R0bGUlMjBtaW5pbWFsaXN0JTIwZGFya3xlbnwxfHx8fDE3NzAwMjc5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.6,
      reviews: 156,
      category: 'floral',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Fragrances', nameAr: 'جميع العطور' },
    { id: 'oud', name: 'Oud', nameAr: 'عود' },
    { id: 'amber', name: 'Amber', nameAr: 'عنبر' },
    { id: 'musk', name: 'Musk', nameAr: 'مسك' },
    { id: 'floral', name: 'Floral', nameAr: 'زهري' },
    { id: 'spicy', name: 'Spicy', nameAr: 'حار' },
  ];

  const priceRanges = [
    { id: 'all', label: 'All Prices', labelAr: 'جميع الأسعار' },
    { id: '0-300', label: 'Under $300', labelAr: 'أقل من 300$' },
    { id: '300-350', label: '$300 - $350', labelAr: '300$ - 350$' },
    { id: '350+', label: '$350+', labelAr: '350$+' },
  ];

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-display text-[#F4F0EA] mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#D946EF]/20 to-[#EC4899]/20 text-[#F4F0EA] border border-[#BFA26A]/30'
                  : 'text-[#B8B3AB] hover:text-[#F4F0EA] hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="text-xs arabic-text opacity-60">{category.nameAr}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-display text-[#F4F0EA] mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedPriceRange(range.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                selectedPriceRange === range.id
                  ? 'bg-gradient-to-r from-[#D946EF]/20 to-[#EC4899]/20 text-[#F4F0EA] border border-[#BFA26A]/30'
                  : 'text-[#B8B3AB] hover:text-[#F4F0EA] hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{range.label}</span>
                <span className="text-xs arabic-text opacity-60">{range.labelAr}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory('all');
          setSelectedPriceRange('all');
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-display mb-4 text-[#F4F0EA]">
            Our Collection
          </h1>
          <p className="text-xl text-[#B8B3AB] arabic-text">مجموعتنا الفاخرة</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 glass-panel rounded-2xl p-6">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] hover:border-[#BFA26A]/30 transition-colors"
              >
                <SlidersHorizontal size={20} />
                <span>Filters</span>
              </button>

              {/* Results Count */}
              <p className="text-[#B8B3AB]">
                <span className="text-[#F4F0EA] font-medium">{products.length}</span> Products
              </p>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] cursor-pointer hover:border-[#BFA26A]/30 transition-colors focus:outline-none focus:border-[#BFA26A]/50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
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
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsFilterOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[320px] bg-[#0D0D0D] border-r border-white/10 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#0D0D0D] border-b border-white/10 p-6 flex items-center justify-between z-10">
                <h2 className="text-xl font-display text-[#F4F0EA]">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={24} className="text-[#F4F0EA]" />
                </button>
              </div>

              {/* Filters */}
              <div className="p-6">
                <FilterSidebar />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
