import React from 'react';

interface EcellBrandLogoProps {
  className?: string;
  onClick?: () => void;
  showText?: boolean;
}

export const EcellBrandLogo: React.FC<EcellBrandLogoProps> = ({ 
  className = '', 
  onClick,
  showText = true 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 select-none cursor-pointer group ${className}`}
    >
      {/* Lightbulb + Rocket Official Vector Icon */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-md group-hover:bg-sky-500/40 transition-colors" />

        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] group-hover:scale-105 transition-transform"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="rocketGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Bulb Outline */}
          <path
            d="M 32 62 C 24 54, 20 44, 20 34 C 20 17, 33 5, 50 5 C 67 5, 80 17, 80 34 C 80 44, 76 54, 68 62 L 64 74 L 36 74 Z"
            stroke="url(#bulbGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bulb Base Threading Lines */}
          <line x1="38" y1="80" x2="62" y2="80" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="86" x2="58" y2="86" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
          <line x1="46" y1="92" x2="54" y2="92" stroke="#c084fc" strokeWidth="3.5" strokeLinecap="round" />

          {/* Rocket Inside Bulb (shooting up-right at ~45deg) */}
          <g transform="translate(50, 42) rotate(-35) translate(-20, -25)">
            {/* Rocket Thruster Flame */}
            <path
              d="M 17 38 L 20 48 L 23 38 Z"
              fill="#38bdf8"
              opacity="0.9"
            />

            {/* Left Fin */}
            <path
              d="M 12 30 L 15 37 L 18 36 Z"
              fill="#818cf8"
            />

            {/* Right Fin */}
            <path
              d="M 28 30 L 25 37 L 22 36 Z"
              fill="#818cf8"
            />

            {/* Rocket Fuselage */}
            <path
              d="M 20 10 C 24 18, 25 28, 24 37 L 16 37 C 15 28, 16 18, 20 10 Z"
              fill="url(#rocketGrad)"
            />

            {/* Window Cockpit */}
            <circle cx="20" cy="22" r="3" fill="#0b1120" stroke="#ffffff" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-base sm:text-lg font-black tracking-wider text-white">
              E-CELL
            </span>
            <span className="text-base sm:text-lg font-black tracking-wider text-white">
              SSGMCE
            </span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase mt-1">
            BUILD. LAUNCH. LEAD.
          </span>
        </div>
      )}
    </div>
  );
};
