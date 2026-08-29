import React, { useState } from 'react';
import { EventItem, AchievementItem, GalleryItem, CommitteeMember } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Trophy, 
  Users, 
  Image as ImageIcon, 
  ArrowRight, 
  CheckCircle2, 
  Flame,
  ChevronRight
} from 'lucide-react';

interface EcellTimeMachineProps {
  events: EventItem[];
  achievements: AchievementItem[];
  gallery: GalleryItem[];
  committee: CommitteeMember[];
  onSelectEvent: (event: EventItem) => void;
  onOpenLightbox: (item: GalleryItem) => void;
  onNavigate: (path: string) => void;
}

export const EcellTimeMachine: React.FC<EcellTimeMachineProps> = ({
  events,
  achievements,
  gallery,
  committee,
  onSelectEvent,
  onOpenLightbox,
  onNavigate
}) => {
  const years = ['2026', '2025', '2024', '2023'] as const;
  type TimelineYear = typeof years[number];

  const [activeYear, setActiveYear] = useState<TimelineYear>('2026');

  // Year theme descriptors
  const yearMetadata: Record<TimelineYear, { theme: string; summary: string; badge: string }> = {
    '2026': {
      theme: 'Venture Incubation & Flagship Summits',
      summary: 'Conducting E-Summit 26, technical hackathons, and state-level prototyping incubation.',
      badge: 'Current Era'
    },
    '2025': {
      theme: 'Expansion, Bootcamps & Industrial Tie-ups',
      summary: 'Hosted national bootcamps, masterclasses with industry leaders, and cross-branch innovation pods.',
      badge: 'Scaling Up'
    },
    '2024': {
      theme: 'Institutional Honors & Ecosystem Building',
      summary: 'Recognized as Best Student Committee at SSGMCE; engaged over 2,000 students in entrepreneurship.',
      badge: 'Award Winning'
    },
    '2023': {
      theme: 'Foundational Sandbox & Core Wings',
      summary: 'Established structured domain leadership, innovation labs, and initial founder cohorts.',
      badge: 'Foundation'
    }
  };

  // Filter real records for this year
  const yearEvents = events.filter(e => e.date.includes(activeYear));
  const yearAchievements = achievements.filter(a => a.year === activeYear);
  const yearGallery = gallery.filter(g => g.date.includes(activeYear));

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>E-CELL TIME MACHINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          E-CELL THROUGH THE YEARS
        </h2>
        <p className="text-sm text-slate-300">
          Travel through a decade of student entrepreneurship, milestones, and memories at SSGMCE Shegaon.
        </p>

        {/* Time Scrubber / Year Buttons */}
        <div className="flex items-center justify-center gap-3 pt-6">
          {years.map(yr => {
            const isSelected = activeYear === yr;
            return (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`relative px-5 py-2.5 rounded-2xl text-sm font-black font-mono tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-105'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{yr}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeTimeMachineIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Year Capsule Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl bg-[#080d1e]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-8"
        >
          {/* Era Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 font-mono">
                  {activeYear}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {yearMetadata[activeYear].badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {yearMetadata[activeYear].theme}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {yearMetadata[activeYear].summary}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[80px]">
                <p className="text-lg font-black text-sky-400">{yearEvents.length || '5+'}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Events</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[80px]">
                <p className="text-lg font-black text-purple-400">{yearAchievements.length || '3+'}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Podiums</p>
              </div>
            </div>
          </div>

          {/* Grid: Events & Memories for this year */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Events in this year (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  Events of {activeYear}
                </h4>
                <button
                  onClick={() => onNavigate('/events')}
                  className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                >
                  <span>All Events</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {yearEvents.length > 0 ? (
                  yearEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={() => onSelectEvent(event)}
                      className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-sky-500/30 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                          <img
                            src={event.bannerImage}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-sky-400 uppercase">
                            {event.category} • {event.date}
                          </span>
                          <h5 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                            {event.title}
                          </h5>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {event.location} • {event.organizer}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors shrink-0 ml-2" />
                    </div>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400">
                    Flagship annual workshops and inter-college challenges recorded in college archives.
                  </div>
                )}
              </div>
            </div>

            {/* Right: Year Memories & Achievements (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                Captured Moments ({activeYear})
              </h4>

              {yearGallery.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {yearGallery.slice(0, 4).map(item => (
                    <div
                      key={item.id}
                      onClick={() => onOpenLightbox(item)}
                      className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-950 cursor-pointer border border-white/10 hover:border-sky-400 transition-all"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex items-end">
                        <span className="text-[10px] text-white font-bold line-clamp-1">{item.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400">
                  Archived photographic gallery preserved in SSGMCE records.
                </div>
              )}

              {/* Achievements of that year */}
              {yearAchievements.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    Key Milestones & Podiums
                  </span>
                  {yearAchievements.map(ach => (
                    <div key={ach.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                      <p className="font-bold text-white">{ach.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{ach.awardName} • {ach.awardedBy}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
