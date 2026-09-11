'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function SoundSection({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0.68, 0.73, 0.80, 0.85], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0.68, 0.73, 0.80, 0.85], [-40, 0, 0, 0]);

  return (
    <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-10 pl-8 md:pl-16 lg:pl-24">
      <motion.div style={{ opacity, x }} className="max-w-xl">
        <h3 className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
          SOUND QUALITY
        </h3>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Immersive, lifelike sound.
        </h2>
        <p className="text-lg text-white/70 mt-6 leading-relaxed">
          High-performance drivers unlock detail, depth, and texture in every track.
        </p>
        <p className="text-lg text-white/50 mt-4 leading-relaxed">
          AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
        </p>
      </motion.div>
    </div>
  );
}

