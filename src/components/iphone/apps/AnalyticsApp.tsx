import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSCard } from '../ui/IOSCard';
import { IOSList, IOSListItem } from '../ui/IOSList';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { IOSSegmentedControl } from '../ui/IOSSegmentedControl';
import { 
  BarChart3, 
  TrendingUp, 
  Radio, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Zap, 
  Layers 
} from 'lucide-react';

export const AnalyticsApp: React.FC = () => {
  const [modelType, setModelType] = useState<'5g' | 'safedrive'>('5g');

  return (
    <AppWindow
      id="analytics"
      title="Model Analytics"
      subtitle="Telemetry & Accuracy Benchmarks"
      icon={<BarChart3 className="w-4 h-4 text-teal-500" />}
    >
      {/* Segmented Selector */}
      <IOSSegmentedControl
        options={[
          { value: '5g', label: '5G Small-Cell KPI' },
          { value: 'safedrive', label: 'SafeDrive AI' },
        ]}
        value={modelType}
        onChange={(v) => setModelType(v as '5g' | 'safedrive')}
        className="mb-4"
      />

      {modelType === '5g' ? (
        <div className="space-y-4">
          {/* Hero Platter */}
          <IOSCard variant="tinted" className="bg-blue-50/70 dark:bg-blue-950/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-[#007AFF] uppercase tracking-wider">
                Random Forest Telemetry Classifier
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-bold">
                96.2% Accuracy
              </span>
            </div>
            <div className="text-[28px] font-extrabold text-neutral-900 dark:text-white tracking-tight">
              96.5% <span className="text-sm font-normal text-neutral-500">Weighted F1</span>
            </div>
            <p className="text-[12px] text-neutral-600 dark:text-neutral-400 mt-1">
              Trained on 5,000 small-cell telemetry records across 4 network slices (eMBB, URLLC, mMTC, HC).
            </p>
          </IOSCard>

          {/* Metric Rows */}
          <IOSSectionHeader title="KPI Feature Importances" />
          <IOSList>
            {[
              { name: 'Downlink Throughput (Mbps)', weight: '94%', rank: '0.28 Gini' },
              { name: 'Radio Latency (ms)', weight: '91%', rank: '0.22 Gini' },
              { name: 'Packet Loss Ratio (%)', weight: '88%', rank: '0.19 Gini' },
              { name: 'PRB Utilization Rate (%)', weight: '82%', rank: '0.15 Gini' },
              { name: 'RSRP / Signal Quality', weight: '76%', rank: '0.11 Gini' },
            ].map((kpi, idx) => (
              <IOSListItem
                key={idx}
                icon={<Activity className="w-4 h-4" />}
                iconBg="bg-blue-500"
                title={kpi.name}
                subtitle={`Gini Importance: ${kpi.rank}`}
                value={<span className="font-mono text-emerald-500 font-semibold">{kpi.weight}</span>}
              />
            ))}
          </IOSList>

          {/* Slices Validation Breakdown */}
          <IOSSectionHeader title="Network Slice SLA Compliance" />
          <div className="grid grid-cols-2 gap-2">
            {[
              { slice: 'eMBB (Enhanced Mobile)', acc: '97.4%', samples: '1,500' },
              { slice: 'URLLC (Ultra-Reliable)', acc: '98.1%', samples: '1,250' },
              { slice: 'mMTC (Massive IoT)', acc: '95.6%', samples: '1,250' },
              { slice: 'High-Capacity (HC)', acc: '94.2%', samples: '1,000' },
            ].map((s, idx) => (
              <IOSCard key={idx} padding="sm">
                <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 block">
                  {s.slice}
                </span>
                <span className="text-[16px] font-bold text-neutral-900 dark:text-white mt-0.5 block">
                  {s.acc}
                </span>
                <span className="text-[10px] text-neutral-400 block">
                  {s.samples} Records
                </span>
              </IOSCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <IOSCard variant="tinted" className="bg-sky-50/70 dark:bg-sky-950/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-semibold text-sky-600 uppercase tracking-wider">
                Accident Risk Severity Model
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-mono font-bold">
                Multi-Class
              </span>
            </div>
            <div className="text-[28px] font-extrabold text-neutral-900 dark:text-white tracking-tight">
              &lt; 45ms <span className="text-sm font-normal text-neutral-500">Inference Latency</span>
            </div>
            <p className="text-[12px] text-neutral-600 dark:text-neutral-400 mt-1">
              Classifies Slight, Serious, and Fatal risk probability using 14 environmental and road vectors.
            </p>
          </IOSCard>

          <IOSSectionHeader title="Vector Correlations" />
          <IOSList>
            <IOSListItem
              icon={<ShieldAlert className="w-4 h-4" />}
              iconBg="bg-rose-500"
              title="Road Surface & Weather Index"
              subtitle="Strongest determinant for severe collision risk"
              value="r = 0.78"
            />
            <IOSListItem
              icon={<Zap className="w-4 h-4" />}
              iconBg="bg-amber-500"
              title="Lighting & Time-of-Day Factor"
              subtitle="Nighttime rural road segments show +42% fatality likelihood"
              value="r = 0.65"
            />
          </IOSList>
        </div>
      )}
    </AppWindow>
  );
};
