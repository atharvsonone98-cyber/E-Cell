import React, { useState } from 'react';
import { EventItem, GalleryItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  Layers, 
  Image as ImageIcon,
  ArrowRight,
  BookOpen,
  Trophy,
  Quote
} from 'lucide-react';

interface EventStoriesShowcaseProps {
  events: EventItem[];
  gallery: GalleryItem[];
  onSelectEvent: (event: EventItem) => void;
  onOpenLightbox?: (item: GalleryItem) => void;
}

export const EventStoriesShowcase: React.FC<EventStoriesShowcaseProps> = ({
  events,
  gallery,
  onSelectEvent,
  onOpenLightbox
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(() => {
    return events[0]?.id || '';
  });

  const [activePhase, setActivePhase] = useState<'before' | 'experience' | 'moment' | 'impact' | 'memory'>('before');

  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];

  if (!currentEvent) return null;

  // Find gallery photos related to this event
  const relatedGallery = gallery.filter(g => 
    g.eventName.toLowerCase().includes(currentEvent.title.toLowerCase()) ||
    currentEvent.title.toLowerCase().includes(g.eventName.toLowerCase())
  );

  const phases = [
    { id: 'before', label: '1. BEFORE THE EVENT', subtitle: 'Vision & Tracks', icon: Layers },
    { id: 'experience', label: '2. THE EXPERIENCE', subtitle: 'Speakers & Schedule', icon: BookOpen },
    { id: 'moment', label: '3. THE MOMENT', subtitle: 'Highlights & Atmosphere', icon: Sparkles },
    { id: 'impact', label: '4. THE IMPACT', subtitle: 'Outcomes & Reach', icon: Trophy },
    { id: 'memory', label: '5. THE MEMORY', subtitle: 'Photo Archives', icon: ImageIcon }
  ] as const;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EVENT STORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            THE E-CELL EXPERIENCE
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Every event at SSGMCE is a journey from initial brainstorm to lifelong student memory.
          </p>
        </div>

        {/* Event Quick Picker */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {events.slice(0, 5).map(ev => (
            <button
              key={ev.id}
              onClick={() => setSelectedEventId(ev.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedEventId === ev.id
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20 scale-[1.02]'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {ev.title.length > 22 ? ev.title.slice(0, 20) + '...' : ev.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Story Card */}
      <div className="rounded-3xl bg-[#080d1e]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Story Banner Header */}
        <div className="relative aspect-[21/7] sm:aspect-[21/6] w-full overflow-hidden bg-slate-950">
          <img
            src={currentEvent.bannerImage || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80'}
            alt={currentEvent.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d1e] via-[#080d1e]/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  {currentEvent.category}
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  {currentEvent.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {currentEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                {currentEvent.tagline || currentEvent.description}
              </p>
            </div>

            <button
              onClick={() => onSelectEvent(currentEvent)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all"
            >
              <span>Full Event Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5-Phase Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-white/10 bg-white/[0.02]">
          {phases.map(phase => {
            const Icon = phase.icon;
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`p-3.5 sm:p-4 text-left transition-all relative border-r border-white/5 last:border-r-0 ${
                  isActive
                    ? 'bg-sky-500/10 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider line-clamp-1">
                    {phase.label}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                  {phase.subtitle}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="activeStoryPhase"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Phase Content Area */}
        <div className="p-6 sm:p-8 min-h-[260px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activePhase === 'before' && (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    What is Happening?
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentEvent.description}
                  </p>
                  {currentEvent.prerequisites && currentEvent.prerequisites.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Prerequisites & Preparation:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentEvent.prerequisites.map((req, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                            • {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                    Event Logistics
                  </span>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Venue:</span>
                      <span className="font-semibold text-white">{currentEvent.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">XP Reward:</span>
                      <span className="font-mono font-bold text-sky-400">+{currentEvent.xpReward} XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Organizer:</span>
                      <span className="font-semibold text-white">{currentEvent.organizer}</span>
                    </div>
                    {currentEvent.prizePool && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Prize Pool:</span>
                        <span className="font-mono font-bold text-emerald-400">{currentEvent.prizePool}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activePhase === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  The Experience: Schedule & Speakers
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Schedule */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Event Itinerary
                    </p>
                    {currentEvent.schedule && currentEvent.schedule.length > 0 ? (
                      <div className="space-y-2">
                        {currentEvent.schedule.map((item, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                            <span className="text-xs font-mono font-bold text-indigo-400 shrink-0">{item.time}</span>
                            <div>
                              <p className="text-xs font-bold text-white">{item.title}</p>
                              <p className="text-[11px] text-slate-400">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">Full structured day itinerary provided during orientation.</p>
                    )}
                  </div>

                  {/* Speakers */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Distinguished Guests & Mentors
                    </p>
                    {currentEvent.speakers && currentEvent.speakers.length > 0 ? (
                      <div className="space-y-2">
                        {currentEvent.speakers.map((spk, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                            <img src={spk.avatar} alt={spk.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                            <div>
                              <p className="text-xs font-bold text-white">{spk.name}</p>
                              <p className="text-[11px] text-indigo-300">{spk.role} • {spk.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">Faculty coordinators and alumni founders mentoring students directly.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activePhase === 'moment' && (
              <motion.div
                key="moment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  The Moment: Highlights & Engagement
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <p className="text-2xl font-black text-sky-400">{currentEvent.registeredCount}+</p>
                    <p className="text-xs font-bold text-slate-300 mt-1">Student Participants</p>
                    <p className="text-[10px] text-slate-400">Engaged from all engineering departments</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <p className="text-2xl font-black text-indigo-400">100%</p>
                    <p className="text-xs font-bold text-slate-300 mt-1">Hands-on Execution</p>
                    <p className="text-[10px] text-slate-400">Real-time ideation & problem-solving</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <p className="text-2xl font-black text-purple-400">Verified</p>
                    <p className="text-xs font-bold text-slate-300 mt-1">Digital Certificates</p>
                    <p className="text-[10px] text-slate-400">Issued with unique QR verification</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activePhase === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  The Impact: Student Growth & Takeaways
                </h4>
                {currentEvent.takeaways && currentEvent.takeaways.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentEvent.takeaways.map((takeaway, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-300 leading-relaxed">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Participants developed tangible competencies in pitching, prototyping, financial modeling, and collaborative teamwork recognized by college administration.
                  </p>
                )}
              </motion.div>
            )}

            {activePhase === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-400" />
                  The Memory: Photo Archives
                </h4>

                {relatedGallery.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {relatedGallery.map(img => (
                      <div
                        key={img.id}
                        onClick={() => onOpenLightbox && onOpenLightbox(img)}
                        className="rounded-xl overflow-hidden aspect-video bg-slate-900 cursor-pointer border border-white/10 hover:border-sky-400 transition-all group"
                      >
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 rounded-2xl bg-white/[0.02] border border-white/5">
                    Images captured from this event are archived in the official E-Cell gallery.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
