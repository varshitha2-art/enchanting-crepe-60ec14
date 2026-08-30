import React from 'react';
import { useApp } from '../../context/AppContext';
import { Image, Upload, Sparkles } from 'lucide-react';

interface ChangeImageButtonProps {
  pageId: string;
  sectionId: string;
  field?: string;
  className?: string;
}

export const ChangeImageButton: React.FC<ChangeImageButtonProps> = ({
  pageId,
  sectionId,
  field = 'image',
  className = ''
}) => {
  const { currentUser, isEditMode, openMediaLibrary } = useApp();

  if (currentUser?.role !== 'SUPER_ADMIN' || !isEditMode) {
    return null;
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openMediaLibrary({ pageId, sectionId, field });
      }}
      className={`absolute z-30 top-3 right-3 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/30 flex items-center gap-1.5 transition-all hover:scale-105 border border-amber-600 ${className}`}
      title="Admin: Click to replace this image"
    >
      <Image className="w-3.5 h-3.5" />
      <span>Change Image</span>
    </button>
  );
};
