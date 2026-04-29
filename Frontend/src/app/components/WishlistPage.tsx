import { motion } from 'motion/react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCart } from '@/app/context/CartContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { GalleryButton } from '@/app/components/GalleryButton';
import { toast } from 'sonner';

export function WishlistPage() {
  const { language } = useLanguage();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      nameAr: item.nameAr,
      price: item.price,
      image: item.image,
    });
    toast.success(language === 'en' ? 'Added to cart!' : 'تمت الإضافة إلى السلة!');
  };

  const handleRemove = (itemId: string) => {
    removeFromWishlist(itemId);
    toast.success(language === 'en' ? 'Removed from wishlist' : 'تمت الإزالة من المفضلة');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-5xl lg:text-6xl" style={{ fontFamily: 'Playfair Display' }}>
              {language === 'en' ? 'My Wishlist' : 'قائمة أمنياتي'}
            </h1>
          </div>
          <p className="text-lg text-[#101010]/60">
            {items.length} {language === 'en' ? 'items' : 'عنصر'}
          </p>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <Heart className="w-16 h-16 mx-auto mb-6 text-[#101010]/20" />
            <h2 className="text-3xl mb-4" style={{ fontFamily: 'Playfair Display' }}>
              {language === 'en' ? 'Your wishlist is empty' : 'قائمة أمنياتك فارغة'}
            </h2>
            <p className="text-lg text-[#101010]/60 mb-8">
              {language === 'en'
                ? 'Start adding your favorite fragrances to save them for later.'
                : 'ابدأ بإضافة عطورك المفضلة لحفظها لوقت لاحق.'}
            </p>
            <Link to="/shop">
              <GalleryButton>{language === 'en' ? 'Explore Collection' : 'استكشف المجموعة'}</GalleryButton>
            </Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white border border-[#101010]/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Product Image */}
                <Link to={`/product/${item.id}`} className="block mb-4">
                  <div className="aspect-[3/4] bg-white/50 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={language === 'en' ? item.name : item.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="mb-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-xl mb-2 hover:text-[#101010]/70 transition-colors">
                      {language === 'en' ? item.name : item.nameAr}
                    </h3>
                  </Link>
                  <p className="text-lg text-[#101010]/60">AED {item.price}</p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-3 bg-[#101010] text-[#FAF7F1] hover:bg-[#101010]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {language === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
