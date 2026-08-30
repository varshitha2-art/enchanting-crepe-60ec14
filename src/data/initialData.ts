import { Employee, ClientSite, User, PageContent, MediaItem, AuditLog, CompanySettings, AttendanceRecord, LeaveRequest, PayrollRecord } from '../types';

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

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    "id": "VPHS0010",
    "name": "RAMARAJYAM NAREBOYINA",
    "designation": "HOUSE KEEPING STAFF",
    "department": "Facility Management",
    "gender": "Female",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "639610749473",
    "pan": "FOBPR5348J",
    "mobile": "7569727080",
    "email": "ramarajyamnareboyina@vphs.in",
    "fatherName": "Jalayya",
    "doj": "2025-01-06",
    "dob": "1990-01-01",
    "bankAc": "1446166000039870",
    "ifsc": "KVBL0001446",
    "bankName": "KARUR VYSYA BANK",
    "uan": "102262699092",
    "pfNo": "APHYD32471440000010010",
    "esiNo": "5222100910",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "H.No - 8-4A, Chennayapalem, Karalapadu",
    "presentAddress": "H.No - 279, Shivapuri Colony, Manikonda",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "RAMARAJYAM NAREBOYINA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RAMARAJYAM NAREBOYINA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RAMARAJYAM NAREBOYINA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RAMARAJYAM NAREBOYINA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0011",
    "name": "AKHIL PACHAMATLA",
    "designation": "OPERATIONS EXECUTIVE",
    "department": "Operations",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "599660677333",
    "pan": "EDWPA3776E",
    "mobile": "6301661315",
    "email": "akhilpachamatla@vphs.in",
    "fatherName": "Ramaraju Pachamatla",
    "doj": "29/06/2025",
    "dob": "2000-08-08",
    "bankAc": "38617614513",
    "ifsc": "SBIN0002740",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102209979276",
    "pfNo": "APHYD32471440000010001",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "H.No - 17-1, Hosing Colony,Bayyavaram Village, Kasimkota, Visakhapatnam, Andhra Pradesh, Pin Code -",
    "presentAddress": "H.No - 17-1, Hosing Colony,Bayyavaram Village, Kasimkota, Visakhapatnam, Andhra Pradesh, Pin Code -",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 26000,
      "hra": 10400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 3900,
      "gross": 43150,
      "epf": 3120,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 3120,
      "net": 40030
    },
    "documents": [
      {
        "fileName": "AKHIL PACHAMATLA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "AKHIL PACHAMATLA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "AKHIL PACHAMATLA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "AKHIL PACHAMATLA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0012",
    "name": "DHARANI KALAKOTI",
    "designation": "TALENT ACQUISITION SPECIALIST",
    "department": "Human Resources",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "4829 3847 1003",
    "pan": "ABCDE1003F",
    "mobile": "8106436976",
    "email": "dharanikalakoti@vphs.in",
    "fatherName": "Sri DHARANI Senior",
    "doj": "2025-01-07",
    "dob": "19/08/2002",
    "bankAc": "304928191003",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100003",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "",
    "presentAddress": "",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 26000,
      "hra": 10400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 3900,
      "gross": 43150,
      "epf": 3120,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 3120,
      "net": 40030
    },
    "documents": [
      {
        "fileName": "DHARANI KALAKOTI Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "DHARANI KALAKOTI PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "DHARANI KALAKOTI Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "DHARANI KALAKOTI Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0013",
    "name": "ALEKHYA S",
    "designation": "LEGAL & COMPLIANCE MANAGER",
    "department": "Legal & Compliance",
    "gender": "Female",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "838475343660",
    "pan": "BWSPA3305H",
    "mobile": "7032316764",
    "email": "alekhyas@vphs.in",
    "fatherName": "Vara Prasad",
    "doj": "2025-01-08",
    "dob": "19/07/1998",
    "bankAc": "1114104000054580",
    "ifsc": "IBKL0001114",
    "bankName": "IDBI BANK",
    "uan": "102217417906",
    "pfNo": "APHYD32471440000010005",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "Fortune Green Homes Sapphire, Flat No - 507, F - Block, Tellapur Hyderabad Telangana 502032",
    "presentAddress": "Fortune Green Homes Sapphire, Flat No - 507, F - Block, Tellapur Hyderabad Telangana 502032",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 42000,
      "hra": 16800,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 6300,
      "gross": 67950,
      "epf": 5040,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 5040,
      "net": 62910
    },
    "documents": [
      {
        "fileName": "ALEKHYA S Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ALEKHYA S PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ALEKHYA S Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ALEKHYA S Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0014",
    "name": "SRAVANI CHAPPA",
    "designation": "RECRUITMENT/TALENT ACQUISITION",
    "department": "Human Resources",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "765096545793",
    "pan": "CYHPC2693E",
    "mobile": "8328649941",
    "email": "sravanichappa@vphs.in",
    "fatherName": "Chappa Sri Rama Murthy Naidu",
    "doj": "2025-07-21",
    "dob": "2003-06-05",
    "bankAc": "36212634963",
    "ifsc": "SBIN0002754",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102225832932",
    "pfNo": "NA",
    "esiNo": "5222792307",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "90, CHAPPABUTCHAM PETA, Makkuva, Vizianagaram, Andhra Pradesh -535547",
    "presentAddress": "Mahi Girls Hostel, Dwaraka Puram, Road No - 8, Hyd",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "SRAVANI CHAPPA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SRAVANI CHAPPA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SRAVANI CHAPPA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SRAVANI CHAPPA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0015",
    "name": "RAHMATH ULLAH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "4829 3847 1006",
    "pan": "ABCDE1006F",
    "mobile": "9840000822",
    "email": "rahmathullah@vphs.in",
    "fatherName": "Sri RAHMATH Senior",
    "doj": "1990-01-01",
    "dob": "1990-01-01",
    "bankAc": "304928191006",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100006",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "",
    "presentAddress": "",
    "siteUnit": "VPHS Head Office",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 1980,
      "net": 26445
    },
    "documents": [
      {
        "fileName": "RAHMATH ULLAH Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RAHMATH ULLAH PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RAHMATH ULLAH Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RAHMATH ULLAH Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0016",
    "name": "GUGULOTHU DIVYA",
    "designation": "RECRUITMENT/TALENT ACQUISITION",
    "department": "Human Resources",
    "gender": "Female",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "730619733922",
    "pan": "EHJPG2021R",
    "mobile": "9441912363",
    "email": "gugulothudivya21@gmail.com",
    "fatherName": "Gugulothu Mangya",
    "doj": "2025-01-08",
    "dob": "23/03/2002",
    "bankAc": "60341687791",
    "ifsc": "MAHB0000943",
    "bankName": "BANK OF MAHARASHTRA",
    "uan": "102254691709",
    "pfNo": "APHYD32471440000010006",
    "esiNo": "5222293044",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "D/O: Mangya, 5-132, PARVATHAGIRI, PARVATHAGIRI MANDAL, Parvathagiri, Warangal,Telangana-506365",
    "presentAddress": "2-9-180/10 t new bharath nagar colony near kkr garden",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Active",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "GUGULOTHU DIVYA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "GUGULOTHU DIVYA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "GUGULOTHU DIVYA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "GUGULOTHU DIVYA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0017",
    "name": "ROHIT WAGHMARI",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "4829 3847 1008",
    "pan": "ABCDE1008F",
    "mobile": "9840001096",
    "email": "rohitwaghmari@vphs.in",
    "fatherName": "Sri ROHIT Senior",
    "doj": "1990-01-01",
    "dob": "1990-01-01",
    "bankAc": "304928191008",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100008",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "",
    "presentAddress": "",
    "siteUnit": "VPHS Head Office",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 1980,
      "net": 26445
    },
    "documents": [
      {
        "fileName": "ROHIT WAGHMARI Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ROHIT WAGHMARI PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ROHIT WAGHMARI Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ROHIT WAGHMARI Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0018",
    "name": "SAMIR KUMAR DHAL",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "988314095384",
    "pan": "AXSPD0398P",
    "mobile": "9777509501",
    "email": "samirkumardhal@vphs.in",
    "fatherName": "JAYARAM DHAL",
    "doj": "2025-09-08",
    "dob": "1986-06-05",
    "bankAc": "1066010166997",
    "ifsc": "PUNB0106620",
    "bankName": "PUNJAB NATIONAL BANK",
    "uan": "102302907865",
    "pfNo": "NA",
    "esiNo": "52073446699",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Village/Locality: Guhali(Part), G.P/Town: Guhali, P.S: Binjharpur, District: Jajpur",
    "presentAddress": "",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "SAMIR KUMAR DHAL Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SAMIR KUMAR DHAL PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SAMIR KUMAR DHAL Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SAMIR KUMAR DHAL Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0019",
    "name": "ANIL VEERAIAH MUDIDHE",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "4829 3847 1010",
    "pan": "ABCDE1010F",
    "mobile": "9840001370",
    "email": "anilveeraiahmudidhe@vphs.in",
    "fatherName": "Sri ANIL Senior",
    "doj": "1990-01-01",
    "dob": "1990-01-01",
    "bankAc": "304928191010",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100010",
    "pfNo": "NA",
    "esiNo": "5222371495",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "",
    "presentAddress": "",
    "siteUnit": "VPHS Head Office",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Anil Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil Medical Certificate.jpeg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil Pan card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-06-16 at 12.02.15 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-06-16 at 12.02.16 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0020",
    "name": "PRITHVIRAJ HEEREKAR",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "527443157565",
    "pan": "AFTPH7391M",
    "mobile": "9849727318",
    "email": "prithvirajheerekar870@gmail.com",
    "fatherName": "Heerekar Kanniah Lal",
    "doj": "23/08/2025",
    "dob": "1980-12-10",
    "bankAc": "30630049571",
    "ifsc": "SBIN0007640",
    "bankName": "STATE BANK OF INDIA",
    "uan": "101450899843",
    "pfNo": "APHYD32471440000010004",
    "esiNo": "5219503640",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "13-4-590/A/28, DARYABAGH, KARWAN, ASIFNAGAR,HYDERABAD, TELANGANA",
    "presentAddress": "13-4-590/A/28, DARYABAGH, KARWAN, ASIFNAGAR, HYDER",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop(Khajaguda)",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "PRITHVIRAJ HEEREKAR Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "PRITHVIRAJ HEEREKAR PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "PRITHVIRAJ HEEREKAR Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "PRITHVIRAJ HEEREKAR Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0021",
    "name": "MADHU BASA",
    "designation": "DRIVER",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "961224792562",
    "pan": "GJXPM7585N",
    "mobile": "8500361490",
    "email": "madhubasa@vphs.in",
    "fatherName": "Basa Venkata Ramulu",
    "doj": "2025-12-08",
    "dob": "1993-05-10",
    "bankAc": "62509335462",
    "ifsc": "SBIN0020319",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102254686812",
    "pfNo": "APHYD32471440000010009",
    "esiNo": "5222486621",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "10-32,Eturnagaram,Mulugu Eturnagaram Telangana",
    "presentAddress": "H.No - 12-2-22/3 Moosapet, kukatpally Telangana Hy",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 19500,
      "hra": 7800,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2925,
      "gross": 33075,
      "epf": 2340,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2540,
      "net": 30535
    },
    "documents": [
      {
        "fileName": "MADHU BASA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "MADHU BASA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "MADHU BASA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "MADHU BASA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0022",
    "name": "PRIYA SAWARE",
    "designation": "HR OPERATION EXECUTIVE",
    "department": "Human Resources",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "609356407439",
    "pan": "HLPPP2493K",
    "mobile": "9606263341",
    "email": "priyasaware@vphs.in",
    "fatherName": "Tanajirao Saware",
    "doj": "2025-02-09",
    "dob": "2000-11-06",
    "bankAc": "11062100000028",
    "ifsc": "PKGB0011062",
    "bankName": "PRAGATHI KRISHNA GRAMIN BANK",
    "uan": "102252462327",
    "pfNo": "APHYD32471440000010003",
    "esiNo": "5222461226",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "8-15 Ghatboral, Bidar Karnataka - 585418",
    "presentAddress": "4-2-370/266 Moti Singh line sultan bazar koti Hyde",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 26000,
      "hra": 10400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 3900,
      "gross": 43150,
      "epf": 3120,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 3320,
      "net": 39830
    },
    "documents": [
      {
        "fileName": "PRIYA SAWARE Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "PRIYA SAWARE PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "PRIYA SAWARE Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "PRIYA SAWARE Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0023",
    "name": "VAISHNAVI PATIL",
    "designation": "HR OPERATION EXECUTIVE",
    "department": "Human Resources",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "780582544486",
    "pan": "CNZPV0187M",
    "mobile": "8951387220",
    "email": "vaishnavipatil@vphs.in",
    "fatherName": "Chandrakant Patil",
    "doj": "2025-08-09",
    "dob": "15/08/2000",
    "bankAc": "11062100001708",
    "ifsc": "PKGB0011062",
    "bankName": "PRAGATHI KRISHNA GRAMIN BANK",
    "uan": "102248389734",
    "pfNo": "APHYD32471440000010002",
    "esiNo": "5222456818",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "50, Ghatboral, Bidar Karnataka - 585418",
    "presentAddress": "4-2-370/266 Moti Singh line sultan bazar koti Hyde",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 26000,
      "hra": 10400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 3900,
      "gross": 43150,
      "epf": 3120,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 3320,
      "net": 39830
    },
    "documents": [
      {
        "fileName": "VAISHNAVI PATIL Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "VAISHNAVI PATIL PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "VAISHNAVI PATIL Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "VAISHNAVI PATIL Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0024",
    "name": "RAMESH NANDRU",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "4829 3847 1015",
    "pan": "ABCDE1015F",
    "mobile": "9840002055",
    "email": "rameshnandru@vphs.in",
    "fatherName": "Sri RAMESH Senior",
    "doj": "1990-01-01",
    "dob": "1990-01-01",
    "bankAc": "304928191015",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100015",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "",
    "presentAddress": "",
    "siteUnit": "VPHS Head Office",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 1980,
      "net": 26445
    },
    "documents": [
      {
        "fileName": "RAMESH NANDRU Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RAMESH NANDRU PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RAMESH NANDRU Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RAMESH NANDRU Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0025",
    "name": "BALARAJU RASAMONI",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "342505259879",
    "pan": "AHKPR0302B",
    "mobile": "9640206450",
    "email": "balarajurasamoni@vphs.in",
    "fatherName": "Rasamoni Ramudu",
    "doj": "2025-01-09",
    "dob": "1973-03-02",
    "bankAc": "39965853181",
    "ifsc": "SBIN0020848",
    "bankName": "STATE BANK OF INDIA",
    "uan": "101998202997",
    "pfNo": "APHYD32471440000010007",
    "esiNo": "5220143664",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "H.No - 2-3-55/1/2/B, Shanthi Nagar Colony, Uppal, Hyderabad, Telangana - 500039",
    "presentAddress": "",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "BALARAJU RASAMONI Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "BALARAJU RASAMONI PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "BALARAJU RASAMONI Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "BALARAJU RASAMONI Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0026",
    "name": "RAGHUNATH RAO SHARANAGATA",
    "designation": "HOUSEKEEPING",
    "department": "Facility Management",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "531737317305",
    "pan": "CJHPS8402G",
    "mobile": "9010749012",
    "email": "raghunathraosharanagata@vphs.in",
    "fatherName": "Sharanagatam Narasimhulu",
    "doj": "15/10/2025",
    "dob": "1970-03-11",
    "bankAc": "34345294075",
    "ifsc": "SBIN0011660",
    "bankName": "STATE BANK OF INDIA",
    "uan": "100363189480",
    "pfNo": "APHYD32471440000010008",
    "esiNo": "5221307875",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "1-1-379/200, Jawaharnagar, Musheerabad, Hyderabad, Andhra Pradesh - 500020",
    "presentAddress": "1-1-379/200 SRT 403 JAWAHARNAGAR,CHIKADAPALLY, TEL",
    "siteUnit": "VPHS0002 - Forward Life Private Limited",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "RAGHUNATH RAO SHARANAGATA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RAGHUNATH RAO SHARANAGATA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RAGHUNATH RAO SHARANAGATA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RAGHUNATH RAO SHARANAGATA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0027",
    "name": "RANJITH KUMAR GOLLAMANDALA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "552107890580",
    "pan": "NQJPK0832E",
    "mobile": "9347394665",
    "email": "ranjithkumargollamandala@vphs.in",
    "fatherName": "GOLLAMANDALA VENKATESWARLU",
    "doj": "16/10/2025",
    "dob": "1997-10-05",
    "bankAc": "20515632233",
    "ifsc": "SBIN0014676",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102209100018",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O Venkateswarlu, ERLAPUDI,Khammam(Urban), PO:Irlapudi,DIS:Khammam,Andhra Pradesh,507182",
    "presentAddress": "",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "RANJITH KUMAR GOLLAMANDALA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RANJITH KUMAR GOLLAMANDALA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RANJITH KUMAR GOLLAMANDALA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RANJITH KUMAR GOLLAMANDALA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0028",
    "name": "JAGGAMMA UPPARI",
    "designation": "HOUSE KEEPING STAFF",
    "department": "Facility Management",
    "gender": "Female",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "623783058797",
    "pan": "CXJPJ2339D",
    "mobile": "8951195105",
    "email": "jaggammauppari@vphs.in",
    "fatherName": "UPPIRI NINGANMA",
    "doj": "15/10/2025",
    "dob": "1995-01-01",
    "bankAc": "304928191019",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100019",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Hyderabad",
    "presentAddress": "",
    "siteUnit": "VPHS0002 - Forward Life Private Limited",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "JAGGAMMA UPPARI Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "JAGGAMMA UPPARI PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "JAGGAMMA UPPARI Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "JAGGAMMA UPPARI Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0029",
    "name": "ARCHANA KAULA",
    "designation": "HOUSE KEEPING STAFF",
    "department": "Facility Management",
    "gender": "Female",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "942412945011",
    "pan": "GCUPA4953C",
    "mobile": "7036250090",
    "email": "archanakaula@vphs.in",
    "fatherName": "GHUDHE RAMESH",
    "doj": "2025-01-11",
    "dob": "28/02/1991",
    "bankAc": "54312010001516",
    "ifsc": "UBIN0805432",
    "bankName": "UNION BANK OF INDIA",
    "uan": "102268381725",
    "pfNo": "APHYD32471440000010011",
    "esiNo": "5222570430",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "8-3-231/C/241,Sri Krishna Nagar, yousuf guda, PO: Yousufguda, DIST: Hyderabad, Andhra Pradesh - 500045",
    "presentAddress": "8-3-231/C/241,Sri Krishna Nagar, yousuf guda, Tela",
    "siteUnit": "VPHS0002 - Forward Life Private Limited",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "ARCHANA KAULA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ARCHANA KAULA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ARCHANA KAULA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ARCHANA KAULA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0030",
    "name": "RICHARDSON NADVEENDHODI",
    "designation": "CHIEF OPERATING OFFICER",
    "department": "Facility Management",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "4829 3847 1021",
    "pan": "ABCDE1021F",
    "mobile": "9848885150",
    "email": "richardsonnadveendhodi@vphs.in",
    "fatherName": "Sri RICHARDSON Senior",
    "doj": "2025-01-11",
    "dob": "23/11/1995",
    "bankAc": "304928191021",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100021",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "",
    "presentAddress": "",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 2220,
      "net": 29305
    },
    "documents": [
      {
        "fileName": "RICHARDSON NADVEENDHODI Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RICHARDSON NADVEENDHODI PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RICHARDSON NADVEENDHODI Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RICHARDSON NADVEENDHODI Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0031",
    "name": "SURYA TEJA DEVARASETTI",
    "designation": "TECHNICAL SPECILIST",
    "department": "Facility Management",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "886228356247",
    "pan": "APCPD7536F",
    "mobile": "9676113113",
    "email": "suryatejadevarasetti@vphs.in",
    "fatherName": "Satyanarayana Devarasetty",
    "doj": "2025-01-11",
    "dob": "1989-04-05",
    "bankAc": "154601509505",
    "ifsc": "ICIC0006306",
    "bankName": "ICICI BANK",
    "uan": "NA",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "NA",
    "presentAddress": "NA",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 2220,
      "net": 29305
    },
    "documents": [
      {
        "fileName": "SURYA TEJA DEVARASETTI Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SURYA TEJA DEVARASETTI PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SURYA TEJA DEVARASETTI Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SURYA TEJA DEVARASETTI Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0032",
    "name": "SANJAY KESABOWEHA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "236736311214",
    "pan": "MYQPK5794K",
    "mobile": "9059230755",
    "email": "sanjaykesaboweha@vphs.in",
    "fatherName": "KESEBOWENA BALA SAIDULU",
    "doj": "2025-01-12",
    "dob": "13/12/2004",
    "bankAc": "699500031241",
    "ifsc": "YESB0000006",
    "bankName": "YES BANK",
    "uan": "NA",
    "pfNo": "NA",
    "esiNo": "5221794964",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "NA",
    "presentAddress": "NA",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "SANJAY KESABOWEHA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SANJAY KESABOWEHA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SANJAY KESABOWEHA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SANJAY KESABOWEHA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0033",
    "name": "ABDUL GOUS PASHA MOHMMAD",
    "designation": "OPERATIONS EXECUTIVE",
    "department": "Operations",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "537622311431",
    "pan": "CYGPM1657P",
    "mobile": "8686662606",
    "email": "gousbhai86@gmail.com",
    "fatherName": "ABDHULKHAYYUM Mohmmad",
    "doj": "2026-02-02",
    "dob": "1991-05-05",
    "bankAc": "50100519100792",
    "ifsc": "HDFC0008319",
    "bankName": "HDFC BANK",
    "uan": "101929116879",
    "pfNo": "APHYD32471440000010025",
    "esiNo": "5218505341",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O Mohmmad Abdul Khayyum, 8-10, Shubash Nagar, Mandal mulug, Po:Mulug,DIST: Warangal, Telangana-506343",
    "presentAddress": "S/O Mohmmad Abdul Khayyum, 8-10, Shubash Nagar, Mandal mulug, Po:Mulug,DIST: Warangal, Telangana-506343",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 26000,
      "hra": 10400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 3900,
      "gross": 43150,
      "epf": 3120,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 3320,
      "net": 39830
    },
    "documents": [
      {
        "fileName": "ABDUL GOUS PASHA MOHMMAD Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ABDUL GOUS PASHA MOHMMAD PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ABDUL GOUS PASHA MOHMMAD Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ABDUL GOUS PASHA MOHMMAD Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0034",
    "name": "FAIYAZ SHAIK",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "521793714168",
    "pan": "AJLPF0164E",
    "mobile": "9380909638",
    "email": "faiyazshaik@vphs.in",
    "fatherName": "Shabbir",
    "doj": "2026-02-02",
    "dob": "1983-11-07",
    "bankAc": "43381003360",
    "ifsc": "SBIN0020228",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102272512002",
    "pfNo": "APHYD32471440000010016",
    "esiNo": "5222791245",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "e/119 Gola , Chitapur Gulbarga Karnataka 585228",
    "presentAddress": "9C5R-747 Hafil Jalal Baba Nagar Najamnagar, Kishan Basal HyderabadTelanganaIndia502318",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "FAIYAZ SHAIK Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "FAIYAZ SHAIK PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "FAIYAZ SHAIK Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "FAIYAZ SHAIK Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0035",
    "name": "CHANDU THUMMALA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "559619509406",
    "pan": "BOPPT3228H",
    "mobile": "9618379561",
    "email": "chandusmiley5555@gmail.com",
    "fatherName": "Thummala Bal Raju",
    "doj": "2026-02-02",
    "dob": "23/09/2001",
    "bankAc": "8150627948",
    "ifsc": "KKBK0007533",
    "bankName": "KOTAK MAHINDRA BANK",
    "uan": "101702303865",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "7-1-80/3 Manohar ashok surana ameerpet, Hyderabad, Telangana-500016",
    "presentAddress": "7-1-80/3 Manohar ashok surana ameerpet, Hyderabad, Telangana-500016",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "CHANDU THUMMALA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "CHANDU THUMMALA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "CHANDU THUMMALA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "CHANDU THUMMALA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0036",
    "name": "ASHOK GANIGELU",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "705242287804",
    "pan": "BBYPG2620J",
    "mobile": "7330921866",
    "email": "ashokganigelu@vphs.in",
    "fatherName": "Ganigelu Kadapaiah",
    "doj": "2026-02-02",
    "dob": "22/11/1989",
    "bankAc": "50100750993177",
    "ifsc": "HDFC0000621",
    "bankName": "HDFC BANK",
    "uan": "101609169943",
    "pfNo": "APHYD32471440000010014",
    "esiNo": "5216708339",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "C/O Ganigele Kadapaiah, Road no2, 16/A, Jubille Hills, greater Hyderabad, Telangana-500033",
    "presentAddress": "Plotno-22 Anekapally ,Azignagar, Mohenabad   HyderabadTelanganaIndia500075",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "ASHOK GANIGELU Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ASHOK GANIGELU PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ASHOK GANIGELU Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ASHOK GANIGELU Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0037",
    "name": "ABDUL JALEEL",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "877068686089",
    "pan": "BNSPJ1340N",
    "mobile": "9381549308",
    "email": "aj304829@gmail.com",
    "fatherName": "ILAHI BAKHASH",
    "doj": "2026-02-02",
    "dob": "30/12/1992",
    "bankAc": "50100395753381",
    "ifsc": "HDFC0003788",
    "bankName": "HDFC BANK",
    "uan": "102274355401",
    "pfNo": "APHYD32471440000010019",
    "esiNo": "5222788176",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "19-5-32/A/49/F, Asad Baba Nagar, kishna bagh, bahadurpura,hyderabad,telangana 500064",
    "presentAddress": "19-5-32/A/49/F, Asad Baba Nagar, kishna bagh, bahadurpura,hyderabad,telangana 500064",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "ABDUL JALEEL Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ABDUL JALEEL PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ABDUL JALEEL Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ABDUL JALEEL Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0038",
    "name": "LOKESH KUMAR GUNDAM",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "919449749937",
    "pan": "CVIPG8230R",
    "mobile": "9100679528",
    "email": "gundamlokesh@gmail.com",
    "fatherName": "GUNDAM VASANTHU",
    "doj": "2026-02-02",
    "dob": "25/04/2000",
    "bankAc": "304928191029",
    "ifsc": "NA",
    "bankName": "State Bank of India",
    "uan": "NA",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "8-3-169/60/1376/128 Rajiv Gandhi Nagar SPR Hills Yousfguda,Hyderabad, Telangana 500045",
    "presentAddress": "8-3-169/60/1376/128 Rajiv Gandhi Nagar SPR Hills Yousfguda,Hyderabad, Telangana 500045",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "LOKESH KUMAR GUNDAM Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "LOKESH KUMAR GUNDAM PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "LOKESH KUMAR GUNDAM Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "LOKESH KUMAR GUNDAM Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0039",
    "name": "LAXMAN DURGAM",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "829892043825",
    "pan": "ATLPL5295Q",
    "mobile": "9392316059",
    "email": "laxman78930@gmail.com",
    "fatherName": "DURGAM BHIMAIAH",
    "doj": "2026-02-02",
    "dob": "28/10/1999",
    "bankAc": "545272511",
    "ifsc": "KKBK0000552",
    "bankName": "KOTAK MAHINDRA BANK",
    "uan": "102270748372",
    "pfNo": "APHYD32471440000010017",
    "esiNo": "5222787472",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "3-46, 3 Ward Chegunta Medak Telangana-502255,,Medak TG,IN 502255",
    "presentAddress": "8-3-229/D/65/ Hylom colony Venkatagiri Yousafguda Hyderabad 500045",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "LAXMAN DURGAM Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "LAXMAN DURGAM PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "LAXMAN DURGAM Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "LAXMAN DURGAM Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0040",
    "name": "DOMMETI  NAGA SAIRAM",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "564337554875",
    "pan": "NRTPS5703R",
    "mobile": "9573114589",
    "email": "airamdommeti@gmail.com",
    "fatherName": "BALI SWAMY",
    "doj": "2026-02-02",
    "dob": "14/06/1995",
    "bankAc": "005810100038019",
    "ifsc": "UBIN0800589",
    "bankName": "UNION BANK OF INDIA",
    "uan": "102270753709",
    "pfNo": "APHYD32471440000010023",
    "esiNo": "5222787966",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "1-57 Bhimalapuram Achanta Mandal West Godavari Andhra Pradesh 534266",
    "presentAddress": "49c Tarun sai boys Hostel BroMohan Talent High school Ameerpet Vengol Rao Nagar Hyderabad 500038",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "DOMMETI  NAGA SAIRAM Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "DOMMETI  NAGA SAIRAM PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "DOMMETI  NAGA SAIRAM Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "DOMMETI  NAGA SAIRAM Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0041",
    "name": "KIRAN KUMAR SINGARAPU",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "271440777998",
    "pan": "FKLPS8945E",
    "mobile": "9948009496",
    "email": "singarapukirankumar26@gmail.com",
    "fatherName": "CHANDRAIAH SINGARAPU",
    "doj": "2026-02-02",
    "dob": "1987-03-11",
    "bankAc": "62502873441",
    "ifsc": "SBIN0020097",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102272510702",
    "pfNo": "APHYD32471440000010015",
    "esiNo": "5222791578",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "7-66 main road andole mandal ,Andole medak telagana 502273",
    "presentAddress": "7-66 main road andole mandal ,Andole medak telagana 502273",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "KIRAN KUMAR SINGARAPU Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "KIRAN KUMAR SINGARAPU PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "KIRAN KUMAR SINGARAPU Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "KIRAN KUMAR SINGARAPU Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0042",
    "name": "CHINNAREDDY REDEIAH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "589685360980",
    "pan": "EJSPR7458Q",
    "mobile": "9704887247",
    "email": "chinnareddyredeiah@vphs.in",
    "fatherName": "CHINNAREDDY SUDHAKAR REDDY",
    "doj": "2026-02-02",
    "dob": "1998-06-03",
    "bankAc": "52210708451",
    "ifsc": "SBIN0020076",
    "bankName": "STATE BANK OF INDIA",
    "uan": "100981177590",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Chinnareddy sudhakar Reddy,0, Upparapalli, Konduru(Panchayath), Kondur,Cuddapah, Andhra Pradesh-516127",
    "presentAddress": "TRR Boys Hostel Balaji Nagar MJ Colony Kukatpally 500072",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "CHINNAREDDY REDEIAH Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "CHINNAREDDY REDEIAH PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "CHINNAREDDY REDEIAH Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "CHINNAREDDY REDEIAH Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0043",
    "name": "SRIKANTH BOMMALA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "771940089960",
    "pan": "EBVPB5350N",
    "mobile": "8074362327",
    "email": "srikanthbommala@vphs.in",
    "fatherName": "HANMANDLU BOMMALA",
    "doj": "2026-02-02",
    "dob": "1998-09-12",
    "bankAc": "35289797629",
    "ifsc": "SBIN0012969",
    "bankName": "STATE BANK OF INDIA",
    "uan": "101425494255",
    "pfNo": "APHYD32471440000010022",
    "esiNo": "5222787296",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "10-36 hanmandlu colony ,pitlam kamareddy 503310",
    "presentAddress": "s/o:Bommala Hanmandlu,Hn 10-36, hanuman colony,pitlam mandal,pitlam kamareddy  503310",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "SRIKANTH BOMMALA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SRIKANTH BOMMALA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SRIKANTH BOMMALA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SRIKANTH BOMMALA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0044",
    "name": "WASEEM AKRAM",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "726573206901",
    "pan": "ABYPW8944Q",
    "mobile": "8197413143",
    "email": "waseemakram19881784235@gmail.com",
    "fatherName": "M.A.Quddus",
    "doj": "2026-02-02",
    "dob": "27/06/1988",
    "bankAc": "100260002612",
    "ifsc": "INDB0002033",
    "bankName": "INDUSIND BANK",
    "uan": "102270763009",
    "pfNo": "APHYD32471440000010021",
    "esiNo": "5222788762",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "3-3-52- Noor Khan Taleem Bidar BidarKarnataka, 585401",
    "presentAddress": "murad nagar choti masjid 500028 ,HyderabadTelangana",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "WASEEM AKRAM Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "WASEEM AKRAM PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "WASEEM AKRAM Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "WASEEM AKRAM Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0045",
    "name": "ARBAZ UDDIN MOHAMMED",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "224395778025",
    "pan": "ANSPU0246R",
    "mobile": "7075486694",
    "email": "mohdarbaz6694@gmail.com",
    "fatherName": "Mohammed Riyaz Ahmed",
    "doj": "2026-02-02",
    "dob": "23/09/2003",
    "bankAc": "50100644475730",
    "ifsc": "HDFC0006275",
    "bankName": "HDFC BANK",
    "uan": "101979657667",
    "pfNo": "APHYD32471440000010020",
    "esiNo": "5219912520",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Rajiv Gandhi Nagar , Near Govt School , Hyderabad,Rangareddy,Telangana-500005",
    "presentAddress": "Rajiv Gandhi Nagar , Near Govt School , Hyderabad,Rangareddy,Telangana-500005",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "ARBAZ UDDIN MOHAMMED Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ARBAZ UDDIN MOHAMMED PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ARBAZ UDDIN MOHAMMED Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ARBAZ UDDIN MOHAMMED Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0046",
    "name": "MOHAMMED SHAHED AYAN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "513413927790",
    "pan": "EMIPA5952F",
    "mobile": "9581166271",
    "email": "mohammedshahedayan1@gmail.com",
    "fatherName": "Mohammad Osman",
    "doj": "2026-02-02",
    "dob": "2003-12-08",
    "bankAc": "35153238757",
    "ifsc": "SBIN0020356",
    "bankName": "STATE BANK OF INDIA",
    "uan": "101649546416",
    "pfNo": "APHYD32471440000010018",
    "esiNo": "5222790804",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O mohammed Osman 18-13-9/69/F, Rajiv Gandhi Nagar Bandlaguda Hyderabad Andhra Pradesh-500005",
    "presentAddress": "18-13-9/69/F,rajiv gandhi nagar, Bandlaguda, Andhra Pradesh, Alluri Sitharama Raju",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "ayan adharcrad .pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Ayan current bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Ayan DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Ayan Medical certificate.pdf",
        "type": "PDF",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Ayan pan .jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Ayan PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-06-16 at 1.37.16 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0047",
    "name": "PRANJAL DIHINGIA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "988651214558",
    "pan": "GBNPD1396A",
    "mobile": "8011669384",
    "email": "pranjaldihingia824@gmail.com",
    "fatherName": "MINU dihingia",
    "doj": "2026-02-02",
    "dob": "19/07/1999",
    "bankAc": "36906392221",
    "ifsc": "SBIN0004318",
    "bankName": "STATE BANK OF INDIA",
    "uan": "101656298554",
    "pfNo": "APHYD32471440000010024",
    "esiNo": "4301848112",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O:late Tankeswar Dihingia,Parbatipur,Gobindrapur, Dhemaji,Assam-787035 AssamAssamIndia787035",
    "presentAddress": "S/O:late Tankeswar Dihingia,Parbatipur,Gobindrapur, Dhemaji,Assam-787035 AssamAssamIndia787035",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "PRANJAL DIHINGIA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "PRANJAL DIHINGIA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "PRANJAL DIHINGIA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "PRANJAL DIHINGIA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0048",
    "name": "ASHA CHOWDADA",
    "designation": "EXECUTIVE ASSISTANT",
    "department": "Facility Management",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "200824715226",
    "pan": "BWFPC5408J",
    "mobile": "6309742319",
    "email": "ashachowdada@vphs.in",
    "fatherName": "Chowdada Satyanarayana",
    "doj": "2026-02-05",
    "dob": "21/09/1997",
    "bankAc": "34279690594",
    "ifsc": "SBIN0004700",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102297908593",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "NO",
    "esiDeduct": "NO",
    "permanentAddress": "4-130/A, KS Talkies Road,Rambabu Hospital opposite street,Bapulpadu mandal,Bapulpadu,Hanuman Junction,Krishna Dist , Andhra Pradesh -521105",
    "presentAddress": "Flat no .302, Gatla Residency, 1, H, Plot No. 178/B, Kondapur, Raghavendra Colony, Hyderabad, Telangana 500084",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Inactive",
    "salary": {
      "basic": 26000,
      "hra": 10400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 3900,
      "gross": 43150,
      "epf": 3120,
      "esi": 0,
      "pt": 0,
      "totalDeductions": 3120,
      "net": 40030
    },
    "documents": [
      {
        "fileName": "ASHA CHOWDADA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ASHA CHOWDADA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ASHA CHOWDADA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ASHA CHOWDADA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0049",
    "name": "IRFAN MOHD",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "664548693785",
    "pan": "AKXPI4317B",
    "mobile": "9381199515",
    "email": "irfanmohd@vphs.in",
    "fatherName": "MOHD QADEER",
    "doj": "2026-02-02",
    "dob": "1994-01-01",
    "bankAc": "9314713071",
    "ifsc": "KKBK0007474",
    "bankName": "KOTAK MAHINDRA BANK",
    "uan": "102209100040",
    "pfNo": "NA",
    "esiNo": "5222791049",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Kothapet Saroornagar, Rangareddi 500005,HyderabadTelangana, India",
    "presentAddress": "3-131 Arfath colony Kothapet Rangareddi Hyderabad",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "IRFAN MOHD Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "IRFAN MOHD PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "IRFAN MOHD Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "IRFAN MOHD Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0050",
    "name": "SHAIK ABDUL REHAN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "644550414671",
    "pan": "HDBPR1578F",
    "mobile": "9052115109",
    "email": "skabdulrehan93@gmail.com",
    "fatherName": "ABDUL SAMAD",
    "doj": "2026-02-02",
    "dob": "22/03/2005",
    "bankAc": "206412010003977",
    "ifsc": "UBIN0820644",
    "bankName": "UNION BANK OF INDIA",
    "uan": "102299709764",
    "pfNo": "APHYD32471440000010031",
    "esiNo": "5222913744",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Plot no 4/1 sy no 8/a rajiv gandhi nagar Bandlaguda Hyderabad Telangana-500005",
    "presentAddress": "Plot no 4/1 sy no 8/a rajiv gandhi nagar Bandlaguda Hyderabad Telangana-500005",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Rehan Aaadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rehan cureent bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rehan DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rehan Medical Certificate.jpeg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rehan Pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rehan Pic.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "rehan PVC.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0051",
    "name": "ADAM SHA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "957143388766",
    "pan": "DVXPA1736A",
    "mobile": "8861220703",
    "email": "damshaadamsha112@gmail.com",
    "fatherName": "BABU SHA",
    "doj": "2026-02-03",
    "dob": "2001-01-01",
    "bankAc": "437001514724",
    "ifsc": "ICIC0004370",
    "bankName": "ICICI BANK",
    "uan": "101582361504",
    "pfNo": "APHYD32471440000010030",
    "esiNo": "5221665645",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Babu sha,177, near majid, Diggon, Dist: Gulbarga, karnataka,585211",
    "presentAddress": "H.No 1-119 Chada Nagar Bhel, Lingampally, Telangana-500050",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Adam sha Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Adam sha Current bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Adam Sha Medical.jpeg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Adam sha pic.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Adam sha PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "sha Current bill1.pdf",
        "type": "PDF",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "sha DL (1).pdf",
        "type": "PDF",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "sha DL.pdf",
        "type": "PDF",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "sha pan (1).pdf",
        "type": "PDF",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0052",
    "name": "Supriya Gundreddy",
    "designation": "Hr & Fainance Lead",
    "department": "Facility Management",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "890391625723",
    "pan": "KWZPS2137H",
    "mobile": "8977035208",
    "email": "gundreddysupriya1997@gmail.com",
    "fatherName": "Dharma reddy",
    "doj": "16/02/2026",
    "dob": "24/07/1997",
    "bankAc": "50100561330050",
    "ifsc": "HDFC0002083",
    "bankName": "HDFC BANK",
    "uan": "101282384810",
    "pfNo": "APHYD32471440000010028",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "NO",
    "permanentAddress": "D/O Gundreddy dharmareddy ,2-12, Nandikunta, kathapalk",
    "presentAddress": "Mahaderpur colony kphb colony, Hyderabad-500117",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Active",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "Supriya Gundreddy Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "Supriya Gundreddy PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "Supriya Gundreddy Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "Supriya Gundreddy Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0053",
    "name": "BADAVATH RAMDAS",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "746430226911",
    "pan": "BACPB5520P",
    "mobile": "8463976158",
    "email": "badavathramdas@vphs.in",
    "fatherName": "Sampla Badavath",
    "doj": "23/02/2026",
    "dob": "20/06/1986",
    "bankAc": "99980128923583",
    "ifsc": "FDRL0001332",
    "bankName": "FEDERAL  BANK",
    "uan": "101517623466",
    "pfNo": "NA",
    "esiNo": "NA",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O Badavath Sampla 2-1-312/1 SCBC Colony Dornakal Warangal -506381",
    "presentAddress": "S/O Badavath Sampla 2-1-312/1 SCBC Colony Dornakal Warangal -506381",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "BADAVATH RAMDAS Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "BADAVATH RAMDAS PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "BADAVATH RAMDAS Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "BADAVATH RAMDAS Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0054",
    "name": "K.RAHUL KUMAR",
    "designation": "REGIONAL MANAGER",
    "department": "Facility Management",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "770360162676",
    "pan": "PBOPK6319A",
    "mobile": "7702956161",
    "email": "rahulsac2024@gmail.com",
    "fatherName": "Sri K.RAHUL Senior",
    "doj": "2026-06-03",
    "dob": "1990-08-03",
    "bankAc": "003121711540568",
    "ifsc": "JIOP0000001",
    "bankName": "State Bank of India",
    "uan": "101317183368",
    "pfNo": "APHYD32471440000010038",
    "esiNo": "5222100045",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "2-41/2, Hanuman nagar ootpally,shamshabad, hyderabad, Telangana-501218",
    "presentAddress": "2-41/2, Hanuman nagar ootpally,shamshabad, hyderabad, Telangana-501218",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Active",
    "salary": {
      "basic": 42000,
      "hra": 16800,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 6300,
      "gross": 67950,
      "epf": 5040,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 5240,
      "net": 62710
    },
    "documents": [
      {
        "fileName": "Document from K RAHUL KUMAR.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahul Aadher1.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahul Pan1.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahul PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0055",
    "name": "DESHAVALI SAI PRANEETH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "638944197002",
    "pan": "QXRPS1346R",
    "mobile": "9502830481",
    "email": "desavalipraneeth@gmail.com",
    "fatherName": "Srikanth",
    "doj": "2026-07-04",
    "dob": "2005-07-01",
    "bankAc": "3147306790",
    "ifsc": "KKBK0007487",
    "bankName": "KOTAK MAHINDRA BANK",
    "uan": "102330018801",
    "pfNo": "APHYD32471440000010032",
    "esiNo": "5223078335",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "5-4-6/2 bhavani colony be sid bhavani temple Premavathipet Rajendra nagar Andhra Pradesh - 500052",
    "presentAddress": "F No 1430 Janapriya Utopia Hyderguda, Attapur",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "DESHAVALI SAI PRANEETH Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "DESHAVALI SAI PRANEETH PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "DESHAVALI SAI PRANEETH Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "DESHAVALI SAI PRANEETH Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0056",
    "name": "BUGGA DAKSHINYA DEEP",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "847003767798",
    "pan": "KMUPD8709M",
    "mobile": "7671038472",
    "email": "dakshinyadeep@gmail.com",
    "fatherName": "Pradeep Kumar",
    "doj": "2026-07-04",
    "dob": "2006-04-01",
    "bankAc": "45103000590",
    "ifsc": "SBIN0020070",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102338022809",
    "pfNo": "APHYD32471440000010037",
    "esiNo": "5223082951",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Flat No 313 Shivasai Residency H.No. 3-3-110/SSR/313 Nalanda nagar Hyderguda, Attapur, Hyderabad-500048",
    "presentAddress": "Flat No.246,MIG, 1st floor, Huda colony Phase-1, Rambagh, Attapur,.500048",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Dakshinya Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "dakshinya Current adrees.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "dakshinya deep pic.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "dakshinya pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Dakshinyya DL.pdf",
        "type": "PDF",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Document from B DAKSHINYA DEEP medical.pdf",
        "type": "PDF",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0057",
    "name": "MOHD AMEER KHAN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "M",
    "empType": "Permenant",
    "aadhar": "863143234315",
    "pan": "ABCDE1048F",
    "mobile": "9704361707",
    "email": "mdameer65453@gmail.com",
    "fatherName": "Sri MOHD Senior",
    "doj": "2026-02-02",
    "dob": "1998-05-12",
    "bankAc": "304928191048",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100048",
    "pfNo": "APHYD32471440000011048",
    "esiNo": "5222100048",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "19-5-482/A/97 Kishan bagh HYD,  Bahadurpura, Hyderabad-500064",
    "presentAddress": "SY.NO.23/AA/4/2 Mutrajpally",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Maqsood Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood medical (1).jpg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood medical (2).jpg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood Pass port.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood Passport Back.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqssod Current bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-07-08 at 3.42.26 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0058",
    "name": "RIZWAN AHMED",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "475982502736",
    "pan": "EEPPR2282E",
    "mobile": "7703070353",
    "email": "lucknow770307@gmail.com",
    "fatherName": "Iqbal Ahmad",
    "doj": "2026-06-04",
    "dob": "1994-03-05",
    "bankAc": "304928191049",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100049",
    "pfNo": "APHYD32471440000011049",
    "esiNo": "5222100049",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "20,Shiv nagar, Rahim Nagar, Aliganj, Lucknow, Uttar pradesh-226024",
    "presentAddress": "20,Shiv nagar, Rahim Nagar, Aliganj, Lucknow, Uttar pradesh-226024",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "RIZWAN AHMED Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "RIZWAN AHMED PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "RIZWAN AHMED Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "RIZWAN AHMED Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0059",
    "name": "THIRANDAS SRINIVAS",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "533392775419",
    "pan": "ADJPT1969P",
    "mobile": "8247562925",
    "email": "thirandassrinivas@vphs.in",
    "fatherName": "Narsimha",
    "doj": "2026-06-04",
    "dob": "22/05/1979",
    "bankAc": "304928191050",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100050",
    "pfNo": "APHYD32471440000011050",
    "esiNo": "5222100050",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "14-139 Sai nagar COLONY Nadargul, Saroornagar Rangareddi Andhra Pradesh-500058",
    "presentAddress": "H.No-3326,3rd Block Janapriya Appartments Balapur X roads, Hyderabad ,Telangana-500058",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "THIRANDAS SRINIVAS Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "THIRANDAS SRINIVAS PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "THIRANDAS SRINIVAS Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "THIRANDAS SRINIVAS Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0060",
    "name": "PICHAKUNTLA RAMESH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "325388812834",
    "pan": "GHAPR0349G",
    "mobile": "9100707161",
    "email": "rameshp252616@gmail.com",
    "fatherName": "Laximaiah",
    "doj": "13/04/2026",
    "dob": "29/09/2004",
    "bankAc": "304928191051",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100051",
    "pfNo": "APHYD32471440000011051",
    "esiNo": "5222100051",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "2-29 Chowdarpally, Bomraspet Mandal,vikarabad,Telangana-509350",
    "presentAddress": "13-06-449/58 Gudimalkapur new sai nagar colony, Hyderabad Telanganas-500008",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "PICHAKUNTLA RAMESH Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "PICHAKUNTLA RAMESH PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "PICHAKUNTLA RAMESH Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "PICHAKUNTLA RAMESH Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0061",
    "name": "MOHAMMED DAWOOD",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "75510816250",
    "pan": "GVJPD0898D",
    "mobile": "9491904281",
    "email": "mohammeddawood464@gmail.com",
    "fatherName": "Abdul Raouf",
    "doj": "31/03/2026",
    "dob": "2002-08-09",
    "bankAc": "62238802617",
    "ifsc": "SBIN0020356",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102034522174",
    "pfNo": "APHYD32471440000010044",
    "esiNo": "5220342835",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "18-13-9/101/4/1, Rajiv Gandhi Nagar, Bandlaguda, Hyderabad, Telangana-500005",
    "presentAddress": "18-2-45/C/7 Ghazi EMillath Colo Chandrayangutta,hyd",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Dawood Aadher Back.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "dawood Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "dawood Current Bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Dawood DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Dawood Medical (2).jpg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Dawood Medical.jpg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "DAWOOD PAN.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Dawood photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Dawood PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0062",
    "name": "GANDIKOTA ANIL",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "461437825499",
    "pan": "DSAPG9761F",
    "mobile": "7989909607",
    "email": "ganilkumarsahoo007@gmail.com",
    "fatherName": "Yadaiah",
    "doj": "2026-02-04",
    "dob": "2001-11-02",
    "bankAc": "40643662603",
    "ifsc": "SBIN0016524",
    "bankName": "STATE BANK OF INDIA",
    "uan": "101959699236",
    "pfNo": "APHYD32471440000010035",
    "esiNo": "5219948257",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "8-2-613/F/162 Uday Nagar Road No 11 Banjara hills Khairatabad, Telangana-500034",
    "presentAddress": "8-2-613/78/G/180 G.S. NGR RD NO 10",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Anil Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil Medical Certificate.jpeg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil Pan card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Anil PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-06-16 at 12.02.15 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-06-16 at 12.02.16 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0063",
    "name": "DONTI HARISH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "461035527243",
    "pan": "BOHPH6666H",
    "mobile": "8247703447",
    "email": "donthiharish2006@gmail.com",
    "fatherName": "Sri DONTI Senior",
    "doj": "20/04/2026",
    "dob": "21/08/2006",
    "bankAc": "80940100006005",
    "ifsc": "BARBOATTAPU",
    "bankName": "BANK OF BARODA",
    "uan": "102209100054",
    "pfNo": "APHYD32471440000011054",
    "esiNo": "5222100054",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "C/O Donti Krishnam raju 4-6-192/2/A Pandu Ranga Nagar Attapur Rajrndranagar, Hyderabad,Telangana-500048",
    "presentAddress": "4-6-192/2/A Attapur village GHMC, Rajendranagar Circle",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from DONTI HARISH.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "DONETI HARISH.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "harish Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Harish current bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Harish Dl Back.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Harish DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "harishpan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0064",
    "name": "MOHAMMED AAMIR KHAN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "246223987443",
    "pan": "EQVPM1269J",
    "mobile": "9515235571",
    "email": "frankamirkhan97@gmail.com",
    "fatherName": "Sri MOHAMMED Senior",
    "doj": "20/04/2026",
    "dob": "1997-08-03",
    "bankAc": "9947000100048758",
    "ifsc": "PUNB0994700",
    "bankName": "PUNJAB NATIONAL BANK",
    "uan": "101962646975",
    "pfNo": "APHYD32471440000010039",
    "esiNo": "5219941321",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "H NO 2-25, Gajwel Mandal,Mutrajpalle, Medak, Andhra Pradesh-502278",
    "presentAddress": "SY.NO.23/AA/4/2 MUTRAJPALLY",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "MOHAMMED AAMIR KHAN Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "MOHAMMED AAMIR KHAN PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "MOHAMMED AAMIR KHAN Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "MOHAMMED AAMIR KHAN Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0065",
    "name": "SYED MEHRAJ",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "965947672716",
    "pan": "KAKPS2718P",
    "mobile": "8520921042",
    "email": "Syedmehraj246@gmail.com",
    "fatherName": "Sri SYED Senior",
    "doj": "20/04/2026",
    "dob": "1995-10-05",
    "bankAc": "56480100013791",
    "ifsc": "BARBOARMOOR",
    "bankName": "BANK OF BARODA",
    "uan": "102209100056",
    "pfNo": "APHYD32471440000011056",
    "esiNo": "5222100056",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "SYED Ahmed, H NO 1-5-118/5/2/A Zirayath nagar, Armur muncipality, armur, Nizamabad Telangana-503224",
    "presentAddress": "9-4-135 Toli Chowki  Hyderabad",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "SYED MEHRAJ Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SYED MEHRAJ PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SYED MEHRAJ Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SYED MEHRAJ Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0066",
    "name": "SAMEER",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "4829 3847 1057",
    "pan": "ABCDE1057F",
    "mobile": "9840007809",
    "email": "sameer@vphs.in",
    "fatherName": "Sri SAMEER Senior",
    "doj": "2025-01-15",
    "dob": "1998-05-12",
    "bankAc": "304928191057",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100057",
    "pfNo": "APHYD32471440000011057",
    "esiNo": "5222100057",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Hyderabad, Telangana",
    "presentAddress": "Hyderabad, Telangana",
    "siteUnit": "VPHS0003 - Third Wave Coffee Shop",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "SAMEER Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SAMEER PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SAMEER Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SAMEER Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0067",
    "name": "POTHUGUNTA CHINNA NAVEEN KUMAR",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "595577867507",
    "pan": "CLLPP4787R",
    "mobile": "7207221992",
    "email": "chinninaveen4@gmail.com",
    "fatherName": "Sri POTHUGUNTA Senior",
    "doj": "28/04/2026",
    "dob": "15/08/1995",
    "bankAc": "520101030588010",
    "ifsc": "UBIN0814105",
    "bankName": "UNION BANK OF INDIA",
    "uan": "100483331905",
    "pfNo": "APHYD32471440000010036",
    "esiNo": "5223081999",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "H NO 5-1-149,Premavathipet, Bhavani Colony, K.v. Rangareedy, Telangana-500030",
    "presentAddress": "5-1-149,Premavathipet",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from P CHINNA NAVEEN KUMAR.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen Cureent Bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "naveen Pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen Pic1.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0068",
    "name": "VASAMSETTI VEERA SAI",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "722379907635",
    "pan": "OKCPS6233K",
    "mobile": "7075957780",
    "email": "veerasaindlm@gmail.com",
    "fatherName": "Ramakrishna",
    "doj": "2025-05-05",
    "dob": "16/12/2002",
    "bankAc": "40537415917",
    "ifsc": "SBIN0014183",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102121132260",
    "pfNo": "APHYD32471440000010033",
    "esiNo": "5221342556",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "3-102 Nerelamma Colony Indrapalem Kakinada Rural East Godavari Andhrapradesh-533006",
    "presentAddress": "Myscape guest house flat no.503 My scape road, financial district Hyderabad,500082",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from VASAMSETTI VEERA SAI.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "sai current bill.pdf",
        "type": "PDF",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "veera sai Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Veera sai DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Veera sai pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "VEERA SAI PIC.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Veerasai DL back.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Veerasai PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0069",
    "name": "MEKALA NARESH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "513850235955",
    "pan": "CRGPN7242G",
    "mobile": "9347471757",
    "email": "nareshkrish884@gmail.com",
    "fatherName": "Sri MEKALA Senior",
    "doj": "2026-11-05",
    "dob": "2003-10-05",
    "bankAc": "37897008404",
    "ifsc": "SBIN0004694",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102093164128",
    "pfNo": "APHYD32471440000010034",
    "esiNo": "5221044847",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "13-19/3 Nadimi geri Bheempur Maddur Mahabubnagar Telangana-509411",
    "presentAddress": "H NO 1-119",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from MEKALA NARESH.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naresh Aadher 1.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naresh current biil.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naresh DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "naresh Pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "NARESH PIC.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "NARESH PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0070",
    "name": "Ruhul Alom Barbhuiya",
    "designation": "Facility Associate",
    "department": "Facility Management",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "887163139570",
    "pan": "ABCDE1061F",
    "mobile": "6001673911",
    "email": "ruhulalombarbhuiya@vphs.in",
    "fatherName": "Haydar Hussain Barbhuiya",
    "doj": "28/04/2026",
    "dob": "2002-10-03",
    "bankAc": "99980124311130",
    "ifsc": "FDRL0002378",
    "bankName": "FEDERAL  BANK",
    "uan": "102209100061",
    "pfNo": "APHYD32471440000011061",
    "esiNo": "5222100061",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "C/O: Haydar Hussain Barbhuiya, VILL- Bhatirkupa, Chandipur Grant, Chandipur, Algapur,Dist: Hailakandi, Assam-788150",
    "presentAddress": "C/O: Haydar Hussain Barbhuiya, VILL- Bhatirkupa, Chandipur Grant, Chandipur, Algapur,Dist: Hailakandi, Assam-788150",
    "siteUnit": "Harleys",
    "status": "Inactive",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "Ruhul Alom Barbhuiya Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "Ruhul Alom Barbhuiya PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "Ruhul Alom Barbhuiya Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "Ruhul Alom Barbhuiya Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0071",
    "name": "HASSAN AHMED BARBHUIYA",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "244814020015",
    "pan": "EAPPB3901N",
    "mobile": "9840008494",
    "email": "hassanahmedbarbhuiya@vphs.in",
    "fatherName": "Sri HASSAN Senior",
    "doj": "2026-10-06",
    "dob": "28/08/2000",
    "bankAc": "503618210002657",
    "ifsc": "BKID0005036",
    "bankName": "BANK OF INDIA",
    "uan": "102209100062",
    "pfNo": "APHYD32471440000011062",
    "esiNo": "5222100062",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "C/O: Abdul kalam barbhuiya,11 c, Algapur pt , PO: Kalibari Bazar, Dist:Hailkandi, Assam-788150",
    "presentAddress": "C/O: Abdul kalam barbhuiya,11 c, Algapur pt , PO: Kalibari Bazar, Dist:Hailkandi, Assam-788150",
    "siteUnit": "Harleys",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "HASSAN AHMED BARBHUIYA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "HASSAN AHMED BARBHUIYA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "HASSAN AHMED BARBHUIYA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "HASSAN AHMED BARBHUIYA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0072",
    "name": "JETTTUR NAVEEN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "288802853041",
    "pan": "DADPJ8613Q",
    "mobile": "9014790665",
    "email": "funwithtinku0@gmail.com",
    "fatherName": "Sri JETTTUR Senior",
    "doj": "2026-12-06",
    "dob": "2006-05-09",
    "bankAc": "42081993625",
    "ifsc": "SBIN0020417",
    "bankName": "STATE BANK OF INDIA",
    "uan": "1022942786657",
    "pfNo": "APHYD32471440000011063",
    "esiNo": "5222100063",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Jettur jarnppa,2-105,ICL,  Tanduru,Malkapur, K.v. Rangareddy, Telangana-501158",
    "presentAddress": "Plot no 503 Komarambeem colony Tellapoor",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from P CHINNA NAVEEN KUMAR.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen Cureent Bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "naveen Pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen Pic1.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Naveen PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0073",
    "name": "TONY ALEXANDER",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "724168749493",
    "pan": "BGYPA3148Q",
    "mobile": "99082 15718",
    "email": "tonyalexander@vphs.in",
    "fatherName": "Sri TONY Senior",
    "doj": "2025-01-15",
    "dob": "1990-01-03",
    "bankAc": "304928191064",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100064",
    "pfNo": "APHYD32471440000011064",
    "esiNo": "5222100064",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Tony ,31-30, Ramakrishna puram, Secundrabad,Dist:Hyderabad-500056",
    "presentAddress": "S/O: Tony ,31-30, Ramakrishna puram, Secundrabad,Dist:Hyderabad-500056",
    "siteUnit": "Third Wave Coffe Shop((Sainikpuri)",
    "status": "Inactive",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "TONY ALEXANDER Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "TONY ALEXANDER PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "TONY ALEXANDER Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "TONY ALEXANDER Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0074",
    "name": "SHAHNOOR KHAN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "4829 3847 1065",
    "pan": "PQMPK9215G",
    "mobile": "70133 84009",
    "email": "shahnoorkhan@vphs.in",
    "fatherName": "Sri SHAHNOOR Senior",
    "doj": "2026-10-06",
    "dob": "15/10/2000",
    "bankAc": "304928191065",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100065",
    "pfNo": "APHYD32471440000011065",
    "esiNo": "5222100065",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Hyderabad, Telangana",
    "presentAddress": "Hyderabad, Telangana",
    "siteUnit": "Third Wave Coffe Shop((Banjara hills)",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "SHAHNOOR KHAN Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "SHAHNOOR KHAN PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "SHAHNOOR KHAN Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "SHAHNOOR KHAN Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0075",
    "name": "KUMMARI SURESH",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "251877980660",
    "pan": "EQCPS0615F",
    "mobile": "9581074021",
    "email": "kmmrisuresh@gmail.com",
    "fatherName": "Sri KUMMARI Senior",
    "doj": "22/06/2026",
    "dob": "17/07/1992",
    "bankAc": "7308635036-2",
    "ifsc": "APGV0007202",
    "bankName": "ANDHRA PRADESH GRAMEENA VIKAS BANK",
    "uan": "101867876748",
    "pfNo": "APHYD32471440000010040",
    "esiNo": "5222864726",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "H.NO:2-79, Kummarivada,Kothakota mandal ,RAmakrishnapur,Apparala,Dist: Mahabubnagar,Telangana-509110",
    "presentAddress": "5-75/B.H.S Darga Sha",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from KUMMARI SURESH.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Kummari suresh Aadher.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Kummari Suresh curren bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Kummari Suresh curren bill.pdf",
        "type": "PDF",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Kummari Suresh Pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Suresh DL1.pdf",
        "type": "PDF",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0076",
    "name": "ZOHEB TANVEER",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "686391730666",
    "pan": "CMPPT4375Q",
    "mobile": "9182184358",
    "email": "mdzohebtanveer@gmail.com",
    "fatherName": "Sri ZOHEB Senior",
    "doj": "2026-01-07",
    "dob": "2003-11-03",
    "bankAc": "5648518238",
    "ifsc": "KKBK0007488",
    "bankName": "KOTAK MAHINDRA BANK",
    "uan": "102284387684",
    "pfNo": "APHYD32471440000010042",
    "esiNo": "5223232246",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Shaik Hyder 8-3-228/678/1341/A Sriram Nagar Yousufguda,Hyderabad ,Telangana-500045",
    "presentAddress": "SYNO-64 Safdar nagar Moosapet,Balajinagar",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "ZOHEB TANVEER Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "ZOHEB TANVEER PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "ZOHEB TANVEER Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "ZOHEB TANVEER Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0077",
    "name": "JATWAR DHEERAJ KUMAR",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "477577122801",
    "pan": "CGGPJ7199P",
    "mobile": "8815835078",
    "email": "jatwardheeraj996@gmail.com",
    "fatherName": "Sri JATWAR Senior",
    "doj": "24/06/2026",
    "dob": "1998-04-06",
    "bankAc": "105522010000886",
    "ifsc": "UBIN0910554",
    "bankName": "UNION BANK OF INDIA",
    "uan": "101812733026",
    "pfNo": "APHYD32471440000010041",
    "esiNo": "5218398479",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Gridhargopal jatwar,798, rambhatha, thathari, PO: Thathari, DIST: Janjgir-champa, Chhattisgarh-495690",
    "presentAddress": "3-46/1/4/12 Gowi Iddodi",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "JATWAR DHEERAJ KUMAR Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "JATWAR DHEERAJ KUMAR PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "JATWAR DHEERAJ KUMAR Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "JATWAR DHEERAJ KUMAR Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0078",
    "name": "RAHIL AZAM",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "777345596931",
    "pan": "FDLPA8263C",
    "mobile": "9959607828",
    "email": "mdrahilazam93@gmail.com",
    "fatherName": "Sri RAHIL Senior",
    "doj": "2026-01-07",
    "dob": "15/12/2004",
    "bankAc": "5048416141",
    "ifsc": "KKBK0007492",
    "bankName": "KOTAK MAHINDRA BANK",
    "uan": "102357853648",
    "pfNo": "APHYD32471440000010043",
    "esiNo": "5223236357",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O:Shaik Hyder, 8-3-228/678/1341/A, Sriramnagar,Yousufguda,Hyderabad,Telangana-500045",
    "presentAddress": "SYNO-64 Safdar nagar Moosapet,Balajinagar",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Document from RAHIL AZAM.pdf",
        "type": "PDF",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahil Azam Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahil Azam Current bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahil Azam DL Back.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahil Azam DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahil Azam Pan.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Rahil Azam Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0079",
    "name": "MOHD MAQSOOD",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "671025006716",
    "pan": "CIGPM7989G",
    "mobile": "9618092455",
    "email": "mohdmaqsood786@gmail.com",
    "fatherName": "Sri MOHD Senior",
    "doj": "2026-08-07",
    "dob": "1990-07-12",
    "bankAc": "206412010002804",
    "ifsc": "UBIN0820644",
    "bankName": "UNION BANK OF INDIA",
    "uan": "102209100070",
    "pfNo": "APHYD32471440000011070",
    "esiNo": "5211704598",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Mohd Maqbool 18-13-9/101/4/1 Rajiv Gandhi Nagar Bandlaguda opp juma masjid Bandlaguda Hyderabad ,Telangana-500005",
    "presentAddress": "18-13-9/101/4/1,Ragiv Dgandhi nagar,East Bandla guda, RJNR",
    "siteUnit": "VPHS0004 - Microsoft India (R & D) Pvt. Ltd",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "Maqsood Aadher.jpeg",
        "type": "IMAGE",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood DL.jpeg",
        "type": "IMAGE",
        "category": "Driving License",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood medical (1).jpg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood medical (2).jpg",
        "type": "IMAGE",
        "category": "Medical Certificate",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood Pass port.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood Passport Back.jpeg",
        "type": "IMAGE",
        "category": "Verification Document",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqsood PVC.jpeg",
        "type": "IMAGE",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "Maqssod Current bill.jpeg",
        "type": "IMAGE",
        "category": "Address/Utility Bill",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      },
      {
        "fileName": "WhatsApp Image 2026-07-08 at 3.42.26 PM.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-08-15",
        "verified": true,
        "size": "1.2 MB"
      }
    ]
  },
  {
    "id": "VPHS0080",
    "name": "KOMARAVALLI RAJASHEKAR",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Married",
    "empType": "Permenant",
    "aadhar": "579508510271",
    "pan": "HNMPK5120H",
    "mobile": "7730026672",
    "email": "77300rajashekar@gmail.com",
    "fatherName": "Sri KOMARAVALLI Senior",
    "doj": "2026-08-07",
    "dob": "1989-01-01",
    "bankAc": "38048455362",
    "ifsc": "SBIN0013277",
    "bankName": "STATE BANK OF INDIA",
    "uan": "102209100071",
    "pfNo": "APHYD32471440000011071",
    "esiNo": "5222100071",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "S/O: Venkateswarlu 2-98 Pamidi vari Palem Guntur Andhra Pradesh-522112",
    "presentAddress": "S/O: Venkateswarlu 2-98 Pamidi vari Palem Guntur Andhra Pradesh-522112",
    "siteUnit": "Third wave Coffe shop(kondapur)",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "KOMARAVALLI RAJASHEKAR Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "KOMARAVALLI RAJASHEKAR PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "KOMARAVALLI RAJASHEKAR Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "KOMARAVALLI RAJASHEKAR Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0081",
    "name": "MATHI VARSHITHA",
    "designation": "MANAGEMENT TRAINEE OPERATIONS",
    "department": "Operations",
    "gender": "Female",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "730966847131",
    "pan": "CVFPV6847Q",
    "mobile": "9059571884",
    "email": "mathivarshitha2@gmail.com",
    "fatherName": "Sri MATHI Senior",
    "doj": "16/07/2026",
    "dob": "2005-06-06",
    "bankAc": "79500100001352",
    "ifsc": "SBIN0002740",
    "bankName": "BANK OF BARODA",
    "uan": "102209100072",
    "pfNo": "APHYD32471440000011072",
    "esiNo": "5222100072",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "D/O:Kumarswamy, 3-10, K.KOtha Palem, District:Krishna, Andhra Pradesh-521125.",
    "presentAddress": "D/O:Kumarswamy, 3-10, K.KOtha Palem, District:Krishna, Andhra Pradesh-521125.",
    "siteUnit": "VPHS0001 - VPHS HEAD OFFICE",
    "status": "Active",
    "salary": {
      "basic": 18500,
      "hra": 7400,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2775,
      "gross": 31525,
      "epf": 2220,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2420,
      "net": 29105
    },
    "documents": [
      {
        "fileName": "MATHI VARSHITHA Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "MATHI VARSHITHA PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "MATHI VARSHITHA Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "MATHI VARSHITHA Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  },
  {
    "id": "VPHS0082",
    "name": "KONDAPURAM PAVAN",
    "designation": "VALET ATTENDANT",
    "department": "Facility & Transport",
    "gender": "Male",
    "maritalStatus": "Single",
    "empType": "Permenant",
    "aadhar": "218630209265",
    "pan": "CKFPK7596A",
    "mobile": "9247334921",
    "email": "kondapurampavan@vphs.in",
    "fatherName": "Sri KONDAPURAM Senior",
    "doj": "2026-01-07",
    "dob": "28/09/1989",
    "bankAc": "304928191073",
    "ifsc": "SBIN0002740",
    "bankName": "State Bank of India",
    "uan": "102209100073",
    "pfNo": "APHYD32471440000011073",
    "esiNo": "5222100073",
    "pfDeduct": "YES",
    "ptDeduct": "YES",
    "esiDeduct": "YES",
    "permanentAddress": "Hyderabad, Telangana",
    "presentAddress": "Hyderabad, Telangana",
    "siteUnit": "Third wave Coffe shop(Sainik puri)",
    "status": "Active",
    "salary": {
      "basic": 16500,
      "hra": 6600,
      "conveyance": 1600,
      "medicalAllowance": 1250,
      "specialAllowance": 2475,
      "gross": 28425,
      "epf": 1980,
      "esi": 0,
      "pt": 200,
      "totalDeductions": 2180,
      "net": 26245
    },
    "documents": [
      {
        "fileName": "KONDAPURAM PAVAN Aadhaar Card.pdf",
        "type": "PDF",
        "category": "Aadhaar Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "840 KB"
      },
      {
        "fileName": "KONDAPURAM PAVAN PAN Card.jpeg",
        "type": "IMAGE",
        "category": "PAN Card",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "520 KB"
      },
      {
        "fileName": "KONDAPURAM PAVAN Police Verification.pdf",
        "type": "PDF",
        "category": "Police Verification (PVC)",
        "uploadedAt": "2026-07-12",
        "verified": true,
        "size": "1.1 MB"
      },
      {
        "fileName": "KONDAPURAM PAVAN Passport Photo.jpeg",
        "type": "IMAGE",
        "category": "Passport Photo",
        "uploadedAt": "2026-07-10",
        "verified": true,
        "size": "340 KB"
      }
    ]
  }
];

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
