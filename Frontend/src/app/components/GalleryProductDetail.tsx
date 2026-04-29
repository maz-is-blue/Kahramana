import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { GalleryButton } from '@/app/components/GalleryButton';
import { ArtworkCard } from '@/app/components/ArtworkCard';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function GalleryProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('50ml');

  // Mock product data
  const product = {
    id: 'oud-royal',
    name: 'Oud Royal',
    nameAr: 'عود ملكي',
    price: 349,
    image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    year: '2025',
    concentration: 'Parfum',
    description:
      'An opulent composition celebrating the richness of Cambodian oud. Oud Royal opens with the warmth of saffron and rose, transitioning into a heart of precious oud wood, before settling into a base of amber and musk.',
    descriptionAr:
      'تركيبة فاخرة تحتفي بغنى العود الكمبودي. يفتتح عود ملكي بدفء الزعفران والورد، متحولاً إلى قلب من خشب العود الثمين، قبل أن يستقر في قاعدة من العنبر والمسك.',
    notes: {
      top: ['Saffron', 'Rose', 'Bergamot'],
      heart: ['Cambodian Oud', 'Jasmine', 'Patchouli'],
      base: ['Amber', 'White Musk', 'Sandalwood'],
    },
    sizes: [
      { size: '30ml', price: 199 },
      { size: '50ml', price: 349 },
      { size: '100ml', price: 599 },
    ],
    details: [
      { label: 'Artist', value: 'Master Perfumer Layla Al-Rashid' },
      { label: 'Year', value: '2025' },
      { label: 'Edition', value: 'Permanent Collection' },
      { label: 'Type', value: 'Parfum (20-30% concentration)' },
    ],
  };

  const relatedProducts = [
    {
      id: 'amber-nights',
      name: 'Amber Nights',
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Eau de Parfum',
      notes: ['Amber', 'Vanilla', 'Tobacco'],
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
    },
  ];

  const selectedPrice = product.sizes.find((s) => s.size === selectedSize)?.price || product.price;

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="mb-12 text-xs tracking-wider uppercase">
          <ol className="flex items-center gap-2 text-[#A0A0A0]">
            <li>
              <Link to="/" className="hover:text-[#101010] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/shop" className="hover:text-[#101010] transition-colors">
                Collection
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#101010]">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Product Image - Framed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-32">
              <div className="artwork-frame aspect-[3/4] bg-white">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Title & Price */}
            <div className="pb-8 border-b border-[#E8E5E0]">
              <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">
                Artwork No. {product.id}
              </p>
              <h1 className="text-4xl lg:text-6xl font-display text-[#101010] mb-2">
                {product.name}
              </h1>
              <p className="text-2xl text-[#6B6B6B] arabic-text mb-6">{product.nameAr}</p>
              <p className="text-4xl font-display text-[#101010]">${selectedPrice}</p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-[#6B6B6B] leading-relaxed">{product.description}</p>
              <p className="text-[#6B6B6B] leading-relaxed arabic-text">{product.descriptionAr}</p>
            </div>

            {/* Artwork Details */}
            <div className="bg-[#F3F1ED] p-8 space-y-4">
              <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">
                Artwork Details
              </p>
              {product.details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex justify-between pb-3 border-b border-[#E8E5E0] last:border-0"
                >
                  <span className="text-sm text-[#A0A0A0]">{detail.label}</span>
                  <span className="text-sm text-[#101010]">{detail.value}</span>
                </div>
              ))}
            </div>

            {/* Scent Notes */}
            <div className="border border-[#E8E5E0] p-8">
              <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">
                Composition Notes
              </p>
              <div className="space-y-6">
                {Object.entries(product.notes).map(([layer, notes]) => (
                  <div key={layer}>
                    <p className="text-xs tracking-wider uppercase text-[#A0A0A0] mb-3">
                      {layer}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {notes.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 border border-[#E8E5E0] text-sm text-[#6B6B6B]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Select Size</p>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    className={`px-4 py-4 border-2 transition-all duration-300 ${
                      selectedSize === sizeOption.size
                        ? 'border-[#101010] bg-[#F3F1ED]'
                        : 'border-[#E8E5E0] hover:border-[#D4D1CC]'
                    }`}
                  >
                    <div className="text-sm font-medium text-[#101010]">{sizeOption.size}</div>
                    <div className="text-xs text-[#6B6B6B] mt-1">${sizeOption.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Quantity</p>
              <div className="inline-flex items-center border border-[#E8E5E0]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-[#F3F1ED] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-8 py-4 text-[#101010] font-medium min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-[#F3F1ED] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <GalleryButton className="flex-1">
                <ShoppingBag className="mr-2" size={18} />
                Add to Collection
              </GalleryButton>
              <button className="p-4 border border-[#E8E5E0] hover:border-[#101010] transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-4 border border-[#E8E5E0] hover:border-[#101010] transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Artworks */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">
              You May Also Like
            </p>
            <h2 className="text-4xl lg:text-5xl font-display text-[#101010]">
              Related Artworks
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {relatedProducts.map((product) => (
              <ArtworkCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}