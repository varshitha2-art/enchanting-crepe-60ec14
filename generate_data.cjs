const fs = require('fs');
const path = require('path');

const employees = JSON.parse(fs.readFileSync('src/data/rawEmployees.json', 'utf8'));

const initialDataTs = `import { Employee, ClientSite, User, PageContent, MediaItem, AuditLog, CompanySettings, AttendanceRecord, LeaveRequest, PayrollRecord } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    username: 'admin@vphs.in',
    name: 'Vikram Pratap Singh',
    email: 'admin@vphs.in',
    role: 'SUPER_ADMIN',
    employeeId: 'VPHS-001',
    designation: 'Managing Director & Super Admin',
    phone: '+91 98490 12345',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-2',
    username: 'hr@vphs.in',
    name: 'Priya Sharma',
    email: 'hr@vphs.in',
    role: 'HR_ADMIN',
    employeeId: 'VPHS-002',
    designation: 'Head of Human Resources',
    phone: '+91 98490 23456',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-3',
    username: 'sitemgr@vphs.in',
    name: 'Ramesh Kumar',
    email: 'sitemgr@vphs.in',
    role: 'SITE_MANAGER',
    employeeId: 'VPHS-025',
    designation: 'Senior Facility Site Manager',
    assignedSites: ['Microsoft India Campus', 'Amazon Fulfillment Center'],
    phone: '+91 98490 34567',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-4',
    username: 'supervisor@vphs.in',
    name: 'Suresh Kumar',
    email: 'supervisor@vphs.in',
    role: 'SUPERVISOR',
    employeeId: 'VPHS-010',
    designation: 'Operations Field Supervisor',
    assignedSites: ['Microsoft India Campus'],
    phone: '+91 98490 45678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-5',
    username: 'aamir',
    name: 'Aamir Khan',
    email: 'aamir.khan@vphs.in',
    role: 'EMPLOYEE',
    employeeId: 'VPHS0010',
    designation: 'Senior Facility Associate',
    phone: '+91 98490 56789',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = ${JSON.stringify(employees, null, 2)};

export const INITIAL_SITES: ClientSite[] = [
  {
    id: 'site-1',
    name: 'Microsoft India Campus',
    clientName: 'Microsoft Corporation India Pvt. Ltd.',
    location: 'Building 3, Gachibowli ISB Road, Financial District',
    city: 'Hyderabad',
    state: 'Telangana',
    managerName: 'Ramesh Kumar',
    managerId: 'VPHS-025',
    totalManpower: 45,
    servicesProvided: ['Corporate Housekeeping', 'Integrated Facility Management', 'VIP Valet', 'M&E Maintenance'],
    contactEmail: 'facilities.hyd@microsoft.com',
    contactPhone: '+91 40 6608 0000',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    startDate: '2023-04-01',
    geotag: {
      latitude: 17.4435,
      longitude: 78.3772,
      radiusMeters: 250,
      formattedCoordinates: '17.4435° N, 78.3772° E (Microsoft India Campus, Financial District)',
      address: 'Building 3, Gachibowli ISB Road, Financial District, Hyderabad'
    }
  },
  {
    id: 'site-2',
    name: 'Amazon Fulfillment Center',
    clientName: 'Amazon Transportation Services Pvt. Ltd.',
    location: 'Plot 12, Hardware Park, Shamshabad',
    city: 'Hyderabad',
    state: 'Telangana',
    managerName: 'Ramesh Kumar',
    managerId: 'VPHS-025',
    totalManpower: 38,
    servicesProvided: ['Industrial Security', 'Logistics Housekeeping', 'Material Handling Support'],
    contactEmail: 'ops-hyd@amazon.com',
    contactPhone: '+91 40 4455 6677',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    startDate: '2023-08-15',
    geotag: {
      latitude: 17.2403,
      longitude: 78.4294,
      radiusMeters: 500,
      formattedCoordinates: '17.2403° N, 78.4294° E (Amazon Fulfillment Center, Shamshabad)',
      address: 'Plot 12, Hardware Park, Shamshabad, Hyderabad'
    }
  },
  {
    id: 'site-3',
    name: 'Third Wave Coffee (Khajaguda)',
    clientName: 'Heisetasse Beverages Pvt. Ltd.',
    location: 'Opposite Oakridge School, Khajaguda Main Road',
    city: 'Hyderabad',
    state: 'Telangana',
    managerName: 'Sunil Verma',
    managerId: 'VPHS-018',
    totalManpower: 12,
    servicesProvided: ['Specialized Retail Housekeeping', 'Valet Parking', 'Store Stewarding'],
    contactEmail: 'operations@thirdwavecoffee.in',
    contactPhone: '+91 80 4710 8888',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    startDate: '2024-01-10',
    geotag: {
      latitude: 17.4195,
      longitude: 78.3685,
      radiusMeters: 100,
      formattedCoordinates: '17.4195° N, 78.3685° E (Third Wave Coffee, Khajaguda)',
      address: 'Opposite Oakridge School, Khajaguda Main Road, Hyderabad'
    }
  },
  {
    id: 'site-4',
    name: 'Forward Life Sciences Campus',
    clientName: 'Forward Life Health Tech',
    location: 'Genome Valley, Shamirpet',
    city: 'Hyderabad',
    state: 'Telangana',
    managerName: 'K. Rajendra',
    managerId: 'VPHS-032',
    totalManpower: 24,
    servicesProvided: ['Cleanroom Housekeeping', 'Biohazard Waste Management', '24/7 Security'],
    contactEmail: 'admin@forwardlife.com',
    contactPhone: '+91 40 2300 1122',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    startDate: '2024-03-01',
    geotag: {
      latitude: 17.5320,
      longitude: 78.5800,
      radiusMeters: 300,
      formattedCoordinates: '17.5320° N, 78.5800° E (Forward Life Sciences, Genome Valley)',
      address: 'Genome Valley, Shamirpet, Hyderabad'
    }
  },
  {
    id: 'site-5',
    name: 'Harleys Healthcare Center',
    clientName: 'Harleys Specialty Clinics',
    location: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    managerName: 'B. Srinivas',
    managerId: 'VPHS-041',
    totalManpower: 16,
    servicesProvided: ['Hospital Deep Sanitization', 'Patient Escort', 'Security & Access Control'],
    contactEmail: 'contact@harleysclinics.com',
    contactPhone: '+91 40 2355 9900',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80',
    startDate: '2024-05-15',
    geotag: {
      latitude: 17.4319,
      longitude: 78.4073,
      radiusMeters: 150,
      formattedCoordinates: '17.4319° N, 78.4073° E (Harleys Healthcare Center, Jubilee Hills)',
      address: 'Road No. 36, Jubilee Hills, Hyderabad'
    }
  },
  {
    id: 'site-6',
    name: 'VPHS Corporate Head Office',
    clientName: 'VPHS Services Pvt. Ltd.',
    location: 'Plot 45, Kavuri Hills, Madhapur',
    city: 'Hyderabad',
    state: 'Telangana',
    managerName: 'Priya Sharma',
    managerId: 'VPHS-002',
    totalManpower: 20,
    servicesProvided: ['Executive Administration', 'Central Operations', 'HR Command Hub'],
    contactEmail: 'contact@vphs.in',
    contactPhone: '+91 40 4852 9100',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    startDate: '2022-01-01',
    geotag: {
      latitude: 17.4483,
      longitude: 78.3915,
      radiusMeters: 100,
      formattedCoordinates: '17.4483° N, 78.3915° E (VPHS HEAD OFFICE (Madhapur, Hitech City))',
      address: 'Plot No. 45, Survey No. 64, Kavuri Hills, Madhapur, Hyderabad'
    }
  }
];

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  companyName: 'VPHS Services Pvt. Ltd.',
  legalName: 'VPHS Facility Management & HR Services Private Limited',
  tagline: 'Secure • Scalable • Seamless Facility Operations & Enterprise HR ERP',
  logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=80',
  primaryPhone: '+91 40 4852 9100',
  secondaryPhone: '+91 98490 12345',
  email: 'contact@vphs.in',
  supportEmail: 'helpdesk@vphs.in',
  address: 'Plot No. 45, Survey No. 64, Kavuri Hills, Madhapur, Hitech City',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '500081',
  cin: 'U74999TG2022PTC160412',
  gstin: '36AAACV1234Q1Z8',
  pan: 'AAACV1234Q',
  epfoCode: 'APHYD3247144000',
  esicCode: '52002258010000900',
  theme: {
    primaryColor: '#070e1e',
    accentColor: '#f59e0b',
    darkNavy: '#0b1329'
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/company/vphs-services',
    facebook: 'https://facebook.com/vphsservices',
    twitter: 'https://twitter.com/vphs_services',
    instagram: 'https://instagram.com/vphs_services'
  },
  payrollSlabs: {
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
  attendanceRules: {
    shiftStartTime: '09:00 AM',
    shiftEndTime: '06:00 PM',
    gracePeriodMins: 15,
    halfDayMinHours: 4.5,
    fullDayMinHours: 8.5,
    defaultGeofenceRadius: 150
  },
  integrations: {
    smtpHost: 'smtp.vphs.in',
    smtpPort: 587,
    smsGatewayKey: 'SMS_VPHS_PROD_84920',
    whatsappWebhook: 'https://api.whatsapp.com/vphs-dispatch',
    epfoSyncEnabled: true,
    esicSyncEnabled: true
  }
};

export const INITIAL_PORTAL_LINKS = [
  { name: 'EPFO India Portal', code: 'APHYD3247144000', url: 'https://unifiedportal-emp.epfindia.gov.in/epfo/', desc: 'Employees Provident Fund Organization - Monthly ECR & KYC filing' },
  { name: 'ESIC Portal', code: '52002258010000900', url: 'https://esic.gov.in/', desc: 'Employee State Insurance Corporation - Contribution & IP medical claims' },
  { name: 'Telangana Labour Dept', code: 'MIN-WAGE-2026', url: 'https://labour.telangana.gov.in/MinRatesWages.do', desc: 'Statutory minimum wage compliance, CLRA & license renewal' },
  { name: 'Fame DIYOS Enterprise Portal', code: 'DIYOS-FAME', url: 'https://vphs.mydiyosfame.com/', desc: 'Integrated multi-site client ERP & operations sync' }
];

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'med-1',
    name: 'vphs_gold_logo.svg',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=400&auto=format&fit=crop&q=80',
    category: 'Logos',
    fileType: 'IMAGE',
    size: '45 KB',
    uploadedAt: '2026-08-01',
    uploadedBy: 'Vikram Pratap Singh'
  },
  {
    id: 'med-2',
    name: 'corporate_headquarters_hero.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80',
    category: 'Banners',
    fileType: 'IMAGE',
    size: '2.4 MB',
    uploadedAt: '2026-08-05',
    uploadedBy: 'Vikram Pratap Singh'
  },
  {
    id: 'med-3',
    name: 'facility_housekeeping_team.jpg',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&auto=format&fit=crop&q=80',
    category: 'Team',
    fileType: 'IMAGE',
    size: '1.8 MB',
    uploadedAt: '2026-08-10',
    uploadedBy: 'Priya Sharma'
  },
  {
    id: 'med-4',
    name: 'microsoft_hyderabad_campus.jpg',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80',
    category: 'Sites',
    fileType: 'IMAGE',
    size: '3.1 MB',
    uploadedAt: '2026-08-12',
    uploadedBy: 'Ramesh Kumar'
  },
  {
    id: 'med-5',
    name: 'vphs_company_profile_2026.pdf',
    url: '#',
    category: 'Documents',
    fileType: 'PDF',
    size: '5.6 MB',
    uploadedAt: '2026-08-14',
    uploadedBy: 'Vikram Pratap Singh'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    user: 'Vikram Pratap Singh (Super Admin)',
    role: 'SUPER_ADMIN',
    action: 'Website Published',
    module: 'CMS Page Manager',
    page: 'Home Page',
    timestamp: '2026-08-28 18:45:12',
    oldValue: 'Version 1.4',
    newValue: 'Version 2.0 Live',
    ipAddress: '103.14.120.45'
  },
  {
    id: 'log-2',
    user: 'Priya Sharma (HR Admin)',
    role: 'HR_ADMIN',
    action: 'Employee Onboarded',
    module: 'Employee Master',
    page: 'Employee Directory',
    timestamp: '2026-08-28 16:30:00',
    oldValue: 'None',
    newValue: 'VPHS0081 - Akhil Pachamatla',
    ipAddress: '103.14.120.46'
  },
  {
    id: 'log-3',
    user: 'Ramesh Kumar (Site Manager)',
    role: 'SITE_MANAGER',
    action: 'Site Roster Updated',
    module: 'Attendance',
    page: 'Microsoft India Campus',
    timestamp: '2026-08-28 14:15:20',
    oldValue: '42 Active staff',
    newValue: '45 Active staff',
    ipAddress: '103.14.120.47'
  },
  {
    id: 'log-4',
    user: 'Vikram Pratap Singh (Super Admin)',
    role: 'SUPER_ADMIN',
    action: 'Statutory PF Mapping Updated',
    module: 'Compliance & Settings',
    page: 'EPFO & ESIC Rules',
    timestamp: '2026-08-28 11:20:00',
    oldValue: 'PF 12% Base',
    newValue: 'PF 12% + EPS 8.33% statutory cap verified',
    ipAddress: '103.14.120.45'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'lv-1',
    employeeId: 'VPHS0011',
    employeeName: 'Akhil Pachamatla',
    leaveType: 'Casual Leave',
    startDate: '2026-09-02',
    endDate: '2026-09-04',
    days: 3,
    reason: 'Family wedding ceremony in hometown',
    status: 'Pending',
    appliedOn: '2026-08-28',
  },
  {
    id: 'lv-2',
    employeeId: 'VPHS0016',
    employeeName: 'Gugulothu Divya',
    leaveType: 'Sick Leave',
    startDate: '2026-08-27',
    endDate: '2026-08-28',
    days: 2,
    reason: 'Viral fever and recovery',
    status: 'Approved',
    appliedOn: '2026-08-26',
    reviewedBy: 'Priya Sharma',
    reviewComment: 'Approved with medical slip'
  },
  {
    id: 'lv-3',
    employeeId: 'VPHS0020',
    employeeName: 'Prithviraj Heerekar',
    leaveType: 'Earned Leave',
    startDate: '2026-09-10',
    endDate: '2026-09-15',
    days: 6,
    reason: 'Annual family festival pilgrimage',
    status: 'Pending',
    appliedOn: '2026-08-28'
  }
];

export const INITIAL_PAGES: PageContent[] = [
  {
    id: 'home',
    slug: '/',
    title: 'VPHS Services Pvt. Ltd. | Premier Facility Management & HR Solutions',
    metaDescription: 'India leading integrated facility management, mechanized housekeeping, armed security, staffing, and automated HR ERP provider.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        badge: 'ENTERPRISE HR & FACILITY MANAGEMENT ERP',
        title: 'VPHS SERVICES PVT. LTD.',
        subtitle: 'Complete facility operations, employee management, multi-site attendance rosters, statutory compliance, automated payroll & digital identity portal.',
        buttonText: 'ACCESS ERP PORTAL',
        buttonLink: '/login',
        secondaryButtonText: 'EXPLORE OUR SERVICES',
        secondaryButtonLink: '/services',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&auto=format&fit=crop&q=80',
        visible: true,
        order: 1,
        items: [
          {
            icon: 'Users',
            title: '360° Employee Master',
            desc: 'Complete employee records, statutory PF/ESI/UAN/PT mappings, Excel batch import & KYC document vaults.'
          },
          {
            icon: 'Building2',
            title: 'Multi-Site Operations',
            desc: 'Client deployment tracking across Microsoft India, Amazon, Third Wave, Forward Life, Harleys, and head offices.'
          },
          {
            icon: 'CalendarCheck',
            title: 'Attendance & Shifts',
            desc: 'Automated punch logs, grace period enforcement, monthly rosters, late calculations, and overtime tracking.'
          },
          {
            icon: 'Receipt',
            title: 'Payroll & Payslips',
            desc: 'Configurable salary structures, statutory deductions, monthly verification workflow, and PDF payslip engine.'
          }
        ]
      },
      {
        id: 'stats',
        type: 'stats',
        title: 'Delivering Operational Excellence Across India',
        subtitle: 'Trusted by Fortune 500 tech campuses, retail chains, and specialized health facilities.',
        visible: true,
        order: 2,
        items: [
          { value: '1,500+', label: 'Trained Workforce', subtext: 'Vetted & Verified Personnel' },
          { value: '45+', label: 'Enterprise Sites', subtext: 'High-Touch Facility Campuses' },
          { value: '99.8%', label: 'Statutory Compliance', subtext: 'EPF, ESIC, CLRA Certified' },
          { value: '24/7', label: 'Command Support', subtext: 'Rapid Incident Response' }
        ]
      },
      {
        id: 'services',
        type: 'services',
        badge: 'INTEGRATED OPERATIONAL EXPERTISE',
        title: 'Comprehensive Corporate Facility & HR Solutions',
        subtitle: 'Engineered for seamless efficiency, complete regulatory compliance, and pristine workplace environments.',
        visible: true,
        order: 3,
        buttonText: 'View All Service Capabilities',
        buttonLink: '/services',
        items: [
          {
            icon: 'Sparkles',
            title: 'Integrated Facility Management',
            desc: 'End-to-end building operations, HVAC monitoring, electrical maintenance, plumbing, and asset lifecycle management.',
            features: ['Preventive Maintenance', 'Energy Optimization', 'SLA-Driven Ticketing']
          },
          {
            icon: 'Brush',
            title: 'Mechanized Housekeeping',
            desc: 'Hospital-grade sanitization, automated floor scrubbing, high-rise glass facade cleaning, and eco-friendly chemical supplies.',
            features: ['Eco-Certified Chemicals', 'Daily Deep Scrubbing', 'Washroom Hygiene Monitoring']
          },
          {
            icon: 'ShieldCheck',
            title: 'Corporate & Industrial Security',
            desc: 'PSARA-licensed armed/unarmed guards, biometric access control, CCTV monitoring, and executive escort personnel.',
            features: ['24/7 Gate Management', 'Visitor Pass Log', 'Emergency Drill Drills']
          },
          {
            icon: 'UserCheck',
            title: 'Manpower & Contract Staffing',
            desc: 'Pre-vetted technical associates, skilled drivers, valet attendants, front office receptionists, and support staff.',
            features: ['100% Police Verified', 'Strict Background Checks', 'Rapid Replacement Guarantee']
          },
          {
            icon: 'FileSpreadsheet',
            title: 'Automated HR & Payroll ERP',
            desc: 'Digital biometric attendance, shift rosters, computerized payslips, and automated EPF/ESI statutory submissions.',
            features: ['Online KYC Vault', '1-Click Payslip Download', 'Real-Time Labour Law Audits']
          },
          {
            icon: 'CheckCircle2',
            title: 'Client & Site Governance',
            desc: 'Dedicated site managers, daily supervisor checklist uploads, incident reporting, and real-time SLA dashboards.',
            features: ['Dedicated Site Lead', 'Digital Logbooks', 'Monthly Client Review']
          }
        ]
      },
      {
        id: 'clients',
        type: 'clients',
        badge: 'TRUSTED BY INDUSTRY LEADERS',
        title: 'Powering Premier Enterprise Campuses',
        subtitle: 'Our clients depend on VPHS for uncompromised safety, spotless cleanliness, and total statutory peace of mind.',
        visible: true,
        order: 4,
        items: [
          { name: 'Microsoft India', logo: '🏢 Microsoft Hyderabad Campus', industry: 'Global Tech Campus', staff: '45 Personnel' },
          { name: 'Amazon Fulfillment', logo: '📦 Amazon Logistics Hub', industry: 'Supply Chain & Warehousing', staff: '38 Personnel' },
          { name: 'Third Wave Coffee', logo: '☕ Third Wave Roasters', industry: 'Premium Hospitality & Retail', staff: '12 Personnel' },
          { name: 'Forward Life Sciences', logo: '🔬 Forward Life Bio Tech', industry: 'Healthcare & Cleanrooms', staff: '24 Personnel' },
          { name: 'Harleys Healthcare', logo: '🏥 Harleys Specialty Clinics', industry: 'Medical Facilities', staff: '16 Personnel' },
          { name: 'VPHS Corporate Hub', logo: '🏛️ VPHS Central Operations', industry: 'Headquarters & Admin', staff: '20 Personnel' }
        ]
      },
      {
        id: 'why-us',
        type: 'features',
        badge: 'THE VPHS ADVANTAGE',
        title: 'Why Top Organizations Choose VPHS',
        subtitle: 'We combine rigorous ground operations with cutting-edge ERP technology.',
        visible: true,
        order: 5,
        items: [
          {
            icon: 'Shield',
            title: '100% Statutory Compliance Guarantee',
            desc: 'Zero non-compliance risk with timely EPFO, ESIC, Professional Tax, and Minimum Wage filings backed by digital challans.'
          },
          {
            icon: 'Cpu',
            title: 'Proprietary Role-Based ERP System',
            desc: 'Complete transparency with live attendance geotagging, employee KYC document vaults, and supervisor incident reports.'
          },
          {
            icon: 'Award',
            title: 'ISO & Safety Certified Standard',
            desc: 'Trained staff adhering strictly to ISO 9001 (Quality) and ISO 45001 (Occupational Health & Safety) procedures.'
          },
          {
            icon: 'Clock',
            title: 'Guaranteed 2-Hour SLA Response',
            desc: '24/7 dedicated escalation matrix with immediate backup manpower deployment in case of unscheduled emergencies.'
          }
        ]
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        badge: 'CLIENT TESTIMONIALS',
        title: 'What Facility Heads Say About VPHS',
        subtitle: 'Real feedback from facilities directors and operations leaders.',
        visible: true,
        order: 6,
        items: [
          {
            quote: 'VPHS has transformed our campus housekeeping and access security. Their digital attendance and transparent payroll reports give us complete audit confidence every single month.',
            author: 'Anil Raghavan',
            role: 'Head of Workplace Solutions, Tech Campus',
            rating: 5
          },
          {
            quote: 'During high-footfall events and daily operations across our retail stores, VPHS valet and stewarding teams maintain impeccable discipline and courtesy.',
            author: 'Deepika Rao',
            role: 'Operations Director, Premium Retail Chain',
            rating: 5
          },
          {
            quote: 'Their zero-tolerance policy on statutory compliance and well-trained medical sanitization staff have made them our indispensable partner for cleanroom hygiene.',
            author: 'Dr. S. K. Mehta',
            role: 'VP Infrastructure, Life Sciences Park',
            rating: 5
          }
        ]
      },
      {
        id: 'cta',
        type: 'cta',
        title: 'Ready to Upgrade Your Corporate Facility Operations?',
        subtitle: 'Schedule a comprehensive site audit with our facility engineering team today, or sign in directly to the VPHS ERP Portal.',
        buttonText: 'Sign In to Portal',
        buttonLink: '/login',
        secondaryButtonText: 'Request Site Audit & Quote',
        secondaryButtonLink: '/contact',
        visible: true,
        order: 7
      }
    ]
  },
  {
    id: 'about',
    slug: '/about',
    title: 'About VPHS Services Pvt. Ltd. | Corporate Profile & Heritage',
    metaDescription: 'Discover the vision, leadership, and operational heritage behind VPHS Services Pvt. Ltd.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'about-hero',
        type: 'hero',
        badge: 'ABOUT OUR COMPANY',
        title: 'Engineering Pristine, Secure & Compliant Workplaces',
        subtitle: 'VPHS Services Pvt. Ltd. is a premier Indian Facility Management and Human Resources ERP firm providing end-to-end enterprise solutions for top corporations.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
        visible: true,
        order: 1
      },
      {
        id: 'mission-vision',
        type: 'features',
        badge: 'PURPOSE & PRINCIPLES',
        title: 'Our Mission & Vision',
        subtitle: 'Building enduring trust through operational integrity and modern technology.',
        visible: true,
        order: 2,
        items: [
          {
            icon: 'Target',
            title: 'Our Mission',
            desc: 'To deliver flawless, technology-driven facility management, security, and human capital solutions that elevate corporate productivity while ensuring dignity, security, and statutory welfare for our personnel.'
          },
          {
            icon: 'Eye',
            title: 'Our Vision',
            desc: 'To become India most trusted, technologically advanced, and ethically governed facility management enterprise, renowned for 100% statutory transparency and operational excellence.'
          },
          {
            icon: 'HeartHandshake',
            title: 'Our Core Values',
            desc: 'Integrity First, Relentless Safety, Tech-Enabled Transparency, Client-Centric Responsiveness, and Continuous Workforce Empowerment.'
          }
        ]
      },
      {
        id: 'compliance-standards',
        type: 'about',
        badge: 'STATUTORY & QUALITY CERTIFICATIONS',
        title: 'Unwavering Commitment to Compliance & Safety',
        subtitle: 'We maintain stringent adherence to Indian labour laws, industrial safety regulations, and environmental protocols.',
        content: 'At VPHS Services Pvt. Ltd., compliance is not a checkbox—it is the bedrock of our business. Every employee is enrolled into EPFO and ESIC from Day 1. Monthly electronic wage slips, PF challans, and ESIC returns are accessible directly via our client portal.',
        visible: true,
        order: 3,
        items: [
          { title: 'EPFO & ESIC Compliance', desc: '100% timely deposit of employee and employer statutory contributions with digital verification receipts.' },
          { title: 'CLRA Licensed Contractor', desc: 'Full compliance with the Contract Labour (Regulation and Abolition) Act with all mandatory state registrations.' },
          { title: 'PSARA Certified Security', desc: 'Strict adherence to Private Security Agencies (Regulation) Act with certified training standards.' },
          { title: 'ISO 9001 & ISO 45001 Standards', desc: 'Internationally benchmarked Quality and Occupational Health & Safety management frameworks.' }
        ]
      }
    ]
  },
  {
    id: 'services',
    slug: '/services',
    title: 'Enterprise Facility Management & HR Services | VPHS Services',
    metaDescription: 'Explore comprehensive facility management, housekeeping, security, staffing, and HR ERP services.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'services-hero',
        type: 'hero',
        badge: 'OUR SERVICES',
        title: 'End-to-End Enterprise Facility & Manpower Solutions',
        subtitle: 'From pristine corporate housekeeping and armed security to contract staffing and cloud HR ERP, VPHS delivers excellence across every square foot.',
        visible: true,
        order: 1
      },
      {
        id: 'detailed-services',
        type: 'services',
        title: 'Specialized Service Verticals',
        subtitle: 'Customized facility packages tailored to tech parks, retail chains, hospitals, and industrial warehouses.',
        visible: true,
        order: 2,
        items: [
          {
            icon: 'Sparkles',
            title: 'Integrated Facility Management (IFM)',
            desc: 'Complete engineering and soft services lifecycle management for large commercial complexes.',
            features: ['HVAC, DG Sets & Electrical Sub-stations', 'BMS (Building Management System) Monitoring', 'Plumbing & Water Treatment Plants', 'Vendor & Spares Inventory Control']
          },
          {
            icon: 'Brush',
            title: 'Mechanized Housekeeping & Sanitization',
            desc: 'State-of-the-art floor scrubbers, high-pressure washers, steam cleaners, and eco-certified chemicals.',
            features: ['Cleanroom & Laboratory Sanitization', 'High-Rise Glass Facade Cleaning', 'Carpet & Upholstery Deep Extraction', 'Odor Control & Restroom Hygiene Management']
          },
          {
            icon: 'ShieldCheck',
            title: 'Corporate Security & Guarding',
            desc: 'Highly disciplined, PSARA-trained security officers for perimeter defense, visitor control, and asset safety.',
            features: ['Perimeter Patrolling & Access Gates', 'Biometric & RFID Visitor Logging', 'CCTV Control Room Monitoring', 'Executive Escort & VIP Protection']
          },
          {
            icon: 'UserCheck',
            title: 'Manpower Supply & Contract Staffing',
            desc: 'Trained front-office executives, skilled valet attendants, office boys, drivers, and technical assistants.',
            features: ['100% Police Background Verification', 'Comprehensive Medical Fitness Tests', 'Structured Grooming & Etiquette Training', 'Instant Shift Backup & Replacement']
          },
          {
            icon: 'FileSpreadsheet',
            title: 'Payroll, EPF & Statutory Compliance',
            desc: 'Complete automated payroll processing, salary disbursement, and statutory remittance management.',
            features: ['Monthly EPF & ESIC ECR Filing', 'Professional Tax & TDS Deduction', 'Digital Payslip Generator with QR Verification', 'Labour Law Audit & Inspection Defense']
          },
          {
            icon: 'CheckCircle2',
            title: 'Special Event & Valet Operations',
            desc: 'Flawless traffic coordination, valet parking, and executive guest handling for premium corporate events.',
            features: ['Traffic Marshalling & Slot Management', 'Digital Valet Ticket Tracking', 'Luggage & Concierge Services', 'Dedicated Site Incident Commander']
          }
        ]
      }
    ]
  },
  {
    id: 'facilities',
    slug: '/facilities',
    title: 'Facilities & Operational Standards | VPHS Services',
    metaDescription: 'Learn about our mechanized machinery, chemical safety protocols, and operational workflows.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'fac-hero',
        type: 'hero',
        badge: 'FACILITIES & INFRASTRUCTURE',
        title: 'Modern Machinery & High-Touch Hygiene Protocols',
        subtitle: 'Equipped with industrial ride-on scrubbers, electrostatic sprayers, and safety-certified equipment.',
        visible: true,
        order: 1
      },
      {
        id: 'fac-cards',
        type: 'features',
        title: 'Our Facility Standards & Equipment Suite',
        subtitle: 'How we maintain spotless environments across 45+ enterprise sites.',
        visible: true,
        order: 2,
        items: [
          {
            icon: 'Cpu',
            title: 'Industrial Mechanized Equipment',
            desc: 'Taski, Roots, and Kärcher automated ride-on scrubbers, single-disc polishers, wet/dry industrial vacuums, and steam generators.'
          },
          {
            icon: 'Shield',
            title: 'Eco-Friendly & Diversey Certified Chemicals',
            desc: '100% non-toxic, biodegradable Diversey (R1 to R9) color-coded cleaning agents ensuring zero surface corrosion and human safety.'
          },
          {
            icon: 'CalendarCheck',
            title: 'Digital Checklist & IoT Monitoring',
            desc: 'QR-code based restroom audit logs, temperature sensors, and supervisor checklists uploaded in real time to the VPHS ERP.'
          },
          {
            icon: 'Award',
            title: 'PPE & Safety First Protocols',
            desc: 'Mandatory steel-toe boots, anti-slip footwear, reflective vests, chemical-resistant gloves, and full fall-arrest harnesses for facade work.'
          }
        ]
      }
    ]
  },
  {
    id: 'hr-payroll',
    slug: '/hr-payroll',
    title: 'Enterprise HR & Payroll ERP Solutions | VPHS Services',
    metaDescription: 'Complete employee lifecycle management, biometric punch sync, and computerized payslips.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'hr-hero',
        type: 'hero',
        badge: 'HR & PAYROLL ERP',
        title: 'Unified Workforce Management & Automated Payroll',
        subtitle: 'From onboarding and KYC document vaults to computerized statutory payroll calculations and instant PDF payslips.',
        visible: true,
        order: 1
      },
      {
        id: 'hr-features',
        type: 'services',
        title: 'Key Pillars of VPHS HR Technology',
        subtitle: 'Designed specifically for the Indian facility management ecosystem.',
        visible: true,
        order: 2,
        items: [
          {
            icon: 'Users',
            title: '360° Digital Employee Vault',
            desc: 'Centralized repository of Aadhaar, PAN, Bank details, UAN, ESIC, Police verification, and emergency contacts with instant search.',
            features: ['Excel Batch Import', 'Duplicate Detection', 'Document Expiry Alerts']
          },
          {
            icon: 'CalendarCheck',
            title: 'Smart Attendance & Shift Rosters',
            desc: 'Multi-site roster scheduling, grace period enforcement, automatic late-coming deductions, and overtime calculations.',
            features: ['Site Geo-Tagging', 'Shift Swap Approvals', 'Real-Time Absenteeism Alerts']
          },
          {
            icon: 'Receipt',
            title: 'Statutory Payroll Engine',
            desc: 'Automatic computation of Basic, HRA, Conveyance, EPF (12%), ESIC (0.75%), PT, TDS, and net wage transfers via NEFT/RTGS.',
            features: ['Instant Bank Upload Format', '1-Click PDF Payslip Generator', 'Salary Revision History']
          },
          {
            icon: 'ShieldCheck',
            title: 'Compliance & Audit Assurance',
            desc: 'Direct synchronization with EPFO, ESIC, and Telangana Labour Department portals for zero-penalty assurance.',
            features: ['ECR Generation', 'Form 16 Automation', 'Statutory Register (Form A, B, C, D)']
          }
        ]
      }
    ]
  },
  {
    id: 'clients',
    slug: '/clients',
    title: 'Our Clients & Operating Sites | VPHS Services',
    metaDescription: 'Explore our corporate client partnerships including Microsoft, Amazon, Third Wave Coffee, and healthcare centers.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'clients-hero',
        type: 'hero',
        badge: 'CLIENT PORTFOLIO',
        title: 'Trusted by Leading Corporate Brands',
        subtitle: 'Discover how VPHS Services powers daily operations for technology campuses, premium retail cafes, and specialized healthcare centers.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'careers',
    slug: '/careers',
    title: 'Careers at VPHS Services Pvt. Ltd. | Join Our Growing Team',
    metaDescription: 'Explore exciting career opportunities in facility management, operations, HR, and technical maintenance.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'careers-hero',
        type: 'hero',
        badge: 'CAREERS AT VPHS',
        title: 'Build Your Future with a Growing Enterprise',
        subtitle: 'We provide competitive salaries, on-time statutory benefits (EPF, ESIC), medical insurance, and fast career advancement paths.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'contact',
    slug: '/contact',
    title: 'Contact Us | VPHS Services Pvt. Ltd.',
    metaDescription: 'Get in touch with VPHS Services Pvt. Ltd. for enterprise facility management, housekeeping, security, or HR ERP inquiries.',
    lastUpdated: '2026-08-28',
    updatedBy: 'Vikram Pratap Singh',
    sections: [
      {
        id: 'contact-hero',
        type: 'hero',
        badge: 'GET IN TOUCH',
        title: 'Let Discuss Your Facility & HR Requirements',
        subtitle: 'Reach out to our operations team for custom site proposals, facility audits, or ERP demonstrations.',
        visible: true,
        order: 1
      }
    ]
  }
];
`;

fs.writeFileSync('src/data/initialData.ts', initialDataTs);
console.log('Successfully updated src/data/initialData.ts with site geotags!');
