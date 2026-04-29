import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Character reveal for dramatic effect
interface CharRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function CharReveal({ children, className = '', delay = 0 }: CharRevealProps) {
  const chars = children.split('');

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.03,
            delay: delay + i * 0.02,
            ease: 'easeOut',
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Gradient text reveal
interface GradientTextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function GradientTextReveal({
  children,
  className = '',
  delay = 0,
}: GradientTextRevealProps) {
  return (
    <motion.div
      initial={{ backgroundSize: '0% 100%' }}
      whileInView={{ backgroundSize: '100% 100%' }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{
        backgroundImage: 'linear-gradient(135deg, #EC4899, #A855F7, #F59E0B)',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </motion.div>
  );
}
