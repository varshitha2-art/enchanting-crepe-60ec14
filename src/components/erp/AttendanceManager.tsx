import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  LogIn,
  LogOut,
  AlertTriangle,
  Compass,
  SlidersHorizontal,
  Edit2,
  Calendar,
  X,
  Map,
  ShieldCheck,
  Check,
  FileSpreadsheet,
  Building2,
  Users,
  Percent,
  ChevronRight,
  Sparkles,
  Phone,
  Upload
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { AttendanceRecord, SiteGeotag } from '../../types';
import { AUGUST_2026_ATTENDANCE_DATA, MonthlyEmployeeAttendance, calculateDailyTotals } from '../../data/monthlyAttendanceData';

export const AttendanceManager: React.FC = () => {
  const {
    attendance,
    markAttendance,
    punchOut,
    addManualAttendanceRecord,
    updateSiteGeotag,
    currentUser,
    employees,
    sites,
    showToast
  } = useApp();

  const role = currentUser?.role || 'EMPLOYEE';
  const isSuperAdmin = role === 'SUPER_ADMIN';

  // Active View Switcher: 'monthly' | 'daily' | 'person'
  const [viewMode, setViewMode] = useState<'monthly' | 'daily' | 'person'>('monthly');

  // Selected Site Filter for Individual Site Representation
  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Selected Employee for Punch Console & Person View
  const [selectedEmpId, setSelectedEmpId] = useState<string>(() => {
    if (currentUser?.employeeId) return currentUser.employeeId;
    return 'VPHS0055';
  });

  // Selected Person Filter in Monthly Matrix
  const [selectedMonthlyPerson, setSelectedMonthlyPerson] = useState<string>('All');

  // Live Real-Time Clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Modals
  const [geotagModalOpen, setGeotagModalOpen] = useState(false);
  const [manualRecordModalOpen, setManualRecordModalOpen] = useState(false);

  // Geotag Form State (Only accessible to Super Admin)
  const [targetSiteId, setTargetSiteId] = useState<string>(sites[0]?.id || 'site-1');
  const [geotagForm, setGeotagForm] = useState<SiteGeotag>({
    latitude: 17.4435,
    longitude: 78.3772,
    radiusMeters: 250,
    formattedCoordinates: '17.4435° N, 78.3772° E (Microsoft India Campus, Financial District)',
    address: 'Building 3, Gachibowli ISB Road, Financial District, Hyderabad'
  });

  // Manual Record Form State
  const [manualForm, setManualForm] = useState({
    employeeId: employees[0]?.id || 'VPHS0055',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    status: 'Present' as AttendanceRecord['status'],
    overtimeHours: 0,
    location: 'Microsoft India Campus'
  });

  // Current selected employee object
  const currentEmp = employees.find(e => e.id === selectedEmpId) || employees[0];

  // Match individual site based on the selected person
  const matchingSite = sites.find(s => 
    (currentEmp?.siteUnit && s.name.toLowerCase().includes(currentEmp.siteUnit.toLowerCase())) ||
    (currentEmp?.siteUnit && currentEmp.siteUnit.toLowerCase().includes(s.name.toLowerCase()))
  ) || sites.find(s => s.id === selectedSiteId) || sites[0];

  // Current Site Geotag
  const currentSiteGeotag = matchingSite?.geotag?.formattedCoordinates ||
    '17.4435° N, 78.3772° E (Microsoft India Campus, Financial District)';

  // Today's attendance record for the selected employee
  const todayDate = new Date().toISOString().split('T')[0];
  const todayPunch = attendance.find(a => a.employeeId === selectedEmpId && a.date === todayDate);

  let todayStatusText = 'NOT PUNCHED';
  let todayStatusColor = 'text-slate-400';
  if (todayPunch) {
    if (todayPunch.checkOut) {
      todayStatusText = `PRESENT (PUNCHED OUT at ${todayPunch.checkOut})`;
      todayStatusColor = 'text-sky-400';
    } else if (todayPunch.status === 'Present') {
      todayStatusText = 'PRESENT (ON DUTY)';
      todayStatusColor = 'text-emerald-400';
    } else if (todayPunch.status === 'Late') {
      todayStatusText = 'LATE (ON DUTY)';
      todayStatusColor = 'text-amber-400';
    } else if (todayPunch.status === 'Half Day') {
      todayStatusText = 'HALF DAY';
      todayStatusColor = 'text-amber-300';
    } else if (todayPunch.status === 'Absent') {
      todayStatusText = 'ABSENT';
      todayStatusColor = 'text-rose-400';
    }
  }

  // Scoped attendance records for Daily View
  let scopedAttendance = attendance;
  if (role === 'EMPLOYEE') {
    scopedAttendance = attendance.filter(a => a.employeeId === currentUser?.employeeId);
  } else if (selectedSiteId !== 'all') {
    const siteObj = sites.find(s => s.id === selectedSiteId);
    if (siteObj) {
      scopedAttendance = attendance.filter(a => 
        a.siteName.toLowerCase().includes(siteObj.name.toLowerCase()) ||
        siteObj.name.toLowerCase().includes(a.siteName.toLowerCase())
      );
    }
  }

  const filteredAttendance = scopedAttendance.filter(a => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      a.employeeName.toLowerCase().includes(q) ||
      a.employeeId.toLowerCase().includes(q) ||
      a.siteName.toLowerCase().includes(q);
    const matchesStatus = selectedStatus === 'All' || a.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // SITE-BASED MONTHLY DATASET
  let monthlyDataset = AUGUST_2026_ATTENDANCE_DATA;

  if (role === 'EMPLOYEE') {
    monthlyDataset = AUGUST_2026_ATTENDANCE_DATA.filter(
      item => item.empId === currentUser?.employeeId || item.name.toLowerCase().includes((currentUser?.name || '').toLowerCase())
    );
    if (monthlyDataset.length === 0) {
      monthlyDataset = [AUGUST_2026_ATTENDANCE_DATA[0]];
    }
  } else if (selectedSiteId !== 'all') {
    monthlyDataset = AUGUST_2026_ATTENDANCE_DATA.filter(item => item.siteId === selectedSiteId);
  }

  // If filtered by person in dropdown
  if (selectedMonthlyPerson !== 'All') {
    monthlyDataset = monthlyDataset.filter(item => item.name === selectedMonthlyPerson || item.empId === selectedMonthlyPerson);
  }

  // Calculate Daily Totals for the Active Site Dataset
  const totals = calculateDailyTotals(monthlyDataset);

  // Selected Person's individual Monthly Attendance
  const activePersonData = AUGUST_2026_ATTENDANCE_DATA.find(
    item => item.empId === selectedEmpId || item.name.toLowerCase() === currentEmp?.name.toLowerCase()
  ) || AUGUST_2026_ATTENDANCE_DATA[0];

  // Active Person's individual site object
  const personSiteObj = sites.find(s => s.id === activePersonData.siteId) || matchingSite;

  // Active Site Details
  const activeSiteObj = sites.find(s => s.id === selectedSiteId);

  // Handle Punch Actions
  const handlePunchIn = () => {
    markAttendance(selectedEmpId, 'Present', 0, currentSiteGeotag);
  };

  const handlePunchOutAction = () => {
    punchOut(selectedEmpId);
  };

  const handleMarkLate = () => {
    markAttendance(selectedEmpId, 'Late', 0, currentSiteGeotag);
  };

  const handleMarkAbsent = () => {
    markAttendance(selectedEmpId, 'Absent', 0, currentSiteGeotag);
  };

  const handleMarkHalfDay = () => {
    markAttendance(selectedEmpId, 'Half Day', 0, currentSiteGeotag);
  };

  // Open Geotag Editor (SUPER ADMIN ONLY)
  const handleOpenGeotagModal = (siteId?: string) => {
    if (!isSuperAdmin) {
      showToast('Geotag editing is restricted to Super Admin only.', 'error');
      return;
    }
    const sId = siteId || (selectedSiteId !== 'all' ? selectedSiteId : (matchingSite?.id || sites[0]?.id));
    setTargetSiteId(sId);
    const targetSite = sites.find(s => s.id === sId) || sites[0];
    if (targetSite?.geotag) {
      setGeotagForm(targetSite.geotag);
    } else {
      setGeotagForm({
        latitude: 17.4435,
        longitude: 78.3772,
        radiusMeters: 250,
        formattedCoordinates: `17.4435° N, 78.3772° E (${targetSite.name})`,
        address: targetSite.location
      });
    }
    setGeotagModalOpen(true);
  };

  // Save Geotag
  const handleSaveGeotag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    updateSiteGeotag(targetSiteId, geotagForm);
    setGeotagModalOpen(false);
  };

  // Detect GPS live from browser (Super Admin only)
  const handleDetectGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(4));
          const lng = parseFloat(position.coords.longitude.toFixed(4));
          const targetSite = sites.find(s => s.id === targetSiteId) || sites[0];
          const formatted = `${lat}° N, ${lng}° E (${targetSite.name})`;
          setGeotagForm({
            ...geotagForm,
            latitude: lat,
            longitude: lng,
            formattedCoordinates: formatted
          });
          showToast(`Live GPS detected: ${lat}, ${lng}`, 'success');
        },
        () => {
          showToast('GPS access denied. Using standard site coordinates.', 'warning');
        }
      );
    } else {
      showToast('Geolocation is not supported by your browser.', 'error');
    }
  };

  // Save Manual Record
  const handleSaveManualRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(e => e.id === manualForm.employeeId);
    addManualAttendanceRecord({
      employeeId: manualForm.employeeId,
      employeeName: emp?.name || 'Staff',
      designation: emp?.designation || 'Associate',
      siteName: manualForm.location || emp?.siteUnit || 'Microsoft India Campus',
      date: manualForm.date,
      checkIn: manualForm.checkIn,
      checkOut: manualForm.checkOut,
      status: manualForm.status,
      overtimeHours: manualForm.overtimeHours,
      location: manualForm.location,
      geotagSnapshot: currentSiteGeotag
    });
    setManualRecordModalOpen(false);
  };

  // Export Monthly Matrix Table to Excel
  const handleExportMonthlyMatrix = () => {
    const siteTitle = activeSiteObj ? activeSiteObj.name : 'All_Sites';
    const exportRows = monthlyDataset.map((row, idx) => {
      const obj: any = {
        'S.NO': idx + 1,
        'NAME': row.name,
        'EMP ID': row.empId,
        'SITE': row.siteUnit,
        'DESIGNATION': row.designation
      };
      for (let i = 0; i < 31; i++) {
        obj[`${i + 1}`] = row.days[i] || '';
      }
      obj['TOTAL DAYS'] = row.totalDays;
      obj['TOTAL PRESENT'] = row.totalPresent;
      obj['TOTAL LEAVES'] = row.totalLeaves;
      obj['HOLIDAYS'] = row.holidays;
      obj['HALFDAY'] = row.halfDay;
      obj['WEEKLY OFF'] = row.weeklyOff;
      obj['ABSENT'] = row.absent;
      obj['ATTENDANCE %'] = `${row.percentage}%`;
      return obj;
    });

    // Add Total Per Day row
    const summaryRow: any = {
      'S.NO': '',
      'NAME': 'TOTAL PER DAY',
      'EMP ID': '',
      'SITE': '',
      'DESIGNATION': ''
    };
    totals.dailyCounts.forEach(d => {
      summaryRow[`${d.day}`] = d.present;
    });
    summaryRow['TOTAL DAYS'] = totals.grandTotalDays;
    summaryRow['TOTAL PRESENT'] = totals.grandTotalPresent;
    summaryRow['TOTAL LEAVES'] = totals.grandTotalLeaves;
    summaryRow['HOLIDAYS'] = totals.grandTotalHolidays;
    summaryRow['HALFDAY'] = totals.grandTotalHalfDay;
    summaryRow['WEEKLY OFF'] = totals.grandTotalWeeklyOff;
    summaryRow['ABSENT'] = totals.grandTotalAbsent;
    summaryRow['ATTENDANCE %'] = `${totals.avgPercentage}%`;

    exportRows.push(summaryRow);

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${siteTitle.slice(0, 25)} August 2026`);
    XLSX.writeFile(wb, `VPHS_${siteTitle.replace(/\s+/g, '_')}_August_2026_Attendance.xlsx`);
    showToast(`Exported ${siteTitle} attendance matrix to Excel!`, 'success');
  };

  // Helper for rendering Day Cell Badge
  const renderDayBadge = (code: string) => {
    const c = (code || '').toUpperCase().trim();
    if (c === 'P') {
      return (
        <span className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold flex items-center justify-center text-[10px] mx-auto">
          P
        </span>
      );
    }
    if (c === 'W/O') {
      return (
        <span className="w-7 h-6 rounded bg-slate-800 text-slate-400 border border-slate-700/80 font-bold flex items-center justify-center text-[9px] mx-auto">
          W/O
        </span>
      );
    }
    if (c === 'A') {
      return (
        <span className="w-6 h-6 rounded bg-rose-500/25 text-rose-300 border border-rose-500/50 font-black flex items-center justify-center text-[10px] mx-auto animate-pulse">
          A
        </span>
      );
    }
    if (c === 'L') {
      return (
        <span className="w-6 h-6 rounded bg-amber-500/25 text-amber-300 border border-amber-500/50 font-bold flex items-center justify-center text-[10px] mx-auto">
          L
        </span>
      );
    }
    if (c === 'HD') {
      return (
        <span className="w-6 h-6 rounded bg-orange-500/25 text-orange-300 border border-orange-500/50 font-bold flex items-center justify-center text-[9px] mx-auto">
          HD
        </span>
      );
    }
    if (c === 'H') {
      return (
        <span className="w-6 h-6 rounded bg-purple-500/25 text-purple-300 border border-purple-500/50 font-bold flex items-center justify-center text-[10px] mx-auto">
          H
        </span>
      );
    }
    return <span className="text-slate-600 text-[10px]">-</span>;
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. TOP HEADER & VIEW CONTROLS */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-2">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-6 h-6 text-amber-500" />
              <h1 className="text-2xl font-black text-white tracking-tight">
                Live Attendance & Shift Rosters
              </h1>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Geotag Active</span>
            </span>
          </div>

          {/* Super Admin Geotag Configuration Button (HIDDEN FOR REGULAR EMPLOYEES) */}
          {isSuperAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenGeotagModal()}
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Change Geotag (Super Admin)</span>
              </button>
            </div>
          )}

          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Automated punch logs with 15-minute grace period enforcement, individual site representations, and person-based attendance metrics.
          </p>
        </div>

        {/* Top Right Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          {/* View Switcher: Monthly Matrix | Daily Roster | Person View */}
          <div className="flex items-center p-1 rounded-xl bg-[#0b1329] border border-[#1f2f58] shadow-inner">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'monthly'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Matrix
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'daily'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Daily Roster
            </button>
            <button
              onClick={() => setViewMode('person')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'person'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Person View
            </button>
          </div>

          {/* Export & Manual Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMonthlyMatrix}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] text-xs font-semibold flex items-center gap-1.5 shadow transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Excel</span>
            </button>

            {isSuperAdmin && (
              <button
                onClick={() => setManualRecordModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 shadow transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>+ Manual Record</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. PROMINENT SITE SELECTOR (WITH PERSON-BASED AUTO-SELECTION) */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-[#1f2f58]/80">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Select Operational Client Site
              </h3>
              <p className="text-xs text-slate-400">
                Active Site: <strong className="text-amber-400">{activeSiteObj ? activeSiteObj.name : 'All 6 Enterprise Campuses'}</strong>
              </p>
            </div>
          </div>

          {/* Select Operational Client Site based on Person */}
          <div className="flex items-center gap-2.5 w-full md:w-auto bg-[#070e1e] p-2 rounded-2xl border border-[#1f2f58]">
            <label className="text-xs font-bold text-amber-400 whitespace-nowrap flex items-center gap-1.5 pl-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Site based on Person:</span>
            </label>
            <select
              value={selectedEmpId}
              onChange={(e) => {
                const empId = e.target.value;
                setSelectedEmpId(empId);
                const targetEmp = employees.find(p => p.id === empId);
                const targetMonthly = AUGUST_2026_ATTENDANCE_DATA.find(p => p.empId === empId);
                if (targetMonthly?.siteId) {
                  setSelectedSiteId(targetMonthly.siteId);
                  setSelectedMonthlyPerson(targetMonthly.name);
                  showToast(`Selected site "${targetMonthly.siteUnit}" based on ${targetMonthly.name}`, 'info');
                } else if (targetEmp?.siteUnit) {
                  const matchSite = sites.find(s => s.name.toLowerCase().includes(targetEmp.siteUnit.toLowerCase()) || targetEmp.siteUnit.toLowerCase().includes(s.name.toLowerCase()));
                  if (matchSite) {
                    setSelectedSiteId(matchSite.id);
                  }
                }
              }}
              className="bg-[#0b1329] border border-amber-500/40 text-xs font-bold text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 max-w-[280px] cursor-pointer"
            >
              {AUGUST_2026_ATTENDANCE_DATA.map((p, idx) => (
                <option key={p.empId || idx} value={p.empId}>
                  {idx + 1}. {p.name} → {p.siteUnit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Horizontal Site Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {/* All Sites Combined */}
          <button
            onClick={() => {
              setSelectedSiteId('all');
              setSelectedMonthlyPerson('All');
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border shadow-sm ${
              selectedSiteId === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border-[#1f2f58] hover:border-slate-500'
            }`}
          >
            <span>🏢 All Enterprise Sites (Combined)</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
              selectedSiteId === 'all' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
            }`}>
              32 Staff
            </span>
          </button>

          {/* Individual Site Pills */}
          {sites.map((site) => {
            const count = AUGUST_2026_ATTENDANCE_DATA.filter(p => p.siteId === site.id).length;
            const isSelected = selectedSiteId === site.id;
            return (
              <button
                key={site.id}
                onClick={() => {
                  setSelectedSiteId(site.id);
                  setSelectedMonthlyPerson('All');
                  // update console selected employee to someone at this site
                  const firstEmpAtSite = AUGUST_2026_ATTENDANCE_DATA.find(p => p.siteId === site.id);
                  if (firstEmpAtSite) {
                    setSelectedEmpId(firstEmpAtSite.empId);
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25'
                    : 'bg-slate-900 text-slate-300 border-[#1f2f58] hover:border-slate-500'
                }`}
              >
                <span>{site.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count} Staff
                </span>
              </button>
            );
          })}
        </div>

        {/* Site Spotlight Card (When an individual site is active) */}
        {activeSiteObj && (
          <div className="pt-3 border-t border-[#1f2f58]/80 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs bg-[#070e1e] p-3.5 rounded-2xl border border-[#1f2f58]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Client Organization</span>
              <p className="font-bold text-white truncate">{activeSiteObj.clientName}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span className="truncate">{activeSiteObj.location}, {activeSiteObj.city}</span>
              </p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Site Facility Manager</span>
              <p className="font-bold text-white">{activeSiteObj.managerName}</p>
              <p className="text-[11px] text-slate-400 font-mono">{activeSiteObj.contactPhone}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">GPS Geofence Perimeter</span>
              <p className="font-mono text-emerald-400 font-bold truncate">
                {activeSiteObj.geotag?.formattedCoordinates || '17.4435° N, 78.3772° E'}
              </p>
              <p className="text-[10px] text-slate-500">Radius: {activeSiteObj.geotag?.radiusMeters || 150} meters</p>
            </div>

            <div className="space-y-0.5 md:text-right">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">August Attendance SLA</span>
              <p className="text-lg font-black text-amber-400 font-mono">{totals.avgPercentage}%</p>
              <p className="text-[10px] text-emerald-400">● {totals.grandTotalPresent} Total Man-Days</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. REAL-TIME WORKFORCE PUNCH CONSOLE (NO EDIT OPTION FOR EMPLOYEES) */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Console Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1f2f58]/70">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                REAL-TIME WORKFORCE PUNCH CONSOLE
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Live biometric & geotag verification • Shift starts 09:00 AM • Grace period valid until 09:15 AM
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Live Clock */}
            <div className="px-3.5 py-1.5 rounded-full bg-slate-950 border border-[#1f2f58] text-xs font-mono font-bold text-amber-400 flex items-center gap-2 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{currentTime || '09:00:00 am IST'}</span>
            </div>

            {/* Geotag Coordinates Badge (EDIT OPTION REMOVED FOR EMPLOYEES) */}
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-md font-medium" title={currentSiteGeotag}>
                {currentSiteGeotag}
              </span>
              {/* Only Super Admin sees the Edit trigger */}
              {isSuperAdmin && (
                <button
                  onClick={() => handleOpenGeotagModal(matchingSite?.id)}
                  className="text-[11px] font-bold text-amber-400 hover:underline ml-1 font-sans cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Employee Selector & Punch Buttons Row */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>Active Employee Record & Assigned Site:</span>
            </label>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
              {/* Dropdown with Employee ID, Name, Designation, and Individual Site */}
              <div className="w-full lg:w-[420px] flex-shrink-0">
                <select
                  value={selectedEmpId}
                  disabled={role === 'EMPLOYEE'}
                  onChange={(e) => {
                    setSelectedEmpId(e.target.value);
                    const match = AUGUST_2026_ATTENDANCE_DATA.find(p => p.empId === e.target.value);
                    if (match) {
                      setSelectedMonthlyPerson(match.name);
                    }
                  }}
                  className="w-full bg-[#070e1e] border-2 border-[#1f2f58] hover:border-amber-500 focus:border-amber-500 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-inner focus:outline-none transition-all cursor-pointer truncate disabled:opacity-85 disabled:cursor-not-allowed"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id} className="bg-[#070e1e] text-white py-1">
                      {emp.id} - {emp.name} ({emp.designation}) • {emp.siteUnit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Punch Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                {/* 1. Punch In (Present) */}
                <button
                  onClick={handlePunchIn}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Punch In (Present)</span>
                </button>

                {/* 2. Punch Out */}
                <button
                  onClick={handlePunchOutAction}
                  className="px-5 py-3 rounded-2xl bg-[#070e1e] hover:bg-slate-900 text-slate-100 border-2 border-[#1f2f58] hover:border-amber-400 font-extrabold text-xs tracking-wide shadow-lg flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <LogOut className="w-4 h-4 text-amber-400" />
                  <span>Punch Out</span>
                </button>

                {/* 3. Mark Late */}
                <button
                  onClick={handleMarkLate}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Mark Late</span>
                </button>

                {/* 4. Absent (Admins only) */}
                {isSuperAdmin && (
                  <button
                    onClick={handleMarkAbsent}
                    className="px-4 py-3 rounded-2xl bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all hover:scale-105 active:scale-95"
                  >
                    Absent
                  </button>
                )}

                {/* 5. Half Day (Admins only) */}
                {isSuperAdmin && (
                  <button
                    onClick={handleMarkHalfDay}
                    className="px-4 py-3 rounded-2xl bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all hover:scale-105 active:scale-95"
                  >
                    Half Day
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Individual Site and Today's Status Information */}
            <div className="flex flex-wrap items-center justify-between text-xs pt-2 px-1 text-slate-400 border-t border-[#1f2f58]/50 mt-2">
              <div className="flex items-center gap-2">
                <span>Assigned Individual Site:</span>
                <strong className="text-amber-400 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentEmp?.siteUnit || 'Microsoft India Campus'}</span>
                </strong>
              </div>
              <div className="flex items-center gap-2">
                <span>Today's Real-Time Status:</span>
                <strong className={`font-extrabold uppercase tracking-wide ${todayStatusColor}`}>
                  {todayStatusText}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INDIVIDUAL SITE MONTHLY MATRIX (AUGUST 2026) */}
      {viewMode === 'monthly' && (
        <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-2xl space-y-5 overflow-hidden">
          {/* Matrix Top Controls & Person Filter */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1f2f58]">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  {activeSiteObj ? `${activeSiteObj.name.toUpperCase()} – AUGUST 2026 ROSTER` : 'ALL OPERATIONAL SITES – AUGUST 2026 MASTER ROSTER'}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Showing {monthlyDataset.length} deployed personnel records for {activeSiteObj ? activeSiteObj.name : 'all campuses'}.
              </p>
            </div>

            {/* Person Filter Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 font-medium">Filter by Person:</label>
                <select
                  value={selectedMonthlyPerson}
                  onChange={(e) => {
                    setSelectedMonthlyPerson(e.target.value);
                    if (e.target.value !== 'All') {
                      const target = AUGUST_2026_ATTENDANCE_DATA.find(p => p.name === e.target.value);
                      if (target?.empId) setSelectedEmpId(target.empId);
                    }
                  }}
                  className="bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 max-w-[220px]"
                >
                  <option value="All">All {monthlyDataset.length} Personnel</option>
                  {monthlyDataset.map((p, idx) => (
                    <option key={p.empId || idx} value={p.name}>
                      {idx + 1}. {p.name} ({p.siteUnit})
                    </option>
                  ))}
                </select>
              </div>

              {selectedMonthlyPerson !== 'All' && (
                <button
                  onClick={() => setSelectedMonthlyPerson('All')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 text-xs font-bold"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Color Legend Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs bg-[#070e1e] p-3 rounded-2xl border border-[#1f2f58]">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Legend:</span>
            <span className="flex items-center gap-1.5"><span className="w-5 h-4 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold flex items-center justify-center">P</span> Present</span>
            <span className="flex items-center gap-1.5"><span className="w-7 h-4 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold flex items-center justify-center">W/O</span> Weekly Off</span>
            <span className="flex items-center gap-1.5"><span className="w-5 h-4 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold flex items-center justify-center">A</span> Absent</span>
            <span className="flex items-center gap-1.5"><span className="w-5 h-4 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center justify-center">L</span> Leave</span>
            <span className="flex items-center gap-1.5"><span className="w-6 h-4 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40 text-[9px] font-bold flex items-center justify-center">HD</span> Half Day</span>
          </div>

          {/* Master 31-Day Attendance Table for the Active Site */}
          <div className="overflow-x-auto rounded-2xl border border-[#1f2f58] shadow-inner">
            <table className="w-full text-center text-xs text-slate-300 min-w-[1200px]">
              <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] border-b-2 border-[#1f2f58]">
                <tr>
                  <th className="px-2 py-3 text-center sticky left-0 bg-[#070e1e] z-10 w-12 border-r border-[#1f2f58]">S.NO</th>
                  <th className="px-3 py-3 text-left sticky left-12 bg-[#070e1e] z-10 min-w-[220px] border-r border-[#1f2f58]">NAME & SITE</th>
                  {Array.from({ length: 31 }, (_, i) => (
                    <th key={i} className="px-1 py-2.5 font-mono text-[10px] border-r border-[#1f2f58]/50 w-7">
                      {i + 1}
                    </th>
                  ))}
                  <th className="px-2 py-2.5 font-mono bg-slate-900/80 border-r border-[#1f2f58]">TOTAL DAYS</th>
                  <th className="px-2 py-2.5 font-mono bg-emerald-950/40 text-emerald-300 border-r border-[#1f2f58]">TOTAL PRESENT</th>
                  <th className="px-2 py-2.5 font-mono bg-amber-950/40 text-amber-300 border-r border-[#1f2f58]">TOTAL LEAVES</th>
                  <th className="px-2 py-2.5 font-mono bg-purple-950/40 text-purple-300 border-r border-[#1f2f58]">HOLIDAYS</th>
                  <th className="px-2 py-2.5 font-mono bg-orange-950/40 text-orange-300 border-r border-[#1f2f58]">HALFDAY</th>
                  <th className="px-2 py-2.5 font-mono bg-slate-900 border-r border-[#1f2f58]">WEEKLY OFF</th>
                  <th className="px-2 py-2.5 font-mono bg-rose-950/40 text-rose-300 border-r border-[#1f2f58]">ABSENT</th>
                  <th className="px-3 py-2.5 font-mono bg-amber-500/20 text-amber-300 font-extrabold">ATTENDANCE %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2f58]/60 text-[11px]">
                {monthlyDataset.map((row, idx) => (
                  <tr
                    key={row.empId || idx}
                    onClick={() => {
                      setSelectedEmpId(row.empId);
                      setSelectedMonthlyPerson(row.name);
                    }}
                    className="hover:bg-slate-900/80 transition-colors cursor-pointer group"
                  >
                    {/* S.No */}
                    <td className="px-2 py-2 text-center font-mono text-slate-400 sticky left-0 bg-[#0b1329] group-hover:bg-slate-900 z-10 border-r border-[#1f2f58]">
                      {idx + 1}
                    </td>

                    {/* Employee Name & Assigned Individual Site */}
                    <td className="px-3 py-2 text-left font-bold text-white whitespace-nowrap sticky left-12 bg-[#0b1329] group-hover:bg-slate-900 z-10 border-r border-[#1f2f58]">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <span>{row.name}</span>
                          <span className="font-mono text-[9px] text-amber-400 bg-slate-950 px-1 py-0.5 rounded ml-2">
                            {row.empId}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal truncate mt-0.5">
                          📍 {row.siteUnit}
                        </span>
                      </div>
                    </td>

                    {/* Days 1 to 31 */}
                    {row.days.map((dayCode, dayIdx) => (
                      <td key={dayIdx} className="px-0.5 py-1.5 border-r border-[#1f2f58]/40">
                        {renderDayBadge(dayCode)}
                      </td>
                    ))}

                    {/* Summary Columns */}
                    <td className="px-2 py-2 font-mono font-bold bg-slate-900/50 border-r border-[#1f2f58]">{row.totalDays}</td>
                    <td className="px-2 py-2 font-mono font-bold text-emerald-400 bg-emerald-950/20 border-r border-[#1f2f58]">{row.totalPresent}</td>
                    <td className="px-2 py-2 font-mono font-bold text-amber-300 bg-amber-950/20 border-r border-[#1f2f58]">{row.totalLeaves}</td>
                    <td className="px-2 py-2 font-mono text-slate-400 bg-purple-950/20 border-r border-[#1f2f58]">{row.holidays}</td>
                    <td className="px-2 py-2 font-mono font-bold text-orange-300 bg-orange-950/20 border-r border-[#1f2f58]">{row.halfDay}</td>
                    <td className="px-2 py-2 font-mono text-slate-300 bg-slate-900/50 border-r border-[#1f2f58]">{row.weeklyOff}</td>
                    <td className="px-2 py-2 font-mono font-bold text-rose-400 bg-rose-950/20 border-r border-[#1f2f58]">{row.absent}</td>
                    <td className="px-3 py-2 font-mono font-extrabold text-amber-400 bg-amber-500/10">
                      {row.percentage}%
                    </td>
                  </tr>
                ))}

                {/* TOTAL PER DAY ROW */}
                <tr className="bg-[#070e1e] font-bold text-white border-t-2 border-amber-500/50">
                  <td className="px-2 py-3 text-center sticky left-0 bg-[#070e1e] z-10 border-r border-[#1f2f58] text-amber-400">
                    ★
                  </td>
                  <td className="px-3 py-3 text-left uppercase tracking-wider sticky left-12 bg-[#070e1e] z-10 border-r border-[#1f2f58] text-amber-400 font-extrabold">
                    TOTAL PER DAY
                  </td>

                  {/* Daily Sums 1 to 31 */}
                  {totals.dailyCounts.map((dc, i) => (
                    <td key={i} className="px-1 py-2 font-mono text-[11px] text-emerald-400 border-r border-[#1f2f58]/60 bg-emerald-950/20">
                      {dc.present}
                    </td>
                  ))}

                  {/* Grand Totals */}
                  <td className="px-2 py-3 font-mono text-slate-200 border-r border-[#1f2f58] bg-slate-900">{totals.grandTotalDays}</td>
                  <td className="px-2 py-3 font-mono text-emerald-400 border-r border-[#1f2f58] bg-emerald-950/40">{totals.grandTotalPresent}</td>
                  <td className="px-2 py-3 font-mono text-amber-300 border-r border-[#1f2f58] bg-amber-950/40">{totals.grandTotalLeaves}</td>
                  <td className="px-2 py-3 font-mono text-slate-400 border-r border-[#1f2f58] bg-purple-950/40">{totals.grandTotalHolidays}</td>
                  <td className="px-2 py-3 font-mono text-orange-300 border-r border-[#1f2f58] bg-orange-950/40">{totals.grandTotalHalfDay}</td>
                  <td className="px-2 py-3 font-mono text-slate-300 border-r border-[#1f2f58] bg-slate-900">{totals.grandTotalWeeklyOff}</td>
                  <td className="px-2 py-3 font-mono text-rose-400 border-r border-[#1f2f58] bg-rose-950/40">{totals.grandTotalAbsent}</td>
                  <td className="px-3 py-3 font-mono text-amber-400 bg-amber-500/20 font-black">
                    {totals.avgPercentage}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. PERSON VIEW (INDIVIDUAL SITE REPRESENTATION BASED ON PERSON) */}
      {viewMode === 'person' && (
        <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1f2f58]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg">
                {activePersonData.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{activePersonData.name}</h3>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                    {activePersonData.empId || 'VPHS-EMP'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {activePersonData.designation || 'Staff Associate'} • Assigned Site: <strong className="text-amber-400">{activePersonData.siteUnit}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-medium">Select Person:</label>
              <select
                value={activePersonData.name}
                onChange={(e) => {
                  const target = AUGUST_2026_ATTENDANCE_DATA.find(p => p.name === e.target.value);
                  if (target?.empId) setSelectedEmpId(target.empId);
                  setSelectedMonthlyPerson(e.target.value);
                }}
                className="bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {AUGUST_2026_ATTENDANCE_DATA.map((p, idx) => (
                  <option key={p.empId || idx} value={p.name}>
                    {idx + 1}. {p.name} ({p.siteUnit} - {p.percentage}%)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Individual Person's Assigned Site Spotlight Banner */}
          {personSiteObj && (
            <div className="p-4 rounded-2xl bg-[#070e1e] border border-[#1f2f58] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Operational Site</span>
                <p className="font-bold text-white text-sm">{personSiteObj.name}</p>
                <p className="text-slate-400 text-[11px]">{personSiteObj.location}, {personSiteObj.city}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Site Facility Lead</span>
                <p className="font-semibold text-slate-200">{personSiteObj.managerName}</p>
                <p className="font-mono text-slate-400 text-[11px]">{personSiteObj.contactPhone}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Geotag Boundary</span>
                <p className="font-mono text-emerald-400 text-[11px] font-bold truncate">
                  {personSiteObj.geotag?.formattedCoordinates || '17.4435° N, 78.3772° E'}
                </p>
                <p className="text-slate-500 text-[10px]">Perimeter: {personSiteObj.geotag?.radiusMeters || 150}m</p>
              </div>
            </div>
          )}

          {/* Statistical Cards for the Person */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-[#070e1e] border border-[#1f2f58] text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Days</span>
              <div className="text-2xl font-black text-white font-mono">{activePersonData.totalDays}</div>
              <span className="text-[10px] text-slate-500">August 2026</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Present</span>
              <div className="text-2xl font-black text-emerald-300 font-mono">{activePersonData.totalPresent}</div>
              <span className="text-[10px] text-emerald-500">On Duty Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Weekly Off</span>
              <div className="text-2xl font-black text-slate-200 font-mono">{activePersonData.weeklyOff}</div>
              <span className="text-[10px] text-slate-400">Rest Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Leaves</span>
              <div className="text-2xl font-black text-amber-300 font-mono">{activePersonData.totalLeaves}</div>
              <span className="text-[10px] text-amber-500">Approved Leaves</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-1">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Absent</span>
              <div className="text-2xl font-black text-rose-300 font-mono">{activePersonData.absent}</div>
              <span className="text-[10px] text-rose-500">Unexcused</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-center space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Attendance %</span>
              <div className="text-2xl font-black text-amber-300 font-mono">{activePersonData.percentage}%</div>
              <span className="text-[10px] text-amber-500">Overall Score</span>
            </div>
          </div>

          {/* 31-Day Calendar Grid */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Day-by-Day Shift Record for {activePersonData.name} ({activePersonData.siteUnit})
            </h4>

            <div className="grid grid-cols-7 sm:grid-cols-11 md:grid-cols-16 lg:grid-cols-31 gap-1.5 p-4 rounded-2xl bg-[#070e1e] border border-[#1f2f58]">
              {activePersonData.days.map((code, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/60 border border-[#1f2f58]/50 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500">{idx + 1}</span>
                  <div>{renderDayBadge(code)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. DAILY ROSTER VIEW */}
      {viewMode === 'daily' && (
        <div className="space-y-4">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Employee, ID, or Site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Punch Statuses</option>
                <option value="Present">Present Only</option>
                <option value="Late">Late Only</option>
                <option value="Absent">Absent Only</option>
                <option value="Half Day">Half Day Only</option>
              </select>

              <span className="text-xs text-slate-400 whitespace-nowrap">
                Showing <strong>{filteredAttendance.length}</strong> logs
              </span>
            </div>
          </div>

          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
                  <tr>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Emp ID & Name</th>
                    <th className="px-4 py-3.5">Assigned Individual Site</th>
                    <th className="px-4 py-3.5">Punch In</th>
                    <th className="px-4 py-3.5">Punch Out</th>
                    <th className="px-4 py-3.5">Geotag Snapshot</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Verified By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2f58]/60">
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-slate-500 font-medium">
                        No attendance punch logs found for this site filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{att.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-amber-500/30">
                              {att.employeeId}
                            </span>
                            <div>
                              <p className="font-bold text-white">{att.employeeName}</p>
                              <span className="text-[10px] text-slate-500">{att.designation || 'Staff'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-300 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                            <span className="truncate max-w-[160px]" title={att.siteName}>{att.siteName}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-emerald-400">{att.checkIn}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-sky-400">
                          {att.checkOut || <span className="text-slate-600">--:--</span>}
                        </td>
                        <td className="px-4 py-3 font-mono text-[10px] text-slate-400 truncate max-w-[200px]" title={att.geotagSnapshot || att.location}>
                          {att.geotagSnapshot || att.location || '17.4435° N, 78.3772° E'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            att.status === 'Present'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : att.status === 'Late'
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                              : att.status === 'Half Day'
                              ? 'bg-amber-950/80 text-amber-200 border border-amber-400/30'
                              : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                          }`}>
                            ● {att.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-400">{att.verifiedBy || 'Supervisor'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. GEOTAG CONFIGURATION MODAL (SUPER ADMIN ONLY) */}
      {isSuperAdmin && geotagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Configure Site GPS Geotag (Super Admin)</h3>
              </div>
              <button
                onClick={() => setGeotagModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGeotag} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Client Site</label>
                <select
                  value={targetSiteId}
                  onChange={(e) => {
                    setTargetSiteId(e.target.value);
                    const s = sites.find(item => item.id === e.target.value);
                    if (s?.geotag) {
                      setGeotagForm(s.geotag);
                    }
                  }}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-white font-semibold"
                >
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.location})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Latitude (° N)</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={geotagForm.latitude}
                    onChange={(e) => setGeotagForm({ ...geotagForm, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Longitude (° E)</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={geotagForm.longitude}
                    onChange={(e) => setGeotagForm({ ...geotagForm, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Geofence Radius (Meters)</label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={geotagForm.radiusMeters}
                  onChange={(e) => setGeotagForm({ ...geotagForm, radiusMeters: parseInt(e.target.value) || 100 })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Formatted Display Coordinates</label>
                <input
                  type="text"
                  required
                  value={geotagForm.formattedCoordinates}
                  onChange={(e) => setGeotagForm({ ...geotagForm, formattedCoordinates: e.target.value })}
                  placeholder="e.g. 17.4435° N, 78.3772° E (Microsoft India Campus)"
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-white font-mono"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleDetectGPS}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>Use Device Current GPS Position</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#1f2f58] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGeotagModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                >
                  Save Geotag Config
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MANUAL ATTENDANCE OVERRIDE MODAL (SUPER ADMIN ONLY) */}
      {isSuperAdmin && manualRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Add Manual Attendance Record</h3>
              </div>
              <button
                onClick={() => setManualRecordModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveManualRecord} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Employee</label>
                <select
                  value={manualForm.employeeId}
                  onChange={(e) => setManualForm({ ...manualForm, employeeId: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>{emp.id} - {emp.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Attendance Date</label>
                <input
                  type="date"
                  required
                  value={manualForm.date}
                  onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Check In Time</label>
                  <input
                    type="text"
                    required
                    value={manualForm.checkIn}
                    onChange={(e) => setManualForm({ ...manualForm, checkIn: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Check Out Time</label>
                  <input
                    type="text"
                    value={manualForm.checkOut}
                    onChange={(e) => setManualForm({ ...manualForm, checkOut: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={manualForm.status}
                    onChange={(e) => setManualForm({ ...manualForm, status: e.target.value as any })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Half Day">Half Day</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Overtime (Hours)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={manualForm.overtimeHours}
                    onChange={(e) => setManualForm({ ...manualForm, overtimeHours: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Location / Site Unit</label>
                <input
                  type="text"
                  value={manualForm.location}
                  onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 border-t border-[#1f2f58] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setManualRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Save Manual Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
