import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let haloX = -100;
    let haloY = -100;
    let isHovered = false;
    let isVisible = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (haloRef.current) haloRef.current.style.opacity = '1';
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const hoverable = Boolean(
        target &&
          (target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.classList.contains('cursor-pointer') ||
            target.closest('.group') ||
            target.getAttribute('role') === 'button')
      );

      if (hoverable !== isHovered) {
        isHovered = hoverable;
        if (haloRef.current) {
          if (isHovered) {
            haloRef.current.style.width = '36px';
            haloRef.current.style.height = '36px';
            haloRef.current.style.borderColor = 'rgba(255, 85, 0, 0.8)';
            haloRef.current.style.backgroundColor = 'rgba(255, 85, 0, 0.12)';
          } else {
            haloRef.current.style.width = '24px';
            haloRef.current.style.height = '24px';
            haloRef.current.style.borderColor = 'rgba(204, 255, 0, 0.4)';
            haloRef.current.style.backgroundColor = 'transparent';
          }
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (haloRef.current) haloRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing halo loop with direct DOM transform
    const render = () => {
      haloX += (mouseX - haloX) * 0.2;
      haloY += (mouseY - haloY) * 0.2;

      if (haloRef.current) {
        const offset = isHovered ? 18 : 12;
        haloRef.current.style.transform = `translate3d(${haloX - offset}px, ${haloY - offset}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#ff5500] pointer-events-none z-50 shadow-[0_0_8px_#ff5500] opacity-0 transition-opacity duration-200"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Trailing Architectural Halo */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#ccff00]/40 pointer-events-none z-50 opacity-0 transition-all duration-200 ease-out"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};
