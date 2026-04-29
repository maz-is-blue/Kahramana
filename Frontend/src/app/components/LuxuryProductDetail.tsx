import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Heart, Share2, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryButton } from '@/app/components/GalleryButton';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';

export function LuxuryProductDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Mock product data
  const product = {
    id: 'oud-royal',
    name: language === 'ar' ? 'عود ملكي' : 'Oud Royal',
    price: 349,
    image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    year: '2025',
    concentration: 'Parfum',
    description:
      language === 'ar'
        ? 'تركيبة فاخرة تحتفي بغنى العود الكمبودي. يفتتح عود ملكي بدفء الزعفران والورد، متحولاً إلى قلب من خشب العود الثمين، قبل أن يستقر في قاعد من العنبر والمسك.'
        : 'An opulent composition celebrating the richness of Cambodian oud. Oud Royal opens with the warmth of saffron and rose, transitioning into a heart of precious oud wood, before settling into a base of amber and musk.',
    notes: {
      top: [t('note.saffron'), t('note.rose'), t('note.bergamot')],
      heart: [language === 'ar' ? 'عود كمبودي' : 'Cambodian Oud', t('note.jasmine'), t('note.patchouli')],
      base: [t('note.amber'), t('note.whiteMusk'), t('note.sandalwood')],
    },
    sizes: [
      { size: '30ml', price: 199 },
      { size: '50ml', price: 349 },
      { size: '100ml', price: 599 },
    ],
    details: [
      { label: language === 'ar' ? 'العطار' : 'Perfumer', value: language === 'ar' ? 'ليلى الرشيد' : 'Layla Al-Rashid' },
      { label: language === 'ar' ? 'السنة' : 'Year', value: '2025' },
      { label: language === 'ar' ? 'الإصدار' : 'Edition', value: language === 'ar' ? 'المجموعة الدائمة' : 'Permanent Collection' },
      { label: language === 'ar' ? 'التركيز' : 'Concentration', value: '20-30% Parfum' },
    ],
  };

  const selectedPrice = product.sizes.find((s) => s.size === selectedSize)?.price || product.price;

  return (
    <div className="min-h-screen pt-32 pb-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb - Elegant */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex items-center gap-3 text-xs tracking-wider uppercase"
        >
          <Link to="/" className="text-[#A0A0A0] hover:text-[#101010] transition-colors">
            {t('product.home')}
          </Link>
          <ChevronRight size={12} className="text-[#E8E5E0]" />
          <Link to="/shop" className="text-[#A0A0A0] hover:text-[#101010] transition-colors">
            {t('nav.collection')}
          </Link>
          <ChevronRight size={12} className="text-[#E8E5E0]" />
          <span className="text-[#101010]">{product.name}</span>
        </motion.nav>

        {/* Product Section - Dramatic Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-32">
          {/* Product Images - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <div className="sticky top-32">
              {/* Main Image - Extra Luxe Frame */}
              <div className="relative group">
                <div className="absolute -inset-4 border-2 border-[#E8E5E0] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[3/4] border-2 border-[#E8E5E0] bg-white p-12 lg:p-16 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Corner Decorations */}
                  <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#E8E5E0]" />
                  <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#E8E5E0]" />
                  <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#E8E5E0]" />
                  <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#E8E5E0]" />
                </div>

                {/* Floating Gradient Accent */}
                <motion.div
                  animate={{ y: [0, -20, 0], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-12 -right-12 w-48 h-48 gradient-ribbon blur-3xl pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Product Info - 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 space-y-10"
          >
            {/* Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8E5E0] bg-[#FDFCFA]">
                <Sparkles size={14} className="text-[#EC4899]" />
                <span className="text-xs tracking-[0.4em] uppercase text-[#A0A0A0]">
                  {t('product.artworkNo')} {product.id}
                </span>
              </div>

              <div className="space-y-4">
                <h1
                  className={`text-4xl lg:text-5xl leading-[1.1] ${
                    language === 'ar' ? 'font-arabic font-semibold' : 'font-display'
                  }`}
                >
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl lg:text-4xl font-display text-[#101010]">${selectedPrice}</span>
                  <span className="text-sm text-[#A0A0A0]">/ {selectedSize}</span>
                </div>
              </div>

              <div className="w-24 h-[1px] bg-gradient-to-r from-[#E8E5E0] to-transparent" />
            </div>

            {/* Description */}
            <p className="text-lg lg:text-xl text-[#6B6B6B] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Composition Notes - Premium Card */}
            <div className="border-2 border-[#E8E5E0] bg-gradient-to-br from-white to-[#FDFCFA] p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#EC4899]" />
                <span className="text-xs tracking-[0.4em] uppercase text-[#A0A0A0]">
                  {t('product.composition')}
                </span>
              </div>
              <div className="space-y-6">
                {Object.entries(product.notes).map(([layer, notes]) => (
                  <div key={layer}>
                    <p className="text-xs tracking-[0.3em] uppercase text-[#101010] mb-3 font-medium">
                      {t(`product.${layer}`)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {notes.map((note) => (
                        <motion.span
                          key={note}
                          whileHover={{ scale: 1.05, borderColor: '#EC4899' }}
                          className="px-4 py-2 border border-[#E8E5E0] text-sm text-[#6B6B6B] bg-white cursor-default transition-colors"
                        >
                          {note}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#EC4899]" />
                <span className="text-xs tracking-[0.4em] uppercase text-[#A0A0A0]">
                  {t('product.selectSize')}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.sizes.map((sizeOption) => (
                  <motion.button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 border-2 transition-all duration-500 ${
                      selectedSize === sizeOption.size
                        ? 'border-[#101010] bg-[#F3F1ED] shadow-soft'
                        : 'border-[#E8E5E0] hover:border-[#D4D1CC] bg-white'
                    }`}
                  >
                    <div className="text-lg font-display text-[#101010] mb-2">{sizeOption.size}</div>
                    <div className="text-xs text-[#6B6B6B]">${sizeOption.price}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#EC4899]" />
                <span className="text-xs tracking-[0.4em] uppercase text-[#A0A0A0]">
                  {t('product.quantity')}
                </span>
              </div>
              <div className="inline-flex items-center border-2 border-[#E8E5E0] bg-white">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-5 hover:bg-[#F3F1ED] transition-colors"
                >
                  <Minus size={18} strokeWidth={1.5} />
                </motion.button>
                <span className="px-10 py-5 text-lg text-[#101010] font-medium min-w-[80px] text-center">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-5 hover:bg-[#F3F1ED] transition-colors"
                >
                  <Plus size={18} strokeWidth={1.5} />
                </motion.button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <GalleryButton
                  className="w-full py-5 text-base flex items-center justify-center gap-3"
                  onClick={() => {
                    setIsAdding(true);
                    addToCart({ ...product, size: selectedSize, quantity });
                    setTimeout(() => setIsAdding(false), 1000);
                  }}
                >
                  <ShoppingBag size={20} />
                  <span>{t('product.addToCollection')}</span>
                </GalleryButton>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? 'border-[#EC4899] bg-[#EC4899] text-white'
                      : 'border-[#E8E5E0] hover:border-[#101010] text-[#101010]'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  <span className="text-xs tracking-wider uppercase">
                    {language === 'ar' ? 'مفضلة' : 'Wishlist'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 border-2 border-[#E8E5E0] hover:border-[#101010] transition-all duration-300 flex items-center justify-center gap-2 text-[#101010]"
                >
                  <Share2 size={20} />
                  <span className="text-xs tracking-wider uppercase">
                    {language === 'ar' ? 'مشاركة' : 'Share'}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Artwork Details */}
            <div className="border-t-2 border-[#E8E5E0] pt-10 mt-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-[#EC4899]" />
                <span className="text-xs tracking-[0.4em] uppercase text-[#A0A0A0]">
                  {t('product.details')}
                </span>
              </div>
              <div className="space-y-4">
                {product.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex justify-between items-center pb-4 border-b border-[#E8E5E0] last:border-0"
                  >
                    <span className="text-sm text-[#A0A0A0] tracking-wider">{detail.label}</span>
                    <span className="text-sm text-[#101010] font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products - Minimal */}
        <section className="border-t-2 border-[#E8E5E0] pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="inline-block text-xs tracking-[0.5em] uppercase text-[#A0A0A0] mb-6">
              {t('product.relatedLabel')}
            </span>
            <h2 className={`text-5xl lg:text-6xl ${language === 'ar' ? 'font-arabic font-semibold' : 'font-display'}`}>
              {t('product.relatedTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/product/product-${i}`}>
                  <div className="border-2 border-[#E8E5E0] bg-white p-8 group-hover:border-[#D4D1CC] group-hover:shadow-soft transition-all duration-700">
                    <div className="aspect-[3/4] mb-6 overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-${1700000000000 + i * 1000000}?w=600&h=800&fit=crop`}
                          alt="Related Product"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                    <h3 className={`text-2xl mb-2 group-hover:text-[#EC4899] transition-colors ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
                      {language === 'ar' ? 'عطر فاخر' : 'Luxury Fragrance'} {i}
                    </h3>
                    <p className="text-xl font-display text-[#101010]">$299</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}