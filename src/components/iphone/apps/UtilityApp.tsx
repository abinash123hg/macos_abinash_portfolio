import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  CloudSun,
  Clock3,
  Folder,
  MapPin,
  Mic,
  Navigation,
  Plus,
  Rocket,
  Wallet,
  X,
} from 'lucide-react';
import { useDevice } from '../../../context/DeviceContext';

interface UtilityAppProps {
  appId: string;
}

interface LiveLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  updatedAt: Date;
}

const appDetails: Record<string, { title: string; subtitle: string; icon: React.ReactNode; color: string }> = {
  weather: { title: 'Weather', subtitle: 'Bhubaneswar', icon: <CloudSun className="h-6 w-6" />, color: 'from-sky-400 to-blue-600' },
  maps: { title: 'Maps', subtitle: 'Explore places', icon: <MapPin className="h-6 w-6" />, color: 'from-emerald-400 to-teal-600' },
  wallet: { title: 'Wallet', subtitle: 'Your passes', icon: <Wallet className="h-6 w-6" />, color: 'from-neutral-700 to-neutral-950' },
  reminders: { title: 'Reminders', subtitle: 'Stay on track', icon: <CheckCircle2 className="h-6 w-6" />, color: 'from-orange-400 to-rose-600' },
  files: { title: 'Files', subtitle: 'On My iPhone', icon: <Folder className="h-6 w-6" />, color: 'from-blue-400 to-indigo-600' },
  voice: { title: 'Voice Memos', subtitle: 'Recordings', icon: <Mic className="h-6 w-6" />, color: 'from-red-400 to-rose-600' },
  journal: { title: 'Journal', subtitle: 'Reflect and write', icon: <Plus className="h-6 w-6" />, color: 'from-amber-300 to-orange-500' },
  shortcuts: { title: 'Shortcuts', subtitle: 'Quick actions', icon: <Rocket className="h-6 w-6" />, color: 'from-violet-400 to-purple-600' },
  phone: { title: 'Phone', subtitle: 'Recents', icon: <Navigation className="h-6 w-6" />, color: 'from-green-400 to-emerald-600' },
  messages: { title: 'Messages', subtitle: 'Conversations', icon: <CheckCircle2 className="h-6 w-6" />, color: 'from-green-400 to-teal-600' },
};

