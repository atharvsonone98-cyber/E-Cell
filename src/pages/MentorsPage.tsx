import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { MentorItem } from '../types';
import { 
  Compass, 
  Search, 
  Star, 
  Calendar, 
  Clock, 
  Linkedin, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Shield
} from 'lucide-react';
import { MentorRequestModal } from '../components/MentorRequestModal';

export const MentorsPage: React.FC = () => {
  const { mentors } = useEcell();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState<MentorItem | null>(null);

  const expertises = ['All', 'Fundraising', 'Product', 'Tech Architecture', 'Go-To-Market', 'AI', 'CleanTech'];

  const filteredMentors = mentors.filter(m => {
    const matchesExp = selectedExpertise === 'All' || m.expertise.some(e => e.toLowerCase().includes(selectedExpertise.toLowerCase()));
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.biography.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesExp && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Venture Mentorship</span>
            <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full font-bold">
              {mentors.length} Advisors Online
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Mentor Marketplace & Advisory Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Book 1-on-1 strategic consultations with YC alumni, venture capital partners, and product leaders to stress-test your startup milestones.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2.5 self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Complete 1-on-1 session to earn <strong>+40 XP</strong></span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentor by name, company, or skill..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {expertises.map(exp => (
            <button
              key={exp}
              onClick={() => setSelectedExpertise(exp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedExpertise === exp
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {exp}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      {filteredMentors.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white/[0.01] border border-white/10 space-y-2">
          <Compass className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-white">No mentors found matching filter</p>
          <p className="text-xs text-slate-400">Try clearing your search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mnt => (
            <div
              key={mnt.id}
              className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img src={mnt.avatar} alt={mnt.name} className="w-14 h-14 rounded-2xl object-cover border border-white/20" />
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                      {mnt.name}
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium">{mnt.role}</p>
                    <p className="text-[11px] text-slate-400 font-semibold">{mnt.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 py-2 border-y border-white/5">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{mnt.rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-[11px]">({mnt.reviewCount} reviews)</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{mnt.experienceYears} Years Exp</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {mnt.biography}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {mnt.expertise.map(exp => (
                    <span key={exp} className="text-[10px] bg-violet-950/40 border border-violet-500/20 text-violet-300 px-2 py-0.5 rounded-md">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  <span className="block font-medium text-slate-300">Available:</span>
                  <span className="truncate max-w-[130px] block">{mnt.availableDays.join(', ')}</span>
                </div>

                <button
                  onClick={() => setSelectedMentor(mnt)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-xs font-bold text-white transition-all shadow-md"
                >
                  Book 1-on-1
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <MentorRequestModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
    </div>
  );
};
