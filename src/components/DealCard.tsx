import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

interface DealCardProps {
  id?: string;
  airline: string;
  code: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  price: number;
  oldPrice: number;
  depart: string;
  return: string;
  duration: string;
  stops: string;
  cabin: string;
}

export function DealCard({ airline, code, from, to, price, oldPrice, depart, return: returnDate, duration, stops, cabin }: DealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(cardRef.current, {
      x: x * 0.05,
      y: y * 0.05,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-ink-700/60 backdrop-blur-xl border border-hairline rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_30px_60px_-30px_rgba(43,91,255,0.35)] flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white text-ink-900 flex items-center justify-center font-bold text-xs">
            {code}
          </div>
          <span className="text-sm font-medium text-white/90">{airline}</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide">
          {from} &rarr; {to}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <div className="text-display-lg font-medium tracking-tight leading-none">${price}</div>
        <div className="text-xl text-white/40 line-through mb-1">${oldPrice}</div>
      </div>

      <div className="flex-1 mt-auto">
        <div className="text-sm text-white/60 mb-1">{depart} &mdash; {returnDate}</div>
        <div className="text-sm text-white/60 mb-6">{duration} &middot; {stops} &middot; {cabin}</div>
        <Link to="/booking" className="block text-center w-full py-3 bg-fog border border-hairline text-white/90 rounded-full font-medium transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 hover:border-azure-500/50">
          Book Now
        </Link>
      </div>
    </div>
  );
}

