import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Maximize2, 
  ArrowRight, 
  Filter 
} from 'lucide-react';

interface FloatingMemoryWallProps {
  gallery: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
  onNavigate: (path: string) => void;
}

export const FloatingMemoryWall: React.FC<FloatingMemoryWallProps> = ({
  gallery,
  onOpenLightbox,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Events', 'Workshops', 'Competitions', 'Guest Sessions', 'Team & Campus'];

  const filteredItems = gallery.filter(g => {
    if (activeCategory === 'All') return true;
    return g.category === activeCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VISUAL TIME CAPSULE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            MEMORIES OF E-CELL
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            A living mosaic of hackathon midnights, keynote interactions, and student triumphs across SSGMCE.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Multi-Depth Photograph Wall */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.slice(0, 8).map((item, idx) => {
          // Calculate subtle staggered rotation & floating offset
          const rotationAngle = (idx % 4 === 0 ? -1.5 : idx % 4 === 1 ? 1.8 : idx % 4 === 2 ? -1.0 : 1.2);
          const floatDelay = (idx % 3) * 0.4;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ 
                scale: 1.04, 
                rotate: 0,
                zIndex: 30,
                transition: { duration: 0.2 }
              }}
              style={{
                transform: `rotate(${rotationAngle}deg)`
              }}
              onClick={() => onOpenLightbox(item)}
              className="group relative rounded-3xl overflow-hidden bg-[#070c1c] border border-white/10 hover:border-rose-400/60 shadow-xl cursor-pointer transition-all duration-300 backdrop-blur-md"
            >
              {/* Photo Viewport with depth filter */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Ambient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/70 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Lightbox zoom hint icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-rose-300" />
                </div>

                {/* Photo metadata overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-1 z-10">
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-200 line-clamp-1 transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="truncate max-w-[160px]">{item.eventName}</span>
                    <span className="font-mono text-slate-400 shrink-0">{item.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gallery footer CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={() => onNavigate('/gallery')}
          className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-rose-500/50 text-white text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2"
        >
          <span>Explore All Captured Moments & Photo Vault</span>
          <ArrowRight className="w-4 h-4 text-rose-400" />
        </button>
      </div>
    </section>
  );
};
