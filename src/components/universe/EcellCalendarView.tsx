import React, { useState } from 'react';
import { EventItem } from '../../types';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface EcellCalendarViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onNavigate: (path: string) => void;
}

export const EcellCalendarView: React.FC<EcellCalendarViewProps> = ({
  events,
  onSelectEvent,
  onNavigate
}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [selectedMonth, setSelectedMonth] = useState<string>('Mar');

  // Filter events matching selected month
  const monthEvents = events.filter(e => e.date.toLowerCase().includes(selectedMonth.toLowerCase()));

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>SEASON SCHEDULE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            E-CELL CALENDAR
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Track annual symposium schedules, registration deadlines, and hackathon dates across the academic term.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/events')}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-white text-xs font-bold transition-all self-start md:self-auto flex items-center gap-2"
        >
          <span>All Events List</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </div>

      <div className="rounded-3xl bg-[#080d1e]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Month Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {months.map(m => {
            const isSelected = selectedMonth === m;
            const hasEvents = events.some(e => e.date.toLowerCase().includes(m.toLowerCase()));
            return (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap relative ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20 font-black'
                    : 'bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{m}</span>
                {hasEvents && !isSelected && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-sky-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Month Events List */}
        <div className="space-y-4 pt-2">
          {monthEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-sky-500/30 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">
                        {event.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {event.date}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {event.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {event.location}
                    </span>
                    <span className="font-bold text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <p className="text-sm font-bold text-slate-300">
                No public flagship events scheduled for {selectedMonth}.
              </p>
              <p className="text-xs text-slate-500">
                Internal committee preparation, prototype building, and workshop curriculums are underway.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
