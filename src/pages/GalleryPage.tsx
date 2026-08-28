import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { GalleryItem } from '../types';
import { GalleryLightboxModal } from '../components/GalleryLightboxModal';
import { Image, Calendar, Tag, MapPin, Sparkles, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';

export const GalleryPage: React.FC = () => {
  const { gallery } = useEcell();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Events',
    'Workshops',
    'Competitions',
    'Guest Sessions',
    'Team & Campus',
    'Celebrations'
  ];

  const filteredGallery = gallery.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold tracking-wider">
          <Image className="w-3.5 h-3.5" />
          <span>VISUAL ARCHIVES & HIGHLIGHTS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          E-CELL SSGMCE GALLERY
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Relive our flagship ideathons, overnight hackathons, guest lectures, and student leadership milestones at Shri Sant Gajanan Maharaj College of Engineering.
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-3xl border border-slate-800 backdrop-blur-md">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search photo albums or events..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-slate-900/30 rounded-3xl border border-slate-800">
          <Image className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-base font-semibold text-slate-300">No photos found in this category.</p>
          <p className="text-xs mt-1">Try searching with a different keyword or select "All".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 aspect-[4/3] cursor-pointer border border-slate-800 hover:border-rose-500/50 shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/80 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5">
                <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {item.eventName}
                  </span>
                  <span className="font-mono text-slate-400">{item.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
