import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { MessageSquare, X, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostCreateModal: React.FC<PostCreateModalProps> = ({ isOpen, onClose }) => {
  const { createPost } = useEcell();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Idea Validation' | 'Team & Co-Founders' | 'Ask Mentors' | 'Feedback' | 'Wins & Milestones' | 'General'>('Idea Validation');
  const [tagsInput, setTagsInput] = useState('Campus, SaaS, Ideation');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    await createPost(title, content, category, tags);
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
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Start a Community Discussion</h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Channel / Category *
              </label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141a2e] border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="Idea Validation">Idea Validation & Feedback</option>
                <option value="Team & Co-Founders">Team & Co-Founder Search</option>
                <option value="Ask Mentors">Ask Mentors & Advisors</option>
                <option value="Feedback">Product MVP Feedback</option>
                <option value="Wins & Milestones">Wins & Milestone Announcements</option>
                <option value="General">General Entrepreneurship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Topic Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What would you like to discuss with the community?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Post Content *
              </label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide detailed context, links, questions, or your startup premise..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, Hardware, CoFounder, Beta"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> +15 XP on publication
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
                  disabled={submitting || !title.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-xs font-bold text-white shadow-lg hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Post to Community'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
