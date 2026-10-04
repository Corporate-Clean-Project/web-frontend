import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function useReveal(options = {}) {
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
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

const milestones = [
  {
    year: '2010',
    title: 'FOUNDATION',
    subtitle: 'Bespoke Framing & Joinery',
    desc: 'Began as an exclusive operations millwork and custom cabinetry setup, delivering artisan-focused joinery to high-end residential clients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    year: '2015',
    title: 'EXPANSION',
    subtitle: 'Stone, Marble & Metals Division',
    desc: 'Expanded vertically to provide bespoke stone masonry, exotic marble sourcing, and specialty custom metals for complex, multi-sensory residential environments.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    year: '2018',
    title: 'PRACTICE',
    subtitle: 'Architectural Project Foundation',
    desc: 'Formalized construction operations towards full-scale Master Builder framework, assuming principal contractor duties for estates, manors, and luxury residences.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    year: '2024',
    title: 'NEXT GEN',
    subtitle: 'Next-Generation Design & Build',
    desc: 'Unifying in-house design capabilities with established construction mastery, setting a new paradigm for end-to-end luxury execution.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

const portfolioItems = [
  {
    id: 'noir-marble',
    tag: 'Featured Residence',
    subtitle: '2970 sq.ft',
    title: 'The Horizon Penthouse Living Salon',
    desc: 'An exquisitely executed private residence blending the dark grandeur of polished noir marble with hand-finished satin brass detailing — a masterwork of residential precision.',
    image: '/portfolio_noir_marble.png',
    featured: true,
  },
  {
    id: 'culinary',
    tag: 'Bespoke Kitchen',
    subtitle: '1,240 sq.ft',
    title: 'Highland Kitchen & Wine Vault',
    desc: 'A statement culinary environment shaped in modern precision, delivering warmth through smoked oak panels, polished concrete, and bespoke cabinetry hardware.',
    image: '/portfolio_culinary.png',
    featured: false,
  },
  {
    id: 'spa-suite',
    tag: 'Wellness Pavilion',
    subtitle: 'Private Estate',
    title: 'Marble Sanctuary Spa Suite',
    desc: 'Private estate spa featuring bookmatched statuario marble and custom ambient lighting for a complete wellness sanctuary.',
    image: '/portfolio_facade.png', // Reusing placeholder
    featured: false,
  },
  {
    id: 'estate',
    tag: 'Architectural Facade',
    subtitle: '14,000 sq.ft',
    title: 'Yorkville Monolith Estate',
    desc: 'Commanding exterior architecture with precision-engineered facade panels and private landscaping designed for absolute prestige and security.',
    image: '/portfolio_facade.png',
    featured: false,
  },
  {
    id: 'salon',
    tag: 'Grand Salon',
    subtitle: 'Private Commission',
    title: 'The Grand Parlor Salon',
    desc: 'An expansive living room designed for entertaining with custom millwork, coffered ceilings, and a grand bespoke fireplace.',
    image: '/hero_interior.png', // Reusing placeholder
    featured: false,
  },
];

export default function About() {
  const [heroRef, heroVisible] = useReveal();
  const [journeyRef, journeyVisible] = useReveal();
  const [portfolioRef, portfolioVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();
  const [activeTab, setActiveTab] = useState('All Projects');

  return (
    <div className="flex flex-col w-full overflow-x-hidden pt-0">
      {/* Hero Section */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
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
                  The Top Pristine Legacy
                </span>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl text-on-surface leading-[1.15]">
                Pioneering the Pinnacle of Bespoke Built Environments
              </h1>
            </div>

            <blockquote className="font-display text-xl lg:text-2xl text-on-surface-variant italic leading-relaxed border-l-2 border-primary/40 pl-6 py-2">
              "We do not merely construct structures or interiors; Top Pristine curates enduring architectural environments infused with a rare provenance of soaring, exotic venation, and aesthetic permanence."
            </blockquote>

            <div className="space-y-6 text-sm text-on-surface-variant leading-loose max-w-xl">
              <p>
                Founded on the timeless traditions of European guild craft and empowered by modern engineering ingenuity, Top Pristine Luxury Craft stands at the premier design-build center for pristine residential estates and landmark commercial commissions.
              </p>
              <p>
                From meticulous structural foundations to rare-stone fabrications, fine custom joinery, and highly integrated smart home setups within our proprietary fabrication studios, our driven ground-up methodologies eliminate the uncertainties of sub-contracting.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-surface-container-highest/60">
              <div>
                <p className="font-display text-4xl text-primary mb-2">15+</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Years Experience</p>
              </div>
              <div>
                <p className="font-display text-4xl text-primary mb-2">180+</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Completed Projects</p>
              </div>
              <div>
                <p className="font-display text-4xl text-primary mb-2">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">Principal Oversight</p>
              </div>
            </div>
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
              <div className="absolute inset-0 bg-[url('/hero_interior.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Subtle decorative accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      <section ref={journeyRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full">
        <div
          className="mb-16"
          style={{
            opacity: journeyVisible ? 1 : 0,
            transform: journeyVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold">
              Chronicles of Excellence
            </p>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-on-surface">
            Our Journey & Milestones
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop Timeline */}
          <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-surface-container-highest to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative group pt-0 lg:pt-16 flex flex-col h-full"
                style={{
                  opacity: journeyVisible ? 1 : 0,
                  transform: journeyVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.7s ease ${i * 150}ms, transform 0.7s ease ${i * 150}ms`,
                }}
              >
                {/* Timeline Node (Desktop only) */}
                <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary border border-surface-container-highest group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(242,190,113,0.3)] group-hover:scale-110 transition-all duration-500 z-10">
                    {m.icon}
                  </div>
                  <div className="w-px h-4 bg-surface-container-highest group-hover:bg-primary transition-colors duration-500" />
                </div>

                {/* Card Design */}
                <div className="relative p-8 rounded-2xl bg-surface-container/60 border border-surface-container-highest hover:border-primary/40 transition-all duration-500 flex flex-col h-full w-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                  {/* Icon for Mobile/Tablet */}
                  <div className="lg:hidden w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {m.icon}
                  </div>

                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-display text-3xl text-on-surface">{m.year}</h3>
                    <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold">{m.title}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-on-surface mb-4">{m.subtitle}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed flex-grow">{m.desc}</p>

                  <div className="mt-8 pt-4 border-t border-surface-container-highest flex justify-between items-center text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                    <span>View Milestone</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              {['All Projects', 'Residential Estates', 'Commercial & Hospitality', 'Custom Fabrications'].map((tab) => (
                <option key={tab} value={tab}>{tab}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Item */}
          {portfolioItems.filter(p => p.featured).map((item, i) => (
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
          {portfolioItems.filter(p => !p.featured).map((item, i) => (
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
                Experience Top Pristine
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
