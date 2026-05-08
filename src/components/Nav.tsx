import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { Menu, X, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useGSAP(() => {
    // Initial hero reveal
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: 'power3.out' }
    );

    // Scroll trigger for nav background
    ScrollTrigger.create({
      start: 'top -60px',
      end: 99999,
      toggleClass: { targets: navRef.current, className: 'scrolled' }
    });
  }, { scope: navRef });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, 
        { x: '100%' }, 
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else if (isOpen && menuRef.current) {
      gsap.to(menuRef.current, { x: '100%', duration: 0.3, ease: 'power2.in' });
    }
  };

  const handleLogin = (e: React.MouseEvent) => {
    // If you want actual navigation, you can remove the preventDefault and set states, or just use <Link> 
    // Here we wrap in a Link or just do programmatic nav.
  };

  return (
    <nav 
      ref={navRef} 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        // The '.scrolled' class will apply these styles:
        "[&.scrolled]:bg-ink-900/80 [&.scrolled]:backdrop-blur-xl [&.scrolled]:border-b [&.scrolled]:border-hairline"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 rounded-sm">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22h20L12 2z" fill="#ffffff" fillOpacity="0.8"/>
            <path d="M12 8l-6 12h12L12 8z" fill="#2B5BFF" />
          </svg>
          <span className="font-sans text-xl font-semibold tracking-tight text-white mt-1">Aerolight</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 mt-1">
          {['Flights', 'Hotels', 'Packages', 'Deals', 'About'].map((link) => {
            const path = `/${link.toLowerCase()}`;
            const isActive = location.pathname === path || (location.pathname === '/' && link === 'Flights');
            return (
              <Link key={link} to={path} className={cn(
                "text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 rounded-sm",
                isActive ? 'text-azure-500' : 'text-white/60 hover:text-white'
              )}>
                {link}
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6 mt-1">
          <Link 
            to="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-white px-4 py-2 hover:bg-white/5 disabled:opacity-80 disabled:cursor-wait rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-500">
            Login
          </Link>
          <Link 
            to="/signup"
            className="flex items-center justify-center gap-2 text-sm font-medium !bg-azure-500 disabled:opacity-80 disabled:cursor-wait !text-white hover:!bg-azure-600 px-6 py-2.5 rounded-full shadow-[0_0_15px_rgba(43,91,255,0.4)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 ring-offset-2 ring-offset-ink-900">
            Sign Up Free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-sm bg-ink-900/95 backdrop-blur-2xl border-l border-hairline p-6 flex flex-col z-50 transform translate-x-full",
          isOpen ? "block" : "hidden" // actually, keep block but rely on x: 100% for hidden state visually, or toggle visibility. GSAP handles the visual part, but we should make sure it is unmounted or pointer-events-none if not open. Let's just use CSS for this simple thing if needed, but the prompt says GSAP.
        )}
        style={{ display: isOpen ? 'flex' : 'none' }} // simple toggle for now
      >
        <div className="flex justify-end mb-8">
          <button onClick={() => setIsOpen(false)} className="p-2 text-white/70 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          {['Flights', 'Hotels', 'Packages', 'Deals', 'About'].map((link) => (
            <Link key={link} to={`/${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-2xl font-light text-white hover:text-azure-500 transition-colors">
              {link}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-hairline flex flex-col gap-4">
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full inline-flex items-center justify-center text-base font-medium text-white px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors">
              Sign in
            </Link>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full inline-flex items-center justify-center text-base font-medium !bg-azure-500 !text-white hover:!bg-azure-600 px-6 py-3 rounded-full transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
