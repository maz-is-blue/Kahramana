import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      titleAr: 'البريد الإلكتروني',
      value: 'hello@kahramana.com',
      href: 'mailto:hello@kahramana.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      titleAr: 'الهاتف',
      value: '+971 4 123 4567',
      href: 'tel:+97141234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      titleAr: 'الموقع',
      value: 'Dubai Mall, Dubai, UAE',
      href: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-display mb-4 text-[#F4F0EA]">Get in Touch</h1>
          <p className="text-2xl text-[#B8B3AB] arabic-text">تواصل معنا</p>
          <p className="text-lg text-[#B8B3AB] mt-4 max-w-2xl mx-auto">
            Have a question about our fragrances? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-panel rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-display text-[#F4F0EA] mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm text-[#F4F0EA] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] placeholder:text-[#B8B3AB]/50 focus:outline-none focus:border-[#BFA26A]/50 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm text-[#F4F0EA] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] placeholder:text-[#B8B3AB]/50 focus:outline-none focus:border-[#BFA26A]/50 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm text-[#F4F0EA] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] placeholder:text-[#B8B3AB]/50 focus:outline-none focus:border-[#BFA26A]/50 transition-all duration-300"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm text-[#F4F0EA] mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] focus:outline-none focus:border-[#BFA26A]/50 transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm text-[#F4F0EA] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] placeholder:text-[#B8B3AB]/50 focus:outline-none focus:border-[#BFA26A]/50 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full text-lg py-5">
                  <Send className="mr-2" size={20} />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            {contactInfo.map((info) => (
              <a
                key={info.title}
                href={info.href}
                className="block glass-panel rounded-2xl p-8 hover:border-[#BFA26A]/30 transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D946EF]/20 to-[#EC4899]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="text-[#BFA26A]" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-[#F4F0EA] mb-1">{info.title}</h3>
                    <p className="text-sm text-[#B8B3AB] arabic-text mb-3">{info.titleAr}</p>
                    <p className="text-lg text-[#BFA26A] group-hover:underline">{info.value}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* WhatsApp Button */}
            <div className="glass-panel rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-green-400" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display text-[#F4F0EA] mb-1">WhatsApp</h3>
                  <p className="text-sm text-[#B8B3AB] arabic-text mb-4">واتساب</p>
                  <p className="text-[#B8B3AB] mb-4">Chat with us instantly for quick assistance</p>
                  <Button variant="secondary" size="sm">
                    <MessageCircle className="mr-2" size={18} />
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass-panel rounded-2xl p-8">
              <h3 className="text-xl font-display text-[#F4F0EA] mb-4">Business Hours</h3>
              <p className="text-sm text-[#B8B3AB] arabic-text mb-6">ساعات العمل</p>
              <div className="space-y-3 text-[#B8B3AB]">
                <div className="flex justify-between">
                  <span>Sunday - Thursday</span>
                  <span className="text-[#F4F0EA]">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span className="text-[#F4F0EA]">10:00 AM - 10:00 PM</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-panel rounded-2xl p-2 overflow-hidden">
              <div className="aspect-video bg-[#141414] rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/10 via-[#A855F7]/10 to-[#EC4899]/10" />
                <div className="relative z-10 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-[#BFA26A]" />
                  <p className="text-[#F4F0EA] font-display">Dubai Mall, Dubai</p>
                  <p className="text-sm text-[#B8B3AB] mt-1">Click to view on map</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl lg:text-5xl font-display text-[#F4F0EA] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How long does shipping take?',
                a: 'We offer free express shipping within the UAE with delivery in 1-2 business days. International shipping takes 5-7 business days.',
              },
              {
                q: 'Do you offer custom fragrances?',
                a: 'Yes! We offer bespoke perfume creation services. Contact us to schedule a consultation with our master perfumer.',
              },
              {
                q: 'What is your return policy?',
                a: 'We accept returns within 30 days of purchase for unopened products. If you are not satisfied, please contact our customer service team.',
              },
              {
                q: 'Are your perfumes authentic?',
                a: 'Absolutely. All our fragrances are crafted in-house using premium, authentic ingredients sourced from trusted suppliers worldwide.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="glass-panel rounded-xl p-6 group cursor-pointer hover:border-[#BFA26A]/30 transition-all duration-300"
              >
                <summary className="text-lg font-display text-[#F4F0EA] cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-[#BFA26A] text-2xl group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <p className="text-[#B8B3AB] mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
