import React from 'react';

interface SectionConnectorProps {
  fromLabel?: string;
  toLabel?: string;
  variant?: 'horizontal' | 'flow' | 'minimal';
}

export const SectionConnector: React.FC<SectionConnectorProps> = ({
  fromLabel,
  toLabel,
  variant = 'horizontal'
}) => {
  return (
    <div className="relative w-full py-12 flex items-center justify-center pointer-events-none overflow-hidden select-none">
      {/* Central horizontal luminous track */}
      <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      {/* Moving energy pulse dot along line */}
      <div 
        className="absolute w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse-subtle"
        style={{
          boxShadow: '0 0 12px rgba(34, 211, 238, 0.6)'
        }}
      />

      {/* Floating center marker badge if labels provided */}
      {fromLabel && toLabel ? (
        <div className="relative z-10 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0b132b]/80 border border-white/5 backdrop-blur-md text-[10px] uppercase tracking-widest text-slate-400">
          <span className="text-slate-500">{fromLabel}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-ping" />
          <span className="text-blue-400 font-semibold">{toLabel}</span>
        </div>
      ) : (
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>
      )}

      {/* Ambient background soft glow */}
      <div className="absolute w-64 h-8 bg-blue-500/5 blur-xl rounded-full" />
    </div>
  );
};
