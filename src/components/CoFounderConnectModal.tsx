import React, { useState } from 'react';
import { CoFounderCandidate } from '../types';
import { useEcell } from '../context/EcellContext';
import { Users, X, Send, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CoFounderConnectModalProps {
  candidate: CoFounderCandidate | null;
  onClose: () => void;
}

export const CoFounderConnectModal: React.FC<CoFounderConnectModalProps> = ({ candidate, onClose }) => {
  const { showToast } = useEcell();
  const [message, setMessage] = useState('');
  const [proposedRole, setProposedRole] = useState('Technical Co-Founder (CTO)');
  const [ventureName, setVentureName] = useState('My Campus Venture');
  const [sending, setSending] = useState(false);

  if (!candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast(`Co-Founder Invitation Sent to ${candidate.name}!`, `Match score ${candidate.matchScore}%. They will receive an email & in-app ping.`, 'success');
      onClose();
    }, 500);
  };

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
          className="relative w-full max-w-lg bg-[#0f1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <img src={candidate.avatar} alt={candidate.name} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white leading-tight">{candidate.name}</h3>
                  <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.2 rounded-full">
                    {candidate.matchScore}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-400">{candidate.branch} • {candidate.lookingForRole}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider block">Candidate Skills</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {candidate.skills.map(s => (
                  <span key={s} className="text-[11px] bg-white/10 text-white px-2 py-0.5 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Your Venture Name *
              </label>
              <input
                type="text"
                required
                value={ventureName}
                onChange={(e) => setVentureName(e.target.value)}
                placeholder="e.g. ChargePulse AI"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Proposed Co-Founder Role *
              </label>
              <input
                type="text"
                required
                value={proposedRole}
                onChange={(e) => setProposedRole(e.target.value)}
                placeholder="e.g. Chief Technology Officer (CTO) / GTM Lead"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Personalized Pitch & Collaboration Note *
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${candidate.name.split(' ')[0]}, saw your background in ${candidate.skills.slice(0, 2).join(', ')}. We are building an MVP and would love to chat about teaming up...`}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> College Verified Student
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-xs font-bold text-white shadow-lg hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{sending ? 'Sending...' : 'Send Invite'}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
