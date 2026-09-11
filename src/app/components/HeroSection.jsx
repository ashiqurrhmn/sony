"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Editorial Elements
  const brandBackdropRef = useRef(null);
  const leftDescRef = useRef(null);
  const rightTagRef = useRef(null);
  const leftButtonsRef = useRef(null);
  const rightSocialRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Mid-scroll and end story elements
  const midStoryRef = useRef(null);
  const endCtaRef = useRef(null);
  const overlayRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const TOTAL_FRAMES = 240;

  // ─── Preload all 240 hero frames ──────────────────
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const images = [];

    const loadFrame = (i) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          loaded++;
          if (!cancelled)
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve(img);
        };
        img.onerror = () => {
          loaded++;
          if (!cancelled)
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve(null);
        };
        const idx = String(i).padStart(3, "0");
        img.src = `/hero-section-headphone-frames/ezgif-frame-${idx}.webp`;
      });

    const loadAll = async () => {
      const batchSize = 20;
      for (let start = 1; start <= TOTAL_FRAMES; start += batchSize) {
        const batch = [];
        for (
          let i = start;
          i < Math.min(start + batchSize, TOTAL_FRAMES + 1);
          i++
        ) {
          batch.push(loadFrame(i));
        }
        const results = await Promise.all(batch);
        images.push(...results);
        if (cancelled) return;
      }
      if (!cancelled) {
        imagesRef.current = images;
        setIsLoaded(true);
      }
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Draw frame to canvas (object-fit: cover) ────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    // Canvas pixels are scaled by DPR, but drawing coordinates must stay in
    // CSS pixels. Using the backing-store dimensions here magnified frames on
    // high-density mobile screens.
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cw, ch);
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;
    // Phone screens use contain so the whole headphone remains in view instead
    // of filling the tall viewport and cropping into the product.
    const scale = window.innerWidth < 1024
      ? Math.min(cw / iw, ch / ih) * 0.96
      : Math.max(cw / iw, ch / ih) * 0.75;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = index;
  }, []);

  // ─── Canvas resize handler ───────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (isLoaded) drawFrame(currentFrameRef.current);
    };

    let timer;
    const debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(resize, 100);
    };
    window.addEventListener("resize", debounced);
    resize();
    return () => {
      window.removeEventListener("resize", debounced);
      clearTimeout(timer);
    };
  }, [isLoaded, drawFrame]);

  // ─── Draw first frame when loaded ────────────
  useEffect(() => {
    if (isLoaded) drawFrame(0);
  }, [isLoaded, drawFrame]);

  // ─── GSAP ScrollTrigger Scrubbing ───────────
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const frame = Math.min(
              Math.floor(self.progress * TOTAL_FRAMES),
              TOTAL_FRAMES - 1,
            );
            if (frame !== currentFrameRef.current) {
              drawFrame(frame);
            }
          },
        },
      });

      // ── Initial State Entrance (0% → 6%) ──
      gsap.fromTo(
        brandBackdropRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "6% top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        [leftDescRef.current, leftButtonsRef.current],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "7% top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        [rightTagRef.current, rightSocialRef.current],
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "7% top",
            scrub: 1,
          },
        },
      );

      // ── Exit Initial Editorial Layout (15% → 26%) ──
      gsap.to(brandBackdropRef.current, {
        opacity: 0,
        scale: 1.06,
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "15% top",
          end: "26% top",
          scrub: 1,
        },
      });

      gsap.to([leftDescRef.current, leftButtonsRef.current], {
        opacity: 0,
        x: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "14% top",
          end: "24% top",
          scrub: 1,
        },
      });

      gsap.to([rightTagRef.current, rightSocialRef.current], {
        opacity: 0,
        x: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "14% top",
          end: "24% top",
          scrub: 1,
        },
      });

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "4% top",
          end: "10% top",
          scrub: true,
        },
      });

      // ── Mid-scroll Storyline (35% → 55%) ──
      gsap.fromTo(
        midStoryRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "32% top",
            end: "42% top",
            scrub: 1,
          },
        },
      );

      gsap.to(midStoryRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "54% top",
          end: "64% top",
          scrub: 1,
        },
      });

      // ── End CTA Entrance (70% → 82%) ──────────
      gsap.fromTo(
        endCtaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "70% top",
            end: "82% top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "88% top",
            end: "98% top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative font-sans-switzer select-none"
      style={{ height: "550vh" }}
    >
      {/* ─── Sticky Viewport ─────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* LAYER 1 (BEHIND HEADPHONE): Huge "Sony" Backdrop Text */}
        <div
          ref={brandBackdropRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
          style={{ transform: "translateY(-4%)" }}
        >
          <span
            className="font-serif tracking-tight font-bold text-[24vw] sm:text-[26vw] md:text-[28vw] lg:text-[30vw] leading-none select-none text-white/[0.08]"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.04em",
            }}
          >
            Sony
          </span>
        </div>

        {/* LAYER 2: Canvas Rendering */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ display: "block" }}
        />

        {/* LAYER 3 (FOREGROUND): Editorial Typography & UI Controls */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-5 sm:p-8 md:p-16 lg:p-20">
          {/* Top Brand Marker */}

          {/* Middle Content Row */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 sm:gap-8 my-auto">
            {/* Left Column: Description + Buttons */}
            <div className="max-w-sm sm:max-w-md">
              <div ref={leftDescRef} className="opacity-0 mb-5 sm:mb-6 max-w-[17rem] sm:max-w-md">
                <p className="text-[13px] sm:text-base text-white/70 leading-relaxed font-light">
                  intelligent industry-leading noise cancelling headphones with
                  premium sound elevate your listening experience with the
                  ability to personalize and control everything you hear.
                </p>
              </div>

              {/* Action Buttons */}
              <div
                ref={leftButtonsRef}
                className="flex flex-wrap items-center gap-2.5 sm:gap-4 pointer-events-auto opacity-0"
              >
                <a
                  href="#buy"
                  className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-br from-white to-white/80 text-black text-xs sm:text-sm font-semibold tracking-wide shadow-[0_8px_24px_rgba(255,255,255,0.12)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  Buy now
                </a>
                <a
                  href="#technology"
                  className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/30 bg-black/10 hover:border-white hover:bg-white/10 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-200"
                >
                  Learn more
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div
              ref={rightTagRef}
              className="text-left md:text-right opacity-0 hidden sm:block"
            >
              <h3
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Headphones
              </h3>
              <p
                className="font-serif text-base sm:text-lg md:text-xl text-white/50 tracking-wider lowercase mt-1"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                wh-1000xm6
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between w-full pt-5">
            <div ref={scrollIndicatorRef} className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
                SCROLL TO DISCOVER
              </span>
              <div className="w-10 h-px bg-white/40" />
            </div>

            <div
              ref={rightSocialRef}
              className="hidden sm:flex items-center gap-5 text-white/40 text-xs opacity-0"
            >
              <span className="hover:text-white transition-colors cursor-pointer">
                ANC
              </span>
              <span>/</span>
              <span className="hover:text-white transition-colors cursor-pointer">
                LDAC
              </span>
              <span>/</span>
              <span className="hover:text-white transition-colors cursor-pointer">
                40HR
              </span>
            </div>
          </div>
        </div>

        {/* MID-SCROLL STORYLINE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div
            ref={midStoryRef}
            className="text-center opacity-0 max-w-2xl px-5 sm:px-8"
          >
            <p className="font-script text-3xl sm:text-4xl text-white mb-2">
              pure immersion
            </p>
            <h2 className="font-sans-switzer text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Mastered for clarity.
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-white/60 max-w-md mx-auto leading-relaxed">
              Every curve tuned for acoustic pressure distribution and
              effortless weightless listening.
            </p>
          </div>
        </div>

        {/* END CTA HOOK */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div ref={endCtaRef} className="text-center opacity-0 px-5">
            <p className="font-script text-2xl sm:text-3xl text-white mb-3">
              Next Chapter
            </p>
            <h2 className="font-sans-switzer text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Step inside the craft.
            </h2>
            <a
              href="#technology"
              className="pointer-events-auto inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-white/90 text-black text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Architecture
              <svg
                className="w-4 h-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Fade to black bottom transition */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none z-30 bg-black opacity-0"
        />

        {/* Loading Screen */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
            <span
              className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-8"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Sony
            </span>
            <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="mt-4 text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase">
              {loadProgress}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
