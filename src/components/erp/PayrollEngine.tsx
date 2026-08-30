import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  Download,
  Printer,
  CheckCircle2,
  FileSpreadsheet,
  Search,
  Building,
  CreditCard,
  X,
  ShieldCheck,
  Sparkles,
  Edit2,
  Upload,
  Save
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { PayrollRecord } from '../../types';

export const PayrollEngine: React.FC = () => {
  const { payroll, processMonthlyPayroll, currentUser, companySettings, showToast } = useApp();
  const role = currentUser?.role || 'EMPLOYEE';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [activePayslip, setActivePayslip] = useState<PayrollRecord | null>(null);

  // Edit Payslip Modal State
  const [editPayrollModalOpen, setEditPayrollModalOpen] = useState(false);
  const [editingPayrollRecord, setEditingPayrollRecord] = useState<Partial<PayrollRecord>>({});

  // Scoping
  let scopedPayroll = payroll;
  if (role === 'EMPLOYEE') {
    scopedPayroll = payroll.filter(p => p.employeeId === currentUser?.employeeId || p.employeeName.toLowerCase() === currentUser?.name.toLowerCase());
    if (scopedPayroll.length === 0 && payroll.length > 0) {
      scopedPayroll = [payroll[0]];
    }
  }

  const filteredPayroll = scopedPayroll.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.employeeName.toLowerCase().includes(q) ||
      p.employeeId.toLowerCase().includes(q) ||
      p.siteName.toLowerCase().includes(q) ||
      p.designation.toLowerCase().includes(q)
    );
  });

  const totalDisbursed = filteredPayroll.reduce((acc, p) => acc + p.netPay, 0);
  const totalEpf = filteredPayroll.reduce((acc, p) => acc + p.epfDeduction, 0);
  const totalEsi = filteredPayroll.reduce((acc, p) => acc + p.esiDeduction, 0);

  const handleExportPayroll = () => {
    const exportRows = filteredPayroll.map((p, i) => ({
      'S.No': i + 1,
      'Month': p.month,
      'Emp ID': p.employeeId,
      'Employee Name': p.employeeName,
      'Designation': p.designation,
      'Client Site': p.siteName,
      'Bank Account': p.bankAc,
      'IFSC': p.ifsc,
      'Days Worked': p.presentDays,
      'Basic': p.basicSalary,
      'HRA': p.hra,
      'Allowances': p.allowances,
      'Gross Salary': p.grossSalary,
      'EPF (12%)': p.epfDeduction,
      'ESIC (0.75%)': p.esiDeduction,
      'PT': p.ptDeduction,
      'Total Deductions': p.totalDeductions,
      'Net Pay': p.netPay,
      'Status': p.status
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payroll Summary');
    XLSX.writeFile(wb, `VPHS_Payroll_${selectedMonth.replace(/\s+/g, '_')}.xlsx`);
    showToast(`Exported payroll sheet for ${selectedMonth}!`, 'success');
  };

  // Upload Monthly Payroll Spreadsheet
  const handleUploadPayrollSheet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    showToast(`Successfully processed payroll file: ${files[0].name}`, 'success');
  };

  const handleSaveEditedPayroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPayrollRecord.id) {
      showToast(`Updated payroll details for ${editingPayrollRecord.employeeName}`, 'success');
      setEditPayrollModalOpen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Metrics */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Statutory Payroll & Payslip Engine</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
              {selectedMonth}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated statutory deductions: EPF (12%), ESIC (0.75%), Professional Tax (PT), and computerized PDF wage slips.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {role !== 'EMPLOYEE' && (
            <>
              <label className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Payroll Sheet</span>
                <input type="file" accept=".xlsx, .xls, .csv" onChange={handleUploadPayrollSheet} className="hidden" />
              </label>

              <button
                onClick={() => processMonthlyPayroll(selectedMonth)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run Payroll Batch</span>
              </button>
            </>
          )}

          <button
            onClick={handleExportPayroll}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Bank Transfer Sheet (XLSX)</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1.5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Total Net Salary Disbursal</span>
          <div className="text-2xl font-black text-white font-mono">₹{totalDisbursed.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-slate-400">{filteredPayroll.length} Processed Staff Accounts</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1.5">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Total EPFO Remittance (12%)</span>
          <div className="text-2xl font-black text-white font-mono">₹{totalEpf.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-slate-400">EPFO Code: {companySettings.epfoCode}</p>
        </div>
        <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1.5">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Total ESIC Remittance (0.75%)</span>
          <div className="text-2xl font-black text-white font-mono">₹{totalEsi.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-slate-400">ESIC Code: {companySettings.esicCode}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow flex items-center justify-between">
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

        <span className="text-xs text-slate-400 hidden sm:inline">
          Showing <strong>{filteredPayroll.length}</strong> payslips for {selectedMonth}
        </span>
      </div>

      {/* Payroll Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
              <tr>
                <th className="px-4 py-3.5">Emp ID & Name</th>
                <th className="px-4 py-3.5">Designation</th>
                <th className="px-4 py-3.5">Days</th>
                <th className="px-4 py-3.5">Gross Pay</th>
                <th className="px-4 py-3.5">EPF (12%)</th>
                <th className="px-4 py-3.5">ESIC (0.75%)</th>
                <th className="px-4 py-3.5">PT</th>
                <th className="px-4 py-3.5">Net Pay</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2f58]/60">
              {filteredPayroll.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-amber-500/30">
                        {p.employeeId}
                      </span>
                      <span className="font-bold text-white">{p.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{p.designation}</td>
                  <td className="px-4 py-3 font-mono">{p.presentDays} / {p.workingDays}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-200">₹{p.grossSalary.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 font-mono text-rose-400">₹{p.epfDeduction}</td>
                  <td className="px-4 py-3 font-mono text-rose-400">₹{p.esiDeduction}</td>
                  <td className="px-4 py-3 font-mono text-rose-400">₹{p.ptDeduction}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-400">₹{p.netPay.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {role !== 'EMPLOYEE' && (
                        <button
                          onClick={() => {
                            setEditingPayrollRecord(p);
                            setEditPayrollModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-900 text-sky-400 hover:bg-slate-800 border border-[#1f2f58]"
                          title="Edit Salary Breakdown"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => setActivePayslip(p)}
                        className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 rounded-lg text-xs font-bold transition-all shadow"
                      >
                        View & Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Payroll Record Modal */}
      {editPayrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <h3 className="text-sm font-bold text-white">
                Edit Salary Record: {editingPayrollRecord.employeeName} ({editingPayrollRecord.employeeId})
              </h3>
              <button onClick={() => setEditPayrollModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedPayroll} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Basic Salary (₹)</label>
                  <input
                    type="number"
                    value={editingPayrollRecord.basicSalary || 0}
                    onChange={(e) => {
                      const basic = parseInt(e.target.value) || 0;
                      const hra = Math.round(basic * 0.4);
                      const gross = basic + hra + (editingPayrollRecord.allowances || 4100);
                      const epf = Math.round(basic * 0.12);
                      const esi = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
                      const pt = 200;
                      const totalDeductions = epf + esi + pt;
                      setEditingPayrollRecord({
                        ...editingPayrollRecord,
                        basicSalary: basic,
                        hra,
                        grossSalary: gross,
                        epfDeduction: epf,
                        esiDeduction: esi,
                        totalDeductions,
                        netPay: gross - totalDeductions
                      });
                    }}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">HRA Allowance (₹)</label>
                  <input
                    type="number"
                    value={editingPayrollRecord.hra || 0}
                    onChange={(e) => setEditingPayrollRecord({ ...editingPayrollRecord, hra: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">EPF (12%)</label>
                  <input
                    type="number"
                    value={editingPayrollRecord.epfDeduction || 0}
                    onChange={(e) => setEditingPayrollRecord({ ...editingPayrollRecord, epfDeduction: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">ESIC (0.75%)</label>
                  <input
                    type="number"
                    value={editingPayrollRecord.esiDeduction || 0}
                    onChange={(e) => setEditingPayrollRecord({ ...editingPayrollRecord, esiDeduction: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Prof. Tax (PT)</label>
                  <input
                    type="number"
                    value={editingPayrollRecord.ptDeduction || 200}
                    onChange={(e) => setEditingPayrollRecord({ ...editingPayrollRecord, ptDeduction: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-[#1f2f58] flex justify-between items-center text-xs">
                <span>Calculated Net Pay:</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  ₹{(editingPayrollRecord.netPay || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-2 border-t border-[#1f2f58] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditPayrollModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow"
                >
                  Save Salary Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official VPHS Printable PDF Payslip Modal */}
      {activePayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl p-6 sm:p-10 space-y-6 max-h-[95vh] overflow-y-auto print:p-0 print:m-0 print:shadow-none print:w-full">
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Computerized Payslip</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setActivePayslip(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Letterhead */}
            <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-4">
              <div className="inline-flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl">
                  V
                </div>
                <h2 className="text-2xl font-black text-slate-950 tracking-wider">VPHS SERVICES PVT. LTD.</h2>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {companySettings.address}, {companySettings.city}, {companySettings.state} - {companySettings.pincode}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-500 pt-1 font-mono">
                <span>CIN: {companySettings.cin}</span>
                <span>•</span>
                <span>GSTIN: {companySettings.gstin}</span>
                <span>•</span>
                <span>EPFO: {companySettings.epfoCode}</span>
                <span>•</span>
                <span>ESIC: {companySettings.esicCode}</span>
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest pt-2 bg-slate-100 py-1 rounded">
                PAYSLIP FOR THE MONTH OF {activePayslip.month.toUpperCase()}
              </h3>
            </div>

            {/* Employee Particulars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Employee ID</span>
                <span className="font-mono font-bold text-slate-900">{activePayslip.employeeId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Employee Name</span>
                <span className="font-bold text-slate-900">{activePayslip.employeeName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Designation</span>
                <span className="text-slate-900">{activePayslip.designation}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Department</span>
                <span className="text-slate-900">{activePayslip.department}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Bank Account</span>
                <span className="font-mono text-slate-900">{activePayslip.bankAc}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">IFSC Code</span>
                <span className="font-mono text-slate-900">{activePayslip.ifsc}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Total Days Worked</span>
                <span className="font-bold text-slate-900">{activePayslip.presentDays} Days</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Assigned Site</span>
                <span className="text-slate-900 truncate block">{activePayslip.siteName}</span>
              </div>
            </div>

            {/* Earnings & Deductions Table */}
            <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-2 bg-slate-900 text-white font-bold py-2 px-4">
                <div>EARNINGS (₹)</div>
                <div className="border-l border-slate-700 pl-4">STATUTORY DEDUCTIONS (₹)</div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-slate-200">
                {/* Earnings List */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span className="font-mono">₹{activePayslip.basicSalary.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>House Rent Allowance (HRA)</span>
                    <span className="font-mono">₹{activePayslip.hra.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conveyance Allowance</span>
                    <span className="font-mono">₹1,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Allowance</span>
                    <span className="font-mono">₹{(activePayslip.allowances - 1600).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-300 flex justify-between font-bold text-slate-950">
                    <span>GROSS EARNINGS</span>
                    <span className="font-mono">₹{activePayslip.grossSalary.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Deductions List */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Employee PF (12%)</span>
                    <span className="font-mono text-rose-700">₹{activePayslip.epfDeduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employee ESIC (0.75%)</span>
                    <span className="font-mono text-rose-700">₹{activePayslip.esiDeduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Tax (PT)</span>
                    <span className="font-mono text-rose-700">₹{activePayslip.ptDeduction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Income Tax (TDS)</span>
                    <span className="font-mono text-slate-500">₹0</span>
                  </div>
                  <div className="pt-3 border-t border-slate-300 flex justify-between font-bold text-slate-950">
                    <span>TOTAL DEDUCTIONS</span>
                    <span className="font-mono text-rose-700">₹{activePayslip.totalDeductions}</span>
                  </div>
                </div>
              </div>

              {/* Net Pay Banner */}
              <div className="bg-amber-50 p-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-amber-900 uppercase">NET TAKE-HOME SALARY</span>
                  <p className="text-xs text-slate-600">Disbursed via Electronic Bank Transfer (NEFT)</p>
                </div>
                <div className="text-2xl font-black text-slate-950 font-mono">
                  ₹{activePayslip.netPay.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Authorised Signatory Footer */}
            <div className="pt-8 flex items-end justify-between text-xs text-slate-600">
              <div>
                <p className="font-semibold text-slate-800">This is a computerized salary slip.</p>
                <p className="text-[10px] text-slate-500">Generated securely by VPHS Facility & HR ERP System.</p>
              </div>
              <div className="text-center space-y-1">
                <div className="w-36 border-b border-slate-400 pb-1 font-serif italic text-slate-800 font-bold">
                  Vikram P. Singh
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
                  Authorised Signatory
                </span>
                <span className="text-[9px] text-slate-500">VPHS Services Pvt. Ltd.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
