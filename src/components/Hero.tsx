import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';
import { Wallet, Home, Settings, Plane, ArrowUpDown, Loader2 } from 'lucide-react';
import { WeightWave } from "$lib/motion-core";

const TRAVEL_IMAGES = [
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop", // Tropical
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop", // Paris
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop", // Tokyo
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"  // Flight
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [isBuying, setIsBuying] = useState(false);

  const handleBuyTicket = () => {
    setIsBuying(true);
    setTimeout(() => {
      setIsBuying(false);
      navigate('/booking');
    }, 1000);
  };

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate async search operation
    setTimeout(() => {
      setIsSearching(false);
      navigate('/search');
    }, 1000);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % TRAVEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    // Reveal central content
    const centerElements = centerContentRef.current?.children;
    if (centerElements) {
       gsap.fromTo(centerElements, 
         { y: 30, opacity: 0 },
         { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
       );
    }

    // Reveal left widgets
    if (leftColRef.current) {
       gsap.fromTo(leftColRef.current.children,
         { x: -50, opacity: 0 },
         { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1 }
       );
    }
    
    // Reveal right widgets
    if (rightColRef.current) {
       gsap.fromTo(rightColRef.current.children,
         { x: 50, opacity: 0 },
         { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1.2 }
       );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[900px] h-[100vh] flex justify-center overflow-hidden font-sans bg-ink-900">
      {/* Sliding Image Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {TRAVEL_IMAGES.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
            style={{
              backgroundImage: `url(${src})`,
              opacity: index === currentImage ? 1 : 0,
              transform: `scale(${index === currentImage ? 1 : 1.1})`,
              transition: 'opacity 2000ms ease-in-out, transform 10000ms ease-out',
            }}
          />
        ))}
        {/* Light overlay to ensure text visibility and blend with background */}
        <div className="absolute inset-0 bg-ink-900/20" />
      </div>

      {/* Main Container Grid overlay */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 lg:px-10 pt-24 min-h-[800px] h-[100vh] flex flex-col pointer-events-none">
        
        {/* Center Top Content */}
        <div ref={centerContentRef} className="flex flex-col items-center text-center mt-2 lg:mt-8 relative z-20">
          <div className="opacity-0 pointer-events-auto inline-flex items-center px-5 py-2 rounded-full border border-azure-500/50 text-white text-sm mb-6 bg-azure-500/10 backdrop-blur-xl">
            Best fares guaranteed
          </div>
          <h1 className="opacity-0 pointer-events-auto text-[48px] md:text-[64px] lg:text-[84px] font-sans tracking-tight leading-[1.05] text-white">
            <span className="font-light"><WeightWave text="Discover and Book" continuous={false} baseWeight={300} hoverWeight={800} influenceRadius={3} falloffPower={1.5} duration={1} /></span><br className="hidden md:block"/>
            <span className="font-light"><WeightWave text="Flights " continuous={false} baseWeight={300} hoverWeight={800} influenceRadius={3} falloffPower={1.5} duration={1} /></span>
            <span className="bg-gradient-to-r from-azure-500 to-white text-transparent bg-clip-text"><WeightWave text="Worldwide" continuous={false} baseWeight={300} hoverWeight={800} influenceRadius={3} falloffPower={1.5} duration={1} /></span>
          </h1>
          <p className="opacity-0 pointer-events-auto text-lg md:text-xl text-white/70 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            <WeightWave text="Find the best destinations and book flights in" baseWeight={400} hoverWeight={700} influenceRadius={5} duration={1} />
            <br className="hidden md:block"/>
            <WeightWave text="seconds with real-time prices." baseWeight={400} hoverWeight={700} influenceRadius={5} duration={1} />
          </p>
          <button 
            disabled={isBuying}
            onClick={handleBuyTicket}
            className="opacity-0 pointer-events-auto mt-8 glass-liquid px-8 py-3.5 rounded-full text-white font-medium hover:bg-white/10 disabled:opacity-50 disabled:cursor-wait transition-colors flex items-center justify-center gap-2 min-w-[160px]">
            {isBuying ? <Loader2 size={20} className="animate-spin" /> : "Buy Ticket Now"}
          </button>
        </div>

        {/* Absolute Left Column (Flight Status) */}
        <div ref={leftColRef} className="absolute bottom-10 2xl:bottom-[12%] left-4 lg:left-10 hidden lg:flex flex-col gap-6 pointer-events-auto opacity-100 z-10 transform scale-[0.75] xl:scale-[0.85] origin-bottom-left">
          {/* Widget 1: Status */}
          <div className="glass-liquid rounded-[32px] p-6 w-[300px]">
            <div className="flex justify-between items-center mb-5">
              <div className="text-left">
                <div className="text-xl font-medium text-white tracking-wide">LOS</div>
                <div className="text-[10px] text-white/60 mb-0.5">Lagos</div>
                <div className="text-xs text-azure-500 font-medium">06:00</div>
              </div>
              <div className="flex-1 flex items-center justify-center px-3 relative">
                <div className="w-full h-0 border-t border-dashed border-white/20"></div>
                <Plane className="absolute text-white/70 w-4 h-4 transform rotate-90 bg-ink-900 rounded-full" />
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-white tracking-wide">NYC</div>
                <div className="text-[10px] text-white/60 mb-0.5">New York</div>
                <div className="text-xs text-azure-500 font-medium">06:00</div>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 mb-5" />

            <div className="flex justify-between items-center relative">
              <div className="text-left">
                <div className="text-xl font-medium text-white tracking-wide">PVG</div>
                <div className="text-[10px] text-white/60 mb-0.5">Shanghai</div>
                <div className="text-xs text-azure-500 font-medium">06:00</div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 relative">
                <div className="px-2 py-0.5 bg-white rounded-md text-ink-900 text-[9px] font-bold z-10 absolute -top-2 left-1/2 transform -translate-x-1/2 leading-none inline-flex items-center justify-center pt-1 shadow-md">Delayed</div>
                <div className="w-full h-0 border-t border-dashed border-white/20 mt-1"></div>
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-white tracking-wide">HKG</div>
                <div className="text-[10px] text-white/60 mb-0.5">Hong Kong</div>
                <div className="text-xs text-azure-500 font-medium">06:00</div>
              </div>
            </div>
          </div>

          {/* Widget 2: Boarding */}
          <div className="glass-liquid rounded-[32px] p-6 w-[300px] flex flex-col items-center text-white">
            <div className="px-3 py-1 border border-white/10 bg-white/10 rounded-sm text-[10px] font-medium text-white tracking-wide mb-3">
              Now Boarding
            </div>
            <div className="text-xs font-semibold mb-3 tracking-wide text-white">Flight 739-283</div>
            
            <div className="w-full flex justify-between items-center mb-6 px-1 text-white">
               <div className="text-xs font-medium tracking-wider">LOS</div>
               <div className="flex-1 flex items-center justify-center mx-2 relative">
                  <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                     <div className="w-[50%] h-full bg-white"></div>
                  </div>
                  <Plane className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white w-3 h-3 transform rotate-90" fill="currentColor"/>
               </div>
               <div className="text-xs font-medium tracking-wider">NYC</div>
            </div>

            <div className="w-full">
               <div className="flex justify-between text-[10px] text-white/60 mb-1.5 font-medium">
                 <span>Capacity</span>
                 <span className="text-white font-bold">80%</span>
               </div>
               <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-azure-500 w-[80%] rounded-full shadow-[0_0_10px_rgba(43,91,255,0.5)]"></div>
               </div>
            </div>
            
            <div className="flex mt-5 w-full items-center justify-start pointer-events-none">
               <div className="flex -space-x-2">
                 <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/80?img=1" alt="Avatar"/>
                 <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/80?img=2" alt="Avatar"/>
                 <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/80?img=3" alt="Avatar"/>
                 <img className="w-6 h-6 rounded-full border border-white object-cover" src="https://i.pravatar.cc/80?img=4" alt="Avatar"/>
                 <div className="w-6 h-6 rounded-full border border-white bg-azure-500 text-white flex items-center justify-center text-[8px] font-bold">+10</div>
               </div>
            </div>
          </div>
        </div>

        {/* Absolute Right Column (Controls & Search) */}
        <div ref={rightColRef} className="absolute bottom-0 2xl:bottom-[5%] right-4 lg:right-10 hidden lg:flex gap-5 pointer-events-auto z-10 transform scale-[0.65] xl:scale-[0.75] origin-bottom-right">
           
           {/* Left slim vertical nav */}
           <div className="glass-liquid rounded-full p-2 py-4 flex flex-col gap-4 items-center justify-center h-fit my-auto shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-300 shadow-sm">
                <Wallet size={20} strokeWidth={2} />
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-azure-500 text-white cursor-pointer shadow-[0_0_20px_rgba(43,91,255,0.4)]">
                <Home size={20} fill="currentColor" className="text-white" />
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-300 shadow-sm">
                <Settings size={20} strokeWidth={2} />
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-ink-900 hover:text-black hover:bg-white cursor-pointer transition-colors duration-300 mt-2 shadow-sm">
                <Plane size={18} strokeWidth={2.5} className="transform rotate-[0deg] -rotate-45" />
              </div>
           </div>

           {/* Booking Card */}
           <div className="glass-liquid rounded-[40px] p-8 w-[420px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] backdrop-blur-[40px]">
                
                {/* Tabs */}
                <div className="flex justify-between items-center mb-8 pl-1 pr-4">
                  <div className="px-6 py-2.5 bg-white text-ink-900 rounded-full font-medium text-[13px] text-center cursor-pointer shadow-sm">Round Trip</div>
                  <div className="text-white/70 font-medium text-[13px] text-center cursor-pointer hover:text-white transition-colors">One Way</div>
                  <div className="text-white/70 font-medium text-[13px] text-center cursor-pointer hover:text-white transition-colors">Multi-City</div>
                </div>

                {/* Form Elements */}
                <div className="relative mb-6 flex flex-col gap-3">
                  <div className="glass-input rounded-full py-4 px-6 flex items-center justify-between cursor-pointer group hover:bg-white/5 transition-colors">
                     <span className="text-sm font-medium text-white tracking-wide">Jakarta (CKG)</span>
                  </div>
                  <div className="glass-input rounded-full py-4 px-6 flex items-center justify-between cursor-pointer group hover:bg-white/5 transition-colors">
                     <span className="text-sm font-medium text-white tracking-wide">Tokyo (NRT)</span>
                  </div>
                  
                  {/* Floating Swap Button */}
                  <div className="absolute top-[58px] -translate-y-1/2 right-6 w-8 h-8 rounded-full bg-white text-ink-900 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.1)] z-10 cursor-pointer hover:scale-110 transition-transform">
                    <ArrowUpDown size={14} className="stroke-[2.5]" />
                  </div>

                  <div className="glass-input rounded-full py-4 px-6 flex items-center justify-between mt-2 cursor-pointer group hover:bg-white/5 transition-colors">
                     <span className="text-sm font-medium text-white/70 tracking-wide">Mar 10, 2026</span>
                  </div>
                  <div className="glass-input rounded-full py-4 px-6 flex items-center justify-between cursor-pointer group hover:bg-white/5 transition-colors">
                     <span className="text-sm font-medium text-white/70 tracking-wide">1 Adult, Baby</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8 cursor-pointer pl-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-transparent border border-white/20 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[12px] text-white/70 font-medium">I accept the Terms & Conditions.</span>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex-1 flex items-center justify-center gap-2 !bg-azure-500 hover:!bg-azure-600 disabled:opacity-80 disabled:cursor-not-allowed !text-white rounded-full py-4 font-medium text-[16px] shadow-[0_0_30px_rgba(43,91,255,0.3)] focus:outline-none focus:ring-2 focus:ring-azure-500 transition-all">
                    {isSearching ? <Loader2 size={20} className="animate-spin text-white" /> : "Search"}
                  </button>
                  <button className="w-[56px] h-[56px] rounded-full !bg-white hover:!bg-gray-100 !text-ink-900 flex items-center justify-center shrink-0 shadow-lg group focus:outline-none focus:ring-2 focus:ring-white">
                    <Plane size={20} fill="currentColor" className="transform rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
             </div>
          </div>
      </div>
      
      {/* Dark gradient overlays to blend edges */}
      <div className="absolute inline-block top-0 left-0 w-full h-32 bg-gradient-to-b from-ink-900 via-ink-900/50 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent z-0 pointer-events-none"></div>
    </section>
  );
}
