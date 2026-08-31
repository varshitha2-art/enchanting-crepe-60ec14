export type Role = 'SUPER_ADMIN' | 'HR_ADMIN' | 'SITE_MANAGER' | 'SUPERVISOR' | 'EMPLOYEE';

export interface UserPermissions {
  cms_edit: boolean;
  media_upload: boolean;
  user_management: boolean;
  directory_all: boolean;
  kyc_vault: boolean;
  attendance_override: boolean;
  leave_approvals: boolean;
  salary_sheet_edit: boolean;
  payslip_edit: boolean;
  fines_management: boolean;
  audit_logs: boolean;
  company_settings: boolean;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  role: Role;
  employeeId?: string;
  avatar?: string;
  assignedSites?: string[]; // For Site Manager / Supervisor / Custom Scoped Users
  phone?: string;
  designation?: string;
  status?: 'Active' | 'Suspended';
  createdAt?: string;
  customPermissions?: UserPermissions;
}

export interface EmployeeDocument {
  fileName: string;
  type: 'PDF' | 'IMAGE';
  category: string;
  uploadedAt: string;
  verified: boolean;
  size?: string;
  url?: string;
}

export interface SalaryBreakdown {
  basic: number;
  hra: number;
  conveyance: number;
  medicalAllowance: number;
  specialAllowance: number;
  gross: number;
  epf: number;
  esi: number;
  pt: number;
  totalDeductions: number;
  net: number;
}

export interface Employee {
  id: string; // VPHS0010, etc.
  name: string;
  designation: string;
  department: string;
  gender: string;
  maritalStatus: string;
  empType: string;
  aadhar: string;
  pan: string;
  mobile: string;
  email: string;
  fatherName?: string;
  doj: string;
  dob: string;
  bankAc: string;
  ifsc: string;
  bankName: string;
  uan: string;
  pfNo: string;
  esiNo: string;
  pfDeduct: string;
  ptDeduct: string;
  esiDeduct: string;
  permanentAddress: string;
  presentAddress: string;
  siteUnit: string;
  status: 'Active' | 'Inactive';
  salary: SalaryBreakdown;
  documents: EmployeeDocument[];
  avatar?: string;
}

export interface SiteGeotag {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  formattedCoordinates: string;
  address: string;
}

export interface ClientSite {
  id: string;
  name: string;
  clientName: string;
  location: string;
  city: string;
  state: string;
  managerName: string;
  managerId: string;
  totalManpower: number;
  servicesProvided: string[];
  contactEmail: string;
  contactPhone: string;
  status: 'Active' | 'Under Maintenance' | 'Inactive';
  image: string;
  startDate: string;
  geotag?: SiteGeotag;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  designation?: string;
  siteName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'Present' | 'Late' | 'Half Day' | 'Absent' | 'On Leave';
  overtimeHours?: number;
  location?: string;
  verifiedBy?: string;
  geotagSnapshot?: string;
  totalHours?: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Casual Leave' | 'Sick Leave' | 'Earned Leave' | 'Maternity/Paternity' | 'Unpaid Leave';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  reviewedBy?: string;
  reviewComment?: string;
}

export interface PayrollRecord {
  id: string;
  month: string; // "August 2026"
  employeeId: string;
  employeeName: string;
  designation: string;
  department: string;
  siteName: string;
  workingDays: number;
  presentDays: number;
  leavesTaken: number;
  basicSalary: number;
  hra: number;
  allowances: number;
  grossSalary: number;
  epfDeduction: number;
  esiDeduction: number;
  ptDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  status: 'Processed' | 'Approved' | 'Disbursed';
  disbursedOn?: string;
  bankAc: string;
  ifsc: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'Banners' | 'Logos' | 'Sites' | 'Documents' | 'Team' | 'Icons';
  fileType: 'IMAGE' | 'PDF' | 'DOC';
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  page?: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
  ipAddress?: string;
}

export interface SectionContent {
  id: string;
  type: 'hero' | 'about' | 'services' | 'stats' | 'features' | 'clients' | 'testimonials' | 'faq' | 'contact' | 'cta' | 'facilities' | 'custom';
  title: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  items?: any[];
  visible: boolean;
  order: number;
}

export interface PageContent {
  id: string; // 'home', 'about', 'services', 'facilities', 'hr-payroll', 'clients', 'careers', 'contact'
  slug: string;
  title: string;
  metaDescription: string;
  lastUpdated: string;
  updatedBy: string;
  sections: SectionContent[];
  versionHistory?: {
    version: number;
    savedAt: string;
    savedBy: string;
    sections: SectionContent[];
  }[];
}

export interface CompanySettings {
  companyName: string;
  legalName: string;
  tagline: string;
  logo: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  supportEmail: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  cin: string;
  gstin: string;
  pan: string;
  epfoCode: string;
  esicCode: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    darkNavy: string;
  };
  socialLinks: {
    linkedin: string;
    facebook: string;
    twitter: string;
    instagram: string;
  };
  payrollSlabs?: {
    basicSalaryPct: number;
    daPct: number;
    hraPct: number;
    pfDeductionPct: number;
    esiPct: number;
    ptMonthly: number;
    statutoryBonusPct: number;
    telanganaLwfEmployer: number;
    telanganaLwfEmployee: number;
    uniformWashingAllowance: number;
    leaveWagesMonthly: number;
  };
  attendanceRules?: {
    shiftStartTime: string;
    shiftEndTime: string;
    gracePeriodMins: number;
    halfDayMinHours: number;
    fullDayMinHours: number;
    defaultGeofenceRadius: number;
  };
  integrations?: {
    smtpHost: string;
    smtpPort: number;
    smsGatewayKey: string;
    whatsappWebhook: string;
    epfoSyncEnabled: boolean;
    esicSyncEnabled: boolean;
  };
}
