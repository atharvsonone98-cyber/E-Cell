import React, { useState } from 'react';
import { AchievementItem } from '../../types';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Crown,
  Medal
} from 'lucide-react';

interface EcellHallOfFameProps {
  achievements: AchievementItem[];
  onNavigate: (path: string) => void;
}

export const EcellHallOfFame: React.FC<EcellHallOfFameProps> = ({
  achievements,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Award', 'Competition Win', 'Recognition', 'Ecosystem'];

  const filteredAchievements = achievements.filter(ach => {
    if (selectedCategory === 'All') return true;
    return ach.category === selectedCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>HALL OF FAME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            E-CELL HALL OF FAME
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Celebrating institutional accolades, national hackathon podiums, and benchmark student ventures from SSGMCE.
          </p>
        </div>

        {/* Filter Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hall of Fame Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-3xl bg-[#090e1f]/85 border border-amber-500/20 hover:border-amber-400/50 backdrop-blur-xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all hover:scale-[1.02] group relative overflow-hidden"
          >
            {/* Subtle Gold Aura */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

            <div className="space-y-3 z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
                  {item.badgeIcon || '🏆'}
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  {item.year}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-amber-400/90 mt-1">
                  {item.awardName}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Conferred by: {item.awardedBy}
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {item.stats && (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs z-10">
                <span className="text-slate-400">Impact Milestone</span>
                <span className="font-mono font-bold text-emerald-400">{item.stats}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => onNavigate('/achievements')}
          className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2"
        >
          <span>View Complete Institutional Archives</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </section>
  );
};
