import { motion } from 'motion/react';
import { Award, Heart, Leaf, Sparkles, Users, Globe } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Authenticity',
      titleAr: 'الأصالة',
      description: 'Every fragrance is crafted with genuine, premium ingredients sourced from around the world.',
    },
    {
      icon: Heart,
      title: 'Craftsmanship',
      titleAr: 'الحرفية',
      description: 'Our master perfumers blend tradition with innovation to create timeless scents.',
    },
    {
      icon: Leaf,
      title: 'Elegance',
      titleAr: 'الأناقة',
      description: 'We believe in creating sophisticated fragrances that embody grace and luxury.',
    },
    {
      icon: Sparkles,
      title: 'Premium Ingredients',
      titleAr: 'مكونات فاخرة',
      description: 'Only the finest oud, amber, musk, and floral essences make it into our bottles.',
    },
  ];

  const team = [
    {
      name: 'Layla Al-Rashid',
      nameAr: 'ليلى الرشيد',
      role: 'Founder & Master Perfumer',
      roleAr: 'المؤسسة وصانعة العطور الرئيسية',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      name: 'Omar Hassan',
      nameAr: 'عمر حسن',
      role: 'Creative Director',
      roleAr: 'المدير الإبداعي',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    },
    {
      name: 'Amira Khalil',
      nameAr: 'أميرة خليل',
      role: 'Head of Production',
      roleAr: 'رئيسة الإنتاج',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative mb-20 lg:mb-32">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl lg:text-7xl font-display mb-6 text-[#F4F0EA] leading-tight">
                The Story of
                <span className="block gradient-text mt-2">Kahramana</span>
              </h1>
              <h2 className="text-3xl lg:text-4xl font-arabic arabic-text text-[#B8B3AB] mb-8">
                قصة كهرمانة
              </h2>
              <p className="text-lg text-[#B8B3AB] leading-relaxed mb-6">
                Founded in the heart of Dubai, Kahramana represents the perfect fusion of
                traditional Arabic perfumery and contemporary luxury. Our name, inspired by the
                precious amber stone, reflects our commitment to creating fragrances that are both
                timeless and rare.
              </p>
              <p className="text-lg text-[#B8B3AB] leading-relaxed arabic-text">
                تأسست كهرمانة في قلب دبي، وتمثل الاندماج المثالي بين صناعة العطور العربية التقليدية
                والفخامة المعاصرة. اسمنا، المستوحى من حجر الكهرمان الثمين، يعكس التزامنا بصنع عطور
                خالدة ونادرة.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/20 via-[#A855F7]/20 to-[#EC4899]/20 blur-3xl" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1707037420546-5810b4f79cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBlcmZ1bWUlMjBpbmdyZWRpZW50cyUyMG91ZCUyMHdvb2QlMjBzcGljZXN8ZW58MXx8fHwxNzcwMDI3OTcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Perfume Ingredients"
                  className="relative z-10 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
            <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">Our Values</h2>
            <p className="text-lg text-[#B8B3AB] arabic-text">قيمنا</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel rounded-2xl p-8 text-center group hover:border-[#BFA26A]/30 transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D946EF]/20 to-[#EC4899]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="text-[#BFA26A]" size={32} />
                </div>
                <h3 className="text-xl font-display text-[#F4F0EA] mb-2">{value.title}</h3>
                <p className="text-sm text-[#B8B3AB] arabic-text mb-4">{value.titleAr}</p>
                <p className="text-[#B8B3AB] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">
            Our Crafting Process
          </h2>
          <p className="text-lg text-[#B8B3AB] arabic-text">عملية الصنع</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/20 via-[#A855F7]/20 to-[#EC4899]/20 blur-3xl" />
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1722934669684-238b74d8fee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwbWFraW5nJTIwZmxvd2VycyUyMHJvc2UlMjBwZXRhbHN8ZW58MXx8fHwxNzcwMDI3OTcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Perfume Making Process"
              className="relative z-10 w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Ingredient Selection',
                  titleAr: 'اختيار المكونات',
                  description: 'We source the finest natural ingredients from trusted suppliers worldwide.',
                },
                {
                  step: '02',
                  title: 'Blending Artistry',
                  titleAr: 'فن المزج',
                  description: 'Our master perfumers carefully blend each note to create harmonious compositions.',
                },
                {
                  step: '03',
                  title: 'Maturation',
                  titleAr: 'النضج',
                  description: 'Fragrances age in controlled conditions to develop depth and complexity.',
                },
                {
                  step: '04',
                  title: 'Quality Testing',
                  titleAr: 'اختبار الجودة',
                  description: 'Each batch undergoes rigorous testing to ensure perfection.',
                },
              ].map((process) => (
                <div key={process.step} className="flex gap-6">
                  <div className="text-5xl font-display gradient-text flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-[#F4F0EA] mb-1">{process.title}</h3>
                    <p className="text-sm text-[#B8B3AB] arabic-text mb-2">{process.titleAr}</p>
                    <p className="text-[#B8B3AB] leading-relaxed">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-display mb-4 text-[#F4F0EA]">Meet Our Team</h2>
          <p className="text-lg text-[#B8B3AB] arabic-text">تعرف على فريقنا</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 aspect-[3/4] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/0 to-[#EC4899]/0 group-hover:from-[#D946EF]/30 group-hover:to-[#EC4899]/30 transition-all duration-500 z-10" />
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-display text-[#F4F0EA] mb-1">{member.name}</h3>
              <p className="text-lg text-[#B8B3AB] arabic-text mb-2">{member.nameAr}</p>
              <p className="text-[#BFA26A]">{member.role}</p>
              <p className="text-sm text-[#B8B3AB] arabic-text">{member.roleAr}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="glass-panel rounded-2xl p-12 lg:p-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { icon: Users, value: '10K+', label: 'Happy Clients', labelAr: 'عميل سعيد' },
              { icon: Globe, value: '25+', label: 'Countries', labelAr: 'دولة' },
              { icon: Award, value: '15+', label: 'Awards Won', labelAr: 'جائزة' },
              { icon: Sparkles, value: '50+', label: 'Unique Scents', labelAr: 'رائحة فريدة' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#BFA26A]" />
                <div className="text-4xl lg:text-5xl font-display gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-[#F4F0EA] font-medium">{stat.label}</p>
                <p className="text-sm text-[#B8B3AB] arabic-text">{stat.labelAr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
