import React, { useEffect, useRef, useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { 
  Camera, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Image as ImageIcon, 
  Circle, 
  Check, 
  Grid, 
  Settings 
} from 'lucide-react';
import { useDevice } from '../../../context/DeviceContext';
import { MediaItem } from '../../../types';
import { sound } from '../../../utils/audioHaptics';

export const CameraApp: React.FC = () => {
  const { openApp, cameraControl, clickCameraControl, addMediaItem } = useDevice();
  const [cameraMode, setCameraMode] = useState<'PHOTO' | 'VIDEO' | 'PORTRAIT' | 'PRO'>('PHOTO');
  const [zoomLevel, setZoomLevel] = useState<'0.5x' | '1x' | '2x' | '5x'>('1x');
  const [flash, setFlash] = useState(false);
  const [shutterEffect, setShutterEffect] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [lastCapture, setLastCapture] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let cancelled = false;
    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera access is unavailable in this browser');
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (cancelled) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch {
        setCameraError('Camera permission is required for live preview');
      }
    };
    startCamera();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    };
  }, []);

  const handleCapture = () => {
    sound.cameraShutter();
    setShutterEffect(true);
    setTimeout(() => setShutterEffect(false), 150);
    const video = videoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
    const capture: MediaItem = {
      id: `camera-${Date.now()}`,
      title: `Camera Capture ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      category: 'Photography',
      type: 'image',
      thumbnail: imageUrl,
      mediaUrl: imageUrl,
      description: 'Captured with iPhone Camera',
      year: String(new Date().getFullYear())
    };
    addMediaItem(capture);
    setLastCapture(imageUrl);
  };

  return (
    <AppWindow
      id="camera"
      title="Camera"
      icon={<Camera className="w-4 h-4 text-neutral-400" />}
      backgroundClass="bg-black"
      headerClass="bg-black/70 text-white backdrop-blur-md border-b border-neutral-900"
      noPadding
    >
      <div className="w-full h-full flex flex-col justify-between text-white select-none relative bg-black">
        {/* Top Controls Bar */}
        <div className="w-full px-4 py-2 flex items-center justify-between z-20">
          <button
            onClick={() => {
              sound.tap();
              setFlash(!flash);
            }}
            className={`p-2 rounded-full cursor-pointer ${flash ? 'bg-amber-400 text-black' : 'bg-neutral-800/80 text-white'}`}
          >
            <Zap className="w-4 h-4" />
          </button>
          <div className="px-2.5 py-1 rounded-full bg-neutral-800/80 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>48MP Fusion • RAW</span>
          </div>
          <button
            onClick={() => sound.tap()}
            className="p-2 rounded-full bg-neutral-800/80 text-white cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Glass Area */}
        <div className="relative flex-1 w-full mx-auto my-1 flex items-center justify-center overflow-hidden bg-neutral-950 rounded-[28px] border border-neutral-900 shadow-inner">
          {/* Simulated Shutter Blackout */}
          {shutterEffect && (
            <div className="absolute inset-0 bg-black z-30 transition-opacity" />
          )}

          <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          {cameraError && <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-xs text-neutral-400 bg-neutral-950">{cameraError}</div>}

          {/* Viewfinder Composition Grid */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-25">
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-white" />
            <div className="border-r border-white" />
            <div />
          </div>

          {/* AI Focus Reticle */}
          <div className="w-24 h-24 rounded-lg border border-amber-400/80 flex items-center justify-center animate-pulse">
            <div className="w-1 h-1 rounded-full bg-amber-400" />
            <div className="absolute -top-4 text-[10px] font-mono text-amber-400">
              AI Subject Focus
            </div>
          </div>

          {/* Zoom Dial Pill */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
            {(['0.5x', '1x', '2x', '5x'] as const).map((z) => (
              <button
                key={z}
                onClick={() => {
                  sound.tap();
                  setZoomLevel(z);
                }}
                className={`w-7 h-7 rounded-full text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  zoomLevel === z ? 'bg-amber-400 text-black shadow-md' : 'text-white/80 hover:text-white'
                }`}
              >
                {z.replace('x', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector Strip */}
        <div className="w-full flex items-center justify-center gap-6 py-2 text-[12px] font-semibold uppercase tracking-wider text-white/50">
          {(['PORTRAIT', 'PHOTO', 'VIDEO', 'PRO'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                sound.tap();
                setCameraMode(mode);
              }}
              className={`cursor-pointer transition-colors ${
                cameraMode === mode ? 'text-amber-400 font-bold scale-105' : 'hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Bottom Shutter & Gallery Bar */}
        <div className="w-full px-8 pb-4 flex items-center justify-between">
          {/* Gallery Thumbnail */}
          <button
            onClick={() => {
              sound.tap();
              openApp('photos');
            }}
            className="w-11 h-11 rounded-xl bg-neutral-800 overflow-hidden border border-white/20 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
          >
            {lastCapture ? <img src={lastCapture} alt="Last camera capture" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-white/70" />}
          </button>

          {/* Shutter Button */}
          <button
            onClick={handleCapture}
            className="w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center cursor-pointer active:scale-90 transition-transform shadow-xl"
          >
            <div className={`w-full h-full rounded-full ${cameraMode === 'VIDEO' ? 'bg-red-500 rounded-lg' : 'bg-white'}`} />
          </button>

          {/* Switch Camera Lens */}
          <button
            onClick={() => sound.tap()}
            className="w-11 h-11 rounded-full bg-neutral-800/80 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </AppWindow>
  );
};
