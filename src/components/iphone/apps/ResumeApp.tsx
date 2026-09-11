import React from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  FileText, 
  Download, 
  Share2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code2, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioHaptics';
import cvPdf from '../../../assets/CV/cv (4).pdf';

export const ResumeApp: React.FC = () => {
  const handleDownload = () => {
    sound.tap();
    const resumeText = `
ABINASH SWAIN
Data Analyst • AI/ML Engineer
Email: ${portfolioData.email} | Phone: ${portfolioData.phone} | Location: ${portfolioData.location}
GitHub: ${portfolioData.github} | LinkedIn: ${portfolioData.linkedin}

SUMMARY:
${portfolioData.aboutEditorial}

EDUCATION:
${portfolioData.education.map(item => `- ${item.degree} - ${item.score}\n  ${item.institution} (${item.period})`).join('\n')}

EXPERIENCE:
${portfolioData.experience.map(item => `- ${item.role} | ${item.company} (${item.period})\n${item.responsibilities.map(responsibility => `  * ${responsibility}`).join('\n')}`).join('\n')}

PROJECTS:
${portfolioData.projects.slice(0, 3).map((project, index) => `${index + 1}. ${project.title} - ${project.description}`).join('\n')}

CERTIFICATIONS:
${portfolioData.certificates.map((certificate, index) => `${index + 1}. ${certificate.title} - ${certificate.issuer}${certificate.credentialId ? ` (ID: ${certificate.credentialId})` : ''}`).join('\n')}
    `;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Abinash_Swain_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenCv = () => {
    sound.tap();
    window.open(cvPdf, '_blank', 'noopener,noreferrer');
  };

  return (
    <AppWindow
      id="resume"
      title="Resume"
      subtitle="PDF Document Viewer"
      icon={<FileText className="w-4 h-4 text-rose-500" />}
      headerRight={
        <button
          onClick={handleDownload}
          className="text-[#007AFF] text-[13.5px] font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save</span>
        </button>
      }
    >
      <div className="mb-3 flex items-center justify-between gap-3 rounded-2xl border border-blue-400/25 bg-blue-500/10 p-3 text-left">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-blue-500 dark:text-blue-300">Uploaded CV available</div>
          <div className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-400">Open the latest CV PDF without removing this resume.</div>
        </div>
        <button onClick={handleOpenCv} className="shrink-0 rounded-lg bg-blue-500 px-2.5 py-1.5 text-[11px] font-semibold text-white cursor-pointer">Open CV PDF</button>
      </div>

      {/* Resume Document Canvas */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[20px] p-4 shadow-sm space-y-4 text-neutral-900 dark:text-white">
        
        {/* Header Section */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3 text-center">
          <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 dark:text-white">
            {portfolioData.name}
          </h2>
          <p className="text-[12.5px] text-[#007AFF] font-medium mt-0.5">
            {portfolioData.title}
          </p>
          <div className="text-[10.5px] text-neutral-500 flex flex-wrap items-center justify-center gap-2 mt-1.5">
            <span>{portfolioData.email}</span>
            <span>•</span>
            <span>{portfolioData.phone}</span>
            <span>•</span>
            <span>{portfolioData.location}</span>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-500" /> Education
          </h4>
          <div className="text-[12.5px]">
            <div className="font-semibold text-neutral-900 dark:text-white">
              {portfolioData.education[0]?.degree} — {portfolioData.education[0]?.score}
            </div>
            <div className="text-neutral-500 text-[11.5px]">
              {portfolioData.education[0]?.institution} ({portfolioData.education[0]?.period})
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-purple-500" /> Professional Experience
          </h4>
          <div className="space-y-2 text-[12px]">
            {portfolioData.experience.map((experience) => (
              <div key={experience.id}>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  {experience.role} — {experience.company}
                </div>
                <div className="text-neutral-500 text-[11px] mb-1">
                  {experience.period} • {experience.location}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-snug">
                  {experience.responsibilities[0]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Flagship Projects
          </h4>
          <div className="space-y-2 text-[12px]">
            {portfolioData.projects.slice(0, 2).map((project) => (
              <div key={project.id}>
                <div className="font-semibold text-neutral-900 dark:text-white">{project.title}</div>
                <p className="text-neutral-600 dark:text-neutral-300 leading-snug text-[11.5px]">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" /> Certifications
          </h4>
          <div className="text-[11.5px] space-y-1 text-neutral-700 dark:text-neutral-300">
            {portfolioData.certificates.slice(0, 3).map((certificate) => (
              <div key={certificate.id}>• <strong>{certificate.issuer}</strong> — {certificate.title}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Download Button */}
      <div className="pt-3">
        <IOSButton
          fullWidth
          variant="gray"
          icon={<FileText className="w-4 h-4" />}
          onClick={handleOpenCv}
        >
          Open Actual CV PDF
        </IOSButton>
      </div>
      <div className="pt-2">
        <IOSButton
          fullWidth
          variant="primary"
          icon={<Download className="w-4 h-4" />}
          onClick={handleDownload}
        >
          Download Resume (TXT)
        </IOSButton>
      </div>
    </AppWindow>
  );
};
