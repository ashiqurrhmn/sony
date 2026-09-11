'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navbar fades in between 0–120px scroll
  const navOpacity = useTransform(scrollY, [0, 120], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0, 0.9]);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Technology', href: '#technology' },
    { label: 'Noise Cancelling', href: '#noise-cancelling' },
    { label: 'Specs', href: '#specs' },
    { label: 'Buy', href: '#buy' },
  ];

  return (
    <>
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* ─── Glass Background ────────────────────── */}
        <motion.div
          className="absolute inset-0 -z-10 backdrop-blur-2xl"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* ─── Inner Container ─────────────────────── */}
        <div className="mx-auto max-w-[1280px] h-12 px-5 md:px-8 flex items-center justify-between">
          {/* ── Left: SONY Logo ──────────────────── */}
          <a href="#" className="flex items-center gap-3 group">
            <span
              className="text-[15px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 group-hover:tracking-[0.24em]"
              style={{ fontFamily: 'var(--font-switzer), system-ui, sans-serif' }}
            >
              SONY
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-white/20" />
            <span className="hidden sm:block text-[11px] font-medium tracking-[0.1em] text-white/50 uppercase transition-colors duration-300 group-hover:text-white">
              WH-1000XM6
            </span>
          </a>

          {/* ── Center: Nav Links (Desktop) ──────── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-[13px] font-medium text-white/60 tracking-[0.02em] transition-colors duration-200 hover:text-white py-3.5 group"
              >
                {item.label}
                {/* White line indicator */}
                <span className="absolute bottom-2.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-80" />
              </a>
            ))}
          </div>

          {/* ── Right: CTA + Mobile Toggle ───────── */}
          <div className="flex items-center gap-3">
            {/* CTA Button — Plain White on Black */}
            <a
              href="#buy"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-white/90 text-black px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-200"
            >
              Pre-order
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.5 2.5L8 6L4.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                className="w-[18px] h-[1.5px] bg-white rounded-full block origin-center"
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-[18px] h-[1.5px] bg-white rounded-full block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                className="w-[18px] h-[1.5px] bg-white rounded-full block origin-center"
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu Overlay ───────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-12 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-start pt-16 gap-1"
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                onClick={() => setMobileOpen(false)}
                className="text-[22px] font-medium text-white/70 hover:text-white tracking-tight py-3 transition-colors duration-200"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#buy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="mt-6 px-8 py-3 rounded-full bg-white text-black text-sm font-semibold tracking-wide"
            >
              Pre-order Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

