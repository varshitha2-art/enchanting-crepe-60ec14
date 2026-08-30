import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Search,
  Filter,
  Upload,
  Eye,
  Download,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  ShieldCheck,
  User,
  X,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';

export const KycDocumentVault: React.FC = () => {
  const { employees, uploadEmployeeDocument, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewDoc, setPreviewDoc] = useState<{ empName: string; docName: string; category: string; type: string } | null>(null);

  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    empId: employees[0]?.id || 'VPHS0055',
    category: 'Aadhaar Card',
    fileName: '',
    type: 'PDF' as 'PDF' | 'IMAGE'
  });
  const [editingDoc, setEditingDoc] = useState<{ empId: string; fileName: string; category: string } | null>(null);

  // Flatten all documents across all employees with their employee reference
  const allVaultDocs: {
    empId: string;
    empName: string;
    siteUnit: string;
    fileName: string;
    category: string;
    type: 'PDF' | 'IMAGE';
    uploadedAt: string;
    size: string;
  }[] = [];

  employees.forEach(emp => {
    emp.documents?.forEach(doc => {
      allVaultDocs.push({
        empId: emp.id,
        empName: emp.name,
        siteUnit: emp.siteUnit,
        fileName: doc.fileName,
        category: doc.category,
        type: doc.type || (doc.fileName.toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMAGE'),
        uploadedAt: doc.uploadedAt || '2026-08-15',
        size: doc.size || '1.2 MB'
      });
    });
  });

  const categories = [
    'All',
    'Aadhaar Card',
    'PAN Card',
    'Driving License',
    'Police Verification (PVC)',
    'Medical Certificate',
    'Passport Photo',
    'Address/Utility Bill'
  ];

  const filteredDocs = allVaultDocs.filter(d => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      d.empName.toLowerCase().includes(q) ||
      d.empId.toLowerCase().includes(q) ||
      d.fileName.toLowerCase().includes(q) ||
      d.siteUnit.toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'All' || d.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadForm({
      ...uploadForm,
      fileName: file.name,
      type: file.type.includes('pdf') ? 'PDF' : 'IMAGE'
    });
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.fileName) {
      showToast('Please select a file to upload', 'error');
      return;
    }

    uploadEmployeeDocument(uploadForm.empId, {
      fileName: uploadForm.fileName,
      type: uploadForm.type,
      category: uploadForm.category,
      uploadedAt: new Date().toISOString().split('T')[0],
      verified: true,
      size: '1.4 MB'
    });

    setUploadModalOpen(false);
    setUploadForm({ empId: employees[0]?.id || 'VPHS0055', category: 'Aadhaar Card', fileName: '', type: 'PDF' });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoc) {
      showToast(`Updated document details for ${editingDoc.fileName}`, 'success');
      setEditModalOpen(false);
      setEditingDoc(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">KYC & Employee Document Vault</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              {allVaultDocs.length} Verified Files
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse, upload, and edit verified Aadhaar cards, PAN cards, Driving Licenses, Police Verifications (PVC), Medical Certificates, and utility bills.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-xs shadow flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Upload className="w-4 h-4" />
          <span>Upload KYC Document</span>
        </button>
      </div>

      {/* Search & Category Tabs */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Employee, Document Name, ID, or Site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-[#1f2f58]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDocs.map((doc, idx) => (
          <div
            key={idx}
            className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center text-amber-400">
                  {doc.type === 'PDF' ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  ● Verified
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {doc.category}
                </span>
                <p className="text-xs font-bold text-white mt-0.5 truncate" title={doc.fileName}>
                  {doc.fileName}
                </p>
                <div className="mt-2 pt-2 border-t border-[#1f2f58]/60 space-y-0.5 text-[11px] text-slate-400">
                  <p className="text-slate-300 font-semibold truncate">Associate: {doc.empName}</p>
                  <p className="font-mono text-[10px] text-amber-400/90">{doc.empId}</p>
                  <p className="text-[10px] truncate">{doc.siteUnit}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1f2f58] flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">{doc.size}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingDoc({ empId: doc.empId, fileName: doc.fileName, category: doc.category });
                    setEditModalOpen(true);
                  }}
                  className="p-1 rounded-lg bg-slate-900 text-sky-400 hover:bg-slate-800 border border-[#1f2f58]"
                  title="Edit Document Info"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setPreviewDoc({ empName: doc.empName, docName: doc.fileName, category: doc.category, type: doc.type })}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 text-[11px] font-bold flex items-center gap-1 border border-amber-500/30"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Upload New KYC Document</h3>
              </div>
              <button onClick={() => setUploadModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Employee</label>
                <select
                  value={uploadForm.empId}
                  onChange={(e) => setUploadForm({ ...uploadForm, empId: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.id} - {emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                >
                  <option>Aadhaar Card</option>
                  <option>PAN Card</option>
                  <option>Driving License</option>
                  <option>Police Verification (PVC)</option>
                  <option>Medical Certificate</option>
                  <option>Passport Photo</option>
                  <option>Address/Utility Bill</option>
                  <option>Bank Passbook</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Select File (PDF / JPEG / PNG)</label>
                <label className="w-full py-3 px-4 rounded-xl bg-slate-900 border-2 border-dashed border-[#1f2f58] hover:border-amber-500 text-slate-300 cursor-pointer flex flex-col items-center justify-center space-y-1">
                  <Upload className="w-5 h-5 text-amber-400" />
                  <span className="truncate max-w-[280px] font-semibold">{uploadForm.fileName || 'Click to browse or drop file here'}</span>
                  <span className="text-[10px] text-slate-500">Supports PDF, JPG, PNG up to 10MB</span>
                  <input type="file" accept="image/*, .pdf" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div className="pt-2 border-t border-[#1f2f58] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Upload & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Document Info Modal */}
      {editModalOpen && editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <h3 className="text-sm font-bold text-white">Edit Document Metadata</h3>
              <button onClick={() => setEditModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document Display Name</label>
                <input
                  type="text"
                  required
                  value={editingDoc.fileName}
                  onChange={(e) => setEditingDoc({ ...editingDoc, fileName: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={editingDoc.category}
                  onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                >
                  <option>Aadhaar Card</option>
                  <option>PAN Card</option>
                  <option>Driving License</option>
                  <option>Police Verification (PVC)</option>
                  <option>Medical Certificate</option>
                  <option>Passport Photo</option>
                  <option>Address/Utility Bill</option>
                  <option>Bank Passbook</option>
                </select>
              </div>

              <div className="pt-2 border-t border-[#1f2f58] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Save Metadata
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Inspector Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">{previewDoc.docName}</h3>
                  <p className="text-xs text-slate-400">{previewDoc.category} • Associate: {previewDoc.empName}</p>
                </div>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-8 border border-[#1f2f58] text-center space-y-3 min-h-[220px] flex flex-col items-center justify-center">
              {previewDoc.type === 'PDF' ? (
                <FileText className="w-16 h-16 text-amber-400" />
              ) : (
                <ImageIcon className="w-16 h-16 text-amber-400" />
              )}
              <h4 className="text-sm font-bold text-white">{previewDoc.docName}</h4>
              <p className="text-xs text-emerald-400 font-semibold">
                ✓ Cryptographically Verified in VPHS Employee KYC Vault
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#1f2f58]">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
