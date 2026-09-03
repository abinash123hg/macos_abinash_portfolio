import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { CertificatePreview } from './CertificatePreview';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  FileBadge,
  Eye
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { CertificateItem } from '../../../types';
import { sound } from '../../../utils/audioHaptics';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

export const CertificationsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Cloud & AI' | 'Data Analytics' | 'Industry Training'>('All');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  const filteredCerts = portfolioData.certificates.filter(c => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  const flagship = portfolioData.certificates.find(c => c.id === 'cert-oracle-agentic') || portfolioData.certificates.find(c => c.id === 'cert-adobe-ai-essentials') || portfolioData.certificates[0];

  return (
    <AppWindow
      id="certificates"
      title="Certifications"
      subtitle={`${portfolioData.certificates.length} Verified Credentials`}
      icon={<Award className="w-4 h-4 text-amber-500" />}
    >
      {/* Category Segmented Control */}
      <IOSSegmentedControl
        options={[
          { value: 'All', label: `All (${portfolioData.certificates.length})` },
          { value: 'Cloud & AI', label: 'AI & Cloud' },
          { value: 'Data Analytics', label: 'Analytics' },
          { value: 'Industry Training', label: 'Training' },
        ]}
        value={selectedCategory}
        onChange={(v) => setSelectedCategory(v as any)}
        className="mb-4"
      />

      {/* Featured Top Flagship Credential Card */}
      {flagship && (
        <IOSCard
          variant="tinted"
          className="bg-amber-50/90 dark:bg-amber-950/40 border-amber-200/70 dark:border-amber-800/50 mb-4 cursor-pointer overflow-hidden group"
          onClick={() => {
            sound.tap();
            setSelectedCert(flagship);
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Flagship Credential
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
              {flagship.issuer}
            </span>
          </div>

          {/* Certificate Thumbnail Preview */}
          {flagship.imageSrc && (
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/80 border border-amber-200/50 dark:border-amber-900/50 mb-3 relative flex items-center justify-center">
              <img
                src={resolveMediaUrl(flagship.imageSrc, 'assets/certifications')}
                alt={flagship.title}
                className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <Eye className="w-3 h-3 text-amber-400" /> Tap to Inspect
                </span>
              </div>
            </div>
          )}

          <h3 className="text-[15px] font-bold text-neutral-900 dark:text-white tracking-tight leading-snug">
            {flagship.title}
          </h3>
          <p className="text-[12px] text-neutral-600 dark:text-neutral-400 mt-1 leading-snug line-clamp-2">
            {flagship.description}
          </p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-amber-200/50 dark:border-amber-800/40 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            <span className="truncate max-w-[200px]">ID: {flagship.credentialId}</span>
            <span className="flex items-center gap-0.5 shrink-0">View Certificate <ChevronRight className="w-3 h-3" /></span>
          </div>
        </IOSCard>
      )}

      {/* All Certifications Inset List */}
      <IOSSectionHeader title="Verified Credentials Library" />
      <IOSList>
        {filteredCerts.map((cert) => (
          <IOSListItem
            key={cert.id}
            icon={
              cert.imageSrc ? (
                <img
                  src={resolveMediaUrl(cert.imageSrc, 'assets/certifications')}
                  alt={cert.title}
                  className="w-full h-full object-cover rounded-[7px]"
                />
              ) : (
                <FileBadge className="w-4 h-4" />
              )
            }
            iconBg={
              cert.category === 'Cloud & AI'
                ? 'bg-amber-500'
                : cert.category === 'Data Analytics'
                ? 'bg-blue-500'
                : 'bg-emerald-500'
            }
            title={cert.title}
            subtitle={`${cert.issuer} • ${cert.date}`}
            badge={cert.badge}
            badgeColor="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200/40"
            chevron
            onClick={() => {
              sound.tap();
              setSelectedCert(cert);
            }}
          />
        ))}
      </IOSList>

      {/* Verification Trust Guarantee */}
      <IOSCard padding="sm" className="bg-neutral-50 dark:bg-neutral-900/60 text-center mt-3">
        <div className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>All certificates cryptographically verified with official credentials</span>
        </div>
      </IOSCard>

      {/* Modal Preview */}
      {selectedCert && (
        <CertificatePreview
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </AppWindow>
  );
};
