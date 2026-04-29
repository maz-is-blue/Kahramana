import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] // Custom easing for elegant movement
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Loading bar component
export function LoadingBar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#F59E0B] z-[9999] origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 1, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
  );
}
