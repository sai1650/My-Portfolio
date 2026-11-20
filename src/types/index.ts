export interface Project {
  id: string;
  title: string;
  category: 'AI & Agents' | 'Deep Learning & Vision' | 'Full-Stack & Systems' | 'NLP & Transformers';
  shortDescription: string;
  problem: string;
  solution: string;
  techStack: string[];
  keyFeatures: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'Production' | 'Research Prototype' | 'Open Source';
  metricsOrHighlight?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  highlight: string;
  iconName: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Comparative Study';
  citations: number;
  scholarUrl: string;
  abstract: string;
  keywords: string[];
  doiPlaceholder?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    tag: string;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  clientRole: string;
}
