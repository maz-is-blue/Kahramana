import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CollectionsPage() {
  const { language } = useLanguage();

  const collections = [
    {
      id: 'new-arrivals',
      name: language === 'en' ? 'New Arrivals' : 'وصل حديثاً',
      description: language === 'en'
        ? 'Discover our latest fragrance artworks'
        : 'اكتشف أحدث أعمالنا الفنية العطرية',
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      count: 3,
      link: '/shop?filter=new',
    },
    {
      id: 'signature-ouds',
      name: language === 'en' ? 'Signature Ouds' : 'أعواد مميزة',
      description: language === 'en'
        ? 'Our most prestigious oud compositions'
        : 'تركيبات العود الأكثر شهرة',
      image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      count: 4,
      link: '/shop',
    },
    {
      id: 'floral-elegance',
      name: language === 'en' ? 'Floral Elegance' : 'أناقة زهرية',
      description: language === 'en'
        ? 'Delicate and sophisticated floral fragrances'
        : 'عطور زهرية رقيقة ومتطورة',
      image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      count: 2,
      link: '/shop',
    },
    {
      id: 'oriental-nights',
      name: language === 'en' ? 'Oriental Nights' : 'ليالي شرقية',
      description: language === 'en'
        ? 'Rich, warm fragrances for evening wear'
        : 'عطور غنية ودافئة للارتداء المسائي',
      image: 'https://images.unsplash.com/photo-1729101807924-3446ca9aa480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      count: 5,
      link: '/shop',
    },
    {
      id: 'summer-collection',
      name: language === 'en' ? 'Summer Collection' : 'مجموعة الصيف',
      description: language === 'en'
        ? 'Light and refreshing scents for warmer days'
        : 'روائح خفيفة ومنعشة للأيام الدافئة',
      image: 'https://images.unsplash.com/photo-1664470740442-f5de3e512e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      count: 2,
      link: '/shop',
    },
    {
      id: 'limited-editions',
      name: language === 'en' ? 'Limited Editions' : 'إصدارات محدودة',
      description: language === 'en'
        ? 'Exclusive fragrances available for a limited time'
        : 'عطور حصرية متاحة لفترة محدودة',
      image: 'https://images.unsplash.com/photo-1749497636434-82e53b6358b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      count: 1,
      link: '/shop',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F1] pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <p className="text-sm tracking-widest mb-6 uppercase text-[#101010]/60">
            {language === 'en' ? 'Curated Collections' : 'مجموعات منسقة'}
          </p>
          <h1 className="text-6xl lg:text-7xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
            {language === 'en' ? 'Our Collections' : 'مجموعاتنا'}
          </h1>
          <p className="text-lg text-[#101010]/60 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Explore our carefully curated fragrance collections, each telling a unique olfactory story.'
              : 'استكشف مجموعات العطور المنسقة بعناية، ��ل منها يحكي قصة عطرية فريدة.'}
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={idx === 0 ? 'md:col-span-2' : ''}
            >
              <Link to={collection.link} className="group block relative overflow-hidden bg-white/50">
                <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <ImageWithFallback
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-[#101010]/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                    {collection.id === 'new-arrivals' && (
                      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs tracking-wider uppercase">
                          {language === 'en' ? 'New' : 'جديد'}
                        </span>
                      </div>
                    )}
                    <h2
                      className={`mb-3 ${idx === 0 ? 'text-5xl lg:text-6xl' : 'text-3xl lg:text-4xl'}`}
                      style={{ fontFamily: 'Playfair Display' }}
                    >
                      {collection.name}
                    </h2>
                    <p className="text-white/80 mb-4 max-w-xl">{collection.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span>
                        {collection.count} {language === 'en' ? 'fragrances' : 'عطور'}
                      </span>
                      <ArrowRight className={`w-5 h-5 group-hover:translate-x-2 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center p-16 bg-gradient-to-br from-amber-50 to-orange-50 border border-[#101010]/5"
        >
          <h2 className="text-4xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
            {language === 'en' ? "Can't Find Your Perfect Scent?" : 'لا تجد عطرك المثالي؟'}
          </h2>
          <p className="text-lg text-[#101010]/70 mb-8">
            {language === 'en'
              ? 'Take our personalized scent quiz to discover fragrances that match your unique preferences.'
              : 'خذ اختبار العطر الشخصي لاكتشاف العطور التي تناسب تفضيلاتك الفريدة.'}
          </p>
          <Link
            to="/scent-quiz"
            className="inline-block px-8 py-4 bg-[#101010] text-[#FAF7F1] hover:bg-[#101010]/90 transition-colors"
          >
            {language === 'en' ? 'Take the Quiz' : 'خذ الاختبار'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}