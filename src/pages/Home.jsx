import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';

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

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'HOSPITAL-GRADE HYGIENE',
    desc: 'Advanced sanitization protocols using EPA-certified, eco-friendly products for a healthier environment.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'VETTED & INSURED CREWS',
    desc: 'Background-checked, certified cleaning specialists dedicated to total workplace confidentiality and security.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'AFTER-HOURS PRECISION',
    desc: 'Seamless evening and weekend scheduling that keeps your business running completely uninterrupted.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'TAILORED CHECKLISTS',
    desc: 'Customized maintenance schedules tailored specifically to corporate offices, luxury retail, or medical facilities.',
  },
];

const processSteps = [
  {
    id: 'inspection',
    number: '01',
    title: 'Site Inspection & Audit',
    desc: 'We review your square footage, high-touch zones, and security requirements to draft a customized plan.',
  },
  {
    id: 'protocol',
    number: '02',
    title: 'Tailored Protocol',
    desc: 'We design a dedicated janitorial schedule and assign a primary, background-checked crew to your property.',
  },
  {
    id: 'execution',
    number: '03',
    title: 'Execution & Sanitization',
    desc: 'Our trained specialists carry out systematic, eco-friendly deep cleaning with meticulous quality control.',
  },
  {
    id: 'review',
    number: '04',
    title: 'Quality Assurance & Review',
    desc: 'Routine supervisory walkthroughs ensure every square foot consistently reflects peak professional standards.',
  },
];

/* 
// ORIGINAL PORTFOLIO DATA - Kept for future use when projects are ready
const portfolioItems = [
  {
    id: 'noir-marble',
    tag: 'Featured Residence · Schedule',
    subtitle: '2970 sq.ft',
    title: 'Noir Marble & Satin Brass Suite',
    desc: 'An exquisitely executed private residence blending the dark grandeur of polished noir marble with hand-finished satin brass detailing — a masterwork of residential precision.',
    image: '/portfolio_noir_marble.png',
    featured: true,
    link: '/about-us',
  },
  {
    id: 'culinary',
    tag: 'Bespoke Kitchen',
    subtitle: '1,240 sq.ft',
    title: 'Smoked Oak Culinary Sanctuary',
    desc: 'A statement culinary environment shaped in modern precision, delivering warmth through smoked oak panels, polished concrete, and bespoke cabinetry hardware.',
    image: '/portfolio_culinary.png',
    featured: false,
    link: '/about-us',
  },
  {
    id: 'facade',
    tag: 'Architectural Facade',
    subtitle: 'Private Estate',
    title: 'Architectural Facade & Private Grounds',
    desc: 'Commanding exterior architecture with precision-engineered facade panels and private landscaping designed for absolute prestige and security.',
    image: '/portfolio_facade.png',
    featured: false,
    link: '/about-us',
  },
];
*/

const testimonials = [
  {
    quote:
      '"Top Pristine handled our penthouse redesign with a level of precision I didn\'t believe existed in modern residential contracting. Their crew treated our home like a gallery pavilion — punctual, respectful, and relentlessly attentive."',
    author: 'Marcus Grace',
    position: 'Principal Architect & Residential Director',
  },
  {
    quote:
      '"Every phase of our estate build was executed with extraordinary attention to detail. The team never cut corners — they elevated each element beyond what we had originally envisioned. Truly exceptional."',
    author: 'Isabelle Fontaine',
    position: 'Estate Owner · Private Commission',
  },
  {
    quote:
      '"We engaged Top Pristine for our commercial flagship interior and the result was nothing short of iconic. Structural precision, premium material selection, and a project delivery that came in ahead of schedule."',
    author: 'Raymond Alderton',
    position: 'CEO · Alderton Holdings Group',
  },
  {
    quote:
      '"The craftsmanship is unparalleled. From the initial consultation to the final handover, every interaction was professional, clear, and driven by a genuine respect for our vision and timeline."',
    author: 'Sophia Renaud',
    position: 'Interior Design Director · Renaud Collective',
  },
];

const stats = [
  { value: '24/7', label: 'Rapid Response' },
  { value: '100%', label: 'Satisfaction Guaranteed' },
  { value: 'A+ TIER', label: 'Certified Janitorial' },
];

