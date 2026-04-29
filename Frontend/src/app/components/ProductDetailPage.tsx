import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { ProductCard } from '@/app/components/ProductCard';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function ProductDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('50ml');

  // Mock product data
  const product = {
    id: 'oud-royal',
    name: 'Oud Royal',
    nameAr: 'عود ملكي',
    price: 349,
    image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwb3VkJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcwMDI3OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5.0,
    reviews: 456,
    description:
      'Oud Royal is a luxurious blend of the finest Cambodian oud, infused with warm amber and sensual musk. This opulent fragrance is designed for those who appreciate the art of perfumery and seek a scent that commands attention.',
    descriptionAr:
      'عود ملكي هو مزيج فاخر من جود أنواع العود الكمبودي، ممزوج بالعنبر الدافئ والمسك الحسي. صُمم هذا العطر الفخم لأولئك الذين يقدرون فن صناعة العطور ويبحثون عن رائحة تجذب الانتباه.',
    notes: {
      top: ['Bergamot', 'Saffron', 'Pink Pepper'],
      middle: ['Oud', 'Rose', 'Jasmine'],
      base: ['Amber', 'Musk', 'Sandalwood'],
    },
    sizes: [
      { size: '30ml', price: 199 },
      { size: '50ml', price: 349 },
      { size: '100ml', price: 599 },
    ],
  };

  const relatedProducts = [
    {
      id: 'amber-nights',
      name: 'Amber Nights',
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGVyZnVtZSUyMGFtYmVyJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAwMjc5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 234,
    },
    {
      id: 'musk-noir',
      name: 'Musk Noir',
      nameAr: 'المسك الأسود',
      price: 319,
      image: 'https://images.unsplash.com/photo-1729101807924-3446ca9aa480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwbXVzayUyMGJvdHRsZXxlbnwxfHx8fDE3NzAwMjc5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 321,
    },
    {
      id: 'saffron-gold',
      name: 'Saffron Gold',
      nameAr: 'الزعفران الذهبي',
      price: 329,
      image: 'https://images.unsplash.com/photo-1749497636434-82e53b6358b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcmFiaWMlMjBwZXJmdW1lJTIwYm90dGxlJTIwZ29sZCUyMGRhcmt8ZW58MXx8fHwxNzcwMDI3OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 287,
    },
  ];

  const reviews = [
    {
      name: 'Mohammed A.',
      nameAr: 'محمد أ.',
      rating: 5,
      date: 'January 15, 2026',
      text: 'The best oud fragrance I have ever experienced. Long-lasting and sophisticated.',
    },
    {
      name: 'Fatima K.',
      nameAr: 'فاطمة ك.',
      rating: 5,
      date: 'January 10, 2026',
      text: 'Absolutely divine! The blend is perfect and unique. Worth every penny.',
    },
    {
      name: 'Ali R.',
      nameAr: 'علي ر.',
      rating: 5,
      date: 'December 28, 2025',
      text: 'This perfume is luxurious and captivating. I receive compliments everywhere I go.',
    },
  ];

  const selectedPrice = product.sizes.find((s) => s.size === selectedSize)?.price || product.price;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-[#B8B3AB]">
            <li>
              <Link to="/" className="hover:text-[#BFA26A] transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/shop" className="hover:text-[#BFA26A] transition-colors">
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-[#F4F0EA]">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-32">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0D0D0D]">
                {/* Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/20 via-[#A855F7]/20 to-[#EC4899]/20 blur-3xl" />

                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Title */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-display mb-2 text-[#F4F0EA]">
                {product.name}
              </h1>
              <p className="text-2xl text-[#B8B3AB] arabic-text">{product.nameAr}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-[#BFA26A] text-[#BFA26A]'
                        : 'text-white/20'
                    }
                  />
                ))}
              </div>
              <span className="text-[#B8B3AB]">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="py-6 border-y border-white/10">
              <p className="text-5xl font-display text-[#BFA26A]">${selectedPrice}</p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-[#B8B3AB] leading-relaxed">{product.description}</p>
              <p className="text-[#B8B3AB] leading-relaxed arabic-text">{product.descriptionAr}</p>
            </div>

            {/* Scent Notes */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-display text-[#F4F0EA] mb-4">Scent Notes</h3>
              <div className="space-y-3">
                {Object.entries(product.notes).map(([layer, notes]) => (
                  <div key={layer}>
                    <p className="text-sm text-[#BFA26A] uppercase tracking-wider mb-2">
                      {layer} Notes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {notes.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-[#141414] border border-white/10 rounded-full text-sm text-[#F4F0EA]"
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
              <h3 className="text-lg font-display text-[#F4F0EA] mb-4">Select Size</h3>
              <div className="flex gap-4">
                {product.sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    className={`flex-1 px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedSize === sizeOption.size
                        ? 'border-[#BFA26A] bg-[#BFA26A]/10 text-[#F4F0EA]'
                        : 'border-white/10 text-[#B8B3AB] hover:border-white/30'
                    }`}
                  >
                    <div className="text-lg font-medium">{sizeOption.size}</div>
                    <div className="text-sm">${sizeOption.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-display text-[#F4F0EA] mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-white/5 transition-colors text-[#F4F0EA]"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-8 py-4 text-[#F4F0EA] font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-white/5 transition-colors text-[#F4F0EA]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button className="flex-1 text-lg py-5">
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </Button>
              <button className="p-5 border-2 border-white/20 rounded-lg text-[#F4F0EA] hover:border-[#BFA26A] hover:bg-[#BFA26A]/10 transition-all duration-300">
                <Heart size={24} />
              </button>
              <button className="p-5 border-2 border-white/20 rounded-lg text-[#F4F0EA] hover:border-[#BFA26A] hover:bg-[#BFA26A]/10 transition-all duration-300">
                <Share2 size={24} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <section className="mb-20">
          <h2 className="text-3xl lg:text-5xl font-display mb-12 text-[#F4F0EA] text-center">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#BFA26A] text-[#BFA26A]" />
                  ))}
                </div>
                <p className="text-[#B8B3AB] leading-relaxed mb-4">"{review.text}"</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[#F4F0EA] font-medium">{review.name}</p>
                  <p className="text-sm text-[#B8B3AB] arabic-text">{review.nameAr}</p>
                  <p className="text-xs text-[#B8B3AB] mt-1">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pairs Well With */}
        <section>
          <h2 className="text-3xl lg:text-5xl font-display mb-12 text-[#F4F0EA] text-center">
            Pairs Well With
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}