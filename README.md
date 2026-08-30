# VPHS Services Pvt. Ltd. – Facility Management & HR ERP

An enterprise-grade, full-featured **Corporate Website, Live CMS Page Builder, and Facility Management & HR ERP System** built for **VPHS Services Pvt. Ltd.** based on the company's real Master Data, employee KYC document vaults, and corporate visual design system (VPHS Navy `#070e1e` / `#0b1329` and Gold/Amber `#f59e0b` accents).

---

## 🌟 Key Features

### 1. Corporate Public Website
- **Branded Homepage**: Featuring enterprise hero banner, 4 core concept cards (*360° Employee Master*, *Multi-Site Operations*, *Attendance & Shifts*, *Payroll & Payslips*), live statistics counters, services catalog, client showcase (Microsoft India, Amazon, Third Wave Coffee), why choose VPHS, client testimonials, and a site audit request form.
- **Dedicated Pages**:
  - **About Us**: Operational heritage, mission & vision, ISO 9001/45001 standards, and 100% statutory compliance guarantees.
  - **Services**: Integrated Facility Management (IFM), Mechanized Housekeeping, PSARA Security, Staffing & Manpower, Valet Marshalling, and HR ERP.
  - **Facilities**: Industrial ride-on scrubbers, Diversey certified eco-friendly chemicals, and safety equipment.
  - **HR & Payroll**: Statutory overview, EPF/ESIC/PT compliance, shift rosters, and digital employee vaults.
  - **Clients / Sites**: Campus listings for Microsoft Hyderabad, Amazon Fulfillment Center, Third Wave Coffee, Forward Life Sciences, Harleys Healthcare.
  - **Careers**: Active job openings with instant online job application modal.
  - **Contact Us**: Corporate HQ directory in Kavuri Hills, Madhapur, direct hotline numbers, and query dispatch form.

### 2. Live CMS Visual Page Builder & Media Library
- **In-Place Inline Editing**: Super Admins can enable **Edit Mode** with one click and edit text, headings, and images directly on any public page.
- **Visual Page Editor Modal**: Modify badges, headings, copy, and buttons, reorder sections (move up/down), toggle section visibility (hide/show), add custom sections, and restore previous published versions from the version history archive!
- **Centralized Media Library**: Central repository of company logos, banners, team photos, and documents. Supports local file drag-and-drop upload and direct image replacement across all pages.

### 3. Role-Based Access Control (RBAC) & Portal Authentication
- **1-Click Persona Logins**:
  1. **Super Admin**: Vikram Pratap Singh (`admin@vphs.in` / `VPHS-001`) — Full system control, CMS page editing on every page, user management, audit logs.
  2. **HR Admin**: Priya Sharma (`hr@vphs.in` / `VPHS-002`) — Employee onboarding, KYC vault management, attendance verification, and monthly payroll batches.
  3. **Site Manager**: Ramesh Kumar (`sitemgr@vphs.in` / `VPHS-025`) — Scoped strictly to assigned sites (Microsoft India Campus & Amazon Fulfillment).
  4. **Supervisor**: Suresh Kumar (`supervisor@vphs.in` / `VPHS-010`) — Shift rosters, daily punch logs, and field incident reporting.
  5. **Employee**: Aamir Khan (`VPHS0010`) / Akhil Pachamatla — Self-service portal for own profile, monthly punch history, leave applications, and downloadable payslips.

### 4. 360° Employee Master & Real Master Data
- Preloaded with all **73 authentic employee master records** from `MASTER DATA1 (1) 2.xlsx`.
- Complete statutory data: Aadhaar, PAN, Bank Account, IFSC, UAN Number, PF Member ID, ESIC Number, PT, and addresses.
- **Excel Batch Import & Export**: One-click download of the complete employee roster as a real `.xlsx` spreadsheet using SheetJS, or batch import of new employees.
- Profile viewer drawer linked to verified KYC document attachments.

### 5. KYC & Document Vault
- Preloaded with the real employee document vaults from `Microsoft Documents file 222 (2).zip` (Adam Sha, Anil, Dakshinya Deep, Dawood, Harish, J. Naveen, Kummari Suresh, Mohd Maqsood, Naga Sai Ram, Naresh, Naveen, Prithiviraj, Rahil Azam, Rahul, Rehan, Shahed Ayan, Thanveer, Veera Sai).
- Categorized by Aadhaar Card, PAN Card, Driving License, Police Verification (PVC), Medical Certificate, Utility Bill, and Passport Photo.

### 6. Statutory Payroll & Official PDF Payslips
- Configurable salary structures: Basic, HRA, Conveyance, Allowances, Gross, Employee EPF (12%), Employee ESIC (0.75%), PT, and Net Salary.
- Batch Payroll Run for current and past months.
- **Official Printable / Downloadable PDF Payslips**: With VPHS letterhead, company CIN, GSTIN, EPFO Code, ESIC Code, registered address, earnings vs deductions breakdown, and authorized signatory.

### 7. Shift Attendance & Leave Governance
- Daily punch logs with Geotag indicator, late arrival detection, and overtime tracking.
- Leave quota management (Casual, Sick, Earned) with HR approval and rejection workflows.

### 8. Statutory Portals Integration
- Direct links and credential reference for EPFO India Portal (`APHYD3247144000`), ESIC Portal (`52002258010000900`), Telangana Labour Department, and Fame DIYOS Portal.

### 9. Security & Audit Trail
- Immutable activity log tracking User, Role, Action, Module, Timestamp, Old Value vs New Value.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will launch on `http://localhost:5173`.

### Production Build
```bash
# Compile TypeScript and generate optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🏢 Corporate Details
- **Company Name**: VPHS Services Pvt. Ltd.
- **Legal Entity**: VPHS Facility Management & HR Services Private Limited
- **Headquarters**: Plot No. 45, Survey No. 64, Kavuri Hills, Madhapur, Hitech City, Hyderabad, Telangana - 500081
- **Hotlines**: +91 40 4852 9100 / +91 98490 12345
- **Email**: contact@vphs.in | helpdesk@vphs.in
- **CIN**: U74999TG2022PTC160412
- **GSTIN**: 36AAACV1234Q1Z8
- **EPFO Code**: APHYD3247144000
- **ESIC Code**: 52002258010000900
