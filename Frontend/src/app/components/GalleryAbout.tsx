import { motion } from 'motion/react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function GalleryAbout() {
  const values = [
    {
      title: 'Artistry',
      titleAr: 'الفن',
      description: 'We approach perfumery as an art form, creating olfactory masterpieces that transcend time.',
    },
    {
      title: 'Heritage',
      titleAr: 'التراث',
      description: 'Rooted in Arabic perfume tradition, we honor centuries of fragrance craftsmanship.',
    },
    {
      title: 'Quality',
      titleAr: 'الجودة',
      description: 'Only the finest natural ingredients are selected for our compositions.',
    },
    {
      title: 'Innovation',
      titleAr: 'الابتكار',
      description: 'Blending traditional methods with contemporary artistry to create unique scents.',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">About Kahramana</p>
          <h1 className="text-5xl lg:text-8xl font-display text-[#101010] mb-8 leading-[1.1]">
            The Art of Scent
          </h1>
          <p className="text-xl lg:text-2xl text-[#6B6B6B] leading-relaxed mb-6">
            Founded in Dubai, Kahramana represents the intersection of Arabic perfume heritage and
            contemporary artistry. We create fragrances as if they were works of art.
          </p>
          <p className="text-xl lg:text-2xl text-[#6B6B6B] leading-relaxed arabic-text">
            تأسست كهرمانة في دبي، وتمثل نقطة التقاء التراث العطري العربي والفن المعاصر. نصنع
            العطور كما لو كانت أعمالاً فنية.
          </p>
        </motion.div>
      </section>

      {/* Featured Image */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-24 lg:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="artwork-frame aspect-[16/9]"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1707037420546-5810b4f79cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
            alt="Kahramana Atelier"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-24 lg:mb-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">Our Story</p>
            <h2 className="text-4xl lg:text-6xl font-display text-[#101010] mb-8 leading-tight">
              Born from Passion
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-[#6B6B6B] leading-relaxed"
          >
            <p>
              Kahramana was founded by master perfumer Layla Al-Rashid, whose lifelong passion for
              fragrance began in the souks of Dubai. Inspired by the amber stone – known in Arabic
              as "kahramana" – she envisioned creating perfumes that captured both the warmth of
              tradition and the brilliance of innovation.
            </p>
            <p>
              Each fragrance in our collection is a carefully composed artwork. We work with the
              finest natural ingredients sourced from around the world, blending them with
              traditional Arabic essences like oud, amber, and musk.
            </p>
            <p>
              Our atelier is a space where art and science converge. Every bottle that leaves our
              workshop is a testament to the craft of perfumery – an olfactory experience designed
              to create lasting memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-24 lg:mb-32 py-24 border-y border-[#E8E5E0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-4">Our Philosophy</p>
          <h2 className="text-4xl lg:text-6xl font-display text-[#101010]">Core Values</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="border-l-2 border-[#E8E5E0] pl-6"
            >
              <h3 className="text-2xl font-display text-[#101010] mb-2">{value.title}</h3>
              <p className="text-sm text-[#6B6B6B] arabic-text mb-4">{value.titleAr}</p>
              <p className="text-[#6B6B6B] leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-24 lg:mb-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">Our Process</p>
            <h2 className="text-4xl lg:text-6xl font-display text-[#101010] mb-8 leading-tight">
              The Making of an Artwork
            </h2>
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Ingredient Selection',
                  titleAr: 'اختيار المكونات',
                  description: 'Sourcing the finest natural essences from trusted suppliers worldwide.',
                },
                {
                  step: '02',
                  title: 'Composition',
                  titleAr: 'التأليف',
                  description: 'Carefully blending notes to create harmonious and unique fragrances.',
                },
                {
                  step: '03',
                  title: 'Maturation',
                  titleAr: 'النضج',
                  description: 'Allowing fragrances to mature and develop complexity over time.',
                },
                {
                  step: '04',
                  title: 'Refinement',
                  titleAr: 'التنقيح',
                  description: 'Perfecting every detail until the composition achieves artistry.',
                },
              ].map((process) => (
                <div key={process.step} className="flex gap-6">
                  <div className="text-5xl font-display gradient-text flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-[#101010] mb-1">{process.title}</h3>
                    <p className="text-sm text-[#A0A0A0] arabic-text mb-2">{process.titleAr}</p>
                    <p className="text-[#6B6B6B] leading-relaxed">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="artwork-frame aspect-[3/4]"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1722934669684-238b74d8fee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Perfume Making Process"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-6 lg:px-12 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#F3F1ED] p-12 lg:p-20"
        >
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">Founder</p>
            <h2 className="text-4xl lg:text-5xl font-display text-[#101010] mb-4">
              Layla Al-Rashid
            </h2>
            <p className="text-lg text-[#6B6B6B] mb-6 arabic-text">ليلى الرشيد</p>
            <p className="text-lg text-[#6B6B6B] leading-relaxed mb-6">
              "For me, creating a perfume is like painting with scent. Each note is a brushstroke,
              each composition a canvas. I want people to experience our fragrances not just as
              perfumes, but as artworks that evoke emotion and memory."
            </p>
            <p className="text-sm text-[#A0A0A0]">Master Perfumer & Creative Director</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
