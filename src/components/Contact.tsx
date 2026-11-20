import React, { useState, useEffect, useRef } from 'react';
import { Mail, Copy, Check, Send, ExternalLink, GraduationCap, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { GithubIcon, LinkedinIcon } from './Icons';
import { BRAND_CONFIG } from '../data/config';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { EASINGS, prefersReducedMotion } from '../utils/animations';

interface ContactProps {
  preselectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [selectedBudget, setSelectedBudget] = useState('$3,000 – $8,000');
  const [selectedTimeline, setSelectedTimeline] = useState('1 – 2 Months');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    preselectedService || 'AI Product Development'
  );
  const [prevPreselectedService, setPrevPreselectedService] = useState(preselectedService);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    country: 'United States',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP ScrollTrigger Animations for Contact Section
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        '.contact-header',
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

      // 2. Left column info cards stagger
      gsap.fromTo(
        '.contact-info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.contact-info-column',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Right column form entrance
      gsap.fromTo(
        '.contact-form-card',
        { opacity: 0, x: 30, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: EASINGS.luxury,
          scrollTrigger: {
            trigger: '.contact-form-card',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (preselectedService !== prevPreselectedService) {
    setPrevPreselectedService(preselectedService);
    if (preselectedService) {
      setSelectedCategory(preselectedService);
    }
  }

  const projectCategories = [
    'AI Product Development',
    'Startup MVP',
    'RAG & Knowledge Systems',
    'Full-Stack Web Application',
    'Generative AI Integration',
    'AI Automation & QA Testing',
    'Research & Technical Collaboration',
  ];

  const budgetOptionsUSD = [
    '<$3,000',
    '$3,000 – $8,000',
    '$8,000 – $20,000',
    '$20,000+',
    'Advisory Retainer',
  ];

  const budgetOptionsINR = [
    '<₹1.5 Lakhs',
    '₹1.5L – ₹4 Lakhs',
    '₹4L – ₹10 Lakhs',
    '₹10 Lakhs+',
    'Advisory Retainer',
  ];

  const timelineOptions = [
    '< 1 Month (Rapid Sprint)',
    '1 – 2 Months (MVP Launch)',
    '2 – 3 Months (Full System)',
    'Ongoing Retainer',
  ];

  const copyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(BRAND_CONFIG.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formState.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    sound.playSuccess();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5722', '#7C3AED', '#2563EB'],
      });
    }, 700);
  };

  const mailtoSubject = encodeURIComponent(
    `[Project Inquiry] ${selectedCategory} — ${formState.name || 'New Client'}`
  );
  const mailtoBody = encodeURIComponent(
    `Hi Sai,\n\nI am contacting you regarding a project inquiry.\n\nProject Scope: ${selectedCategory}\nBudget: ${selectedBudget} (${currency})\nTimeline: ${selectedTimeline}\nCompany: ${formState.company || 'N/A'}\nCountry: ${formState.country}\n\nProject Details:\n${formState.message || '[Enter project overview here]'}\n\nBest regards,\n${formState.name}\n${formState.email}`
  );
  const mailtoUrl = `mailto:${BRAND_CONFIG.links.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-12 relative z-10 select-none bg-[#FAFAFA]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="contact-header mb-14 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 font-mono text-xs text-[#FF5722] uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-pulse" />
            <span>• LET'S TALK</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[0.98]">
            Have a Problem{' '}
            <span className="italic font-serif font-normal text-[#FF5722]">
              Worth Building?
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal mt-4 max-w-xl leading-relaxed">
            {BRAND_CONFIG.contactSubtext}
          </p>
        </div>

        {/* Transmission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Telemetry */}
          <div className="contact-info-column lg:col-span-5 space-y-6">
            {/* Quick Email Plaque */}
            <div className="contact-info-card bg-white border border-slate-200 rounded-[28px] p-6 space-y-4 shadow-xl">
              <div className="font-mono text-[10px] text-[#FF5722] uppercase tracking-wider font-bold">
                DIRECT ELECTRONIC MAIL
              </div>
              <div className="font-mono text-base text-slate-900 font-semibold break-all">
                {BRAND_CONFIG.links.email}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={copyEmail}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-xs font-mono text-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Email Copied' : 'Copy Address'}</span>
                </button>

                <a
                  href={`mailto:${BRAND_CONFIG.links.email}`}
                  className="px-4 py-2 bg-[#FF5722] hover:bg-[#ff6838] text-white font-mono font-bold text-xs rounded-full transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Client</span>
                </a>
              </div>
            </div>

            {/* Verified Public Channels */}
            <div className="contact-info-card bg-white border border-slate-200 rounded-[28px] p-6 space-y-3 font-mono text-xs shadow-xl">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-bold">
                VERIFIED PROFESSIONAL PROFILES
              </div>

              <a
                href={BRAND_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-[16px] text-slate-800 hover:border-[#FF5722] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#FF5722]" />
                  <span className="font-sans font-medium">LinkedIn Professional Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={BRAND_CONFIG.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-[16px] text-slate-800 hover:border-[#FF5722] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-slate-900" />
                  <span className="font-sans font-medium">GitHub Code Repositories</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={BRAND_CONFIG.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-[16px] text-slate-800 hover:border-[#FF5722] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#FF5722]" />
                  <span className="font-sans font-medium">Google Scholar Publications</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* Telemetry Status Plaque */}
            <div className="contact-info-card p-4 bg-white border border-slate-200 rounded-[22px] font-mono text-xs space-y-2 text-slate-600 shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
                  {BRAND_CONFIG.links.location}
                </span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Response SLA: Within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Matrix Form */}
          <div className="contact-form-card lg:col-span-7 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 relative shadow-xl">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-2xl text-slate-900">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
                  Thank you for outlining your project. I review inquiries personally and will respond within 24 hours.
                </p>
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] text-white font-mono font-bold text-xs uppercase rounded-full shadow-md"
                >
                  <span>Open Confirmation in Mail App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Project Scope Selector */}
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                    01 // PROJECT ARCHITECTURE &amp; SCOPE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectCategories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => {
                          sound.playClick();
                          setSelectedCategory(cat);
                        }}
                        className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-[#FF5722] text-white font-bold shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Budget Matrix (USD / INR) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      02 // ESTIMATED INVESTMENT BUDGET
                    </label>
                    <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-full border border-slate-200 font-mono text-[10px]">
                      <button
                        type="button"
                        onClick={() => setCurrency('USD')}
                        className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${currency === 'USD' ? 'bg-[#FF5722] text-white font-bold' : 'text-slate-600'}`}
                      >
                        USD ($)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency('INR')}
                        className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${currency === 'INR' ? 'bg-[#FF5722] text-white font-bold' : 'text-slate-600'}`}
                      >
                        INR (₹)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(currency === 'USD' ? budgetOptionsUSD : budgetOptionsINR).map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          sound.playClick();
                          setSelectedBudget(b);
                        }}
                        className={`p-2.5 text-xs font-mono text-center rounded-[14px] border transition-all cursor-pointer ${
                          selectedBudget === b
                            ? 'bg-orange-50 border-[#FF5722] text-slate-900 font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Desired Timeline */}
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                    03 // TARGET TIMELINE
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timelineOptions.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          sound.playClick();
                          setSelectedTimeline(t);
                        }}
                        className={`p-2.5 text-xs font-mono text-center rounded-[14px] border transition-all cursor-pointer ${
                          selectedTimeline === t
                            ? 'bg-orange-50 border-[#FF5722] text-slate-900 font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Client Identity Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-slate-600 uppercase block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[14px] text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-slate-600 uppercase block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (emailError) setEmailError('');
                      }}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[14px] text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5722]"
                    />
                    {emailError && (
                      <span className="text-[10px] text-red-500 font-mono mt-1 block">{emailError}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-slate-600 uppercase block mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder="e.g. Stealth AI Labs"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[14px] text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-slate-600 uppercase block mb-1">
                      Country / Region
                    </label>
                    <input
                      type="text"
                      value={formState.country}
                      onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                      placeholder="e.g. United States / India"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-[14px] text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5722]"
                    />
                  </div>
                </div>

                {/* Step 5: Project Summary */}
                <div>
                  <label className="font-mono text-xs text-slate-600 uppercase block mb-1">
                    Project Problem &amp; Scope Overview
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe what you are building, key constraints, and desired delivery timeframe..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-[16px] text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5722]"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="font-mono text-[11px] text-slate-400">
                    Encrypted submission &bull; No marketing spam.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5722] hover:bg-[#ff6838] disabled:bg-[#FF5722]/50 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(255,87,34,0.35)] cursor-pointer"
                  >
                    <span>{isSubmitting ? 'TRANSMITTING...' : 'DISPATCH INQUIRY'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
