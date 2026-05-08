import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { ReviewCard } from './ReviewCard';
import { reviews } from '../data/reviews';

const PARTNERS = [
  'Emirates', 'All Nippon Airways', 'Qatar Airways', 'Singapore Airlines', 
  'Lufthansa', 'Delta', 'Japan Airlines', 'Air France'
];

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header text animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('.reviews-header'),
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

    // Reveal cards
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

    // Marquee infinite animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 30,
        ease: 'none',
        repeat: -1
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 overflow-hidden mx-auto">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-16 reviews-header opacity-0">
        <h2 className="text-h2 md:text-display-lg tracking-tight font-medium mb-4 text-center">
          Real Reviews, <span className="font-light text-azure-500">Real Journeys</span>
        </h2>
      </div>

      <div ref={cardsRef} className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {reviews.map((review) => (
          <div key={review.id} className="opacity-0">
            <ReviewCard {...review} />
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className="border-y border-hairline py-8 bg-ink-800/50 flex whitespace-nowrap overflow-hidden">
        <div ref={marqueeRef} className="flex gap-16 px-8 items-center shrink-0">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <span key={i} className="text-xl font-light text-white/40 tracking-wider inline-block">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
