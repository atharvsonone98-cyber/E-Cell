import React, { useState } from 'react';
import { AnnouncementItem, StoryItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Sparkles, 
  Calendar, 
  Tag, 
  ArrowRight, 
  ExternalLink, 
  Bell,
  Search
} from 'lucide-react';

interface EcellNewsroomProps {
  announcements: AnnouncementItem[];
  stories: StoryItem[];
  onNavigate: (path: string) => void;
}

export const EcellNewsroom: React.FC<EcellNewsroomProps> = ({
  announcements,
  stories,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Events', 'Announcements', 'Achievements', 'Team', 'Stories'];

  // Combined news items
  const newsItems = [
    ...announcements.map(a => ({
      id: `ann-${a.id}`,
      title: a.title,
      category: a.category.includes('Event') ? 'Events' : 'Announcements',
      date: a.date,
      description: a.description,
      isImportant: a.isImportant,
      link: a.link,
      linkText: a.linkText || 'Read Notice'
    })),
    ...stories.map(s => ({
      id: `story-${s.id}`,
      title: s.title,
      category: 'Stories',
      date: s.date,
      description: s.excerpt,
      isImportant: s.featured || false,
      link: '/stories',
      linkText: 'Read Full Story'
    }))
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>DISPATCH & UPDATES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            E-CELL NEWSROOM
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Official announcements, campus dispatches, challenge results, and editorial stories.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dispatches..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-md'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.slice(0, 6).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className={`rounded-3xl bg-[#080d1e]/85 border ${
              item.isImportant ? 'border-amber-500/40 bg-amber-500/[0.02]' : 'border-white/10'
            } hover:border-blue-500/40 backdrop-blur-xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all hover:scale-[1.02] group`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {item.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Official Bulletin</span>
              <button
                onClick={() => onNavigate(item.link || '/events')}
                className="font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>{item.linkText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
