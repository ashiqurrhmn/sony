'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MovingTextSection({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Text block 1: fades in early (0% → 15%), fades out (25% → 35%)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.08, 0.25, 0.35], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.08, 0.25, 0.35], [40, 0, 0, -30]);

  // Text block 2: fades in (35% → 45%), fades out (55% → 65%)
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [40, 0, 0, -30]);

  // Text block 3: fades in (65% → 75%), stays until end
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 1.0], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 1.0], [40, 0, 0, -30]);

  return (
    <div className="flex h-full w-full items-end px-5 pb-14 pointer-events-none sm:px-8 sm:pb-16 lg:items-center lg:px-16 lg:pb-0 xl:px-24">
      <div className="grid w-full max-w-[18rem] sm:max-w-sm lg:max-w-xl">
        {/* Block 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="col-start-1 row-start-1 flex flex-col justify-center"
        >
          <div className="mb-3 h-px w-10 bg-white/40 sm:mb-4 sm:w-12" />
          <h3 className="mb-3 text-[10px] font-mono tracking-[0.24em] text-white/60 uppercase sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
            DESIGN PHILOSOPHY
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Sculpted for<br />every moment.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base lg:mt-6 lg:text-lg">
            Every angle refined. Every surface considered. A headphone that moves with you, not against you.
          </p>
        </motion.div>

        {/* Block 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="col-start-1 row-start-1 flex flex-col justify-center"
        >
          <div className="mb-3 h-px w-10 bg-white/40 sm:mb-4 sm:w-12" />
          <h3 className="mb-3 text-[10px] font-mono tracking-[0.24em] text-white/60 uppercase sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
            COMFORT
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Weightless on<br />your ears.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base lg:mt-6 lg:text-lg">
            Ultra-soft cushions and a featherlight frame distribute pressure evenly — designed for hours of effortless listening.
          </p>
        </motion.div>

        {/* Block 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="col-start-1 row-start-1 flex flex-col justify-center"
        >
          <div className="mb-3 h-px w-10 bg-white/40 sm:mb-4 sm:w-12" />
          <h3 className="mb-3 text-[10px] font-mono tracking-[0.24em] text-white/60 uppercase sm:mb-4 sm:text-xs sm:tracking-[0.3em]">
            MATERIALS
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Premium in<br />every detail.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:mt-5 sm:text-base lg:mt-6 lg:text-lg">
            Soft-touch leather, carbon fiber headband, and precision-milled aluminum — materials chosen for durability and luxury.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
