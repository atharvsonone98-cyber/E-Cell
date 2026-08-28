import React, { useState, useEffect } from 'react';
import { EventItem } from '../types';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Trophy, Users, Award, X, CheckCircle2, Ticket, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const { registerForEvent } = useEcell();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!event) return;

    const targetDate = new Date(`${event.date}T17:00:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [event]);

  if (!event) return null;

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
          className="relative w-full max-w-3xl bg-[#0f1424] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden shrink-0">
            <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1424] via-[#0f1424]/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute top-4 left-6">
              <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full shadow-lg">
                {event.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">{event.title}</h2>
              <p className="text-xs text-indigo-300 font-medium mt-1">{event.tagline}</p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 scrollbar-thin">
            {/* Live Countdown & Event Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xl font-bold text-white block">{timeLeft.days}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Days Left</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xl font-bold text-white block">{timeLeft.hours}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Hours</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xl font-bold text-white block">{timeLeft.minutes}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Mins</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xl font-bold text-indigo-400 block">{timeLeft.seconds}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Secs</span>
              </div>
            </div>

            {/* Logistics Strip */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">{event.date}</p>
                  <p className="text-[11px] text-slate-400">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                {event.isVirtual ? <Video className="w-4 h-4 text-cyan-400 shrink-0" /> : <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />}
                <div>
                  <p className="font-semibold text-white">{event.location}</p>
                  <p className="text-[11px] text-slate-400">{event.isVirtual ? 'Google Meet Live Stream' : 'On-Campus In-Person'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">{event.prizePool || 'Certificate & Seed Grants'}</p>
                  <p className="text-[11px] text-amber-300/80">+{event.xpReward} Entrepreneurship XP</p>
                </div>
              </div>
            </div>

            {/* Organizing Workshop Team & Faculty Lead */}
            {(event.workshopTeam || event.facultyLead) && (
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Organizing E-Cell SSGMCE Team</span>
                  </h4>
                  {event.facultyLead && (
                    <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold border border-amber-500/30">
                      Advisor: {event.facultyLead}
                    </span>
                  )}
                </div>

                {event.workshopTeam && event.workshopTeam.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {event.workshopTeam.map((member, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{member.name}</p>
                          <p className="text-[10px] text-indigo-300 truncate">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Prerequisites & Takeaways */}
            {(event.prerequisites || event.takeaways) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.prerequisites && event.prerequisites.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Prerequisites</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {event.prerequisites.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.takeaways && event.takeaways.length > 0 && (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                    <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>What You Will Get</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {event.takeaways.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">About The Program</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{event.description}</p>
            </div>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Featured Keynotes & Mentors</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <img src={spk.avatar} alt={spk.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h5 className="text-xs font-bold text-white">{spk.name}</h5>
                        <p className="text-[11px] text-indigo-400">{spk.role}</p>
                        <p className="text-[10px] text-slate-400">{spk.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Event Agenda</h4>
                <div className="space-y-2">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] text-xs">
                      <span className="text-indigo-400 font-mono font-bold shrink-0">{item.time}</span>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>{event.registeredCount} / {event.capacity} Registered</span>
            </div>

            <button
              onClick={() => {
                registerForEvent(event.id);
                onClose();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-90 text-xs font-bold text-white shadow-xl shadow-indigo-500/20"
            >
              <Ticket className="w-4 h-4" />
              <span>RSVP & Claim Pass (+{event.xpReward} XP)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
