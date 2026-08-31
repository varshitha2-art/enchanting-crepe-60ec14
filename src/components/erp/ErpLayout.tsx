import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  Calendar,
  Receipt,
  FileCheck,
  Globe,
  Image as ImageIcon,
  Shield,
  History,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  ExternalLink,
  Edit3,
  CheckCircle,
  Menu,
  X,
  FileText,
  UserCheck,
  ArrowRightLeft
} from 'lucide-react';
import { DashboardOverview } from './DashboardOverview';
import { EmployeeMaster } from './EmployeeMaster';
import { AttendanceManager } from './AttendanceManager';
import { LeaveManager } from './LeaveManager';
import { PayrollEngine } from './PayrollEngine';
import { SiteManagerView } from './SiteManagerView';
import { KycDocumentVault } from './KycDocumentVault';
import { CompliancePortals } from './CompliancePortals';
import { CmsPageManager } from './CmsPageManager';
import { UserRoleAdmin } from './UserRoleAdmin';
import { AuditLogsPage } from './AuditLogsPage';
import { SystemSettingsView } from './SystemSettingsView';
import { Role } from '../../types';

export const ErpLayout: React.FC = () => {
  const {
    currentUser,
    erpActiveTab,
    setErpActiveTab,
    logout,
    navigateTo,
    isEditMode,
    setIsEditMode,
    loginAsPersona,
    loginAsEmployee,
    employees,
    systemUsers
  } = useApp();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [switchLoginModalOpen, setSwitchLoginModalOpen] = useState(false);

  // Authentication Guard
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center p-4">
        <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-8 max-w-md text-center space-y-4 shadow-2xl">
          <Shield className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-slate-400">Please sign in with your registered credentials to access the ERP Portal.</p>
          <button
            onClick={() => navigateTo('login')}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow cursor-pointer"
          >
            Go to Portal Login
          </button>
        </div>
      </div>
    );
  }

  const role: Role = currentUser.role || 'EMPLOYEE';
  const isSuperAdmin = role === 'SUPER_ADMIN';

  // Navigation Items according to strict Role-Based Access Control (RBAC)
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'SITE_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] },
    { id: 'employees', label: role === 'EMPLOYEE' ? 'My Profile' : 'Employee Master (360°)', icon: Users, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'SITE_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] },
    { id: 'sites', label: 'Client Sites & Campuses', icon: Building2, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'SITE_MANAGER'] },
    { id: 'attendance', label: 'Attendance & Shifts', icon: CalendarCheck, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'SITE_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] },
    { id: 'leave', label: 'Leave Management', icon: Calendar, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'SITE_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] },
    { id: 'payroll', label: role === 'EMPLOYEE' ? 'My Payslips' : 'Payroll & Payslip Engine', icon: Receipt, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'EMPLOYEE'] },
    { id: 'documents', label: 'KYC & Document Vault', icon: FileCheck, roles: ['SUPER_ADMIN', 'HR_ADMIN', 'SITE_MANAGER', 'SUPERVISOR', 'EMPLOYEE'] },
    { id: 'portals', label: 'Statutory Portals', icon: FileText, roles: ['SUPER_ADMIN', 'HR_ADMIN'] },
    { id: 'cms', label: 'Website CMS & Builder', icon: Globe, roles: ['SUPER_ADMIN', 'HR_ADMIN'] },
    { id: 'users', label: 'Users & Roles (RBAC)', icon: Shield, roles: ['SUPER_ADMIN'] },
    { id: 'audit', label: 'Activity & Audit Logs', icon: History, roles: ['SUPER_ADMIN'] },
    { id: 'settings', label: 'System Settings', icon: Settings, roles: ['SUPER_ADMIN'] },
  ];

  const authorizedMenuItems = menuItems.filter(item => item.roles.includes(role));
  const authorizedTabIds = authorizedMenuItems.map(item => item.id);
  const activeTabSafe = authorizedTabIds.includes(erpActiveTab) ? erpActiveTab : 'dashboard';

  const renderActiveTab = () => {
    switch (activeTabSafe) {
      case 'dashboard': return <DashboardOverview />;
      case 'employees': return <EmployeeMaster />;
      case 'sites': return <SiteManagerView />;
      case 'attendance': return <AttendanceManager />;
      case 'leave': return <LeaveManager />;
      case 'payroll': return <PayrollEngine />;
      case 'documents': return <KycDocumentVault />;
      case 'portals': return <CompliancePortals />;
      case 'cms': return <CmsPageManager />;
      case 'users': return <UserRoleAdmin />;
      case 'audit': return <AuditLogsPage />;
      case 'settings': return <SystemSettingsView />;
      default: return <DashboardOverview />;
    }
  };

  const getRoleBadge = (r: Role) => {
    switch (r) {
      case 'SUPER_ADMIN': return <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold">Super Admin</span>;
      case 'HR_ADMIN': return <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold">HR Admin</span>;
      case 'SITE_MANAGER': return <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">Site Manager</span>;
      case 'SUPERVISOR': return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold">Supervisor</span>;
      case 'EMPLOYEE': return <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">Employee</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14] text-slate-100 flex flex-col">
      {/* Top Super Admin Edit Mode Ribbon */}
      {role === 'SUPER_ADMIN' && (
        <div className="bg-slate-900 border-b border-[#1f2f58] px-4 py-1.5 text-xs flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-bold text-white">VPHS Super Admin Command:</span>
            <span className="text-slate-400 hidden sm:inline">You have full permissions across public pages, CMS, KYC vault, and ERP modules.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                isEditMode ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isEditMode ? '✓ CMS Live Edit: ON' : 'Enable CMS Live Edit'}
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-semibold flex items-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View Public Website</span>
            </button>
          </div>
        </div>
      )}

      {/* Main ERP Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col justify-between bg-[#070e1e] border-r border-[#1f2f58] transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="space-y-4">
            {/* Sidebar Brand Header */}
            <div className="p-4 border-b border-[#1f2f58] flex items-center justify-between">
              <div
                onClick={() => navigateTo('home')}
                className={`flex items-center gap-3 cursor-pointer ${sidebarCollapsed ? 'justify-center w-full' : ''}`}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-xl shadow-md shadow-amber-500/20 flex-shrink-0">
                  V
                </div>
                {!sidebarCollapsed && (
                  <div className="truncate">
                    <h2 className="text-sm font-extrabold text-white tracking-wider truncate">VPHS SERVICES</h2>
                    <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest block">HR & FACILITY ERP</span>
                  </div>
                )}
              </div>

              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {sidebarCollapsed && (
              <div className="px-3 text-center">
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
                  title="Expand sidebar"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Nav Menu */}
            <div className="px-3 space-y-1">
              {authorizedMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = erpActiveTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setErpActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Profile Footer */}
          <div className="p-3 border-t border-[#1f2f58] bg-[#050a14] space-y-2">
            {!sidebarCollapsed ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30 flex-shrink-0">
                    {currentUser?.name.charAt(0) || 'U'}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'User'}</p>
                    <p className="text-[10px] text-amber-400">{currentUser?.employeeId || role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#0b1329]">
          {/* ERP Top Header */}
          <header className="sticky top-0 z-20 bg-[#070e1e]/90 backdrop-blur-md border-b border-[#1f2f58] px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-slate-900 border border-[#1f2f58] text-slate-300"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">VPHS ERP Portal /</span>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {menuItems.find(m => m.id === erpActiveTab)?.label || 'Overview'}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-white">
                  {menuItems.find(m => m.id === erpActiveTab)?.label}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                {getRoleBadge(role)}
              </div>

              {/* Super Admin Switch Login Control (Strictly Super Admin Only) */}
              {isSuperAdmin && (
                <button
                  onClick={() => setSwitchLoginModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  title="Switch to another persona or employee view"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Switch Login</span>
                </button>
              )}

              <button
                onClick={() => navigateTo('home')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-[#1f2f58] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Public Website</span>
              </button>

              <button
                onClick={logout}
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-[#1f2f58] transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Module Content */}
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {renderActiveTab()}
          </div>
        </main>
      </div>

      {/* SUPER ADMIN SWITCH LOGIN MODAL (Only Accessible to Super Admin) */}
      {isSuperAdmin && switchLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-2xl shadow-2xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2.5 text-purple-400">
                <ArrowRightLeft className="w-5 h-5" />
                <div>
                  <h3 className="text-base font-bold text-white">Super Admin Account Switcher</h3>
                  <p className="text-xs text-slate-400">Switch view to inspect permissions as different personas or employees</p>
                </div>
              </div>
              <button
                onClick={() => setSwitchLoginModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Persona Switchers */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Administrative Roles</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { role: 'SUPER_ADMIN', name: 'Vikram Pratap Singh', label: '👑 Super Admin', desc: 'Full Master Access' },
                  { role: 'HR_ADMIN', name: 'Priya Sharma', label: '👥 HR Admin', desc: 'HR, Payroll & Payslips' },
                  { role: 'SITE_MANAGER', name: 'Ramesh Kumar', label: '🏢 Site Manager', desc: 'Site Operations & Roster' },
                  { role: 'SUPERVISOR', name: 'Suresh Kumar', label: '👷 Supervisor', desc: 'Field Team & Overrides' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      setSwitchLoginModalOpen(false);
                      loginAsPersona(item.role as Role);
                    }}
                    className="p-3 rounded-xl border border-[#1f2f58] hover:border-purple-500 bg-[#070e1e] hover:bg-purple-950/20 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 17 Authorized Employee Switchers */}
            <div className="space-y-2 pt-2 border-t border-[#1f2f58]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">17 Authorized Employees</h4>
                <span className="text-[10px] text-slate-400">Click any employee to switch view</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
                {[
                  'VPHS0040', 'VPHS0046', 'VPHS0050', 'VPHS0051', 'VPHS0055',
                  'VPHS0056', 'VPHS0061', 'VPHS0062', 'VPHS0063', 'VPHS0067',
                  'VPHS0068', 'VPHS0069', 'VPHS0072', 'VPHS0075', 'VPHS0076',
                  'VPHS0078', 'VPHS0079'
                ].map((empId) => {
                  const empObj = employees.find(e => e.id.toUpperCase() === empId);
                  const empName = empObj?.name || `Employee ${empId}`;
                  return (
                    <button
                      key={empId}
                      onClick={() => {
                        setSwitchLoginModalOpen(false);
                        loginAsEmployee(empId);
                      }}
                      className="p-2.5 rounded-xl border border-[#1f2f58] hover:border-emerald-500 bg-[#070e1e] hover:bg-emerald-950/20 text-left transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-amber-400">{empId}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">Employee</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-semibold truncate mt-0.5">{empName}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          ></div>
          <div className="relative w-72 bg-[#070e1e] border-r border-[#1f2f58] p-4 flex flex-col justify-between z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-lg">
                    V
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-white">VPHS SERVICES</h3>
                    <span className="text-[9px] text-amber-400 font-bold">PORTAL</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {authorizedMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = erpActiveTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setErpActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f2f58]">
              <button
                onClick={() => {
                  logout();
                  setMobileSidebarOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-rose-950/30 text-rose-400 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
