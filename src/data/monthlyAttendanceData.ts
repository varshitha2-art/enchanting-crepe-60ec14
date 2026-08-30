export interface MonthlyEmployeeAttendance {
  sNo: number;
  empId: string;
  name: string;
  designation: string;
  siteUnit: string;
  siteId: string;
  days: string[]; // 31 days, e.g. ['W/O', 'W/O', 'P', 'P', ...]
  totalDays: number;
  totalPresent: number;
  totalLeaves: number;
  holidays: number;
  halfDay: number;
  weeklyOff: number;
  absent: number;
  percentage: number;
}

export const AUGUST_2026_ATTENDANCE_DATA: MonthlyEmployeeAttendance[] = [
  // ==========================================
  // SITE 1: MICROSOFT INDIA CAMPUS (16 STAFF)
  // ==========================================
  {
    sNo: 1,
    empId: 'VPHS0055',
    name: 'DOMMETI NAGA SAIRAM',
    designation: 'FACILITY ASSOCIATE',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'A', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 20,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 1,
    percentage: 96.77
  },
  {
    sNo: 2,
    empId: 'VPHS0062',
    name: 'MOHAMMED SHAHED AYAN',
    designation: 'OPERATIONS ASSOCIATE',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'A', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 20,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 1,
    percentage: 96.77
  },
  {
    sNo: 3,
    empId: 'VPHS0061',
    name: 'SHAIK ABDUL REHAN',
    designation: 'FACILITY EXECUTIVE',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 4,
    empId: 'VPHS0047',
    name: 'ADAM SHA',
    designation: 'SENIOR HOUSEKEEPING',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 5,
    empId: 'VPHS0050',
    name: 'MOHAMMED DAWOOD',
    designation: 'VALET MARSHALL',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'A', 'P', 'A', 'P', 'A', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'A', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 17,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 4,
    percentage: 87.1
  },
  {
    sNo: 6,
    empId: 'VPHS0048',
    name: 'GANDIKOTA ANIL',
    designation: 'FACILITY ASSOCIATE',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 7,
    empId: 'VPHS0051',
    name: 'DONTI HARISH',
    designation: 'ELECTRICAL TECHNICIAN',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'A', 'A', 'P', 'W/O', 'W/O', 'A', 'A', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 17,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 4,
    percentage: 87.1
  },
  {
    sNo: 8,
    empId: 'VPHS0052',
    name: 'POTHUGUNTA CHINNA NAVEEN KUMAR',
    designation: 'FACILITY ASSOCIATE',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'L', 'L', 'L', 'L', 'W/O', 'W/O', 'L', 'L', 'L', 'L', 'L', 'W/O', 'W/O', 'L', 'L', 'L', 'L', 'L', 'W/O', 'W/O', 'L'],
    totalDays: 31,
    totalPresent: 6,
    totalLeaves: 15,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 51.61
  },
  {
    sNo: 9,
    empId: 'VPHS0064',
    name: 'VASAMSETTI VEERA SAI',
    designation: 'SECURITY OFFICER',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'A', 'A', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 19,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 2,
    percentage: 93.55
  },
  {
    sNo: 10,
    empId: 'VPHS0056',
    name: 'MEKALA NARESH',
    designation: 'TEAM LEAD',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 11,
    empId: 'VPHS0057',
    name: 'JETTTUR NAVEEN',
    designation: 'VALET ATTENDANT',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'HD', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'L', 'L', 'L', 'L', 'L', 'W/O', 'W/O', 'L', 'L', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 13,
    totalLeaves: 7,
    holidays: 0,
    halfDay: 1,
    weeklyOff: 10,
    absent: 0,
    percentage: 75.81
  },
  {
    sNo: 12,
    empId: 'VPHS0053',
    name: 'KUMMARI SURESH',
    designation: 'HOUSEKEEPING STAFF',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'A', 'A', 'A', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'A', 'A', 'A', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 15,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 6,
    percentage: 80.65
  },
  {
    sNo: 13,
    empId: 'VPHS0063',
    name: 'ZOHEB TANVEER',
    designation: 'STEWARD',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'A', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 20,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 1,
    percentage: 96.77
  },
  {
    sNo: 14,
    empId: 'VPHS0059',
    name: 'RAHIL AZAM',
    designation: 'CLEANROOM TECHNICIAN',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'A', 'A', 'P', 'A', 'A', 'W/O', 'W/O', 'A', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'A', 'A', 'A', 'A', 'A', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 11,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 10,
    percentage: 67.74
  },
  {
    sNo: 15,
    empId: 'VPHS0054',
    name: 'MOHD MAQSOOD',
    designation: 'SHIFT SUPERVISOR',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 16,
    empId: 'VPHS0060',
    name: 'K RAHUL KUMAR',
    designation: 'REGIONAL OPERATIONS MANAGER',
    siteUnit: 'Microsoft India Campus',
    siteId: 'site-1',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },

  // ==========================================
  // SITE 2: AMAZON FULFILLMENT CENTER (5 STAFF)
  // ==========================================
  {
    sNo: 17,
    empId: 'VPHS0058',
    name: 'PRITHVIRAJ',
    designation: 'MAINTENANCE LEAD',
    siteUnit: 'Amazon Fulfillment Center',
    siteId: 'site-2',
    days: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'W/O', 'W/O', 'W/O'],
    totalDays: 31,
    totalPresent: 25,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 1,
    percentage: 80.65
  },
  {
    sNo: 18,
    empId: 'VPHS0065',
    name: 'SHAHNOOR KHAN',
    designation: 'LOGISTICS ASSOCIATE',
    siteUnit: 'Amazon Fulfillment Center',
    siteId: 'site-2',
    days: ['P', 'P', 'P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'P', 'L', 'P', 'P', 'P', 'P', 'P', 'P', 'A', 'W/O', 'W/O', 'W/O', 'W/O', 'W/O'],
    totalDays: 31,
    totalPresent: 22,
    totalLeaves: 2,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 2,
    percentage: 70.97
  },
  {
    sNo: 19,
    empId: 'VPHS0066',
    name: 'ABHISHEK',
    designation: 'DISPATCH ASSISTANT',
    siteUnit: 'Amazon Fulfillment Center',
    siteId: 'site-2',
    days: ['P', 'P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'A', 'A', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'W/O', 'W/O', 'W/O'],
    totalDays: 31,
    totalPresent: 22,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 4,
    percentage: 70.97
  },
  {
    sNo: 20,
    empId: 'VPHS0067',
    name: 'PAVAN KUMAR',
    designation: 'MATERIAL HANDLER',
    siteUnit: 'Amazon Fulfillment Center',
    siteId: 'site-2',
    days: ['P', 'P', 'P', 'P', 'P', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
    totalDays: 31,
    totalPresent: 5,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 0,
    absent: 26,
    percentage: 16.13
  },
  {
    sNo: 21,
    empId: 'VPHS0068',
    name: 'SAMIR',
    designation: 'HELPER',
    siteUnit: 'Amazon Fulfillment Center',
    siteId: 'site-2',
    days: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'P', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
    totalDays: 31,
    totalPresent: 1,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 0,
    absent: 30,
    percentage: 3.23
  },

  // ==========================================
  // SITE 3: THIRD WAVE COFFEE (KHAJAGUDA)
  // ==========================================
  {
    sNo: 22,
    empId: 'VPHS0018',
    name: 'SUNIL VERMA',
    designation: 'STORE OPERATIONS LEAD',
    siteUnit: 'Third Wave Coffee (Khajaguda)',
    siteId: 'site-3',
    days: ['W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P'],
    totalDays: 31,
    totalPresent: 26,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 23,
    empId: 'VPHS0010',
    name: 'AAMIR KHAN',
    designation: 'SENIOR VALET MARSHALL',
    siteUnit: 'Third Wave Coffee (Khajaguda)',
    siteId: 'site-3',
    days: ['W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'A', 'P', 'P', 'W/O', 'P', 'P'],
    totalDays: 31,
    totalPresent: 25,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 1,
    percentage: 96.15
  },
  {
    sNo: 24,
    empId: 'VPHS0019',
    name: 'G. SHIVA',
    designation: 'BARISTA STEWARD',
    siteUnit: 'Third Wave Coffee (Khajaguda)',
    siteId: 'site-3',
    days: ['W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P'],
    totalDays: 31,
    totalPresent: 26,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 25,
    empId: 'VPHS0020',
    name: 'K. VENU',
    designation: 'STORE MAINTENANCE',
    siteUnit: 'Third Wave Coffee (Khajaguda)',
    siteId: 'site-3',
    days: ['W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'L', 'L', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P', 'P', 'P', 'P', 'P', 'W/O', 'P', 'P'],
    totalDays: 31,
    totalPresent: 24,
    totalLeaves: 2,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 5,
    absent: 0,
    percentage: 92.31
  },

  // ==========================================
  // SITE 4: FORWARD LIFE SCIENCES CAMPUS
  // ==========================================
  {
    sNo: 26,
    empId: 'VPHS0032',
    name: 'K. RAJENDRA',
    designation: 'FACILITY OPERATIONS LEAD',
    siteUnit: 'Forward Life Sciences Campus',
    siteId: 'site-4',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 27,
    empId: 'VPHS0033',
    name: 'P. SURESH',
    designation: 'CLEANROOM SPECIALIST',
    siteUnit: 'Forward Life Sciences Campus',
    siteId: 'site-4',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 28,
    empId: 'VPHS0034',
    name: 'D. RAJU',
    designation: 'BIOHAZARD WASTE TECH',
    siteUnit: 'Forward Life Sciences Campus',
    siteId: 'site-4',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'A', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 20,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 1,
    percentage: 95.24
  },

  // ==========================================
  // SITE 5: HARLEYS HEALTHCARE CENTER
  // ==========================================
  {
    sNo: 29,
    empId: 'VPHS0041',
    name: 'B. SRINIVAS',
    designation: 'HOSPITAL FACILITY LEAD',
    siteUnit: 'Harleys Healthcare Center',
    siteId: 'site-5',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 30,
    empId: 'VPHS0042',
    name: 'J. RAJESH',
    designation: 'DEEP SANITIZATION TECH',
    siteUnit: 'Harleys Healthcare Center',
    siteId: 'site-5',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },

  // ==========================================
  // SITE 6: VPHS CORPORATE HEAD OFFICE
  // ==========================================
  {
    sNo: 31,
    empId: 'VPHS0002',
    name: 'PRIYA SHARMA',
    designation: 'HEAD OF HR & OPERATIONS',
    siteUnit: 'VPHS Corporate Head Office',
    siteId: 'site-6',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  },
  {
    sNo: 32,
    empId: 'VPHS0003',
    name: 'V. ASHOK',
    designation: 'CENTRAL FACILITY ADMIN',
    siteUnit: 'VPHS Corporate Head Office',
    siteId: 'site-6',
    days: ['W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P', 'P', 'P', 'P', 'P', 'W/O', 'W/O', 'P'],
    totalDays: 31,
    totalPresent: 21,
    totalLeaves: 0,
    holidays: 0,
    halfDay: 0,
    weeklyOff: 10,
    absent: 0,
    percentage: 100
  }
];

// Calculation helper for any subset of records
export const calculateDailyTotals = (records: MonthlyEmployeeAttendance[]) => {
  const dailyCounts: { day: number; present: number; absent: number; leave: number; weeklyOff: number; halfDay: number }[] = [];

  for (let d = 0; d < 31; d++) {
    let p = 0;
    let a = 0;
    let l = 0;
    let wo = 0;
    let hd = 0;

    records.forEach(r => {
      const code = (r.days[d] || '').toUpperCase().trim();
      if (code === 'P') p++;
      else if (code === 'A') a++;
      else if (code === 'L') l++;
      else if (code === 'W/O') wo++;
      else if (code === 'HD') hd += 0.5;
    });

    dailyCounts.push({ day: d + 1, present: p, absent: a, leave: l, weeklyOff: wo, halfDay: hd });
  }

  const grandTotalDays = records.reduce((acc, r) => acc + r.totalDays, 0);
  const grandTotalPresent = records.reduce((acc, r) => acc + r.totalPresent, 0);
  const grandTotalLeaves = records.reduce((acc, r) => acc + r.totalLeaves, 0);
  const grandTotalHolidays = records.reduce((acc, r) => acc + r.holidays, 0);
  const grandTotalHalfDay = records.reduce((acc, r) => acc + r.halfDay, 0);
  const grandTotalWeeklyOff = records.reduce((acc, r) => acc + r.weeklyOff, 0);
  const grandTotalAbsent = records.reduce((acc, r) => acc + r.absent, 0);
  const avgPercentage = records.length > 0
    ? (records.reduce((acc, r) => acc + r.percentage, 0) / records.length).toFixed(2)
    : '0.00';

  return {
    dailyCounts,
    grandTotalDays,
    grandTotalPresent,
    grandTotalLeaves,
    grandTotalHolidays,
    grandTotalHalfDay,
    grandTotalWeeklyOff,
    grandTotalAbsent,
    avgPercentage
  };
};
