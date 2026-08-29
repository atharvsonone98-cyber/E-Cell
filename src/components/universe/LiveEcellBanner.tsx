import React from 'react';
import { EventItem } from '../../types';
import { Radio, Calendar, MapPin, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface LiveEcellBannerProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (path: string) => void;
}

export const LiveEcellBanner: React.FC<LiveEcellBannerProps> = ({
  events,
  onSelectEvent,
  onNavigate
}) => {
  // Find currently ongoing or upcoming event
  const ongoingEvent = events.find(e => e.registrationOpen && (e.category === 'Hackathons' || e.category === 'Conferences')) 
    || events.find(e => e.registrationOpen)
    || events[0];

  if (!ongoingEvent) return null;

  const isOngoing = ongoingEvent.registrationOpen;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-sky-500/40 via-indigo-500/40 to-purple-500/40 shadow-2xl overflow-hidden group"
      >
        <div className="relative rounded-[22px] bg-[#060a17]/95 backdrop-blur-2xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left: Live Pulse Tag & Event Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 z-10">
            {/* Live Indicator Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 shrink-0 self-start sm:self-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">
                {isOngoing ? 'LIVE FROM E-CELL' : 'UPCOMING PULSE'}
              </span>
            </div>

            {/* Event Title & Subtitle */}
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-sky-300 transition-colors">
                  {ongoingEvent.title}
                </h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  {ongoingEvent.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  {ongoingEvent.date}
                </span>
                {ongoingEvent.time && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {ongoingEvent.time}
                  </span>
                )}
                {ongoingEvent.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {ongoingEvent.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end z-10">
            <button
              onClick={() => onSelectEvent(ongoingEvent)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all"
            >
              View Story
            </button>
            <button
              onClick={() => onSelectEvent(ongoingEvent)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02]"
            >
              <span>{ongoingEvent.registrationOpen ? 'Register Now' : 'Event Details'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
