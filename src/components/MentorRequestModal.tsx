import React, { useState } from 'react';
import { MentorItem } from '../types';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { Compass, Calendar, Clock, MessageSquare, X, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MentorRequestModalProps {
  mentor: MentorItem | null;
  onClose: () => void;
}

export const MentorRequestModal: React.FC<MentorRequestModalProps> = ({ mentor, onClose }) => {
  const { requestMentorship } = useEcell();
  const { user } = useAuth();

  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [preferredDate, setPreferredDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [submitting, setSubmitting] = useState(false);

  if (!mentor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setSubmitting(true);
    await requestMentorship(mentor.id, topic, notes, preferredDate);
    setSubmitting(false);
    onClose();
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
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">Request Mentorship Session</h3>
                <p className="text-xs text-indigo-400 font-medium">{mentor.name} • {mentor.role} @ {mentor.company}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Mentor Availability</p>
                <p className="text-[11px] text-indigo-300 mt-0.5">{mentor.availability} ({mentor.availableDays.join(', ')})</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Venture Problem or Consultation Topic *
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Unit Economics & Pricing Model Critique"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Preferred Consultation Date *
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Context, Deck Links & Current Traction
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe your venture stage, customer discoveries, and specific questions you have for the mentor..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> +40 XP on completion
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
                  disabled={submitting || !topic.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-lg hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Booking...' : 'Confirm Request'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
