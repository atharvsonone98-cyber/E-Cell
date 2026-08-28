import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Lightbulb, 
  Rocket, 
  Users, 
  Trophy, 
  Award, 
  GraduationCap, 
  Compass, 
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Code,
  Building2,
  Presentation
} from 'lucide-react';
import { EcellLogo } from './EcellLogo';

interface NetworkNode {
  id: string;
  label: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  borderColor: string;
  bgGlow: string;
  x: number;
  y: number;
  count: string;
  metric: string;
  targetPath: string;
}

const NODES: NetworkNode[] = [
  {
    id: 'workshops',
    label: 'WORKSHOPS',
    tagline: 'Hands-on Technical & Product Labs',
    icon: Code,
    color: 'text-cyan-400',
    glow: 'rgba(34, 211, 238, 0.4)',
    borderColor: 'border-cyan-400/40',
    bgGlow: 'from-cyan-500/20 to-transparent',
    x: -38,
    y: -32,
    count: '25+',
    metric: 'Annual Workshops',
    targetPath: '/events'
  },
  {
    id: 'hackathons',
    label: 'HACKATHONS',
    tagline: 'Srujan 24h & Sprint Arenas',
    icon: Trophy,
    color: 'text-amber-400',
    glow: 'rgba(251, 191, 36, 0.4)',
    borderColor: 'border-amber-400/40',
    bgGlow: 'from-amber-500/20 to-transparent',
    x: 0,
    y: -42,
    count: '15+',
    metric: 'National Competitions',
    targetPath: '/events'
  },
  {
    id: 'startup-sessions',
    label: 'STARTUP SESSIONS',
    tagline: 'Founder Case Studies & Mindset',
    icon: Lightbulb,
    color: 'text-yellow-400',
    glow: 'rgba(250, 204, 21, 0.4)',
    borderColor: 'border-yellow-400/40',
    bgGlow: 'from-yellow-500/20 to-transparent',
    x: 38,
    y: -32,
    count: '30+',
    metric: 'Discovery Sprints',
    targetPath: '/initiatives'
  },
  {
    id: 'pitch-arena',
    label: 'PITCH ARENA',
    tagline: 'Genesis Ideathon & Demo Days',
    icon: Presentation,
    color: 'text-rose-400',
    glow: 'rgba(251, 113, 133, 0.4)',
    borderColor: 'border-rose-400/40',
    bgGlow: 'from-rose-500/20 to-transparent',
    x: 46,
    y: 12,
    count: '₹1.5L+',
    metric: 'Prize Pools Awarded',
    targetPath: '/pitch-arena'
  },
  {
    id: 'mentorship',
    label: 'MENTORSHIP',
    tagline: '1-on-1 Guidance with Tech Leads',
    icon: Compass,
    color: 'text-indigo-400',
    glow: 'rgba(129, 140, 248, 0.4)',
    borderColor: 'border-indigo-400/40',
    bgGlow: 'from-indigo-500/20 to-transparent',
    x: 34,
    y: 42,
    count: '18+',
    metric: 'Industry Mentors',
    targetPath: '/mentors'
  },
  {
    id: 'incubation',
    label: 'INCUBATION',
    tagline: 'SSGMCE IIC & DST NIDHI Grants',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    glow: 'rgba(52, 211, 153, 0.4)',
    borderColor: 'border-emerald-400/40',
    bgGlow: 'from-emerald-500/20 to-transparent',
    x: 0,
    y: 45,
    count: '₹25L+',
    metric: 'Seed Capital Facilitated',
    targetPath: '/startups'
  },
  {
    id: 'achievements',
    label: 'ACHIEVEMENTS',
    tagline: 'Top 10 E-Cell in Western Region',
    icon: Award,
    color: 'text-fuchsia-400',
    glow: 'rgba(217, 70, 239, 0.4)',
    borderColor: 'border-fuchsia-400/40',
    bgGlow: 'from-fuchsia-500/20 to-transparent',
    x: -34,
    y: 42,
    count: '12+',
    metric: 'State & National Awards',
    targetPath: '/achievements'
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    tagline: '500+ Student Leaders & Builders',
    icon: Users,
    color: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.4)',
    borderColor: 'border-purple-400/40',
    bgGlow: 'from-purple-500/20 to-transparent',
    x: -46,
    y: 12,
    count: '1000+',
    metric: 'Active Students',
    targetPath: '/community'
  },
];

