import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Building2,
  CalendarCheck,
  Receipt,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Plus,
  Shield,
  FileText,
  MapPin,
  Compass,
  Download,
  Calendar,
  CreditCard,
  Check,
  ChevronRight,
  Sparkles,
  Phone,
  ShieldCheck,
  User
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { AUGUST_2026_ATTENDANCE_DATA, MonthlyEmployeeAttendance } from '../../data/monthlyAttendanceData';

export const DashboardOverview: React.FC = () => {
  const {
    currentUser,
    employees,
    sites,
    attendance,
    leaves,
    payroll,
    auditLogs,
    setErpActiveTab,
    openPageEditor
  } = useApp();

  const role = currentUser?.role || 'EMPLOYEE';
  const isSuperAdmin = role === 'SUPER_ADMIN';

  // Active Perspective Switcher: 'all' | employeeId
  const [selectedPerspective, setSelectedPerspective] = useState<string>(() => {
    if (role === 'EMPLOYEE' && currentUser?.employeeId) {
      return currentUser.employeeId;
    }
    return 'all';
  });

  // Find active employee for person-based representation
  const activeEmp = employees.find(e => e.id === selectedPerspective) || employees.find(e => e.id === 'VPHS0055') || employees[0];
  const activeEmpAttendance = AUGUST_2026_ATTENDANCE_DATA.find(p => p.empId === activeEmp?.id || p.name.toLowerCase() === activeEmp?.name.toLowerCase()) || AUGUST_2026_ATTENDANCE_DATA[0];
  const activeEmpPayroll = payroll.find(p => p.employeeId === activeEmp?.id) || payroll[0];
  const activeEmpSite = sites.find(s => s.id === activeEmpAttendance?.siteId || (activeEmp?.siteUnit && s.name.toLowerCase().includes(activeEmp.siteUnit.toLowerCase()))) || sites[0];

  // Global Metrics
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const todayAttendance = attendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const attendanceRate = attendance.length > 0 ? ((todayAttendance / attendance.length) * 100).toFixed(1) : '89.6';
  const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;
  const totalPayrollAmount = payroll.reduce((acc, p) => acc + (p.netPay || 0), 0);

  // Department distribution
  const deptMap: Record<string, number> = {};
  employees.forEach(e => {
    const dept = e.department || 'Facility Management';
    deptMap[dept] = (deptMap[dept] || 0) + 1;
  });
  const deptData = Object.keys(deptMap).map(name => ({ name, count: deptMap[name] }));

  // Site allocation data
  const siteMap: Record<string, number> = {};
  employees.forEach(e => {
    const site = e.siteUnit ? e.siteUnit.split('-')[1]?.trim() || e.siteUnit : 'Head Office';
    siteMap[site] = (siteMap[site] || 0) + 1;
  });
  const siteData = Object.keys(siteMap).slice(0, 5).map(name => ({ name, value: siteMap[name] }));

  const COLORS = ['#f59e0b', '#38bdf8', '#10b981', '#a855f7', '#f43f5e', '#64748b'];

  const attendanceTrend = [
    { day: 'Mon', present: 28, late: 2, overtime: 4 },
    { day: 'Tue', present: 30, late: 1, overtime: 5 },
    { day: 'Wed', present: 29, late: 2, overtime: 3 },
    { day: 'Thu', present: 31, late: 1, overtime: 6 },
    { day: 'Fri', present: 30, late: 2, overtime: 4 },
    { day: 'Sat', present: 26, late: 3, overtime: 2 }
  ];

  // Helper for rendering Day Cell Badge
  const renderDayBadge = (code: string) => {
    const c = (code || '').toUpperCase().trim();
    if (c === 'P') {
      return (
        <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center justify-center text-[10px] mx-auto">
          P
        </span>
      );
    }
    if (c === 'W/O') {
      return (
        <span className="w-6 h-5 rounded bg-slate-800 text-slate-400 border border-slate-700/80 font-bold flex items-center justify-center text-[9px] mx-auto">
          W/O
        </span>
      );
    }
    if (c === 'A') {
      return (
        <span className="w-5 h-5 rounded bg-rose-500/25 text-rose-300 border border-rose-500/50 font-black flex items-center justify-center text-[10px] mx-auto animate-pulse">
          A
        </span>
      );
    }
    if (c === 'L') {
      return (
        <span className="w-5 h-5 rounded bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold flex items-center justify-center text-[10px] mx-auto">
          L
        </span>
      );
    }
    if (c === 'HD') {
      return (
        <span className="w-5 h-5 rounded bg-orange-500/25 text-orange-300 border border-orange-500/50 font-bold flex items-center justify-center text-[9px] mx-auto">
          HD
        </span>
      );
    }
    return <span className="text-slate-600 text-[10px]">-</span>;
  };

  return (
    <div className="space-y-6">
      {/* 1. PERSPECTIVE SWITCHER: ALL ENTERPRISE VS. INDIVIDUAL PERSON */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Dashboard Representation</span>
            <h2 className="text-sm sm:text-base font-black text-white">
              {selectedPerspective === 'all' ? '🏢 Enterprise-Wide Master Dashboard' : `👤 Person Overview: ${activeEmp.name}`}
            </h2>
          </div>
        </div>

        {/* Perspective Dropdown Selector */}
        {role !== 'EMPLOYEE' && (
          <div className="flex items-center gap-2 w-full md:w-auto bg-[#070e1e] p-1.5 rounded-2xl border border-[#1f2f58]">
            <label className="text-xs font-bold text-slate-400 pl-2 whitespace-nowrap">View as Person:</label>
            <select
              value={selectedPerspective}
              onChange={(e) => setSelectedPerspective(e.target.value)}
              className="bg-[#0b1329] border border-amber-500/40 text-xs font-bold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 max-w-[280px] cursor-pointer"
            >
              <option value="all">🏢 All Enterprise (Global Executive Overview)</option>
              <optgroup label="Deployed Associates by Client Site">
                {AUGUST_2026_ATTENDANCE_DATA.map((p, idx) => (
                  <option key={p.empId || idx} value={p.empId}>
                    {idx + 1}. {p.name} ({p.siteUnit})
                  </option>
                ))}
              </optgroup>
            </select>

            {selectedPerspective !== 'all' && (
              <button
                onClick={() => setSelectedPerspective('all')}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold whitespace-nowrap"
              >
                Reset to Global
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. PERSON-BASED REPRESENTATION VIEW (WHEN A PERSON IS SELECTED OR LOGGED IN AS EMPLOYEE) */}
      {selectedPerspective !== 'all' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Person Profile & Operational Site Header Card */}
          <div className="bg-gradient-to-r from-[#111c38] via-[#152244] to-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="absolute right-0 top-0 bottom-0 w-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-3xl shadow-xl border-2 border-amber-400/50">
                {activeEmp.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                    {activeEmp.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    ● Active on Duty
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeEmp.name}
                </h1>
                <p className="text-xs text-slate-300">
                  {activeEmp.designation} • Department: <strong>{activeEmp.department}</strong> • DOJ: <span className="font-mono">{activeEmp.doj}</span>
                </p>
              </div>
            </div>

            {/* Assigned Site Spotlight */}
            <div className="bg-[#070e1e]/90 border border-[#1f2f58] p-4 rounded-2xl text-xs space-y-1.5 relative z-10 w-full lg:w-80 shadow-inner">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Assigned Operational Site</span>
              <p className="font-bold text-white text-sm flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">{activeEmpSite?.name || activeEmp.siteUnit}</span>
              </p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span className="truncate">{activeEmpSite?.location}, {activeEmpSite?.city}</span>
              </p>
              <p className="font-mono text-[10px] text-emerald-400 truncate pt-1 border-t border-[#1f2f58]/50">
                GPS: {activeEmpSite?.geotag?.formattedCoordinates || '17.4435° N, 78.3772° E'}
              </p>
            </div>
          </div>

          {/* Person 6 Performance KPI Cards (Based on August 2026 Dataset) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#0b1329] border border-[#1f2f58] text-center space-y-1 shadow">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Days</span>
              <div className="text-2xl font-black text-white font-mono">{activeEmpAttendance.totalDays}</div>
              <span className="text-[10px] text-slate-500">August 2026</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-1 shadow">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Present</span>
              <div className="text-2xl font-black text-emerald-300 font-mono">{activeEmpAttendance.totalPresent}</div>
              <span className="text-[10px] text-emerald-500">On Duty Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700 text-center space-y-1 shadow">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Weekly Off</span>
              <div className="text-2xl font-black text-slate-200 font-mono">{activeEmpAttendance.weeklyOff}</div>
              <span className="text-[10px] text-slate-400">Rest Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-1 shadow">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Leaves</span>
              <div className="text-2xl font-black text-amber-300 font-mono">{activeEmpAttendance.totalLeaves}</div>
              <span className="text-[10px] text-amber-500">Approved Leaves</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-1 shadow">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Absent</span>
              <div className="text-2xl font-black text-rose-300 font-mono">{activeEmpAttendance.absent}</div>
              <span className="text-[10px] text-rose-500">Unexcused</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-center space-y-1 shadow">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Attendance %</span>
              <div className="text-2xl font-black text-amber-300 font-mono">{activeEmpAttendance.percentage}%</div>
              <span className="text-[10px] text-amber-500">August SLA Score</span>
            </div>
          </div>

          {/* 31-Day Shift Heat Calendar for the Selected Person */}
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  August 2026 Daily Shift Record for {activeEmp.name}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Assigned Site: <strong className="text-amber-400">{activeEmpAttendance.siteUnit}</strong>
              </span>
            </div>

            {/* 31-Day Calendar Grid */}
            <div className="grid grid-cols-7 sm:grid-cols-11 md:grid-cols-16 lg:grid-cols-31 gap-1.5 p-4 rounded-2xl bg-[#070e1e] border border-[#1f2f58]">
              {activeEmpAttendance.days.map((code, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/60 border border-[#1f2f58]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500">{idx + 1}</span>
                  <div>{renderDayBadge(code)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Person Financials, Leave Balance, and KYC Verification Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Monthly Wage & Take-Home Card */}
            <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f2f58]">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">August Payslip Summary</h3>
                </div>
                <button
                  onClick={() => setErpActiveTab('payroll')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Full Payslip</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Basic Salary:</span>
                  <span className="font-mono font-semibold">₹{(activeEmpPayroll?.basicSalary || 11500).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">House Rent Allowance (HRA):</span>
                  <span className="font-mono font-semibold">₹{(activeEmpPayroll?.hra || 4600).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Gross Salary:</span>
                  <span className="font-mono font-bold text-white">₹{(activeEmpPayroll?.grossSalary || 23000).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-rose-400 pt-2 border-t border-[#1f2f58]/50">
                  <span>Total Statutory Deductions (EPF + ESIC + PT):</span>
                  <span className="font-mono font-bold">-₹{(activeEmpPayroll?.totalDeductions || 1753).toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between mt-2">
                  <span className="font-bold text-amber-400">Net Take-Home:</span>
                  <span className="text-lg font-black text-amber-300 font-mono">
                    ₹{(activeEmpPayroll?.netPay || 21247).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Leave Balances Card */}
            <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f2f58]">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Leave Quota Balances</h3>
                </div>
                <button
                  onClick={() => setErpActiveTab('leaves')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Apply Leave</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#070e1e] border border-[#1f2f58] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Casual Leave (CL)</span>
                    <span className="text-[10px] text-slate-400">3 Days Utilized this Year</span>
                  </div>
                  <span className="text-base font-black text-amber-400 font-mono">9 / 12</span>
                </div>

                <div className="p-3 rounded-xl bg-[#070e1e] border border-[#1f2f58] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Sick Leave (SL)</span>
                    <span className="text-[10px] text-slate-400">Medical Certificate Required &gt; 2 Days</span>
                  </div>
                  <span className="text-base font-black text-sky-400 font-mono">10 / 12</span>
                </div>

                <div className="p-3 rounded-xl bg-[#070e1e] border border-[#1f2f58] flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Earned Leave (EL)</span>
                    <span className="text-[10px] text-slate-400">Encashable at Year End</span>
                  </div>
                  <span className="text-base font-black text-emerald-400 font-mono">15 / 15</span>
                </div>
              </div>
            </div>

            {/* 3. KYC Verification & Identity Card */}
            <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#1f2f58]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  <h3 className="text-sm font-bold text-white">KYC Verification Vault</h3>
                </div>
                <button
                  onClick={() => setErpActiveTab('kyc-vault')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Vault</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#070e1e] border border-[#1f2f58]">
                  <span className="text-slate-300">Aadhaar Card:</span>
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Verified ({activeEmp.aadhar})
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#070e1e] border border-[#1f2f58]">
                  <span className="text-slate-300">PAN Number:</span>
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> Verified ({activeEmp.pan})
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#070e1e] border border-[#1f2f58]">
                  <span className="text-slate-300">Bank Account:</span>
                  <span className="font-mono text-slate-200">{activeEmp.bankAc} ({activeEmp.ifsc})</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#070e1e] border border-[#1f2f58]">
                  <span className="text-slate-300">EPFO UAN:</span>
                  <span className="font-mono text-amber-400">{activeEmp.uan || '101928472910'}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#070e1e] border border-[#1f2f58]">
                  <span className="text-slate-300">Police Verification (PVC):</span>
                  <span className="text-emerald-400 font-bold">✓ Clear</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. GLOBAL ENTERPRISE OVERVIEW (WHEN 'ALL ENTERPRISE' PERSPECTIVE IS ACTIVE) */}
      {selectedPerspective === 'all' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#111c38] via-[#152244] to-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="absolute right-0 top-0 bottom-0 w-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold tracking-wider uppercase border border-amber-500/30">
                  {role.replace('_', ' ')} PORTAL
                </span>
                <span className="text-xs text-slate-400 font-mono">• August 2026 Live Session</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome, {currentUser?.name}
              </h1>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Complete enterprise overview with 73 master employee records, individual site attendance matrices, statutory compliance engines, and visual CMS builder.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {role === 'SUPER_ADMIN' && (
                <button
                  onClick={() => openPageEditor('home')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  <span>Edit Home Page CMS</span>
                </button>
              )}
              {role !== 'EMPLOYEE' && (
                <button
                  onClick={() => setErpActiveTab('employees')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Employee</span>
                </button>
              )}
              <button
                onClick={() => setErpActiveTab('attendance')}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark Punch</span>
              </button>
            </div>
          </div>

          {/* Metrics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div
              onClick={() => setErpActiveTab('employees')}
              className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Headcount</span>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-white">{employees.length}</div>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                  <span>● {activeEmployees} Active on Duty</span>
                  <span className="text-slate-500">({employees.length - activeEmployees} Inactive)</span>
                </p>
              </div>
            </div>

            <div
              onClick={() => setErpActiveTab('sites')}
              className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Client Sites</span>
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-white">{sites.length} Campuses</div>
                <p className="text-[11px] text-slate-400 mt-1">Microsoft, Amazon, Third Wave...</p>
              </div>
            </div>

            <div
              onClick={() => setErpActiveTab('attendance')}
              className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">August Attendance SLA</span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CalendarCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-emerald-400">{attendanceRate}%</div>
                <p className="text-[11px] text-slate-400 mt-1">32 Deployed Staff Shifts Monitored</p>
              </div>
            </div>

            <div
              onClick={() => setErpActiveTab('payroll')}
              className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Payroll</span>
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-white font-mono">
                  ₹{(totalPayrollAmount / 100000).toFixed(2)} L
                </div>
                <p className="text-[11px] text-emerald-400 mt-1 font-semibold">● August 2026 Batch Ready</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Attendance Trends */}
            <div className="lg:col-span-8 bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Weekly Attendance & Shift Regularity</h3>
                  <p className="text-xs text-slate-400">Punctuality and overtime hours across all client units</p>
                </div>
                <span className="text-[11px] text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  Real-time Logs
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attendanceTrend}>
                    <defs>
                      <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#64748b" textAnchor="middle" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#070e1e', borderColor: '#1f2f58', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Area type="monotone" dataKey="present" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#presentGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Site Allocation Breakdown */}
            <div className="lg:col-span-4 bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Client Site Deployments</h3>
                <p className="text-xs text-slate-400">Workforce distribution by campus</p>
              </div>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={siteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {siteData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#070e1e', borderColor: '#1f2f58', borderRadius: '8px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-[#1f2f58]/60">
                {siteData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span className="text-slate-300 truncate">{item.name}</span>
                    <span className="text-slate-500 font-mono">({item.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
