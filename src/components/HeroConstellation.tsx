import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Calendar, 
  Trophy, 
  GraduationCap, 
  Rocket, 
  Users,
  ArrowUpRight
} from 'lucide-react';

interface ConstellationNode {
  id: string;
  label: string;
  subtitle: string;
  quote: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  angle: number; // Angle in degrees (0 = top, 60 = top-right, 120 = bot-right, 180 = bot, 240 = bot-left, 300 = top-left)
  targetPath: string;
  stat: string;
}

const NODES: ConstellationNode[] = [
  {
    id: 'ideas',
    label: 'IDEAS',
    subtitle: 'Discovery & Problem Finding',
    quote: 'Where every journey begins.',
    icon: Lightbulb,
    color: 'text-sky-300',
    glowColor: 'rgba(56, 189, 248, 0.7)',
    borderColor: 'border-sky-400/50',
    bgGradient: 'from-sky-500/20 to-blue-600/10',
    angle: 0, // 12 o'clock (top)
    targetPath: '/pitch-arena',
    stat: '100+ Pitches'
  },
  {
    id: 'events',
    label: 'EVENTS',
    subtitle: 'Workshops & Hackathons',
    quote: 'Experiences that bring students together.',
    icon: Calendar,
    color: 'text-indigo-300',
    glowColor: 'rgba(129, 140, 248, 0.7)',
    borderColor: 'border-indigo-400/50',
    bgGradient: 'from-indigo-500/20 to-purple-600/10',
    angle: 60, // 2 o'clock (top-right)
    targetPath: '/events',
    stat: '50+ Hosted'
  },
  {
    id: 'achievements',
    label: 'ACHIEVEMENTS',
    subtitle: 'National Podiums & Awards',
    quote: 'Milestones worth celebrating.',
    icon: Trophy,
    color: 'text-purple-300',
    glowColor: 'rgba(192, 132, 252, 0.7)',
    borderColor: 'border-purple-400/50',
    bgGradient: 'from-purple-500/20 to-pink-600/10',
    angle: 120, // 4 o'clock (bottom-right)
    targetPath: '/achievements',
    stat: '15+ Podiums'
  },
  {
    id: 'students',
    label: 'STUDENTS',
    subtitle: 'Campus Builders Network',
    quote: 'Passionate creators shaping the future.',
    icon: GraduationCap,
    color: 'text-cyan-300',
    glowColor: 'rgba(34, 211, 238, 0.7)',
    borderColor: 'border-cyan-400/50',
    bgGradient: 'from-cyan-500/20 to-blue-600/10',
    angle: 180, // 6 o'clock (bottom)
    targetPath: '/community',
    stat: '1000+ Students'
  },
  {
    id: 'innovation',
    label: 'INNOVATION',
    subtitle: 'Incubation & Prototypes',
    quote: 'Think. Create. Experiment.',
    icon: Rocket,
    color: 'text-blue-300',
    glowColor: 'rgba(59, 130, 246, 0.7)',
    borderColor: 'border-blue-400/50',
    bgGradient: 'from-blue-500/20 to-indigo-600/10',
    angle: 240, // 8 o'clock (bottom-left)
    targetPath: '/initiatives',
    stat: '15+ Startups'
  },
  {
    id: 'team',
    label: 'TEAM',
    subtitle: 'Team Navonmesh Leaders',
    quote: 'The passionate people behind E-Cell.',
    icon: Users,
    color: 'text-sky-300',
    glowColor: 'rgba(56, 189, 248, 0.7)',
    borderColor: 'border-sky-400/50',
    bgGradient: 'from-sky-500/20 to-indigo-600/10',
    angle: 300, // 10 o'clock (top-left)
    targetPath: '/committee',
    stat: '30+ Members'
  }
];

interface HeroConstellationProps {
  onNavigate?: (path: string) => void;
}

