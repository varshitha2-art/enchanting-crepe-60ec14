import { PayslipRecord } from '../types';
import { INITIAL_EMPLOYEES } from './initialData';

export const calculateSalarySummary = (
  basic: number,
  vda: number,
  hra: number,
  washing: number,
  otherAllowances: number,
  empPf?: number,
  empEsi?: number,
  pt: number = 200,
  otherDeductions: number = 0,
  employerPfVal?: number,
  employerEsiVal?: number
) => {
  const grossSalary = basic + vda + hra + washing + otherAllowances;
  
  // Standard statutory computations if not overridden
  const epfDeduction = empPf !== undefined ? empPf : Math.min(Math.round((basic + vda) * 0.12), 1800);
  const esiDeduction = empEsi !== undefined ? empEsi : (grossSalary <= 21000 ? Math.round(grossSalary * 0.0075) : 120);
  const totalDeductions = epfDeduction + esiDeduction + pt + otherDeductions;
  const netPay = grossSalary - totalDeductions;

  const employerPf = employerPfVal !== undefined ? employerPfVal : Math.min(Math.round((basic + vda) * 0.12), 1800);
  const employerEsi = employerEsiVal !== undefined ? employerEsiVal : (grossSalary <= 21000 ? Math.round(grossSalary * 0.0325) : 520);
  const ctc = grossSalary + employerPf + employerEsi;

  return {
    grossSalary,
    employerPf,
    employerEsi,
    ctc,
    epfDeduction,
    esiDeduction,
    ptDeduction: pt,
    otherDeductions,
    totalDeductions,
    netPay
  };
};

// 17 Active Employee IDs
const EMP_IDS = [
  'VPHS0040', 'VPHS0046', 'VPHS0050', 'VPHS0051', 'VPHS0055',
  'VPHS0056', 'VPHS0061', 'VPHS0062', 'VPHS0063', 'VPHS0067',
  'VPHS0068', 'VPHS0069', 'VPHS0072', 'VPHS0075', 'VPHS0076',
  'VPHS0078', 'VPHS0079'
];

export const INITIAL_PAYSLIPS: PayslipRecord[] = [];

// Seed August 2026, July 2026, and June 2026 for each employee
const MONTHS = [
  { month: 'August', year: 2026, monthYear: 'August 2026', uploadDate: '2026-08-31 09:30 AM', disbursedOn: '2026-08-31' },
  { month: 'July', year: 2026, monthYear: 'July 2026', uploadDate: '2026-07-31 10:15 AM', disbursedOn: '2026-07-31' },
  { month: 'June', year: 2026, monthYear: 'June 2026', uploadDate: '2026-06-30 11:00 AM', disbursedOn: '2026-06-30' }
];

EMP_IDS.forEach((empId) => {
  const emp = INITIAL_EMPLOYEES.find(e => e.id.toUpperCase() === empId);
  const empName = emp?.name || `Employee ${empId}`;
  const desig = emp?.designation || 'Valet Operations Associate';
  const dept = emp?.department || 'Facility Management';
  const site = emp?.siteUnit || 'Microsoft India (R & D) Pvt. Ltd';
  const bankAc = emp?.bankAc || '921020048291039';
  const ifsc = emp?.ifsc || 'HDFC0000240';
  const bankName = emp?.bankName || 'HDFC Bank Ltd.';
  const uan = emp?.uan || '101928472910';
  const pfNo = emp?.pfNo || 'TS/HYD/10928/042';
  const esiNo = emp?.esiNo || '52000849201920';
  const pan = emp?.pan || 'ABCDE1234F';
  const aadhar = emp?.aadhar || '4829 1029 4819';

  MONTHS.forEach((m, mIdx) => {
    // Reference Salary Components from user:
    // Basic: 6,000, VDA: 10,000, HRA: 6,783, Washing: 200, Other: 650
    // Gross: 23,633, Employer PF: 1,800, Employer ESI: 520, CTC: 25,953
    // Emp PF: 1,800, Emp ESI: 120, PT: 200, Deductions: 2,120, Net: 21,513
    const basic = 6000;
    const vda = 10000;
    const hra = 6783;
    const washing = 200;
    const otherAllowances = 650;
    const employerPf = 1800;
    const employerEsi = 520;
    const epf = 1800;
    const esi = 120;
    const pt = 200;

    const summary = calculateSalarySummary(basic, vda, hra, washing, otherAllowances, epf, esi, pt, 0, employerPf, employerEsi);

    INITIAL_PAYSLIPS.push({
      id: `ps-${empId.toLowerCase()}-${m.year}-${String(mIdx + 1).padStart(2, '0')}`,
      employeeId: empId,
      employeeName: empName,
      designation: desig,
      department: dept,
      siteName: site,
      month: m.month,
      year: m.year,
      monthYear: m.monthYear,
      uploadedAt: m.uploadDate,
      uploadedBy: 'VPHS Super Admin',
      fileName: `VPHS_Payslip_${empId}_${m.month}_${m.year}.pdf`,
      fileType: 'PDF',
      fileSize: '342 KB',
      workingDays: 26,
      presentDays: 25,
      lopDays: 1,
      basicSalary: basic,
      vda,
      hra,
      washingAllowance: washing,
      otherAllowances,
      grossSalary: summary.grossSalary,
      employerPf: summary.employerPf,
      employerEsi: summary.employerEsi,
      ctc: summary.ctc,
      epfDeduction: summary.epfDeduction,
      esiDeduction: summary.esiDeduction,
      ptDeduction: summary.ptDeduction,
      otherDeductions: 0,
      totalDeductions: summary.totalDeductions,
      netPay: summary.netPay,
      bankAc,
      ifsc,
      bankName,
      uan,
      pfNo,
      esiNo,
      pan,
      aadhar,
      status: 'Disbursed',
      disbursedOn: m.disbursedOn
    });
  });
});
