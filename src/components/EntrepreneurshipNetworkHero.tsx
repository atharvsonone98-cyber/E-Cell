import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Rocket, 
  Users, 
  Trophy, 
  Award, 
  Compass, 
  ArrowUpRight,
  Sparkles,
  Zap,
  Code,
  Calendar
} from 'lucide-react';
import { EcellLogo } from './EcellLogo';

interface NetworkNode {
  id: string;
  label: string;
  subtitle: string;
  quote: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  borderColor: string;
  bgGlow: string;
  x: number; // percentage offset from center
  y: number; // percentage offset from center
  count: string;
  targetPath: string;
}

const ECOSYSTEM_NODES: NetworkNode[] = [
  {
    id: 'ideas',
    label: 'IDEAS',
    subtitle: 'Genesis & Problem Finding',
    quote: 'Where every journey begins.',
    icon: Lightbulb,
    color: 'text-amber-400',
    glow: 'rgba(251, 191, 36, 0.5)',
    borderColor: 'border-amber-400/40',
    bgGlow: 'from-amber-500/20 to-transparent',
    x: 0,
    y: -38,
    count: '100+ Pitches',
    targetPath: '/pitch-arena'
  },
  {
    id: 'team',
    label: 'TEAM',
    subtitle: 'Team Navonmesh Leaders',
    quote: 'The people behind E-Cell.',
    icon: Users,
    color: 'text-blue-400',
    glow: 'rgba(59, 130, 246, 0.5)',
    borderColor: 'border-blue-400/40',
    bgGlow: 'from-blue-500/20 to-transparent',
    x: -38,
    y: 0,
    count: '42 Members',
    targetPath: '/committee'
  },
  {
    id: 'events',
    label: 'EVENTS',
    subtitle: 'Hackathons & Summits',
    quote: 'Experiences that bring students together.',
    icon: Calendar,
    color: 'text-emerald-400',
    glow: 'rgba(52, 211, 153, 0.5)',
    borderColor: 'border-emerald-400/40',
    bgGlow: 'from-emerald-500/20 to-transparent',
    x: 38,
    y: 0,
    count: '50+ Hosted',
    targetPath: '/events'
  },
  {
    id: 'innovation',
    label: 'INNOVATION',
    subtitle: 'Incubation & Prototypes',
    quote: 'Think. Create. Experiment.',
    icon: Zap,
    color: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.5)',
    borderColor: 'border-purple-400/40',
    bgGlow: 'from-purple-500/20 to-transparent',
    x: 0,
    y: 38,
    count: '15+ Startups',
    targetPath: '/initiatives'
  },
  {
    id: 'achievements',
    label: 'ACHIEVEMENTS',
    subtitle: 'National Recognitions',
    quote: 'Milestones worth celebrating.',
    icon: Trophy,
    color: 'text-yellow-400',
    glow: 'rgba(250, 204, 21, 0.5)',
    borderColor: 'border-yellow-400/40',
    bgGlow: 'from-yellow-500/20 to-transparent',
    x: 29,
    y: -29,
    count: '12+ Podiums',
    targetPath: '/achievements'
  },
  {
    id: 'mentors',
    label: 'MENTORS',
    subtitle: 'Alumni & Tech Guides',
    quote: 'Industry guidance & founders.',
    icon: Compass,
    color: 'text-indigo-400',
    glow: 'rgba(129, 140, 248, 0.5)',
    borderColor: 'border-indigo-400/40',
    bgGlow: 'from-indigo-500/20 to-transparent',
    x: 29,
    y: 29,
    count: '18+ Mentors',
    targetPath: '/mentors'
  },
  {
    id: 'students',
    label: 'STUDENTS',
    subtitle: 'Campus Builders Network',
    quote: '1000+ passionate creators.',
    icon: Rocket,
    color: 'text-cyan-400',
    glow: 'rgba(34, 211, 238, 0.5)',
    borderColor: 'border-cyan-400/40',
    bgGlow: 'from-cyan-500/20 to-transparent',
    x: -29,
    y: 29,
    count: '1000+ Reach',
    targetPath: '/community'
  },
  {
    id: 'workshops',
    label: 'WORKSHOPS',
    subtitle: 'Hands-on Labs',
    quote: 'Hands-on Technical & Product Labs.',
    icon: Code,
    color: 'text-pink-400',
    glow: 'rgba(244, 114, 182, 0.5)',
    borderColor: 'border-pink-400/40',
    bgGlow: 'from-pink-500/20 to-transparent',
    x: -29,
    y: -29,
    count: '25+ Labs',
    targetPath: '/events'
  }
];

