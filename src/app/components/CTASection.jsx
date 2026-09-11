'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CTASection({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Fades in from 88-93% (opacity 0→1, scale 0.97→1)
  // Stays visible until 100%
  const opacity = useTransform(scrollYProgress, [0.88, 0.93, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0.88, 0.93, 1], [0.97, 1, 1]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10">
      <motion.div style={{ opacity, scale }} className="flex flex-col items-center max-w-2xl px-4">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90">
          Hear everything. Feel nothing else.
        </h2>
        <p className="text-xl text-white/60 mt-6">
          WH-1000XM6. Designed for focus, crafted for comfort.
        </p>
        
        <motion.button 
          className="mt-10 px-8 py-4 rounded-full font-semibold bg-white hover:bg-white/90 text-black shadow-lg transition-all duration-200 pointer-events-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience WH-1000XM6
        </motion.button>
        
        <a href="#" className="mt-4 text-sm text-white/50 hover:text-white/80 transition pointer-events-auto">
          See full specs &rarr;
        </a>
        
        <p className="text-xs text-white/30 mt-8">
          Engineered for airports, offices, and everything in between.
        </p>
      </motion.div>
    </div>
  );
}

