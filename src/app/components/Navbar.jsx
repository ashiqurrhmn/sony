'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navbar fades in between 0–120px scroll
  const navOpacity = useTransform(scrollY, [0, 120], [0.9, 1]);
  const navSurface = useTransform(
    scrollY,
    [0, 120],
    ['rgba(10, 10, 10, 0.54)', 'rgba(10, 10, 10, 0.86)'],
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
        className="fixed inset-x-0 top-4 z-50 px-3 sm:top-5 sm:px-5"
      >
        {/* ─── Glass Background ────────────────────── */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full border border-white/[0.16] bg-[linear-gradient(110deg,rgba(255,255,255,0.09),rgba(255,255,255,0.025)_42%,rgba(255,255,255,0.07))] backdrop-blur-2xl shadow-[0_16px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.16)]"
          style={{
            backgroundColor: navSurface,
          }}
        />

        {/* ─── Inner Container ─────────────────────── */}
        <div className="mx-auto flex h-[60px] max-w-[1320px] items-center justify-between px-5 sm:h-[66px] sm:px-7 lg:px-9">
          {/* ── Left: SONY Logo ──────────────────── */}
          <a href="#overview" className="group flex items-center gap-3" aria-label="Sony home">
            <span
              className="text-[15px] font-bold tracking-[0.18em] text-white uppercase transition-all duration-300 group-hover:tracking-[0.23em]"
              style={{ fontFamily: 'var(--font-switzer), system-ui, sans-serif' }}
            >
              SONY
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" />
            <span className="hidden text-[9px] font-medium tracking-[0.2em] text-white/55 uppercase sm:block">
              WH-1000XM6
            </span>
          </a>

          {/* ── Center: Nav Links (Desktop) ──────── */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/[0.09] bg-black/20 p-1.5 lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative rounded-full px-3.5 py-2 text-[10px] font-medium tracking-[0.08em] text-white/60 transition-colors duration-200 hover:bg-white/[0.1] hover:text-white"
              >
                {item.label}
                {/* White line indicator */}
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100" />
              </a>
            ))}
          </div>

          {/* ── Right: CTA + Mobile Toggle ───────── */}
          <div className="flex items-center gap-2">
            {/* CTA Button — Plain White on Black */}
            <a
              href="#buy"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white to-[#d8d8d3] px-4 py-2.5 text-[10px] font-bold tracking-[0.12em] text-black uppercase shadow-[0_7px_24px_rgba(255,255,255,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_11px_28px_rgba(255,255,255,0.26)]"
            >
              Pre-order
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4.5 2.5L8 6L4.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-white/[0.14] bg-white/[0.05] transition-colors hover:bg-white/[0.12]"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
            className="fixed inset-0 z-40 bg-[#090909]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-1 px-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-white/45 uppercase"
            >
              <span className="h-px w-8 bg-white/25" />
              WH-1000XM6
              <span className="h-px w-8 bg-white/25" />
            </motion.div>
            {navLinks.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                onClick={() => setMobileOpen(false)}
                className="w-full max-w-sm rounded-2xl border border-transparent px-5 py-4 text-center text-[20px] font-medium text-white/70 hover:border-white/10 hover:bg-white/[0.05] hover:text-white tracking-tight transition-colors duration-200"
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
              className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-br from-white to-white/80 text-black text-xs font-bold tracking-[0.1em] uppercase shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
            >
              Pre-order Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
