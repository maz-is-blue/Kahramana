import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Sparkles, Heart, Leaf, Award } from 'lucide-react';

export function BrandStory() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <div ref={containerRef} className="bg-[#FAF7F1] relative">
      {/* Hero Section - Sticky */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, opacity: opacity1 }} className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Kahramana Story"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-sm tracking-widest mb-6 uppercase text-[#101010]/60">
              {language === 'en' ? 'Our Story' : 'قصتنا'}
            </p>
            <h1 className="text-6xl lg:text-8xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
              {language === 'en' ? 'Kahramana' : 'كهرمانة'}
            </h1>
            <p className="text-2xl lg:text-3xl text-[#101010]/70 max-w-3xl mx-auto" style={{ fontFamily: 'Playfair Display' }}>
              {language === 'en'
                ? 'Where Tradition Meets Artistry'
                : 'حيث يلتقي التقليد بالفن'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scrollytelling Content */}
      <div className="relative bg-[#FAF7F1]">
        {/* Section 1: The Beginning */}
        <section className="min-h-screen flex items-center py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-sm tracking-wider text-amber-900">
                    {language === 'en' ? 'THE BEGINNING' : 'البداية'}
                  </span>
                </div>
                <h2 className="text-5xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
                  {language === 'en' ? 'Born from Passion' : 'ولدت من الشغف'}
                </h2>
                <p className="text-lg text-[#101010]/70 leading-relaxed mb-6">
                  {language === 'en'
                    ? 'In the heart of Dubai, master perfumer Layla Al-Rashid discovered her calling in the ancient souks, where amber stones glistened like captured sunlight. These precious gems, known in Arabic as "kahramana," became the inspiration for a fragrance house that would bridge centuries of tradition with contemporary artistry.'
                    : 'في قلب دبي، اكتشفت العطارة الرئيسية ليلى ال��شيد دعوتها في الأسواق القديمة، حيث تتلألأ أحجار العنبر مثل ضوء الشمس الأسير. أصبحت هذه الأحجار الثمينة، المعروفة بالعربية باسم "كهرمانة"، مصدر الإلهام لبيت عطور يربط قرون من التقليد بالفن المعاصر.'}
                </p>
                <p className="text-lg text-[#101010]/70 leading-relaxed">
                  {language === 'en'
                    ? 'Each fragrance tells a story, each bottle holds a memory, and every scent is a work of art waiting to be experienced.'
                    : 'كل عطر يحكي قصة، كل زجاجة تحمل ذكرى، وكل رائحة هي عمل فني ينتظر أن يُعاش.'}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="aspect-[4/5] bg-white/50 overflow-hidden"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615309258975-226d9be6a8c6?w=800&h=1000&fit=crop"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Philosophy */}
        <section className="py-32 bg-gradient-to-b from-[#FAF7F1] to-white/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-sm tracking-widest mb-6 uppercase text-[#101010]/60">
                {language === 'en' ? 'Our Philosophy' : 'فلسفتنا'}
              </p>
              <h2 className="text-5xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
                {language === 'en' ? 'Core Values' : 'القيم الأساسية'}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: language === 'en' ? 'Artistry' : 'الفن',
                  titleEn: 'Artistry',
                  description: language === 'en'
                    ? 'We approach perfumery as an art form, creating olfactory masterpieces that transcend time.'
                    : 'نتعامل مع صناعة العطور كفن، نخلق روائع عطرية تتجاوز الزمن.',
                },
                {
                  icon: Heart,
                  title: language === 'en' ? 'Heritage' : 'التراث',
                  titleEn: 'Heritage',
                  description: language === 'en'
                    ? 'Rooted in Arabic perfume tradition, we honor centuries of fragrance craftsmanship.'
                    : 'متجذرون في تقليد العطور العربية، نكرم قرون من حرفية العطور.',
                },
                {
                  icon: Leaf,
                  title: language === 'en' ? 'Quality' : 'الجودة',
                  titleEn: 'Quality',
                  description: language === 'en'
                    ? 'Only the finest natural ingredients are selected for our compositions.'
                    : 'يتم اختيار أجود المكونات الطبيعية فقط لتركيباتنا.',
                },
                {
                  icon: Award,
                  title: language === 'en' ? 'Innovation' : 'الابتكار',
                  titleEn: 'Innovation',
                  description: language === 'en'
                    ? 'Blending traditional methods with contemporary artistry to create unique scents.'
                    : 'مزج الطرق التقليدية مع الفن المعاصر لخلق روائح فريدة.',
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white/50 border border-[#101010]/5 hover:border-[#101010]/20 transition-colors"
                >
                  <value.icon className="w-10 h-10 mb-6 text-amber-600" />
                  <h3 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display' }}>
                    {value.title}
                  </h3>
                  <p className="text-[#101010]/70 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The Process */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-sm tracking-widest mb-6 uppercase text-[#101010]/60">
                {language === 'en' ? 'Our Process' : 'عمليتنا'}
              </p>
              <h2 className="text-5xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
                {language === 'en' ? 'The Making of an Artwork' : 'صنع عمل فني'}
              </h2>
            </motion.div>

            <div className="space-y-24">
              {[
                {
                  step: '01',
                  title: language === 'en' ? 'Ingredient Selection' : 'اختيار المكونات',
                  description: language === 'en'
                    ? 'We travel the world to source the finest natural essences from trusted suppliers. From Cambodian oud to Bulgarian rose, each ingredient is carefully chosen for its exceptional quality and unique character.'
                    : 'نسافر حول العالم للحصول على أجود الجواهر الطبيعية من موردين موثوقين. من العود الكمبودي إلى الورد البلغاري، يتم اختيار كل مكون بعناية لجودته الاستثنائية وطابعه الفريد.',
                  image: 'https://images.unsplash.com/photo-1615309258975-226d9be6a8c6?w=800&h=600&fit=crop',
                },
                {
                  step: '02',
                  title: language === 'en' ? 'Composition' : 'التأليف',
                  description: language === 'en'
                    ? 'Like a painter with a palette, our master perfumers blend notes to create harmonious and unique fragrances. Each composition is a delicate balance of top, heart, and base notes.'
                    : 'مثل رسام بلوحة، يمزج عطارونا الرئيسيون النوتات لخلق عطور متناغمة وفريدة. كل تركيبة هي توازن دقيق بين نوتات الرأس والقلب والقاعدة.',
                  image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
                },
                {
                  step: '03',
                  title: language === 'en' ? 'Maturation' : 'النضج',
                  description: language === 'en'
                    ? 'Patience is essential in perfumery. We allow our fragrances to mature and develop complexity over time, sometimes for several months, until they achieve perfection.'
                    : 'الصبر ضروري في صناعة العطور. نسمح لعطورنا بالنضج وتطوير التعقيد بمرور الوقت، أحياناً لعدة أشهر، حتى تحقق الكمال.',
                  image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
                },
                {
                  step: '04',
                  title: language === 'en' ? 'Refinement' : 'التنقيح',
                  description: language === 'en'
                    ? 'The final stage involves perfecting every detail. Each fragrance is tested, adjusted, and refined until it achieves the artistic vision we set out to create.'
                    : 'المرحلة النهائية تتضمن إتقان كل التفاصيل. يتم اختبار كل عطر وتعديله وتنقيحه حتى يحقق الرؤية الفنية التي حددناها.',
                  image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${
                    idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <span className="text-6xl font-light text-[#101010]/10 mb-4 block" style={{ fontFamily: 'Playfair Display' }}>
                      {step.step}
                    </span>
                    <h3 className="text-4xl mb-6" style={{ fontFamily: 'Playfair Display' }}>
                      {step.title}
                    </h3>
                    <p className="text-lg text-[#101010]/70 leading-relaxed">{step.description}</p>
                  </div>
                  <div className={`aspect-[4/3] bg-white/50 overflow-hidden ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Section: Quote */}
        <section className="py-32 bg-[#101010] text-[#FAF7F1]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <p className="text-3xl lg:text-4xl mb-8 leading-relaxed" style={{ fontFamily: 'Playfair Display' }}>
              {language === 'en'
                ? '"For me, creating a perfume is like painting with scent. Each note is a brushstroke, each composition a canvas. I want people to experience our fragrances not just as perfumes, but as artworks that evoke emotion and memory."'
                : '"بالنسبة لي، صنع العطر يشبه الرسم بالعطر. كل نوتة هي ضربة فرشاة، كل تركيبة هي لوحة قماشية. أريد من الناس أن يختبروا عطورنا ليس فقط كعطور، ولكن كأعمال فنية تثير العاطفة والذاكرة."'}
            </p>
            <div className="border-t border-[#FAF7F1]/20 pt-6 inline-block">
              <p className="text-xl mb-2" style={{ fontFamily: 'Playfair Display' }}>
                {language === 'en' ? 'Layla Al-Rashid' : 'ليلى الرشيد'}
              </p>
              <p className="text-sm text-[#FAF7F1]/60 tracking-wider">
                {language === 'en' ? 'Master Perfumer & Creative Director' : 'عطار رئيسي ومدير إبداعي'}
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}