import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/inquiries-and-quote', label: 'Inquiries & Quote' },
  { to: '/contact-us', label: 'Contact Us' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-2xl border-b border-surface-container-highest/30 transition-all duration-300">
      <div className="h-24 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center border border-primary/50 rounded-full group-hover:bg-primary/10 transition-colors duration-500">
            <span className="font-display font-bold text-primary text-xs tracking-tighter">TP</span>
          </div>
          <span className="font-display text-lg uppercase tracking-[0.2em] text-on-surface group-hover:text-primary transition-colors duration-500">
            Top Pristine
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
                `group relative text-xs uppercase tracking-[0.15em] py-2 transition-colors duration-300 ${
                  isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {/* Hover / Active Line Animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <NavLink
          to="/inquiries-and-quote"
          className="hidden md:flex group relative px-8 py-3 rounded-full bg-primary text-on-primary text-xs font-bold tracking-[0.15em] uppercase hover:shadow-[0_0_25px_rgba(242,190,113,0.35)] hover:-translate-y-0.5 transition-all duration-500 overflow-hidden"
        >
          {/* Shine effect */}
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          <span className="relative z-10">Get a Quote</span>
        </NavLink>
      </div>
    </header>
  );
}
