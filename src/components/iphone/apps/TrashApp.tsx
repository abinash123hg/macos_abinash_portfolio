import React, { useState } from 'react';
import { AppWindow } from '../ui/AppWindow';
import { IOSButton } from '../ui/IOSButton';
import { IOSSectionHeader } from '../ui/IOSSectionHeader';
import { EmptyState } from './EmptyState';
import { useDevice } from '../../../context/DeviceContext';
import { TrashItem } from '../../../types';
import { 
  Trash2, 
  RotateCcw, 
  AlertTriangle, 
  FileCode, 
  Image as ImageIcon, 
  Film, 
  Folder, 
  FileText,
  X 
} from 'lucide-react';
import { resolveMediaUrl } from '../../../utils/mediaResolver';

export const TrashApp: React.FC = () => {
  const { 
    trashItems, 
    restoreFromTrash, 
    deletePermanently, 
    emptyTrash 
  } = useDevice();

  const [confirmEmpty, setConfirmEmpty] = useState(false);

  const getItemIcon = (type: TrashItem['type']) => {
    switch (type) {
      case 'photo': return <ImageIcon className="w-4 h-4 text-cyan-400" />;
      case 'video': return <Film className="w-4 h-4 text-purple-400" />;
      case 'note': return <FileText className="w-4 h-4 text-amber-400" />;
      case 'file': return <Folder className="w-4 h-4 text-blue-400" />;
      default: return <FileCode className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <AppWindow
      id="trash"
      title="Bin"
      subtitle={`${trashItems.length} Items`}
      icon={<Trash2 className="w-4 h-4 text-neutral-400" />}
      headerRight={
        trashItems.length > 0 ? (
          <button
            onClick={() => setConfirmEmpty(true)}
            className="text-[#FF3B30] text-[13px] font-semibold cursor-pointer"
          >
            Empty
          </button>
        ) : undefined
      }
    >
      {trashItems.length === 0 ? (
        <EmptyState
          icon={<Trash2 className="w-8 h-8" />}
          title="Bin is Empty"
          description="All deleted items from Photos, Notes, or Files have been permanently cleaned."
        />
      ) : (
        <div className="space-y-4">
          <IOSSectionHeader title="Recently Deleted" />

          <div className="space-y-2">
            {trashItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3 text-white"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.thumbnail ? (
                      <img 
                        src={resolveMediaUrl(item.thumbnail)} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      getItemIcon(item.type)
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{item.title}</div>
                    <div className="text-[10px] text-neutral-400 capitalize">
                      {item.type} • {item.size || 'Deleted recently'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => restoreFromTrash(item.id)}
                    className="p-2 rounded-xl bg-cyan-500/20 active:bg-cyan-500 text-cyan-300 active:text-white transition-colors cursor-pointer"
                    title="Restore"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deletePermanently(item.id)}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Permanently"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <IOSButton
            fullWidth
            variant="destructive"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => setConfirmEmpty(true)}
          >
            Empty Bin ({trashItems.length})
          </IOSButton>
        </div>
      )}

      {/* Confirmation sheet */}
      {confirmEmpty && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end p-3 animate-in fade-in duration-150">
          <div className="w-full space-y-2">
            <div className="bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-4 text-center space-y-2">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Permanently Erase
              </div>
              <p className="text-xs text-neutral-300">
                This will permanently delete all {trashItems.length} items from your device. You cannot undo this action.
              </p>
              <button
                onClick={() => {
                  emptyTrash();
                  setConfirmEmpty(false);
                }}
                className="w-full py-3 rounded-xl bg-rose-600 active:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Empty Bin
              </button>
            </div>
            <button
              onClick={() => setConfirmEmpty(false)}
              className="w-full py-3 rounded-2xl bg-neutral-800 text-white text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </AppWindow>
  );
};
