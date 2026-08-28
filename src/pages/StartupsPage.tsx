import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { StartupItem } from '../types';
import { 
  Rocket, 
  Search, 
  Plus, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  Globe, 
  Sparkles,
  ExternalLink,
  Target
} from 'lucide-react';
import { StartupDetailModal } from '../components/StartupDetailModal';
import { StartupSubmitModal } from '../components/StartupSubmitModal';

export const StartupsPage: React.FC = () => {
  const { startups, likeStartup } = useEcell();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedStartup, setSelectedStartup] = useState<StartupItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const industries = ['All', 'CleanTech', 'AI / SaaS', 'HealthTech', 'FinTech', 'DeepTech', 'AgriTech'];
  const stages = ['All', 'Idea', 'MVP', 'Early Traction', 'Growth', 'Funded'];

  const filteredStartups = startups.filter(s => {
    const matchesInd = selectedIndustry === 'All' || s.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesStg = selectedStage === 'All' || s.stage === selectedStage;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.founderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.technology.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesInd && matchesStg && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Campus Ventures</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
              {startups.length} Ventures Active
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Collegiate Startup Showcase
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Explore verified student-founded ventures from proof-of-concept prototypes to venture-funded technology companies.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-90 text-xs font-bold text-white shadow-xl shadow-indigo-500/25 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Your Startup (+200 XP)</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search startup name, tech, or founder..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Industry & Stage filter bars */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {stages.map(stg => (
              <button
                key={stg}
                onClick={() => setSelectedStage(stg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStage === stg
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredStartups.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-white/[0.01] border border-white/10 space-y-2">
          <Rocket className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-white">No startups found matching your filter</p>
          <p className="text-xs text-slate-400">Try adjusting your industry or stage selection</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map(stp => {
            const isLiked = (stp.likedBy || []).includes(user?.id || '');
            return (
              <div
                key={stp.id}
                className="rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Banner */}
                  <div className="relative h-36 w-full overflow-hidden">
                    <img src={stp.banner} alt={stp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1220] via-[#0e1220]/40 to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      {stp.industry}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-cyan-300 bg-cyan-950/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-cyan-500/30">
                      {stp.stage}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={stp.logo} alt={stp.name} className="w-10 h-10 rounded-xl bg-white/10 p-0.5 object-cover shrink-0 border border-white/15" />
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                          {stp.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium truncate max-w-[190px]">{stp.tagline}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {stp.solution}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {stp.technology.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
                  <button
                    onClick={() => likeStartup(stp.id)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isLiked ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                    <span>{stp.likes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedStartup(stp)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Venture Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <StartupDetailModal startup={selectedStartup} onClose={() => setSelectedStartup(null)} />
      <StartupSubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
    </div>
  );
};
