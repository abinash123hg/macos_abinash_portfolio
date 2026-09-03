import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Folder, 
  FileText, 
  FileCode2, 
  Image as ImageIcon, 
  Database, 
  ChevronRight, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useDevice } from '../../../context/DeviceContext';
import { sound } from '../../../utils/audioHaptics';

export const FinderApp: React.FC = () => {
  const { openApp } = useDevice();
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const folders = [
    {
      id: 'projects_dir',
      name: 'AI Models & Scripts',
      count: '4 models',
      size: '128 MB',
      iconBg: 'bg-blue-500',
      appTarget: 'projects',
      items: [
        { name: '5g_kpi_random_forest.py', size: '14.2 KB', type: 'Python' },
        { name: 'safedrive_hotspot_model.pkl', size: '84.6 MB', type: 'Model Binary' },
        { name: 'csv_intelligence_engine.py', size: '22.8 KB', type: 'Python' },
        { name: 'viral_predictor_nlp.py', size: '18.1 KB', type: 'Python' },
      ],
    },
    {
      id: 'certs_dir',
      name: 'Official Credentials',
      count: '4 documents',
      size: '18.4 MB',
      iconBg: 'bg-amber-500',
      appTarget: 'certificates',
      items: [
        { name: 'Oracle_Agentic_AI_103519150AAI26OFA.pdf', size: '4.2 MB', type: 'PDF' },
        { name: 'Tata_GenAI_Data_Analytics.pdf', size: '3.8 MB', type: 'PDF' },
        { name: 'Deloitte_Forensic_Analytics.pdf', size: '5.1 MB', type: 'PDF' },
        { name: 'Skill_India_NSDC_Inventory_AI.pdf', size: '5.3 MB', type: 'PDF' },
      ],
    },
    {
      id: 'resume_dir',
      name: 'Resume & Documents',
      count: '2 files',
      size: '1.2 MB',
      iconBg: 'bg-rose-500',
      appTarget: 'resume',
      items: [
        { name: 'Abinash_Swain_Data_Analyst_Resume.pdf', size: '420 KB', type: 'PDF' },
        { name: 'Academic_Transcript_CUTM_8.32.pdf', size: '780 KB', type: 'PDF' },
      ],
    },
    {
      id: 'telemetry_dir',
      name: '5G Telemetry Datasets',
      count: '5,000 records',
      size: '48.2 MB',
      iconBg: 'bg-emerald-500',
      appTarget: 'analytics',
      items: [
        { name: 'small_cell_sla_telemetry_5000.csv', size: '38.4 MB', type: 'CSV' },
        { name: 'network_slices_embb_urllc.json', size: '9.8 MB', type: 'JSON' },
      ],
    },
  ];

  const active = folders.find(f => f.id === currentFolder);

  return (
    <AppWindow
      id="finder"
      title={active ? active.name : 'Files'}
      subtitle={active ? active.count : 'iCloud Drive'}
      icon={<Folder className="w-4 h-4 text-blue-500" />}
      onBack={active ? () => setCurrentFolder(null) : undefined}
      backLabel={active ? 'Browse' : 'Back'}
    >
      {!active ? (
        <div className="space-y-4">
          <IOSSectionHeader title="Locations" />
          <IOSList>
            {folders.map((folder) => (
              <IOSListItem
                key={folder.id}
                icon={<Folder className="w-4 h-4" />}
                iconBg={folder.iconBg}
                title={folder.name}
                subtitle={`${folder.count} • ${folder.size}`}
                chevron
                onClick={() => {
                  sound.tap();
                  setCurrentFolder(folder.id);
                }}
              />
            ))}
          </IOSList>

          <IOSSectionHeader title="Storage Status" />
          <IOSCard padding="sm">
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">Local Storage</span>
              <span className="text-neutral-500">195.8 MB of 256 GB used</span>
            </div>
            <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex">
              <div className="w-[15%] h-full bg-[#007AFF]" />
              <div className="w-[10%] h-full bg-[#34C759]" />
              <div className="w-[5%] h-full bg-[#FF9500]" />
            </div>
          </IOSCard>
        </div>
      ) : (
        <div className="space-y-4">
          <IOSSectionHeader title="Files" />
          <IOSList>
            {active.items.map((file, idx) => (
              <IOSListItem
                key={idx}
                icon={file.type === 'Python' ? <FileCode2 className="w-4 h-4" /> : file.type === 'CSV' ? <Database className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                iconBg="bg-neutral-700"
                title={file.name}
                subtitle={`${file.type} • ${file.size}`}
                chevron
                onClick={() => {
                  sound.appOpen();
                  openApp(active.appTarget);
                }}
              />
            ))}
          </IOSList>
        </div>
      )}
    </AppWindow>
  );
};
