import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useLanguage } from '@/app/context/LanguageContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';
import { MagneticButton } from '@/app/components/MagneticButton';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  new?: boolean;
  sizes?: Array<{ size: string; price: number }>;
}

interface EnhancedProductCardProps {
  product: Product;
  index?: number;
}

export function EnhancedProductCard({ product, index = 0 }: EnhancedProductCardProps) {
  const { language } = useLanguage();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes?.[0]?.size || '50ml';
    const defaultPrice = product.sizes?.[0]?.price || product.price;

    addToCart({
      id: `${product.id}-${defaultSize}`,
      name: product.name,
      nameAr: product.nameAr,
      price: defaultPrice,
      image: product.image,
      size: defaultSize,
    }, 1);

    toast.success(language === 'en' ? 'Added to cart!' : 'تمت الإضافة إلى السلة!');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: product.price,
      image: product.image,
      addedAt: new Date(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="gallery-card rounded-lg p-6 relative">
          {/* New Badge */}
          {product.new && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-medium"
            >
              {language === 'en' ? 'New' : 'جديد'}
            </motion.div>
          )}

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            className={`absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isWishlisted
                ? 'bg-[#EC4899] text-white'
                : 'bg-white/90 backdrop-blur-sm text-[#101010] hover:bg-[#EC4899] hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={16}
              fill={isWishlisted ? 'currentColor' : 'none'}
              strokeWidth={2}
            />
          </motion.button>

          {/* Image Container with Parallax */}
          <div className="relative aspect-square mb-6 overflow-hidden rounded-md bg-[#F3F1ED]">
            <motion.div
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={product.image}
                alt={language === 'en' ? product.name : product.nameAr}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Hover Actions Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-[#101010]/60 via-[#101010]/20 to-transparent flex items-end justify-center pb-6 gap-3"
            >
              <MagneticButton
                className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                strength={0.2}
              >
                <Eye size={16} className="text-[#101010]" />
              </MagneticButton>

              <MagneticButton
                onClick={handleQuickAdd}
                className="px-4 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-white transition-colors text-[#101010] text-sm font-medium"
                strength={0.2}
              >
                <ShoppingBag size={16} />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Quick Add' : 'إضافة سريعة'}
                </span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            {/* Category */}
            {product.category && (
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#A0A0A0]">
                {product.category}
              </p>
            )}

            {/* Name */}
            <h3 className="text-lg font-medium text-[#101010] group-hover:gradient-text transition-all duration-300">
              {language === 'en' ? product.name : product.nameAr}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      fill={i < Math.floor(product.rating!) ? '#F59E0B' : 'none'}
                      stroke={i < Math.floor(product.rating!) ? '#F59E0B' : '#D4D1CC'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-xs text-[#A0A0A0]">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-2">
              <p className="text-xl font-medium gradient-text">
                ${product.price}
              </p>
              <p className="text-xs text-[#A0A0A0]">
                {language === 'en' ? 'USD' : 'دولار'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
