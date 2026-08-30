import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Save,
  Send,
  Eye,
  ArrowUp,
  ArrowDown,
  EyeOff,
  Trash2,
  Plus,
  RotateCcw,
  Image as ImageIcon,
  CheckCircle,
  FileText,
  Layers
} from 'lucide-react';
import { SectionContent } from '../../types';

export const EditPageModal: React.FC = () => {
  const {
    editingPage,
    closePageEditor,
    savePageChanges,
    openMediaLibrary,
    restorePageVersion
  } = useApp();

  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [sections, setSections] = useState<SectionContent[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor');

  React.useEffect(() => {
    if (editingPage) {
      setSections(JSON.parse(JSON.stringify(editingPage.sections)));
      if (editingPage.sections.length > 0) {
        setActiveSectionId(editingPage.sections[0].id);
      }
    }
  }, [editingPage]);

  if (!editingPage) return null;

  const currentSection = sections.find(s => s.id === activeSectionId) || sections[0];

  const handleUpdateCurrentSection = (field: string, value: any) => {
    setSections(prev => prev.map(s => {
      if (s.id !== activeSectionId) return s;
      return { ...s, [field]: value };
    }));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setSections(prev => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    setSections(prev => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
  };

  const handleToggleVisibility = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const handleDeleteSection = (id: string) => {
    if (sections.length <= 1) return;
    setSections(prev => prev.filter(s => s.id !== id));
    if (activeSectionId === id) {
      const remaining = sections.filter(s => s.id !== id);
      setActiveSectionId(remaining[0]?.id || '');
    }
  };

  const handleAddNewSection = () => {
    const newSec: SectionContent = {
      id: `sec-${Date.now()}`,
      type: 'custom',
      title: 'New Content Section',
      subtitle: 'Provide detailed information for website visitors.',
      visible: true,
      order: sections.length + 1
    };
    setSections(prev => [...prev, newSec]);
    setActiveSectionId(newSec.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        {/* Modal Topbar */}
        <div className="px-6 py-4 border-b border-[#1f2f58] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Page CMS Visual Editor</h3>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase border border-amber-500/30">
                  {editingPage.id}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Modify content, change banners, rearrange sections, and publish changes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'editor' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Sections Editor
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                activeTab === 'history' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Version History ({editingPage.versionHistory?.length || 0})</span>
            </button>
            <button
              onClick={closePageEditor}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {activeTab === 'editor' ? (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Sidebar: Section Hierarchy */}
            <div className="md:col-span-4 border-r border-[#1f2f58] bg-[#070e1e] p-4 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f2f58]">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Page Sections</span>
                  <button
                    onClick={handleAddNewSection}
                    className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Section</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {sections.map((sec, idx) => {
                    const isSelected = sec.id === activeSectionId;
                    return (
                      <div
                        key={sec.id}
                        onClick={() => setActiveSectionId(sec.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/60 shadow'
                            : 'bg-slate-900/60 border-[#1f2f58] hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] font-mono font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded">
                            #{idx + 1}
                          </span>
                          <div className="truncate">
                            <p className={`text-xs font-bold truncate ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                              {sec.title || 'Untitled Section'}
                            </p>
                            <span className="text-[10px] text-slate-500 uppercase">{sec.type}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveUp(idx)}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(idx)}
                            disabled={idx === sections.length - 1}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleToggleVisibility(sec.id)}
                            className={`p-1 ${sec.visible ? 'text-emerald-400' : 'text-slate-600'}`}
                            title={sec.visible ? 'Visible on page' : 'Hidden from public'}
                          >
                            {sec.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteSection(sec.id)}
                            className="p-1 text-slate-500 hover:text-rose-400"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f2f58] text-[11px] text-slate-400">
                <span>Tip: Drag or use arrow keys to reorder page sections.</span>
              </div>
            </div>

            {/* Right Pane: Selected Section Form */}
            <div className="md:col-span-8 p-6 overflow-y-auto bg-[#0b1329] space-y-4">
              {currentSection ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
                    <div>
                      <h4 className="text-sm font-bold text-white">Edit: {currentSection.title}</h4>
                      <p className="text-xs text-slate-400">Section Type: <span className="text-amber-400 font-semibold uppercase">{currentSection.type}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${currentSection.visible ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                        {currentSection.visible ? '● Visible' : '○ Hidden'}
                      </span>
                    </div>
                  </div>

                  {/* Badge Text */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Text / Category Pill</label>
                    <input
                      type="text"
                      value={currentSection.badge || ''}
                      onChange={(e) => handleUpdateCurrentSection('badge', e.target.value)}
                      placeholder="e.g. ENTERPRISE FACILITY MANAGEMENT"
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Heading */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Main Heading</label>
                    <input
                      type="text"
                      value={currentSection.title || ''}
                      onChange={(e) => handleUpdateCurrentSection('title', e.target.value)}
                      placeholder="Section Title"
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Subtitle / Description */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Descriptive Paragraph</label>
                    <textarea
                      value={currentSection.subtitle || ''}
                      onChange={(e) => handleUpdateCurrentSection('subtitle', e.target.value)}
                      rows={3}
                      placeholder="Enter engaging copy for this section"
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Banner / Image Control */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Section Image / Banner</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={currentSection.image || ''}
                        onChange={(e) => handleUpdateCurrentSection('image', e.target.value)}
                        placeholder="Image URL"
                        className="flex-1 bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => openMediaLibrary({ pageId: editingPage.id, sectionId: currentSection.id, field: 'image' })}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Media Vault</span>
                      </button>
                    </div>
                    {currentSection.image && (
                      <div className="mt-2 h-28 rounded-xl overflow-hidden border border-[#1f2f58] bg-slate-950">
                        <img
                          src={currentSection.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Button Text</label>
                      <input
                        type="text"
                        value={currentSection.buttonText || ''}
                        onChange={(e) => handleUpdateCurrentSection('buttonText', e.target.value)}
                        placeholder="e.g. ACCESS ERP PORTAL"
                        className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Button Link</label>
                      <input
                        type="text"
                        value={currentSection.buttonLink || ''}
                        onChange={(e) => handleUpdateCurrentSection('buttonLink', e.target.value)}
                        placeholder="/login"
                        className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500">
                  <p>Select a section from the left sidebar to edit.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Version History Tab */
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            <h4 className="text-sm font-bold text-white">Previous Published Versions for {editingPage.id.toUpperCase()}</h4>
            <p className="text-xs text-slate-400">Restore any previous snapshot if unwanted changes were made.</p>

            {(!editingPage.versionHistory || editingPage.versionHistory.length === 0) ? (
              <div className="py-16 text-center text-slate-500 bg-slate-900/40 rounded-xl border border-[#1f2f58]">
                <FileText className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                <p className="text-xs">No previous saved versions recorded yet. Versions are created upon publishing.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {editingPage.versionHistory.map((ver, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-400">Version {ver.version}</span>
                        <span className="text-[11px] text-slate-400">• Saved on {ver.savedAt}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">Saved by {ver.savedBy} ({ver.sections.length} active sections)</p>
                    </div>
                    <button
                      onClick={() => restorePageVersion(editingPage.id, idx)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore This Version</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 border-t border-[#1f2f58] bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={closePageEditor}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => savePageChanges(editingPage.id, sections, false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => savePageChanges(editingPage.id, sections, true)}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save & Publish Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
