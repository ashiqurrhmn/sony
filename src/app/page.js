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
import MovingTextSection from "./components/MovingTextSection";

export default function Home() {
  const scrollContainerRef = useRef(null);
  const movingContainerRef = useRef(null);

  return (
    <div className="relative bg-black text-white">
      {/* ─── Navbar ─────────────────────────────────── */}
      <Navbar />

      {/* ═══════════════════════════════════════════════
          HERO SECTION (240 Frames)
          Folder: /hero-section-headphone-frames
          ═══════════════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════════════
          INTERLUDE — Architecture & Material Philosophy
          ═══════════════════════════════════════════════ */}
      <ManifestSection />

      {/* ═══════════════════════════════════════════════
          MOVING HEADPHONE SECTION
          Folder: /moving-headphone-frames (all 300 frames)
          ═══════════════════════════════════════════════ */}
      <div
        ref={movingContainerRef}
        style={{ height: "500vh", position: "relative" }}
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
          <div className="flex h-full w-full">
            {/* Left: Scroll-linked text */}
            <div className="w-1/2 h-full relative z-10">
              <MovingTextSection containerRef={movingContainerRef} />
            </div>
            {/* Right: Headphone canvas */}
            <div className="w-1/2 h-full relative">
              <ScrollCanvas
                totalFrames={300}
                framePath="/moving-headphone-frames/ezgif-frame"
                frameExt="png"
                containerRef={movingContainerRef}
              />
            </div>
          </div>
        </div>
      </div>

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
            {[
              {
                category: "AUDIO",
                label: "Driver Unit",
                value: "30mm specially designed driver unit",
              },
              {
                category: "AUDIO",
                label: "Frequency",
                value: "4Hz - 40,000Hz (JEITA)",
              },
              {
                category: "AUDIO",
                label: "DSEE Extreme",
                value: "Yes, AI-powered upscaling",
              },
              {
                category: "ANC",
                label: "Processors",
                value: "Dual processors (V1 + QN1)",
              },
              {
                category: "ANC",
                label: "Microphones",
                value: "8 mics total (4 on each ear cup)",
              },
              {
                category: "ANC",
                label: "Ambient Sound",
                value: "Adjustable 20-level transparency",
              },
              {
                category: "POWER",
                label: "Battery Life",
                value: "Up to 30 hours with ANC on",
              },
              {
                category: "POWER",
                label: "Quick Charge",
                value: "3 mins charge = 3 hours playback",
              },
              {
                category: "DESIGN",
                label: "Weight",
                value: "Approx. 250g (8.82 oz)",
              },
            ].map((spec, i) => (
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

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60 z-[1]" />

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
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-8">
            Your sound. <br /> Nothing else.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-white/90 text-black text-sm font-semibold tracking-wide transition-all duration-200">
              Buy WH-1000XM6
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-white text-sm font-medium tracking-wide transition-all duration-200">
              Find a retailer
            </button>
          </div>
          <p className="mt-8 text-sm text-white/40">
            Starting at $399.99. Free shipping and 30-day returns.
          </p>
        </div>
      </section>

      {/* ─── Simple Footer ──────────────────────────── */}
      <footer className="py-12 px-8 border-t border-white/10 bg-black text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif tracking-tight font-bold text-2xl text-white">
            Sony
          </span>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
          <p className="text-xs text-white/30">
            © 2026 Sony Electronics Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
