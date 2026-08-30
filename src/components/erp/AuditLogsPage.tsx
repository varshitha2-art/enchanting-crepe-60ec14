import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { History, Search, Filter, ShieldCheck, Download, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('All');

  const modules = ['All', 'Authentication', 'CMS Page Manager', 'Employee Master', 'Attendance & Shifts', 'Leave Management', 'Payroll Engine', 'Media Library', 'System Settings'];

  const filteredLogs = auditLogs.filter(log => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      log.user.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.module.toLowerCase().includes(q) ||
      (log.page && log.page.toLowerCase().includes(q));
    const matchesModule = selectedModule === 'All' || log.module.toLowerCase().includes(selectedModule.toLowerCase());
    return matchesSearch && matchesModule;
  });

  const handleExportLogs = () => {
    const ws = XLSX.utils.json_to_sheet(filteredLogs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Trail');
    XLSX.writeFile(wb, `VPHS_Security_Audit_Logs_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Audit trail exported to Excel!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Activity & Security Audit Trail</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Immutable log of all administrative actions, employee modifications, page edits, file uploads, and logins.
          </p>
        </div>

        <button
          onClick={handleExportLogs}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Audit Log (XLSX)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search User, Action, or Module..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {modules.map((m, idx) => (
              <option key={idx} value={m}>{m === 'All' ? 'All Modules' : m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
            <tr>
              <th className="px-4 py-3.5">Timestamp</th>
              <th className="px-4 py-3.5">User & Role</th>
              <th className="px-4 py-3.5">Action Performed</th>
              <th className="px-4 py-3.5">Module / Page</th>
              <th className="px-4 py-3.5">Old Value / Scope</th>
              <th className="px-4 py-3.5">New Value</th>
              <th className="px-4 py-3.5">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1f2f58]/60 font-mono text-[11px]">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-500 font-sans">
                  No audit logs recorded matching search criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-3 font-sans">
                    <span className="font-bold text-white block">{log.user}</span>
                  </td>
                  <td className="px-4 py-3 font-sans font-semibold text-amber-400">{log.action}</td>
                  <td className="px-4 py-3 font-sans text-slate-300">{log.module}</td>
                  <td className="px-4 py-3 text-slate-500 truncate max-w-[140px]">{log.oldValue || '-'}</td>
                  <td className="px-4 py-3 text-emerald-400 truncate max-w-[160px]">{log.newValue || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{log.ipAddress || '103.14.120.45'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
