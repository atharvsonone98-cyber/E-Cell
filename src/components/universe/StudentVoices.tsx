import React, { useState } from 'react';
import { TestimonialItem } from '../../types';
import { useEcell } from '../../context/EcellContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Quote, 
  Sparkles, 
  MessageSquarePlus, 
  CheckCircle2, 
  Send, 
  X, 
  Star,
  GraduationCap
} from 'lucide-react';

interface StudentVoicesProps {
  testimonials: TestimonialItem[];
}

export const StudentVoices: React.FC<StudentVoicesProps> = ({ testimonials }) => {
  const { createTestimonial, showToast } = useEcell();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Student Builder',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    quote: '',
    type: 'Student' as const,
    eventAttended: 'E-Summit SSGMCE'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) {
      showToast('Please fill required fields', 'Name and feedback quote are required', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTestimonial({
        ...formData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`,
        rating: 5
      });
      showToast('Voice Shared Successfully!', 'Thank you for sharing what E-Cell means to you.', 'success');
      setIsModalOpen(false);
      setFormData({
        name: '',
        role: 'Student Builder',
        department: 'Computer Science & Engineering',
        year: '3rd Year',
        quote: '',
        type: 'Student',
        eventAttended: 'E-Summit SSGMCE'
      });
    } catch (err) {
      showToast('Submission Failed', 'Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>CAMPUS PERSPECTIVES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            WHAT E-CELL MEANS TO US
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Real stories, transformation journeys, and reflections from students, alumni founders, and faculty.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white text-xs font-bold transition-all flex items-center gap-2 self-start md:self-auto group"
        >
          <MessageSquarePlus className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span>Share Your E-Cell Experience</span>
        </button>
      </div>

      {/* Testimonials Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 6).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-3xl bg-[#080d1e]/85 border border-white/10 hover:border-cyan-500/30 backdrop-blur-xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="space-y-3">
              <Quote className="w-8 h-8 text-cyan-400/40 group-hover:text-cyan-400 transition-colors" />
              <p className="text-sm text-slate-200 leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl object-cover bg-slate-900 border border-white/10 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {item.name}
                </h4>
                <p className="text-[11px] text-cyan-300 truncate">
                  {item.role} • {item.department}
                </p>
                {item.eventAttended && (
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    Attended: {item.eventAttended}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Share Experience Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-[#080d1e] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  STUDENT FEEDBACK & STORY
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Share Your E-Cell Experience
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Your feedback helps inspire future batches of engineers at SSGMCE.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Computer Science & Engineering">CSE</option>
                      <option value="Information Technology">IT</option>
                      <option value="Electronics & Telecommunication">EXTC</option>
                      <option value="Electrical Engineering">Electrical</option>
                      <option value="Mechanical Engineering">Mechanical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Year of Study
                    </label>
                    <select
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="Final Year">Final Year</option>
                      <option value="Alumni">Alumni</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Reflection / Experience Quote *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.quote}
                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="How did E-Cell workshops or events impact your thinking, skills, or projects?"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Reflection'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
