import { motion } from 'motion/react';

export function FloatingElements() {
  const elements = [
    { size: 300, duration: 25, delay: 0, x: '20%', y: '10%' },
    { size: 200, duration: 30, delay: 2, x: '70%', y: '60%' },
    { size: 250, duration: 28, delay: 4, x: '15%', y: '70%' },
    { size: 180, duration: 32, delay: 1, x: '85%', y: '20%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-[0.03]"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: `linear-gradient(135deg, #EC4899 0%, #A855F7 50%, #F59E0B 100%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
