import { motion } from 'motion/react';
import { useLanguage } from '@/app/context/LanguageContext';
import { ProductCard } from '@/app/components/ProductCard';
import { ArrowRight, Sparkles, Heart, Award, Leaf } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function HomePage() {
  // Mock product data
  const signatureCollection = [
    {
      id: 'amber-nights',
      name: 'Amber Nights',
      nameAr: 'ليالي العنبر',
      price: 299,
      image: 'https://images.unsplash.com/photo-1765031117402-93b2e530edec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGVyZnVtZSUyMGFtYmVyJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAwMjc5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.9,
      reviews: 234,
      isNew: true,
    },
    {
      id: 'oud-royal',
      name: 'Oud Royal',
      nameAr: 'عود ملكي',
      price: 349,
      image: 'https://images.unsplash.com/photo-1630512873562-ee0deb00ed4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwb3VkJTIwYm90dGxlJTIwYmxhY2t8ZW58MXx8fHwxNzcwMDI3OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 5.0,
      reviews: 456,
      isBestseller: true,
    },
    {
      id: 'rose-mystique',
      name: 'Rose Mystique',
      nameAr: 'الوردة الغامضة',
      price: 279,
      image: 'https://images.unsplash.com/photo-1545936761-c64b78657cb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwcm9zZSUyMGJvdHRsZSUyMHBpbmt8ZW58MXx8fHwxNzcwMDI3OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.8,
      reviews: 189,
    },
    {
      id: 'musk-noir',
      name: 'Musk Noir',
      nameAr: 'المسك الأسود',
      price: 319,
      image: 'https://images.unsplash.com/photo-1729101807924-3446ca9aa480?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwbXVzayUyMGJvdHRsZXxlbnwxfHx8fDE3NzAwMjc5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      rating: 4.7,
      reviews: 321,
      isBestseller: true,
    },
  ];

  const scentNotes = [
    { name: 'Oud', nameAr: 'عود', icon: '🌳', color: 'from-amber-900 to-yellow-900' },
    { name: 'Amber', nameAr: 'عنبر', icon: '✨', color: 'from-orange-600 to-amber-500' },
    { name: 'Musk', nameAr: 'مسك', icon: '🌙', color: 'from-purple-900 to-pink-900' },
    { name: 'Rose', nameAr: 'ورد', icon: '🌹', color: 'from-pink-600 to-rose-500' },
    { name: 'Jasmine', nameAr: 'ياسمين', icon: '🌸', color: 'from-purple-600 to-pink-600' },
    { name: 'Sandalwood', nameAr: 'صندل', icon: '🪵', color: 'from-yellow-800 to-amber-700' },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      nameAr: 'سارة م.',
      text: 'Absolutely stunning! The Oud Royal is my signature scent now. The quality and longevity are unmatched.',
      rating: 5,
      product: 'Oud Royal',
    },
    {
      name: 'Ahmed K.',
      nameAr: 'أحمد ك.',
      text: 'Kahramana captures the essence of luxury. Every bottle is a masterpiece. Highly recommend!',
      rating: 5,
      product: 'Amber Nights',
    },
    {
      name: 'Layla R.',
      nameAr: 'ليلى ر.',
      text: 'The Rose Mystique is incredibly elegant and sophisticated. I receive compliments every time I wear it.',
      rating: 5,
      product: 'Rose Mystique',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#070707] via-[#0D0D0D] to-[#141414]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#D946EF]/20 via-[#A855F7]/20 to-[#EC4899]/20 blur-[100px] rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#F59E0B]/20 via-[#EC4899]/20 to-[#A855F7]/20 blur-[120px] rounded-full"
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo */}
            <motion.img
              src="figma:asset/20325f9946ab10549da529e5c8accc9f419c8024.png"
              alt="Kahramana"
              className="h-20 lg:h-28 w-auto mx-auto mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display mb-6 leading-tight">
              <span className="block text-[#F4F0EA]">Luxury Perfumes.</span>
              <span className="block gradient-text mt-2">Crafted to Leave a Memory.</span>
            </h1>

            {/* Arabic Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-arabic arabic-text text-[#B8B3AB] mb-12">
              عطور فاخرة تترك أثراً لا يُنسى
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/shop">
                <Button size="lg" className="min-w-[200px]">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Discover Collection
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/40 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Collection */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">
            Signature Collection
          </h2>
          <p className="text-lg text-[#B8B3AB] max-w-2xl mx-auto arabic-text">
            مجموعتنا المميزة
          </p>
        </motion.div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
          <div className="flex lg:grid lg:grid-cols-4 gap-6 min-w-max lg:min-w-0">
            {signatureCollection.map((product) => (
              <div key={product.id} className="w-[280px] lg:w-auto">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/shop">
            <Button variant="outline" size="lg">
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Scent Notes Interactive Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#D946EF]/10 via-[#A855F7]/10 to-[#EC4899]/10 blur-[150px] rounded-full" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">
              Explore Scent Notes
            </h2>
            <p className="text-lg text-[#B8B3AB]">
              Discover the essence of our fragrances
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {scentNotes.map((note, index) => (
              <motion.div
                key={note.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative glass-panel rounded-2xl p-8 text-center cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${note.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{note.icon}</div>
                    <h3 className="font-display text-xl text-[#F4F0EA] mb-2 group-hover:text-[#BFA26A] transition-colors">
                      {note.name}
                    </h3>
                    <p className="text-sm text-[#B8B3AB] arabic-text">{note.nameAr}</p>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${note.color} blur-xl`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/20 via-[#A855F7]/20 to-[#EC4899]/20 blur-3xl" />
              
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1706040317010-39b62b87e474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwY3JhZnRzbWFuc2hpcCUyMGFyYWJpY3xlbnwxfHx8fDE3NzAwMjc5NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Perfume Craftsmanship"
                className="relative z-10 w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-display mb-6 text-[#F4F0EA] leading-tight">
              The Art of
              <span className="block gradient-text mt-2">Perfume Crafting</span>
            </h2>
            <p className="text-lg text-[#B8B3AB] leading-relaxed mb-8">
              At Kahramana, we believe every scent tells a story. Our master perfumers blend
              the finest Arabic and Oriental ingredients to create fragrances that transcend
              time and culture.
            </p>
            <p className="text-lg text-[#B8B3AB] leading-relaxed mb-8 arabic-text">
              في كهرمانة، نؤمن بأن كل رائحة تروي قصة. يمزج صانعو العطور لدينا أجود المكونات
              العربية والشرقية لخلق عطور تتجاوز الزمان والثقافة.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Award, label: 'Premium Quality', labelAr: 'جودة فاخرة' },
                { icon: Leaf, label: 'Natural Ingredients', labelAr: 'مكونات طبيعية' },
                { icon: Heart, label: 'Handcrafted', labelAr: 'صناعة يدوية' },
                { icon: Sparkles, label: 'Unique Blends', labelAr: 'خلطات فريدة' },
              ].map((value) => (
                <div key={value.label} className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D946EF]/20 to-[#EC4899]/20 flex items-center justify-center flex-shrink-0">
                    <value.icon className="text-[#BFA26A]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#F4F0EA] font-medium">{value.label}</p>
                    <p className="text-sm text-[#B8B3AB] arabic-text">{value.labelAr}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button size="lg">
                Discover Our Story
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#B8B3AB] arabic-text">آراء عملائنا</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-[#BFA26A]/30 transition-all duration-500"
            >
              {/* Glow Border on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/10 to-[#EC4899]/10 blur-xl" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Sparkles key={i} className="text-[#BFA26A] fill-[#BFA26A]" size={16} />
                  ))}
                </div>

                {/* Review */}
                <p className="text-[#B8B3AB] leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div>
                  <p className="text-[#F4F0EA] font-display">{testimonial.name}</p>
                  <p className="text-sm text-[#B8B3AB] arabic-text">{testimonial.nameAr}</p>
                  <p className="text-sm text-[#BFA26A] mt-2">{testimonial.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">
            #KahramanaScent
          </h2>
          <p className="text-lg text-[#B8B3AB]">Follow our journey on Instagram</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-xl overflow-hidden group cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/0 to-[#EC4899]/0 group-hover:from-[#D946EF]/40 group-hover:to-[#EC4899]/40 transition-all duration-500 z-10" />
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-${1640000000000 + i * 1000000}?w=400&h=400&fit=crop`}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}