import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { Compass, Wallet, Plane, ShieldCheck } from 'lucide-react';

const steps = [
  { id: '01', title: 'Search Your Route', icon: Compass, desc: 'Pick origin, destination, and dates.' },
  { id: '02', title: 'Compare Prices', icon: Wallet, desc: 'We scan 800+ carriers in real time.' },
  { id: '03', title: 'Pick Your Seat', icon: Plane, desc: 'Choose cabin, seat, and add-ons.' },
  { id: '04', title: 'Fly Easy', icon: ShieldCheck, desc: 'Get your boarding pass instantly.' },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Header text animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('.how-it-works-header'),
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

    // Reveal items
    const items = itemsRef.current?.children;
    if (items) {
      gsap.fromTo(items,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true
          }
        }
      );
    }

    // Line drawing animation
    if (linePathRef.current) {
      const length = linePathRef.current.getTotalLength();
      gsap.set(linePathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(linePathRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.6
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 max-w-7xl mx-auto px-5 lg:px-10 relative">
      <div className="mb-16 text-center how-it-works-header opacity-0">
        <p className="text-micro tracking-[0.08em] uppercase text-azure-300 font-semibold mb-4">Simple & Fast</p>
        <h2 className="text-h2 md:text-display-lg tracking-tight font-medium mb-4">
          Book in <span className="font-light text-azure-500">4 Easy</span> Steps
        </h2>
        <p className="text-body-lg text-white/70 max-w-xl mx-auto">
          From search to boarding pass &mdash; frictionless by design.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="absolute top-12 left-[12.5%] right-[12.5%] hidden lg:block z-0 pointer-events-none">
          <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
            <path 
              ref={linePathRef}
              d="M0 1L1000 1" 
              stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="6 6" 
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center opacity-0">
              <div className="w-24 h-24 rounded-full bg-ink-800 border border-hairline flex items-center justify-center relative mb-6 shadow-xl">
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-ink-900 border border-hairline flex items-center justify-center">
                  <span className="font-light text-azure-300 font-medium">{step.id}</span>
                </div>
                <step.icon size={32} className="text-azure-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium mb-2 tracking-tight">{step.title}</h3>
              <p className="text-white/60 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
