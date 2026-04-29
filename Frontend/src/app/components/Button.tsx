import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#D946EF] via-[#A855F7] to-[#EC4899] text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:scale-105',
    secondary:
      'bg-[#BFA26A] text-[#070707] hover:bg-[#D4B87A] hover:shadow-[0_0_20px_rgba(191,162,106,0.3)] hover:scale-105',
    outline:
      'border-2 border-white/20 text-[#F4F0EA] hover:border-[#BFA26A] hover:bg-[#BFA26A]/10 backdrop-blur-sm',
    ghost: 'text-[#F4F0EA] hover:bg-white/5 hover:text-[#BFA26A]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Shine effect overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