export const EntrepreneurshipNetworkHero: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const [activeNode, setActiveNode] = useState<NetworkNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const triggerEnergyPulse = (x?: number, y?: number, color?: string) => {
    window.dispatchEvent(
      new CustomEvent('ecell-event-pulse', {
        detail: { x, y, color: color || '#818cf8' }
      })
    );
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full h-[500px] sm:h-[560px] rounded-[36px] bg-gradient-to-b from-[#080d1e]/90 to-[#04060e]/95 border border-white/10 backdrop-blur-2xl p-6 flex items-center justify-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] group select-none"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_68%)] pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full border border-blue-500/10 animate-ping opacity-15 pointer-events-none" style={{ animationDuration: '7s' }} />
      <div className="absolute w-[360px] h-[360px] rounded-full border border-indigo-500/10 pointer-events-none" />
      <div className="absolute w-[520px] h-[520px] rounded-full border border-purple-500/5 pointer-events-none" />

      {/* SVG Connecting Geometric Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="coreBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer Ring Connectors between cardinal nodes */}
        <polygon
          points="50%,12% 88%,50% 50%,88% 12%,50%"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Spoke Beams connecting to Center Core */}
        {ECOSYSTEM_NODES.map((node) => {
          const isNodeActive = activeNode?.id === node.id;
          const isCardinal = ['ideas', 'team', 'events', 'innovation'].includes(node.id);

          return (
            <g key={`spoke-${node.id}`}>
              <line
                x1="50%"
                y1="50%"
                x2={`${50 + node.x}%`}
                y2={`${50 + node.y}%`}
                stroke={isNodeActive ? 'rgba(56,189,248,0.9)' : isCardinal ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)'}
                strokeWidth={isNodeActive ? '2.5' : isCardinal ? '1.5' : '1'}
                strokeDasharray={isNodeActive ? 'none' : '3 3'}
                className="transition-all duration-300"
              />
              {/* Animated Light Flow Pulse along Cardinal Lines */}
              {isCardinal && (
                <circle r={isNodeActive ? '3' : '2'} fill="#38bdf8">
                  <animateMotion
                    path={`M 260 260 L ${260 + node.x * 4.5} ${260 + node.y * 4.5}`}
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Orbiting Interactive Ecosystem Nodes */}
      {ECOSYSTEM_NODES.map((node) => {
        const Icon = node.icon;
        const isHovered = activeNode?.id === node.id;
        const isCardinal = ['ideas', 'team', 'events', 'innovation'].includes(node.id);

        return (
          <motion.div
            key={node.id}
            style={{
              left: `calc(50% + ${node.x}% - ${isCardinal ? 42 : 36}px)`,
              top: `calc(50% + ${node.y}% - ${isCardinal ? 36 : 30}px)`,
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
            }}
            onMouseEnter={() => {
              setActiveNode(node);
              triggerEnergyPulse(undefined, undefined, node.glow);
            }}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => {
              triggerEnergyPulse();
              if (onNavigate) {
                onNavigate(node.targetPath);
              }
            }}
            className="absolute z-20 cursor-pointer flex flex-col items-center group/node"
            whileHover={{ scale: 1.14 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          >
            <div
              className={`rounded-2xl bg-[#090e1f]/95 border ${node.borderColor} flex flex-col items-center justify-center transition-all duration-300 shadow-xl relative overflow-hidden backdrop-blur-md ${
                isCardinal ? 'w-14 h-14 sm:w-16 sm:h-16 p-2 ring-1 ring-white/10' : 'w-11 h-11 sm:w-13 sm:h-13 p-1.5'
              }`}
              style={{
                boxShadow: isHovered ? `0 0 28px ${node.glow}` : '0 8px 24px rgba(0,0,0,0.6)'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${node.bgGlow} opacity-20 group-hover/node:opacity-80 transition-opacity`} />
              <Icon className={`${isCardinal ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'} ${node.color} relative z-10`} />
              {isCardinal && (
                <span className="text-[7.5px] sm:text-[8.5px] font-bold font-mono text-white/90 relative z-10 mt-0.5">
                  {node.count}
                </span>
              )}
            </div>

            <span className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-wider mt-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 ${node.color} shadow-md whitespace-nowrap`}>
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* Center Hub: E-CELL SSGMCE */}
      <motion.div
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
        }}
        onClick={() => triggerEnergyPulse()}
        className="relative z-30 flex flex-col items-center text-center cursor-pointer group/center"
      >
        <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_50px_rgba(59,130,246,0.45)] group-hover/center:shadow-[0_0_60px_rgba(59,130,246,0.7)] transition-all">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[22px] bg-[#060814] flex flex-col items-center justify-center p-3 relative overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_75%)]" />
            <EcellLogo size={36} variant="glow" animated={true} interactive={false} showText={false} />
            <span className="text-[10px] font-black tracking-tight text-white uppercase mt-1">
              E-CELL
            </span>
            <span className="text-[8px] font-mono text-blue-300 font-bold uppercase tracking-widest">
              SSGMCE
            </span>
          </div>
        </div>

        {/* Pulse Status Pill */}
        <div className="mt-2.5 px-3 py-0.5 rounded-full bg-[#0a122c]/90 border border-blue-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono font-bold text-blue-200 tracking-wider">
            ECOSYSTEM CORE
          </span>
        </div>
      </motion.div>

      {/* Glassmorphism Hover Card / Tooltip with User Specified Quotes */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm p-4 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-2xl z-40 shadow-[0_16px_36px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3.5"
          >
            <div className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-xl bg-white/5 border ${activeNode.borderColor} flex items-center justify-center shrink-0 shadow-inner`}>
                {React.createElement(activeNode.icon, { className: `w-5 h-5 ${activeNode.color}` })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    {activeNode.label}
                  </h4>
                  <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-white/5 ${activeNode.color}`}>
                    {activeNode.count}
                  </span>
                </div>
                <p className="text-[11.5px] font-medium text-slate-200 leading-snug mt-0.5">
                  &ldquo;{activeNode.quote}&rdquo;
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-sans">
                  {activeNode.subtitle}
                </p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-blue-400 shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Default Helper Footer */}
      {!activeNode && (
        <div className="absolute bottom-3.5 text-center pointer-events-none">
          <p className="text-[9.5px] sm:text-[10.5px] font-mono text-slate-400 tracking-wider">
            [ HOVER & CLICK NODES TO EXPLORE THE LIVING ECOSYSTEM ]
          </p>
        </div>
      )}
    </div>
  );
};
