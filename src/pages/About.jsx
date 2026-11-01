import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useContentStore from '../stores/contentStore';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

const fallbackPortfolioItems = [
  {
    id: 'noir-marble',
    tag: 'Featured Residence',
    category: 'Private Residence',
    subtitle: '2970 sq.ft',
    title: 'The Horizon Penthouse Living Salon',
    desc: 'An exquisitely executed private residence blending the dark grandeur of polished noir marble with hand-finished satin brass detailing — a masterwork of residential precision.',
    image: '/portfolio_noir_marble.png',
    featured: true,
  },
  {
    id: 'culinary',
    tag: 'Bespoke Kitchen',
    category: 'Culinary Architecture',
    subtitle: '1,240 sq.ft',
    title: 'Highland Kitchen & Wine Vault',
    desc: 'A statement culinary environment shaped in modern precision, delivering warmth through smoked oak panels, polished concrete, and bespoke cabinetry hardware.',
    image: '/portfolio_culinary.png',
    featured: false,
  },
  {
    id: 'spa-suite',
    tag: 'Wellness Pavilion',
    category: 'Stonework & Wellness',
    subtitle: 'Private Estate',
    title: 'Marble Sanctuary Spa Suite',
    desc: 'Private estate spa featuring bookmatched statuario marble and custom ambient lighting for a complete wellness sanctuary.',
    image: '/portfolio_facade.png', // Reusing placeholder
    featured: false,
  },
  {
    id: 'estate',
    tag: 'Architectural Facade',
    category: 'Private Residence',
    subtitle: '14,000 sq.ft',
    title: 'Yorkville Monolith Estate',
    desc: 'Commanding exterior architecture with precision-engineered facade panels and private landscaping designed for absolute prestige and security.',
    image: '/portfolio_facade.png',
    featured: false,
  },
  {
    id: 'salon',
    tag: 'Grand Salon',
    category: 'Culinary Architecture',
    subtitle: 'Private Commission',
    title: 'The Grand Parlor Salon',
    desc: 'An expansive living room designed for entertaining with custom millwork, coffered ceilings, and a grand bespoke fireplace.',
    image: '/hero_interior.png', // Reusing placeholder
    featured: false,
  },
];

const defaultAboutContent = {
  founderName: 'Pristine Building Maintenance Inc.',
  founderTitle: 'Commercial Cleaning & Facility Care',
  biography: 'Pristine provides reliable commercial cleaning and facility care, tailored to each space and schedule.',
  statOne: '24/7 Rapid Response',
  statTwo: '100% Client Focus',
  statThree: 'A+ Service',
  credentials: ['Fully Licensed & Insured', 'Professional Cleaning Team'],
  tags: ['Commercial Cleaning', 'Facility Care', 'Sanitization'],
  milestones: [],
  workshopHeading: 'Our Approach to Facility Care',
  workshopNarrative: 'We create dependable cleaning plans around each facility, its people, and its schedule.',
  commitmentEyebrow: 'Our Commitment',
  commitmentHeading: 'A Fresh Start, Focused on Your Facility',
  commitmentNarrative: 'As a new company, we are focused on earning your trust through attentive service, cleaning plans shaped around your needs, and clear communication from the start.',
  commitments: [
    {
      title: 'Cleaning That Fits Your Needs',
      description: 'Choose from office cleaning, janitorial services, deep sanitization, post-construction cleaning, and floor care.',
    },
    {
      title: 'A Plan for Your Schedule',
      description: 'We work with you to find a cleaning frequency and start date that suit your facility and daily operations.',
    },
    {
      title: 'Responsive Support',
      description: 'Our team aims to respond to inquiries within 24 business hours. 24/7 emergency response is available for contracted clients.',
    },
  ],
  commitmentFooter: 'Looking for a cleaning plan that works for your facility?',
  commitmentCta: 'Discuss Your Cleaning Needs',
  gallery: [],
};

