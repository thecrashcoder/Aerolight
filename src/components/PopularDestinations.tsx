import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { DestinationCard } from './DestinationCard';
import { destinations } from '../data/destinations';

export function PopularDestinations() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header text animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('.dest-header'),
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
    if (cards) {
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

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 max-w-7xl mx-auto px-5 lg:px-10">
      <div className="mb-12 md:mb-16 dest-header opacity-0">
        <p className="text-micro tracking-[0.08em] uppercase text-azure-300 font-semibold mb-4">Explore the World</p>
        <h2 className="text-h2 md:text-display-lg tracking-tight font-medium mb-4">
          Popular <span className="font-light text-azure-500">Destinations</span>
        </h2>
        <p className="text-body-lg text-white/70 max-w-2xl">
          Hand-picked routes our travelers love most this season.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="opacity-0">
            <DestinationCard {...dest} />
          </div>
        ))}
      </div>
    </section>
  );
}
