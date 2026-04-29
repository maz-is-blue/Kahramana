import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { motion } from 'motion/react';

interface GalleryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function GalleryButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: GalleryButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed rounded-full group';

  const variants = {
    primary:
      'bg-[#101010] text-white hover:bg-[#EC4899] border-2 border-[#101010] hover:border-[#EC4899]',
    secondary:
      'bg-white text-[#101010] border-2 border-[#E8E5E0] hover:border-[#101010] hover:shadow-luxury',
    outline:
      'border-2 border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-white',
    text: 'text-[#101010] hover:text-[#EC4899] underline underline-offset-4',
    gradient:
      'bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] text-white border-0 hover:shadow-2xl hover:shadow-[#EC4899]/20',
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-xs tracking-[0.2em]',
    md: 'px-10 py-3.5 text-sm tracking-[0.25em]',
    lg: 'px-12 py-4 text-base tracking-[0.3em]',
  };

  return (
    <motion.button
      whileHover={{ scale: variant === 'text' ? 1 : 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Shimmer effect */}
      {variant !== 'text' && (
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: isHovered ? '200%' : '-100%',
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
      )}

      {/* Expanding border effect for gradient variant */}
      {variant === 'gradient' && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, #EC4899, #A855F7, #F59E0B)',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <span className="relative z-10 uppercase font-medium">{children}</span>
    </motion.button>
  );
}
