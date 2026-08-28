import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { Award, Trophy, Star, ShieldCheck, Rocket, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const AchievementsPage: React.FC = () => {
  const { achievements } = useEcell();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Recognition', 'Award', 'Competition Win', 'Ecosystem'];

  const filteredAchievements = achievements.filter(a => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>HONORS & MILESTONES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          OUR ACHIEVEMENTS
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Recognizing the impact, competitive victories, and institutional honors earned by E-Cell SSGMCE and our incubated student ventures.
        </p>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">Top 10</p>
          <p className="text-xs font-bold text-slate-300">E-Cell in Central India</p>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹25L+</p>
          <p className="text-xs font-bold text-slate-300">Seed Grants Facilitated</p>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <p className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">500+</p>
          <p className="text-xs font-bold text-slate-300">Active Student Builders</p>
        </div>
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
          <p className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">100%</p>
          <p className="text-xs font-bold text-slate-300">Student Run & Executed</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach, index) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/40 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{ach.badgeIcon}</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {ach.year}
                </span>
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-400 uppercase tracking-wider">
                  {ach.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-2">
                  {ach.title}
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <p className="text-xs font-bold text-slate-200">{ach.awardName}</p>
                <p className="text-[11px] text-slate-400">Awarded by: {ach.awardedBy}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {ach.description}
              </p>
            </div>

            {ach.stats && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Benchmark:</span>
                <span className="font-mono font-bold text-emerald-400">{ach.stats}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
