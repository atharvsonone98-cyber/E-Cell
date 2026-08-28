import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { Award, Mic2, FileText, Video, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PitchSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchSubmitModal: React.FC<PitchSubmitModalProps> = ({ isOpen, onClose }) => {
  const { createPitch } = useEcell();
  const { user } = useAuth();

  const [startupName, setStartupName] = useState('');
  const [category, setCategory] = useState('CleanTech & Smart Mobility');
  const [tagline, setTagline] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [market, setMarket] = useState('$1.5B Regional Market');
  const [videoUrl, setVideoUrl] = useState('');
  const [deckUrl, setDeckUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startupName.trim()) return;

    setSubmitting(true);
    await createPitch({
      startupName,
      category,
      tagline,
      problem,
      solution,
      market,
      videoUrl,
      deckUrl
    });
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
          className="relative w-full max-w-xl bg-[#0f1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-fuchsia-600/20 border border-fuchsia-500/30 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-fuchsia-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Submit to Pitch Arena</h3>
                <p className="text-xs text-slate-400">Qualify for Seed Grants & Angel Demo Day</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 scrollbar-thin">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Venture Name *
              </label>
              <input
                type="text"
                required
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                placeholder="e.g. ChargePulse AI"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category / Domain *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="CleanTech & Smart Mobility">CleanTech & Smart Mobility</option>
                  <option value="HealthTech & Biotech">HealthTech & Biotech</option>
                  <option value="FinTech & Web3">FinTech & Web3</option>
                  <option value="AI / Enterprise SaaS">AI / Enterprise SaaS</option>
                  <option value="EdTech & SkillTech">EdTech & SkillTech</option>
                  <option value="AgriTech & Sustainability">AgriTech & Sustainability</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target TAM (Market Size)
                </label>
                <input
                  type="text"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  placeholder="e.g. $2.4B Global Market"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Elevator Pitch Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One punchy sentence describing your breakthrough"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                The Customer Problem *
              </label>
              <textarea
                rows={2}
                required
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe the painful problem in the market..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                The Breakthrough Solution *
              </label>
              <textarea
                rows={2}
                required
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="Describe what your product/tech actually does..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Demo Video Link (Loom / YouTube)
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtu.be/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Pitch Deck URL (Figma / PDF)
                </label>
                <input
                  type="text"
                  value={deckUrl}
                  onChange={(e) => setDeckUrl(e.target.value)}
                  placeholder="https://docsend.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +100 XP Earned on submit
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
                  disabled={submitting || !startupName.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-xs font-bold text-white shadow-lg hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Publish Pitch'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
