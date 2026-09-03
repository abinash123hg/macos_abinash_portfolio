import React from 'react';
import { useDevice } from '../../context/DeviceContext';
import { Bell, X, ShieldAlert, Award, Sparkles, Trash2 } from 'lucide-react';
import { sound } from '../../utils/audioHaptics';

export const IPhoneNotificationCenter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications, openApp } = useDevice();

  const getNotifIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-cyan-400" />;
      case 'Award': return <Award className="w-4 h-4 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-purple-400" />;
      default: return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleNotifClick = (appId: string, id: string) => {
    sound.tap();
    markNotificationAsRead(id);
    openApp(appId);
    onClose();
  };

  return (
    <div className="h-full w-full bg-black/85 backdrop-blur-2xl p-5 pt-14 flex flex-col justify-between select-none text-white overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Notification Center</span>
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="p-1 rounded-md text-neutral-400 hover:text-red-400 text-xs cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-neutral-500">
            No new notifications
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotifClick(n.appId, n.id)}
              className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-cyan-500/40 transition-all cursor-pointer space-y-1 shadow-md"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-neutral-800 flex items-center justify-center">
                    {getNotifIcon(n.appIcon)}
                  </div>
                  <span className="font-semibold text-white">{n.appName}</span>
                </div>
                <span className="text-[10px] text-neutral-500">{n.timestamp}</span>
              </div>
              <div className="text-xs font-bold text-cyan-300 pt-0.5">{n.title}</div>
              <p className="text-[11px] text-neutral-300 leading-snug">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
