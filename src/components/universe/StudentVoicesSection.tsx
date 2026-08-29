import React, { useState } from 'react';
import { Quote, Sparkles, MessageSquare, Star, ArrowRight, CheckCircle2, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TestimonialItem } from '../../types';

interface StudentVoicesSectionProps {
  testimonials: TestimonialItem[];
  onNavigate?: (path: string) => void;
}

export const StudentVoicesSection: React.FC<StudentVoicesSectionProps> = ({ testimonials, onNavigate }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareName, setShareName] = useState('');
  const [shareDepartment, setShareDepartment] = useState('');
  const [shareYear, setShareYear] = useState('');
  const [shareQuote, setShareQuote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareName || !shareQuote) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsShareModalOpen(false);
      setShareName('');
      setShareDepartment('');
      setShareYear('');
      setShareQuote('');
    }, 2500);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDENT VOICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            WHAT E-CELL MEANS TO US
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Real stories, student reflections, and leadership journeys from members, founders, and campus delegates.
          </p>
        </div>

        {/* CTA to submit story */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Share Your Experience</span>
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="p-10 rounded-3xl bg-slate-900/40 border border-white/10 text-center space-y-4 max-w-lg mx-auto">
          <Quote className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="text-sm text-slate-300">No testimonials shared yet.</p>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
          >
            Be the First to Share Your Experience
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 backdrop-blur-md flex flex-col justify-between space-y-5 shadow-xl transition-all group"
            >
              {/* Quote text */}
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-cyan-400/60" />
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-2xl object-cover border border-white/20 bg-slate-800"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {test.name}
                  </h4>
                  <p className="text-[11px] text-cyan-400 font-medium">{test.role}</p>
                  <p className="text-[10px] text-slate-400">
                    {test.department} • {test.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Share Experience Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 sm:p-7 rounded-3xl bg-[#090e1d] border border-white/15 shadow-2xl space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Share Your E-Cell Experience</span>
                </h3>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Thank You for Your Voice!</h4>
                  <p className="text-xs text-slate-300">
                    Your reflection has been submitted to the editorial team.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleShareSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={shareName}
                      onChange={e => setShareName(e.target.value)}
                      placeholder="e.g. Atharva Kulkarni"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Department</label>
                      <input
                        type="text"
                        value={shareDepartment}
                        onChange={e => setShareDepartment(e.target.value)}
                        placeholder="e.g. CSE / IT / Mech"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Class / Year</label>
                      <input
                        type="text"
                        value={shareYear}
                        onChange={e => setShareYear(e.target.value)}
                        placeholder="e.g. 3rd Year"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your E-Cell Story / Quote *</label>
                    <textarea
                      required
                      rows={4}
                      value={shareQuote}
                      onChange={e => setShareQuote(e.target.value)}
                      placeholder="How has E-Cell SSGMCE contributed to your skills, events, or startup journey?"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reflection</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
