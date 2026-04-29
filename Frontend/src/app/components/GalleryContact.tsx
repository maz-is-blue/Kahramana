import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GalleryButton } from '@/app/components/GalleryButton';
import { useState } from 'react';

export function GalleryContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 max-w-3xl"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] mb-6">Visit</p>
          <h1 className="text-5xl lg:text-8xl font-display text-[#101010] mb-8 leading-[1.1]">
            Get in Touch
          </h1>
          <p className="text-xl text-[#6B6B6B] leading-relaxed">
            We welcome you to visit our gallery or reach out with any inquiries about our
            collection.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-display text-[#101010] mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs tracking-wider uppercase text-[#A0A0A0] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border border-[#E8E5E0] bg-white text-[#101010] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#101010] transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs tracking-wider uppercase text-[#A0A0A0] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 border border-[#E8E5E0] bg-white text-[#101010] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#101010] transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs tracking-wider uppercase text-[#A0A0A0] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 border border-[#E8E5E0] bg-white text-[#101010] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#101010] transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {/* Submit */}
              <GalleryButton type="submit" size="lg" className="w-full">
                Send Message
              </GalleryButton>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-display text-[#101010] mb-8">Visit Our Gallery</h2>
              <div className="space-y-8">
                {/* Location */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#E8E5E0] flex items-center justify-center">
                    <MapPin size={20} className="text-[#6B6B6B]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-[#A0A0A0] mb-2">Location</p>
                    <p className="text-lg text-[#101010] mb-2">
                      Dubai Mall, Fashion Avenue
                    </p>
                    <p className="text-sm text-[#6B6B6B]">Dubai, United Arab Emirates</p>
                    <p className="text-sm text-[#6B6B6B] arabic-text mt-1">دبي، الإمارات العربية المتحدة</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#E8E5E0] flex items-center justify-center">
                    <Mail size={20} className="text-[#6B6B6B]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-[#A0A0A0] mb-2">Email</p>
                    <a
                      href="mailto:gallery@kahramana.com"
                      className="text-lg text-[#101010] hover:text-[#EC4899] transition-colors"
                    >
                      gallery@kahramana.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#E8E5E0] flex items-center justify-center">
                    <Phone size={20} className="text-[#6B6B6B]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-[#A0A0A0] mb-2">Phone</p>
                    <a
                      href="tel:+97141234567"
                      className="text-lg text-[#101010] hover:text-[#EC4899] transition-colors"
                    >
                      +971 4 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Hours */}
            <div className="bg-[#F3F1ED] p-8">
              <p className="text-xs tracking-wider uppercase text-[#A0A0A0] mb-6">Gallery Hours</p>
              <div className="space-y-4 text-[#6B6B6B]">
                <div className="flex justify-between pb-3 border-b border-[#E8E5E0]">
                  <span>Sunday – Thursday</span>
                  <span className="text-[#101010]">10:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-[#E8E5E0]">
                  <span>Friday – Saturday</span>
                  <span className="text-[#101010]">10:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Private Appointments */}
            <div className="border border-[#E8E5E0] p-8">
              <h3 className="text-xl font-display text-[#101010] mb-4">Private Consultations</h3>
              <p className="text-[#6B6B6B] mb-6 leading-relaxed">
                Book a private session with our perfume curator to discover your signature scent.
              </p>
              <GalleryButton variant="outline" size="sm">
                Schedule Appointment
              </GalleryButton>
            </div>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-[#E8E5E0]"
        >
          <div className="aspect-[21/9] bg-[#F3F1ED] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#A0A0A0]" />
              <p className="text-[#6B6B6B]">Map Location</p>
              <p className="text-sm text-[#A0A0A0] mt-1">Dubai Mall, Fashion Avenue</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
