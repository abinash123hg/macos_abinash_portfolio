import React, { useState } from 'react';
import { 
  BarChart3, 
  Activity, 
  Radio, 
  ShieldAlert, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Sliders,
  TrendingUp,
  Layers
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const AnalyticsLabApp: React.FC = () => {
  const [modelType, setModelType] = useState<'5g' | 'safedrive'>('5g');
  const [latencyFilter, setLatencyFilter] = useState(15);
  const [throughputFilter, setThroughputFilter] = useState(450);

  return (
    <div className="h-full w-full bg-neutral-900/95 text-neutral-100 flex flex-col overflow-hidden select-text">
      {/* Top Toolbar */}
      <div className="h-12 px-5 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white tracking-tight">
              Model Analytics & Telemetry Lab
            </h2>
            <p className="text-[10.5px] text-neutral-400">
              5G Small-Cell Random Forest & Computer Vision Benchmarks
            </p>
          </div>
        </div>

        {/* Model Switcher */}
        <div className="flex items-center gap-1 bg-neutral-800/80 p-1 rounded-lg border border-neutral-700/60">
          <button
            onClick={() => {
              sound.tap();
              setModelType('5g');
            }}
            className={`px-3 py-1 rounded-md text-[11.5px] font-semibold transition-all cursor-pointer ${
              modelType === '5g' ? 'bg-teal-500 text-neutral-950 font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            5G Small-Cell KPI
          </button>
          <button
            onClick={() => {
              sound.tap();
              setModelType('safedrive');
            }}
            className={`px-3 py-1 rounded-md text-[11.5px] font-semibold transition-all cursor-pointer ${
              modelType === 'safedrive' ? 'bg-teal-500 text-neutral-950 font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            SafeDrive Vision AI
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        {modelType === '5g' ? (
          <>
            {/* Hero Stats */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/40 via-neutral-900 to-neutral-900 border border-teal-800/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                    Random Forest Telemetry Classifier
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10.5px] font-mono font-bold">
                    96.2% Generalization Accuracy
                  </span>
                </div>
                <div className="text-[28px] font-black text-white tracking-tight font-mono">
                  96.5% <span className="text-[14px] font-normal text-neutral-400">Weighted F1-Score</span>
                </div>
                <p className="text-[12.5px] text-neutral-300 mt-1 max-w-xl">
                  Evaluated on 5,000 small-cell telemetry records across 4 network slices (eMBB, URLLC, mMTC, HC).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 shrink-0">
                <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 text-center">
                  <div className="text-[11px] text-neutral-400">Test Instances</div>
                  <div className="text-[18px] font-bold text-white font-mono">1,000</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 text-center">
                  <div className="text-[11px] text-neutral-400">ROC-AUC</div>
                  <div className="text-[18px] font-bold text-emerald-400 font-mono">0.984</div>
                </div>
              </div>
            </div>

            {/* Feature Importance Grid */}
            <div>
              <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Telemetry Feature Importances (Gini Index)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Downlink Throughput (Mbps)', weight: 94, rank: '0.28 Gini' },
                  { name: 'Radio Latency (ms)', weight: 91, rank: '0.22 Gini' },
                  { name: 'Packet Loss Ratio (%)', weight: 88, rank: '0.19 Gini' },
                  { name: 'PRB Utilization Rate (%)', weight: 82, rank: '0.15 Gini' },
                  { name: 'RSRP / Signal Quality (dBm)', weight: 76, rank: '0.11 Gini' },
                  { name: 'Jitter Variation (ms)', weight: 68, rank: '0.05 Gini' },
                ].map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12.5px] font-semibold text-white">{kpi.name}</span>
                      <span className="text-[11px] font-mono text-teal-400">{kpi.rank}</span>
                    </div>
                    <div className="w-full bg-neutral-700/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-400 h-full rounded-full transition-all"
                        style={{ width: `${kpi.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* SafeDrive Vision Analytics */
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900 to-neutral-900 border border-purple-800/40 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                  CNN Drowsiness & Distraction Telemetry
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10.5px] font-mono font-bold">
                  28ms Real-Time Inference
                </span>
              </div>
              <div className="text-[28px] font-black text-white tracking-tight font-mono">
                94.8% <span className="text-[14px] font-normal text-neutral-400">Facial Keypoint Accuracy</span>
              </div>
              <p className="text-[12.5px] text-neutral-300 mt-1 max-w-xl">
                EAR (Eye Aspect Ratio) + MAR (Mouth Aspect Ratio) thresholding pipeline with automated alert dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                <div className="text-[11px] text-neutral-400 uppercase font-bold">EAR Threshold</div>
                <div className="text-[20px] font-bold text-white font-mono mt-1">0.22</div>
                <p className="text-[11px] text-neutral-400 mt-1">Eye-closure trigger &gt; 3 frames</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                <div className="text-[11px] text-neutral-400 uppercase font-bold">MAR Threshold</div>
                <div className="text-[20px] font-bold text-white font-mono mt-1">0.65</div>
                <p className="text-[11px] text-neutral-400 mt-1">Yawn duration trigger &gt; 15 frames</p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                <div className="text-[11px] text-neutral-400 uppercase font-bold">Inference Pipeline</div>
                <div className="text-[20px] font-bold text-emerald-400 font-mono mt-1">35 FPS</div>
                <p className="text-[11px] text-neutral-400 mt-1">Optimized with OpenCV + MediaPipe</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
