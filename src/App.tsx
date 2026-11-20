import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ThreeGlobalBackground } from './components/ThreeGlobalBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductShowcase3D } from './components/ProductShowcase3D';
import { Projects } from './components/Projects';
import { Research } from './components/Research';
import { TechEcosystem } from './components/TechEcosystem';
import { WorkProcess } from './components/WorkProcess';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { sound } from './utils/audio';
import { useScrollReveal } from './utils/scrollReveal';

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Activate hardware-accelerated scroll reveal observer across all sections
  useScrollReveal();

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectFromPalette = (projectId: string) => {
    setSelectedProjectId(projectId);
    scrollToSection('work');
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-[#FF5722]/25 selection:text-slate-900 overflow-x-hidden font-sans">
      {/* 3D Global Three.js Particle Constellation (Warm orange & cobalt ambient depth over porcelain) */}
      <ThreeGlobalBackground />

      {/* Custom Motion Cursor on Desktop */}
      <CustomCursor />

      {/* Folioblox Signature Light Luxury Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Flow — Folioblox Architecture with 3D Animations in Every Section */}
      <main className="relative z-10 flex flex-col">
        {/* Section 01: Hero with Sai Gaddam's Authentic Portrait + 3D Parallax + 3 Floating Cards */}
        <Hero
          onExploreWork={() => scrollToSection('work')}
          onContact={() => scrollToSection('contact')}
        />

        {/* Section 02: 3D Interactive WebGL Simulation Chamber (AI Agents, RAG, Web Systems) */}
        <ProductShowcase3D
          onSelectArchitecture={() => {
            scrollToSection('contact');
          }}
        />

        {/* Section 03: Portfolio Showcase & Selected Works with 3D Perspective WebGL Cards */}
        <Projects
          selectedProjectId={selectedProjectId}
          onClearSelectedProject={() => setSelectedProjectId(null)}
          onSelectProject={(id) => setSelectedProjectId(id)}
        />

        {/* Section 04: Google Scholar Peer-Reviewed Research with Live 3D Attention Lattice Simulation */}
        <Research />

        {/* Section 05: 3D Interactive Tech Core & Capabilities with Three.js 3D Neural Orb */}
        <TechEcosystem />

        {/* Section 06: 5-Phase Client Sprint Workflow with 3D Elevation */}
        <WorkProcess />

        {/* Section 07: Principal Biography with Sai's Portrait in 3D Glass Card */}
        <About />

        {/* Section 08: Direct Project Inquiry & Let's Talk Form */}
        <Contact />
      </main>

      {/* Signature Light Minimalist Footer */}
      <Footer />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectFromPalette}
      />
    </div>
  );
}

export default App;