export default function About() {
  const savedContent = useContentStore((state) => state.contentByPage['about-us']);
  const content = { ...defaultAboutContent, ...savedContent };
  const contentError = useContentStore((state) => state.error);
  const fetchContent = useContentStore((state) => state.fetchContent);
  const [heroRef, heroVisible] = useReveal();
  const [commitmentRef, commitmentVisible] = useReveal();
  const [portfolioRef, portfolioVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();
  const [activeTab, setActiveTab] = useState('All Projects');

  useEffect(() => {
    fetchContent('about-us');
  }, [fetchContent]);

  const stats = [
    content.statOne || '24/7 Rapid Response',
    content.statTwo || '100% Client Focus',
    content.statThree || 'A+ Service',
  ]
    .filter(Boolean)
    .map((stat) => {
      const [value, ...labelParts] = String(stat).trim().split(/\s+/);
      return { value, label: labelParts.join(' ') || 'Company achievement' };
    });

  const cmsPortfolio = Array.isArray(content.gallery)
    ? content.gallery.filter((project) => project?.src || project?.title)
    : [];
  const portfolioItems = cmsPortfolio.length
    ? cmsPortfolio.map((project, index) => ({
      id: `cms-project-${index}`,
      tag: project.category || 'Featured Project',
      category: project.category || '',
      subtitle: index === 0 ? 'Featured Project' : 'Pristine',
      title: project.title || `Project ${index + 1}`,
      desc: '',
      image: project.src || fallbackPortfolioItems[index % fallbackPortfolioItems.length].image,
      featured: index === 0,
    }))
    : fallbackPortfolioItems;
  const filteredPortfolioItems = activeTab === 'All Projects'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeTab);
  const displayPortfolioItems = filteredPortfolioItems.map((item, index) => ({
    ...item,
    featured: activeTab === 'All Projects' ? item.featured : index === 0,
  }));

  return (
    <div className="flex flex-col w-full overflow-x-hidden pt-0">
      {contentError && <p className="mx-auto mt-4 max-w-7xl px-6 text-xs text-amber-500">{contentError}</p>}
      {/* Hero Section */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className="w-full lg:w-1/2 space-y-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-bold">
                  {content.founderTitle || 'The Pristine Legacy'}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-on-surface leading-[1.15]">
                {content.founderName || 'Pioneering the Pinnacle of Bespoke Built Environments'}
              </h1>
            </div>

            <blockquote className="font-display text-xl lg:text-2xl text-on-surface-variant italic leading-relaxed border-l-2 border-primary/40 pl-6 py-2">
              {content.biography || 'We do not merely maintain buildings; Pristine creates healthier, pristine environments with attentive service and lasting care.'}
            </blockquote>

            <div className="space-y-6 text-sm text-on-surface-variant leading-loose max-w-xl">
              {content.credentials?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {content.credentials.map((credential) => (
                    <span key={credential} className="rounded-full border border-primary/30 px-3 py-1 text-[10px] uppercase tracking-wider text-primary">{credential}</span>
                  ))}
                </div>
              )}
            </div>

            {stats.length > 0 && <div className="flex flex-wrap gap-6 sm:gap-10 pt-8 border-t border-surface-container-highest/60">
              {stats.map((i, index) => (
                <div key={`${i.value}-${index}`}>
                  <p className="font-display text-4xl text-primary mb-2">{i.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">{i.label}</p>
                </div>
              ))}
            </div>}
          </div>

          {/* Right: Clean Image */}
          <div
            className="w-full lg:w-1/2 relative"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url("${content.founderPortrait || '/hero_interior.png'}")` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Subtle decorative accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {(content.workshopImage || content.workshopHeading || content.workshopNarrative || content.tags?.length || content.milestones?.length) && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {content.workshopImage && (
              <img src={content.workshopImage} alt={content.workshopHeading || 'Pristine team at work'} className="w-full aspect-[4/3] rounded-2xl object-cover" />
            )}
            <div className="space-y-6">
              <div>
                <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold">Our Approach</p>
                <h2 className="mt-3 font-display text-3xl lg:text-4xl text-on-surface">{content.workshopHeading || 'Care in Every Detail'}</h2>
                {content.workshopNarrative && <p className="mt-4 text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">{content.workshopNarrative}</p>}
              </div>
              {content.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag) => <span key={tag} className="rounded-full bg-surface-container px-3 py-1.5 text-xs text-on-surface-variant">{tag}</span>)}
                </div>
              )}
            </div>
          </div>
          {content.milestones?.length > 0 && (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {content.milestones.map((milestone, index) => (
                <article key={`${milestone.year}-${milestone.title}-${index}`} className="border-l-2 border-primary/50 pl-4">
                  <p className="text-xs font-bold tracking-widest text-primary">{milestone.year}</p>
                  <h3 className="mt-2 font-display text-xl text-on-surface">{milestone.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">{milestone.details}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <section ref={commitmentRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
        <div
          className="max-w-3xl mb-12"
          style={{
            opacity: commitmentVisible ? 1 : 0,
            transform: commitmentVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold">
              {content.commitmentEyebrow}
            </p>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-on-surface">
            {content.commitmentHeading}
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed mt-5">
            {content.commitmentNarrative}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(Array.isArray(content.commitments) ? content.commitments : []).map((commitment, index) => (
            <article
              key={`${commitment.title}-${index}`}
              className="group p-5 sm:p-8 rounded-2xl bg-surface-container/60 border border-surface-container-highest hover:border-primary/40 hover:bg-surface-container transition-all duration-300"
              style={{
                opacity: commitmentVisible ? 1 : 0,
                transform: commitmentVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
              }}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-xs text-primary tracking-[0.15em] font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">0{index + 1}</span>
              <h3 className="font-display text-2xl text-on-surface mt-5 mb-3">{commitment.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{commitment.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-surface-container-highest flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <p className="text-sm text-on-surface-variant">{content.commitmentFooter}</p>
          <Link
            to="/inquiries-and-quote"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-lg bg-primary px-6 py-4 text-xs uppercase tracking-[0.15em] font-bold text-on-primary shadow-lg shadow-primary/10 hover:bg-secondary hover:-translate-y-0.5 hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all"
          >
            {content.commitmentCta}
            <span aria-hidden="true" className="text-base">→</span>
          </Link>
        </div>
      </section>

      <section ref={portfolioRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
          style={{
            opacity: portfolioVisible ? 1 : 0,
            transform: portfolioVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary" />
              <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold">
                Signature Masterworks
              </p>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-on-surface mb-4">
              Curated Architectural Portfolio
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              An elite collection of masterwork structures and bespoke luxury environments, each detail crafted with unyielding dedication to perfection.
            </p>
          </div>

          <div className="relative min-w-[240px] shrink-0">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full appearance-none bg-[#101419] border border-surface-container-highest/60 rounded-lg px-5 py-3.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer font-bold uppercase tracking-widest shadow-lg"
            >
              {['All Projects', 'Culinary Architecture', 'Stonework & Wellness', 'Private Residence'].map((tab) => (
                <option key={tab} value={tab}>{tab}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Item */}
          {displayPortfolioItems.filter((item) => item.featured).map((item) => (
            <div
              key={item.id}
              className="lg:col-span-3 group relative rounded-2xl overflow-hidden shadow-2xl min-h-[500px]"
              style={{
                opacity: portfolioVisible ? 1 : 0,
                transform: portfolioVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s`,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute top-6 left-6 bg-surface/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
                <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold">{item.tag}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="flex justify-between items-end gap-6">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{item.subtitle}</span>
                      <div className="w-12 h-px bg-primary/40" />
                      <span className="text-[10px] text-primary flex items-center gap-1"><svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.53 5.736 5.736 0 00.145.065l.008.004L9.69 18.933zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" /></svg> Private Residence</span>
                    </div>
                    <h3 className="font-display text-3xl lg:text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="hidden lg:flex shrink-0">
                    <Link to="/inquiries-and-quote" className="w-14 h-14 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Grid Items */}
          {displayPortfolioItems.filter((item) => !item.featured).map((item, i) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden shadow-xl min-h-[350px]"
              style={{
                opacity: portfolioVisible ? 1 : 0,
                transform: portfolioVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease ${(i + 2) * 150}ms, transform 0.8s ease ${(i + 2) * 150}ms`,
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">{item.tag}</span>
                <h3 className="font-display text-xl text-on-surface mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">{item.desc}</p>

                <div className="flex items-center justify-between border-t border-surface-container-highest/60 pt-4">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{item.subtitle}</span>
                  <Link to="/inquiries-and-quote" className="text-xs text-primary font-bold hover:text-white transition-colors">
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filteredPortfolioItems.length === 0 && (
            <p className="col-span-full py-12 text-center text-sm text-on-surface-variant">
              No projects found in this category.
            </p>
          )}
        </div>
      </section>

      <section ref={ctaRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
        <div
          className="relative flex flex-col md:flex-row items-center justify-between gap-12 p-12 lg:p-16 rounded-3xl bg-surface-container-high/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-primary/20"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Subtle Monogram Watermark Background */}
          <div className="absolute -right-10 -bottom-20 text-[20rem] font-display font-bold text-primary opacity-5 select-none pointer-events-none tracking-tighter leading-none">
            TP
          </div>

          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 text-center md:text-left max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-px bg-primary" />
              <p className="text-xs text-primary tracking-[0.3em] uppercase font-semibold">
                Experience Pristine
              </p>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl text-on-surface leading-tight">
              Ready to elevate your vision to <span className="text-primary italic">Pristine</span> reality?
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-lg">
              Join our exclusive portfolio of luxury builds. Schedule a private master assessment and let our artisans craft your bespoke architectural legacy today.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 shrink-0">
            <Link
              to="/inquiries-and-quote"
              id="cta-strip-quote-about"
              className="group relative px-10 py-5 rounded-full bg-primary text-on-primary font-bold uppercase tracking-[0.15em] text-sm hover:shadow-[0_0_40px_rgba(242,190,113,0.5)] hover:-translate-y-1 transition-all duration-500 overflow-hidden inline-flex items-center"
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
