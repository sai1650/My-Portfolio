import type { Publication } from '../types';

export const publicationsData: Publication[] = [
  {
    id: 'diabetic-retinopathy-vit',
    title: 'Deep Learning-Based Diabetic Retinopathy Classification Using Vision Transformers (VIT): A Comparative Study',
    authors: 'Sai Gaddam, et al.',
    venue: 'Google Scholar Indexed Research',
    year: 2024,
    type: 'Comparative Study',
    citations: 1,
    scholarUrl: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kCdBwzEAAAAJ&citation_for_view=kCdBwzEAAAAJ:W7OEmFMy1HYC',
    abstract: 'This paper presents an extensive empirical comparative study evaluating Vision Transformer (ViT) architectures against classical convolutional baselines for classifying diabetic retinopathy stages from fundus photography. The multi-head self-attention mechanism enables global semantic comprehension of retinal microvascular lesions, achieving enhanced sensitivity in early-stage microaneurysm detection.',
    keywords: ['Vision Transformers', 'Diabetic Retinopathy', 'Medical Imaging', 'Self-Attention', 'Deep Learning'],
    doiPlaceholder: '10.xxxx/scholar.2024.vit-dr'
  },
  {
    id: 'depression-prediction-ml',
    title: 'Depression Prediction Using Machine Learning: A Comparative Study',
    authors: 'Sai Gaddam, et al.',
    venue: 'Google Scholar Indexed Research',
    year: 2024,
    type: 'Comparative Study',
    citations: 1,
    scholarUrl: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kCdBwzEAAAAJ&citation_for_view=kCdBwzEAAAAJ:Y0pCki6q_DkC',
    abstract: 'Investigates the predictive efficacy of supervised machine learning algorithms including Support Vector Machines (SVM), Logistic Regression, and Ensemble methods for early mental health distress screening. Through rigorous feature selection and class-imbalance mitigation (SMOTE), the proposed methodology provides high diagnostic fidelity and clinically interpretable feature importance rankings.',
    keywords: ['Machine Learning', 'Depression Prediction', 'SVM', 'Healthcare Analytics', 'Supervised Learning'],
    doiPlaceholder: '10.xxxx/scholar.2024.dp-ml'
  },
  {
    id: 'blood-group-classification',
    title: 'A Hybrid CNN–Multi-Head Attention–LSTM Framework for Non-Invasive Blood Group Classification from Fingerprint Images',
    authors: 'Sai Gaddam, et al.',
    venue: 'Biomedical Signal Processing & AI',
    year: 2024,
    type: 'Conference',
    citations: 0,
    scholarUrl: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kCdBwzEAAAAJ&citation_for_view=kCdBwzEAAAAJ:eQOLeE2rZwMC',
    abstract: 'Proposes an innovative non-invasive deep learning architecture coupling Convolutional Neural Networks with Multi-Head Self-Attention and Long Short-Term Memory (LSTM) layers to classify ABO/Rh blood groups from biometric dermatoglyphic fingerprint ridge patterns without biological fluid sampling.',
    keywords: ['Hybrid CNN-LSTM', 'Multi-Head Attention', 'Biometrics', 'Fingerprint Analysis', 'Non-Invasive Diagnostics'],
    doiPlaceholder: '10.xxxx/scholar.2024.blood-group'
  },
  {
    id: 'spectra-scan-vit-malaria',
    title: 'Spectra Scan ViT: Malaria Parasite Detection from Colorized Blood Smear Images Using Vision Transformers with Multi-Head Self-Attention',
    authors: 'Sai Gaddam, et al.',
    venue: 'International AI & Biomedical Engineering Forum',
    year: 2024,
    type: 'Conference',
    citations: 0,
    scholarUrl: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kCdBwzEAAAAJ&citation_for_view=kCdBwzEAAAAJ:YsMSGLbcyi4C',
    abstract: 'Introduces Spectra Scan ViT, a specialized vision transformer tailored for detecting Plasmodium parasites from Giemsa-stained thin blood smear microscopic images. By decomposing microscopic fields into fine-grained visual tokens with attention routing, the model mitigates visual noise caused by staining inconsistencies.',
    keywords: ['Vision Transformers', 'Malaria Detection', 'Parasitology', 'Self-Attention', 'Microscopy'],
    doiPlaceholder: '10.xxxx/scholar.2024.spectra-vit'
  },
  {
    id: 'skin-disease-patterns',
    title: 'Revealing Patterns of Skin Diseases: A Comparative Study',
    authors: 'Sai Gaddam, et al.',
    venue: 'Comparative Dermatological Computing',
    year: 2024,
    type: 'Journal',
    citations: 0,
    scholarUrl: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kCdBwzEAAAAJ&citation_for_view=kCdBwzEAAAAJ:Tyk-4Ss8FVUC',
    abstract: 'A systematic empirical comparison of transfer learning backbones for automated dermatological lesion classification across dermoscopic benchmarks. Explores generalization capabilities across skin tone variations and class-imbalanced multi-label cutaneous diagnostic criteria.',
    keywords: ['Dermatology AI', 'Skin Lesion Classification', 'Transfer Learning', 'Comparative Analysis'],
    doiPlaceholder: '10.xxxx/scholar.2024.skin-patterns'
  },
  {
    id: 'children-emotion-detection',
    title: 'Children Emotion Detection Deep Learning: A Comparative Study',
    authors: 'Sai Gaddam, et al.',
    venue: 'Cognitive Computing & Affective Systems',
    year: 2024,
    type: 'Comparative Study',
    citations: 0,
    scholarUrl: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=kCdBwzEAAAAJ&citation_for_view=kCdBwzEAAAAJ:zYLM7Y9cAGgC',
    abstract: 'Examines specialized deep learning architectures for recognizing facial affect in pediatric populations. Addresses the unique challenge of pediatric facial micro-gestures differing substantially from adult benchmarks, demonstrating improved performance through targeted spatial attention.',
    keywords: ['Pediatric Affect', 'Emotion Detection', 'Deep Learning', 'Facial Expression Analysis'],
    doiPlaceholder: '10.xxxx/scholar.2024.child-emotion'
  }
];

export const researchStats = {
  totalScholarWorks: 6,
  primaryDomains: ['Vision Transformers', 'Affective Computing', 'Predictive Healthcare AI', 'Multimodal NLP'],
  scholarProfileUrl: 'https://scholar.google.com/citations?user=kCdBwzEAAAAJ&hl=en',
  affiliation: 'AI & Data Science Researcher, SR University'
};
