import React, { useState } from 'react';
import { useEcell } from '../context/EcellContext';
import { useAuth } from '../context/AuthContext';
import { CertificateItem } from '../types';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  XCircle, 
  ExternalLink, 
  Download, 
  QrCode, 
  Calendar, 
  Sparkles,
  Eye
} from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';

export const CertificatesPage: React.FC = () => {
  const { certificates, verifyCertificate } = useEcell();
  const { user } = useAuth();

  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{ verified: boolean; cert?: CertificateItem } | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;

    const result = await verifyCertificate(verifyCode.trim());
    setVerificationResult(result);
  };

  const sampleCertIds = ['EC-2026-FND-8891', 'EC-2026-HCK-4402', 'EC-2026-INC-1290'];

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Official Credentials</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
              Tamper-Proof Verification
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Certificate Registry & Cryptographic Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Verify official participation, hackathon championship, and incubator graduation certificates issued by the Entrepreneurship Cell.
          </p>
        </div>
      </div>

      {/* VERIFICATION SEARCH TOOL */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/70 via-[#0f1424] to-purple-950/70 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Instant Certificate Authenticator</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Enter the unique credential identification string printed on the bottom right of any E-Cell certificate or scan the QR code.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              placeholder="e.g. EC-2026-FND-8891"
              className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-400 font-mono tracking-wider"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-xs font-bold text-white shadow-xl transition-all whitespace-nowrap"
          >
            Verify Credential
          </button>
        </form>

        {/* Quick Sample IDs */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Try sample IDs:</span>
          {sampleCertIds.map(id => (
            <button
              key={id}
              onClick={() => {
                setVerifyCode(id);
                verifyCertificate(id).then(setVerificationResult);
              }}
              className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 font-mono text-[11px] text-indigo-300 border border-white/10"
            >
              {id}
            </button>
          ))}
        </div>

        {/* Verification Result Card */}
        {verificationResult && (
          <div className={`p-5 rounded-2xl border transition-all ${
            verificationResult.verified
              ? 'bg-emerald-950/40 border-emerald-500/40'
              : 'bg-rose-950/40 border-rose-500/40'
          }`}>
            {verificationResult.verified && verificationResult.cert ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Officially Verified & Authentic
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {verificationResult.cert.recipientName}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {verificationResult.cert.title} • Issued {verificationResult.cert.issueDate}
                    </p>
                    <p className="text-[11px] font-mono text-emerald-300 mt-1">
                      ID: {verificationResult.cert.credentialId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(verificationResult.cert!)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Official Certificate</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-rose-300">Certificate Not Found</h4>
                  <p className="text-xs text-slate-400">
                    No active credential matches "{verifyCode}". Please check for typos.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ISSUED CERTIFICATES GALLERY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Institutional Certificates</h2>
          <span className="text-xs text-slate-400">{certificates.length} credentials in public registry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#0e1220] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    {cert.type.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-slate-400">{cert.issueDate}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">
                    Awarded to: {cert.recipientName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{cert.eventName}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">ID: {cert.credentialId}</span>
                  <QrCode className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Blockchain Signed
                </span>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
};
