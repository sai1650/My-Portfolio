import React, { useState, useEffect, useRef } from 'react';
import { Search, Mail, FolderGit2, BookOpen, Layers, Terminal, X, Check, Sparkles } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { publicationsData } from '../data/researchData';
import { sound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Research' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const scrollTo = (id: string) => {
    sound.playClick();
    handleClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText('gaddamsai7989@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      handleClose();
    }, 1200);
  };

  const items: CommandItem[] = [
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Featured Projects & Dossiers',
      subtitle: 'View portfolio engineering builds and case studies',
      icon: <FolderGit2 className="w-4 h-4 text-[#ff5500]" />,
      action: () => scrollTo('work'),
    },
    {
      id: 'nav-showcase',
      category: 'Navigation',
      title: '3D Simulation Chamber',
      subtitle: 'Simulations of AI Agents, RAG Pipelines, and Cloud Topologies',
      icon: <Sparkles className="w-4 h-4 text-[#ccff00]" />,
      action: () => scrollTo('showcase'),
    },
    {
      id: 'nav-services',
      category: 'Navigation',
      title: 'Structural Disciplines',
      subtitle: 'AI Agents, Full-Stack, Generative AI, QA Automation',
      icon: <Layers className="w-4 h-4 text-[#ff5500]" />,
      action: () => scrollTo('services'),
    },
    {
      id: 'nav-research',
      category: 'Navigation',
      title: 'Scientific Research & Papers',
      subtitle: 'Google Scholar indexed papers and comparative studies',
      icon: <BookOpen className="w-4 h-4 text-[#ccff00]" />,
      action: () => scrollTo('research'),
    },
    {
      id: 'nav-process',
      category: 'Navigation',
      title: '5-Phase Blueprint',
      subtitle: 'Execution lifecycle from problem understanding to deployment',
      icon: <Terminal className="w-4 h-4 text-[#ff5500]" />,
      action: () => scrollTo('process'),
    },
    {
      id: 'act-email',
      category: 'Actions',
      title: 'Copy Email Address',
      subtitle: 'gaddamsai7989@gmail.com',
      icon: copiedEmail ? <Check className="w-4 h-4 text-[#ccff00]" /> : <Mail className="w-4 h-4 text-[#ff5500]" />,
      action: copyEmail,
    },
    ...projectsData.map((project) => ({
      id: `proj-${project.id}`,
      category: 'Projects' as const,
      title: project.title,
      subtitle: project.shortDescription,
      icon: <FolderGit2 className="w-4 h-4 text-[#ccff00]" />,
      action: () => {
        handleClose();
        onSelectProject(project.id);
      },
    })),
    ...publicationsData.map((pub) => ({
      id: `pub-${pub.id}`,
      category: 'Research' as const,
      title: pub.title,
      subtitle: `${pub.venue} (${pub.year})`,
      icon: <BookOpen className="w-4 h-4 text-[#ff5500]" />,
      action: () => {
        window.open(pub.scholarUrl, '_blank', 'noopener,noreferrer');
        handleClose();
      },
    })),
  ];

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <Search className="w-4 h-4 text-[#FF5722]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, research paper, or action..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No matching commands or projects found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors border ${
                    isSelected
                      ? 'bg-orange-50/80 border-[#FF5722] text-slate-900 shadow-sm'
                      : 'hover:bg-slate-50 text-slate-600 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div className="p-1.5 bg-slate-100 border border-slate-200 rounded-lg shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate flex items-center gap-2">
                        <span className="text-slate-900">{item.title}</span>
                        <span className="text-[9px] px-2 py-0.5 bg-slate-100 text-[#FF5722] rounded-full border border-slate-200 uppercase tracking-wider font-semibold">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#FF5722] font-semibold shrink-0 font-mono">
                    {isSelected ? '↵ Select' : ''}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-slate-50 text-[10px] text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-xs">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-xs">↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700 shadow-xs">Esc</kbd> Close</span>
          </div>
          <div className="font-semibold text-slate-700">SAI GADDAM &bull; FOLIOBLOX ARCHITECTURE</div>
        </div>
      </div>
    </div>
  );
};
