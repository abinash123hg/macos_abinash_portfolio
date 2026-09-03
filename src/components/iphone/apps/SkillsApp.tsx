import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { 
  Code2, 
  BrainCircuit, 
  Database, 
  BarChart3, 
  Sparkles, 
  Terminal, 
  Layers 
} from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

export const SkillsApp: React.FC = () => {
  const [tab, setTab] = useState<'aiml' | 'analytics' | 'tools'>('aiml');

  const skillsData = {
    aiml: [
      { name: 'Scikit-Learn & Ensemble ML', level: '95%', desc: 'Random Forest, Decision Trees, Logistic Regression, XGBoost' },
      { name: 'Agentic AI Architecture', level: '92%', desc: 'Oracle Certified Associate level multi-agent loop orchestration' },
      { name: 'Model Evaluation & Validation', level: '94%', desc: 'Stratified K-Fold, Precision-Recall, ROC-AUC curve analysis' },
      { name: 'Feature Engineering & Cleansing', level: '96%', desc: 'Outlier filtering, iterative imputation, collinearity reduction' },
    ],
    analytics: [
      { name: 'Python (Pandas & NumPy)', level: '96%', desc: 'High-speed matrix, tabular analysis & vector operations' },
      { name: 'Exploratory Data Analysis (EDA)', level: '95%', desc: 'Hypothesis testing, statistical distributions & correlation matrices' },
      { name: 'SQL & Database Systems', level: '90%', desc: 'Complex relational joins, window aggregations & query optimization' },
      { name: 'Streamlit & Interactive Dashboards', level: '94%', desc: 'Production-ready interactive web applications for ML delivery' },
    ],
    tools: [
      { name: 'Git & GitHub Version Control', level: '92%', desc: 'Feature branching, PR reviews & CI/CD workflows' },
      { name: 'Jupyter & VS Code', level: '95%', desc: 'Interactive experimentation & production scripting' },
      { name: 'Data Visualization (Matplotlib/Seaborn)', level: '91%', desc: 'Scientific publication-grade charts & telemetry plots' },
      { name: 'Oracle Cloud & AI Foundations', level: '90%', desc: 'Cloud infrastructure & enterprise AI tool invocation' },
    ],
  };

  const currentList = skillsData[tab];

  return (
    <AppWindow
      id="skills"
      title="Skills & Stack"
      subtitle="Technical Competencies"
      icon={<Code2 className="w-4 h-4 text-emerald-500" />}
    >
      <IOSSegmentedControl
        options={[
          { value: 'aiml', label: 'AI & ML' },
          { value: 'analytics', label: 'Analytics' },
          { value: 'tools', label: 'Tools & Cloud' },
        ]}
        value={tab}
        onChange={(v) => setTab(v as any)}
        className="mb-4"
      />

      <IOSSectionHeader title="Core Capabilities" />
      <div className="space-y-3">
        {currentList.map((skill, idx) => (
          <IOSCard key={idx} padding="sm" className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] font-bold text-neutral-900 dark:text-white">
                {skill.name}
              </span>
              <span className="text-[12px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {skill.level}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: skill.level }}
              />
            </div>
            <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-snug">
              {skill.desc}
            </p>
          </IOSCard>
        ))}
      </div>
    </AppWindow>
  );
};
