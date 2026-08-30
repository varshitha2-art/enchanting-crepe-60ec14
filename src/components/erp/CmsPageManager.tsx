import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe, Edit3, Eye, Layers, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const CmsPageManager: React.FC = () => {
  const { pages, openPageEditor, navigateTo, openMediaLibrary, isEditMode, setIsEditMode } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Website CMS & Page Builder</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Super Admins can edit any public webpage, modify copy, replace banners, reorder sections, and publish instantly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
              isEditMode ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300 border border-[#1f2f58]'
            }`}
          >
            {isEditMode ? '✓ Inline Edit Mode: ON' : 'Enable Inline Edit Mode'}
          </button>
          <button
            onClick={() => openMediaLibrary()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Open Media Vault</span>
          </button>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-amber-500/30">
                  {page.slug}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Published</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {page.title.split('|')[0].trim()}
              </h3>

              <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-[#1f2f58]/60">
                <p><strong className="text-slate-300">Sections:</strong> {page.sections.length} Active Blocks</p>
                <p><strong className="text-slate-300">Last Modified:</strong> {page.lastUpdated}</p>
                <p><strong className="text-slate-300">Author:</strong> {page.updatedBy}</p>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#1f2f58] flex items-center justify-between gap-2">
              <button
                onClick={() => navigateTo(page.id)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live View</span>
              </button>
              <button
                onClick={() => openPageEditor(page.id)}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 shadow"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Page</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
