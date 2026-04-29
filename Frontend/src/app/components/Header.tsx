import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', nameAr: 'الرئيسية', path: '/' },
    { name: 'Shop', nameAr: 'المتجر', path: '/shop' },
    { name: 'About', nameAr: 'عن كهرمانة', path: '/about' },
    { name: 'Contact', nameAr: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070707]/95 backdrop-blur-xl border-b border-white/5 shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Left: Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F4F0EA] hover:text-[#BFA26A] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm tracking-wider uppercase transition-all duration-300 hover:text-[#BFA26A] relative group ${
                    location.pathname === item.path ? 'text-[#BFA26A]' : 'text-[#F4F0EA]'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Center: Logo */}
            <Link to="/" className="flex items-center justify-center group">
              <img
                src="figma:asset/20325f9946ab10549da529e5c8accc9f419c8024.png"
                alt="Kahramana Logo"
                className="h-12 lg:h-16 w-auto transition-all duration-500 group-hover:scale-105"
              />
            </Link>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.slice(2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm tracking-wider uppercase transition-all duration-300 hover:text-[#BFA26A] relative group ${
                    location.pathname === item.path ? 'text-[#BFA26A]' : 'text-[#F4F0EA]'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right: Action Icons */}
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                className="p-2 text-[#F4F0EA] hover:text-[#BFA26A] transition-all duration-300 hover:scale-110"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                to="/cart"
                className="p-2 text-[#F4F0EA] hover:text-[#BFA26A] transition-all duration-300 hover:scale-110 relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#D946EF] to-[#EC4899] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="hidden sm:block p-2 text-[#F4F0EA] hover:text-[#BFA26A] transition-all duration-300 hover:scale-110"
                aria-label="Account"
              >
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#0D0D0D] border-r border-white/10 p-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-8 mt-20">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-2xl font-display transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'gradient-text'
                        : 'text-[#F4F0EA] hover:text-[#BFA26A]'
                    }`}
                  >
                    <div>{item.name}</div>
                    <div className="text-sm arabic-text mt-1 opacity-60">{item.nameAr}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}