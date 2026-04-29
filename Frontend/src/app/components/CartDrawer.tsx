import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function CartDrawer() {
  const { items, totalItems, totalPrice, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#101010]/40 backdrop-blur-sm z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white shadow-2xl z-[9999] flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8E5E0]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#EC4899]" />
                <h2 className="text-xl font-medium">
                  {t('cart.title')} ({totalItems})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-[#FAF7F1] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#D4D1CC]" />
                  <p className="text-[#6B6B6B] mb-2">{t('cart.empty')}</p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="text-[#EC4899] hover:text-[#A855F7] text-sm underline"
                  >
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
                      className="flex gap-4 p-4 bg-[#FAF7F1] rounded-lg"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={language === 'ar' ? item.nameAr : item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 truncate">
                          {language === 'ar' ? item.nameAr : item.name}
                        </h3>
                        {item.size && (
                          <p className="text-xs text-[#6B6B6B] mb-2">
                            {t('product.size')}: {item.size}
                          </p>
                        )}
                        <p className="text-[#EC4899] font-medium text-sm">
                          ${item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded hover:bg-[#EC4899] hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-white rounded hover:bg-[#EC4899] hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(`${item.id}-${item.size}`)}
                        className="self-start p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-[#6B6B6B] hover:text-red-500" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#E8E5E0] p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-lg">
                  <span className="text-[#6B6B6B]">{t('cart.subtotal')}</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] text-white text-center py-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  {t('cart.checkout')}
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full text-[#6B6B6B] text-sm hover:text-[#101010] transition-colors"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}