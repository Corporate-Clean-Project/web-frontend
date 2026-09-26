import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SplashScreen() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show splash screen on route change
    setLoading(true);
    setFadeOut(false);
    
    // Start fade out after a short delay (e.g. 1000ms)
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1000);
    
    // Remove from DOM after transition completes
    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1000ms delay + 500ms transition
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        {/* Outer glowing ring */}
        <div className="absolute inset-[-8px] rounded-full bg-primary/5 blur-xl animate-pulse" />
        
        {/* Spinning rings */}
        <div className="absolute inset-0 border-4 border-surface-container-highest rounded-full" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite]" />
        
        {/* Inner static logo/icon */}
        <div className="text-primary font-display font-bold text-3xl tracking-tighter shadow-primary drop-shadow-[0_0_10px_rgba(242,190,113,0.5)]">
          TP
        </div>
      </div>
      
      <h2 className="text-on-surface font-display text-2xl uppercase tracking-[0.3em] mb-3">
        Top Pristine
      </h2>
      
      {/* Loading bar */}
      <div className="w-48 h-[2px] bg-surface-container-highest/60 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-primary rounded-full w-1/3 animate-[slide_1.5s_ease-in-out_infinite_alternate]" />
      </div>
    </div>
  );
}
