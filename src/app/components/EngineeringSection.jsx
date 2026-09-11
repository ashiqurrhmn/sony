'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function EngineeringSection({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Appears early in the scroll (0% → 18%), left-aligned
  const opacity = useTransform(scrollYProgress, [0.02, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0.02, 0.08, 0.18, 0.25], [-40, 0, 0, -20]);

  return (
    <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-10 pl-8 md:pl-16 lg:pl-24">
      <motion.div style={{ opacity, x }} className="max-w-xl">
        <div className="w-12 h-px bg-white/40 mb-4" />
        <h3 className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
          ENGINEERING
        </h3>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Precision-engineered for silence.
        </h2>
        <p className="text-lg text-white/70 mt-6 leading-relaxed">
          Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
        </p>
        <p className="text-lg text-white/50 mt-4 leading-relaxed">
          Every component is tuned for balance, power, and comfort—hour after hour.
        </p>
      </motion.div>
    </div>
  );
}

