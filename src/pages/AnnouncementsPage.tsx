import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { Bell, Calendar, Tag, ArrowRight, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { JoinModal } from '../components/JoinModal';
import { motion } from 'motion/react';

interface AnnouncementsPageProps {
  onNavigate?: (path: string) => void;
}

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ onNavigate }) => {
  const { announcements } = useEcell();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const categories = ['All', 'Recruitment', 'Competition', 'Workshop', 'General'];

  const filteredAnnouncements = announcements.filter(a => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
          <Bell className="w-3.5 h-3.5" />
          <span>OFFICIAL CIRCULARS & NOTICES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          E-CELL ANNOUNCEMENTS
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Stay updated with official E-Cell notifications, induction calls, workshop deadlines, and certificate releases.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredAnnouncements.map((ann, index) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xl group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                {ann.badgeText && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    ann.badgeText === 'HOT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    ann.badgeText === 'RECRUITMENT' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {ann.badgeText}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-400">
                  {ann.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-auto sm:ml-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {ann.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {ann.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {ann.description}
              </p>
            </div>

            {ann.link && (
              <div className="shrink-0">
                <button
                  onClick={() => {
                    if (ann.link === '/join') {
                      setIsJoinOpen(true);
                    } else if (ann.link && onNavigate) {
                      onNavigate(ann.link);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <span>{ann.linkText || 'Take Action'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />
    </div>
  );
};
