import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Search,
  Check,
  Trash2,
  ExternalLink,
  Plus,
  Filter
} from 'lucide-react';
import { MediaItem } from '../../types';

export const MediaLibraryModal: React.FC = () => {
  const {
    mediaLibraryOpen,
    closeMediaLibrary,
    mediaItems,
    uploadMediaItem,
    deleteMediaItem,
    selectMediaForTarget,
    selectedImageTarget
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'browse' | 'upload' | 'url'>('browse');

  // URL Input State
  const [imageUrl, setImageUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageCategory, setImageCategory] = useState<MediaItem['category']>('Banners');

  if (!mediaLibraryOpen) return null;

  const categories = ['All', 'Banners', 'Logos', 'Sites', 'Team', 'Documents'];

  const filteredMedia = mediaItems.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      uploadMediaItem({
        name: file.name,
        url: base64Url,
        category: imageCategory,
        fileType: file.type.includes('pdf') ? 'PDF' : file.type.includes('word') ? 'DOC' : 'IMAGE',
        size: `${(file.size / 1024).toFixed(1)} KB`
      });
      setActiveTab('browse');
    };
    reader.readAsDataURL(file);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    uploadMediaItem({
      name: imageName || 'web_image_' + Date.now() + '.jpg',
      url: imageUrl,
      category: imageCategory,
      fileType: 'IMAGE',
      size: 'Remote URL'
    });
    setImageUrl('');
    setImageName('');
    setActiveTab('browse');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1f2f58] flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">VPHS Centralized Media Library</h3>
              <p className="text-[11px] text-slate-400">
                {selectedImageTarget ? `Select an image to replace [${selectedImageTarget.field}] on ${selectedImageTarget.pageId}` : 'Browse and manage company banners, logos, and documents'}
              </p>
            </div>
          </div>
          <button
            onClick={closeMediaLibrary}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-3 pb-2 border-b border-[#1f2f58] flex items-center justify-between bg-[#070e1e]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'browse'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Browse Library ({mediaItems.length})
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'upload'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local File</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'url'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add from URL</span>
            </button>
          </div>

          {activeTab === 'browse' && (
            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-[#1f2f58] rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'browse' && (
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-[#1f2f58]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Media */}
              {filteredMedia.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                  <p className="text-sm font-medium">No media found matching criteria</p>
                  <p className="text-xs text-slate-500 mt-1">Upload a file or add an image via URL above</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className="group bg-slate-900 border border-[#1f2f58] hover:border-amber-500/60 rounded-xl overflow-hidden shadow transition-all flex flex-col justify-between"
                    >
                      <div className="h-32 bg-slate-950 overflow-hidden relative flex items-center justify-center">
                        {item.fileType === 'IMAGE' ? (
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <FileText className="w-10 h-10 text-amber-400" />
                        )}
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-2.5">
                        <p className="text-xs font-semibold text-white truncate" title={item.name}>
                          {item.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {item.size} • {item.uploadedAt}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-[#1f2f58] flex items-center justify-between gap-1">
                          {selectedImageTarget ? (
                            <button
                              onClick={() => selectMediaForTarget(item.url)}
                              className="w-full py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow"
                            >
                              <Check className="w-3 h-3" />
                              <span>Select</span>
                            </button>
                          ) : (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>View</span>
                            </a>
                          )}
                          <button
                            onClick={() => deleteMediaItem(item.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                            title="Delete file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-md mx-auto py-6 space-y-4">
              <div className="border-2 border-dashed border-[#1f2f58] hover:border-amber-500 rounded-2xl p-8 text-center bg-slate-900/40 transition-colors">
                <Upload className="w-12 h-12 mx-auto text-amber-400 mb-3" />
                <h4 className="text-sm font-bold text-white">Drag & drop your file here</h4>
                <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP, SVG, and PDF</p>
                <div className="mt-4">
                  <label className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-md shadow-amber-500/20 inline-block transition-all">
                    <span>Browse Local Device</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Category</label>
                <select
                  value={imageCategory}
                  onChange={(e) => setImageCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Banners">Banners & Heroes</option>
                  <option value="Logos">Logos & Badges</option>
                  <option value="Sites">Client Site Photos</option>
                  <option value="Team">Team & Personnel</option>
                  <option value="Documents">Certificates & PDF Documents</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <form onSubmit={handleAddUrl} className="max-w-md mx-auto py-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/banner.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Display Label</label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad Campus Gate Banner"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={imageCategory}
                  onChange={(e) => setImageCategory(e.target.value as any)}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Banners">Banners & Heroes</option>
                  <option value="Logos">Logos & Badges</option>
                  <option value="Sites">Client Site Photos</option>
                  <option value="Team">Team & Personnel</option>
                  <option value="Documents">Certificates & PDF Documents</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Add URL to Library
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#1f2f58] bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>{mediaItems.length} total media assets saved</span>
          <button
            onClick={closeMediaLibrary}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
