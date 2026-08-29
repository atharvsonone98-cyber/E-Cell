import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Compass, Trophy, ArrowRight, Sparkles } from 'lucide-react';

interface JourneyChooserProps {
  onNavigate: (path: string) => void;
}

export const JourneyChooser: React.FC<JourneyChooserProps> = ({ onNavigate }) => {
  const journeys = [
    {
      id: 'events',
      title: 'EXPLORE EVENTS',
      subtitle: 'Workshops, hackathons & bootcamps',
      desc: 'Discover upcoming competitions, keynote masterclasses, and hands-on technical bootcamps.',
      icon: Calendar,
      path: '/events',
      color: 'text-sky-400',
      borderColor: 'border-sky-500/30 hover:border-sky-400',
      bgGradient: 'from-sky-500/10 to-blue-600/5',
      badge: 'Active Seasons'
    },
    {
      id: 'join',
      title: 'JOIN THE COMMITTEE',
      subtitle: 'Student leadership & wings',
      desc: 'Apply for Technical, Management, PR, Design, Content, and Operations wings of E-Cell SSGMCE.',
      icon: Users,
      path: '/join',
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/30 hover:border-indigo-400',
      bgGradient: 'from-indigo-500/10 to-purple-600/5',
      badge: 'Recruitment'
    },
    {
      id: 'journey',
      title: 'DISCOVER OUR JOURNEY',
      subtitle: 'Evolution since inception',
      desc: 'Explore the founding story, faculty guidance, and institutional milestones across the decade.',
      icon: Compass,
      path: '/about',
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30 hover:border-purple-400',
      bgGradient: 'from-purple-500/10 to-pink-600/5',
      badge: 'SSGMCE Legacy'
    },
    {
      id: 'achievements',
      title: 'SEE OUR ACHIEVEMENTS',
      subtitle: 'Podiums, grants & awards',
      desc: 'Review national hackathon rankings, DST NIDHI recognitions, and alumni startup success stories.',
      icon: Trophy,
      path: '/achievements',
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      bgGradient: 'from-amber-500/10 to-yellow-600/5',
      badge: 'National Honors'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PERSONALIZED PATHWAYS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          WHAT BRINGS YOU HERE?
        </h2>
        <p className="text-sm text-slate-300">
          Choose your personalized path to explore the E-Cell SSGMCE universe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {journeys.map((j, idx) => {
          const Icon = j.icon;
          return (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onNavigate(j.path)}
              className={`rounded-3xl bg-[#080d1e]/85 border ${j.borderColor} bg-gradient-to-br ${j.bgGradient} backdrop-blur-xl p-6 flex flex-col justify-between space-y-5 shadow-xl cursor-pointer transition-all hover:scale-105 group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${j.color}`} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">
                    {j.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-sky-300 transition-colors">
                    {j.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {j.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {j.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={`font-bold ${j.color}`}>Begin Route</span>
                <ArrowRight className={`w-4 h-4 ${j.color} group-hover:translate-x-1 transition-transform`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
