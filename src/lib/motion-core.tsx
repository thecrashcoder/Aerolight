import React, { useRef, useEffect, useState } from 'react';
import { gsap, ensureMotionCoreEase } from './gsap';

interface WeightWaveProps {
  text: string;
  className?: string;
  baseWeight?: number;
  hoverWeight?: number;
  duration?: number;
  ease?: string;
  influenceRadius?: number;
  falloffPower?: number;
  continuous?: boolean;
}

export function WeightWave({
  text,
  className = '',
  baseWeight = 300,
  hoverWeight = 700,
  duration = 1.0,
  ease,
  influenceRadius = 3,
  falloffPower = 1.5,
  continuous = false,
}: WeightWaveProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [charPositions, setCharPositions] = useState<{ x: number; width: number }[]>([]);
  const [activeEase, setActiveEase] = useState('power3.out');

  useEffect(() => {
    setActiveEase(ease || ensureMotionCoreEase());
  }, [ease]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Calculate positions
    const updatePositions = () => {
      // Need a slight delay to ensure fonts and layout are fully applied
      setTimeout(() => {
        const positions = charsRef.current.map((node) => {
          if (!node) return { x: 0, width: 0 };
          const rect = node.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            width: rect.width || 1, // Prevent division by zero
          };
        });
        setCharPositions(positions);
      }, 100);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [text]);

  const rafRef = useRef<number | null>(null);

  const calculateWeight = (distance: number) => {
    if (influenceRadius <= 0) return baseWeight;
    if (distance > influenceRadius + 1) return baseWeight;

    const normalized = Math.max(0, 1 - distance / (influenceRadius + 1));
    const shaped = Math.pow(normalized, falloffPower);

    return baseWeight + (hoverWeight - baseWeight) * shaped;
  };

  const applyGsap = (node: HTMLElement | null, weight: number, applyDuration?: number) => {
    if (!node) return;
    gsap.to(node, {
      fontWeight: weight,
      fontVariationSettings: `"wght" ${weight}`,
      duration: applyDuration !== undefined ? applyDuration : duration,
      ease: activeEase,
      overwrite: 'auto',
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (continuous) return;
    const mouseX = e.clientX;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      charsRef.current.forEach((node, i) => {
        const pos = charPositions[i];
        if (!pos || pos.width === 0) return;
        const distance = Math.abs(mouseX - pos.x) / pos.width;
        const weight = calculateWeight(distance);
        applyGsap(node, weight, 0.1);
      });
      rafRef.current = null;
    });
  };

  const handlePointerLeave = () => {
    if (continuous) return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    charsRef.current.forEach((node) => {
      applyGsap(node, baseWeight, duration);
    });
  };

  // Setup continuous animation if requested
  useEffect(() => {
    if (!continuous || charsRef.current.length === 0) return;
    
    charsRef.current.forEach((node, i) => {
      if (!node) return;
      
      gsap.to(node, {
        fontWeight: hoverWeight,
        fontVariationSettings: `"wght" ${hoverWeight}`,
        duration: duration,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.1,
      });
    });

    return () => {
      charsRef.current.forEach(node => {
        if (node) gsap.killTweensOf(node);
      });
    };
  }, [continuous, baseWeight, hoverWeight, duration]);

  const chars = text.split('');

  return (
    <span
      ref={containerRef}
      className={`inline-block align-baseline font-inherit text-inherit ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {chars.map((char, i) => {
        const isSpace = char === ' ' || char === '\u00A0';
        return (
          <span
            key={i}
            ref={(el) => (charsRef.current[i] = el)}
            style={{
              display: 'inline-block',
              whiteSpace: isSpace ? 'pre' : 'normal',
              pointerEvents: isSpace ? 'none' : 'auto',
              minWidth: isSpace ? '0.25em' : 'auto',
              fontWeight: baseWeight,
              fontVariationSettings: `"wght" ${baseWeight}`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
