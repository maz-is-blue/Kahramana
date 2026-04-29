import image_20325f9946ab10549da529e5c8accc9f419c8024 from 'figma:asset/20325f9946ab10549da529e5c8accc9f419c8024.png'
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ShoppingBag, Globe, User, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCart } from '@/app/context/CartContext';
import { useUser } from '@/app/context/UserContext';
import { useWishlist } from '@/app/context/WishlistContext';

export function GalleryHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems, openCart } = useCart();
  const { isAuthenticated } = useUser();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isDarkBackground = (isHomePage && !isScrolled) || isMenuOpen;
  const textColor = isDarkBackground ? 'text-white' : 'text-[#101010]';

  const navItems = [
    { nameKey: 'nav.exhibition', path: '/' },
    { nameKey: 'nav.collection', path: '/shop' },
    { nameKey: 'nav.about', path: '/about' },
    { nameKey: 'nav.visit', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled && !isMenuOpen
            ? 'bg-[#FAF7F1]/98 backdrop-blur-xl border-b-2 border-[#E8E5E0] shadow-soft py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Left: Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`group flex items-center gap-3 ${textColor} transition-all duration-300 relative z-10`}
            >
              <div className="relative">
                <motion.div
                  animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={22} strokeWidth={1.5} />
                </motion.div>
              </div>
              <span className="hidden sm:block text-xs tracking-[0.3em] uppercase font-medium">
                {t('header.menu')}
              </span>
            </motion.button>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center group">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
                src={image_20325f9946ab10549da529e5c8accc9f419c8024}
                alt="Kahramana"
                className={`w-auto transition-all duration-700 ${
                  isScrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-16'
                } ${isDarkBackground ? 'brightness-0 invert' : ''}`}
              />
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className={`group flex items-center gap-2 ${textColor} transition-all duration-300`}
              >
                <Globe size={20} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:block text-xs tracking-[0.3em] uppercase font-medium">
                  {language === 'en' ? 'عربي' : 'EN'}
                </span>
              </motion.button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative group hidden sm:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className={`w-5 h-5 lg:w-6 lg:h-6 ${textColor}`} strokeWidth={1.5} />
                  {wishlistItems.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center text-xs font-medium shadow-lg"
                    >
                      {wishlistItems.length}
                    </motion.div>
                  )}
                </motion.div>
              </Link>

              {/* User Account */}
              <Link to={isAuthenticated ? '/account' : '/login'} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className={`w-5 h-5 lg:w-6 lg:h-6 ${textColor}`} strokeWidth={1.5} />
                  {isAuthenticated && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#EC4899] to-[#A855F7] rounded-full shadow-lg"
                    />
                  )}
                </motion.div>
              </Link>

              {/* Cart */}
              <button onClick={openCart} className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className={`w-5 h-5 lg:w-6 lg:h-6 ${textColor}`} strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#EC4899] to-[#A855F7] text-white rounded-full flex items-center justify-center text-xs font-medium shadow-lg"
                    >
                      {totalItems}
                    </motion.div>
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        {isScrolled && !isMenuOpen && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-[#EC4899] to-transparent"
          />
        )}
      </motion.header>

      {/* Full Screen Menu - Ultra Luxury */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40"
          >
            {/* Backdrop with Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#101010]"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Animated Background Elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#EC4899]/30 to-transparent blur-[150px] rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                  opacity: [0.1, 0.05, 0.1],
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#A855F7]/30 to-transparent blur-[150px] rounded-full"
              />
            </motion.div>

            {/* Menu Content */}
            <div className="relative z-50 h-full flex items-center justify-center">
              <motion.nav
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                {/* Navigation Items */}
                <div className="space-y-1 lg:space-y-2 mb-12 lg:mb-16">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                    >
                      <Link
                        to={item.path}
                        className={`block py-2 lg:py-3 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 group ${
                          location.pathname === item.path
                            ? 'gradient-text'
                            : 'text-white/80 hover:text-white'
                        } ${language === 'ar' ? 'font-arabic font-semibold' : 'font-display'}`}
                      >
                        <motion.span
                          whileHover={{ scale: 1.05, letterSpacing: '0.05em' }}
                          transition={{ duration: 0.3 }}
                          className="inline-block"
                        >
                          {item.nameKey ? t(item.nameKey) : item.name}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Secondary Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-8 justify-center mb-12 text-sm tracking-wider text-white/60"
                >
                  <Link to="/scent-quiz" className="hover:text-white transition-colors">
                    {language === 'en' ? 'Find Your Scent' : 'اكتشف عطرك'}
                  </Link>
                  <Link to="/wishlist" className="hover:text-white transition-colors">
                    {language === 'en' ? 'Wishlist' : 'المفضلة'}
                  </Link>
                </motion.div>

                {/* Decorative Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="w-48 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12"
                />

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 text-white/80 hover:text-white hover:border-white transition-all duration-500"
                >
                  <span className="text-xs tracking-[0.3em] uppercase">{t('shop.close')}</span>
                  <X size={18} />
                </motion.button>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}