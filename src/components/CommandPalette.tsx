import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEcell } from '../context/EcellContext';
import { Search, Calendar, Rocket, Compass, BookOpen, MessageSquare, X, ArrowRight, Sparkles, Users } from 'lucide-react';

interface CommandPaletteProps {
  onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const { isCommandPaletteOpen, setCommandPaletteOpen, events, startups, mentors, resources, posts } = useEcell();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredEvents = q ? events.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)).slice(0, 3) : events.slice(0, 2);
  const filteredStartups = q ? startups.filter(s => s.name.toLowerCase().includes(q) || s.industry.toLowerCase().includes(q) || s.founderName.toLowerCase().includes(q)).slice(0, 3) : startups.slice(0, 2);
  const filteredMentors = q ? mentors.filter(m => m.name.toLowerCase().includes(q) || m.expertise.some(exp => exp.toLowerCase().includes(q))).slice(0, 3) : mentors.slice(0, 2);
  const filteredResources = q ? resources.filter(r => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)).slice(0, 3) : resources.slice(0, 2);
  const filteredPosts = q ? posts.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))).slice(0, 3) : posts.slice(0, 2);

  const quickNav = [
    { title: 'E-Cell SSGMCE Committee & Leads', path: '/committee', icon: Users, color: 'text-indigo-300' },
    { title: 'Workshops & Events Calendar', path: '/events', icon: Calendar, color: 'text-cyan-400' },
    { title: 'AI Startup Copilot (E-CELL AI)', path: '/ai-assistant', icon: Sparkles, color: 'text-indigo-400' },
    { title: 'Startup Pitch Arena & Voting', path: '/pitch-arena', icon: Rocket, color: 'text-rose-400' },
    { title: 'Co-Founder Matching Matrix', path: '/co-founders', icon: Compass, color: 'text-cyan-400' },
    { title: 'Certificate Verification Portal', path: '/certificates', icon: BookOpen, color: 'text-emerald-400' },
    { title: 'XP Leaderboard & Rankings', path: '/leaderboard', icon: Sparkles, color: 'text-amber-400' },
    { title: 'Founder Dashboard', path: '/dashboard', icon: Rocket, color: 'text-purple-400' },
    { title: 'Admin Governance Console', path: '/admin', icon: Compass, color: 'text-red-400' }
  ];

  const handleSelect = (path: string) => {
    setCommandPaletteOpen(false);
    onNavigate(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandPaletteOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#0e121e] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, startups, mentors, resources, tools, or press ESC..."
              className="w-full bg-transparent text-white text-base placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block text-[10px] font-semibold bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/10">
              ESC
            </kbd>
          </div>

          {/* Search Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 scrollbar-thin">
            {/* Quick Actions */}
            {!q && (
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Quick Navigation</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {quickNav.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(item.path)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white">{item.title}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {filteredEvents.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Events Hub ({filteredEvents.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filteredEvents.map(evt => (
                    <button
                      key={evt.id}
                      onClick={() => handleSelect(`/events`)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-indigo-950/40 border border-white/5 hover:border-indigo-500/30 text-left transition-all group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-indigo-300">{evt.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{evt.date} • {evt.category} • +{evt.xpReward} XP</p>
                      </div>
                      <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                        View Details
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Startups */}
            {filteredStartups.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5" /> Startup Directory ({filteredStartups.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filteredStartups.map(stp => (
                    <button
                      key={stp.id}
                      onClick={() => handleSelect(`/startups`)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/30 text-left transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={stp.logo} alt={stp.name} className="w-7 h-7 rounded-lg object-cover bg-white/10" />
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-cyan-300">{stp.name}</p>
                          <p className="text-[11px] text-slate-400">{stp.industry} • {stp.stage}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                        Explore
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors */}
            {filteredMentors.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> Mentors & Advisors ({filteredMentors.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filteredMentors.map(mnt => (
                    <button
                      key={mnt.id}
                      onClick={() => handleSelect(`/mentors`)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-violet-950/40 border border-white/5 hover:border-violet-500/30 text-left transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={mnt.avatar} alt={mnt.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-violet-300">{mnt.name}</p>
                          <p className="text-[11px] text-slate-400">{mnt.role} @ {mnt.company} • {mnt.expertise.slice(0, 2).join(', ')}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                        Book Session
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {filteredResources.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Resource Library ({filteredResources.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filteredResources.map(res => (
                    <button
                      key={res.id}
                      onClick={() => handleSelect(`/resources`)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-amber-950/40 border border-white/5 hover:border-amber-500/30 text-left transition-all group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-amber-300">{res.title}</p>
                        <p className="text-[11px] text-slate-400">{res.category} • {res.type} • {res.downloadsCount} downloads</p>
                      </div>
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        Open
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Community Discussions */}
            {filteredPosts.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Community Discussions ({filteredPosts.length})
                  </span>
                </div>
                <div className="space-y-1.5">
                  {filteredPosts.map(post => (
                    <button
                      key={post.id}
                      onClick={() => handleSelect(`/community`)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-emerald-950/40 border border-white/5 hover:border-emerald-500/30 text-left transition-all group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-white group-hover:text-emerald-300 truncate max-w-md">{post.title}</p>
                        <p className="text-[11px] text-slate-400">By {post.authorName} • {post.category} • {post.likes} likes</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Join
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <span>Navigate with arrows</span>
              <span>•</span>
              <span>Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">Enter</kbd> to select</span>
            </div>
            <span className="text-indigo-400 font-semibold">E-CELL Global Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
