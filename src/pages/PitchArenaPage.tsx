import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { PitchItem } from '../types';
import { 
  Trophy, 
  Mic2, 
  Plus, 
  ThumbsUp, 
  Eye, 
  Play, 
  FileText, 
  Sparkles, 
  Search, 
  Flame, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PitchSubmitModal } from '../components/PitchSubmitModal';

export const PitchArenaPage: React.FC = () => {
  const { pitches, votePitch } = useEcell();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const categories = ['All', 'CleanTech', 'HealthTech', 'FinTech', 'AI / Enterprise SaaS', 'EdTech'];

  const filteredPitches = pitches.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = p.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.founderName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">Startup Pitch Arena</span>
            <span className="text-[10px] bg-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded-full font-bold">
              Demo Day Qualification Open
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Collegiate Venture Pitch Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Watch 90-second student pitch videos, review one-pagers, and upvote collegiate ventures into the upcoming Angel Demo Day.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:opacity-90 text-xs font-bold text-white shadow-xl shadow-fuchsia-500/25 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Your Pitch (+100 XP)</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pitch, venture, or founder..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-fuchsia-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pitches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPitches.map((pitch, idx) => {
          const isVoted = (pitch.votedBy || []).includes(user?.id || '');
          return (
            <div
              key={pitch.id}
              className="rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all overflow-hidden flex flex-col justify-between group shadow-xl relative"
            >
              {/* Rank Badge for top 3 */}
              {idx < 3 && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[10px] shadow-lg">
                  <Flame className="w-3 h-3 fill-black" />
                  <span>#{idx + 1} Top Ranked</span>
                </div>
              )}

              <div>
                {/* Media banner */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 via-purple-900/40 to-slate-900" />
                  
                  <button
                    onClick={() => setActiveVideoModal(pitch.videoUrl || 'https://youtube.com')}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white z-10 transition-transform group-hover:scale-110 shadow-2xl"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </button>

                  <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                    {pitch.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                        {pitch.startupName}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">By {pitch.founderName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Market Size</span>
                      <span className="text-xs font-bold text-emerald-400">{pitch.market}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    "{pitch.tagline}"
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs text-slate-300">
                    <p><strong className="text-white">Problem:</strong> {pitch.problem.slice(0, 70)}...</p>
                    <p><strong className="text-indigo-400">Solution:</strong> {pitch.solution.slice(0, 70)}...</p>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
                <button
                  onClick={() => votePitch(pitch.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isVoted
                      ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-white' : ''}`} />
                  <span>{pitch.votes} Votes</span>
                </button>

                {pitch.deckUrl && (
                  <a
                    href={pitch.deckUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Pitch Deck</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0f1424] border border-white/15 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-fuchsia-400 fill-fuchsia-400" />
                <span>Collegiate Pitch Video Stream</span>
              </h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-white/5 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl bg-black flex items-center justify-center border border-white/10 relative overflow-hidden">
              <div className="text-center space-y-2">
                <Play className="w-12 h-12 text-fuchsia-400 mx-auto animate-pulse" />
                <p className="text-xs font-semibold text-white">Streaming 90-Second Founder Pitch Video</p>
                <p className="text-[11px] text-slate-400">High-definition audio & interactive slide deck sync</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pitch Submit Modal */}
      <PitchSubmitModal isOpen={isSubmitModalOpen} onClose={() => setIsSubmitModalOpen(false)} />
    </div>
  );
};
