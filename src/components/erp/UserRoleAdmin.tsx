import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_USERS } from '../../data/initialData';
import { Shield, Users, CheckCircle2, XCircle, Lock, UserPlus, KeyRound } from 'lucide-react';
import { Role } from '../../types';

export const UserRoleAdmin: React.FC = () => {
  const { loginAsPersona, showToast } = useApp();

  const [users, setUsers] = useState(INITIAL_USERS);

  const permissionMatrix = [
    { module: 'Public Website View', superAdmin: true, hrAdmin: true, siteManager: true, supervisor: true, employee: true },
    { module: 'CMS Visual Page Editor (Every Page)', superAdmin: true, hrAdmin: false, siteManager: false, supervisor: false, employee: false },
    { module: 'Media Library Upload & Replacement', superAdmin: true, hrAdmin: true, siteManager: false, supervisor: false, employee: false },
    { module: 'Employee 360° Directory (All Records)', superAdmin: true, hrAdmin: true, siteManager: false, supervisor: false, employee: false },
    { module: 'Employee Directory (Assigned Sites Only)', superAdmin: true, hrAdmin: true, siteManager: true, supervisor: true, employee: false },
    { module: 'KYC Document Vault (Upload & Browse)', superAdmin: true, hrAdmin: true, siteManager: true, supervisor: false, employee: false },
    { module: 'Attendance Verification & Roster Overrides', superAdmin: true, hrAdmin: true, siteManager: true, supervisor: true, employee: false },
    { module: 'Leave Application Approvals', superAdmin: true, hrAdmin: true, siteManager: false, supervisor: false, employee: false },
    { module: 'Statutory Payroll Engine & Payslips', superAdmin: true, hrAdmin: true, siteManager: false, supervisor: false, employee: false },
    { module: 'Employee Self-Service (Own Record Only)', superAdmin: true, hrAdmin: true, siteManager: true, supervisor: true, employee: true },
    { module: 'Security Audit & Activity Logs', superAdmin: true, hrAdmin: false, siteManager: false, supervisor: false, employee: false },
    { module: 'System Settings & Branding Control', superAdmin: true, hrAdmin: false, siteManager: false, supervisor: false, employee: false },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Role-Based Access Control (RBAC) & Users</h2>
        </div>
        <p className="text-xs text-slate-400">
          Enforce database-level data scoping and UI permission gates across Super Admin, HR Admin, Site Manager, Supervisor, and Employee tiers.
        </p>
      </div>

      {/* System Users Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Configured Role Personas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-5 shadow-lg space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-slate-950 text-sm shadow">
                    {user.name.charAt(0)}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase border border-amber-500/30">
                    {user.role}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{user.name}</h4>
                  <p className="text-xs text-slate-400">{user.designation}</p>
                  <p className="text-[11px] font-mono text-amber-400 mt-1">{user.email}</p>
                </div>

                {user.assignedSites && (
                  <div className="pt-2 text-[10px] text-slate-400 border-t border-[#1f2f58]">
                    <strong>Assigned Sites:</strong> {user.assignedSites.join(', ')}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#1f2f58]">
                <button
                  onClick={() => loginAsPersona(user.role)}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all"
                >
                  Switch to This Persona
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions Matrix Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl overflow-hidden shadow-xl space-y-3 p-6">
        <div>
          <h3 className="text-sm font-bold text-white">Enterprise Permission Matrix</h3>
          <p className="text-xs text-slate-400">Strict backend and frontend scoping matrix enforced across the ERP system.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
              <tr>
                <th className="px-4 py-3">Module / Capability</th>
                <th className="px-3 py-3 text-center">Super Admin</th>
                <th className="px-3 py-3 text-center">HR Admin</th>
                <th className="px-3 py-3 text-center">Site Manager</th>
                <th className="px-3 py-3 text-center">Supervisor</th>
                <th className="px-3 py-3 text-center">Employee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2f58]/60">
              {permissionMatrix.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-200">{p.module}</td>
                  <td className="px-3 py-3 text-center">
                    {p.superAdmin ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {p.hrAdmin ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {p.siteManager ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {p.supervisor ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {p.employee ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
