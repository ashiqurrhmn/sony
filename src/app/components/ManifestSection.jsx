'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ManifestSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: '-10% 0px -10% 0px',
  });

  const highlights = [
    {
      tag: 'ARCHITECTURE',
      title: 'Acoustic Mastery',
      description:
        'Precision-tuned resonance chambers and ultra-rigid diaphragms create harmonic purity at any volume.',
    },
    {
      tag: 'PROCESSOR',
      title: 'Neural Audio Engine',
      description:
        'Custom dual-chip architecture processes 700,000 environmental audio samples every millisecond.',
    },
    {
      tag: 'MATERIALS',
      title: 'Aerospace Alloy',
      description:
        'Engineered with magnesium-infused structural ribs for weightless rigidity and total acoustic damping.',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 sm:py-24 md:py-36 px-5 sm:px-6 md:px-16 lg:px-24 overflow-hidden border-t border-b border-white/10 bg-black"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/[0.03] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-[11px] font-mono tracking-[0.25em] text-white/70 uppercase">
              CHAPTER 01 // ARCHITECTURE
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Silence is an{' '}
            <span className="font-script text-5xl sm:text-6xl md:text-7xl lowercase text-white">
              instrument.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed">
            Before we reveal every millimeter of internal craftsmanship, discover how we sculpted silence into physical form.
          </p>
        </motion.div>

        {/* 3 Pillars / Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="premium-card relative group p-6 sm:p-8 md:p-10 rounded-3xl hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase">
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-white/30">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-white tracking-tight mb-4">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                {item.description}
              </p>

              <div className="mt-8 h-[1px] w-full bg-white/10 group-hover:bg-white/30 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Transition prompt leading into exploded view */}
        
      </div>
    </section>
  );
}
