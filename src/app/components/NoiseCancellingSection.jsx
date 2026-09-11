'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function NoiseCancellingSection({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0.43, 0.50, 0.58, 0.65], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0.43, 0.50, 0.58, 0.65], [40, 0, 0, 0]);

  return (
    <div className="absolute inset-0 flex items-center justify-end pointer-events-none z-10 pr-8 md:pr-16 lg:pr-24">
      <motion.div style={{ opacity, x }} className="max-w-xl ml-auto">
        <h3 className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
          NOISE CANCELLING
        </h3>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Adaptive noise cancelling, redefined.
        </h2>
        <div className="mt-6 space-y-3">
          <p className="text-lg text-white/70 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white mr-3 shrink-0" />
            Multi-microphone array listens in every direction.
          </p>
          <p className="text-lg text-white/70 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white mr-3 shrink-0" />
            Real-time noise analysis adapts to your environment.
          </p>
          <p className="text-lg text-white/70 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white mr-3 shrink-0" />
            Your music stays pure—planes, trains, and crowds fade away.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

