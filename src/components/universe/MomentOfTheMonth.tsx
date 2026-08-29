import React from 'react';
import { EventItem, AchievementItem } from '../../types';
import { motion } from 'motion/react';
import { Sparkles, Calendar, MapPin, ArrowRight, Award, Trophy } from 'lucide-react';

interface MomentOfTheMonthProps {
  events: EventItem[];
  achievements: AchievementItem[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (path: string) => void;
}

export const MomentOfTheMonth: React.FC<MomentOfTheMonthProps> = ({
  events,
  achievements,
  onSelectEvent,
  onNavigate
}) => {
  // Highlight top featured event or achievement
  const featuredEvent = events.find(e => e.featured) || events[0];
  const featuredAchievement = achievements.find(a => a.featured) || achievements[0];

  if (!featuredEvent) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl p-[1.5px] bg-gradient-to-r from-purple-500/40 via-sky-500/40 to-pink-500/40 shadow-2xl overflow-hidden">
        <div className="relative rounded-[22px] bg-[#070c1d]/95 backdrop-blur-2xl p-6 sm:p-10 overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Image Spotlight */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-video sm:aspect-[16/10] bg-slate-950 border border-white/10 shadow-2xl group">
              <img
                src={featuredEvent.bannerImage}
                alt={featuredEvent.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500 text-white shadow-lg">
                  MOMENT OF THE MONTH
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-mono text-sky-400 font-bold block mb-1">
                  {featuredEvent.category} • {featuredEvent.date}
                </span>
                <h4 className="text-lg font-bold text-white leading-tight">
                  {featuredEvent.title}
                </h4>
              </div>
            </div>

            {/* Right: Content & Significance */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED HIGHLIGHT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {featuredEvent.tagline || 'Empowering Future Founders at SSGMCE'}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredEvent.description}
              </p>

              {featuredAchievement && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-lg">
                    🏆
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      Accomplishment
                    </span>
                    <p className="text-xs font-bold text-white">
                      {featuredAchievement.title}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectEvent(featuredEvent)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-sky-500/25"
                >
                  <span>Experience This Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/events')}
                  className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all"
                >
                  All Milestones
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
