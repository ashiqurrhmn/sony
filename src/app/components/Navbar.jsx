'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Technology', href: '#technology' },
  { label: 'Noise Cancelling', href: '#noise-cancelling' },
  { label: 'Specs', href: '#specs' },
  { label: 'Buy', href: '#buy' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navOpacity = useTransform(scrollY, [0, 120], [0.9, 1]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed inset-x-0 top-0 z-50 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between">
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

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative py-2 text-[10px] font-medium tracking-[0.12em] text-white/60 transition-colors duration-200 hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center">
            <a
              href="#buy"
              className="group hidden items-center gap-2 py-2 text-[10px] font-semibold tracking-[0.14em] text-white uppercase transition-colors duration-200 hover:text-white/60 sm:inline-flex"
            >
              Pre-order
              <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4.5 2.5L8 6L4.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="py-2 text-[10px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:text-white/60 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-1 bg-black/95 px-5 backdrop-blur-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-7 text-[10px] font-medium tracking-[0.24em] text-white/45 uppercase"
            >
              WH-1000XM6
            </motion.p>
            {navLinks.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-center text-[22px] font-medium tracking-tight text-white/70 transition-colors hover:text-white"
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
              className="mt-7 text-[11px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:text-white/60"
            >
              Pre-order now →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
