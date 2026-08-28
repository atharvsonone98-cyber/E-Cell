import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { CertificateItem } from '../types';
import { ShieldCheck, Download, Share2, X, CheckCircle2, Award, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEcell } from '../context/EcellContext';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { showToast } = useEcell();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (certificate) {
      const verifyUrl = `${window.location.origin}/verify-certificate?id=${certificate.certificateId}`;
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      }).then(url => {
        setQrCodeDataUrl(url);
      }).catch(err => {
        console.error('QR code generation error', err);
      });
    }
  }, [certificate]);

  if (!certificate) return null;

  const handlePrintDownload = () => {
    window.print();
    showToast('Preparing Certificate for Export/Print', 'Select "Save as PDF" in your print dialog', 'info');
  };

  const handleCopyVerificationLink = () => {
    const url = `${window.location.origin}/verify-certificate?id=${certificate.certificateId}`;
    navigator.clipboard.writeText(url);
    showToast('Verification Link Copied to Clipboard!', url, 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-[#0f1422] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Top Actions Toolbar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-white uppercase tracking-wider">Institutional Credential Ledger</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyVerificationLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors"
                title="Copy verification link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={handlePrintDownload}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Certificate Canvas / Render Frame */}
          <div className="p-6 sm:p-10 overflow-x-auto">
            <div
              ref={certRef}
              className="relative min-w-[700px] bg-gradient-to-br from-[#0c101c] via-[#11182c] to-[#0a0d18] border-8 border-[#202945] rounded-xl p-8 text-center text-slate-200 shadow-2xl overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%)`
              }}
            >
              {/* Guilloche Corner Accents */}
              <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-indigo-400/40 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-indigo-400/40 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-indigo-400/40 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-indigo-400/40 rounded-br-lg" />

              {/* Institution Seal & Watermark */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg">
                    <div className="w-full h-full bg-[#0d1222] rounded-[10px] flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-extrabold text-white text-sm tracking-wider uppercase">Shri Sant Gajanan Maharaj College of Engineering</h5>
                    <p className="text-[11px] text-indigo-300 uppercase tracking-widest font-semibold">E-Cell SSGMCE • Innovation & Incubation Center</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>OFFICIALLY VERIFIED CREDENTIAL</span>
                </div>
              </div>

              {/* Certificate Title */}
              <div className="my-6">
                <span className="text-xs font-bold text-indigo-400 tracking-[0.25em] uppercase">
                  {certificate.category}
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2 font-serif">
                  CERTIFICATE OF ACHIEVEMENT
                </h2>
                <p className="text-xs text-slate-400 mt-1 italic">
                  This institutional credential is proud to certify that
                </p>
              </div>

              {/* Recipient Name */}
              <div className="my-6 py-2 border-b border-indigo-500/30 max-w-md mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-200 font-serif">
                  {certificate.userName}
                </h3>
                <p className="text-xs text-indigo-300 font-mono mt-1">
                  ID: {certificate.collegeId} • {certificate.userEmail}
                </p>
              </div>

              {/* Event & Citation */}
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                has successfully presented and achieved the standing of <strong className="text-white underline decoration-indigo-400 underline-offset-4">{certificate.rank}</strong> in the <strong className="text-white">{certificate.eventName}</strong> hosted by the College Entrepreneurship Cell in partnership with the Industry Advisory Board.
              </p>

              {/* Footer details: Signatures & QR Code */}
              <div className="mt-10 pt-6 border-t border-white/10 flex items-end justify-between text-left">
                {/* Left: Signatory */}
                <div>
                  <div className="h-10 flex items-end font-serif italic text-indigo-300 text-lg border-b border-white/20 pb-1">
                    {certificate.signatureName}
                  </div>
                  <p className="text-xs font-bold text-white mt-1">{certificate.signatureName}</p>
                  <p className="text-[10px] text-slate-400">{certificate.signatureRole}</p>
                  <p className="text-[10px] text-slate-400">Date Issued: {certificate.issueDate}</p>
                </div>

                {/* Center: Award Seal */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-[2px] shadow-lg flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#0d1222] flex flex-col items-center justify-center text-center p-1">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-[7px] font-black text-amber-300 tracking-tighter uppercase">E-CELL VERIFIED</span>
                  </div>
                </div>

                {/* Right: Live QR Code & Hash */}
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10">
                  {qrCodeDataUrl ? (
                    <img src={qrCodeDataUrl} alt="Verify QR" className="w-16 h-16 rounded-md bg-white p-1" />
                  ) : (
                    <div className="w-16 h-16 bg-white/10 rounded flex items-center justify-center text-[10px] text-slate-400">
                      QR Code
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-[9px] font-mono text-slate-400 uppercase">Verification ID</p>
                    <p className="text-xs font-mono font-bold text-indigo-300">{certificate.certificateId}</p>
                    <p className="text-[9px] text-slate-400 mt-1 max-w-[130px] leading-tight">
                      Scan or visit portal to authenticate ledger signature
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
