import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { Rocket, X, Sparkles, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StartupSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartupSubmitModal: React.FC<StartupSubmitModalProps> = ({ isOpen, onClose }) => {
  const { createStartup } = useEcell();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [industry, setIndustry] = useState('AI & Enterprise SaaS');
  const [stage, setStage] = useState<'Idea' | 'MVP' | 'Early Traction' | 'Growth' | 'Funded'>('MVP');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [marketSize, setMarketSize] = useState('$3.2B Global TAM');
  const [businessModel, setBusinessModel] = useState('B2B SaaS Subscription (₹1,999/mo)');
  const [techInput, setTechInput] = useState('React, TypeScript, Python, Tailwind');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    const techArray = techInput.split(',').map(t => t.trim()).filter(Boolean);

    await createStartup({
      name,
      tagline,
      industry,
      stage,
      problem,
      solution,
      marketSize,
      businessModel,
      technology: techArray,
      website
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
          className="relative w-full max-w-2xl bg-[#0f1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">List Your Startup in Ecosystem</h3>
                <p className="text-xs text-slate-400">Showcase to investors, mentors, and prospective hires</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 scrollbar-thin">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Startup Venture Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AeroDynamics Lab"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Industry / Sector *
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="CleanTech & Mobility">CleanTech & Mobility</option>
                  <option value="AI & Enterprise SaaS">AI & Enterprise SaaS</option>
                  <option value="HealthTech & Bio">HealthTech & Bio</option>
                  <option value="FinTech & Commerce">FinTech & Commerce</option>
                  <option value="DeepTech & Robotics">DeepTech & Robotics</option>
                  <option value="AgriTech & Food">AgriTech & Food</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Maturity Stage *
                </label>
                <select
                  value={stage}
                  onChange={(e: any) => setStage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Idea">Idea Validation</option>
                  <option value="MVP">MVP Deployed</option>
                  <option value="Early Traction">Early Traction / Pilot</option>
                  <option value="Growth">Scaling & Growth</option>
                  <option value="Funded">Seed / Grant Funded</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Live Website / Demo URL
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://mystartup.io"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Venture Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="High-level value proposition in one sentence"
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
                placeholder="What critical friction or cost does your customer face today?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                The Proprietary Solution *
              </label>
              <textarea
                rows={2}
                required
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How does your architecture or platform uniquely solve this?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Market Sizing (TAM)
                </label>
                <input
                  type="text"
                  value={marketSize}
                  onChange={(e) => setMarketSize(e.target.value)}
                  placeholder="e.g. $4.5B Total Market"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Business Model
                </label>
                <input
                  type="text"
                  value={businessModel}
                  onChange={(e) => setBusinessModel(e.target.value)}
                  placeholder="e.g. B2B Subscription / 1.5% take-rate"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, TypeScript, Python, TensorFlow, AWS"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +200 XP Awarded upon listing
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
                  disabled={submitting || !name.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-white shadow-lg hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Launch Venture'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
