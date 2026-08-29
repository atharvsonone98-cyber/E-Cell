import React, { useState } from 'react';
import { Trophy, Award, Star, ShieldCheck, ArrowRight, Sparkles, Medal } from 'lucide-react';
import { motion } from 'motion/react';
import { AchievementItem } from '../../types';

interface HallOfFameSectionProps {
  achievements: AchievementItem[];
  onNavigate: (path: string) => void;
}

export const HallOfFameSection: React.FC<HallOfFameSectionProps> = ({ achievements, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Award', 'Recognition', 'Competition Win', 'Ecosystem'];

  const filtered = achievements.filter(ach => {
    if (selectedCategory === 'All') return true;
    return ach.category === selectedCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & PODIUMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            E-CELL HALL OF FAME
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Celebrating national awards, institutional milestones, competition podiums, and venture achievements earned by SSGMCE student innovators.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onNavigate('/achievements')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
        >
          <span>View All Podiums</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.slice(0, 6).map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-xl group transition-all"
          >
            <div className="space-y-3">
              {/* Badge Icon & Year */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
                  {ach.badgeIcon || '🏆'}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {ach.year}
                </span>
              </div>

              {/* Title & Category */}
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 uppercase tracking-wider">
                  {ach.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-2">
                  {ach.title}
                </h3>
              </div>

              {/* Award Details Box */}
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-0.5">
                <p className="text-xs font-bold text-slate-200">{ach.awardName}</p>
                <p className="text-[11px] text-slate-400">Awarded by: {ach.awardedBy}</p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {ach.description}
              </p>
            </div>

            {/* Benchmark / Stats footer */}
            {ach.stats && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Impact Milestone:</span>
                <span className="font-mono font-bold text-emerald-400">{ach.stats}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
