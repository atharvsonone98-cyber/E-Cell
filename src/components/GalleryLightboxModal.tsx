import React from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Tag } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative max-w-4xl w-full bg-[#0f172a] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-black/90 backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-video sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {item.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {item.eventName}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1.5 ml-auto">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {item.date}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {item.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {item.description}
          </p>

          {item.location && (
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{item.location}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
