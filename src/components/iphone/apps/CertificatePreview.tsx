import React from 'react';
import { CertificateItem } from '../../../types';
import { IOSCard } from '../ui/IOSCard';
import { IOSButton } from '../ui/IOSButton';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Hash, 
  Share2, 
  X, 
  Sparkles 
} from 'lucide-react';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

export interface CertificatePreviewProps {
  certificate: CertificateItem;
  onClose: () => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ certificate, onClose }) => {
  const handleVerify = () => {
    sound.tap();
    window.open(certificate.verificationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex flex-col justify-end p-2 animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-h-[90vh] bg-white dark:bg-neutral-900 rounded-[28px] border border-neutral-200 dark:border-neutral-800 p-4 overflow-y-auto shadow-2xl flex flex-col justify-between">
        
        {/* Top Close Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {certificate.badge}
            </span>
          </div>
          <button
            onClick={() => {
              sound.tap();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Card Content */}
        <div className="py-4 space-y-4">
          <div>
            <h2 className="text-[18px] font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
              {certificate.title}
            </h2>
            <p className="text-[13px] font-medium text-[#007AFF] mt-0.5">
              Issued by {certificate.issuer}
            </p>
          </div>

          {/* Certificate Credential Document Preview */}
          {certificate.imageSrc && (
            <div className="w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-700/80 bg-neutral-950 shadow-md aspect-[4/3] relative">
              <img
                src={resolveMediaUrl(certificate.imageSrc, 'assets/certifications')}
                alt={certificate.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Description */}
          <IOSCard padding="sm" className="bg-neutral-50/80 dark:bg-neutral-800/60">
            <p className="text-[12.5px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {certificate.description}
            </p>
          </IOSCard>

          {/* Meta Details List */}
          <IOSList>
            <IOSListItem
              icon={<Calendar className="w-4 h-4" />}
              iconBg="bg-blue-500"
              title="Issue Date"
              value={certificate.date}
            />
            <IOSListItem
              icon={<Hash className="w-4 h-4" />}
              iconBg="bg-purple-500"
              title="Credential ID"
              value={<span className="font-mono text-[11px] truncate max-w-[130px]">{certificate.credentialId}</span>}
            />
            <IOSListItem
              icon={<ShieldCheck className="w-4 h-4" />}
              iconBg="bg-emerald-500"
              title="Status"
              value={<span className="text-emerald-500 font-semibold text-[12px]">Verified & Authentic</span>}
            />
          </IOSList>

          {/* Skills Covered Tags */}
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
              Validated Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {certificate.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-[11.5px] font-medium border border-blue-200/50 dark:border-blue-800/40 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Verify Action */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
          <IOSButton
            fullWidth
            variant="primary"
            icon={<ExternalLink className="w-4 h-4" />}
            onClick={handleVerify}
          >
            Verify Credential
          </IOSButton>
        </div>
      </div>
    </div>
  );
};
