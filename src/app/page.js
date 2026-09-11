"use client";

import { useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ManifestSection from "./components/ManifestSection";
import { ScrollCanvas } from "./components/ScrollCanvas";
import EngineeringSection from "./components/EngineeringSection";
import NoiseCancellingSection from "./components/NoiseCancellingSection";
import SoundSection from "./components/SoundSection";
import CTASection from "./components/CTASection";
import FeaturesGrid from "./components/FeaturesGrid";
import StatsSection from "./components/StatsSection";
import ExperienceSection from "./components/ExperienceSection";
import PressQuotes from "./components/PressQuotes";

export default function Home() {
  const scrollContainerRef = useRef(null);

  return (
    <div className="relative bg-black text-white">
      {/* ─── Navbar ─────────────────────────────────── */}
      <Navbar />

      {/* ═══════════════════════════════════════════════
          HERO SECTION
          Folder: /hero-section-headphone-frames (all 240 frames)
          ═══════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════
          INTERLUDE — Architecture & Material Philosophy
          ═══════════════════════════════════════════════ */}
      <ManifestSection />

      {/* ═══════════════════════════════════════════════
          POST-SCROLL SECTIONS (PLAIN BLACK AND WHITE)
          ═══════════════════════════════════════════════ */}

      {/* ─── Stats Bar ──────────────────────────────── */}
      <StatsSection />

      {/* ─── Features Grid ──────────────────────────── */}
      <FeaturesGrid />

      {/* ─── Experience / Comfort + Smart Features ──── */}
      <ExperienceSection />

      {/* ─── Press Quotes Marquee ───────────────────── */}
      <PressQuotes />

      {/* ─── Technical Specifications ───────────────── */}
      <section
        id="specs"
        className="relative py-32 px-8 md:px-16 lg:px-24 bg-black border-t border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-4">
              SPECIFICATIONS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              The full picture.
            </h2>
            <p className="text-lg text-white/60 max-w-md mx-auto">
              Everything you need to know, at a glance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className="group p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[10px] tracking-[0.25em] text-white/50 font-mono uppercase">
                    {spec.category}
                  </p>
                  <span className="text-[10px] text-white/30 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">
                  {spec.label}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          HARDWARE MODEL SECTION (Exploded & Assembled Disassembly)
          Folder: /headphone-model-frames (all 300 frames)
          Placed at the very bottom, right before the buy section
          ═══════════════════════════════════════════════ */}
      <div
        id="technology"
        ref={scrollContainerRef}
        style={{ height: "600vh", position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          <ScrollCanvas
            totalFrames={300}
            framePath="/headphone-model-frames/ezgif-frame"
            frameExt="png"
            containerRef={scrollContainerRef}
          />

          {/* Text Overlay Sections */}
          <EngineeringSection containerRef={scrollContainerRef} />
          <NoiseCancellingSection containerRef={scrollContainerRef} />
          <SoundSection containerRef={scrollContainerRef} />
          <CTASection containerRef={scrollContainerRef} />
        </div>
      </div>

      {/* ─── Final CTA Banner ───────────────────────── */}
      <section
        id="buy"
        className="relative py-32 px-8 overflow-hidden bg-black border-b border-white/10"
      >
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-white/50 font-mono uppercase mb-6">
            AVAILABLE NOW
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6">
            Ready to hear the difference?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">
            WH-1000XM6. Flagship noise cancelling, redefined. Starting at{" "}
            <span className="text-white font-semibold">$399.99</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="px-10 py-4 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            >
              Pre-order Now
            </a>
            <a
              href="#"
              className="px-10 py-4 rounded-full border border-white/30 hover:border-white hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-all duration-200"
            >
              Find a Retailer
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────── */}
      <footer className="bg-black border-t border-white/10 py-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
            <div>
              <span className="text-[15px] font-bold tracking-[0.2em] text-white uppercase font-sans">
                SONY
              </span>
              <p className="text-xs text-white/40 mt-2 max-w-xs leading-relaxed">
                Inspiring and fulfilling your curiosity. Delivering the best in
                audio technology since 1946.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-6">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono mb-3">
                  Product
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Overview
                  </a>
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Specifications
                  </a>
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Compare Models
                  </a>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono mb-3">
                  Support
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Help Center
                  </a>
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Warranty
                  </a>
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase font-mono mb-3">
                  Legal
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Terms of Use
                  </a>
                  <a
                    href="#"
                    className="text-xs text-white/60 hover:text-white transition"
                  >
                    Accessibility
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-white/30 font-mono">
              © 2024 Sony Corporation. All rights reserved.
            </span>
            <div className="flex items-center gap-5">
              {["X", "IG", "YT", "FB"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[10px] text-white/50 hover:text-white hover:border-white transition-all duration-200"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Spec Data ────────────────────────────────── */

const specs = [
  {
    category: "Audio",
    label: "Driver Unit",
    value: "40mm, dome type (CCAW voice coil)",
  },
  {
    category: "Audio",
    label: "Frequency Response",
    value: "4 Hz – 40,000 Hz (LDAC, 990 kbps)",
  },
  { category: "Audio", label: "Audio Codec", value: "SBC, AAC, LDAC, LC3" },
  {
    category: "Noise Cancelling",
    label: "Microphones",
    value: "8 microphones with multi-noise sensor technology",
  },
  {
    category: "Noise Cancelling",
    label: "Processing",
    value: "Integrated Processor V2 with AI noise reduction",
  },
  {
    category: "Connectivity",
    label: "Bluetooth",
    value: "Bluetooth 5.3, Multipoint connection",
  },
  {
    category: "Battery",
    label: "Battery Life",
    value: "Up to 40 hours (NC ON), 50 hours (NC OFF)",
  },
  {
    category: "Battery",
    label: "Quick Charge",
    value: "3 min charge = 3 hours playback",
  },
  {
    category: "Design",
    label: "Weight",
    value: "Approx. 250g – ultralight for all-day comfort",
  },
];
