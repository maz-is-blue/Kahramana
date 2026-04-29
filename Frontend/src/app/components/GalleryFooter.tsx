import { Link } from 'react-router';
import { Instagram, Facebook, Mail } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export function GalleryFooter() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-[#F3F1ED] border-t border-[#E8E5E0] mt-32">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-20 lg:py-24">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h3 className={`text-3xl lg:text-4xl mb-4 text-[#101010] ${language === 'ar' ? 'font-arabic' : 'font-display'}`}>
            {t('footer.join')}
          </h3>
          <p className="text-[#6B6B6B] mb-8 leading-relaxed">
            {t('footer.joinText')}
          </p>
          <div className={`flex gap-3 max-w-md mx-auto ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
              className="flex-1 px-6 py-4 bg-white border border-[#E8E5E0] text-[#101010] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#EC4899] transition-all duration-300"
            />
            <button className="px-8 py-4 bg-[#101010] text-white hover:bg-[#EC4899] transition-all duration-300">
              {t('footer.subscribe')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Info */}
          <div>
            <img
              src="figma:asset/15f7c7ff983b28bd798671711822030ad0a10bae.png"
              alt="Kahramana"
              className="h-12 w-auto mb-6"
            />
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
              {t('footer.about')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#A0A0A0] mb-6">
              {t('footer.explore')}
            </h4>
            <ul className="space-y-3">
              {[
                { nameKey: 'nav.exhibition', path: '/' },
                { nameKey: 'nav.collection', path: '/shop' },
                { nameKey: 'nav.about', path: '/about' },
                { nameKey: 'nav.visit', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#6B6B6B] hover:text-[#EC4899] transition-colors duration-300 text-sm"
                  >
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#A0A0A0] mb-6">
              {t('footer.information')}
            </h4>
            <ul className="space-y-3">
              {[
                { nameKey: 'footer.shipping', path: '/shipping' },
                { nameKey: 'footer.care', path: '/care' },
                { nameKey: 'footer.faq', path: '/faq' },
                { nameKey: 'footer.privacy', path: '/privacy' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#6B6B6B] hover:text-[#EC4899] transition-colors duration-300 text-sm"
                  >
                    {t(item.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#A0A0A0] mb-6">
              {t('footer.connect')}
            </h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#A0A0A0]" />
                <a
                  href="mailto:hello@kahramana.com"
                  className="text-[#6B6B6B] hover:text-[#EC4899] transition-colors duration-300 text-sm"
                >
                  hello@kahramana.com
                </a>
              </li>
              <li className="text-[#6B6B6B] text-sm">
                {language === 'ar' ? 'دبي، الإمارات' : 'Dubai, UAE'}
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-[#E8E5E0] flex items-center justify-center text-[#6B6B6B] hover:text-[#EC4899] hover:border-[#EC4899] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E8E5E0]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A0A0A0]">
            <p>
              © {currentYear} Kahramana. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-[#101010] transition-colors duration-300">
                {t('footer.terms')}
              </Link>
              <Link to="/privacy" className="hover:text-[#101010] transition-colors duration-300">
                {t('footer.privacy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}