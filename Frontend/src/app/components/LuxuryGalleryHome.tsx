import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { GalleryButton } from '@/app/components/GalleryButton';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useLanguage } from '@/app/context/LanguageContext';

function PerfumeMist() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden mix-blend-multiply">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 150, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-[#EC4899] rounded-full filter blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -100, 0],
          y: [0, 150, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-[#A855F7] rounded-full filter blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] bg-[#F59E0B] rounded-full filter blur-[150px]"
      />
    </div>
  );
}

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#101010] flex flex-col items-center justify-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#EC4899]/20 rounded-full blur-[100px]" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-display uppercase tracking-[0.4em] mb-8 font-light">
          Kahramana
        </h1>
        
        <div className="w-64 h-[1px] bg-white/20 mx-auto relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        
        <div className="mt-4 text-xs tracking-[0.3em] text-white/50 uppercase">
          {progress}%
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LuxuryGalleryHome() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);

  // Scroll logic for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5, 1], [1, 0.8, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);

  // Scroll logic for Scent Library (Horizontal Scroll)
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ['start start', 'end end'],
  });
  const galleryX = useTransform(galleryScroll, [0, 1], ['0%', '-65%']);

  const featuredProducts = [
    {
      id: 'oud-royal',
      name: t('product.oudRoyal'),
      nameAr: 'عود ملكي',
      price: 349,
      image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      year: '2025',
    },
    {
      id: 'amber-nights',
      name: t('product.amberNights'),
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2024',
    },
    {
      id: 'rose-mystique',
      name: t('product.roseMystique'),
      nameAr: 'الوردة الغامضة',
      price: 279,
      image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2024',
    },
  ];

  const notes = [
    { 
      name: t('note.oud'), 
      nameAr: 'عود',
      origin: language === 'en' ? 'Cambodia' : 'كمبوديا',
      image: 'https://images.unsplash.com/photo-1615309258975-226d9be6a8c6?w=600&h=800&fit=crop'
    },
    { 
      name: t('note.amber'), 
      nameAr: 'عنبر',
      origin: language === 'en' ? 'Baltic' : 'بلطيق',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop'
    },
    { 
      name: t('note.rose'), 
      nameAr: 'ورد',
      origin: language === 'en' ? 'Taif' : 'الطائف',
      image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&h=800&fit=crop'
    },
    { 
      name: t('note.musk'), 
      nameAr: 'مسك',
      origin: language === 'en' ? 'White' : 'أبيض',
      image: 'https://images.unsplash.com/photo-1555528091-68903c7340b9?w=600&h=800&fit=crop'
    },
    { 
      name: t('note.jasmine'), 
      nameAr: 'ياسمين',
      origin: language === 'en' ? 'Grasse' : 'غراس',
      image: 'https://images.unsplash.com/photo-1595255944594-615b28fef523?w=600&h=800&fit=crop'
    },
  ];

  return (
    <div className="relative bg-[#FAF7F1] min-h-screen">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <PerfumeMist />

      {/* 1. SCROLL-LOCKED HERO */}
      <section ref={heroRef} className="h-[200vh] relative z-10">
        <div className="sticky top-0 h-screen overflow-hidden bg-[#101010]">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            className="absolute inset-0 transform-gpu"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
              alt="Hero"
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-16 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={!loading ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl pointer-events-auto"
            >
              <h1 className={`text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.85] text-white ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
                <span className="block text-white/90">
                  {t('home.hero.title').split('…')[0]}
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] mt-4 pb-4">
                  {t('home.hero.title').split('…')[1] || 'Canvas'}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/shop" data-cursor-text="Shop">
                  <GalleryButton variant="gradient" size="lg" className="rounded-full px-8 py-4">
                    <span className="flex items-center gap-3">
                      {t('home.cta.explore')}
                      <ArrowRight size={18} className={language === 'ar' ? 'rotate-180' : ''} />
                    </span>
                  </GalleryButton>
                </Link>
                <Link to="/scent-quiz" data-cursor-text="Quiz">
                  <GalleryButton variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white hover:text-black">
                    <span className="flex items-center gap-3">
                      <Sparkles size={16} />
                      {t('home.quiz.cta')}
                    </span>
                  </GalleryButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING FEATURED COLLECTION */}
      <section className="relative z-20 py-32 bg-[#FAF7F1] rounded-t-[40px] -mt-8 border-t border-white/50 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="mb-24 flex items-end justify-between">
              <div>
                <span className="text-xs tracking-[0.5em] uppercase text-[#EC4899] block mb-4">
                  {t('home.featured.label')}
                </span>
                <h2 className={`text-5xl lg:text-6xl ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
                  {t('home.featured.title')}
                </h2>
              </div>
              <Link to="/shop" className="hidden md:flex items-center gap-3 text-sm tracking-[0.2em] uppercase hover:text-[#EC4899] transition-colors border-b border-black pb-1">
                {t('home.featured.viewAll')}
              </Link>
            </div>
          </ScrollReveal>

          <div className="space-y-32">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={0.1}>
                <div className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="w-full lg:w-3/5 group relative">
                    <Link to={`/product/${product.id}`} data-cursor-text="View Product">
                      <div className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-sm glass-card border border-white/40 shadow-luxury">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="w-full h-full"
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-right-8' : '-left-8'} hidden lg:block`}>
                        <div className="text-[120px] font-display text-white drop-shadow-xl font-bold opacity-80 mix-blend-overlay">
                          0{index + 1}
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="w-full lg:w-2/5 px-4 lg:px-12">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0]">
                        {product.year}
                      </span>
                      <div className="h-[1px] w-12 bg-[#E8E5E0]" />
                    </div>
                    <h3 className={`text-4xl lg:text-5xl mb-6 ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
                      {language === 'ar' ? product.nameAr : product.name}
                    </h3>
                    <p className="text-[#6B6B6B] leading-relaxed mb-8 font-light text-lg">
                      {language === 'en'
                        ? 'An exceptional composition that captures the essence of luxury and tradition, presented in a masterpiece flacon.'
                        : 'تركيبة استثنائية تلتقط جوهر الفخامة والتقاليد، مقدمة في زجاجة تحفة فنية.'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-display">${product.price}</span>
                      <Link to={`/product/${product.id}`} className="group flex items-center gap-2 text-sm tracking-[0.2em] uppercase hover:text-[#EC4899] transition-colors">
                        <span>{t('home.cta.explore')}</span>
                        <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLL SCENT LIBRARY */}
      <section ref={galleryRef} className="h-[400vh] relative bg-[#101010]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-[#EC4899]/10 to-transparent rounded-full blur-[100px]" />
          </div>

          <div className="absolute top-12 md:top-24 left-6 lg:left-12 z-20 text-white max-w-lg">
            <span className="text-xs tracking-[0.5em] uppercase text-[#A855F7] block mb-4">
              {t('home.notes.label')}
            </span>
            <h2 className={`text-5xl lg:text-7xl mb-6 ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
              Scent Library
            </h2>
            <p className="text-white/60 font-light text-lg hidden md:block">
              {language === 'en'
                ? 'Immerse yourself in our curated gallery of precious ingredients, sourced from the finest origins around the world.'
                : 'انغمس في معرضنا المنسق للمكونات الثمينة، والتي تم الحصول عليها من أفضل الأصول في جميع أنحاء العالم.'}
            </p>
          </div>

          <motion.div
            style={{ x: galleryX }}
            className="flex gap-8 md:gap-16 px-6 lg:px-[20vw] pt-[20vh] items-center w-max"
          >
            {notes.map((note, index) => (
              <div 
                key={index} 
                className="w-[300px] h-[400px] md:w-[450px] md:h-[600px] shrink-0 relative group rounded-sm overflow-hidden"
                data-cursor-text="Discover Note"
              >
                <div className="absolute inset-0 border border-white/20 z-20 pointer-events-none rounded-sm transition-colors duration-500 group-hover:border-[#EC4899]/50" />
                
                <ImageWithFallback
                  src={note.image}
                  alt={note.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                />
                
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#EC4899]">0{index + 1}</span>
                    <div className="h-[1px] flex-1 bg-white/20" />
                    <span className="text-xs tracking-[0.2em] uppercase text-white/60">{note.origin}</span>
                  </div>
                  
                  <h3 className={`text-4xl md:text-5xl mb-2 ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
                    {language === 'ar' ? note.nameAr : note.name}
                  </h3>
                  
                  <div className="mt-6 flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
                    <span className="flex items-center gap-2">
                      Explore <ArrowRight size={14} className={language === 'ar' ? 'rotate-180' : ''} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. CINEMATIC PHILOSOPHY SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black text-white">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706040317010-39b62b87e474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Philosophy"
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <Sparkles className="w-8 h-8 mx-auto mb-8 text-[#A855F7] opacity-80" />
            <h2 className={`text-4xl md:text-6xl lg:text-7xl mb-12 leading-tight ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
              {t('home.story.title')}
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent mx-auto mb-12" />
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-12">
              {t('home.story.text1')}
            </p>
            <Link to="/about">
              <GalleryButton variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-black">
                {t('home.story.cta')}
              </GalleryButton>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}