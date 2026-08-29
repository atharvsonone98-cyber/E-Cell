import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Network, 
  Sparkles, 
  Calendar, 
  GraduationCap, 
  Users, 
  Lightbulb, 
  Rocket, 
  Layers, 
  Trophy,
  ArrowRight
} from 'lucide-react';

interface ActivityMapTreeProps {
  onNavigate: (path: string) => void;
}

export const ActivityMapTree: React.FC<ActivityMapTreeProps> = ({ onNavigate }) => {
  const [activeBranch, setActiveBranch] = useState<'events' | 'learning' | 'team'>('events');

  const branches = {
    events: {
      title: 'EVENTS & COMPETITIONS',
      desc: 'High-octane hackathons, inter-college pitching arenas, innovation conclaves, and business model simulations.',
      nodes: [
        { label: 'Campus Innovation Conclave', desc: 'Symposium bringing industry leaders & campus innovators together.' },
        { label: 'Prototyping Hackathons', desc: '24-hour sprint challenges solving real engineering and social problems.' },
        { label: 'Ideathon & Pitch Arena', desc: 'Presenting early concepts to venture scouts and angel evaluators.' },
        { label: 'Trading & Case Battles', desc: 'Financial modeling and market strategy simulations.' }
      ],
      path: '/events'
    },
    learning: {
      title: 'LEARNING & INCUBATION',
      desc: 'Masterclasses, technical bootcamps, 1-on-1 alumni mentorship, and prototype validation resources.',
      nodes: [
        { label: 'Industry Keynotes', desc: 'Interactive sessions with successful founders and venture partners.' },
        { label: 'Hands-on Bootcamps', desc: 'Tech stack building, business canvas drafting, and patent guidance.' },
        { label: 'Mentor Network', desc: 'Dedicated advisory from SSGMCE alumni working at top tech firms.' },
        { label: 'Pre-Incubation Sandbox', desc: 'Access to college prototyping lab equipment and grant guidance.' }
      ],
      path: '/initiatives'
    },
    team: {
      title: 'TEAM & ECOSYSTEM',
      desc: 'Student leadership wings fostering cross-disciplinary collaboration across all engineering branches.',
      nodes: [
        { label: 'Technical Wing', desc: 'Full-stack web architecture, automation, portal maintenance.' },
        { label: 'Publicity & PR', desc: 'Brand outreach, classroom connect, media partnerships.' },
        { label: 'Design & Motion', desc: 'Visual identity, creative media, event themes.' },
        { label: 'Operations & Sponsorship', desc: 'Event floor logistics, budget audits, sponsor relations.' }
      ],
      path: '/team'
    }
  };

  const current = branches[activeBranch];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider">
          <Network className="w-3.5 h-3.5" />
          <span>ACTIVITY MAP</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          WHAT WE DO
        </h2>
        <p className="text-sm text-slate-300">
          The operational architecture powering student innovation and venture creation.
        </p>
      </div>

      <div className="rounded-3xl bg-[#080d1e]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Branch Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'events', label: '1. EVENTS & SUMMITS', icon: Calendar },
            { id: 'learning', label: '2. LEARNING & MENTORSHIP', icon: GraduationCap },
            { id: 'team', label: '3. WINGS & DEPARTMENTS', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeBranch === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBranch(tab.id as any)}
                className={`p-4 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                    : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="text-xs font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Branch Content */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">{current.title}</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{current.desc}</p>
            </div>

            <button
              onClick={() => onNavigate(current.path)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-white text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <span>Explore Section</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.nodes.map((node, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                  <h4 className="text-sm font-bold text-white">{node.label}</h4>
                </div>
                <p className="text-xs text-slate-400 pl-4">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
