import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  MapPin,
  Users,
  Phone,
  Mail,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Upload,
  Camera,
  Image as ImageIcon,
  Compass,
  FileText
} from 'lucide-react';
import { ClientSite } from '../../types';

export const SiteManagerView: React.FC = () => {
  const { sites, addSite, updateSite, currentUser, showToast } = useApp();
  const role = currentUser?.role || 'EMPLOYEE';
  const isSuperAdmin = role === 'SUPER_ADMIN';

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Partial<ClientSite>>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSite.id) {
      updateSite(editingSite.id, editingSite);
    } else {
      addSite(editingSite);
    }
    setModalOpen(false);
    setEditingSite({});
  };

  // Upload / Replace Site Photo
  const handleSitePhotoUpload = (siteId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64Url = evt.target?.result as string;
      updateSite(siteId, { image: base64Url });
      showToast('Site photo updated successfully!', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Scoping for Site Managers
  let scopedSites = sites;
  if (role === 'SITE_MANAGER') {
    scopedSites = sites.filter(s => s.managerName.toLowerCase().includes('ramesh') || s.name.toLowerCase().includes('microsoft') || s.name.toLowerCase().includes('amazon'));
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Client Sites & Operational Campuses</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage deployed workforce rosters, site leads, facility service contracts, GPS geofences, and uploaded campus photos.
          </p>
        </div>

        {role !== 'EMPLOYEE' && (
          <button
            onClick={() => {
              setEditingSite({
                servicesProvided: ['Corporate Housekeeping', 'Security'],
                status: 'Active',
                city: 'Hyderabad',
                state: 'Telangana',
                totalManpower: 20
              });
              setModalOpen(true);
            }}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-xs shadow flex items-center gap-1.5 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client Site</span>
          </button>
        )}
      </div>

      {/* Grid of Sites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scopedSites.map((site) => (
          <div
            key={site.id}
            className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
          >
            {/* Campus Image with Upload Overlay */}
            <div className="h-44 bg-slate-950 relative overflow-hidden group">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent"></div>
              
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                ● {site.status}
              </span>

              {/* Upload Photo Overlay Button */}
              {role !== 'EMPLOYEE' && (
                <label className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-slate-950/90 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSitePhotoUpload(site.id, e)}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">{site.clientName}</span>
                <h3 className="text-base font-bold text-white">{site.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{site.location}, {site.city}</span>
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#1f2f58]/60 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Deployed Manpower:</span>
                  <span className="font-bold text-amber-400">{site.totalManpower} Associates</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Site Facility Lead:</span>
                  <span className="font-semibold text-slate-200">{site.managerName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Site Contact:</span>
                  <span className="font-mono text-slate-300">{site.contactPhone}</span>
                </div>
                {site.geotag && (
                  <div className="flex items-center justify-between text-slate-300 pt-1">
                    <span className="text-slate-400">GPS Geotag:</span>
                    <span className="font-mono text-[10px] text-emerald-400 truncate max-w-[170px]" title={site.geotag.formattedCoordinates}>
                      {site.geotag.formattedCoordinates}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#1f2f58]/60 flex flex-wrap gap-1">
                {site.servicesProvided?.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 border border-[#1f2f58]">
                    {s}
                  </span>
                ))}
              </div>

              {/* Edit Option Button */}
              {role !== 'EMPLOYEE' && (
                <div className="pt-3 border-t border-[#1f2f58] flex items-center justify-between gap-2">
                  <label className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-[#1f2f58]">
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>Upload SLA Doc</span>
                    <input
                      type="file"
                      accept=".pdf, image/*"
                      onChange={() => showToast(`SLA document attached to ${site.name}`, 'success')}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      setEditingSite(site);
                      setModalOpen(true);
                    }}
                    className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Site</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Site Modal with Upload Option */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <h3 className="text-sm font-bold text-white">
                {editingSite.id ? `Edit Site: ${editingSite.name}` : 'Create New Client Site'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Campus / Site Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microsoft India Campus"
                  value={editingSite.name || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, name: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Client Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Microsoft Corporation India Pvt. Ltd."
                  value={editingSite.clientName || ''}
                  onChange={(e) => setEditingSite({ ...editingSite, clientName: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Location Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Financial District"
                    value={editingSite.location || ''}
                    onChange={(e) => setEditingSite({ ...editingSite, location: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Hyderabad"
                    value={editingSite.city || 'Hyderabad'}
                    onChange={(e) => setEditingSite({ ...editingSite, city: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Site Facility Manager</label>
                  <input
                    type="text"
                    required
                    placeholder="Ramesh Kumar"
                    value={editingSite.managerName || ''}
                    onChange={(e) => setEditingSite({ ...editingSite, managerName: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Total Manpower Count</label>
                  <input
                    type="number"
                    required
                    value={editingSite.totalManpower || 25}
                    onChange={(e) => setEditingSite({ ...editingSite, totalManpower: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Campus Image (URL or Upload File)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={editingSite.image || ''}
                    onChange={(e) => setEditingSite({ ...editingSite, image: e.target.value })}
                    className="flex-1 bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                  <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold cursor-pointer flex items-center gap-1 border border-amber-500/30">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            setEditingSite({ ...editingSite, image: evt.target?.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1f2f58] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Save Site Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
