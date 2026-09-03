import React, { useState, useRef, useEffect } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { 
  Camera, 
  Video, 
  RotateCw, 
  Sparkles, 
  Lock, 
  Unlock, 
  Sliders, 
  Eye, 
  Zap, 
  Sun, 
  Aperture, 
  Maximize2 
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const CameraApp: React.FC = () => {
  const { cameraControl, updateCameraControl, clickCameraControl, lockFocusExposure, triggerDynamicIsland } = useDevice();
  const [useWebcam, setUseWebcam] = useState<boolean>(false);
  const [webcamError, setWebcamError] = useState<boolean>(false);
  const [photoFlash, setPhotoFlash] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Try activating webcam if allowed
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then((s) => {
          streamRef.current = s;
          setUseWebcam(true);
        })
        .catch(() => {
          setUseWebcam(false);
          setWebcamError(true);
        });
    }
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (useWebcam && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [useWebcam]);

  const handleCapture = () => {
    setPhotoFlash(true);
    clickCameraControl();
    setTimeout(() => setPhotoFlash(false), 150);
  };

  const getStyleFilter = () => {
    switch (cameraControl.style) {
      case 'Rich Contrast': return 'contrast(1.25) saturate(1.1)';
      case 'Vibrant': return 'saturate(1.4) contrast(1.1)';
      case 'Warm': return 'sepia(0.25) saturate(1.2)';
      case 'Cool': return 'hue-rotate(180deg) saturate(0.9)';
      case 'Dramatic': return 'contrast(1.4) brightness(0.9)';
      default: return 'none';
    }
  };

  return (
    <div className="h-full w-full bg-black text-white relative flex flex-col justify-between overflow-hidden select-none">
      {/* Flash overlay */}
      {photoFlash && (
        <div className="absolute inset-0 bg-white z-50 transition-opacity duration-150" />
      )}

      {/* Top Camera Status Bar */}
      <div className="p-3 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !cameraControl.isAeAfLocked;
              lockFocusExposure(next);
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              cameraControl.isAeAfLocked ? 'bg-amber-500 text-black shadow-md' : 'bg-black/40 text-neutral-300 border border-neutral-700'
            }`}
          >
            {cameraControl.isAeAfLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            <span>AE/AF LOCK</span>
          </button>

          <span className="px-2 py-0.5 rounded-full bg-black/40 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono">
            48MP HEIF Max
          </span>
        </div>

        {/* Visual Intelligence AI Toggle */}
        <button
          onClick={() => {
            sound.tap();
            updateCameraControl({ visualIntelligenceOpen: !cameraControl.visualIntelligenceOpen });
            triggerDynamicIsland({
              mode: 'ai',
              title: cameraControl.visualIntelligenceOpen ? 'Visual AI Offline' : 'Visual Intelligence Scanning',
              subtitle: 'AR Object & Model Analysis'
            }, 2500);
          }}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            cameraControl.visualIntelligenceOpen ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/30' : 'bg-neutral-800 text-neutral-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Visual Intelligence</span>
        </button>
      </div>

      {/* Viewfinder Canvas / Stream */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
        {useWebcam ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transition-all"
            style={{
              filter: getStyleFilter(),
              transform: `scale(${cameraControl.zoom})`
            }}
          />
        ) : (
          /* High-resolution simulated camera sensor feed */
          <div 
            className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-neutral-950 via-slate-900 to-indigo-950 p-6 text-center transition-all"
            style={{
              filter: getStyleFilter(),
              transform: `scale(${cameraControl.zoom})`
            }}
          >
            <div className="w-24 h-24 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400/80 animate-pulse mb-3">
              <Aperture className="w-12 h-12" />
            </div>
            <div className="font-bold text-sm text-neutral-200">Abinash Studio 48MP Photonic Engine</div>
            <div className="text-[11px] text-neutral-400 mt-1">24mm • f/1.78 • ISO 64 • 1/120s</div>
          </div>
        )}

        {/* Focus Reticle */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className={`w-28 h-28 border ${cameraControl.isAeAfLocked ? 'border-amber-400' : 'border-yellow-400/80'} rounded-lg flex items-center justify-center transition-colors`}>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
          </div>
        </div>

        {/* Visual Intelligence AR Overlays */}
        {cameraControl.visualIntelligenceOpen && (
          <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-500/40 text-xs text-cyan-300 space-y-1">
                <div className="font-bold flex items-center gap-1 text-white">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  AI Object Recognized:
                </div>
                <div>Entity: <span className="text-white font-mono">Abinash Neural Architecture</span></div>
                <div>Confidence: <span className="text-emerald-400 font-mono">98.7%</span></div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-500/40 text-xs text-cyan-300 space-y-1 text-right">
                <div className="font-bold text-white">Live Telemetry Analysis</div>
                <div>5G Slice: <span className="text-blue-400 font-mono">eMBB / URLLC</span></div>
                <div>Latency SLA: <span className="text-emerald-400 font-mono">3.2ms</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Camera Control Capacitive Overlay Bar (when light-pressed or tapped) */}
        {cameraControl.menuOpen && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-neutral-700 p-3 rounded-2xl flex items-center gap-3 z-30 shadow-2xl">
            {/* Control Types */}
            {(['zoom', 'exposure', 'depth', 'styles', 'tone'] as const).map(ctrl => (
              <button
                key={ctrl}
                onClick={() => {
                  sound.cameraControlClick();
                  updateCameraControl({ activeControl: ctrl });
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  cameraControl.activeControl === ctrl ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {ctrl}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Optical Zoom Multipliers */}
      <div className="p-2 bg-black/60 flex items-center justify-center gap-3 z-20">
        {[0.5, 1.0, 2.0, 5.0].map((z) => (
          <button
            key={z}
            onClick={() => {
              sound.cameraControlClick();
              updateCameraControl({ zoom: z });
            }}
            className={`w-9 h-9 rounded-full text-xs font-bold font-mono transition-all flex items-center justify-center cursor-pointer ${
              cameraControl.zoom === z
                ? 'bg-amber-400 text-black scale-110 shadow-md'
                : 'bg-black/60 text-neutral-300 border border-neutral-700 hover:text-white'
            }`}
          >
            {z}x
          </button>
        ))}
      </div>

      {/* Bottom Shutter & Controls Strip */}
      <div className="p-4 sm:p-6 bg-black z-20 flex items-center justify-around">
        {/* Style Selector */}
        <button
          onClick={() => {
            sound.cameraControlClick();
            const styles: ('Standard' | 'Rich Contrast' | 'Vibrant' | 'Warm' | 'Cool' | 'Dramatic')[] = [
              'Standard', 'Rich Contrast', 'Vibrant', 'Warm', 'Cool', 'Dramatic'
            ];
            const next = styles[(styles.indexOf(cameraControl.style) + 1) % styles.length];
            updateCameraControl({ style: next });
            triggerDynamicIsland({ mode: 'camera', title: 'Style Changed', subtitle: next }, 1500);
          }}
          className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white cursor-pointer"
          title="Switch Photographic Style"
        >
          <Sliders className="w-5 h-5" />
        </button>

        {/* Big Apple Shutter Button */}
        <button
          onClick={handleCapture}
          className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-xl"
        >
          <div className="w-full h-full rounded-full bg-white transition-all active:bg-neutral-300" />
        </button>

        {/* Camera Control Menu Toggle */}
        <button
          onClick={() => {
            sound.cameraControlClick();
            updateCameraControl({ menuOpen: !cameraControl.menuOpen });
          }}
          className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer"
          title="Camera Control Menu"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
