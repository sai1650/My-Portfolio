import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'autonomous-qa-agent',
    title: 'Autonomous QA Intelligence Platform',
    category: 'AI & Agents',
    shortDescription: 'Agentic quality engineering platform designed to support project management, execution workflows, browser inspection, and intelligent testing processes.',
    problem: 'Modern continuous delivery pipelines suffer from fragile E2E test suites that break on trivial UI changes, requiring extensive manual engineering hours for maintenance.',
    solution: 'Designed an autonomous QA agent architecture using local LLMs (Qwen via Ollama) paired with FastAPI and Playwright. The agent inspects the DOM, reasons about user flows, and auto-generates resilient, self-healing regression tests.',
    techStack: ['Python', 'FastAPI', 'Ollama', 'Qwen-2.5', 'Playwright', 'MySQL', 'Docker', 'Redis'],
    keyFeatures: [
      'Autonomous DOM exploration with visual grounding and screenshot differential analysis',
      'Context-aware selector generation resilient to dynamic CSS and React component refactors',
      'Self-healing test script synthesizer powered by local LLM inference for data privacy',
      'Comprehensive REST API orchestrator built with FastAPI and asynchronous job workers',
      'Interactive executive dashboard with flaky-test diagnostics and execution playback'
    ],
    githubUrl: 'https://github.com/sai1650',
    liveUrl: '#',
    featured: true,
    status: 'Production',
    metricsOrHighlight: 'Verified local Ollama Qwen & Playwright integration'
  },
  {
    id: 'multimodal-emotion-detection',
    title: 'Multimodal Emotion Detection Architecture',
    category: 'Deep Learning & Vision',
    shortDescription: 'Multimodal deep learning research project combining text, visual, and audio representations for human affective state classification.',
    problem: 'Single-modality emotion classifiers fail in ambiguous real-world scenarios where facial micro-expressions conflict with vocal cadence or linguistic tone.',
    solution: 'Engineered an end-to-end multimodal deep learning pipeline fusing text tokens (BERT), visual features (Vision Transformer / CNN), and acoustic spectrograms (Wav2Vec2 / Librosa) using multi-head cross-attention.',
    techStack: ['PyTorch', 'BERT', 'Vision Transformer (ViT)', 'Wav2Vec 2.0', 'Hugging Face', 'Librosa', 'OpenCV'],
    keyFeatures: [
      'Cross-attention fusion layer synchronizing heterogeneous visual, audio, and textual feature spaces',
      'Fine-tuned transformer heads optimized for subtle affective nuances beyond basic categorical emotions',
      'Inference pipeline supporting webcam video stream and synchronized audio input',
      'Ablation benchmarking against unimodal baselines demonstrating cross-attention benefits'
    ],
    githubUrl: 'https://github.com/sai1650/Multi-Modal-Emotion-detection-',
    liveUrl: '#',
    featured: true,
    status: 'Research Prototype',
    metricsOrHighlight: 'Multi-modal cross-attention fusion (BERT + ViT + Wav2Vec2)'
  },
  {
    id: 'human-depression-prediction',
    title: 'Human Depression Prediction Analytics',
    category: 'Deep Learning & Vision',
    shortDescription: 'Predictive machine learning research project exploring depression risk classification using structured psychometric datasets.',
    problem: 'Traditional mental health screening is reactive, often catching severe depressive episodes only after symptomatic escalation due to delayed clinical evaluation.',
    solution: 'Developed an automated diagnostic screening pipeline implementing advanced feature engineering, recursive feature elimination, Support Vector Machines (SVM), and calibrated Logistic Regression.',
    techStack: ['Python', 'Scikit-Learn', 'SVM', 'Logistic Regression', 'Pandas', 'NumPy', 'Matplotlib', 'FastAPI'],
    keyFeatures: [
      'Rigorous data preprocessing pipeline with SMOTE class balancing and outlier quantile filtering',
      'Comparative evaluation across Ensemble Random Forests, Support Vector Machines, and Gradient Boosting',
      'SHAP (SHapley Additive exPlanations) interpretability layer for feature importance analysis',
      'Cross-validated classification metrics evaluated against clinical benchmark datasets'
    ],
    githubUrl: 'https://github.com/sai1650/Human-Depression-Prediction-using-Machine-Learning',
    liveUrl: '#',
    featured: true,
    status: 'Open Source',
    metricsOrHighlight: 'Empirical ML pipeline with SVM & Logistic Regression'
  },
  {
    id: 'telugu-neural-translation',
    title: 'Telugu Neural Machine Translation Engine',
    category: 'NLP & Transformers',
    shortDescription: 'Research-oriented English-to-Telugu neural machine translation system focused on contextual language representation and translation evaluation.',
    problem: 'Generic commercial translators frequently produce grammatically unnatural translations for morphologically rich Dravidian languages like Telugu.',
    solution: 'Trained a context-aware sequence-to-sequence Transformer with customized subword BPE tokenization, back-translation augmentation, and cultural idiom grounding.',
    techStack: ['PyTorch', 'Hugging Face Transformers', 'SentencePiece', 'FastAPI', 'Seq2Seq', 'BLEU Evaluation'],
    keyFeatures: [
      'Custom Telugu subword vocabulary handling complex agglutinative morphology',
      'Back-translation synthetic data pipeline expanding low-resource parallel corpora',
      'Attention heatmap visualizer verifying grammatical subject-object-verb alignment',
      'Lightweight quantized ONNX runtime for sub-120ms latency on edge hardware'
    ],
    githubUrl: 'https://github.com/sai1650',
    liveUrl: '#',
    featured: true,
    status: 'Production',
    metricsOrHighlight: 'Context-aware low-resource Seq2Seq Transformer'
  },
  {
    id: 'rythu-mitra-agritech',
    title: 'RythuMitra — Agritech Intelligence Platform',
    category: 'Full-Stack & Systems',
    shortDescription: 'Digital agricultural platform designed to provide farmers with useful crop disease diagnosis, localized market rates, and real-time advisory services.',
    problem: 'Smallholder farmers in rural regions lack rapid diagnostic tools for crop pathologies, leading to preventable harvest losses and reliance on generic pesticides.',
    solution: 'Engineered an accessible multilingual web platform combining a mobile-first frontend with computer vision models for leaf disease screening from smartphone photos.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'TensorFlow.js', 'PostgreSQL', 'Tailwind CSS', 'PWA'],
    keyFeatures: [
      'Offline-capable Progressive Web App designed for low-bandwidth rural connectivity',
      'On-device image classification model identifying common crop diseases with zero network lag',
      'Localized vernacular advisory and price discovery across regional mandi markets',
      'Role-based administrative portal for certified agronomists to review edge diagnoses'
    ],
    githubUrl: 'https://github.com/sai1650',
    liveUrl: '#',
    featured: false,
    status: 'Production',
    metricsOrHighlight: 'Agritech advisory platform for crop disease screening'
  },
  {
    id: 'student-information-desk',
    title: 'Academic Intelligence & Student Help Desk',
    category: 'Full-Stack & Systems',
    shortDescription: 'Student information application designed to provide structured access to academic information through role-based workflows and intent-driven responses.',
    problem: 'University departments operate in administrative silos, leaving student inquiries unanswered or delayed during peak enrollment and examination cycles.',
    solution: 'Architected a scalable full-stack portal combining Django REST Framework, React, and an NLP retrieval assistant to triage, answer, and route student queries in real time.',
    techStack: ['React', 'Django REST Framework', 'Python', 'PostgreSQL', 'Tailwind CSS', 'JWT Auth'],
    keyFeatures: [
      'Granular Role-Based Access Control (RBAC) across Students, Faculty, HODs, and Deans',
      'Automated knowledge search answering FAQs with instant ticket escalation for edge cases',
      'Real-time audit log tracking grievance resolution times with SLA breach alerting',
      'Modular RESTful architecture supporting institutional single sign-on (SSO)'
    ],
    githubUrl: 'https://github.com/sai1650',
    liveUrl: '#',
    featured: false,
    status: 'Production',
    metricsOrHighlight: 'Role-based student operations with Django & React'
  },
  {
    id: 'diabetic-retinopathy-vit',
    title: 'Diabetic Retinopathy Classification with ViT',
    category: 'Deep Learning & Vision',
    shortDescription: 'Clinical computer vision pipeline utilizing Vision Transformers (ViT) on retinal fundus imagery for early ophthalmological diagnosis.',
    problem: 'Early diabetic retinopathy is asymptomatic yet irreversible; manual fundus photo grading requires scarce ophthalmological specialists.',
    solution: 'Designed and evaluated a Vision Transformer architecture with multi-head self-attention on colorized retinal photographs, capturing subtle microaneurysms and exudates.',
    techStack: ['PyTorch', 'Vision Transformer (ViT)', 'OpenCV', 'Scikit-Learn', 'Google Scholar Published'],
    keyFeatures: [
      'Patch-based self-attention capturing global retinal vascular relationships',
      'Color space enhancement (CLAHE) accentuating micro-vascular anomalies',
      'Peer-reviewed comparative study published and cited on Google Scholar'
    ],
    githubUrl: 'https://github.com/sai1650/Diabetic-Retinopathy--colorized-image-detection',
    liveUrl: '#',
    featured: false,
    status: 'Research Prototype',
    metricsOrHighlight: 'Peer-reviewed comparative research on Google Scholar'
  },
  {
    id: 'smart-medical-store',
    title: 'Smart Medical Store Full-Stack Ecosystem',
    category: 'Full-Stack & Systems',
    shortDescription: 'Pharmaceutical inventory, prescription verification, and supply chain tracking web application.',
    problem: 'Independent pharmacies struggle with stock expiration tracking, manual prescription transcription, and batch compliance audits.',
    solution: 'Built a full-stack inventory and point-of-sale system featuring batch expiry alerts, automated restocking recommendations, and prescription storage.',
    techStack: ['JavaScript', 'Node.js', 'Express', 'MySQL', 'Bootstrap', 'REST APIs'],
    keyFeatures: [
      'Real-time batch-level inventory tracking with proactive expiry notification triggers',
      'Point-of-sale billing module with automated tax calculation and invoice PDF generation',
      'Encrypted prescription document repository adhering to healthcare privacy practices'
    ],
    githubUrl: 'https://github.com/sai1650/Smart-medical-storeweb-application-Full-Stack',
    liveUrl: '#',
    featured: false,
    status: 'Open Source',
    metricsOrHighlight: 'Full-stack pharmaceutical management system'
  }
];
