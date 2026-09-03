import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Video, 
  Linkedin, 
  Github, 
  MapPin, 
  Building2, 
  Check, 
  Share2, 
  Copy 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';

export const ContactApp: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    sound.tap();
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AppWindow
      id="contact"
      title="Contact"
      subtitle="Abinash Swain"
      icon={<Phone className="w-4 h-4 text-emerald-500" />}
    >
      {/* Contact Profile Header */}
      <div className="flex flex-col items-center text-center my-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-2 ring-4 ring-white dark:ring-neutral-900">
          AS
        </div>
        <h2 className="text-[20px] font-bold text-neutral-900 dark:text-white tracking-tight">
          {portfolioData.name}
        </h2>
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
          {portfolioData.title}
        </p>

        {/* 4 iOS Quick Action Tiles */}
        <div className="grid grid-cols-4 gap-2.5 w-full max-w-xs mt-4">
          <a
            href={`sms:${portfolioData.phone}`}
            className="p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col items-center gap-1 text-[#007AFF] shadow-xs active:scale-95 transition-transform"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">Message</span>
          </a>
          <a
            href={`tel:${portfolioData.phone}`}
            className="p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col items-center gap-1 text-[#34C759] shadow-xs active:scale-95 transition-transform"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">Call</span>
          </a>
          <a
            href={`mailto:${portfolioData.email}`}
            className="p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col items-center gap-1 text-[#007AFF] shadow-xs active:scale-95 transition-transform"
          >
            <Mail className="w-5 h-5" />
            <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">Mail</span>
          </a>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 flex flex-col items-center gap-1 text-sky-500 shadow-xs active:scale-95 transition-transform"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-[11px] font-medium text-neutral-600 dark:text-neutral-300">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Inset Group Details */}
      <IOSSectionHeader title="Contact Information" />
      <IOSList>
        <IOSListItem
          icon={<Phone className="w-4 h-4" />}
          iconBg="bg-[#34C759]"
          title="Mobile"
          subtitle={portfolioData.phone}
          value={
            <button
              onClick={() => handleCopy(portfolioData.phone, 'phone')}
              className="text-[#007AFF] hover:underline flex items-center gap-1"
            >
              {copied === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'phone' ? 'Copied' : 'Copy'}</span>
            </button>
          }
        />
        <IOSListItem
          icon={<Mail className="w-4 h-4" />}
          iconBg="bg-[#007AFF]"
          title="Email"
          subtitle={portfolioData.email}
          value={
            <button
              onClick={() => handleCopy(portfolioData.email, 'email')}
              className="text-[#007AFF] hover:underline flex items-center gap-1"
            >
              {copied === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === 'email' ? 'Copied' : 'Copy'}</span>
            </button>
          }
        />
        <IOSListItem
          icon={<Github className="w-4 h-4" />}
          iconBg="bg-neutral-900"
          title="GitHub"
          subtitle="github.com/abinash123hg"
          chevron
          onClick={() => window.open(portfolioData.github, '_blank')}
        />
        <IOSListItem
          icon={<MapPin className="w-4 h-4" />}
          iconBg="bg-rose-500"
          title="Location"
          subtitle={portfolioData.location}
        />
      </IOSList>

      {/* University & Organization */}
      <IOSSectionHeader title="Education & Affiliation" />
      <IOSCard className="mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-[#007AFF] flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[14px] font-semibold text-neutral-900 dark:text-white">
              {portfolioData.college}
            </h4>
            <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
              B.Tech in Computer Science & Engineering (AI & ML)
            </p>
          </div>
        </div>
      </IOSCard>

      {/* Share / Save Contact Button */}
      <IOSButton
        fullWidth
        variant="primary"
        icon={<Share2 className="w-4 h-4" />}
        onClick={() => {
          sound.tap();
          handleCopy(
            `Name: ${portfolioData.name}\nRole: ${portfolioData.title}\nEmail: ${portfolioData.email}\nPhone: ${portfolioData.phone}\nGitHub: ${portfolioData.github}`,
            'vcard'
          );
        }}
      >
        {copied === 'vcard' ? 'Contact Details Copied!' : 'Share Contact Card'}
      </IOSButton>
    </AppWindow>
  );
};
