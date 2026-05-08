import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { DealCard } from './DealCard';
import { deals } from '../data/deals';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

const TABS = ['All', 'Asia', 'Europe', 'Americas', 'Oceania', 'Middle East'];

export function HotDeals() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [isFetchingDeals, setIsFetchingDeals] = useState(false);

  // We can track the displayed deals separately from the activeTab to prevent instant updates
  const [displayDeals, setDisplayDeals] = useState(deals);

  useGSAP(() => {
    // Header text animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('.deal-header'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      );
    }

    const cards = cardsRef.current?.children;
    if (cards && !isFetchingDeals) {
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true
          }
        }
      );
    }
  }, { scope: sectionRef });

  // Whenever the tab changes, simulate loading
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setIsFetchingDeals(true);
    
    setTimeout(() => {
      const filtered = tab === 'All' ? deals : deals.filter(d => d.region === tab);
      setDisplayDeals(filtered.length > 0 ? filtered : deals.slice(0, 4));
      setIsFetchingDeals(false);
      
      // Re-trigger cards animation after loading mock
      if (cardsRef.current?.children) {
        gsap.fromTo(cardsRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 }
        );
      }
    }, 800);
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 max-w-7xl mx-auto px-5 lg:px-10">
      <div className="mb-12 deal-header opacity-0">
        <p className="text-micro tracking-[0.08em] uppercase text-azure-300 font-semibold mb-4">Limited Time</p>
        <h2 className="text-h2 md:text-display-lg tracking-tight font-medium mb-8">
          Hot <span className="font-light text-azure-500">Flight Deals</span>
        </h2>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-500 shrink-0",
                activeTab === tab 
                  ? "bg-azure-500 text-white" 
                  : "bg-fog border border-hairline text-white/70 hover:text-white hover:bg-white/10",
                isFetchingDeals && "opacity-70 cursor-wait"
              )}
              disabled={isFetchingDeals}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {isFetchingDeals ? (
          <div className="w-full h-[400px] flex flex-col items-center justify-center text-azure-500">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="text-sm font-medium text-white/70">Finding best deals...</p>
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayDeals.map((deal) => (
              <div key={deal.id} className="opacity-0">
                <DealCard {...deal} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
