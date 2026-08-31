import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_ROLE_PERMISSIONS } from '../../context/AppContext';
import {
  Shield,
  Users,
  CheckCircle2,
  XCircle,
  Lock,
  UserPlus,
  KeyRound,
  Search,
  Filter,
  Sliders,
  Check,
  X,
  Building,
  UserCheck,
  UserX,
  FileSpreadsheet,
  AlertTriangle,
  RotateCcw,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  ArrowRight
} from 'lucide-react';
import { Role, User, UserPermissions } from '../../types';

export const UserRoleAdmin: React.FC = () => {
  const {
    currentUser,
    systemUsers,
    employees,
    sites,
    addUserAccount,
    updateUserAccount,
    deleteUserAccount,
    updateUserRbac,
    loginAsPersona,
    showToast
  } = useApp();

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [siteFilter, setSiteFilter] = useState<string>('ALL');

  // Modal State for Person-Specific RBAC Configurator
  const [editingRbacUser, setEditingRbacUser] = useState<User | null>(null);
  const [rbacFormData, setRbacFormData] = useState<{
    name: string;
    username: string;
    email: string;
    designation: string;
    password: string;
    role: Role;
    status: 'Active' | 'Suspended';
    assignedSites: string[];
    customPermissions: UserPermissions;
  }>({
    name: '',
    username: '',
    email: '',
    designation: '',
    password: '',
    role: 'EMPLOYEE',
    status: 'Active',
    assignedSites: [],
    customPermissions: DEFAULT_ROLE_PERMISSIONS.EMPLOYEE
  });

  // Modal State for Adding New Profile
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserData, setNewUserData] = useState<{
    name: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    designation: string;
    assignedSites: string[];
    status: 'Active' | 'Suspended';
  }>({
    name: '',
    username: '',
    email: '',
    password: 'VPHS@EMPLOYEE',
    role: 'EMPLOYEE',
    designation: 'Staff Associate',
    assignedSites: ['Microsoft India (R & D) Pvt. Ltd'],
    status: 'Active'
  });

  // Quick Password Reset Modal
  const [passwordResetUser, setPasswordResetUser] = useState<User | null>(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);

  // Open RBAC Modal for a Person
  const handleOpenRbacModal = (user: User) => {
    const defaultPerms = DEFAULT_ROLE_PERMISSIONS[user.role] || DEFAULT_ROLE_PERMISSIONS.EMPLOYEE;
    const currentPerms = user.customPermissions || defaultPerms;

    setEditingRbacUser(user);
    setRbacFormData({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      designation: user.designation || '',
      password: user.password || '',
      role: user.role || 'EMPLOYEE',
      status: user.status || 'Active',
      assignedSites: user.assignedSites || ['Microsoft India (R & D) Pvt. Ltd'],
      customPermissions: { ...currentPerms }
    });
  };

  const handleRoleChangeInRbac = (newRole: Role) => {
    setRbacFormData(prev => ({
      ...prev,
      role: newRole,
      customPermissions: {
        ...DEFAULT_ROLE_PERMISSIONS[newRole]
      }
    }));
  };

  const handleTogglePermission = (key: keyof UserPermissions) => {
    setRbacFormData(prev => ({
      ...prev,
      customPermissions: {
        ...prev.customPermissions,
        [key]: !prev.customPermissions[key]
      }
    }));
  };

  const handleToggleSite = (siteName: string) => {
    setRbacFormData(prev => {
      const exists = prev.assignedSites.includes(siteName);
      const updated = exists
        ? prev.assignedSites.filter(s => s !== siteName)
        : [...prev.assignedSites, siteName];
      return { ...prev, assignedSites: updated };
    });
  };

  const handleSaveRbac = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRbacUser) return;
    if (!rbacFormData.username.trim()) {
      showToast('Login ID / Username is required', 'error');
      return;
    }

    updateUserRbac(editingRbacUser.id, {
      username: rbacFormData.username,
      role: rbacFormData.role,
      assignedSites: rbacFormData.assignedSites,
      customPermissions: rbacFormData.customPermissions,
      status: rbacFormData.status,
      password: rbacFormData.password,
      name: rbacFormData.name,
      email: rbacFormData.email,
      designation: rbacFormData.designation
    });

    setEditingRbacUser(null);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.username) {
      showToast('Username / Login ID is required', 'error');
      return;
    }
    addUserAccount({
      ...newUserData,
      customPermissions: DEFAULT_ROLE_PERMISSIONS[newUserData.role]
    });
    setShowAddUserModal(false);
    setNewUserData({
      name: '',
      username: '',
      email: '',
      password: 'VPHS@EMPLOYEE',
      role: 'EMPLOYEE',
      designation: 'Staff Associate',
      assignedSites: ['Microsoft India (R & D) Pvt. Ltd'],
      status: 'Active'
    });
  };

  const handleSavePasswordReset = () => {
    if (!passwordResetUser || !newPasswordValue.trim()) {
      showToast('Please enter a new password', 'error');
      return;
    }
    updateUserAccount(passwordResetUser.id, { password: newPasswordValue.trim() });
    showToast(`Password updated for "${passwordResetUser.username}"!`, 'success');
    setPasswordResetUser(null);
    setNewPasswordValue('');
  };

  // Filtered Users List
  const filteredUsers = systemUsers.filter(u => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (statusFilter !== 'ALL' && (u.status || 'Active') !== statusFilter) return false;
    if (siteFilter !== 'ALL') {
      const userSites = u.assignedSites || [];
      if (!userSites.some(s => s.toLowerCase().includes(siteFilter.toLowerCase()))) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.employeeId && u.employeeId.toLowerCase() === cleanUserHelper(q)) ||
        (u.designation && u.designation.toLowerCase().includes(q))
      );
    }
    return true;
  });

  function cleanUserHelper(q: string) {
    return q.replace(/\s+/g, '');
  }

  // Calculate Permission Count Helper
  const getPermissionScore = (user: User) => {
    const perms = user.customPermissions || DEFAULT_ROLE_PERMISSIONS[user.role] || DEFAULT_ROLE_PERMISSIONS.EMPLOYEE;
    const allowed = Object.values(perms).filter(Boolean).length;
    return `${allowed}/12`;
  };

  // Permission Modules Config for Modal
  const PERMISSION_MODULES: {
    key: keyof UserPermissions;
    label: string;
    desc: string;
    category: 'Admin & System' | 'Staff & Operations' | 'Finance & Payroll';
  }[] = [
    { key: 'cms_edit', label: '🎨 Visual CMS Page Editor', desc: 'Edit all public website pages & banners live', category: 'Admin & System' },
    { key: 'media_upload', label: '🖼️ Media Library Uploads', desc: 'Upload, delete and replace multimedia images', category: 'Admin & System' },
    { key: 'user_management', label: '👥 User Accounts & RBAC', desc: 'Create, modify, and manage user login credentials', category: 'Admin & System' },
    { key: 'audit_logs', label: '🛡️ Security Audit Logs', desc: 'View complete system audit trail and IP logs', category: 'Admin & System' },
    { key: 'company_settings', label: '⚙️ System Settings & Branding', desc: 'Configure enterprise identity and statutory formulas', category: 'Admin & System' },
    { key: 'directory_all', label: '📖 Employee 360° Directory', desc: 'View all enterprise employees across all sites', category: 'Staff & Operations' },
    { key: 'kyc_vault', label: '🔒 KYC Document Vault', desc: 'Browse and upload verified Aadhaar/PAN documents', category: 'Staff & Operations' },
    { key: 'attendance_override', label: '⏰ Attendance Overrides', desc: 'Verify punches, approve late logins and shifts', category: 'Staff & Operations' },
    { key: 'leave_approvals', label: '✈️ Leave Approvals', desc: 'Review, approve, or reject employee leave requests', category: 'Staff & Operations' },
    { key: 'salary_sheet_edit', label: '📊 August Salary Sheet Master', desc: 'Full edit and sync control over operational salary sheet', category: 'Finance & Payroll' },
    { key: 'payslip_edit', label: '📄 Staff Computerized Payslips', desc: 'Generate and edit staff rate cards and PDF payslips', category: 'Finance & Payroll' },
    { key: 'fines_management', label: '⚖️ Fines & Disciplinary Ledger', desc: 'Log disciplinary fines and penalty deductions', category: 'Finance & Payroll' },
  ];

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. Header & Stats Banner */}
      <div className="bg-gradient-to-r from-[#070e1e] via-[#0b1329] to-[#0f1d3d] border border-[#1f2f58] rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Person-Specific RBAC & Access Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Role-Based Access Control (RBAC) & Profile Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Configure granular 12-module access permissions, site scoping, login credentials, and account statuses on a <strong>per-person basis</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isSuperAdmin && (
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-900/30 transition-all hover:scale-105 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add User Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Counter Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-[#1f2f58]/80">
          <div className="bg-[#070e1e]/60 border border-[#1f2f58] rounded-2xl p-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Users</span>
            <span className="text-xl font-black text-white">{systemUsers.length}</span>
          </div>
          <div className="bg-[#070e1e]/60 border border-purple-500/30 rounded-2xl p-3">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider block">Super Admins</span>
            <span className="text-xl font-black text-purple-400">
              {systemUsers.filter(u => u.role === 'SUPER_ADMIN').length}
            </span>
          </div>
          <div className="bg-[#070e1e]/60 border border-pink-500/30 rounded-2xl p-3">
            <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider block">HR Admins</span>
            <span className="text-xl font-black text-pink-400">
              {systemUsers.filter(u => u.role === 'HR_ADMIN').length}
            </span>
          </div>
          <div className="bg-[#070e1e]/60 border border-cyan-500/30 rounded-2xl p-3">
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">Site Managers</span>
            <span className="text-xl font-black text-cyan-400">
              {systemUsers.filter(u => u.role === 'SITE_MANAGER').length}
            </span>
          </div>
          <div className="bg-[#070e1e]/60 border border-amber-500/30 rounded-2xl p-3">
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Supervisors</span>
            <span className="text-xl font-black text-amber-400">
              {systemUsers.filter(u => u.role === 'SUPERVISOR').length}
            </span>
          </div>
          <div className="bg-[#070e1e]/60 border border-emerald-500/30 rounded-2xl p-3">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Active Staff</span>
            <span className="text-xl font-black text-emerald-400">
              {systemUsers.filter(u => (u.status || 'Active') === 'Active').length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Person Name, Login ID, Email, Employee ID, Designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Role Filter */}
          <div className="w-full md:w-48">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="ALL">All Roles ({systemUsers.length})</option>
              <option value="SUPER_ADMIN">👑 Super Admins</option>
              <option value="HR_ADMIN">👥 HR Admins</option>
              <option value="SITE_MANAGER">🏢 Site Managers</option>
              <option value="SUPERVISOR">👷 Field Supervisors</option>
              <option value="EMPLOYEE">🟢 Employees</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-40">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">🟢 Active Accounts</option>
              <option value="Suspended">🔴 Suspended Accounts</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. User Profiles & RBAC Management Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Person Access Profiles & Configured RBAC</span>
            </h3>
            <p className="text-xs text-slate-400">
              Showing {filteredUsers.length} profiles matching current search & filters. Click <strong>"🛡️ RBAC & Profile"</strong> on any person to customize.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#1f2f58]/80">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
              <tr>
                <th className="px-4 py-3.5">User Identity & Designation</th>
                <th className="px-4 py-3.5">Login ID & Email</th>
                <th className="px-3 py-3.5">Primary Role</th>
                <th className="px-4 py-3.5">Assigned Scoped Sites</th>
                <th className="px-3 py-3.5 text-center">RBAC Score</th>
                <th className="px-3 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2f58]/60 bg-[#070e1e]/40">
              {filteredUsers.map((user) => {
                const isUserActive = (user.status || 'Active') === 'Active';
                const roleBadgeColors: Record<Role, string> = {
                  SUPER_ADMIN: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
                  HR_ADMIN: 'bg-pink-950/80 text-pink-300 border-pink-500/40',
                  SITE_MANAGER: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
                  SUPERVISOR: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
                  EMPLOYEE: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                };

                return (
                  <tr key={user.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* User Identity */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-100 flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {user.employeeId && (
                              <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-amber-400">
                                {user.employeeId}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{user.designation || 'Staff Associate'}</div>
                        </div>
                      </div>
                    </td>

                    {/* Login ID & Email */}
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-purple-300 text-xs">{user.username}</div>
                      <div className="text-[11px] text-slate-400">{user.email}</div>
                    </td>

                    {/* Role Badge */}
                    <td className="px-3 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${roleBadgeColors[user.role]}`}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Assigned Sites */}
                    <td className="px-4 py-3">
                      <div className="max-w-[200px] truncate text-[11px] text-slate-300">
                        {user.assignedSites && user.assignedSites.length > 0 ? (
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span>{user.assignedSites.join(', ')}</span>
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">All Enterprise Sites</span>
                        )}
                      </div>
                    </td>

                    {/* RBAC Score */}
                    <td className="px-3 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-md bg-[#0b1329] border border-purple-500/30 text-purple-300 font-mono text-[11px] font-bold">
                        {getPermissionScore(user)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3 text-center">
                      {isUserActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                          <XCircle className="w-3 h-3" />
                          <span>Suspended</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Primary RBAC Edit Button */}
                        <button
                          onClick={() => handleOpenRbacModal(user)}
                          className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                          title="Configure Person-Specific RBAC, Sites & Profile"
                        >
                          <Shield className="w-3.5 h-3.5 text-purple-400" />
                          <span>🛡️ RBAC & Profile</span>
                        </button>

                        {/* Reset Password Button */}
                        <button
                          onClick={() => {
                            setPasswordResetUser(user);
                            setNewPasswordValue(user.role === 'EMPLOYEE' ? 'VPHS@EMPLOYEE' : 'VPHS@ADMIN');
                          }}
                          className="p-1.5 rounded-xl bg-slate-900 hover:bg-amber-950 text-slate-400 hover:text-amber-300 border border-[#1f2f58] transition-colors cursor-pointer"
                          title="Reset Password"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>

                        {/* Switch Button (Super Admin Only) */}
                        {isSuperAdmin && (
                          <button
                            onClick={() => loginAsPersona(user.role)}
                            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-[#1f2f58] transition-colors cursor-pointer"
                            title="Quick Switch View"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Button (Only Non-Admin) */}
                        {isSuperAdmin && user.role !== 'SUPER_ADMIN' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete profile for "${user.name}"?`)) {
                                deleteUserAccount(user.id);
                              }
                            }}
                            className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-[#1f2f58] transition-colors cursor-pointer"
                            title="Delete Profile"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. INTERACTIVE PERSON-SPECIFIC RBAC CONFIGURATOR MODAL */}
      {editingRbacUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1f2f58]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black text-base shadow-lg">
                  🛡️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">
                      Person-Specific RBAC & Profile: {editingRbacUser.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold">
                      Person-Specific Access
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Emp ID: <strong className="text-amber-400 font-mono">{editingRbacUser.employeeId || editingRbacUser.username}</strong> • Login ID: <strong className="text-purple-300 font-mono">{editingRbacUser.username}</strong> • {editingRbacUser.designation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingRbacUser(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRbac} className="space-y-6 text-xs">
              {/* Profile & Credentials Section */}
              <div className="bg-[#070e1e] border border-[#1f2f58] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>1. User Identity, Login Access & Email Details</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Edit Name, Login ID, and Email for this account</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Full Name (Display Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={rbacFormData.name}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, name: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-semibold focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Login ID / Username */}
                  <div>
                    <label className="block text-amber-400 font-bold mb-1">
                      Login ID / Username (Access ID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VPHS0040, rahul.admin"
                      value={rbacFormData.username}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, username: e.target.value })}
                      className="w-full bg-[#0b1329] border border-amber-500/40 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Login Email Address */}
                  <div>
                    <label className="block text-sky-400 font-bold mb-1">
                      Login Email Address (Access Mail) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@vphs.in"
                      value={rbacFormData.email}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, email: e.target.value })}
                      className="w-full bg-[#0b1329] border border-sky-500/40 rounded-xl px-3 py-2 text-sky-200 font-mono focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Designation / Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Facility Manager, Security Lead"
                      value={rbacFormData.designation}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, designation: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Reset Password */}
                  <div>
                    <label className="block text-purple-300 font-bold mb-1">Login Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={rbacFormData.password}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, password: e.target.value })}
                      className="w-full bg-[#0b1329] border border-purple-500/40 rounded-xl px-3 py-2 text-purple-200 font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Account Access Status */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Account Access Status</label>
                    <select
                      value={rbacFormData.status}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, status: e.target.value as 'Active' | 'Suspended' })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Active">🟢 Active (Access Granted)</option>
                      <option value="Suspended">🔴 Suspended (Access Blocked)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Role & Site Scope Section */}
              <div className="bg-[#070e1e] border border-[#1f2f58] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>2. Role Tier & Site Scoping</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Selecting a role applies preset baselines</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">Assigned Primary Role</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { role: 'SUPER_ADMIN', label: '👑 Super Admin (Full Control)', desc: 'Master access to all system modules & edits' },
                        { role: 'HR_ADMIN', label: '👥 HR Admin (HR & Payroll Master)', desc: 'Staff directory, payroll, payslips & fines' },
                        { role: 'SITE_MANAGER', label: '🏢 Site Manager (Site Lead)', desc: 'Scoped to assigned sites & employee attendance' },
                        { role: 'SUPERVISOR', label: '👷 Supervisor (Field Lead)', desc: 'Team rosters and biometric attendance overrides' },
                        { role: 'EMPLOYEE', label: '🟢 Employee (Self-Service)', desc: 'Confidential own attendance and payslip view' },
                      ].map((item) => (
                        <label
                          key={item.role}
                          onClick={() => handleRoleChangeInRbac(item.role as Role)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            rbacFormData.role === item.role
                              ? 'bg-purple-950/60 border-purple-500 text-white shadow-sm'
                              : 'bg-[#0b1329] border-[#1f2f58] text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-xs">{item.label}</div>
                            <div className="text-[10px] text-slate-400">{item.desc}</div>
                          </div>
                          <input
                            type="radio"
                            name="rbacRole"
                            checked={rbacFormData.role === item.role}
                            onChange={() => handleRoleChangeInRbac(item.role as Role)}
                            className="text-purple-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Scoped Sites Selection */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      Client Site Scoping (Multi-Select)
                    </label>
                    <p className="text-[10px] text-slate-400 mb-2">
                      Leave empty to grant access across all enterprise sites, or pick specific units.
                    </p>
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {[
                        'Microsoft India (R & D) Pvt. Ltd',
                        'Amazon HYD-1 Fulfillment Hub',
                        'Google Signature Tower Campus',
                        'Hyderabad Central Mall & Multiplex',
                        'Novartis Knowledge City Campus',
                        'GMR Rajiv Gandhi International Airport',
                        'VPHS Corporate Headquarters'
                      ].map((site) => {
                        const isSelected = rbacFormData.assignedSites.includes(site);
                        return (
                          <div
                            key={site}
                            onClick={() => handleToggleSite(site)}
                            className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition-all ${
                              isSelected
                                ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-semibold'
                                : 'bg-[#0b1329] border-[#1f2f58] text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            <span className="truncate max-w-[240px]">{site}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 12-Module Granular Custom Permissions Toggles */}
              <div className="bg-[#070e1e] border border-[#1f2f58] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>3. Granular 12-Module Custom Permission Toggles</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Toggle individual module access for this specific person. Overrides standard role presets.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRbacFormData(prev => ({
                        ...prev,
                        customPermissions: { ...DEFAULT_ROLE_PERMISSIONS[prev.role] }
                      }));
                      showToast('Reset permissions to standard role preset baselines', 'info');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-[#1f2f58] hover:border-amber-500 text-amber-400 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Preset</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PERMISSION_MODULES.map((mod) => {
                    const isEnabled = !!rbacFormData.customPermissions[mod.key];
                    return (
                      <div
                        key={mod.key}
                        onClick={() => handleTogglePermission(mod.key)}
                        className={`p-3 rounded-2xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                          isEnabled
                            ? 'bg-purple-950/40 border-purple-500/60 shadow-sm'
                            : 'bg-[#0b1329] border-[#1f2f58] opacity-75 hover:opacity-100 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className={`font-bold text-xs ${isEnabled ? 'text-purple-200' : 'text-slate-300'}`}>
                              {mod.label}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{mod.desc}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#1f2f58]/60 text-[10px]">
                          <span className="text-slate-500 font-mono">{mod.category}</span>
                          <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-500 border border-slate-700'
                          }`}>
                            {isEnabled ? 'Allowed' : 'Locked'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1f2f58]">
                <button
                  type="button"
                  onClick={() => setEditingRbacUser(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-[#1f2f58] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
                >
                  Save Person RBAC Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD NEW USER PROFILE MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2.5">
                <UserPlus className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Create New User Profile</h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Display Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Login ID / Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ramesh.kumar, VPHS0080"
                    value={newUserData.username}
                    onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Login Password *</label>
                  <input
                    type="password"
                    required
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@vphs.in"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Primary Role Tier</label>
                  <select
                    value={newUserData.role}
                    onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as Role })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none cursor-pointer"
                  >
                    <option value="SUPER_ADMIN">👑 Super Admin</option>
                    <option value="HR_ADMIN">👥 HR Admin</option>
                    <option value="SITE_MANAGER">🏢 Site Manager</option>
                    <option value="SUPERVISOR">👷 Supervisor</option>
                    <option value="EMPLOYEE">🟢 Employee</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Designation / Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Operations Executive"
                  value={newUserData.designation}
                  onChange={(e) => setNewUserData({ ...newUserData, designation: e.target.value })}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1f2f58]">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. QUICK PASSWORD RESET MODAL */}
      {passwordResetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2 text-amber-400">
                <KeyRound className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Reset Account Password</h3>
              </div>
              <button
                onClick={() => setPasswordResetUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">
                Set a new login password for <strong className="text-white">{passwordResetUser.name}</strong> (Username: <span className="font-mono text-purple-300">{passwordResetUser.username}</span>).
              </p>

              <div>
                <label className="block text-slate-300 font-bold mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    value={newPasswordValue}
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewPasswordValue('VPHS@ADMIN')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-[#1f2f58] text-[10px] text-purple-300 font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Preset: Super Admin Password
                </button>
                <button
                  type="button"
                  onClick={() => setNewPasswordValue('VPHS@EMPLOYEE')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-[#1f2f58] text-[10px] text-emerald-300 font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Preset: Employee Standard Password
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1f2f58]">
                <button
                  type="button"
                  onClick={() => setPasswordResetUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePasswordReset}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Enterprise Permission Matrix Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl overflow-hidden shadow-2xl space-y-3 p-6">
        <div>
          <h3 className="text-sm font-bold text-white">Enterprise Baseline Permission Matrix</h3>
          <p className="text-xs text-slate-400">Default preset baselines applied when assigning roles. Customizable on each person's profile.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#1f2f58]">
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
              {PERMISSION_MODULES.map((p) => (
                <tr key={p.key} className="hover:bg-slate-900/60 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-200">
                    <div>{p.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{p.desc}</div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    {DEFAULT_ROLE_PERMISSIONS.SUPER_ADMIN[p.key] ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {DEFAULT_ROLE_PERMISSIONS.HR_ADMIN[p.key] ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {DEFAULT_ROLE_PERMISSIONS.SITE_MANAGER[p.key] ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {DEFAULT_ROLE_PERMISSIONS.SUPERVISOR[p.key] ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {DEFAULT_ROLE_PERMISSIONS.EMPLOYEE[p.key] ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <XCircle className="w-4 h-4 text-slate-600 mx-auto" />}
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