export const HeroConstellation: React.FC<HeroConstellationProps> = ({ onNavigate }) => {
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);

  const radiusPct = 40; // Percentage of distance from center to node centers

  const triggerEnergyPulse = (color?: string) => {
    window.dispatchEvent(
      new CustomEvent('ecell-event-pulse', {
        detail: { color: color || '#38bdf8' }
      })
    );
  };

  return (
    <div className="relative w-full aspect-square max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] mx-auto flex items-center justify-center select-none">
      {/* 1. Atmospheric Nebula Glow Clouds */}
      <div 
        className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-purple-600/20 blur-[90px] pointer-events-none"
      />
      <div 
        className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-fuchsia-600/15 blur-[100px] pointer-events-none"
      />
      <div 
        className="absolute top-1/4 -left-10 w-72 h-72 rounded-full bg-blue-600/20 blur-[90px] pointer-events-none"
      />
      <div 
        className="absolute -bottom-10 left-10 w-72 h-72 rounded-full bg-cyan-600/15 blur-[90px] pointer-events-none"
      />

      {/* 2. SVG Geometric Constellation Lines & Spokes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="cyanPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="spokeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
          </linearGradient>

          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer subtle star constellation mesh lines */}
        <path
          d="M 120,80 L 260,30 L 400,80 L 480,240 L 410,420 L 260,480 L 100,420 L 40,240 Z"
          fill="none"
          stroke="rgba(129, 140, 248, 0.12)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Node-to-Node Interconnecting Hexagon Ring */}
        {NODES.map((node, i) => {
          const nextNode = NODES[(i + 1) % NODES.length];
          const radA = ((node.angle - 90) * Math.PI) / 180;
          const radB = ((nextNode.angle - 90) * Math.PI) / 180;

          const x1 = 50 + radiusPct * Math.cos(radA);
          const y1 = 50 + radiusPct * Math.sin(radA);
          const x2 = 50 + radiusPct * Math.cos(radB);
          const y2 = 50 + radiusPct * Math.sin(radB);

          return (
            <line
              key={`ring-${node.id}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(56, 189, 248, 0.22)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Radial Spokes connecting each Node directly to Central Core */}
        {NODES.map((node) => {
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const x = 50 + radiusPct * Math.cos(rad);
          const y = 50 + radiusPct * Math.sin(rad);
          const isHovered = hoveredNode?.id === node.id;

          return (
            <g key={`spoke-${node.id}`}>
              <line
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                stroke={isHovered ? 'url(#cyanPurpleGrad)' : 'rgba(56, 189, 248, 0.35)'}
                strokeWidth={isHovered ? '2.5' : '1.4'}
                filter={isHovered ? 'url(#neonGlow)' : undefined}
                className="transition-all duration-300"
              />
              
              {/* Traveling Photon on Spoke */}
              <circle r={isHovered ? '3.5' : '2'} fill="#38bdf8">
                <animateMotion
                  path={`M 270,270 L ${270 + (x - 50) * 5.4},${270 + (y - 50) * 5.4}`}
                  dur={isHovered ? '1.8s' : '3.6s'}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Ambient floating constellation stars */}
        {[
          { cx: '15%', cy: '18%', r: 1.5, color: '#38bdf8' },
          { cx: '85%', cy: '15%', r: 2, color: '#c084fc' },
          { cx: '92%', cy: '60%', r: 1.5, color: '#818cf8' },
          { cx: '10%', cy: '75%', r: 2, color: '#38bdf8' },
          { cx: '75%', cy: '85%', r: 1.5, color: '#c084fc' },
          { cx: '25%', cy: '90%', r: 1.5, color: '#38bdf8' }
        ].map((star, i) => (
          <circle 
            key={i} 
            cx={star.cx} 
            cy={star.cy} 
            r={star.r} 
            fill={star.color} 
            opacity="0.6"
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* 3. Orbiting Nodes (6 Nodes) */}
      {NODES.map((node) => {
        const Icon = node.icon;
        const rad = ((node.angle - 90) * Math.PI) / 180;
        const xOffset = radiusPct * Math.cos(rad);
        const yOffset = radiusPct * Math.sin(rad);
        const isHovered = hoveredNode?.id === node.id;

        return (
          <motion.div
            key={node.id}
            style={{
              position: 'absolute',
              left: `calc(50% + ${xOffset}%)`,
              top: `calc(50% + ${yOffset}%)`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => {
              setHoveredNode(node);
              triggerEnergyPulse(node.glowColor);
            }}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => {
              triggerEnergyPulse(node.glowColor);
              if (onNavigate) {
                onNavigate(node.targetPath);
              }
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="z-20 flex flex-col items-center cursor-pointer group"
          >
            {/* Circular Node Button */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#070b19] border ${
                isHovered ? 'border-sky-400 ring-4 ring-sky-500/30' : 'border-blue-400/40'
              } flex items-center justify-center transition-all duration-300 relative shadow-2xl overflow-hidden`}
              style={{
                boxShadow: isHovered 
                  ? `0 0 35px ${node.glowColor}, inset 0 0 15px rgba(56, 189, 248, 0.4)` 
                  : '0 10px 25px rgba(0,0,0,0.8), inset 0 0 10px rgba(56, 189, 248, 0.15)'
              }}
            >
              {/* Inner Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${node.bgGradient} opacity-40 group-hover:opacity-90 transition-opacity`} />
              
              {/* Icon */}
              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${node.color} relative z-10 transition-transform group-hover:scale-110 drop-shadow-md`} />
            </div>

            {/* Label below node */}
            <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase mt-2 text-slate-200 group-hover:text-white transition-colors drop-shadow-lg ${
              isHovered ? 'text-sky-300' : ''
            }`}>
              {node.label}
            </span>
          </motion.div>
        );
      })}

      {/* 4. Center Core: E-CELL SSGMCE */}
      <motion.div
        onClick={() => triggerEnergyPulse('#818cf8')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-30 cursor-pointer flex flex-col items-center justify-center group"
      >
        {/* Outer Dynamic Glowing Rings */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 shadow-[0_0_60px_rgba(56,189,248,0.45)] group-hover:shadow-[0_0_80px_rgba(129,140,248,0.7)] transition-all flex items-center justify-center">
          {/* Orbital Cyan/Purple Ticks */}
          <div className="absolute inset-0 rounded-full border border-sky-400/40 animate-spin" style={{ animationDuration: '24s' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_10px_#38bdf8] absolute -top-1 left-1/2 -translate-x-1/2" />
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] absolute -bottom-1 left-1/2 -translate-x-1/2" />
          </div>

          {/* Deep Dark Center Disk */}
          <div className="w-full h-full rounded-full bg-[#030614] border border-white/20 flex flex-col items-center justify-center p-4 relative overflow-hidden backdrop-blur-xl">
            {/* Radial Inner Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,transparent_75%)] pointer-events-none" />
            
            {/* Brand Text */}
            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white uppercase drop-shadow-md">
              E-CELL
            </span>
            <span className="text-xs sm:text-sm font-black tracking-widest text-sky-300 uppercase mt-0.5 drop-shadow">
              SSGMCE
            </span>
          </div>
        </div>
      </motion.div>

      {/* 5. Tooltip Card on Hover */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-2xl z-40 shadow-[0_16px_36px_rgba(0,0,0,0.8)] flex items-center gap-3 whitespace-nowrap"
          >
            <div className={`w-8 h-8 rounded-xl bg-white/5 border ${hoveredNode.borderColor} flex items-center justify-center shrink-0`}>
              {React.createElement(hoveredNode.icon, { className: `w-4 h-4 ${hoveredNode.color}` })}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-wide">{hoveredNode.label}</span>
                <span className="text-[10px] font-mono text-sky-400 font-semibold">{hoveredNode.stat}</span>
              </div>
              <p className="text-[11px] text-slate-300">&ldquo;{hoveredNode.quote}&rdquo;</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-sky-400 shrink-0 ml-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
