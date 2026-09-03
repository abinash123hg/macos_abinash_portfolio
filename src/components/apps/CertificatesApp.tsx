import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { CertificateItem } from '../../types';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Layers, 
  Eye, 
  X, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

export const CertificatesApp: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-950/90 text-neutral-100 p-4 sm:p-6 select-text space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Certifications & Industry Credentials
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Verified credentials from Oracle, Adobe, Deloitte, Tata, and Skill India NSDC.
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          All Credentials Verified
        </div>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioData.certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Badge & Date */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {cert.badge}
                </span>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <Calendar className="w-3 h-3 text-neutral-500" />
                  {cert.date}
                </div>
              </div>

              {/* Certificate Document Visual Preview */}
              {cert.imageSrc && (
                <div
                  onClick={() => {
                    sound.tap();
                    setSelectedCert(cert);
                  }}
                  className="w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/90 aspect-[16/10] relative cursor-pointer group-hover:border-amber-500/40 transition-all flex items-center justify-center shadow-inner"
                >
                  <img
                    src={resolveMediaUrl(cert.imageSrc, 'assets/certifications')}
                    alt={cert.title}
                    className="w-full h-full object-contain p-1.5 group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      View Certificate
                    </span>
                  </div>
                </div>
              )}

              {/* Title & Issuer */}
              <div>
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">{cert.issuer}</p>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {cert.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800/80 text-neutral-300 border border-neutral-700/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <div className="text-[11px] font-mono text-neutral-400 truncate max-w-[170px]" title={cert.credentialId}>
                ID: {cert.credentialId}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.tap();
                    setSelectedCert(cert);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Inspect
                </button>
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Verify
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Certificate Inspection */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl relative">
            <button
              onClick={() => {
                sound.tap();
                setSelectedCert(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{selectedCert.badge}</span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">{selectedCert.title}</h2>
              <p className="text-xs text-neutral-400 mt-0.5">{selectedCert.issuer} • Issued {selectedCert.date}</p>
            </div>

            {selectedCert.imageSrc && (
              <div className="w-full rounded-xl overflow-hidden border border-neutral-700 bg-neutral-950 aspect-[16/10] relative flex items-center justify-center">
                <img
                  src={resolveMediaUrl(selectedCert.imageSrc, 'assets/certifications')}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 leading-relaxed">
              {selectedCert.description}
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-neutral-300">Verified Competencies:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-800 flex items-center justify-between text-xs">
              <div>
                <div className="text-[10px] text-neutral-500 uppercase font-mono">Credential ID</div>
                <div className="font-mono text-cyan-300 font-semibold">{selectedCert.credentialId}</div>
              </div>
              {selectedCert.verificationUrl && (
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-neutral-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Official Portal
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
