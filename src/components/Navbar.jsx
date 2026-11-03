import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/inquiries-and-quote', label: 'Inquiries & Quote' },
  { to: '/contact-us', label: 'Contact Us' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-surface-container-highest/30 transition-all duration-300">
      <div className="h-20 md:h-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" onClick={() => setMenuOpen(false)} className="group flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 flex items-center justify-center border border-primary/50 rounded-full group-hover:bg-primary/10 transition-colors duration-500">
            <span className="font-display font-bold text-primary text-xs tracking-tighter">PBM</span>
          </div>
          <span className="font-display text-base sm:text-lg uppercase tracking-[0.12em] sm:tracking-[0.2em] text-on-surface group-hover:text-primary transition-colors duration-500">
            Pristine
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative text-xs uppercase tracking-[0.15em] py-2 transition-colors duration-300 ${isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {/* Hover / Active Line Animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-container-highest/60 text-on-surface hover:border-primary/50 hover:text-primary transition-colors"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+16047355763"
            className="inline-flex items-center justify-center rounded-full border border-primary/60 px-5 py-3 text-xs font-bold tracking-[0.08em] text-on-surface transition-colors hover:bg-primary/10 hover:text-primary"
          >
            +1 (604) 735-5763
          </a>
          <NavLink
            to="/inquiries-and-quote"
            className="group relative px-8 py-3 rounded-full bg-primary text-on-primary text-xs font-bold tracking-[0.15em] uppercase hover:shadow-[0_0_25px_rgba(242,190,113,0.35)] hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <span className="relative z-10">Get a Quote</span>
          </NavLink>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="lg:hidden border-t border-surface-container-highest/40 bg-background/95 px-4 py-4 shadow-xl backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm uppercase tracking-[0.12em] transition-colors ${isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="tel:+16047355763"
              className="mt-2 inline-flex items-center justify-center rounded-full border border-primary/60 px-6 py-3 text-xs font-bold tracking-[0.08em] text-on-surface transition-colors hover:bg-primary/10 hover:text-primary"
            >
              +1 (604) 735-5763
            </a>
            <NavLink
              to="/inquiries-and-quote"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-on-primary transition-colors hover:bg-secondary"
            >
              Get a Quote
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
