import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Command, Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { sound } from '../utils/audio';
import { prefersReducedMotion } from '../utils/animations';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  soundEnabled,
  onToggleSound,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef<HTMLElement | null>(null);

  // Smooth entrance on initial load
  useEffect(() => {
    if (prefersReducedMotion() || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.nav-item-link',
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out', delay: 0.3 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

          const sections = ['home', 'work', 'research', 'laboratory', 'process', 'about', 'contact'];
          const scrollPos = window.scrollY + 200;

          for (const section of sections) {
            const elem = document.getElementById(section);
            if (elem) {
              const top = elem.offsetTop;
              const height = elem.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection((prev) => (prev !== section ? section : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'laboratory', label: 'Skills 3D' },
    { id: 'process', label: 'Workflow' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Light Luxury Signature Navigation Bar */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
          scrolled
            ? 'py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 group cursor-pointer nav-item-link"
          >
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-[#FF5722] transition-colors">
              Folioblox
            </span>
            <span className="text-[10px] font-mono text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200 hidden sm:inline font-semibold">
              SAI GADDAM
            </span>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 font-sans text-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-item-link transition-colors duration-200 font-medium cursor-pointer ${
                    isActive
                      ? 'text-[#FF5722] font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Tools & Get In Touch Pill Button */}
          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenCommandPalette();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
              title="Search Command Palette (Ctrl+K)"
            >
              <Command className="w-3 h-3 text-[#FF5722]" />
              <span className="text-[10px]">⌘K</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleSound();
              }}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
              title={soundEnabled ? 'Mute Interaction Audio' : 'Unmute Interaction Audio'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#FF5722]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {/* Pill Get In Touch Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2.5 pl-4 sm:pl-5 pr-1.5 py-1.5 rounded-full bg-slate-900 hover:bg-black text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-md cursor-pointer group"
            >
              <span>Get in touch</span>
              <div className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-900"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <div className="space-y-4 text-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full py-3 text-2xl font-bold text-slate-900 hover:text-[#FF5722] border-b border-slate-100"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full mt-6 py-4 rounded-full bg-[#FF5722] text-white font-bold text-sm tracking-wide shadow-xl flex items-center justify-center gap-2"
            >
              <span>Get in touch</span>
              <span className="w-6 h-6 rounded-full bg-white text-[#FF5722] flex items-center justify-center font-bold">
                →
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
