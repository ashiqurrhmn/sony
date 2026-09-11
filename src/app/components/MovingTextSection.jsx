"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MovingTextSection({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text block 1: fades in early (0% → 15%), fades out (25% → 35%)
  const opacity1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.25, 0.35],
    [0, 1, 1, 0],
  );
  const y1 = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.25, 0.35],
    [40, 0, 0, -30],
  );

  // Text block 2: fades in (35% → 45%), fades out (55% → 65%)
  const opacity2 = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55, 0.65],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55, 0.65],
    [40, 0, 0, -30],
  );

  // Text block 3: fades in (65% → 75%), stays until end
  const opacity3 = useTransform(
    scrollYProgress,
    [0.65, 0.75, 0.9, 1.0],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.65, 0.75, 0.9, 1.0],
    [40, 0, 0, -30],
  );

  return (
    <div className="relative w-full h-full ml-68 flex items-center">
      {/* Block 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-20"
      >
        <div className="w-12 h-px bg-white/40 mb-4" />
        <h3 className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
          DESIGN PHILOSOPHY
        </h3>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Sculpted for
          <br />
          every moment.
        </h2>
        <p className="text-base md:text-lg text-white/60 mt-6 leading-relaxed max-w-md">
          Every angle refined. Every surface considered. A headphone that moves
          with you, not against you.
        </p>
      </motion.div>

      {/* Block 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-20"
      >
        <div className="w-12 h-px bg-white/40 mb-4" />
        <h3 className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
          COMFORT
        </h3>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Weightless on
          <br />
          your ears.
        </h2>
        <p className="text-base md:text-lg text-white/60 mt-6 leading-relaxed max-w-md">
          Ultra-soft cushions and a featherlight frame distribute pressure
          evenly — designed for hours of effortless listening.
        </p>
      </motion.div>

      {/* Block 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-20"
      >
        <div className="w-12 h-px bg-white/40 mb-4" />
        <h3 className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
          MATERIALS
        </h3>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Premium in
          <br />
          every detail.
        </h2>
        <p className="text-base md:text-lg text-white/60 mt-6 leading-relaxed max-w-md">
          Soft-touch leather, carbon fiber headband, and precision-milled
          aluminum — materials chosen for durability and luxury.
        </p>
      </motion.div>
    </div>
  );
}
