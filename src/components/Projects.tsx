import React, { useState, useEffect, useRef } from 'react';
import { Check, AlertCircle, Cpu, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/projectsData';
import type { Project } from '../types';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';
import { Project3DCanvas } from './Project3DCanvas';

interface ProjectsProps {
  selectedProjectId: string | null;
  onClearSelectedProject: () => void;
  onSelectProject: (id: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  selectedProjectId,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    'All',
    'AI & Agents',
    'Deep Learning & Vision',
    'Full-Stack & Systems',
    'NLP & Transformers',
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  React.useEffect(() => {
    if (selectedProjectId) {
      const idx = filteredProjects.findIndex((p) => p.id === selectedProjectId);
      if (idx !== -1) setActiveIdx(idx);
    }
  }, [selectedProjectId, filteredProjects]);

  const currentProject: Project = filteredProjects[activeIdx] || filteredProjects[0] || projectsData[0];

  const handleSelect = (idx: number) => {
    sound.playHover();
    setActiveIdx(idx);
    const p = filteredProjects[idx];
    if (p) onSelectProject(p.id);
  };

  const handleCategoryChange = (cat: string) => {
    sound.playClick();
    setActiveCategory(cat);
    setActiveIdx(0);
  };

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 2. Category pills stagger
      gsap.fromTo(
        '.category-pill',
        { opacity: 0, y: 15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: EASINGS.smooth,
          scrollTrigger: {
            trigger: '.category-pills-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Project dossier index cards stagger entrance
      gsap.fromTo(
        '.project-index-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.project-cards-container',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Detail panel entrance
      gsap.fromTo(
        '.project-detail-panel',
        { opacity: 0, x: 30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.project-detail-panel',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Cinematic crossfade when user switches active project
  useEffect(() => {
    if (prefersReducedMotion() || !detailPanelRef.current) return;
    gsap.fromTo(
      detailPanelRef.current,
      { opacity: 0.7, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeIdx]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Folioblox Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-mono text-xs text-[#FF5722] uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
              <span>• 3D PROJECT SHOWCASE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.0]">
              Selected Works &amp;{' '}
              <span className="italic font-serif font-normal text-[#FF5722]">
                Featured Projects
              </span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-normal mt-3 max-w-xl leading-relaxed">
              Every project features a live, interactive 3D WebGL simulation. Click any architecture below to inspect its neural agents, vector embeddings, and real-time topology.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-700 bg-white border border-slate-200 px-4 py-2 self-start md:self-auto rounded-full flex items-center gap-2 shadow-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
            <span>3D DOSSIER 0{activeIdx + 1} / 0{filteredProjects.length}</span>
          </div>
        </div>

        {/* Category Filter Pills (Folioblox Style) */}
        <div className="category-pills-container flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === 'All'
                ? projectsData.length
                : projectsData.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`category-pill px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#FF5722] text-white font-bold shadow-[0_0_20px_rgba(255,87,34,0.35)]'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-black text-[#FF5722]' : 'bg-slate-100 text-slate-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Master Architectural Dossier Layout with 3D Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dossier Index Selector */}
          <div className="project-cards-container lg:col-span-5 space-y-3">
            {filteredProjects.map((project, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <div
                  key={project.id}
                  onClick={() => handleSelect(idx)}
                  className={`project-index-card p-5 rounded-[22px] border cursor-pointer transition-all duration-300 relative group ${
                    isSelected
                      ? 'bg-white border-[#FF5722] shadow-[0_15px_35px_rgba(255,87,34,0.15)] -translate-y-0.5'
                      : 'bg-white/80 border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {/* Left Active Strip */}
                  {isSelected && (
                    <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-[#FF5722] rounded-r-full shadow-[0_0_10px_#FF5722]" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] text-[#FF5722] font-semibold">
                      #{String(idx + 1).padStart(2, '0')} // {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 font-medium">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-[#FF5722] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-normal mt-1.5 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 text-slate-400">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Dossier Deep Dive View WITH LIVE 3D CANVAS */}
          {currentProject && (
            <div
              ref={detailPanelRef}
              className="project-detail-panel lg:col-span-7 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 lg:p-9 shadow-xl space-y-6"
            >
              {/* Dossier Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="font-mono text-xs text-[#FF5722] tracking-widest uppercase mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                    <span>3D SYSTEM DOSSIER // {currentProject.category}</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                    {currentProject.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-xs font-mono text-white rounded-full transition-colors cursor-pointer group shadow-sm"
                      title="Inspect GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-[#FF5722]" />
                      <span>SOURCE REPO</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-white transition-colors" />
                    </a>
                  )}
                </div>
              </div>

              {/* LIVE 3D INTERACTIVE CANVAS FOR THIS PROJECT */}
              <div className="w-full">
                <Project3DCanvas projectId={currentProject.id} />
              </div>

              {/* Problem / Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-[18px]">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#FF5722] uppercase mb-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>The Problem Space</span>
                  </div>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {currentProject.problem}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-[18px]">
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-600 uppercase mb-2">
                    <Check className="w-3.5 h-3.5" />
                    <span>The Engineered Solution</span>
                  </div>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {currentProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Architectural Features */}
              <div>
                <div className="font-mono text-xs text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2 font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>Key Architectural Features</span>
                </div>
                <div className="space-y-2">
                  {currentProject.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-600 font-sans"
                    >
                      <span className="text-[#FF5722] font-mono mt-0.5">0{i + 1}.</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Matrix */}
              <div className="pt-4 border-t border-slate-100">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">
                  DEPLOYED TECHNOLOGY STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {currentProject.metricsOrHighlight && (
                  <div className="mt-4 p-3.5 bg-orange-50 border border-orange-200 font-mono text-xs text-[#FF5722] flex items-center gap-2 rounded-[16px]">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
                    <span className="font-semibold">VERIFIED BENCHMARK: {currentProject.metricsOrHighlight}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
