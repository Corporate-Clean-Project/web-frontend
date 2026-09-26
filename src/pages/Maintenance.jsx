import { Link } from 'react-router-dom';

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 space-y-6 max-w-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high border border-primary/20 mb-4 shadow-[0_0_30px_rgba(242,190,113,0.15)]">
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <p className="text-xs text-primary tracking-[0.3em] uppercase font-semibold">
          Under Construction
        </p>
        
        <h1 className="font-display text-4xl lg:text-5xl text-on-surface leading-tight">
          Crafting Something <span className="text-primary italic">Pristine</span>
        </h1>
        
        <p className="text-sm text-on-surface-variant leading-relaxed pb-8">
          This page is currently undergoing master renovations. We are meticulously refining our digital presence to ensure the highest standards of luxury. Please check back soon.
        </p>
        
        <Link
          to="/"
          className="group inline-flex relative px-8 py-4 rounded-full bg-primary text-on-primary font-bold uppercase tracking-widest text-xs hover:shadow-[0_8px_30px_rgba(242,190,113,0.45)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          <span className="relative z-10">Return to Home</span>
        </Link>
      </div>
    </div>
  );
}
