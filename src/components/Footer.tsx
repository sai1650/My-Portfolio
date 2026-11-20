import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { GithubIcon, LinkedinIcon } from './Icons';
import { BRAND_CONFIG } from '../data/config';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger for Footer
  useEffect(() => {
    if (prefersReducedMotion() || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-slate-200 bg-white pt-20 pb-12 px-6 sm:px-8 lg:px-12 z-10 text-slate-600 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-200 items-start">
          {/* Col 1: Brand & Tagline */}
          <div className="footer-col md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl text-slate-900 tracking-tight">
                Folioblox
              </span>
              <span className="text-xs font-mono text-[#FF5722] bg-[#FF5722]/10 px-2.5 py-0.5 rounded-full border border-[#FF5722]/20 font-semibold">
                SAI GADDAM
              </span>
            </div>

            <p className="text-sm text-slate-600 font-normal max-w-md leading-relaxed">
              AI Engineer &amp; Full-Stack Architect building autonomous multi-agent loops, enterprise RAG knowledge platforms, and scalable web software.
            </p>

            {/* Live IST Clock */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Khammam, India (IST):</span>
              <span className="text-slate-900 font-semibold">{currentTime || 'Loading...'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 font-mono font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-medium">
              <li><a href="#home" className="hover:text-[#FF5722] transition-colors">Home</a></li>
              <li><a href="#work" className="hover:text-[#FF5722] transition-colors">Projects &amp; Archive</a></li>
              <li><a href="#research" className="hover:text-[#FF5722] transition-colors">Research &amp; Scholar</a></li>
              <li><a href="#process" className="hover:text-[#FF5722] transition-colors">Client Workflow</a></li>
              <li><a href="#about" className="hover:text-[#FF5722] transition-colors">About Principal</a></li>
              <li><a href="#contact" className="hover:text-[#FF5722] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Verified Channels */}
          <div className="footer-col md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-slate-900 font-mono font-bold">
              CONNECT
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={BRAND_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors border border-slate-200 group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-[#FF5722] group-hover:scale-110 transition-transform" />
                  <span className="font-medium">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
              </a>

              <a
                href={BRAND_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors border border-slate-200 group shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#FF5722] group-hover:scale-110 transition-transform" />
                  <span className="font-medium">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; {CURRENT_YEAR} Sai Gaddam. All rights reserved. Crafted with Folioblox Architecture.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200 cursor-pointer shadow-sm font-sans"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF5722]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
