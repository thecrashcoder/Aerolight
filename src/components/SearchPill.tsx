import { useRef } from 'react';
import { MapPin, Plane, Calendar, Users, ArrowRight } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { useGSAP } from '@gsap/react';

export function SearchPill() {
  const pillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(pillRef.current,
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1.2 }
    );
  });

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { boxShadow: '0 0 40px rgba(43, 91, 255, 0.33)', duration: 0.3 });
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px -20px #2B5BFF', duration: 0.3 });
  };

  return (
    <div ref={pillRef} className="w-full max-w-4xl mx-auto mt-12 opacity-0">
      <div className="flex flex-col md:flex-row bg-ink-700/60 backdrop-blur-xl border border-hairline md:rounded-full rounded-2xl md:divide-x divide-y md:divide-y-0 divide-hairline">
        
        {/* From */}
        <div className="flex-1 flex gap-3 px-6 py-4 items-center focus-within:bg-white/5 transition-colors cursor-pointer md:rounded-l-full rounded-t-2xl md:rounded-tr-none">
          <MapPin size={20} className="text-white/40 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-micro text-white/50 uppercase tracking-wide">Departure</span>
            <input 
              type="text" 
              defaultValue="Colombo (CMB)" 
              className="bg-transparent border-none text-white font-medium focus:outline-none w-full placeholder:text-white/30"
            />
          </div>
        </div>

        {/* To */}
        <div className="flex-1 flex gap-3 px-6 py-4 items-center focus-within:bg-white/5 transition-colors cursor-pointer">
          <Plane size={20} className="text-white/40 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-micro text-white/50 uppercase tracking-wide">Destination</span>
            <input 
              type="text" 
              defaultValue="Tokyo (HND)" 
              className="bg-transparent border-none text-white font-medium focus:outline-none w-full placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Date */}
        <div className="flex-1 flex gap-3 px-6 py-4 items-center focus-within:bg-white/5 transition-colors cursor-pointer">
          <Calendar size={20} className="text-white/40 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-micro text-white/50 uppercase tracking-wide">Depart · Return</span>
            <input 
              type="text" 
              defaultValue="Jun 12 &rarr; Jun 24" 
              className="bg-transparent border-none text-white font-medium focus:outline-none w-full placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Passengers + CTA */}
        <div className="flex-1 flex gap-3 pl-6 pr-2 py-2 items-center md:rounded-r-full rounded-b-2xl md:rounded-bl-none justify-between bg-ink-700/60 md:bg-transparent">
          <div className="flex gap-3 items-center">
            <Users size={20} className="text-white/40 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-micro text-white/50 uppercase tracking-wide">Travelers</span>
              <span className="text-white font-medium">2 Adults</span>
            </div>
          </div>
          <button 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex items-center gap-2 bg-azure-500 hover:bg-azure-600 text-white px-5 py-3 rounded-full font-medium transition-colors shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),_0_20px_40px_-20px_#2B5BFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-300 flex-shrink-0"
          >
            <span className="hidden lg:inline">Search Flights</span>
            <span className="lg:hidden">Search</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