const sectionLabels = ['Hero', 'Pillars', 'Process', 'Reviews', 'CTA'];

function ScrollProgressBar({ sectionRefs }) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(scrollPercent, 1));

      let current = 0;
      sectionRefs.forEach((ref, i) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            current = i;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (index) => {
    const ref = sectionRefs[index];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-0">
      <div className="relative w-[2px] bg-surface-container-highest/40 rounded-full" style={{ height: '180px' }}>
        <div
          className="absolute top-0 left-0 w-full bg-primary rounded-full"
          style={{
            height: `${progress * 100}%`,
            transition: 'height 0.15s ease-out',
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        {sectionLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollToSection(i)}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={`Scroll to ${label}`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === i
                ? 'bg-primary scale-125 shadow-[0_0_8px_rgba(242,190,113,0.5)]'
                : 'bg-surface-container-highest/60 group-hover:bg-primary/50'
                }`}
            />
            <span
              className={`text-[9px] tracking-[0.2em] uppercase transition-all duration-300 ${activeSection === i
                ? 'text-primary opacity-100 translate-x-0'
                : 'text-on-surface-variant opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TestimonialCarousel({ sectionRef, visible }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  };

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-surface-container-lowest" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,163,89,0.06),transparent)]" />

      {/* Section Header */}
      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div>
          <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold mb-3">
            Client Testimonials
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-on-surface">
            Words of Prestige
          </h2>
        </div>
        <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed lg:text-right">
          Hear from our esteemed clients who have experienced the unparalleled luxury and precision of a Top Pristine build.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div
          className="flex justify-center gap-1.5 mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="w-5 h-5 fill-primary" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div
          className="relative min-h-[220px] lg:min-h-[200px]"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.15s',
          }}
        >
          <blockquote
            key={active}
            className="font-display text-2xl lg:text-3xl xl:text-4xl text-on-surface leading-snug italic mb-10 animate-testimonial-in"
          >
            {t.quote}
          </blockquote>
        </div>

        <div
          key={`author-${active}`}
          className="flex flex-col items-center gap-2 animate-testimonial-in"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.35s',
          }}
        >
          <div className="w-10 h-px bg-primary mb-2" />
          <p className="text-on-surface font-semibold tracking-wider uppercase text-sm">
            {t.author}
          </p>
          <p className="text-xs text-on-surface-variant tracking-wide">
            {t.position}
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => { prev(); resetTimer(); }}
            className="w-10 h-10 rounded-full border border-surface-container-highest/60 flex items-center justify-center text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetTimer(); }}
                className={`rounded-full transition-all duration-300 ${i === active
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-surface-container-highest/60 hover:bg-primary/40'
                  }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => { next(); resetTimer(); }}
            className="w-10 h-10 rounded-full border border-surface-container-highest/60 flex items-center justify-center text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all duration-300"
            aria-label="Next testimonial"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProcessStepItem({ step, i }) {
  const isEven = i % 2 === 0;
  const [ref, visible] = useReveal({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {/* Timeline Dot/Number Node */}
      <div 
        className="absolute left-[28px] md:left-1/2 w-14 h-14 bg-surface rounded-full border border-primary/40 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(242,190,113,0.15)] group transition-all duration-700"
        style={{
          borderColor: visible ? 'rgba(242, 190, 113, 0.8)' : 'rgba(242, 190, 113, 0.2)',
          boxShadow: visible ? '0 0 25px rgba(242, 190, 113, 0.3)' : '0 0 0px rgba(242, 190, 113, 0)',
        }}
      >
        <span className="font-display text-primary font-bold text-xl group-hover:scale-110 transition-transform duration-300">
          {step.number}
        </span>
      </div>

      {/* Content Box */}
      <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
        <div className="p-8 rounded-2xl bg-surface-container-low/50 border border-surface-container-highest/50 hover:border-primary/30 hover:bg-surface-container-high/50 transition-all duration-300 shadow-lg">
          <h3 className="font-display text-2xl text-on-surface mb-4">
            {step.title}
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>

      {/* Empty spacer for flex alignment on desktop */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}


export default function Home() {
  const heroRef = useRef(null);
  const [pillarsRef, pillarsVisible] = useReveal();
  const [portfolioRef, portfolioVisible] = useReveal();
  const testimonialRef = useRef(null);
  const [testimonialRevealRef, testimonialVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();
  const ctaSectionRef = useRef(null);

  const sectionRefs = [heroRef, pillarsRef, portfolioRef, testimonialRef, ctaSectionRef];

  const combinedTestimonialRef = useCallback((node) => {
    testimonialRef.current = node;
    testimonialRevealRef.current = node;
  }, [testimonialRevealRef]);

  const combinedCtaRef = useCallback((node) => {
    ctaSectionRef.current = node;
    ctaRef.current = node;
  }, [ctaRef]);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <ScrollProgressBar sectionRefs={sectionRefs} />

      <section ref={heroRef} className="relative w-full -mt-20 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero_interior.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div
          className="absolute left-0 top-1/3 w-[3px] bg-primary rounded-r-full"
          style={{
            height: heroVisible ? '180px' : '0px',
            transition: 'height 1.2s cubic-bezier(0.4,0,0.2,1) 0.4s',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24 w-full">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-surface-container-low/60 backdrop-blur-sm mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(-16px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">
              Premium Commercial Cleaning & Janitorial
            </span>
          </div>

          <div className="max-w-2xl space-y-6">
            <h1
              className="font-display text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tight leading-none"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',
              }}
            >
              Impeccable.
              <br />
              <span
                className="text-primary italic"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s',
                  display: 'inline-block',
                }}
              >
                Quality. Pristine Spaces.
              </span>
            </h1>

            <p
              className="text-on-surface-variant max-w-2xl leading-relaxed text-base"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s',
              }}
            >
              Pristine Building Maintenance Inc. delivers white-glove commercial cleaning and property maintenance
              with uncompromising hygiene standards you can trust. Elevate your workplace image with tailored,
              eco-conscious cleaning routines.
            </p>

            <div
              className="flex flex-wrap items-center gap-5 pt-2"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.85s, transform 0.7s ease 0.85s',
              }}
            >
              <Link
                to="/inquiries-and-quote"
                id="hero-cta-quote"
                className="group relative px-8 py-4 rounded-full bg-primary text-on-primary font-bold tracking-wider uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(242,190,113,0.4)] hover:scale-105"
              >
                <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                Get a Quote
              </Link>
              <Link
                to="/contact-us"
                id="hero-cta-contact"
                className="px-8 py-4 rounded-full border border-surface-container-highest bg-surface-container/40 backdrop-blur-sm text-on-surface font-semibold tracking-wider uppercase hover:border-primary/50 hover:bg-surface-container-high/60 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            <div
              className="grid grid-cols-3 gap-6 pt-5 pb-10 max-w-lg border-t border-surface-container-highest/60"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 1s, transform 0.7s ease 1s',
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.7s ease ${1.0 + i * 0.12}s, transform 0.7s ease ${1.0 + i * 0.12}s`,
                  }}
                >
                  <p className="font-display text-xl lg:text-2xl text-primary">{s.value}</p>
                  <p className="text-xs text-on-surface-variant mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 1s ease 1.6s',
          }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-on-surface-variant">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent animate-bounce" />
        </div>
      </section>

      <section
        ref={pillarsRef}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full"
      >
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
          style={{
            opacity: pillarsVisible ? 1 : 0,
            transform: pillarsVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div>
            <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold mb-3">
              Our Standards
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-on-surface">
              The Gold Standard in Facility Hygiene
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed lg:text-right">
            Every service is built around reliability, hygiene, and a spotless environment that reflects your brand at its best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group relative bg-surface-container/80 backdrop-blur-md border border-surface-container-highest/60 p-7 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(242,190,113,0.12)] transition-all duration-500 overflow-hidden"
              style={{
                opacity: pillarsVisible ? 1 : 0,
                transform: pillarsVisible
                  ? `translateY(${i % 2 !== 0 ? '24px' : '0'})`
                  : 'translateY(40px)',
                transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                {p.icon}
              </div>
              <h3 className="uppercase tracking-wider text-sm font-bold mb-2 text-on-surface group-hover:text-primary transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={portfolioRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-28 w-full"
      >
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
          style={{
            opacity: portfolioVisible ? 1 : 0,
            transform: portfolioVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div>
            <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold mb-3">
              Master Process
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-on-surface">
              How We Create Excellence
            </h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed lg:text-right">
            A meticulous, step-by-step process designed to deliver consistent cleanliness, compliance, and confidence across every space.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Vertical Line Track */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-surface-container-highest/60 -translate-x-1/2" />
          
          {/* Vertical Line Fill */}
          <div 
            className="absolute left-[28px] md:left-1/2 top-0 w-px bg-primary -translate-x-1/2"
            style={{
              height: portfolioVisible ? '100%' : '0%',
              transition: 'height 2.5s ease-in-out',
            }}
          />

          <div className="flex flex-col gap-12 md:gap-24">
            {processSteps.map((step, i) => (
              <ProcessStepItem key={step.id} step={step} i={i} />
            ))}
          </div>
        </div>
      </section>


      {/* <section
  ref={portfolioRef}
  className="max-w-7xl mx-auto px-6 lg:px-12 py-28 w-full"
>
  <div
    className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
    style={{
      opacity: portfolioVisible ? 1 : 0,
      transform: portfolioVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}
  >
    <div>
      <p className="text-xs text-primary tracking-[0.25em] uppercase font-semibold mb-3">
        Curated Portfolio
      </p>
      <h2 className="font-display text-4xl lg:text-5xl text-on-surface">
        Architectural Masterworks
      </h2>
    </div>
    <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed lg:text-right">
      Explore our curated collection of elite residential and commercial architecture
      projects that redefine premium craftsmanship.
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {portfolioItems
      .filter((p) => p.featured)
      .map((item, i) => (
        <div
          key={item.id}
          className="lg:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          style={{
            opacity: portfolioVisible ? 1 : 0,
            transform: portfolioVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: `opacity 0.8s ease ${i * 150}ms, transform 0.8s ease ${i * 150}ms`,
          }}
        >
          <div
            className="w-full h-80 lg:h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-semibold">{item.tag}</span>
              <div className="flex-1 h-px bg-primary/30" />
              <span className="text-[10px] text-on-surface-variant">{item.subtitle}</span>
            </div>
            <h3 className="font-display text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-5 max-w-md">{item.desc}</p>
            <div className="flex items-center gap-6">
              <Link
                to={item.link}
                id={`portfolio-${item.id}-details`}
                className="text-xs text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors duration-300 underline underline-offset-4"
              >
                View Full Details
              </Link>
              <Link
                to="/inquiries-and-quote"
                id={`portfolio-${item.id}-inquiry`}
                className="text-xs text-primary uppercase tracking-widest hover:text-gold-light transition-colors duration-300 font-semibold"
              >
                Open Inquiry →
              </Link>
            </div>
          </div>
        </div>
      ))}

    <div className="flex flex-col gap-6">
      {portfolioItems
        .filter((p) => !p.featured)
        .map((item, i) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.45)] flex-1 min-h-[200px]"
            style={{
              opacity: portfolioVisible ? 1 : 0,
              transform: portfolioVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: `opacity 0.8s ease ${(i + 1) * 200}ms, transform 0.8s ease ${(i + 1) * 200}ms`,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-semibold block mb-1">{item.tag}</span>
              <h3 className="font-display text-base text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
              <Link
                to={item.link}
                id={`portfolio-${item.id}-link`}
                className="inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest"
              >
                Explore Details
                <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8.667H4V7.333h8V4l4 4-4 4V8.667z" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
    </div>
  </div>
</section> */}

      <TestimonialCarousel sectionRef={combinedTestimonialRef} visible={testimonialVisible} />

      <section
        ref={combinedCtaRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full"
      >
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
              id="cta-strip-quote"
              className="group relative px-10 py-5 rounded-full bg-primary text-on-primary font-bold uppercase tracking-[0.15em] text-sm hover:shadow-[0_0_40px_rgba(242,190,113,0.5)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
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
