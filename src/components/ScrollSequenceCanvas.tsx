import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface ScrollSequenceProps {
  folder: string; // e.g. '/animations/hero'
  fileNamePrefix?: string; // e.g. 'frame-'
  fileExtension?: string; // e.g. 'webp'
  totalFrames: number; // e.g. 120
  padDigits?: number; // e.g. 4
  scrollHeightVh?: number; // e.g. 450 (450vh total pinned scroll)
  fallbackPoster?: string;
  className?: string;
  onProgressUpdate?: (progress: number, currentFrame: number) => void;
  children?: React.ReactNode;
}

export const ScrollSequenceCanvas: React.FC<ScrollSequenceProps> = ({
  folder,
  fileNamePrefix = 'frame-',
  fileExtension = 'webp',
  totalFrames = 120,
  padDigits = 4,
  scrollHeightVh = 420,
  fallbackPoster,
  className = '',
  onProgressUpdate,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const telemetryFrameRef = useRef<HTMLSpanElement | null>(null);
  const telemetryBufferRef = useRef<HTMLSpanElement | null>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);
  const isScrubbingRef = useRef<boolean>(false);
  const onProgressUpdateRef = useRef(onProgressUpdate);
  onProgressUpdateRef.current = onProgressUpdate;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Helper to format frame path
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = String(index + 1).padStart(padDigits, '0');
      return `${folder}/${fileNamePrefix}${frameNum}.${fileExtension}`;
    },
    [folder, fileNamePrefix, padDigits, fileExtension]
  );

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Draw frame to canvas maintaining cover aspect ratio
  const renderFrameToCanvas = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Find requested image or nearest loaded neighbor
      let img: HTMLImageElement | null = imagesRef.current[frameIdx];
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < totalFrames; offset++) {
          const prev = frameIdx - offset;
          if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev]?.naturalWidth) {
            img = imagesRef.current[prev];
            break;
          }
          const next = frameIdx + offset;
          if (next < totalFrames && imagesRef.current[next]?.complete && imagesRef.current[next]?.naturalWidth) {
            img = imagesRef.current[next];
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX: number;
      let offsetY: number;

      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    [totalFrames]
  );

  // Progressive image loading pipeline with async decode
  useEffect(() => {
    imagesRef.current = new Array(totalFrames).fill(null);
    let loadedCount = 0;
    let isMounted = true;

    const updateBufferUI = () => {
      if (!telemetryBufferRef.current) return;
      const pct = Math.round((loadedCount / totalFrames) * 100);
      telemetryBufferRef.current.textContent = `BUFFER: ${pct}%`;
    };

    const loadImage = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!isMounted || imagesRef.current[idx]) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(idx);

        img.onload = () => {
          if (!isMounted) return;
          // Decode off main thread if supported
          if ('decode' in img) {
            img
              .decode()
              .then(() => {
                if (!isMounted) return;
                imagesRef.current[idx] = img;
                loadedCount++;
                updateBufferUI();
                if (idx === 0 && lastRenderedFrameRef.current === -1) {
                  renderFrameToCanvas(0);
                  lastRenderedFrameRef.current = 0;
                }
                resolve();
              })
              .catch(() => {
                if (!isMounted) return;
                imagesRef.current[idx] = img;
                loadedCount++;
                updateBufferUI();
                if (idx === 0 && lastRenderedFrameRef.current === -1) {
                  renderFrameToCanvas(0);
                  lastRenderedFrameRef.current = 0;
                }
                resolve();
              });
          } else {
            imagesRef.current[idx] = img;
            loadedCount++;
            updateBufferUI();
            if (idx === 0 && lastRenderedFrameRef.current === -1) {
              renderFrameToCanvas(0);
              lastRenderedFrameRef.current = 0;
            }
            resolve();
          }
        };

        img.onerror = () => {
          resolve();
        };
      });
    };

    const loadPipeline = async () => {
      // Phase 1: High priority initial frames (0 to 12)
      const initialBatch: Promise<void>[] = [];
      for (let i = 0; i < Math.min(12, totalFrames); i++) {
        initialBatch.push(loadImage(i));
      }
      await Promise.all(initialBatch);
      if (!isMounted) return;

      renderFrameToCanvas(0);

      // Phase 2: Keyframe steps across the whole timeline (every 4th frame)
      const keyframeBatch: Promise<void>[] = [];
      for (let i = 12; i < totalFrames; i += 4) {
        keyframeBatch.push(loadImage(i));
      }
      await Promise.all(keyframeBatch);
      if (!isMounted) return;

      // Phase 3: Fill in remaining frames in small non-blocking chunks
      const chunkSize = 8;
      for (let i = 12; i < totalFrames; i += chunkSize) {
        if (!isMounted) break;
        const chunk: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + chunkSize, totalFrames); j++) {
          if (!imagesRef.current[j]) {
            chunk.push(loadImage(j));
          }
        }
        await Promise.all(chunk);
      }
    };

    loadPipeline();

    return () => {
      isMounted = false;
    };
  }, [totalFrames, getFrameUrl, renderFrameToCanvas]);

  // Canvas resize listener with capped DPR for fill-rate efficiency
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const frameToRender = Math.max(0, lastRenderedFrameRef.current);
      renderFrameToCanvas(frameToRender);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrameToCanvas]);

  // Main RAF animation loop & scroll tracking (NO React re-renders!)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const scrollableDistance = container.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return 0;
      const currentScroll = window.scrollY - containerTop;
      return Math.min(1, Math.max(0, currentScroll / scrollableDistance));
    };

    const handleScroll = () => {
      targetProgressRef.current = calculateScrollProgress();
      if (!isScrubbingRef.current) {
        isScrubbingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial sync
    targetProgressRef.current = calculateScrollProgress();
    currentProgressRef.current = targetProgressRef.current;
    if (onProgressUpdateRef.current) {
      onProgressUpdateRef.current(currentProgressRef.current, 0);
    }

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      if (prefersReducedMotion) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0004) {
          // Buttery smooth lerp dampening
          currentProgressRef.current += diff * 0.16;
        } else {
          currentProgressRef.current = targetProgressRef.current;
          isScrubbingRef.current = false;
        }
      }

      const p = currentProgressRef.current;
      const frameToRender = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(p * (totalFrames - 1)))
      );

      // Render canvas frame when changed
      if (frameToRender !== lastRenderedFrameRef.current) {
        renderFrameToCanvas(frameToRender);
        lastRenderedFrameRef.current = frameToRender;

        // Direct DOM update for frame counter
        if (telemetryFrameRef.current) {
          telemetryFrameRef.current.textContent = `FRAME ${String(frameToRender + 1).padStart(4, '0')} / ${totalFrames}`;
        }
      }

      // Direct callback for hero scenes styling (0 React re-renders)
      if (onProgressUpdateRef.current) {
        onProgressUpdateRef.current(p, frameToRender);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, prefersReducedMotion, renderFrameToCanvas]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${scrollHeightVh}vh` }}
      className={`relative w-full bg-[#0c0d11] select-none ${className}`}
    >
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0c0d11]"
      >
        {/* Render canvas with hardware-accelerated style */}
        <canvas
          ref={canvasRef}
          style={{ willChange: 'transform' }}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Fallback Static Poster if WebP frames are missing */}
        {fallbackPoster && (
          <img
            src={fallbackPoster}
            alt="Hero Exhibition Fallback"
            className="absolute inset-0 w-full h-full object-cover z-[-1] pointer-events-none opacity-20"
          />
        )}

        {/* Perimeter Architectural Datum Crosshairs */}
        <div className="absolute top-6 left-8 z-20 font-mono text-xs text-[#ff5500] pointer-events-none select-none">
          +
        </div>
        <div className="absolute top-6 right-8 z-20 font-mono text-xs text-[#ff5500] pointer-events-none select-none">
          +
        </div>
        <div className="absolute bottom-6 left-8 z-20 font-mono text-xs text-[#ccff00] pointer-events-none select-none">
          +
        </div>
        <div className="absolute bottom-6 right-8 z-20 font-mono text-xs text-[#ccff00] pointer-events-none select-none">
          +
        </div>

        {/* Real-time frame & sequence telemetry in corner (DOM ref updated) */}
        <div className="absolute bottom-6 left-12 z-20 hidden sm:flex items-center gap-3 font-mono text-[10px] text-[#9da4b2] bg-[#13161f]/85 px-3 py-1.5 border border-[#232734] backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-[#ccff00]">
            <span className="w-1.5 h-1.5 bg-[#ccff00] animate-pulse" />
            SEQUENCE SCRUBBER
          </span>
          <span className="text-[#9da4b2]">//</span>
          <span ref={telemetryFrameRef} className="text-[#f3f4ee]">
            FRAME 0001 / {totalFrames}
          </span>
          <span className="text-[#9da4b2]">//</span>
          <span ref={telemetryBufferRef} className="text-[#ff5500]">
            BUFFER: 0%
          </span>
        </div>

        {/* Interactive children / Storytelling layers */}
        {children && (
          <div className="relative z-10 w-full h-full pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
