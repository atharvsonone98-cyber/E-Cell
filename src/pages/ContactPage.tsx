import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, Sparkles, Globe, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactPage: React.FC = () => {
  const { submitContactMessage } = useEcell();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setIsSubmitting(true);
    await submitContactMessage({
      name,
      email,
      phone: phone || undefined,
      subject,
      message
    });
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>OFFICIAL COMMUNICATION DESK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          CONTACT E-CELL SSGMCE
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Reach out for corporate partnerships, event sponsorships, guest speaking, student inquiries, or inter-collegiate collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <span>Campus Headquarters</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-white">E-Cell Secretariat & Incubation Hub</p>
                  <p className="text-slate-400 mt-0.5">
                    Shri Sant Gajanan Maharaj College of Engineering (SSGMCE)<br />
                    Shegaon - 444203, Dist. Buldhana, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Official Committee Email</p>
                  <p className="text-blue-400 font-mono">ecell@ssgmce.ac.in</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Desk Working Hours</p>
                  <p className="text-slate-400">Monday – Saturday (4:30 PM – 7:30 PM IST)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Domain Leads Direct Desks */}
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
              Direct Inquiries:
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">PR & Sponsorship Wing</p>
                  <p className="text-[11px] text-slate-400">partnerships@ecell-ssgmce.org</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-400">PR DESK</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Technical & Hackathons Desk</p>
                  <p className="text-[11px] text-slate-400">tech@ecell-ssgmce.org</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-400">TECH DESK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
          {isSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Dispatched Successfully!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for contacting E-Cell SSGMCE. Our PR and secretarial wing will review your inquiry and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-2">Send an Inquiry / Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. anand@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject / Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Sponsoring Campus Innovation Conclave"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Please describe how we can collaborate, participate, or assist you..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Official Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
