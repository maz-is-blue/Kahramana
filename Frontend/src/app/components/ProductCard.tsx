import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export function ProductCard({
  id,
  name,
  nameAr,
  price,
  image,
  rating = 4.8,
  reviews = 0,
  isNew = false,
  isBestseller = false,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${id}`} className="block">
        {/* Card Container with Glow Border on Hover */}
        <div className="relative bg-[#141414] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-transparent">
          {/* Gradient Glow Border (visible on hover) */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899]">
            <div className="w-full h-full bg-[#141414] rounded-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-[#0D0D0D]">
              {/* Gradient Glow Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-[#D946EF]/20 via-[#A855F7]/20 to-[#EC4899]/20 blur-3xl" />
              </div>

              {/* Product Image */}
              <ImageWithFallback
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badges */}
              {(isNew || isBestseller) && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {isNew && (
                    <span className="px-3 py-1 bg-gradient-to-r from-[#D946EF] to-[#A855F7] text-white text-xs font-medium rounded-full">
                      New
                    </span>
                  )}
                  {isBestseller && (
                    <span className="px-3 py-1 bg-[#BFA26A] text-[#070707] text-xs font-medium rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>
              )}

              {/* Quick Add Button (visible on hover) */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-shadow duration-300"
                >
                  <ShoppingCart size={18} />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(rating)
                          ? 'fill-[#BFA26A] text-[#BFA26A]'
                          : 'text-white/20'
                      }
                    />
                  ))}
                </div>
                {reviews > 0 && (
                  <span className="text-xs text-[#B8B3AB]">({reviews})</span>
                )}
              </div>

              {/* Product Name */}
              <h3 className="font-display text-lg text-[#F4F0EA] mb-1 group-hover:text-[#BFA26A] transition-colors duration-300">
                {name}
              </h3>
              <p className="text-sm text-[#B8B3AB] arabic-text mb-3">{nameAr}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display text-[#BFA26A]">${price}</span>
                <span className="text-sm text-[#B8B3AB]">AED</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}