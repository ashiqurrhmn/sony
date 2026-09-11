'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';

function InteractiveImage({ src, alt, placeholderText }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      className="premium-card w-full h-64 sm:h-80 rounded-3xl flex items-center justify-center overflow-hidden cursor-crosshair relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <span className="absolute text-white/5 text-8xl font-bold tracking-widest pointer-events-none select-none z-0">
        {placeholderText}
      </span>
      <motion.img
        src={src}
        alt={alt}
        style={{ rotateX, rotateY, scale: 1.15 }}
        className="w-full h-full object-cover z-10 pointer-events-none"
      />
    </div>
  );
}

function ContentRow({ 
  eyebrow, 
  heading, 
  body, 
  features, 
  placeholderText, 
  imageSrc,
  reversed = false 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98], staggerChildren: 0.15 }
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
    >
      <div className={`md:w-1/2 mb-10 md:mb-0 ${reversed ? 'md:pl-16' : 'md:pr-16'}`}>
        <motion.p variants={childVariants} className="text-xs tracking-[0.3em] text-white/50 uppercase font-mono mb-4">
          {eyebrow}
        </motion.p>
        <motion.h3 variants={childVariants} className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-5 sm:mb-6">
          {heading}
        </motion.h3>
        <motion.p variants={childVariants} className="text-base text-white/60 leading-relaxed mb-6">
          {body}
        </motion.p>
        
        <motion.ul variants={childVariants} className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-white mr-3" />
              {feature}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div variants={childVariants} className="md:w-1/2 w-full">
        <InteractiveImage src={imageSrc} alt={heading} placeholderText={placeholderText} />
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-black border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 sm:gap-20 py-0 sm:py-10">
        <ContentRow 
          eyebrow="COMFORT"
          heading="Designed to disappear."
          body="Lighter, softer, and more ergonomic than ever. The redesigned headband distributes pressure evenly, while ultra-soft ear cushions create a perfect seal without fatigue—even after hours of listening."
          features={[
            'Redesigned pressure-relieving headband',
            'Ultra-soft protein leather ear cushions',
            'Optimized for glasses-friendly comfort'
          ]}
          placeholderText="XM6"
          imageSrc="/comfort_cushions.webp"
        />

        <ContentRow 
          eyebrow="SMART FEATURES"
          heading="Knows what you need."
          body="Speak-to-Chat pauses your music automatically. Adaptive Sound Control learns your routines and adjusts noise cancelling accordingly. Wear Detection stops playback when you remove the headphones."
          features={[
            'Speak-to-Chat auto-pause',
            'Adaptive Sound Control learns your habits',
            'Wear Detection for instant pause/play'
          ]}
          placeholderText="AI"
          reversed={true}
          imageSrc="/smart_ai_chip.webp"
        />
      </div>
    </section>
  );
}
