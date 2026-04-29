import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useCart } from '@/app/context/CartContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { useUser } from '@/app/context/UserContext';
import { ordersAPI } from '@/app/services/api';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ShoppingBag, CreditCard, Truck, Lock, ArrowRight } from 'lucide-react';

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, language } = useLanguage();
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '',
    city: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    giftWrap: false,
    giftMessage: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const shippingCost = 15;
  const tax = Math.round(totalPrice * 0.1 * 100) / 100;
  const giftWrapCost = formData.giftWrap ? 5 : 0;
  const finalTotal = totalPrice + shippingCost + tax + giftWrapCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    try {
      const order = await ordersAPI.create({
        items: items.map((item) => ({
          product_id: item.id,
          name: item.name,
          name_ar: item.nameAr,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shipping_address: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        },
        subtotal: totalPrice,
        shipping: shippingCost,
        total: finalTotal,
      });
      clearCart();
      navigate('/order-confirmation', {
        state: { orderId: order.id, orderData: formData, items, total: finalTotal },
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#D4D1CC]" />
          <h2 className="text-2xl font-medium mb-2">{t('cart.empty')}</h2>
          <p className="text-[#6B6B6B] mb-6">{t('checkout.emptyMessage')}</p>
          <button onClick={() => navigate('/shop')}
            className="px-8 py-3 bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] text-white rounded-lg hover:opacity-90 transition-opacity">
            {t('cart.continueShopping')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F1] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-4 mt-32 md:mt-40">{t('checkout.title')}</h1>
          <p className="text-[#6B6B6B]">{t('checkout.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg border border-[#E8E5E0]">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#EC4899]" /> {t('checkout.contactInfo')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder={t('checkout.email')} required
                  className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder={t('checkout.phone')} required
                  className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
              </div>
            </motion.div>

            {/* Shipping */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-lg border border-[#E8E5E0]">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#EC4899]" /> {t('checkout.shippingAddress')}
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    placeholder={t('checkout.firstName')} required
                    className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    placeholder={t('checkout.lastName')} required
                    className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                </div>
                <input type="text" name="address" value={formData.address} onChange={handleChange}
                  placeholder={t('checkout.address')} required
                  className="w-full px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" name="city" value={formData.city} onChange={handleChange}
                    placeholder={t('checkout.city')} required
                    className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                  <select name="country" value={formData.country} onChange={handleChange} required
                    className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors bg-white">
                    <option value="">{t('checkout.selectCountry')}</option>
                    <option value="SA">{language === 'ar' ? 'السعودية' : 'Saudi Arabia'}</option>
                    <option value="AE">{language === 'ar' ? 'الإمارات' : 'UAE'}</option>
                    <option value="KW">{language === 'ar' ? 'الكويت' : 'Kuwait'}</option>
                    <option value="QA">{language === 'ar' ? 'قطر' : 'Qatar'}</option>
                    <option value="BH">{language === 'ar' ? 'البحرين' : 'Bahrain'}</option>
                    <option value="OM">{language === 'ar' ? 'عمان' : 'Oman'}</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-lg border border-[#E8E5E0]">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#EC4899]" /> {t('checkout.paymentMethod')}
              </h2>
              <div className="space-y-4">
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange}
                  placeholder={t('checkout.cardNumber')} maxLength={19} required
                  className="w-full px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                <input type="text" name="cardName" value={formData.cardName} onChange={handleChange}
                  placeholder={t('checkout.cardName')} required
                  className="w-full px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange}
                    placeholder="MM/YY" maxLength={5} required
                    className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                  <input type="text" name="cvv" value={formData.cvv} onChange={handleChange}
                    placeholder="CVV" maxLength={4} required
                    className="px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors" />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </motion.div>

            {/* Gift wrap */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-lg border border-[#E8E5E0]">
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input type="checkbox" name="giftWrap" checked={formData.giftWrap} onChange={handleChange}
                  className="w-5 h-5 text-[#EC4899] border-[#E8E5E0] rounded focus:ring-[#EC4899]" />
                <span className="text-[#6B6B6B]">{t('checkout.giftWrap')} (+$5)</span>
              </label>
              {formData.giftWrap && (
                <textarea name="giftMessage" value={formData.giftMessage} onChange={handleChange}
                  placeholder={t('checkout.giftMessage')} rows={3}
                  className="w-full px-4 py-3 border border-[#E8E5E0] rounded-lg focus:outline-none focus:border-[#EC4899] transition-colors resize-none" />
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-lg border border-[#E8E5E0] sticky top-24">
              <h2 className="text-xl font-medium mb-6">{t('checkout.orderSummary')}</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 bg-[#FAF7F1] rounded overflow-hidden">
                      <ImageWithFallback src={item.image} alt={language === 'ar' ? item.nameAr : item.name}
                        className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{language === 'ar' ? item.nameAr : item.name}</p>
                      <p className="text-xs text-[#6B6B6B]">{t('product.qty')}: {item.quantity}{item.size && ` • ${item.size}`}</p>
                      <p className="text-sm text-[#EC4899] font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 py-4 border-t border-[#E8E5E0]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">{t('checkout.subtotal')}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">{t('checkout.shipping')}</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">{t('checkout.tax')}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {formData.giftWrap && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">{t('checkout.giftWrap')}</span>
                    <span>$5.00</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#E8E5E0] mb-6">
                <span className="text-lg font-medium">{t('checkout.total')}</span>
                <span className="text-2xl font-medium text-[#EC4899]">${finalTotal.toFixed(2)}</span>
              </div>
              <button type="submit" disabled={isProcessing}
                className="w-full bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] text-white py-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isProcessing
                  ? <span>{t('checkout.processing')}</span>
                  : <><span>{t('checkout.placeOrder')}</span><ArrowRight className="w-5 h-5" /></>}
              </button>
              <p className="text-xs text-[#6B6B6B] text-center mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> {t('checkout.securePayment')}
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
