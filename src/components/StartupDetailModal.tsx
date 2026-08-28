import React from 'react';
import { StartupItem } from '../types';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { Rocket, Heart, Globe, FileText, CheckCircle2, X, Users, Target, Shield, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StartupDetailModalProps {
  startup: StartupItem | null;
  onClose: () => void;
}

export const StartupDetailModal: React.FC<StartupDetailModalProps> = ({ startup, onClose }) => {
  const { likeStartup, showToast } = useEcell();
  const { user } = useAuth();

  if (!startup) return null;

  const isLiked = (startup.likedBy || []).includes(user?.id || '');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-[#0f1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Banner */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
            <img src={startup.banner} alt={startup.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1424] via-[#0f1424]/60 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-6 flex items-end gap-4">
              <img
                src={startup.logo}
                alt={startup.name}
                className="w-16 h-16 rounded-2xl bg-[#0a0d16] p-1 border-2 border-white/20 shadow-xl object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">{startup.name}</h2>
                  {startup.approved && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Incubated
                    </span>
                  )}
                </div>
                <p className="text-xs text-indigo-300 font-medium">{startup.tagline}</p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full">
                Industry: {startup.industry}
              </span>
              <span className="text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/25 px-3 py-1 rounded-full">
                Stage: {startup.stage}
              </span>
              <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
                {startup.fundingStatus}
              </span>
              <span className="text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Est. {startup.year}
              </span>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" /> The Market Problem
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{startup.problem}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" /> The Technology Solution
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{startup.solution}</p>
              </div>
            </div>

            {/* Business Model & Market Sizing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                <span className="text-indigo-400 font-bold uppercase text-[10px] tracking-wider block">Target Market Size (TAM)</span>
                <span className="text-sm font-semibold text-white mt-0.5 block">{startup.marketSize}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20">
                <span className="text-purple-400 font-bold uppercase text-[10px] tracking-wider block">Monetization Model</span>
                <span className="text-sm font-semibold text-white mt-0.5 block">{startup.businessModel}</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Technology & Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {startup.technology.map(tech => (
                  <span key={tech} className="text-xs bg-white/5 border border-white/10 text-slate-200 px-2.5 py-1 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Founding Team */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" /> Founding Team
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {startup.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <img src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'} alt={member.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h5 className="text-xs font-bold text-white">{member.name}</h5>
                      <p className="text-[11px] text-indigo-400">{member.role}</p>
                      <p className="text-[10px] text-slate-400">{member.branch || 'Engineering'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={() => likeStartup(startup.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLiked
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{startup.likes} Upvotes</span>
            </button>

            <div className="flex items-center gap-2">
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 border border-white/10"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Website</span>
                </a>
              )}

              <button
                onClick={() => {
                  showToast('Founder Connected', `Email invitation dispatched to ${startup.founderName}`, 'success');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-xs font-bold text-white shadow-lg"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Connect with Founder</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
