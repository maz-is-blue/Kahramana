import { motion } from 'motion/react';
import { useLanguage } from '@/app/context/LanguageContext';
import { ArtworkCard } from '@/app/components/ArtworkCard';
import { ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function GalleryHome() {
  const featuredArtworks = [
    {
      id: 'amber-nights',
      name: 'Amber Nights',
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Eau de Parfum',
      notes: ['Amber', 'Vanilla', 'Tobacco'],
      isNew: true,
    },
    {
      id: 'oud-royal',
      name: 'Oud Royal',
      nameAr: 'عود ملكي',
      price: 349,
      image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2025',
      concentration: 'Parfum',
      notes: ['Oud', 'Rose', 'Saffron'],
    },
    {
      id: 'rose-mystique',
      name: 'Rose Mystique',
      nameAr: 'الوردة الغامضة',
      price: 279,
      image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      year: '2026',
      concentration: 'Eau de Parfum',
      notes: ['Rose', 'Jasmine', 'Musk'],
    },
  ];

  const scentNotes = [
    { name: 'Oud', nameAr: 'عود', count: 12 },
    { name: 'Amber', nameAr: 'عنبر', count: 8 },
    { name: 'Musk', nameAr: 'مسك', count: 15 },
    { name: 'Rose', nameAr: 'ورد', count: 10 },
    { name: 'Jasmine', nameAr: 'ياسمين', count: 7 },
    { name: 'Sandalwood', nameAr: 'صندل', count: 9 },
  ];

  const testimonials = [
    {
      text: 'A masterpiece in a bottle. The craftsmanship is evident in every note.',
      author: 'Sarah Al-Mansoori',
      authorAr: 'سارة المنصوري',
    },
    {
      text: 'Kahramana creates art you can wear. Truly exceptional.',
      author: 'Omar Hassan',
      authorAr: 'عمر حسن',
    },
    {
      text: 'The most elegant and sophisticated fragrances I have experienced.',
      author: 'Layla Rahman',
      authorAr: 'ليلى رحمن',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Gradient Ribbon - Subtle */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[400px] gradient-ribbon blur-[120px] rotate-45 opacity-20" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-8"
            >
              Kahramana Exhibition 2026
            </motion.p>

            {/* Main Headline - Arabic */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-display mb-6 leading-[1.1] text-[#101010] arabic-text"
            >
              العطر… لوحة لا تُنسى
            </motion.h1>

            {/* Subtext - English */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-lg lg:text-2xl text-[#6B6B6B] mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              A curated collection of scents crafted like art.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/shop">
                <GalleryButton size="lg">Explore the Exhibition</GalleryButton>
              </Link>
              <Link to="/shop">
                <GalleryButton variant="outline" size="lg">
                  Shop Collection
                </GalleryButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-[#E8E5E0] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Featured</p>
          <h2 className="text-4xl lg:text-6xl font-display text-[#101010] mb-4">
            Current Exhibition
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl">
            Our most celebrated fragrances, each a work of art.
          </p>
        </motion.div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              style={{ marginTop: index % 2 === 1 ? '4rem' : '0' }}
            >
              <ArtworkCard {...artwork} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/shop">
            <GalleryButton variant="text">
              View Full Collection
              <ArrowRight className="ml-2" size={16} />
            </GalleryButton>
          </Link>
        </div>
      </section>

      {/* The Notes Wall */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1800px] mx-auto border-y border-[#E8E5E0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Scent Library</p>
          <h2 className="text-4xl lg:text-6xl font-display text-[#101010] mb-4">The Notes Wall</h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Explore our fragrances by their essence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {scentNotes.map((note, index) => (
            <motion.button
              key={note.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="group text-center py-12 border border-[#E8E5E0] bg-white hover:border-[#EC4899] transition-all duration-500 hover:shadow-soft"
            >
              <h3 className="text-2xl font-display text-[#101010] mb-2 group-hover:text-[#EC4899] transition-colors">
                {note.name}
              </h3>
              <p className="text-sm text-[#6B6B6B] arabic-text mb-4">{note.nameAr}</p>
              <p className="text-xs text-[#A0A0A0]">{note.count} artworks</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Curator's Story */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] bg-white border border-[#E8E5E0] p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1706040317010-39b62b87e474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Perfume Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">About</p>
            <h2 className="text-4xl lg:text-6xl font-display text-[#101010] mb-8 leading-tight">
              The Art of
              <span className="block mt-2 gradient-text">Perfume Making</span>
            </h2>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-6">
              At Kahramana, we approach perfumery as an art form. Each fragrance is a carefully
              composed piece, blending the finest ingredients to create olfactory masterpieces.
            </p>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8 arabic-text">
              في كهرمانة، نتعامل مع صناعة العطور كفن. كل عطر هو قطعة مؤلفة بعناية، تمزج أجود
              المكونات لخلق روائع عطرية.
            </p>
            <Link to="/about">
              <GalleryButton>
                Discover Our Story
                <ArrowRight className="ml-2" size={16} />
              </GalleryButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Limited Edition Exhibit Banner */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white border border-[#E8E5E0] p-12 lg:p-20 overflow-hidden"
        >
          {/* Decorative Gradient */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] gradient-ribbon blur-[100px] opacity-30" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">
              Limited Collection
            </p>
            <h2 className="text-4xl lg:text-7xl font-display text-[#101010] mb-6 leading-tight">
              Rare Editions
            </h2>
            <p className="text-lg text-[#6B6B6B] mb-8 leading-relaxed">
              Exclusive artworks available for a limited time only. Each piece is numbered and
              accompanied by a certificate of authenticity.
            </p>
            <Link to="/shop?filter=limited">
              <GalleryButton size="lg">
                View Limited Editions
                <ArrowRight className="ml-2" size={16} />
              </GalleryButton>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Gallery Testimonials */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Testimonials</p>
          <h2 className="text-4xl lg:text-6xl font-display text-[#101010]">Visitor Reflections</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              className="bg-white border border-[#E8E5E0] p-8 lg:p-10"
            >
              <Quote className="text-[#E8E5E0] mb-6" size={32} />
              <p className="text-lg text-[#6B6B6B] leading-relaxed mb-8 italic">
                {testimonial.text}
              </p>
              <div className="border-t border-[#E8E5E0] pt-6">
                <p className="text-sm font-medium text-[#101010]">{testimonial.author}</p>
                <p className="text-xs text-[#A0A0A0] arabic-text mt-1">{testimonial.authorAr}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kahramana Journal */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-[1800px] mx-auto border-t border-[#E8E5E0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Insights</p>
          <h2 className="text-4xl lg:text-6xl font-display text-[#101010] mb-4">
            The Kahramana Journal
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl">
            Thoughts on fragrance, artistry, and the poetics of scent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              title: 'The Art of Layering',
              date: 'January 2026',
              excerpt: 'Discover how to combine fragrances to create your unique signature...',
            },
            {
              title: 'Understanding Oud',
              date: 'December 2025',
              excerpt: 'An exploration of the most precious ingredient in perfumery...',
            },
            {
              title: 'Perfume Rituals',
              date: 'November 2025',
              excerpt: 'Creating meaningful moments through the art of fragrance...',
            },
          ].map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group"
            >
              <div className="aspect-[4/3] bg-[#F3F1ED] mb-6 overflow-hidden">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-${1700000000000 + index * 1000000}?w=600&h=450&fit=crop`}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs tracking-wider uppercase text-[#A0A0A0] mb-3">
                {article.date}
              </p>
              <h3 className="text-2xl font-display text-[#101010] mb-3 group-hover:text-[#EC4899] transition-colors">
                {article.title}
              </h3>
              <p className="text-[#6B6B6B] mb-4 leading-relaxed">{article.excerpt}</p>
              <button className="text-xs tracking-widest uppercase text-[#101010] hover:text-[#EC4899] transition-colors underline underline-offset-4">
                Read More
              </button>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}