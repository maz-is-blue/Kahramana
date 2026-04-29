import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Share2, ChevronLeft, Star, ThumbsUp, ZoomIn, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useProducts } from '@/app/context/ProductsContext';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useReviews } from '@/app/context/ReviewsContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { GalleryButton } from '@/app/components/GalleryButton';
import { toast } from 'sonner';

export function EnhancedProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { getProduct, getRelatedProducts, addToRecentlyViewed } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { getProductReviews, getAverageRating, getRatingDistribution, markHelpful, fetchProductReviews } = useReviews();

  const product = getProduct(id || '');
  const reviews = getProductReviews(id || '');
  const averageRating = getAverageRating(id || '');
  const ratingDistribution = getRatingDistribution(id || '');
  const relatedProducts = getRelatedProducts(id || '', 3);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'ingredients'>('details');

  useEffect(() => {
    if (product && product.sizes.length > 0) {
      setSelectedSize(product.sizes[1]?.size || product.sizes[0].size);
    }
    if (id) {
      addToRecentlyViewed(id);
      fetchProductReviews(id);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F1] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link to="/shop" className="text-sm underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const selectedPriceObj = product.sizes.find((s) => s.size === selectedSize);
  const selectedPrice = selectedPriceObj?.price || product.sizes[0].price;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      nameAr: product.nameAr,
      price: selectedPrice,
      image: product.image,
      size: selectedSize,
    }, quantity);
    toast.success(language === 'en' ? 'Added to cart!' : 'تمت الإضافة إلى السلة!');
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      price: selectedPrice,
      image: product.image,
      addedAt: new Date(),
    });
    toast.success(
      isWishlisted
        ? (language === 'en' ? 'Removed from wishlist' : 'تمت الإزالة من المفضلة')
        : (language === 'en' ? 'Added to wishlist!' : 'تمت الإضافة إلى المفضلة!')
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1]">
      {/* Back Button */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-32 pb-8">
        <motion.button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-sm text-[#101010]/60 hover:text-[#101010] transition-colors"
          whileHover={{ x: language === 'ar' ? 4 : -4 }}
        >
          <ChevronLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
          <span>{language === 'en' ? 'Back to Collection' : 'العودة إلى المجموعة'}</span>
        </motion.button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[3/4] bg-white/50 overflow-hidden mb-6 group"
            >
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={language === 'en' ? product.name : product.nameAr}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <div className="absolute top-6 left-6 bg-[#101010] text-[#FAF7F1] px-4 py-2 text-xs tracking-widest">
                  {t('product.new')}
                </div>
              )}
              {product.isLimited && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-600 to-amber-400 text-white px-4 py-2 text-xs tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {language === 'en' ? 'LIMITED' : 'محدود'}
                </div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-white/50 overflow-hidden transition-all ${
                      selectedImage === idx ? 'ring-2 ring-[#101010]' : 'opacity-60 hover:opacity-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Header */}
              <div className="mb-8">
                <p className="text-xs tracking-widest text-[#101010]/40 uppercase mb-2">
                  {product.category} • {product.concentration}
                </p>
                <h1 className="text-5xl lg:text-6xl mb-4" style={{ fontFamily: 'Playfair Display' }}>
                  {language === 'en' ? product.name : product.nameAr}
                </h1>
                
                {/* Rating */}
                {reviews.length > 0 && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(averageRating)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-[#101010]/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#101010]/60">
                      {averageRating.toFixed(1)} ({reviews.length} {language === 'en' ? 'reviews' : 'تقييم'})
                    </span>
                  </div>
                )}

                <p className="text-lg text-[#101010]/70 leading-relaxed max-w-xl">
                  {language === 'en' ? product.description : product.descriptionAr}
                </p>
              </div>

              {/* Scent Pyramid */}
              <div className="mb-8 p-6 bg-white/30 border border-[#101010]/5">
                <h3 className="text-sm tracking-widest mb-6 uppercase">{t('product.composition')}</h3>
                <div className="space-y-4">
                  {['top', 'heart', 'base'].map((level) => (
                    <div key={level} className="flex gap-6">
                      <span className="text-xs tracking-wider text-[#101010]/40 uppercase w-16">
                        {t(`product.${level}`)}
                      </span>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {product.notes[level as keyof typeof product.notes].map((note, idx) => (
                          <span
                            key={idx}
                            className="text-sm px-3 py-1 bg-[#FAF7F1] border border-[#101010]/10"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <label className="text-sm tracking-widest mb-4 block uppercase">
                  {t('product.selectSize')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={!sizeOption.inStock}
                      className={`p-4 border transition-all ${
                        selectedSize === sizeOption.size
                          ? 'border-[#101010] bg-[#101010] text-[#FAF7F1]'
                          : sizeOption.inStock
                          ? 'border-[#101010]/20 hover:border-[#101010]/40'
                          : 'border-[#101010]/10 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-sm font-medium">{sizeOption.size}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {sizeOption.inStock
                          ? `AED ${sizeOption.price}`
                          : language === 'en'
                          ? 'Out of stock'
                          : 'غير متوفر'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Price */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <label className="text-sm tracking-widest mb-3 block uppercase">
                    {t('product.quantity')}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-[#101010]/20 hover:border-[#101010] transition-colors flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-[#101010]/20 hover:border-[#101010] transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm tracking-widest text-[#101010]/40 mb-1">{language === 'en' ? 'PRICE' : 'السعر'}</p>
                  <p className="text-3xl" style={{ fontFamily: 'Playfair Display' }}>
                    AED {selectedPrice}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <GalleryButton onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  {t('product.addToCollection')}
                </GalleryButton>
                <motion.button
                  onClick={handleToggleWishlist}
                  className={`w-14 h-14 border transition-colors flex items-center justify-center ${
                    isWishlisted
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-[#101010]/20 hover:border-[#101010]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-white/30 border border-[#101010]/5 text-sm">
                <div>
                  <p className="text-[#101010]/40 mb-1">{language === 'en' ? 'Longevity' : 'الثبات'}</p>
                  <p className="font-medium">{product.longevity}</p>
                </div>
                <div>
                  <p className="text-[#101010]/40 mb-1">{language === 'en' ? 'Sillage' : 'الانتشار'}</p>
                  <p className="font-medium">{product.sillage}</p>
                </div>
                <div>
                  <p className="text-[#101010]/40 mb-1">{language === 'en' ? 'Season' : 'الموسم'}</p>
                  <p className="font-medium">{product.season.join(', ')}</p>
                </div>
                <div>
                  <p className="text-[#101010]/40 mb-1">{language === 'en' ? 'Occasion' : 'المناسبة'}</p>
                  <p className="font-medium">{product.occasion.join(', ')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24 border-t border-[#101010]/10 pt-16"
        >
          {/* Tab Headers */}
          <div className="flex gap-12 mb-12 border-b border-[#101010]/10">
            {(['details', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-widest uppercase transition-colors relative ${
                  activeTab === tab ? 'text-[#101010]' : 'text-[#101010]/40 hover:text-[#101010]/70'
                }`}
              >
                {language === 'en' ? tab : tab === 'details' ? 'التفاصيل' : 'التقييمات'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#101010]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl"
              >
                {product.story && (
                  <div className="prose prose-lg">
                    <h3 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display' }}>
                      {language === 'en' ? 'The Story' : 'القصة'}
                    </h3>
                    <p className="text-[#101010]/70 leading-relaxed">
                      {language === 'en' ? product.story : product.storyAr || product.story}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-[#101010]/40">
                    {language === 'en' ? 'No reviews yet' : 'لا توجد تقييمات بعد'}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Rating Summary */}
                    <div className="flex gap-12 pb-8 border-b border-[#101010]/10">
                      <div className="text-center">
                        <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(averageRating)
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-[#101010]/20'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#101010]/60">
                          {reviews.length} {language === 'en' ? 'reviews' : 'تقييم'}
                        </p>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-3 mb-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 h-2 bg-[#101010]/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-500"
                                style={{
                                  width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-[#101010]/60 w-8 text-right">
                              {ratingDistribution[rating]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-8">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-[#101010]/10 pb-8">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{review.userName}</h4>
                                {review.verified && (
                                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
                                    {language === 'en' ? 'Verified' : 'موثق'}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'fill-amber-500 text-amber-500'
                                          : 'text-[#101010]/20'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-[#101010]/40">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <h5 className="font-medium mb-2">{review.title}</h5>
                          <p className="text-[#101010]/70 mb-4">{review.comment}</p>
                          <button
                            onClick={() => markHelpful(review.id)}
                            className="flex items-center gap-2 text-sm text-[#101010]/60 hover:text-[#101010] transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            {language === 'en' ? 'Helpful' : 'مفيد'} ({review.helpful})
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-32 border-t border-[#101010]/10 pt-16"
          >
            <h2 className="text-3xl mb-12" style={{ fontFamily: 'Playfair Display' }}>
              {t('product.relatedTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((related, idx) => (
                <Link
                  key={related.id}
                  to={`/product/${related.id}`}
                  className="group"
                >
                  <div className="aspect-[3/4] bg-white/50 overflow-hidden mb-4">
                    <ImageWithFallback
                      src={related.image}
                      alt={language === 'en' ? related.name : related.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-lg mb-2">{language === 'en' ? related.name : related.nameAr}</h3>
                  <p className="text-[#101010]/60">AED {related.sizes[0].price}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
