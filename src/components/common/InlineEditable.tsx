import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit2, Check, X } from 'lucide-react';

interface InlineEditableProps {
  pageId: string;
  sectionId: string;
  field: string;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  multiline?: boolean;
}

export const InlineEditable: React.FC<InlineEditableProps> = ({
  pageId,
  sectionId,
  field,
  value,
  as: Component = 'span',
  className = '',
  multiline = false
}) => {
  const { isEditMode, currentUser, updateSectionField } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  if (!isSuperAdmin || !isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateSectionField(pageId, sectionId, field, tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full my-1 z-20">
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full bg-[#0b1329] border-2 border-amber-500 rounded-lg p-2 text-white text-sm focus:outline-none shadow-xl"
            rows={4}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full bg-[#0b1329] border-2 border-amber-500 rounded-lg px-2 py-1 text-white text-inherit font-inherit focus:outline-none shadow-xl"
            autoFocus
          />
        )}
        <div className="flex items-center gap-1.5 mt-1.5">
          <button
            onClick={handleSave}
            className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group/inline inline-block cursor-pointer">
      <Component className={`${className} group-hover/inline:ring-1 group-hover/inline:ring-amber-500/70 group-hover/inline:rounded px-0.5 transition-all`}>
        {value}
      </Component>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setTempValue(value);
          setIsEditing(true);
        }}
        className="opacity-0 group-hover/inline:opacity-100 ml-1.5 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-bold shadow transition-opacity align-middle"
        title="Click to edit text"
      >
        <Edit2 className="w-2.5 h-2.5" />
        <span>Edit</span>
      </button>
    </div>
  );
};
