import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    category: 'Generative AI & Autonomous Agents',
    description: 'Foundational LLMs, multi-agent frameworks, cognitive pipelines, and vector knowledge stores.',
    skills: [
      { name: 'LangChain', level: 'Expert', tag: 'Orchestration' },
      { name: 'LangGraph', level: 'Expert', tag: 'Multi-Agent Workflows' },
      { name: 'RAG Architecture', level: 'Expert', tag: 'Hybrid Search & Retrieval' },
      { name: 'Model Context Protocol (MCP)', level: 'Advanced', tag: 'Tool Execution' },
      { name: 'OpenAI API (GPT-4o)', level: 'Expert', tag: 'LLM Integration' },
      { name: 'Anthropic Claude 3.5', level: 'Expert', tag: 'Reasoning & Code' },
      { name: 'Groq (Llama 3)', level: 'Expert', tag: 'Ultra-low Latency' },
      { name: 'Ollama / Local LLMs', level: 'Advanced', tag: 'Private Inference' }
    ]
  },
  {
    category: 'AI & Machine Learning Core',
    description: 'Deep neural networks, computer vision transformers, NLP pipelines, and statistical learning.',
    skills: [
      { name: 'PyTorch', level: 'Expert', tag: 'Deep Learning' },
      { name: 'TensorFlow', level: 'Advanced', tag: 'Model Training' },
      { name: 'Scikit-learn', level: 'Expert', tag: 'Statistical ML' },
      { name: 'Hugging Face Transformers', level: 'Expert', tag: 'NLP & Tokenization' },
      { name: 'Vision Transformers (ViT)', level: 'Expert', tag: 'Computer Vision' },
      { name: 'BERT & Wav2Vec2', level: 'Expert', tag: 'Multimodal Models' },
      { name: 'OpenCV', level: 'Advanced', tag: 'Image Processing' },
      { name: 'Pandas & NumPy', level: 'Expert', tag: 'Data Science' }
    ]
  },
  {
    category: 'Programming Languages',
    description: 'Core languages utilized across production backends, research notebooks, and reactive frontends.',
    skills: [
      { name: 'Python', level: 'Expert', tag: 'Primary AI & Backend' },
      { name: 'TypeScript', level: 'Expert', tag: 'Type-Safe Frontend/Backend' },
      { name: 'JavaScript (ESNext)', level: 'Expert', tag: 'Web Technologies' },
      { name: 'Java', level: 'Advanced', tag: 'Enterprise & Automation' },
      { name: 'SQL', level: 'Expert', tag: 'Relational Queries' }
    ]
  },
  {
    category: 'Backend & API Engineering',
    description: 'High-throughput asynchronous servers, microservices, and secure authentication layers.',
    skills: [
      { name: 'FastAPI', level: 'Expert', tag: 'Async REST APIs' },
      { name: 'Node.js', level: 'Advanced', tag: 'Event-driven Services' },
      { name: 'Django / DRF', level: 'Advanced', tag: 'Enterprise Web Apps' },
      { name: 'Flask', level: 'Advanced', tag: 'Microservices' },
      { name: 'RESTful Architecture', level: 'Expert', tag: 'API Design' },
      { name: 'JWT & OAuth2', level: 'Advanced', tag: 'Security & Auth' }
    ]
  },
  {
    category: 'Frontend & Creative Technologies',
    description: 'Modern, reactive user interfaces built with editorial typography and responsive layouts.',
    skills: [
      { name: 'React 19', level: 'Expert', tag: 'Component Architecture' },
      { name: 'Next.js', level: 'Advanced', tag: 'SSR & Jamstack' },
      { name: 'Tailwind CSS', level: 'Expert', tag: 'Design Systems' },
      { name: 'HTML5 & Modern CSS', level: 'Expert', tag: 'Semantics & Layout' },
      { name: 'Canvas & WebGL', level: 'Proficient', tag: 'Creative Visuals' },
      { name: 'Vite', level: 'Expert', tag: 'Build Tooling' }
    ]
  },
  {
    category: 'Databases & Vector Stores',
    description: 'Relational databases, high-performance caching, and dense vector embeddings.',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced', tag: 'ACID Relational' },
      { name: 'MySQL', level: 'Advanced', tag: 'Relational Storage' },
      { name: 'ChromaDB', level: 'Expert', tag: 'Vector Store' },
      { name: 'FAISS', level: 'Expert', tag: 'Similarity Search' },
      { name: 'Redis', level: 'Advanced', tag: 'In-Memory Cache' }
    ]
  },
  {
    category: 'Cloud, DevOps & QA Automation',
    description: 'Containerization, automated testing suites, version control, and CI/CD pipelines.',
    skills: [
      { name: 'Docker', level: 'Advanced', tag: 'Containerization' },
      { name: 'Playwright', level: 'Expert', tag: 'Browser Automation' },
      { name: 'Selenium (Java)', level: 'Advanced', tag: 'Enterprise QA' },
      { name: 'Git & GitHub', level: 'Expert', tag: 'Version Control' },
      { name: 'Linux / Bash', level: 'Advanced', tag: 'Systems & CLI' },
      { name: 'AWS (S3, EC2)', level: 'Proficient', tag: 'Cloud Deployment' }
    ]
  }
];
