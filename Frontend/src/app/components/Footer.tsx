import { Link } from 'react-router';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0D0D0D] border-t border-white/5 mt-20">
      {/* Gradient Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D946EF]/30 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-display mb-4 gradient-text">
            Join Our Scent Journey
          </h3>
          <p className="text-[#B8B3AB] mb-8 leading-relaxed">
            Subscribe to receive exclusive launches, curated scent stories, and early access to limited editions.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-[#141414] border border-white/10 rounded-lg text-[#F4F0EA] placeholder:text-[#B8B3AB]/50 focus:outline-none focus:border-[#BFA26A]/50 transition-all duration-300"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899] text-white rounded-lg font-medium hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <img
              src="figma:asset/20325f9946ab10549da529e5c8accc9f419c8024.png"
              alt="Kahramana"
              className="h-16 w-auto mb-6"
            />
            <p className="text-[#B8B3AB] text-sm leading-relaxed mb-4">
              Luxury Arabic perfumes crafted with the finest ingredients to leave an unforgettable memory.
            </p>
            <p className="text-[#B8B3AB] text-xs arabic-text">
              عطور عربية فاخرة مصنوعة من أجود المكونات لترك ذكرى لا تُنسى
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F4F0EA] font-display text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Shop All', path: '/shop' },
                { name: 'Best Sellers', path: '/shop?filter=bestsellers' },
                { name: 'New Arrivals', path: '/shop?filter=new' },
                { name: 'Gift Sets', path: '/shop?filter=gifts' },
                { name: 'About Us', path: '/about' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#B8B3AB] hover:text-[#BFA26A] transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[#F4F0EA] font-display text-lg mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'Shipping & Returns', path: '/shipping' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Size Guide', path: '/size-guide' },
                { name: 'Privacy Policy', path: '/privacy' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#B8B3AB] hover:text-[#BFA26A] transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#F4F0EA] font-display text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#BFA26A] mt-1 flex-shrink-0" />
                <a
                  href="mailto:hello@kahramana.com"
                  className="text-[#B8B3AB] hover:text-[#BFA26A] transition-colors duration-300 text-sm"
                >
                  hello@kahramana.com
                </a>
              </li>
              <li className="text-[#B8B3AB] text-sm">
                <span className="block mb-1">Dubai, UAE</span>
                <span className="block text-xs arabic-text opacity-60">دبي، الإمارات</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#B8B3AB] hover:text-[#F4F0EA] hover:border-[#BFA26A] transition-all duration-300 hover:scale-110 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <Icon size={18} className="relative z-10" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#B8B3AB]">
            <p>© {currentYear} Kahramana. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-[#BFA26A] transition-colors duration-300">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="hover:text-[#BFA26A] transition-colors duration-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}