'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { number: 40, suffix: 'hrs', label: 'Battery Life' },
  { number: 8, suffix: '', label: 'Noise-Sensing Microphones' },
  { number: 250, suffix: 'g', label: 'Ultralight Design' },
  { number: 40, suffix: 'kHz', label: 'Frequency Response' },
];

function AnimatedCounter({ from, to, inView }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    
    const controls = animate(from, to, {
      duration: 2.5,
      ease: [0.16, 1, 0.3, 1], // Custom easeOut
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.round(value);
        }
      },
    });

    return () => controls.stop();
  }, [from, to, inView]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    },
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 border-y border-white/[0.06] bg-[#000000]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                  <AnimatedCounter from={0} to={stat.number} inView={isInView} />
                </span>
                {stat.suffix && (
                  <span className="text-lg sm:text-2xl text-white/40 font-light ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-white/45 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
