import React from 'react';
import { ExternalLink, FileCheck2 } from 'lucide-react';
import { AppWindow } from '../ui/AppWindow';
import { IOSButton } from '../ui/IOSButton';
import { sound } from '../../../utils/audioHaptics';
import cvPdf from '../../../assets/CV/cv (4).pdf';

export const CVApp: React.FC = () => {
  const openCv = () => {
    sound.tap();
    window.open(cvPdf, '_blank', 'noopener,noreferrer');
  };

  return (
    <AppWindow
      id="cv"
      title="CV"
      subtitle="Uploaded CV PDF"
      icon={<FileCheck2 className="w-4 h-4 text-blue-500" />}
    >
      <div className="flex h-full min-h-0 flex-col gap-3">
        <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <iframe title="Abinash Swain CV" src={cvPdf} className="h-full min-h-[420px] w-full border-0" />
        </div>
        <IOSButton fullWidth variant="primary" icon={<ExternalLink className="w-4 h-4" />} onClick={openCv}>
          Open CV PDF
        </IOSButton>
      </div>
    </AppWindow>
  );
};
