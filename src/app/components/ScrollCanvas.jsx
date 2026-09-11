"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function ScrollCanvas({
  totalFrames = 120,
  framePath = "/frames/frame",
  frameExt = "webp",
  containerRef,
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastDrawnFrameIndexRef = useRef(-1);
  const rafRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── Preload all frames ──────────────────────────
  useEffect(() => {
    let isCancelled = false;
    const preloadImages = async () => {
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        const frameIndex = i.toString().padStart(3, "0");
        const src = `${framePath}-${frameIndex}.${frameExt}`;
        promises.push(
          new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              if (!isCancelled) setLoadedFrames((prev) => prev + 1);
              resolve(img);
            };
            img.onerror = () => {
              if (!isCancelled) setLoadedFrames((prev) => prev + 1);
              resolve(null);
            };
            img.src = src;
          }),
        );
      }

      const loadedImages = await Promise.all(promises);
      if (!isCancelled) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    preloadImages();
    return () => {
      isCancelled = true;
    };
  }, [totalFrames, framePath, frameExt]);

  // ─── Draw frame to canvas (object-fit: cover) ────
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.naturalWidth) {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    if (lastDrawnFrameIndexRef.current === frameIndex) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hRatio = canvas.width / img.naturalWidth;
      const vRatio = canvas.height / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const drawWidth = img.naturalWidth * ratio;
      const drawHeight = img.naturalHeight * ratio;
      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnFrameIndexRef.current = frameIndex;
    });
  }, []);

  // ─── Scroll → frame index mapping ───────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.min(
      Math.max(Math.floor(latest * totalFrames), 0),
      totalFrames - 1,
    );
    drawFrame(frameIndex);
  });

  // ─── Resize handler ─────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      lastDrawnFrameIndexRef.current = -1;
      if (isLoaded) {
        const latest = scrollYProgress.get();
        const frameIndex = Math.min(
          Math.max(Math.floor(latest * totalFrames), 0),
          totalFrames - 1,
        );
        drawFrame(frameIndex);
      }
    };

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 80);
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, isLoaded, scrollYProgress, totalFrames]);

  // ─── Draw first frame once loaded ────────────────
  useEffect(() => {
    if (isLoaded) {
      drawFrame(0);
    }
  }, [isLoaded, drawFrame]);

  const loadingProgress = (loadedFrames / totalFrames) * 100;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 20,
          }}
        >
          <div
            style={{
              height: "2px",
              backgroundColor: "rgba(255,255,255,0.05)",
              width: "100%",
            }}
          >
            <div
              className="loading-bar"
              style={{
                width: `${loadingProgress}%`,
              }}
            />
          </div>
          <div className="flex items-center justify-center pt-4">
            <p className="text-xs text-white/30 tracking-widest uppercase">
              Loading experience...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
