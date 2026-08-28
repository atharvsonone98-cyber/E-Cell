import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Send, Sparkles, Building2, User, Mail, Phone, BookOpen, Layers } from 'lucide-react';
import { useEcell } from '../context/EcellContext';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, defaultDomain }) => {
  const { submitApplication } = useEcell();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [year, setYear] = useState('1st Year');
  const [collegeId, setCollegeId] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>(
    defaultDomain ? [defaultDomain] : ['Management']
  );
  const [whyJoin, setWhyJoin] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableDomains = [
    'Technical',
    'Management',
    'Publicity & PR',
    'Social Media & Content',
    'Sponsorship',
    'Design & Creatives',
    'Discipline & Logistics',
    'Event Operations'
  ];

  const handleToggleDomain = (dom: string) => {
    if (selectedDomains.includes(dom)) {
      if (selectedDomains.length > 1) {
        setSelectedDomains(selectedDomains.filter(d => d !== dom));
      }
    } else {
      setSelectedDomains([...selectedDomains, dom]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !whyJoin) return;

    setIsSubmitting(true);
    await submitApplication({
      fullName,
      email,
      phone,
      department,
      year,
      collegeId: collegeId || undefined,
      domainInterest: selectedDomains,
      whyJoin,
      previousExperience: previousExperience || undefined
    });

    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset
      setFullName('');
      setEmail('');
      setPhone('');
      setWhyJoin('');
      setPreviousExperience('');
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Application Received!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you for applying to join <strong>E-Cell SSGMCE (Team Navonmesh)</strong>. Our team will review your application and notify you for the induction interview.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Join E-Cell SSGMCE</h3>
                <p className="text-xs sm:text-sm text-slate-400">Team Navonmesh Student Inductions</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6">
              Become part of central India's premier student entrepreneurship and leadership committee. Please fill out your details below:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Atharv Deshmukh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
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
                    placeholder="e.g. name@ssgmce.ac.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                    <option value="Electrical & Power Engineering">Electrical & Power Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Applied Sciences & Humanities">First Year (General Sciences)</option>
                    <option value="Management Studies (MBA)">Management Studies (MBA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Year of Study *
                  </label>
                  <select
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="1st Year">1st Year (FE)</option>
                    <option value="2nd Year">2nd Year (SE)</option>
                    <option value="3rd Year">3rd Year (TE)</option>
                    <option value="4th Year">Final Year (BE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Domain(s) of Interest (Select 1 or more) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableDomains.map(dom => {
                    const isSelected = selectedDomains.includes(dom);
                    return (
                      <button
                        type="button"
                        key={dom}
                        onClick={() => handleToggleDomain(dom)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {dom}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Why do you want to join E-Cell SSGMCE? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={whyJoin}
                  onChange={e => setWhyJoin(e.target.value)}
                  placeholder="Share what drives you, what skills you hope to build, and how you want to contribute to our events and team..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Previous Experiences / Projects / Achievements (Optional)
                </label>
                <input
                  type="text"
                  value={previousExperience}
                  onChange={e => setPreviousExperience(e.target.value)}
                  placeholder="e.g. Built a React website, organized school tech fair, video editing portfolio link..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
