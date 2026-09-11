'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollText({
  containerRef,
  startProgress,
  endProgress,
  peakStart,
  peakEnd,
  position = 'center',
  slideDirection = 'none',
  children,
  className = ''
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const pStart = peakStart ?? startProgress + 0.05;
  const pEnd = peakEnd ?? endProgress - 0.05;

  const opacity = useTransform(
    scrollYProgress,
    [startProgress, pStart, pEnd, endProgress],
    [0, 1, 1, 0]
  );

  let xMap = [0, 0, 0, 0];
  if (slideDirection === 'left') {
    xMap = [-40, 0, 0, -20];
  } else if (slideDirection === 'right') {
    xMap = [40, 0, 0, 20];
  }

  const x = useTransform(
    scrollYProgress,
    [startProgress, pStart, pEnd, endProgress],
    xMap
  );

  const positionClasses = {
    left: 'justify-start text-left',
    right: 'justify-end text-right',
    center: 'justify-center text-center',
  };

  return (
    <div className={`absolute inset-0 flex items-center pointer-events-none z-10 w-full h-full ${positionClasses[position]} ${className}`}>
      <motion.div style={{ opacity, x }}>
        {children}
      </motion.div>
    </div>
  );
}
