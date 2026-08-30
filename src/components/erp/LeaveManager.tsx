import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Plus, CheckCircle2, XCircle, Clock, AlertCircle, X, Upload, FileText, Edit2, Eye } from 'lucide-react';
import { LeaveRequest } from '../../types';

export const LeaveManager: React.FC = () => {
  const { leaves, applyLeave, updateLeaveStatus, currentUser, showToast } = useApp();
  const role = currentUser?.role || 'EMPLOYEE';

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState<Partial<LeaveRequest>>({});
  const [uploadedDocName, setUploadedDocName] = useState<string>('');

  const [form, setForm] = useState<Partial<LeaveRequest>>({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    days: 1,
    reason: ''
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate || !form.reason) {
      showToast('Please fill all mandatory fields', 'error');
      return;
    }

    applyLeave({
      employeeId: currentUser?.employeeId || 'VPHS0010',
      employeeName: currentUser?.name || 'Employee',
      leaveType: form.leaveType as any || 'Casual Leave',
      startDate: form.startDate,
      endDate: form.endDate,
      days: form.days || 1,
      reason: uploadedDocName ? `${form.reason} [Attachment: ${uploadedDocName}]` : form.reason
    });

    setApplyModalOpen(false);
    setForm({ leaveType: 'Casual Leave', startDate: '', endDate: '', days: 1, reason: '' });
    setUploadedDocName('');
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadedDocName(file.name);
    showToast(`Attached document: ${file.name}`, 'success');
  };

  const isHrOrAdmin = role === 'SUPER_ADMIN' || role === 'HR_ADMIN';

  // Scoping
  let scopedLeaves = leaves;
  if (role === 'EMPLOYEE') {
    scopedLeaves = leaves.filter(l => l.employeeId === currentUser?.employeeId);
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Leave Quota Cards */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl">
        <div>
          <h2 className="text-lg font-bold text-white">Leave Management & Approvals</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track annual leaves, upload medical certificates, apply for statutory sick/earned leaves, and process approvals with HR notes.
          </p>
        </div>

        <button
          onClick={() => setApplyModalOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow flex items-center gap-1.5 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Apply Leave</span>
        </button>
      </div>

      {/* Leave Quota Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Casual Leave (CL)</span>
          <div className="text-2xl font-black text-white">9 / 12 Days</div>
          <p className="text-[11px] text-slate-400">3 Days Utilized this Year</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-2">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Sick Leave (SL)</span>
          <div className="text-2xl font-black text-white">10 / 12 Days</div>
          <p className="text-[11px] text-slate-400">Medical Certificate Upload Required &gt; 2 Days</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Earned Leave (EL)</span>
          <div className="text-2xl font-black text-white">15 / 15 Days</div>
          <p className="text-[11px] text-slate-400">Accumulated & Encashable at Year End</p>
        </div>
      </div>

      {/* Leave Applications Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#1f2f58] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Leave Applications ({scopedLeaves.length})</h3>
          <span className="text-xs text-slate-400">Pending Review: <strong className="text-amber-400">{scopedLeaves.filter(l => l.status === 'Pending').length}</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
              <tr>
                <th className="px-4 py-3.5">Emp ID & Name</th>
                <th className="px-4 py-3.5">Leave Type</th>
                <th className="px-4 py-3.5">Date Range</th>
                <th className="px-4 py-3.5">Days</th>
                <th className="px-4 py-3.5">Reason & Attachment</th>
                <th className="px-4 py-3.5">Applied On</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2f58]/60">
              {scopedLeaves.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-500">
                    No leave requests recorded.
                  </td>
                </tr>
              ) : (
                scopedLeaves.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-amber-500/30">
                          {l.employeeId}
                        </span>
                        <span className="font-bold text-white">{l.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-200">{l.leaveType}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-300">{l.startDate} → {l.endDate}</td>
                    <td className="px-4 py-3 font-bold text-amber-400">{l.days} Day(s)</td>
                    <td className="px-4 py-3 text-slate-300 max-w-[200px] truncate" title={l.reason}>
                      "{l.reason}"
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono">{l.appliedOn}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        l.status === 'Approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : l.status === 'Rejected'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}>
                        {l.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isHrOrAdmin && l.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateLeaveStatus(l.id, 'Approved')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateLeaveStatus(l.id, 'Rejected')}
                              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shadow"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        
                        <label className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 cursor-pointer" title="Upload Supporting Doc">
                          <Upload className="w-3.5 h-3.5" />
                          <input type="file" onChange={(e) => showToast(`Attached file to Leave ${l.id}`, 'success')} className="hidden" />
                        </label>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal with Upload Attachment Option */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Apply for Leave</h3>
              </div>
              <button onClick={() => setApplyModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Leave Type</label>
                <select
                  value={form.leaveType}
                  onChange={(e) => setForm({ ...form, leaveType: e.target.value as any })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                  <option>Maternity/Paternity</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Number of Days</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  required
                  value={form.days}
                  onChange={(e) => setForm({ ...form, days: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Reason for Leave</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Provide brief explanation for HR records"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl p-3 text-white"
                />
              </div>

              {/* Upload Supporting Document / Medical Certificate */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Upload Supporting Document / Medical Certificate (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-[#1f2f58] hover:border-amber-500 text-slate-300 cursor-pointer flex items-center justify-between">
                    <span className="truncate">{uploadedDocName || 'Choose Medical Slip / Letter...'}</span>
                    <Upload className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <input type="file" accept=".pdf, image/*" onChange={handleDocUpload} className="hidden" />
                  </label>
                  {uploadedDocName && (
                    <button
                      type="button"
                      onClick={() => setUploadedDocName('')}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1f2f58] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
