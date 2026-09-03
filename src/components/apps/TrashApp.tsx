import React, { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { TrashItem } from '../../types';
import { 
  Trash2, 
  RotateCcw, 
  AlertTriangle, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Folder, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { sound } from '../../utils/audioHaptics';
import { resolveMediaUrl } from '../../utils/mediaResolver';

export const TrashApp: React.FC = () => {
  const { 
    trashItems, 
    restoreFromTrash, 
    deletePermanently, 
    emptyTrash 
  } = useDevice();

  const [confirmEmpty, setConfirmEmpty] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null);

  const handleEmptyConfirm = () => {
    emptyTrash();
    setConfirmEmpty(false);
  };

  const getItemIcon = (type: TrashItem['type']) => {
    switch (type) {
      case 'photo': return <ImageIcon className="w-4 h-4 text-cyan-400" />;
      case 'video': return <Film className="w-4 h-4 text-purple-400" />;
      case 'note': return <FileText className="w-4 h-4 text-amber-400" />;
      case 'file': return <Folder className="w-4 h-4 text-blue-400" />;
      default: return <FileText className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#1e1e1e] text-neutral-100 select-text overflow-hidden">
      {/* macOS Finder / Trash Toolbar */}
      <div className="h-12 border-b border-black/30 bg-[#252526] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-semibold text-neutral-200">
            Trash ({trashItems.length} items)
          </span>
        </div>

        {trashItems.length > 0 && (
          <button
            onClick={() => setConfirmEmpty(true)}
            className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Trash</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#181818]">
        {trashItems.length === 0 ? (
          <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-3">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-white">Trash is Empty</h3>
            <p className="text-xs text-neutral-400 max-w-xs mt-1">
              Items you delete from Photos, Files, or Notes will appear here before being permanently erased.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1.5 border-b border-white/5">
              <span className="col-span-6">Name & Type</span>
              <span className="col-span-3">Deleted Date</span>
              <span className="col-span-3 text-right">Actions</span>
            </div>

            {trashItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs"
              >
                {/* Item Thumbnail / Title */}
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
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
                  <div>
                    <div className="font-semibold text-white truncate max-w-[200px]">{item.title}</div>
                    <div className="text-[10px] text-neutral-400 capitalize">{item.type} {item.size ? `• ${item.size}` : ''}</div>
                  </div>
                </div>

                {/* Deleted Timestamp */}
                <div className="col-span-3 text-neutral-400 text-[11px]">
                  {new Date(item.deletedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <button
                    onClick={() => restoreFromTrash(item.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#007aff]/20 hover:bg-[#007aff] text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Put Back"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Put Back</span>
                  </button>

                  <button
                    onClick={() => deletePermanently(item.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Immediately"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Empty Trash */}
      {confirmEmpty && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#2a2a2c] border border-white/20 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Empty Trash?</h4>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Are you sure you want to permanently erase the {trashItems.length} items in the Trash? You can’t undo this action.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setConfirmEmpty(false)}
                className="py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEmptyConfirm}
                className="py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm"
              >
                Empty Trash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