export const EntrepreneurshipNetworkHero: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const [activeNode, setActiveNode] = useState<NetworkNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full h-[480px] sm:h-[540px] rounded-[36px] bg-gradient-to-b from-[#0b0e1a]/95 to-[#070912]/95 border border-white/10 backdrop-blur-2xl p-6 flex items-center justify-center overflow-hidden shadow-2xl group select-none"
    >
      {/* Background Ambient Glowing Rings */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full border border-blue-500/10 animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '6s' }} />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-indigo-500/10 pointer-events-none" />
      <div className="absolute w-[560px] h-[560px] rounded-full border border-purple-500/5 pointer-events-none" />

      {/* Interactive SVG Network Connecting Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Center coordinates 50%, 50% */}
        {NODES.map((node) => {
          const isNodeActive = activeNode?.id === node.id;
          return (
            <g key={`line-${node.id}`}>
              <line
                x1="50%"
                y1="50%"
                x2={`${50 + node.x}%`}
                y2={`${50 + node.y}%`}
                stroke={isNodeActive ? 'rgba(99,102,241,0.85)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={isNodeActive ? '2.5' : '1.2'}
                strokeDasharray={isNodeActive ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
              {/* Traveling light particle */}
              <circle r="3" fill="#60a5fa">
                <animateMotion
                  path={`M ${250} ${250} L ${250 + node.x * 4} ${250 + node.y * 4}`}
                  dur={`${3 + Math.abs(node.x) * 0.04}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Orbiting / Surrounding Interactive Nodes */}
      {NODES.map((node) => {
        const Icon = node.icon;
        const isHovered = activeNode?.id === node.id;

        return (
          <motion.div
            key={node.id}
            style={{
              left: `calc(50% + ${node.x}% - 44px)`,
              top: `calc(50% + ${node.y}% - 36px)`,
              transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`
            }}
            onMouseEnter={() => setActiveNode(node)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => {
              if (onNavigate) {
                onNavigate(node.targetPath);
              }
            }}
            className="absolute z-20 cursor-pointer flex flex-col items-center group/node"
            whileHover={{ scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className={`w-13 h-13 sm:w-15 sm:h-15 p-2.5 rounded-2xl bg-[#0b0e1a]/90 border ${node.borderColor} flex flex-col items-center justify-center transition-all duration-300 shadow-xl relative overflow-hidden backdrop-blur-md`}
              style={{
                boxShadow: isHovered ? `0 0 30px ${node.glow}` : '0 8px 24px rgba(0,0,0,0.5)'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${node.bgGlow} opacity-30 group-hover/node:opacity-80 transition-opacity`} />
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${node.color} relative z-10`} />
              <span className="text-[8px] sm:text-[9px] font-bold font-mono tracking-tight text-white/90 relative z-10 mt-0.5">
                {node.count}
              </span>
            </div>

            <span className={`text-[9px] sm:text-[10px] font-bold tracking-wider mt-1 px-2 py-0.5 rounded-full bg-black/80 border border-white/10 ${node.color} shadow-md whitespace-nowrap`}>
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* Center Core: E-CELL SSGMCE HUB */}
      <motion.div
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
        }}
        className="relative z-30 flex flex-col items-center text-center cursor-default"
      >
        <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[22px] bg-[#070914] flex flex-col items-center justify-center p-3 relative overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
            <EcellLogo size={38} variant="glow" animated={true} interactive={false} showText={false} />
            <span className="text-[10px] font-black tracking-tighter text-white uppercase mt-1">
              E-CELL SSGMCE
            </span>
            <span className="text-[7.5px] font-mono text-blue-300 font-bold uppercase tracking-widest">
              ECOSYSTEM CORE
            </span>
          </div>
        </div>

        {/* Pulse Status Pill */}
        <div className="mt-3 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-blue-200 tracking-wider">
            COMMITTEE ACTIVE
          </span>
        </div>
      </motion.div>

      {/* Floating Node Inspection Tooltip Callout */}
      {activeNode && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xs p-3.5 rounded-2xl bg-black/95 border border-white/20 backdrop-blur-xl z-40 shadow-2xl flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              {React.createElement(activeNode.icon, { className: `w-5 h-5 ${activeNode.color}` })}
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{activeNode.label}</span>
                <span className={`text-[10px] font-bold ${activeNode.color}`}>({activeNode.count})</span>
              </p>
              <p className="text-[11px] text-slate-300 leading-tight mt-0.5">{activeNode.tagline}</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-blue-400 shrink-0" />
        </motion.div>
      )}

      {/* Bottom Subtitle / Prompt */}
      {!activeNode && (
        <div className="absolute bottom-4 text-center pointer-events-none">
          <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 tracking-wider">
            [ CLICK ANY INITIATIVE NODE TO EXPLORE E-CELL PROGRAMS ]
          </p>
        </div>
      )}
    </div>
  );
};
