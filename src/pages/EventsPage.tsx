import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { EventItem, WorkReportItem } from '../types';
import { 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  Trophy, 
  Users, 
  Video, 
  MapPin, 
  Clock, 
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  FileCheck,
  Flame,
  Award
} from 'lucide-react';
import { EventDetailModal } from '../components/EventDetailModal';
import { EcellWorkReportShowcase } from '../components/EcellWorkReportShowcase';

export const EventsPage: React.FC = () => {
  const { events, registerForEvent } = useEcell();
  const { user, isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showWorkReportShowcase, setShowWorkReportShowcase] = useState<boolean>(true);

  const categories = ['All', 'Hackathons', 'Competitions', 'Workshops', 'Pitch Competitions', 'Speaker Sessions', 'Networking', 'Bootcamps'];

  const filteredEvents = events.filter(e => {
    const matchesCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top E-Cell Work Report Showcase Highlight */}
      {showWorkReportShowcase && (
        <EcellWorkReportShowcase />
      )}

      {/* Header for Live Events */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 pt-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Live & Upcoming Calendar</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
              {events.length} Active Tracks
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            E-Cell Flagship Events & Pitch Arenas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Attend high-impact founder workshops, national pitch battles, and expert keynote sessions. Earn XP and verify certificates.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setShowWorkReportShowcase(!showWorkReportShowcase)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              showWorkReportShowcase
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>{showWorkReportShowcase ? 'Hide Work Report' : 'Show NEC Work Report'}</span>
          </button>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, topics, or venues..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List / Grid */}
      {filteredEvents.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white/[0.01] border border-white/10 space-y-2">
          <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-white">No events matching filter</p>
          <p className="text-xs text-slate-400">Try clearing your search query or category filter</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <div
              key={evt.id}
              className="rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden">
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1220] via-[#0e1220]/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-indigo-600 px-2.5 py-1 rounded-full shadow-lg">
                    {evt.category}
                  </span>
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/30">
                    +{evt.xpReward} XP
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-indigo-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                    {evt.isVirtual ? <Video className="w-3.5 h-3.5 text-cyan-400" /> : <MapPin className="w-3.5 h-3.5 text-emerald-400" />}
                    <span className="truncate">{evt.location}</span>
                  </div>

                  {evt.workshopTeam && evt.workshopTeam.length > 0 && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-indigo-300 font-semibold">Organized by:</span>
                      <span className="text-slate-300 truncate max-w-[170px]">
                        {evt.workshopTeam.map(m => m.name).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {evt.registeredCount} / {evt.capacity} Registered
                </span>
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md"
                >
                  View & RSVP Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map(evt => (
            <div
              key={evt.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img src={evt.bannerImage} alt={evt.title} className="w-20 h-20 rounded-xl object-cover shrink-0 hidden sm:block" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-white bg-indigo-600 px-2 py-0.5 rounded-full">
                      {evt.category}
                    </span>
                    <span className="text-[10px] text-amber-400 font-semibold">+{evt.xpReward} XP</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {evt.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                    <span>{evt.date} • {evt.time}</span>
                    <span>•</span>
                    <span>{evt.location}</span>
                    <span>•</span>
                    <span>{evt.registeredCount} Registered</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};
