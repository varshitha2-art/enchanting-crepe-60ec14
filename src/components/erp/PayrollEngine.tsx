import React, { useState, useRef } from 'react';
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
  Save,
  Trash2,
  FileText,
  Image as ImageIcon,
  Eye,
  RefreshCw,
  Filter,
  Plus,
  Calendar,
  AlertCircle,
  Check,
  Building2,
  User,
  Paperclip,
  ExternalLink,
  Sliders,
  Zap,
  CheckCheck,
  ArrowUpDown,
  MapPin,
  Users
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { PayslipRecord, Role } from '../../types';
import { calculateSalarySummary } from '../../data/initialPayslips';
import { AUGUST_2026_ATTENDANCE_DATA } from '../../data/monthlyAttendanceData';

export const PayrollEngine: React.FC = () => {
  const {
    payslips,
    uploadPayslip,
    updatePayslip,
    deletePayslip,
    replacePayslipFile,
    employees,
    currentUser,
    companySettings,
    showToast,
    processMonthlyPayroll
  } = useApp();

  const role: Role = currentUser?.role || 'EMPLOYEE';
  const isSuperAdmin = role === 'SUPER_ADMIN' || role === 'HR_ADMIN';

  // Client Sites List
  const CLIENT_SITES = [
    'Microsoft India (R & D) Pvt. Ltd',
    'Amazon Development Centre',
    'Third Wave Coffee Roasters',
    'DivyaSree NSL Orion SEZ',
    'Google Signature Tower',
    'L&T Infotech Park'
  ];

  // Active Site Tab ('all' or specific site name)
  const [activeSiteTab, setActiveSiteTab] = useState<string>('all');

  // Filters
  const [selectedEmpFilter, setSelectedEmpFilter] = useState<string>('all');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('2026');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [activePayslip, setActivePayslip] = useState<PayslipRecord | null>(null);
  const [viewerTab, setViewerTab] = useState<'letterhead' | 'file'>('letterhead');

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);
  const [targetReplaceRecord, setTargetReplaceRecord] = useState<PayslipRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Batch Site Attendance Generator Modal State
  const [batchSiteModalOpen, setBatchSiteModalOpen] = useState(false);
  const [batchSiteName, setBatchSiteName] = useState<string>('Microsoft India (R & D) Pvt. Ltd');
  const [batchMonth, setBatchMonth] = useState<string>('August');
  const [batchYear, setBatchYear] = useState<number>(2026);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);

  // Person-Specific Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PayslipRecord | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  // Upload Form State
  const [uploadSite, setUploadSite] = useState<string>('Microsoft India (R & D) Pvt. Ltd');
  const [uploadEmpId, setUploadEmpId] = useState<string>('VPHS0040');
  const [uploadMonth, setUploadMonth] = useState<string>('August');
  const [uploadYear, setUploadYear] = useState<number>(2026);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper: Attendance Lookup for a Person
  const getAttendanceMetricsForEmp = (empId: string, month: string = 'August') => {
    const cleanId = (empId || '').toUpperCase().trim();
    const match = AUGUST_2026_ATTENDANCE_DATA.find(
      a => a.empId.toUpperCase() === cleanId || a.name.toLowerCase().includes(cleanId.toLowerCase())
    );
    if (match) {
      return {
        totalDays: match.totalDays || 31,
        totalPresent: match.totalPresent || 20,
        weeklyOff: match.weeklyOff || 10,
        totalLeaves: match.totalLeaves || 0,
        absent: match.absent || 1,
        paidDays: (match.totalPresent || 20) + (match.weeklyOff || 10) + (match.totalLeaves || 0),
        percentage: match.percentage || 96.8,
        siteUnit: match.siteUnit || 'Microsoft India (R & D) Pvt. Ltd'
      };
    }
    return {
      totalDays: 31,
      totalPresent: 21,
      weeklyOff: 10,
      totalLeaves: 0,
      absent: 0,
      paidDays: 31,
      percentage: 100,
      siteUnit: 'Microsoft India (R & D) Pvt. Ltd'
    };
  };

  // Helper: Calculate Salary Pro-Rated As Per Attendance
  const calculateAttendanceSalary = (empId: string, month: string = 'August') => {
    const att = getAttendanceMetricsForEmp(empId, month);
    const ratio = Math.min(Math.max(att.paidDays / att.totalDays, 0.5), 1.0);

    const baseBasic = 6000;
    const baseVda = 10000;
    const baseHra = 6783;
    const baseWashing = 200;
    const baseOther = 650;

    const proBasic = Math.round(baseBasic * ratio);
    const proVda = Math.round(baseVda * ratio);
    const proHra = Math.round(baseHra * ratio);
    const proWashing = Math.round(baseWashing * ratio);
    const proOther = Math.round(baseOther * ratio);

    const proEmpPf = Math.min(Math.round((proBasic + proVda) * 0.12), 1800);
    const grossEst = proBasic + proVda + proHra + proWashing + proOther;
    const proEmpEsi = grossEst <= 21000 ? Math.round(grossEst * 0.0075) : 120;
    const proEmplrPf = Math.min(Math.round((proBasic + proVda) * 0.12), 1800);
    const proEmplrEsi = grossEst <= 21000 ? Math.round(grossEst * 0.0325) : 520;

    return {
      basicSalary: proBasic,
      vda: proVda,
      hra: proHra,
      washingAllowance: proWashing,
      otherAllowances: proOther,
      employerPf: proEmplrPf,
      employerEsi: proEmplrEsi,
      epfDeduction: proEmpPf,
      esiDeduction: proEmpEsi,
      ptDeduction: 200,
      otherDeductions: 0,
      workingDays: att.totalDays,
      presentDays: att.paidDays,
      lopDays: att.absent,
      remarks: `Generated as per ${month} Attendance (${att.percentage}% SLA - ${att.paidDays}/${att.totalDays} Paid Days at ${att.siteUnit})`
    };
  };

  // Salary Breakdown Input State
  const [salaryInputs, setSalaryInputs] = useState(() => calculateAttendanceSalary('VPHS0040', 'August'));

  // Calculate live totals for upload form
  const liveTotals = calculateSalarySummary(
    salaryInputs.basicSalary,
    salaryInputs.vda,
    salaryInputs.hra,
    salaryInputs.washingAllowance,
    salaryInputs.otherAllowances,
    salaryInputs.epfDeduction,
    salaryInputs.esiDeduction,
    salaryInputs.ptDeduction,
    salaryInputs.otherDeductions,
    salaryInputs.employerPf,
    salaryInputs.employerEsi
  );

  // Calculate live totals for edit modal
  const editTotals = editingRecord
    ? calculateSalarySummary(
        editingRecord.basicSalary || 0,
        editingRecord.vda || 0,
        editingRecord.hra || 0,
        editingRecord.washingAllowance || 0,
        editingRecord.otherAllowances || 0,
        editingRecord.epfDeduction || 0,
        editingRecord.esiDeduction || 0,
        editingRecord.ptDeduction || 0,
        editingRecord.otherDeductions || 0,
        editingRecord.employerPf || 0,
        editingRecord.employerEsi || 0
      )
    : null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // 1. Strict Scoping:
  // If Employee, ONLY show payslips matching their employeeId / username
  let scopedPayslips = payslips;
  if (!isSuperAdmin) {
    const userEmpId = (currentUser?.employeeId || currentUser?.username || '').toUpperCase().trim();
    scopedPayslips = payslips.filter(p => p.employeeId.toUpperCase() === userEmpId);
  }

  // 2. Filter by Site Tab, Person, Month, Year & Search Query
  const filteredPayslips = scopedPayslips.filter(p => {
    // Separate Site Tab Filter (Super Admin)
    if (isSuperAdmin && activeSiteTab !== 'all') {
      const matchSite = p.siteName.toLowerCase().includes(activeSiteTab.toLowerCase());
      if (!matchSite) return false;
    }
    // Person filter
    if (isSuperAdmin && selectedEmpFilter !== 'all' && p.employeeId.toUpperCase() !== selectedEmpFilter.toUpperCase()) {
      return false;
    }
    // Month filter
    if (selectedMonthFilter !== 'all' && p.month.toLowerCase() !== selectedMonthFilter.toLowerCase()) {
      return false;
    }
    // Year filter
    if (selectedYearFilter !== 'all' && p.year.toString() !== selectedYearFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        p.employeeName.toLowerCase().includes(q) ||
        p.employeeId.toLowerCase().includes(q) ||
        p.designation.toLowerCase().includes(q) ||
        p.siteName.toLowerCase().includes(q) ||
        p.monthYear.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // KPI Metrics
  const totalNetDisbursed = filteredPayslips.reduce((acc, p) => acc + (p.netPay || 0), 0);
  const totalGrossDisbursed = filteredPayslips.reduce((acc, p) => acc + (p.grossSalary || 0), 0);
  const totalEpf = filteredPayslips.reduce((acc, p) => acc + (p.epfDeduction || 0), 0);
  const totalEsi = filteredPayslips.reduce((acc, p) => acc + (p.esiDeduction || 0), 0);

  // Helper: Count staff per site
  const getStaffCountForSite = (siteName: string) => {
    if (siteName === 'all') return employees.length;
    return employees.filter(e => e.siteUnit?.toLowerCase().includes(siteName.toLowerCase())).length;
  };

  // Handle File Selection in Upload Modal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|jpg|jpeg|png)$/i)) {
        showToast('Please upload a valid PDF, JPG, JPEG, or PNG file.', 'error');
        return;
      }
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        setFilePreviewUrl(preview);
      } else {
        setFilePreviewUrl('');
      }
    }
  };

  // Open Upload Modal
  const handleOpenUploadModal = (preselectedSite?: string) => {
    setSelectedFile(null);
    setFilePreviewUrl('');
    const targetSite = preselectedSite && preselectedSite !== 'all' ? preselectedSite : activeSiteTab !== 'all' ? activeSiteTab : CLIENT_SITES[0];
    setUploadSite(targetSite);
    
    // Find first employee for this site
    const siteEmp = employees.find(e => e.siteUnit?.toLowerCase().includes(targetSite.toLowerCase())) || employees[0];
    const firstEmpId = siteEmp?.id || 'VPHS0040';
    setUploadEmpId(firstEmpId);
    setUploadMonth('August');
    setUploadYear(2026);
    setSalaryInputs(calculateAttendanceSalary(firstEmpId, 'August'));
    setUploadModalOpen(true);
  };

  // When Employee Changes in Upload Modal, sync site and auto-calculate as per attendance
  const handleUploadEmpChange = (empId: string) => {
    setUploadEmpId(empId);
    const empObj = employees.find(e => e.id.toUpperCase() === empId.toUpperCase());
    if (empObj?.siteUnit) {
      setUploadSite(empObj.siteUnit);
    }
    setSalaryInputs(calculateAttendanceSalary(empId, uploadMonth));
  };

  // Open Person-Specific Edit Modal
  const handleOpenEditModal = (payslip: PayslipRecord) => {
    setEditingRecord(JSON.parse(JSON.stringify(payslip)));
    setEditFile(null);
    setEditModalOpen(true);
  };

  // Sync Edit Modal Salary With Attendance
  const handleSyncEditWithAttendance = () => {
    if (!editingRecord) return;
    const attSalary = calculateAttendanceSalary(editingRecord.employeeId, editingRecord.month);
    setEditingRecord({
      ...editingRecord,
      ...attSalary
    });
    showToast(`Synced ${editingRecord.employeeName}'s salary with ${editingRecord.month} attendance records!`, 'info');
  };

  // Submit Upload Form
  const handleSubmitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadEmpId) {
      showToast('Please select an employee.', 'error');
      return;
    }

    const emp = employees.find(e => e.id.toUpperCase() === uploadEmpId.toUpperCase());
    const empName = emp?.name || `Employee ${uploadEmpId}`;
    const desig = emp?.designation || 'Valet Operations Associate';
    const dept = emp?.department || 'Facility Management';
    const site = uploadSite || emp?.siteUnit || 'Microsoft India (R & D) Pvt. Ltd';
    const bankAc = emp?.bankAc || '921020048291039';
    const ifsc = emp?.ifsc || 'HDFC0000240';
    const bankName = emp?.bankName || 'HDFC Bank Ltd.';
    const uan = emp?.uan || '101928472910';
    const pfNo = emp?.pfNo || 'TS/HYD/10928/042';
    const esiNo = emp?.esiNo || '52000849201920';
    const pan = emp?.pan || 'ABCDE1234F';
    const aadhar = emp?.aadhar || '4829 1029 4819';

    setIsSubmitting(true);
    try {
      await uploadPayslip({
        employeeId: uploadEmpId,
        employeeName: empName,
        designation: desig,
        department: dept,
        siteName: site,
        month: uploadMonth,
        year: uploadYear,
        monthYear: `${uploadMonth} ${uploadYear}`,
        file: selectedFile || undefined,
        fileType: selectedFile?.name.endsWith('.pdf') ? 'PDF' : selectedFile ? 'PNG' : 'DOCUMENT',
        workingDays: salaryInputs.workingDays,
        presentDays: salaryInputs.presentDays,
        lopDays: salaryInputs.lopDays,
        basicSalary: salaryInputs.basicSalary,
        vda: salaryInputs.vda,
        hra: salaryInputs.hra,
        washingAllowance: salaryInputs.washingAllowance,
        otherAllowances: salaryInputs.otherAllowances,
        grossSalary: liveTotals.grossSalary,
        employerPf: liveTotals.employerPf,
        employerEsi: liveTotals.employerEsi,
        ctc: liveTotals.ctc,
        epfDeduction: liveTotals.epfDeduction,
        esiDeduction: liveTotals.esiDeduction,
        ptDeduction: liveTotals.ptDeduction,
        otherDeductions: salaryInputs.otherDeductions,
        totalDeductions: liveTotals.totalDeductions,
        netPay: liveTotals.netPay,
        bankAc,
        ifsc,
        bankName,
        uan,
        pfNo,
        esiNo,
        pan,
        aadhar,
        status: 'Disbursed',
        disbursedOn: new Date().toISOString().split('T')[0],
        remarks: salaryInputs.remarks
      });

      setUploadModalOpen(false);
    } catch (err) {
      showToast('Failed to upload payslip. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Person-Specific Edit Form
  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;
    setIsSubmitting(true);
    try {
      await updatePayslip(editingRecord.id, editingRecord, editFile || undefined);
      if (activePayslip && activePayslip.id === editingRecord.id) {
        setActivePayslip({ ...activePayslip, ...editingRecord });
      }
      setEditModalOpen(false);
      setEditingRecord(null);
      setEditFile(null);
    } catch (err) {
      showToast('Failed to update payslip.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Batch Site Attendance Payroll Generator
  const handleRunBatchSitePayroll = async () => {
    setIsBatchGenerating(true);
    try {
      const siteEmployees = employees.filter(
        e => batchSiteName === 'all' || batchSiteName === 'All Sites' || e.siteUnit?.toLowerCase().includes(batchSiteName.toLowerCase())
      );

      let processedCount = 0;
      for (const emp of siteEmployees) {
        const attSalary = calculateAttendanceSalary(emp.id, batchMonth);
        const totals = calculateSalarySummary(
          attSalary.basicSalary,
          attSalary.vda,
          attSalary.hra,
          attSalary.washingAllowance,
          attSalary.otherAllowances,
          attSalary.epfDeduction,
          attSalary.esiDeduction,
          attSalary.ptDeduction,
          0,
          attSalary.employerPf,
          attSalary.employerEsi
        );

        const existing = payslips.find(
          p => p.employeeId.toUpperCase() === emp.id.toUpperCase() && p.month === batchMonth && p.year === batchYear
        );

        if (existing) {
          await updatePayslip(existing.id, {
            ...attSalary,
            grossSalary: totals.grossSalary,
            totalDeductions: totals.totalDeductions,
            netPay: totals.netPay,
            ctc: totals.ctc,
            siteName: emp.siteUnit || batchSiteName
          });
        } else {
          await uploadPayslip({
            employeeId: emp.id,
            employeeName: emp.name,
            designation: emp.designation,
            department: emp.department || 'Facility Management',
            siteName: emp.siteUnit || batchSiteName,
            month: batchMonth,
            year: batchYear,
            monthYear: `${batchMonth} ${batchYear}`,
            fileType: 'DOCUMENT',
            fileName: `VPHS_Payslip_${emp.id}_${batchMonth}_${batchYear}.pdf`,
            workingDays: attSalary.workingDays,
            presentDays: attSalary.presentDays,
            lopDays: attSalary.lopDays,
            basicSalary: attSalary.basicSalary,
            vda: attSalary.vda,
            hra: attSalary.hra,
            washingAllowance: attSalary.washingAllowance,
            otherAllowances: attSalary.otherAllowances,
            grossSalary: totals.grossSalary,
            employerPf: totals.employerPf,
            employerEsi: totals.employerEsi,
            ctc: totals.ctc,
            epfDeduction: totals.epfDeduction,
            esiDeduction: totals.esiDeduction,
            ptDeduction: totals.ptDeduction,
            otherDeductions: 0,
            totalDeductions: totals.totalDeductions,
            netPay: totals.netPay,
            bankAc: emp.bankAc,
            ifsc: emp.ifsc,
            bankName: emp.bankName,
            uan: emp.uan,
            pfNo: emp.pfNo,
            esiNo: emp.esiNo,
            pan: emp.pan,
            aadhar: emp.aadhar,
            status: 'Disbursed',
            disbursedOn: new Date().toISOString().split('T')[0],
            remarks: attSalary.remarks
          });
        }
        processedCount++;
      }

      showToast(`Generated & updated ${processedCount} attendance-linked payslips for ${batchSiteName}!`, 'success');
      setBatchSiteModalOpen(false);
    } catch (err) {
      showToast('Batch payroll generation encountered an issue.', 'error');
    } finally {
      setIsBatchGenerating(false);
    }
  };

  // Replace File Handler
  const handleReplaceFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetReplaceRecord) return;
    const file = replaceFileInputRef.current?.files?.[0];
    if (!file) {
      showToast('Please select a replacement file.', 'error');
      return;
    }
    await replacePayslipFile(targetReplaceRecord.id, file);
    setReplaceModalOpen(false);
    setTargetReplaceRecord(null);
  };

  // Download Handler
  const handleDownload = (payslip: PayslipRecord) => {
    if (payslip.fileUrl) {
      const link = document.createElement('a');
      link.href = payslip.fileUrl;
      link.download = payslip.fileName || `VPHS_Payslip_${payslip.employeeId}_${payslip.month}_${payslip.year}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Downloading ${payslip.fileName || 'payslip'}...`, 'info');
    } else {
      setActivePayslip(payslip);
      setViewerTab('letterhead');
      showToast('Computerized payslip loaded. Click "Print / Save as PDF" to download.', 'info');
    }
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Export Bank NEFT XLSX
  const handleExportBankSheet = () => {
    const exportRows = filteredPayslips.map((p, i) => ({
      'S.No': i + 1,
      'Month': p.monthYear,
      'Emp ID': p.employeeId,
      'Employee Name': p.employeeName,
      'Designation': p.designation,
      'Client Site': p.siteName,
      'Bank Account': p.bankAc,
      'IFSC': p.ifsc,
      'Bank Name': p.bankName,
      'UAN': p.uan,
      'Days Worked': p.presentDays,
      'Basic': p.basicSalary,
      'VDA': p.vda,
      'HRA': p.hra,
      'Washing Allowance': p.washingAllowance,
      'Other Allowances': p.otherAllowances,
      'Gross Salary (A)': p.grossSalary,
      'Employer PF': p.employerPf,
      'Employer ESI': p.employerEsi,
      'CTC (B)': p.ctc,
      'Employee PF': p.epfDeduction,
      'Employee ESI': p.esiDeduction,
      'PT': p.ptDeduction,
      'Total Deductions (C)': p.totalDeductions,
      'Net Take-Home Pay (A-C)': p.netPay,
      'Disbursal Status': p.status,
      'Disbursed Date': p.disbursedOn || '2026-08-31',
      'Attached File': p.fileName || 'Computerized Slip'
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    const sheetName = activeSiteTab === 'all' ? 'VPHS All Sites Payroll' : activeSiteTab.slice(0, 30);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `VPHS_Payroll_${activeSiteTab.replace(/\s+/g, '_')}_${selectedYearFilter}.xlsx`);
    showToast('Exported official Bank Transfer Sheet (XLSX)!', 'success');
  };

  // Months List
  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-500/20">
              ₹
            </div>
            <h2 className="text-xl font-black text-white">
              {isSuperAdmin ? 'Site-Wise Attendance Payslip Vault & Person Customization' : 'My Payslips & Compensation Portal'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
              {selectedYearFilter}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            {isSuperAdmin
              ? 'Organized by separate client sites with attendance-linked automatic salary calculations and individual person editable access.'
              : `Official computerized wage slips for ${currentUser?.name || 'Employee'}. View and download your monthly compensation and statutory contribution records.`}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          {isSuperAdmin && (
            <>
              {/* Batch Generate for Active Site */}
              <button
                onClick={() => {
                  setBatchSiteName(activeSiteTab === 'all' ? CLIENT_SITES[0] : activeSiteTab);
                  setBatchSiteModalOpen(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 rounded-xl font-extrabold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-slate-950" />
                <span>
                  {activeSiteTab === 'all' ? '⚡ Generate Site Attendance Payroll' : `⚡ Generate for ${activeSiteTab.split(' ')[0]}`}
                </span>
              </button>

              {/* Upload Person Payslip */}
              <button
                onClick={() => handleOpenUploadModal(activeSiteTab)}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 rounded-xl font-extrabold text-xs shadow-gold-sm transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>+ Upload / Add Person</span>
              </button>

              <button
                onClick={handleExportBankSheet}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Bank Sheet (XLSX)</span>
              </button>
            </>
          )}

          {!isSuperAdmin && filteredPayslips.length > 0 && (
            <button
              onClick={() => handleDownload(filteredPayslips[0])}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download Latest Payslip</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. SEPARATE CLIENT SITE TABS (SUPER ADMIN ONLY) */}
      {isSuperAdmin && (
        <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-2 shadow-lg flex items-center gap-2 overflow-x-auto">
          {/* All Sites Tab */}
          <button
            onClick={() => setActiveSiteTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeSiteTab === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-gold-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>All Client Sites</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
              activeSiteTab === 'all' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
            }`}>
              {employees.length}
            </span>
          </button>

          {/* Individual Site Tabs */}
          {CLIENT_SITES.map(siteName => {
            const count = getStaffCountForSite(siteName);
            const isSelected = activeSiteTab.toLowerCase() === siteName.toLowerCase();
            return (
              <button
                key={siteName}
                onClick={() => setActiveSiteTab(siteName)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-gold-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 opacity-70" />
                <span>{siteName}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-black ${
                  isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Site Metric Cards */}
      {isSuperAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1 shadow">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              {activeSiteTab === 'all' ? 'All Deployed Personnel' : 'Site Deployed Staff'}
            </span>
            <div className="text-2xl font-black text-white font-mono">{filteredPayslips.length} Payslips</div>
            <p className="text-[11px] text-slate-400">
              {activeSiteTab === 'all' ? 'Across all 6 client facilities' : activeSiteTab}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1 shadow">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Site Net Disbursal</span>
            <div className="text-2xl font-black text-emerald-300 font-mono">₹{totalNetDisbursed.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-slate-400">Total Gross: ₹{totalGrossDisbursed.toLocaleString('en-IN')}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1 shadow">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block">EPFO Statutory (12%)</span>
            <div className="text-2xl font-black text-sky-300 font-mono">₹{totalEpf.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-slate-400 font-mono">EPF Code: {companySettings.epfoCode}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-1 shadow">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">ESIC Statutory (0.75%)</span>
            <div className="text-2xl font-black text-purple-300 font-mono">₹{totalEsi.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-slate-400 font-mono">ESIC Code: {companySettings.esicCode}</p>
          </div>
        </div>
      )}

      {/* 4. Employee Self-Service Header Card (When Logged in as Employee) */}
      {!isSuperAdmin && (
        <div className="bg-gradient-to-r from-[#111c38] via-[#152244] to-[#0b1329] border border-[#1f2f58] rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-2xl border border-amber-500/40">
              {currentUser?.name?.charAt(0) || 'E'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                  {currentUser?.employeeId || currentUser?.username}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  ● Active Staff
                </span>
              </div>
              <h3 className="text-xl font-black text-white">{currentUser?.name}</h3>
              <p className="text-xs text-slate-300">
                {currentUser?.designation || 'Valet Operations Associate'} • Site: <strong>{currentUser?.assignedSites?.[0] || 'Microsoft India (R & D) Pvt. Ltd'}</strong>
              </p>
            </div>
          </div>

          <div className="bg-[#070e1e] p-4 rounded-2xl border border-[#1f2f58] text-right space-y-1 min-w-[200px]">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Latest Net Take-Home</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              ₹{(filteredPayslips[0]?.netPay || 21513).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-slate-400">{filteredPayslips[0]?.monthYear || 'August 2026'}</p>
          </div>
        </div>
      )}

      {/* 5. Filters & Search Bar (Person, Month, Year, Search) */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Person Selector (Super Admin Only) */}
          {isSuperAdmin && (
            <div className="flex items-center gap-1.5 bg-[#070e1e] border border-[#1f2f58] rounded-xl px-2.5 py-1.5">
              <User className="w-3.5 h-3.5 text-sky-400" />
              <select
                value={selectedEmpFilter}
                onChange={(e) => setSelectedEmpFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer max-w-[180px]"
              >
                <option value="all" className="bg-slate-900 text-white">All Persons</option>
                {employees
                  .filter(e => activeSiteTab === 'all' || e.siteUnit?.toLowerCase().includes(activeSiteTab.toLowerCase()))
                  .map(emp => (
                    <option key={emp.id} value={emp.id} className="bg-slate-900 text-white">
                      {emp.id} - {emp.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Month Selector */}
          <div className="flex items-center gap-1.5 bg-[#070e1e] border border-[#1f2f58] rounded-xl px-2.5 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedMonthFilter}
              onChange={(e) => setSelectedMonthFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Months</option>
              {MONTH_NAMES.map(m => (
                <option key={m} value={m} className="bg-slate-900 text-white">{m}</option>
              ))}
            </select>
          </div>

          {/* Year Selector */}
          <div className="flex items-center gap-1.5 bg-[#070e1e] border border-[#1f2f58] rounded-xl px-2.5 py-1.5">
            <select
              value={selectedYearFilter}
              onChange={(e) => setSelectedYearFilter(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900 text-white">All Years</option>
              <option value="2026" className="bg-slate-900 text-white">2026</option>
              <option value="2025" className="bg-slate-900 text-white">2025</option>
              <option value="2024" className="bg-slate-900 text-white">2024</option>
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search person, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>
      </div>

      {/* 6. Payslips Table for Selected Site */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
              <tr>
                <th className="px-4 py-3.5">Employee & ID</th>
                <th className="px-4 py-3.5">Assigned Site</th>
                <th className="px-4 py-3.5">Period & Attendance Days</th>
                <th className="px-4 py-3.5">Gross (A)</th>
                <th className="px-4 py-3.5">Deductions (C)</th>
                <th className="px-4 py-3.5">Net Take-Home</th>
                <th className="px-4 py-3.5">Attached Document</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2f58]">
              {filteredPayslips.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-500">
                    <Receipt className="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" />
                    <p className="font-semibold text-slate-400">
                      No payslips found for {activeSiteTab === 'all' ? 'any site' : activeSiteTab}.
                    </p>
                    {isSuperAdmin && (
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <button
                          onClick={() => {
                            setBatchSiteName(activeSiteTab === 'all' ? CLIENT_SITES[0] : activeSiteTab);
                            setBatchSiteModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs shadow inline-flex items-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Generate Attendance Payslips for this Site</span>
                        </button>
                        <button
                          onClick={() => handleOpenUploadModal(activeSiteTab)}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow inline-flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Add Individual Person Slip</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredPayslips.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* Employee Particulars */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                          {payslip.employeeId.slice(-2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-amber-400">{payslip.employeeId}</span>
                            <span className="text-white font-bold">{payslip.employeeName}</span>
                          </div>
                          <p className="text-[10px] text-slate-400">{payslip.designation}</p>
                        </div>
                      </div>
                    </td>

                    {/* Client Site */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 text-slate-200">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="font-medium truncate max-w-[160px]" title={payslip.siteName}>
                          {payslip.siteName}
                        </span>
                      </div>
                    </td>

                    {/* Period & Attendance Days */}
                    <td className="px-4 py-3.5">
                      <div>
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-[#1f2f58] font-bold text-slate-200 text-[11px] inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-sky-400" />
                          {payslip.monthYear}
                        </span>
                        <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                          {payslip.presentDays || 25} Paid / {payslip.workingDays || 31} Days
                          {payslip.lopDays ? <span className="text-rose-400 ml-1">({payslip.lopDays} LOP)</span> : null}
                        </div>
                      </div>
                    </td>

                    {/* Gross */}
                    <td className="px-4 py-3.5 font-mono text-white font-semibold">
                      ₹{payslip.grossSalary.toLocaleString('en-IN')}
                    </td>

                    {/* Deductions */}
                    <td className="px-4 py-3.5 font-mono text-rose-400 font-semibold">
                      -₹{payslip.totalDeductions.toLocaleString('en-IN')}
                    </td>

                    {/* Net Pay */}
                    <td className="px-4 py-3.5">
                      <div className="font-mono font-black text-emerald-400 text-sm">
                        ₹{payslip.netPay.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[9px] text-emerald-500/80 font-bold uppercase tracking-wider">● Disbursed</span>
                    </td>

                    {/* Attached File */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                          payslip.fileType === 'PDF'
                            ? 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                            : 'bg-sky-950/40 text-sky-300 border-sky-500/30'
                        }`}>
                          {payslip.fileType}
                        </span>
                        <span className="text-slate-300 text-[11px] font-mono truncate max-w-[120px]" title={payslip.fileName}>
                          {payslip.fileName || 'Computerized'}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Payslip */}
                        <button
                          onClick={() => {
                            setActivePayslip(payslip);
                            setViewerTab('letterhead');
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] hover:border-amber-500 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                          title="View Official Payslip"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                          <span>View</span>
                        </button>

                        {/* Download Payslip */}
                        <button
                          onClick={() => handleDownload(payslip)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-[#1f2f58] transition-all cursor-pointer"
                          title="Download Payslip (PDF/Image)"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        {/* Super Admin Exclusive Controls */}
                        {isSuperAdmin && (
                          <>
                            {/* Person-Specific Edit Payslip Button (Editable Access) */}
                            <button
                              onClick={() => handleOpenEditModal(payslip)}
                              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
                              title="Edit Person Salary & Particulars (Editable Access)"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Replace File Button */}
                            <button
                              onClick={() => {
                                setTargetReplaceRecord(payslip);
                                setReplaceModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-[#1f2f58] transition-all cursor-pointer"
                              title="Replace / Re-upload File"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Payslip */}
                            <button
                              onClick={() => setDeleteConfirmId(payslip.id)}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-[#1f2f58] transition-all cursor-pointer"
                              title="Delete Payslip"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: BATCH SITE ATTENDANCE PAYSLIP GENERATOR (SUPER ADMIN)             */}
      {/* ========================================================================= */}
      {batchSiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#0b1329] border border-sky-500/40 rounded-3xl w-full max-w-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2f58]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Generate Payslips as per Site Attendance</h3>
                  <p className="text-xs text-slate-400">Select site & month to generate payslips computed from actual attendance</p>
                </div>
              </div>
              <button
                onClick={() => setBatchSiteModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#070e1e] p-4 rounded-2xl border border-[#1f2f58] text-xs">
                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Select Client Site</label>
                  <select
                    value={batchSiteName}
                    onChange={(e) => setBatchSiteName(e.target.value)}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold cursor-pointer"
                  >
                    {CLIENT_SITES.map(s => (
                      <option key={s} value={s} className="bg-slate-900">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Attendance Month</label>
                  <select
                    value={batchMonth}
                    onChange={(e) => setBatchMonth(e.target.value)}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold cursor-pointer"
                  >
                    {MONTH_NAMES.map(m => (
                      <option key={m} value={m} className="bg-slate-900">{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 uppercase font-bold mb-1">Year</label>
                  <select
                    value={batchYear}
                    onChange={(e) => setBatchYear(Number(e.target.value))}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold cursor-pointer"
                  >
                    <option value={2026} className="bg-slate-900">2026</option>
                    <option value={2025} className="bg-slate-900">2025</option>
                  </select>
                </div>
              </div>

              {/* Attendance Preview Table */}
              <div className="bg-[#070e1e] p-4 rounded-2xl border border-[#1f2f58] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <span>Site Attendance Preview</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {employees.filter(e => e.siteUnit?.toLowerCase().includes(batchSiteName.toLowerCase())).length} Deployed Staff
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                  {employees
                    .filter(e => e.siteUnit?.toLowerCase().includes(batchSiteName.toLowerCase()))
                    .map(emp => {
                      const att = getAttendanceMetricsForEmp(emp.id, batchMonth);
                      return (
                        <div key={emp.id} className="p-2.5 rounded-xl bg-[#0b1329] border border-[#1f2f58] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-mono text-amber-400 font-bold">{emp.id}</span> • <span className="font-bold text-white">{emp.name}</span>
                            <div className="text-[10px] text-slate-400">{emp.designation}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-emerald-400 font-bold">{att.paidDays} / {att.totalDays} Days ({att.percentage}%)</span>
                            {att.absent > 0 && <span className="text-[10px] text-rose-400 block font-mono">{att.absent} LOP</span>}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="p-3 bg-sky-950/40 border border-sky-500/30 rounded-2xl text-xs text-sky-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  Every generated payslip is calculated as per actual attendance and can subsequently be customized per person with full editable access.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1f2f58] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBatchSiteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRunBatchSitePayroll}
                disabled={isBatchGenerating}
                className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 rounded-xl font-extrabold text-xs shadow flex items-center gap-2 cursor-pointer"
              >
                {isBatchGenerating ? (
                  <span>Generating Payslips...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-slate-950" />
                    <span>Run Site Attendance Payroll</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UPLOAD & GENERATE PAYSLIP FOR A PERSON                            */}
      {/* ========================================================================= */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2f58]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Generate / Upload Person Payslip</h3>
                  <p className="text-xs text-slate-400">Select person, site, auto-fill from attendance, or attach external file</p>
                </div>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitUpload} className="space-y-5">
              {/* Person & Site Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#070e1e] p-4 rounded-2xl border border-[#1f2f58]">
                {/* Person */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Select Person <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={uploadEmpId}
                    onChange={(e) => handleUploadEmpChange(e.target.value)}
                    required
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold cursor-pointer"
                  >
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id} className="bg-slate-900">
                        {emp.id} - {emp.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Month */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Month <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={uploadMonth}
                    onChange={(e) => {
                      setUploadMonth(e.target.value);
                      setSalaryInputs(calculateAttendanceSalary(uploadEmpId, e.target.value));
                    }}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold cursor-pointer"
                  >
                    {MONTH_NAMES.map(m => (
                      <option key={m} value={m} className="bg-slate-900">{m}</option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Year <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={uploadYear}
                    onChange={(e) => setUploadYear(Number(e.target.value))}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold cursor-pointer"
                  >
                    <option value={2026} className="bg-slate-900">2026</option>
                    <option value={2025} className="bg-slate-900">2025</option>
                  </select>
                </div>

                {/* Site Selection */}
                <div className="sm:col-span-4 space-y-1 pt-1">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Assigned Site / Campus Unit
                  </label>
                  <select
                    value={uploadSite}
                    onChange={(e) => setUploadSite(e.target.value)}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold cursor-pointer"
                  >
                    {CLIENT_SITES.map(s => (
                      <option key={s} value={s} className="bg-slate-900">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Attendance Sync Callout */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <Zap className="w-4 h-4" />
                    <span>Attendance Computed for {uploadEmpId}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    {salaryInputs.presentDays} Paid Days ({salaryInputs.workingDays} Total Days) • {salaryInputs.lopDays} LOP Day
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSalaryInputs(calculateAttendanceSalary(uploadEmpId, uploadMonth));
                    showToast('Re-applied attendance calculation!', 'info');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-amber-400 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-Compute Attendance</span>
                </button>
              </div>

              {/* File Upload Box */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Optional: Attach External PDF / Image Payslip
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#1f2f58] hover:border-amber-500 rounded-2xl p-5 text-center bg-[#070e1e] hover:bg-slate-900/60 transition-all cursor-pointer group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf, .jpg, .jpeg, .png"
                    className="hidden"
                  />
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        {selectedFile.type.includes('pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                      </div>
                      <span className="text-xs font-bold text-white">{selectedFile.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <Upload className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white">Click or drag & drop to attach PDF/JPG/PNG (or leave empty for computerized slip)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Salary Components Breakdown (Full Editable Access) */}
              <div className="space-y-3 bg-[#070e1e] p-5 rounded-2xl border border-[#1f2f58]">
                <div className="flex items-center justify-between pb-2 border-b border-[#1f2f58]">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Editable Salary Breakdown (Customizable per Person)
                  </span>
                  <span className="text-[10px] text-slate-400">All fields editable</span>
                </div>

                {/* Earnings Row */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Basic (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.basicSalary}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, basicSalary: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">VDA (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.vda}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, vda: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">HRA (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.hra}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, hra: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Washing (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.washingAllowance}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, washingAllowance: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Other (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.otherAllowances}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, otherAllowances: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Deductions & Employer Contributions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-[#1f2f58]/50">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Emp. PF (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.epfDeduction}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, epfDeduction: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Emp. ESI (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.esiDeduction}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, esiDeduction: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">PT (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.ptDeduction}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, ptDeduction: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Employer PF (₹)</label>
                    <input
                      type="number"
                      value={salaryInputs.employerPf}
                      onChange={(e) => setSalaryInputs({ ...salaryInputs, employerPf: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-sky-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Computation Banner */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-[#1f2f58] text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Gross Salary (A)</span>
                    <span className="font-mono font-bold text-white text-sm">₹{liveTotals.grossSalary.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-400 block">Total Deductions (C)</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">₹{liveTotals.totalDeductions.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-amber-500/10 rounded-lg p-1 border border-amber-500/30">
                    <span className="text-[10px] font-bold text-amber-400 block">Net Take-Home (A-C)</span>
                    <span className="font-mono font-black text-amber-300 text-sm">₹{liveTotals.netPay.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#1f2f58] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs shadow-gold-sm flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Publishing Payslip...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save & Publish Person Payslip</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PERSON-SPECIFIC EDIT MODAL (WITH ATTENDANCE SYNC & EDIT ACCESS)   */}
      {/* ========================================================================= */}
      {editModalOpen && editingRecord && editTotals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#0b1329] border border-amber-500/40 rounded-3xl w-full max-w-4xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1f2f58]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 font-black text-xl">
                  {editingRecord.employeeName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Edit Payslip for {editingRecord.employeeName}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                      {editingRecord.employeeId}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-xs font-bold border border-slate-700">
                      {editingRecord.monthYear}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Full editable access: modify salary numbers, attendance days, client site, and bank particulars based on this person.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSyncEditWithAttendance}
                  className="px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-slate-950 border border-sky-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Sync with Attendance</span>
                </button>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitEdit} className="space-y-6">
              {/* Section 1: Person Details & Client Site */}
              <div className="space-y-3 bg-[#070e1e] p-5 rounded-2xl border border-[#1f2f58]">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  1. Person Details & Client Site Selection
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Employee Full Name</label>
                    <input
                      type="text"
                      value={editingRecord.employeeName}
                      onChange={(e) => setEditingRecord({ ...editingRecord, employeeName: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-semibold focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Designation</label>
                    <input
                      type="text"
                      value={editingRecord.designation}
                      onChange={(e) => setEditingRecord({ ...editingRecord, designation: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Client Site / Campus</label>
                    <select
                      value={editingRecord.siteName}
                      onChange={(e) => setEditingRecord({ ...editingRecord, siteName: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold cursor-pointer"
                    >
                      {CLIENT_SITES.map(s => (
                        <option key={s} value={s} className="bg-slate-900">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Bank Account No.</label>
                    <input
                      type="text"
                      value={editingRecord.bankAc}
                      onChange={(e) => setEditingRecord({ ...editingRecord, bankAc: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={editingRecord.ifsc}
                      onChange={(e) => setEditingRecord({ ...editingRecord, ifsc: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">EPFO UAN</label>
                    <input
                      type="text"
                      value={editingRecord.uan}
                      onChange={(e) => setEditingRecord({ ...editingRecord, uan: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Attendance Days Particulars */}
              <div className="space-y-3 bg-[#070e1e] p-5 rounded-2xl border border-[#1f2f58]">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  2. Attendance Days (As per {editingRecord.monthYear})
                </h4>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Total Month Days</label>
                    <input
                      type="number"
                      value={editingRecord.workingDays}
                      onChange={(e) => setEditingRecord({ ...editingRecord, workingDays: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono focus:border-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Present / Paid Days</label>
                    <input
                      type="number"
                      value={editingRecord.presentDays}
                      onChange={(e) => setEditingRecord({ ...editingRecord, presentDays: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Loss of Pay (LOP) Days</label>
                    <input
                      type="number"
                      value={editingRecord.lopDays}
                      onChange={(e) => setEditingRecord({ ...editingRecord, lopDays: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-rose-400 font-mono focus:border-rose-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Salary Components & Live Breakdown */}
              <div className="space-y-3 bg-[#070e1e] p-5 rounded-2xl border border-[#1f2f58]">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  3. Earnings, Allowances & Deductions
                </h4>

                {/* Earnings */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Basic (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.basicSalary}
                      onChange={(e) => setEditingRecord({ ...editingRecord, basicSalary: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">VDA (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.vda}
                      onChange={(e) => setEditingRecord({ ...editingRecord, vda: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">HRA (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.hra}
                      onChange={(e) => setEditingRecord({ ...editingRecord, hra: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Washing (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.washingAllowance}
                      onChange={(e) => setEditingRecord({ ...editingRecord, washingAllowance: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Other (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.otherAllowances}
                      onChange={(e) => setEditingRecord({ ...editingRecord, otherAllowances: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Deductions & Employer Contributions */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-2 border-t border-[#1f2f58]/50">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Emp. PF (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.epfDeduction}
                      onChange={(e) => setEditingRecord({ ...editingRecord, epfDeduction: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Emp. ESI (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.esiDeduction}
                      onChange={(e) => setEditingRecord({ ...editingRecord, esiDeduction: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">PT (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.ptDeduction}
                      onChange={(e) => setEditingRecord({ ...editingRecord, ptDeduction: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Other Deduct (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.otherDeductions}
                      onChange={(e) => setEditingRecord({ ...editingRecord, otherDeductions: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-rose-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Employer PF (₹)</label>
                    <input
                      type="number"
                      value={editingRecord.employerPf}
                      onChange={(e) => setEditingRecord({ ...editingRecord, employerPf: Number(e.target.value) || 0 })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-2.5 py-1.5 text-sky-400 font-mono text-xs focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Calculation Summary Highlight */}
                <div className="grid grid-cols-4 gap-2 p-3.5 bg-slate-950 rounded-xl border border-[#1f2f58] text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">Gross Salary (A)</span>
                    <span className="font-mono font-bold text-white text-sm">₹{editTotals.grossSalary.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-sky-400 block">CTC (B)</span>
                    <span className="font-mono font-bold text-sky-300 text-sm">₹{editTotals.ctc.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-rose-400 block">Deductions (C)</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">₹{editTotals.totalDeductions.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="bg-amber-500/10 rounded-lg p-1 border border-amber-500/30">
                    <span className="text-[10px] font-bold text-amber-400 block">Net Take-Home (A-C)</span>
                    <span className="font-mono font-black text-amber-300 text-base">₹{editTotals.netPay.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Section 4: File & Status Particulars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#070e1e] p-4 rounded-2xl border border-[#1f2f58] text-xs">
                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Attached Payslip File</label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-300 truncate">{editingRecord.fileName || 'Computerized'}</span>
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-[#1f2f58] text-[11px] font-bold text-sky-400 hover:text-white cursor-pointer"
                    >
                      {editFile ? 'File Selected' : 'Choose Replacement'}
                    </button>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setEditFile(file);
                      }}
                      accept=".pdf, .jpg, .jpeg, .png"
                      className="hidden"
                    />
                  </div>
                  {editFile && <p className="text-[10px] text-emerald-400 font-mono mt-1">New: {editFile.name}</p>}
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Disbursal Status</label>
                  <select
                    value={editingRecord.status}
                    onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value as any })}
                    className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold cursor-pointer"
                  >
                    <option value="Disbursed">Disbursed (Disbursal Confirmed)</option>
                    <option value="Approved">Approved (Awaiting NEFT Bank Run)</option>
                    <option value="Processed">Processed (Draft Mode)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#1f2f58] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs shadow-gold-sm flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Saving Changes...</span>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save & Update Person Payslip</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SUPER ADMIN REPLACE FILE MODAL                                    */}
      {/* ========================================================================= */}
      {replaceModalOpen && targetReplaceRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2 text-sky-400">
                <RefreshCw className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Replace Payslip File</h3>
              </div>
              <button
                onClick={() => setReplaceModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReplaceFileSubmit} className="space-y-4 text-xs">
              <p className="text-slate-300">
                Select a new PDF, JPG, or PNG file to replace the existing payslip for{' '}
                <strong className="text-white">{targetReplaceRecord.employeeName}</strong> ({targetReplaceRecord.monthYear}).
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-[#1f2f58] space-y-1 font-mono text-[11px]">
                <div className="text-slate-400">Current File: <span className="text-amber-400">{targetReplaceRecord.fileName}</span></div>
                <div className="text-slate-500">Size: {targetReplaceRecord.fileSize} • Uploaded: {targetReplaceRecord.uploadedAt}</div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">Select New Document</label>
                <input
                  type="file"
                  ref={replaceFileInputRef}
                  required
                  accept=".pdf, .jpg, .jpeg, .png"
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-amber-500 file:text-slate-950 file:font-bold file:text-xs cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-[#1f2f58] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplaceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow"
                >
                  Upload Replacement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: DELETE CONFIRMATION MODAL                                         */}
      {/* ========================================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-rose-500/40 rounded-3xl w-full max-w-sm shadow-2xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Delete Payslip Record?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this payslip record? This action will remove the record from both the Super Admin vault and employee self-service.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletePayslip(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: UNIVERSAL HIGH-FIDELITY PAYSLIP VIEWER & PRINT MODAL              */}
      {/* ========================================================================= */}
      {activePayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl p-6 sm:p-10 space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:m-0 print:shadow-none print:w-full print:max-h-none">
            {/* Modal Navigation & Controls (Hidden in Print) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold border border-slate-300">
                  {activePayslip.employeeId}
                </span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Computerized Payslip</span>
              </div>

              <div className="flex items-center gap-2">
                {activePayslip.fileUrl && (
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
                    <button
                      onClick={() => setViewerTab('letterhead')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        viewerTab === 'letterhead' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Formatted Slip
                    </button>
                    <button
                      onClick={() => setViewerTab('file')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        viewerTab === 'file' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Attached Document
                    </button>
                  </div>
                )}

                {/* Edit Button for Super Admin directly inside viewer */}
                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      const cur = activePayslip;
                      setActivePayslip(null);
                      handleOpenEditModal(cur);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-900 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 cursor-pointer transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Particulars</span>
                  </button>
                )}

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  onClick={() => handleDownload(activePayslip)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePayslip(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: ATTACHED ORIGINAL DOCUMENT (IF AVAILABLE) */}
            {viewerTab === 'file' && activePayslip.fileUrl ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <span className="font-mono font-bold text-slate-700">File: {activePayslip.fileName}</span>
                  <a
                    href={activePayslip.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Open in new window</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                {activePayslip.fileType === 'PDF' || activePayslip.fileName?.endsWith('.pdf') ? (
                  <iframe
                    src={activePayslip.fileUrl}
                    className="w-full h-[600px] border border-slate-300 rounded-2xl shadow-inner"
                    title="PDF Payslip Viewer"
                  />
                ) : (
                  <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 flex justify-center">
                    <img
                      src={activePayslip.fileUrl}
                      alt="Uploaded Payslip"
                      className="max-h-[600px] rounded-xl shadow-lg object-contain"
                    />
                  </div>
                )}
              </div>
            ) : (
              /* TAB CONTENT 2: OFFICIAL VPHS LETTERHEAD PAYSLIP */
              <div className="space-y-6">
                {/* Official Letterhead */}
                <div className="text-center space-y-1.5 border-b-2 border-slate-900 pb-4">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow">
                      V
                    </div>
                    <h2 className="text-2xl font-black text-slate-950 tracking-wider">VPHS SERVICES PVT. LTD.</h2>
                  </div>
                  <p className="text-xs text-slate-600 font-medium max-w-xl mx-auto">
                    {companySettings.address}, {companySettings.city}, {companySettings.state} - {companySettings.pincode}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 text-[10px] text-slate-500 pt-1 font-mono">
                    <span>CIN: {companySettings.cin}</span>
                    <span>•</span>
                    <span>GSTIN: {companySettings.gstin}</span>
                    <span>•</span>
                    <span>EPFO: {companySettings.epfoCode}</span>
                    <span>•</span>
                    <span>ESIC: {companySettings.esicCode}</span>
                  </div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest pt-2 bg-slate-100 py-1.5 rounded-lg">
                    PAYSLIP FOR THE MONTH OF {activePayslip.monthYear.toUpperCase()}
                  </h3>
                </div>

                {/* Employee Particulars Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Employee ID</span>
                    <span className="font-mono font-bold text-slate-950">{activePayslip.employeeId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Employee Name</span>
                    <span className="font-bold text-slate-950">{activePayslip.employeeName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Designation</span>
                    <span className="text-slate-900">{activePayslip.designation}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Department</span>
                    <span className="text-slate-900">{activePayslip.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Assigned Site</span>
                    <span className="text-slate-900 font-medium truncate block">{activePayslip.siteName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Bank A/C No.</span>
                    <span className="font-mono text-slate-900 font-semibold">{activePayslip.bankAc}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">IFSC Code</span>
                    <span className="font-mono text-slate-900">{activePayslip.ifsc}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">EPFO UAN</span>
                    <span className="font-mono text-slate-900 font-semibold">{activePayslip.uan}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total Working Days</span>
                    <span className="font-mono text-slate-900">{activePayslip.workingDays} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Present Days</span>
                    <span className="font-mono font-bold text-emerald-700">{activePayslip.presentDays} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Loss of Pay (LOP)</span>
                    <span className="font-mono text-slate-700">{activePayslip.lopDays} Day</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">PF / ESIC No.</span>
                    <span className="font-mono text-[10px] text-slate-700 truncate block">{activePayslip.pfNo}</span>
                  </div>
                </div>

                {/* Earnings & Deductions Breakdown Table (Exact Reference Format) */}
                <div className="border border-slate-300 rounded-2xl overflow-hidden text-xs shadow-sm">
                  <div className="grid grid-cols-2 bg-slate-900 text-white font-bold py-2.5 px-4">
                    <div className="tracking-wider">EARNINGS (₹)</div>
                    <div className="border-l border-slate-700 pl-4 tracking-wider">STATUTORY DEDUCTIONS (₹)</div>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    {/* Earnings Particulars */}
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-700">Basic Salary</span>
                        <span className="font-mono font-semibold">₹{activePayslip.basicSalary.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Variable Dearness Allowance (VDA)</span>
                        <span className="font-mono font-semibold">₹{activePayslip.vda.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">House Rent Allowance (HRA)</span>
                        <span className="font-mono font-semibold">₹{activePayslip.hra.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Washing Allowance</span>
                        <span className="font-mono font-semibold">₹{activePayslip.washingAllowance.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Other Allowances</span>
                        <span className="font-mono font-semibold">₹{activePayslip.otherAllowances.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="pt-3 border-t-2 border-slate-900 flex justify-between font-black text-slate-950 text-sm">
                        <span>GROSS SALARY (A)</span>
                        <span className="font-mono">₹{activePayslip.grossSalary.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Deductions Particulars */}
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-700">Employee PF (12%)</span>
                        <span className="font-mono font-semibold text-rose-700">₹{activePayslip.epfDeduction.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Employee ESI (0.75%)</span>
                        <span className="font-mono font-semibold text-rose-700">₹{activePayslip.esiDeduction.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Professional Tax (PT)</span>
                        <span className="font-mono font-semibold text-rose-700">₹{activePayslip.ptDeduction.toLocaleString('en-IN')}</span>
                      </div>
                      {activePayslip.otherDeductions > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-700">Other Deductions</span>
                          <span className="font-mono font-semibold text-rose-700">₹{activePayslip.otherDeductions.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      <div className="pt-8 border-t-2 border-slate-900 flex justify-between font-black text-slate-950 text-sm">
                        <span>TOTAL DEDUCTIONS (C)</span>
                        <span className="font-mono text-rose-700">₹{activePayslip.totalDeductions.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Employer Contributions (Cost to Company Summary) */}
                  <div className="bg-slate-50 p-3.5 border-t border-slate-300 grid grid-cols-3 gap-2 text-[11px] text-slate-700">
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Employer PF (12%)</span>
                      <span className="font-mono font-bold text-slate-900">₹{activePayslip.employerPf.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Employer ESI (3.25%)</span>
                      <span className="font-mono font-bold text-slate-900">₹{activePayslip.employerEsi.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px] uppercase">Monthly CTC (B)</span>
                      <span className="font-mono font-black text-slate-950">₹{activePayslip.ctc.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Net Take-Home Highlight */}
                  <div className="bg-amber-50 p-4 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-black text-amber-950 uppercase tracking-wider block">
                        NET TAKE-HOME SALARY (A - C)
                      </span>
                      <p className="text-[11px] text-slate-600">Disbursed via Electronic Bank Transfer (NEFT)</p>
                    </div>
                    <div className="text-2xl font-black text-slate-950 font-mono">
                      ₹{activePayslip.netPay.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Signatory Footer */}
                <div className="pt-6 flex items-end justify-between text-xs text-slate-600 border-t border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-800">This is a system-generated salary slip.</p>
                    <p className="text-[10px] text-slate-500">Issued by VPHS Services Pvt. Ltd. • HR & Payroll Operations</p>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="w-36 border-b border-slate-500 pb-1 font-serif italic text-slate-900 font-bold text-sm">
                      Vikram P. Singh
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
                      Authorised Signatory
                    </span>
                    <span className="text-[9px] text-slate-500">VPHS Services Pvt. Ltd.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
