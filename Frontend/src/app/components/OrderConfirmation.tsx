import { motion } from 'motion/react';
import { useLocation, useNavigate, Link } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { CheckCircle, Package, Truck, Mail, ArrowRight, Download } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useEffect } from 'react';

export function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const orderData = location.state as {
    orderId: string;
    orderData: any;
    items: any[];
    total: number;
  } | null;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderId, orderData: customerData, items, total } = orderData;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(
    language === 'ar' ? 'ar-SA' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-[#FAF7F1] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#EC4899] to-[#A855F7] rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            {t('confirmation.title')}
          </h1>
          <p className="text-[#6B6B6B] text-lg mb-2">
            {t('confirmation.thankYou')}
          </p>
          <p className="text-sm text-[#A0A0A0]">
            {t('confirmation.orderNumber')}: <span className="font-mono font-medium text-[#EC4899]">{orderId}</span>
          </p>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-lg border border-[#E8E5E0] mb-8"
        >
          <h2 className="text-xl font-medium mb-6">{t('confirmation.whatNext')}</h2>
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: t('confirmation.emailSent'),
                description: t('confirmation.emailSentDesc'),
                color: 'text-[#EC4899]',
              },
              {
                icon: Package,
                title: t('confirmation.processing'),
                description: t('confirmation.processingDesc'),
                color: 'text-[#A855F7]',
              },
              {
                icon: Truck,
                title: t('confirmation.shipping'),
                description: `${t('confirmation.shippingDesc')} ${estimatedDelivery}`,
                color: 'text-[#F59E0B]',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF7F1] to-white border border-[#E8E5E0] flex items-center justify-center ${step.color}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{step.title}</h3>
                  <p className="text-sm text-[#6B6B6B]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-lg border border-[#E8E5E0] mb-8"
        >
          <h2 className="text-xl font-medium mb-6">{t('confirmation.orderDetails')}</h2>
          
          {/* Items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-[#F3F1ED] last:border-0">
                <div className="w-20 h-20 flex-shrink-0 bg-[#FAF7F1] rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={language === 'ar' ? item.nameAr : item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">
                    {language === 'ar' ? item.nameAr : item.name}
                  </h3>
                  <p className="text-sm text-[#6B6B6B]">
                    {t('product.qty')}: {item.quantity}
                    {item.size && ` • ${item.size}`}
                  </p>
                  <p className="text-[#EC4899] font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="bg-[#FAF7F1] p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2 text-sm uppercase tracking-wide text-[#6B6B6B]">
              {t('confirmation.shippingAddress')}
            </h3>
            <p className="text-sm">
              {customerData.firstName} {customerData.lastName}<br />
              {customerData.address}<br />
              {customerData.city}, {customerData.state} {customerData.zipCode}<br />
              {customerData.country}
            </p>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-[#E8E5E0]">
            <span className="text-lg font-medium">{t('checkout.total')}</span>
            <span className="text-2xl font-medium text-[#EC4899]">
              ${total.toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#E8E5E0] rounded-lg hover:border-[#D4D1CC] transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>{t('confirmation.downloadReceipt')}</span>
          </button>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <span>{t('confirmation.continueShopping')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Customer Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 p-6 bg-white rounded-lg border border-[#E8E5E0]"
        >
          <p className="text-sm text-[#6B6B6B] mb-2">
            {t('confirmation.needHelp')}
          </p>
          <Link
            to="/contact"
            className="text-[#EC4899] hover:text-[#A855F7] font-medium text-sm"
          >
            {t('confirmation.contactSupport')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}