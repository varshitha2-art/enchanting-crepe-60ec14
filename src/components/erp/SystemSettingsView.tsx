import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building,
  Clock,
  Coins,
  Bell,
  Save,
  Shield,
  Phone,
  Mail,
  Palette,
  CheckCircle2,
  Lock,
  Sparkles,
  Sliders,
  Send,
  Compass,
  FileSpreadsheet
} from 'lucide-react';
import { CompanySettings } from '../../types';

export const SystemSettingsView: React.FC = () => {
  const { companySettings, updateCompanySettings, showToast } = useApp();

  // Active Tab Switcher
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'payroll' | 'integrations'>('payroll');

  // Form State
  const [form, setForm] = useState<CompanySettings>({
    ...companySettings,
    payrollSlabs: companySettings.payrollSlabs || {
      basicSalaryPct: 50,
      daPct: 10,
      hraPct: 40,
      pfDeductionPct: 12,
      esiPct: 0.75,
      ptMonthly: 200,
      statutoryBonusPct: 8.33,
      telanganaLwfEmployer: 5,
      telanganaLwfEmployee: 2,
      uniformWashingAllowance: 1000,
      leaveWagesMonthly: 500
    },
    attendanceRules: companySettings.attendanceRules || {
      shiftStartTime: '09:00 AM',
      shiftEndTime: '06:00 PM',
      gracePeriodMins: 15,
      halfDayMinHours: 4.5,
      fullDayMinHours: 8.5,
      defaultGeofenceRadius: 150
    },
    integrations: companySettings.integrations || {
      smtpHost: 'smtp.vphs.in',
      smtpPort: 587,
      smsGatewayKey: 'SMS_VPHS_PROD_84920',
      whatsappWebhook: 'https://api.whatsapp.com/vphs-dispatch',
      epfoSyncEnabled: true,
      esicSyncEnabled: true
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(form);
    showToast('System settings & statutory formulas saved successfully!', 'success');
  };

  const updatePayrollField = (field: string, val: number) => {
    setForm(prev => ({
      ...prev,
      payrollSlabs: {
        ...(prev.payrollSlabs as any),
        [field]: val
      }
    }));
  };

  const updateAttendanceRuleField = (field: string, val: any) => {
    setForm(prev => ({
      ...prev,
      attendanceRules: {
        ...(prev.attendanceRules as any),
        [field]: val
      }
    }));
  };

  const updateIntegrationField = (field: string, val: any) => {
    setForm(prev => ({
      ...prev,
      integrations: {
        ...(prev.integrations as any),
        [field]: val
      }
    }));
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* 1. TOP HEADER (MATCHING SCREENSHOT) */}
      <div className="space-y-1.5 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Settings className="w-5 h-5 text-amber-500" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            System Settings & Calculation Engine
          </h1>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl">
          Configure enterprise company identity, statutory percentages, grace periods & notification channels.
        </p>
      </div>

      {/* 2. TAB NAVIGATION BAR (MATCHING SCREENSHOT) */}
      <div className="flex items-center gap-2 sm:gap-6 border-b border-[#1f2f58] overflow-x-auto pb-1">
        {/* Tab 1: Company Profile & Branding */}
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 py-3 px-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'profile'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Company Profile & Branding</span>
        </button>

        {/* Tab 2: Attendance Rules & Grace */}
        <button
          type="button"
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 py-3 px-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'attendance'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Attendance Rules & Grace</span>
        </button>

        {/* Tab 3: Payroll & Statutory Slabs */}
        <button
          type="button"
          onClick={() => setActiveTab('payroll')}
          className={`flex items-center gap-2 py-3 px-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'payroll'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Coins className="w-4 h-4 text-amber-400" />
          <span>Payroll & Statutory Slabs</span>
        </button>

        {/* Tab 4: Channels & Integrations */}
        <button
          type="button"
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 py-3 px-2 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'integrations'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Channels & Integrations</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 3: PAYROLL & STATUTORY SLABS (MATCHING USER SCREENSHOT PIXEL-PERFECT) */}
        {activeTab === 'payroll' && (
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Row 1: Basic, DA, HRA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Basic Salary (% of CTC)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.payrollSlabs?.basicSalaryPct || 50}
                  onChange={(e) => updatePayrollField('basicSalaryPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Dearness Allowance (% of Basic)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.payrollSlabs?.daPct || 10}
                  onChange={(e) => updatePayrollField('daPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  HRA (% of Basic)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.payrollSlabs?.hraPct || 40}
                  onChange={(e) => updatePayrollField('hraPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Row 2: PF, ESI, Professional Tax */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  PF Deduction (% on Basic)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.payrollSlabs?.pfDeductionPct || 12}
                  onChange={(e) => updatePayrollField('pfDeductionPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  ESI (% on Gross)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.payrollSlabs?.esiPct || 0.75}
                  onChange={(e) => updatePayrollField('esiPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Professional Tax (₹ / Month)
                </label>
                <input
                  type="number"
                  required
                  value={form.payrollSlabs?.ptMonthly || 200}
                  onChange={(e) => updatePayrollField('ptMonthly', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* SECTION HEADING: TELANGANA & STATUTORY FACILITY SLABS */}
            <div className="pt-3 pb-1 border-t border-[#1f2f58]/80">
              <h3 className="text-xs font-black text-amber-500 uppercase tracking-wider">
                TELANGANA & STATUTORY FACILITY SLABS
              </h3>
            </div>

            {/* Row 3: Statutory Bonus, Telangana LWF Employer, Telangana LWF Employee */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Statutory Bonus (% of Basic+DA)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.payrollSlabs?.statutoryBonusPct || 8.33}
                  onChange={(e) => updatePayrollField('statutoryBonusPct', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">Payment of Bonus Act (8.33%)</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Telangana LWF - Employer (₹ / mo)
                </label>
                <input
                  type="number"
                  required
                  value={form.payrollSlabs?.telanganaLwfEmployer || 5}
                  onChange={(e) => updatePayrollField('telanganaLwfEmployer', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">Telangana Labour Welfare Fund</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Telangana LWF - Employee (₹ / mo)
                </label>
                <input
                  type="number"
                  required
                  value={form.payrollSlabs?.telanganaLwfEmployee || 2}
                  onChange={(e) => updatePayrollField('telanganaLwfEmployee', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">Employee Monthly LWF</p>
              </div>
            </div>

            {/* Row 4: Uniform Allowance, Leave Wages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Uniform, Shoes & Washing Allowance (₹ / mo)
                </label>
                <input
                  type="number"
                  required
                  value={form.payrollSlabs?.uniformWashingAllowance || 1000}
                  onChange={(e) => updatePayrollField('uniformWashingAllowance', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">Facility Staff Uniform & Maintenance</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Leave Wages - CL, PL, SL (₹ / mo)
                </label>
                <input
                  type="number"
                  required
                  value={form.payrollSlabs?.leaveWagesMonthly || 500}
                  onChange={(e) => updatePayrollField('leaveWagesMonthly', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none transition-all font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">Statutory Paid Leave Encashment / Wages</p>
              </div>
            </div>

            {/* Bottom Save Action Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Statutory Slabs & Formulas</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 1: COMPANY PROFILE & BRANDING */}
        {activeTab === 'profile' && (
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1f2f58]">
                <Building className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Corporate Identity & Branding
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Company Display Name</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Legal Registered Entity Name</label>
                  <input
                    type="text"
                    value={form.legalName}
                    onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Upload Corporate Logo & Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-[#070e1e] border border-[#1f2f58]">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Upload Corporate Logo</label>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] overflow-hidden flex items-center justify-center">
                      <img src={form.logo} alt="Logo" className="w-full h-full object-cover" onError={(e) => (e.target as any).style.display = 'none'} />
                    </div>
                    <label className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow">
                      <Palette className="w-3.5 h-3.5" />
                      <span>Upload New Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              setForm({ ...form, logo: evt.target?.result as string });
                              showToast('Corporate logo uploaded!', 'success');
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Corporate Tagline</label>
                  <input
                    type="text"
                    value={form.tagline}
                    onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Hotline Phone</label>
                  <input
                    type="text"
                    value={form.primaryPhone}
                    onChange={(e) => setForm({ ...form, primaryPhone: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Inquiry / Contact Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Registered Headquarters Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Statutory Registrations */}
            <div className="space-y-4 pt-3 border-t border-[#1f2f58]">
              <div className="flex items-center gap-2 pb-1">
                <Shield className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Statutory & Tax Registrations
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <label className="block font-sans font-bold text-slate-300 mb-1">CIN Number</label>
                  <input
                    type="text"
                    value={form.cin}
                    onChange={(e) => setForm({ ...form, cin: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-slate-300 mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={form.gstin}
                    onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-slate-300 mb-1">EPFO Code</label>
                  <input
                    type="text"
                    value={form.epfoCode}
                    onChange={(e) => setForm({ ...form, epfoCode: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-sans font-bold text-slate-300 mb-1">ESIC Code</label>
                  <input
                    type="text"
                    value={form.esicCode}
                    onChange={(e) => setForm({ ...form, esicCode: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save Company Profile</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE RULES & GRACE */}
        {activeTab === 'attendance' && (
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1f2f58]">
              <Clock className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Shift Schedule & Grace Period Enforcement
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Shift Start Time</label>
                <input
                  type="text"
                  value={form.attendanceRules?.shiftStartTime || '09:00 AM'}
                  onChange={(e) => updateAttendanceRuleField('shiftStartTime', e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Standard shift beginning time</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Shift End Time</label>
                <input
                  type="text"
                  value={form.attendanceRules?.shiftEndTime || '06:00 PM'}
                  onChange={(e) => updateAttendanceRuleField('shiftEndTime', e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Standard shift conclusion time</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Grace Period (Minutes)</label>
                <input
                  type="number"
                  min={0}
                  max={60}
                  value={form.attendanceRules?.gracePeriodMins || 15}
                  onChange={(e) => updateAttendanceRuleField('gracePeriodMins', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-emerald-400 mt-1">Grace period valid until 09:15 AM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-[#1f2f58]">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Minimum Hours for Half Day</label>
                <input
                  type="number"
                  step="0.5"
                  value={form.attendanceRules?.halfDayMinHours || 4.5}
                  onChange={(e) => updateAttendanceRuleField('halfDayMinHours', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Below this marks unexcused absent</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Minimum Hours for Full Day</label>
                <input
                  type="number"
                  step="0.5"
                  value={form.attendanceRules?.fullDayMinHours || 8.5}
                  onChange={(e) => updateAttendanceRuleField('fullDayMinHours', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Full 1.0 day attendance credit</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Default Geofence Radius (Meters)</label>
                <input
                  type="number"
                  min={20}
                  max={2000}
                  value={form.attendanceRules?.defaultGeofenceRadius || 150}
                  onChange={(e) => updateAttendanceRuleField('defaultGeofenceRadius', parseInt(e.target.value) || 0)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">GPS perimeter allowed for check-in</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save Attendance Rules</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CHANNELS & INTEGRATIONS */}
        {activeTab === 'integrations' && (
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1f2f58]">
              <Bell className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Automated Notification & API Bridges
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Corporate SMTP Host</label>
                <input
                  type="text"
                  value={form.integrations?.smtpHost || 'smtp.vphs.in'}
                  onChange={(e) => updateIntegrationField('smtpHost', e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">Email delivery for automated payslips</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">SMS Gateway Dispatch Key</label>
                <input
                  type="password"
                  value={form.integrations?.smsGatewayKey || 'SMS_VPHS_PROD_84920'}
                  onChange={(e) => updateIntegrationField('smsGatewayKey', e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">DLT verified template notifications</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Webhook Dispatch Endpoint</label>
              <input
                type="text"
                value={form.integrations?.whatsappWebhook || 'https://api.whatsapp.com/vphs-dispatch'}
                onChange={(e) => updateIntegrationField('whatsappWebhook', e.target.value)}
                className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Instant shift roster & wage notifications to employee mobile</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Save className="w-4 h-4" />
                <span>Save Integrations & Channels</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
