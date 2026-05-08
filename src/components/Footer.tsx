import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cols = footerRef.current?.querySelectorAll('.footer-col');
    if (cols) {
      gsap.fromTo(cols,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true
          }
        }
      );
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="border-t border-hairline pt-20 pb-10 mt-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-1 footer-col opacity-0">
            <Link to="/" className="inline-block mb-6 focus:outline-none">
              <span className="font-light text-2xl tracking-tight text-white/90">Aerol<i className="text-azure-500 not-italic">i</i>ight</span>
            </Link>
            <p className="text-sm text-white/50 mb-6 max-w-xs">
              Meticulously crafted flight booking for the modern traveler. Real-time fares, beautiful interface.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-medium text-white/90 mb-6 uppercase text-xs tracking-wider">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><Link to="/about" className="hover:text-azure-500 transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-azure-500 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-azure-500 transition-colors">Press</Link></li>
              <li><Link to="/contact" className="hover:text-azure-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-medium text-white/90 mb-6 uppercase text-xs tracking-wider">Product</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><Link to="/flights" className="hover:text-azure-500 transition-colors">Flights</Link></li>
              <li><Link to="/hotels" className="hover:text-azure-500 transition-colors">Hotels</Link></li>
              <li><Link to="/deals" className="hover:text-azure-500 transition-colors">Deals</Link></li>
              <li><Link to="/gift-cards" className="hover:text-azure-500 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-medium text-white/90 mb-6 uppercase text-xs tracking-wider">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              <li><Link to="/help" className="hover:text-azure-500 transition-colors">Help Center</Link></li>
              <li><Link to="/trust" className="hover:text-azure-500 transition-colors">Trust & Safety</Link></li>
              <li><Link to="/privacy" className="hover:text-azure-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-azure-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-hairline text-xs text-white/30">
          <p>&copy; 2026 Aeroliight. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button className="!text-white/40 hover:!text-white transition-colors">English (US)</button>
            <button className="!text-white/40 hover:!text-white transition-colors">USD $</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
