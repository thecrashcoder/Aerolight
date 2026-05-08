import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

export function CTABanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // Reveal banner
    gsap.fromTo(bannerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    // Reveal text contents
    const textContents = bannerRef.current?.querySelectorAll('.cta-content');
    if (textContents) {
      gsap.fromTo(textContents,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.3,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // Drifting paper plane
    if (planeRef.current) {
      gsap.to(planeRef.current, {
        x: '110vw',
        y: '-20vh',
        rotation: 15,
        duration: 15,
        ease: 'sine.inOut',
        repeat: -1,
      });
    }
  });

  return (
    <section className="py-20 lg:py-32 max-w-7xl mx-auto px-5 lg:px-10 overflow-hidden relative">
      <div 
        ref={bannerRef}
        className="opacity-0 rounded-[24px] md:rounded-[32px] p-10 md:p-16 relative overflow-hidden text-center isolate bg-[#0F204A]"
      >
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
        >
           {/* Fallback to a working airplane/airport timelapse video since Pixabay raw mp4 URL requires abstraction */}
           <source src="https://videos.pexels.com/video-files/2861217/2861217-uhd_2560_1440_30fps.mp4" type="video/mp4" />
           <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-azure-700/50 mix-blend-multiply pointer-events-none z-10" />

        {/* Glow ring */}
        <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] ring-1 ring-inset ring-white/15 pointer-events-none z-10" />

        
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
          </svg>
        </div>

        {/* Paper Plane */}
        <svg 
          ref={planeRef}
          className="absolute left-[-10%] top-[60%] w-16 h-16 text-white/20 pointer-events-none z-0" 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>

        <div className="relative z-20 max-w-2xl mx-auto">
          <h2 className="cta-content opacity-0 text-h2 md:text-display-lg tracking-tight font-medium mb-6 text-white text-balance">
            Take Aeroliight with you, <span className="font-light">everywhere.</span>
          </h2>
          <p className="cta-content opacity-0 text-body-lg text-white/80 mb-10 text-balance">
            Download the app &mdash; fares, alerts, and boarding passes in one tap.
          </p>

          <div className="cta-content opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-ink-900 hover:bg-gray-50 px-6 py-3.5 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ring-offset-2 ring-offset-azure-500 w-full sm:w-auto">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.16 2.31-.93 3.57-.84 1.51.15 2.67.75 3.4 1.83-2.93 1.76-2.45 5.56 0 6.94-.65 1.53-1.68 3.12-2.05 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] text-ink-600 uppercase">Download on the</div>
                <div className="text-sm">App Store</div>
              </div>
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white text-ink-900 hover:bg-gray-50 px-6 py-3.5 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ring-offset-2 ring-offset-azure-500 w-full sm:w-auto">
              <svg fill="currentColor" width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M48,59.49v393a4.33,4.33,0,0,0,7.37,3.07L260,256,55.37,56.42A4.33,4.33,0,0,0,48,59.49Z" />
                <path d="M345.8,174,89.22,32.64l-.16-.09c-4.42-2.4-8.62,3.58-5,7.06L285.19,231.93Z" />
                <path d="M84.08,472.39c-3.64,3.48.56,9.46,5,7.06l.16-.09L345.8,338l-60.61-57.95Z" />
                <path d="M449.38,231l-71.65-39.46L310.36,256l67.37,64.43L449.38,281C468.87,270.23,468.87,241.77,449.38,231Z" />
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] text-ink-600 uppercase">Get it on</div>
                <div className="text-sm">Google Play</div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
