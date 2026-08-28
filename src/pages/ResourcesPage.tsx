import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { ResourceItem } from '../types';
import { 
  BookOpen, 
  Search, 
  Download, 
  ExternalLink, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Sparkles, 
  Tag, 
  FolderLock
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { resources } = useEcell();
  const { user, addXP } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Business', 'Funding', 'Marketing', 'Product', 'Technology', 'Legal', 'Pitching'];

  const filteredResources = resources.filter(r => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return FileText;
      case 'xlsx':
      case 'sheets':
      case 'template': return FileSpreadsheet;
      case 'figma':
      case 'pptx':
      case 'guide': return Presentation;
      default: return BookOpen;
    }
  };

  const handleOpenResource = (resItem: ResourceItem) => {
    addXP(10, `Downloaded startup resource: ${resItem.title}`);
    window.open(resItem.url, '_blank');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Founder Knowledgebase</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">
              {resources.length} Verified Toolkits
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Venture Templates & Resource Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Download institutional-grade term sheet templates, Y-Combinator pitch decks, 5-year pro-forma financial models, and founder equity agreements.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2 self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Earn <strong>+10 XP</strong> per toolkit accessed</span>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates, legal docs, models..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(res => {
          const FormatIcon = getFormatIcon(res.type);

          return (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <FormatIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-md">
                    {res.type.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {res.tags.map(t => (
                    <span key={t} className="text-[10px] bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {res.downloadsCount} Downloads
                </span>

                <button
                  onClick={() => handleOpenResource(res)}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get Template</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
