import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEcell } from '../context/EcellContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEcell();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let iconColor = 'text-emerald-400';
          let borderGlow = 'border-emerald-500/30';
          
          if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-cyan-400';
            borderGlow = 'border-cyan-500/30';
          } else if (toast.type === 'warning') {
            Icon = AlertTriangle;
            iconColor = 'text-amber-400';
            borderGlow = 'border-amber-500/30';
          } else if (toast.type === 'error') {
            Icon = XCircle;
            iconColor = 'text-rose-400';
            borderGlow = 'border-rose-500/30';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 rounded-xl bg-[#0f1422]/95 border ${borderGlow} shadow-2xl backdrop-blur-xl flex items-start justify-between gap-3`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
                <div>
                  <h4 className="text-sm font-semibold text-white leading-tight">{toast.title}</h4>
                  {toast.description && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
