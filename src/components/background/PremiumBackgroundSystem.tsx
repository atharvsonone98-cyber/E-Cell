import React from 'react';
import { EcellUniverse } from '../universe/EcellUniverse';

interface PremiumBackgroundProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const PremiumBackgroundSystem: React.FC<PremiumBackgroundProps> = ({ 
  currentPath = '/' 
}) => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Base Cinematic Void (#030712) */}
      <div className="absolute inset-0 bg-[#030712] z-0" />

      {/* Atmospheric Soft Aurora Drift (Slow 45s GPU Keyframe Animation) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-75">
        <div 
          className="absolute -top-[15%] -left-[10%] w-[700px] h-[700px] md:w-[950px] md:h-[950px] rounded-full bg-blue-600/[0.14] blur-[140px] animate-aurora-slow pointer-events-none transform-gpu"
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute top-[30%] -right-[15%] w-[650px] h-[650px] md:w-[900px] md:h-[900px] rounded-full bg-indigo-600/[0.12] blur-[150px] animate-aurora-reverse pointer-events-none transform-gpu"
          style={{ willChange: 'transform', animationDelay: '-12s' }}
        />
        <div 
          className="absolute -bottom-[15%] left-[25%] w-[750px] h-[750px] md:w-[1000px] md:h-[1000px] rounded-full bg-violet-600/[0.12] blur-[160px] animate-aurora-slow pointer-events-none transform-gpu"
          style={{ willChange: 'transform', animationDelay: '-22s' }}
        />
      </div>

      {/* Primary Cinematic E-CELL UNIVERSE SSGMCE Engine */}
      <div className="absolute inset-0 z-[2]">
        <EcellUniverse currentPath={currentPath} />
      </div>

      {/* Subtle Inset Ambient Glass Glow Border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] pointer-events-none z-[5]" />
    </div>
  );
};
