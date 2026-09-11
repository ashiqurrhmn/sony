'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const quotes = [
  {
    quote: "The best noise cancelling headphones money can buy. Sony continues to set the standard.",
    publication: "The Verge",
    descriptor: "Editor's Choice"
  },
  {
    quote: "A near-perfect blend of sound quality, comfort, and intelligent features.",
    publication: "WIRED",
    descriptor: "9/10"
  },
  {
    quote: "The XM6 doesn't just cancel noise—it redefines what premium audio means.",
    publication: "TechRadar",
    descriptor: "5 Stars"
  },
  {
    quote: "Sony's best yet. The sound quality alone justifies the price.",
    publication: "What Hi-Fi?",
    descriptor: "Product of the Year"
  },
  {
    quote: "These headphones make everything else feel like a compromise.",
    publication: "Engadget",
    descriptor: "Best Overall"
  }
];

export default function PressQuotes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const marqueeItems = [...quotes, ...quotes];

  return (
    <section className="py-16 sm:py-24 bg-black overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 sm:mb-16"
      >
        <p className="text-xs tracking-[0.3em] text-white/50 uppercase font-mono mb-6 text-center">
          PRESS
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-center">
          What the experts say.
        </h2>
      </motion.div>

      <div className="w-full relative py-4">
        <div className="flex w-max animate-marquee">
          {marqueeItems.map((item, idx) => (
            <div 
              key={idx} 
            className="premium-card min-w-[82vw] sm:min-w-[350px] max-w-[400px] mx-2 sm:mx-4 p-6 sm:p-8 rounded-2xl flex-shrink-0 flex flex-col justify-between hover:border-white/30 transition-colors"
            >
              <p className="text-base text-white/70 leading-relaxed italic mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.publication}</p>
                  <p className="text-xs text-white/40">{item.descriptor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
