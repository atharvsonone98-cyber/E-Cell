import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, CheckCircle2, Users, Compass, Code, Mic2, Trophy, DollarSign, Rocket, ArrowRight } from 'lucide-react';

interface StageNode {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bgGlow: string;
  description: string;
}

const NODES: StageNode[] = [
  { id: 'idea', name: 'IDEA', subtitle: 'Problem Discovery', icon: Lightbulb, color: 'text-amber-400', bgGlow: 'rgba(251, 191, 36, 0.25)', description: 'Turn raw student observations into validated problem statements with quantified pain points.' },
  { id: 'validation', name: 'VALIDATION', subtitle: 'Customer Interviews', icon: CheckCircle2, color: 'text-emerald-400', bgGlow: 'rgba(52, 211, 153, 0.25)', description: 'Conduct 30+ non-biased customer discovery surveys to verify willingness-to-pay.' },
  { id: 'team', name: 'TEAM', subtitle: 'Co-Founder Matching', icon: Users, color: 'text-cyan-400', bgGlow: 'rgba(34, 211, 238, 0.25)', description: 'Pair technical builders with commercial GTM and UI/UX designers across college branches.' },
  { id: 'mentor', name: 'MENTOR', subtitle: 'Venture Guidance', icon: Compass, color: 'text-indigo-400', bgGlow: 'rgba(129, 140, 248, 0.25)', description: '1-on-1 weekly tactical reviews with YC alumni, venture partners, and product leaders.' },
  { id: 'mvp', name: 'MVP', subtitle: 'Rapid Prototype', icon: Code, color: 'text-violet-400', bgGlow: 'rgba(167, 139, 250, 0.25)', description: 'Ship an atomic functional product in 14 days using full-stack frameworks and AI.' },
  { id: 'pitch', name: 'PITCH', subtitle: 'Arena & Demo', icon: Mic2, color: 'text-fuchsia-400', bgGlow: 'rgba(232, 121, 249, 0.25)', description: 'Refine 3-minute investor pitch decks and practice tough Q&A objection teardowns.' },
  { id: 'comp', name: 'COMPETITION', subtitle: 'Pitch & Hackathons', icon: Trophy, color: 'text-yellow-400', bgGlow: 'rgba(250, 204, 21, 0.25)', description: 'Compete in national collegiate pitch battles with ₹10L+ in non-dilutive grant pools.' },
  { id: 'funding', name: 'FUNDING', subtitle: 'Angel Syndicates', icon: DollarSign, color: 'text-emerald-400', bgGlow: 'rgba(52, 211, 153, 0.25)', description: 'Facilitate direct seed investments, DST/NIDHI government grants, and SAFE notes.' },
  { id: 'startup', name: 'STARTUP', subtitle: 'Incubation & Scale', icon: Rocket, color: 'text-rose-400', bgGlow: 'rgba(251, 113, 133, 0.25)', description: 'Incorporate as an official DPIIT-recognized venture with campus incubator office space.' }
];

export const StartupNodeVisualizer: React.FC = () => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<StageNode | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeIndex(prev => (prev + 1) % NODES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const activeNode = hoveredNode || NODES[activeNodeIndex];

  return (
    <div className="relative w-full max-w-5xl mx-auto my-8 p-6 sm:p-8 rounded-[28px] bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Interactive Venture Journey</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">The 9-Stage Collegiate Incubation Pipeline</h3>
        </div>

        <div className="text-xs text-gray-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-1.5 self-start md:self-auto">
          <span>Click or hover any stage to inspect</span>
        </div>
      </div>

      {/* Nodes Track / Interactive Pipeline */}
      <div className="relative py-4 px-2 overflow-x-auto pb-4 scrollbar-thin">
        {/* Connection line background */}
        <div className="absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-white/5 rounded-full hidden sm:block pointer-events-none" />
        
        {/* Animated glowing progress line */}
        <motion.div 
          className="absolute top-1/2 left-8 h-1 -translate-y-1/2 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)] hidden sm:block pointer-events-none"
          animate={{ width: `${(activeNodeIndex / (NODES.length - 1)) * 90}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        <div className="flex items-center justify-between min-w-[700px] gap-2 relative z-10">
          {NODES.map((node, index) => {
            const Icon = node.icon;
            const isActive = node.id === activeNode.id;
            const isPassed = index <= activeNodeIndex;

            return (
              <button
                key={node.id}
                onClick={() => {
                  setActiveNodeIndex(index);
                  setHoveredNode(node);
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                className="group relative flex flex-col items-center focus:outline-none transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 relative ${
                    isActive
                      ? 'bg-white/10 border-white/40 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-110'
                      : isPassed
                      ? 'bg-indigo-950/40 border-indigo-500/30 hover:border-white/40'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 25px ${node.bgGlow}` : undefined
                  }}
                >
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? node.color : 'text-gray-400 group-hover:text-white'}`} />
                  
                  {/* Step number badge */}
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#050505] border border-white/15 text-[9px] font-bold text-gray-400 flex items-center justify-center">
                    0{index + 1}
                  </span>
                </div>

                <span className={`text-[11px] font-bold tracking-wider mt-2.5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                  {node.name}
                </span>
                <span className="text-[9px] text-gray-500 hidden sm:block truncate max-w-[70px]">
                  {node.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Callout Card */}
      <motion.div 
        key={activeNode.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{ backgroundColor: activeNode.bgGlow }}
          >
            {React.createElement(activeNode.icon, { className: `w-6 h-6 ${activeNode.color}` })}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 tracking-wider">STAGE {NODES.findIndex(n => n.id === activeNode.id) + 1} OF 9</span>
              <span className="text-gray-500">•</span>
              <span className="text-sm font-semibold text-white">{activeNode.name}: {activeNode.subtitle}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              {activeNode.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            Next: {NODES[(NODES.findIndex(n => n.id === activeNode.id) + 1) % NODES.length].name}
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </span>
        </div>
      </motion.div>
    </div>
  );
};
