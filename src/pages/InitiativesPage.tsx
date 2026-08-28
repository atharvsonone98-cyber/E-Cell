import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { Sparkles, Code, Trophy, Lightbulb, Compass, ShieldCheck, ArrowRight, CheckCircle2, BookOpen, Users } from 'lucide-react';
import { JoinModal } from '../components/JoinModal';
import { motion } from 'motion/react';

interface InitiativesPageProps {
  onNavigate?: (path: string) => void;
}

export const InitiativesPage: React.FC<InitiativesPageProps> = ({ onNavigate }) => {
  const { initiatives } = useEcell();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('Technical');

  const categories = ['All', 'Workshops & Labs', 'Competitions & Hackathons', 'Startup Awareness', 'Mentorship & Incubation'];

  const filteredInitiatives = initiatives.filter(i => {
    if (selectedCategory === 'All') return true;
    return i.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono font-bold tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PORTFOLIO OF PROGRAMS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          E-CELL INITIATIVES
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Structured programs running year-round designed to take students from curious learners to confident startup builders and technical leaders.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Initiatives Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredInitiatives.map((init, index) => (
          <motion.div
            key={init.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {init.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {init.frequency}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {init.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {init.description}
              </p>

              {/* Target Audience */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>Target Audience:</strong> {init.targetAudience}</span>
              </div>

              {/* Key Outcomes */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Deliverables & Outcomes
                </h4>
                <div className="space-y-1.5">
                  {init.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer CTAs */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400">E-Cell SSGMCE</span>
              <button
                onClick={() => {
                  setSelectedDomain(init.category.includes('Technical') ? 'Technical' : 'Management');
                  setIsJoinOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Participate / Volunteer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        defaultDomain={selectedDomain}
      />
    </div>
  );
};