export const UtilityApp: React.FC<UtilityAppProps> = ({ appId }) => {
  const { closeApp } = useDevice();
  const [now, setNow] = useState(new Date());
  const [calculatorValue, setCalculatorValue] = useState('0');
  const [liveLocation, setLiveLocation] = useState<LiveLocation | null>(null);
  const [locationStatus, setLocationStatus] = useState('Requesting location access...');
  const [isRecording, setIsRecording] = useState(false);
  const [reminderDone, setReminderDone] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    if (appId !== 'clock') return;
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [appId]);

  useEffect(() => {
    if (!['maps', 'weather'].includes(appId)) return;
    if (!navigator.geolocation) {
      setLocationStatus('Location is not available in this browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setLiveLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          updatedAt: new Date(),
        });
        setLocationStatus('Live location active');
      },
      () => setLocationStatus('Location permission is needed for live tracking'),
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 15_000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [appId]);

  const detail = appDetails[appId];
  const runCalculator = (value: string) => {
    if (value === 'C') return setCalculatorValue('0');
    if (value === '=') {
      try {
        setCalculatorValue(String(Function(`"use strict"; return (${calculatorValue})`)()));
      } catch {
        setCalculatorValue('Error');
      }
      return;
    }
    setCalculatorValue((current) => current === '0' || current === 'Error' ? value : `${current}${value}`);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-black/35 text-white backdrop-blur-xl">
      <header className="flex items-center gap-3 border-b border-white/10 px-5 pb-4 pt-14">
        <button onClick={closeApp} aria-label="Back to Home" className="rounded-full p-2 text-white/80 hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className={`flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-br ${detail?.color ?? 'from-neutral-700 to-neutral-950'}`}>
          {appId === 'clock' ? <Clock3 className="h-6 w-6" /> : appId === 'calculator' ? <Calculator className="h-6 w-6" /> : detail?.icon}
        </div>
        <div>
          <h1 className="text-lg font-semibold">{appId === 'clock' ? 'Clock' : appId === 'calculator' ? 'Calculator' : detail?.title}</h1>
          <p className="text-xs text-white/55">{appId === 'clock' ? 'Local time' : appId === 'calculator' ? 'Basic calculator' : detail?.subtitle}</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-5">
        {appId === 'clock' && (
          <section className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center">
            <p className="text-sm text-white/60">Bhubaneswar, India</p>
            <div className="mt-4 text-6xl font-extralight tracking-tight">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <p className="mt-3 text-white/70">{now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </section>
        )}
        {appId === 'calculator' && (
          <section className="mx-auto max-w-sm overflow-hidden rounded-3xl bg-black/50 p-3">
            <div className="px-3 py-7 text-right text-4xl font-light">{calculatorValue}</div>
            <div className="grid grid-cols-4 gap-2">
              {['C', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '(', '1', '2', '3', ')', '0', '.', '='].map((value) => (
                <button key={value} onClick={() => runCalculator(value)} className="h-14 rounded-full bg-white/15 text-lg hover:bg-white/25">{value}</button>
              ))}
            </div>
          </section>
        )}
        {appId === 'weather' && <section className="rounded-3xl bg-gradient-to-br from-sky-400 to-blue-700 p-6"><p className="text-lg">Bhubaneswar</p><div className="mt-5 flex items-center justify-between"><span className="text-6xl font-light">28°</span><CloudSun className="h-16 w-16" /></div><p className="mt-3 text-white/80">Partly cloudy · Feels like 30°</p><div className="mt-6 rounded-2xl bg-black/15 p-3 text-xs text-white/80"><span className="font-semibold text-white">{locationStatus}</span>{liveLocation && <span className="mt-1 block">{liveLocation.latitude.toFixed(4)}, {liveLocation.longitude.toFixed(4)}</span>}</div></section>}
        {appId === 'maps' && <section className="rounded-3xl border border-white/10 bg-emerald-500/15 p-6"><MapPin className="h-10 w-10 text-emerald-300" /><h2 className="mt-5 text-2xl font-semibold">Live location</h2><p className="mt-2 text-white/65">{locationStatus}</p>{liveLocation ? <div className="mt-5 rounded-2xl bg-black/20 p-4 text-sm"><div>{liveLocation.latitude.toFixed(6)}, {liveLocation.longitude.toFixed(6)}</div><div className="mt-1 text-white/55">Accuracy ±{Math.round(liveLocation.accuracy)}m · Updated {liveLocation.updatedAt.toLocaleTimeString()}</div></div> : <div className="mt-5 rounded-2xl bg-black/20 p-4 text-sm text-white/60">Allow location access to track your current position.</div>}<button className="mt-6 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black"><Navigation className="mr-2 inline h-4 w-4" />Explore portfolio places</button></section>}
        {!['clock', 'calculator', 'weather', 'maps'].includes(appId) && <section className="rounded-3xl border border-white/10 bg-white/10 p-6"><h2 className="text-2xl font-semibold">{detail?.title}</h2><p className="mt-2 text-white/60">{detail?.subtitle}</p>{appId === 'reminders' && <button onClick={() => setReminderDone((value) => !value)} className="mt-8 flex w-full items-center gap-3 rounded-2xl bg-white/10 p-4 text-left"><CheckCircle2 className={`h-6 w-6 ${reminderDone ? 'text-emerald-400' : 'text-white/50'}`} /><span className={reminderDone ? 'text-white/50 line-through' : 'text-white'}>Review portfolio improvements</span></button>}{appId === 'voice' && <button onClick={() => setIsRecording((value) => !value)} className={`mt-8 w-full rounded-2xl p-4 font-semibold ${isRecording ? 'bg-red-500' : 'bg-white/10'}`}><Mic className="mr-2 inline h-5 w-5" />{isRecording ? 'Stop recording' : 'Start recording'}</button>}{appId === 'journal' && <textarea value={journalText} onChange={(event) => setJournalText(event.target.value)} placeholder="Write a quick reflection..." className="mt-8 h-32 w-full resize-none rounded-2xl bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35" />}{appId === 'wallet' && <button onClick={() => setActionMessage('Portfolio pass added')} className="mt-8 w-full rounded-2xl bg-white/10 p-4 font-semibold">Add portfolio pass</button>}{appId === 'shortcuts' && <button onClick={() => setActionMessage('Quick action completed')} className="mt-8 w-full rounded-2xl bg-violet-500/60 p-4 font-semibold">Run portfolio shortcut</button>}{actionMessage && <p className="mt-4 text-center text-sm text-emerald-300">{actionMessage}</p>}{!['reminders', 'voice', 'journal', 'wallet', 'shortcuts'].includes(appId) && <div className="mt-8 rounded-2xl bg-white/5 p-5 text-white/70">This {detail?.title?.toLowerCase()} space is ready for your next action.</div>}</section>}
      </main>
    </div>
  );
};