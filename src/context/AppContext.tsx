import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Role,
  Employee,
  ClientSite,
  PageContent,
  SectionContent,
  MediaItem,
  AuditLog,
  CompanySettings,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_EMPLOYEES,
  INITIAL_SITES,
  INITIAL_PAGES,
  INITIAL_MEDIA_ITEMS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COMPANY_SETTINGS,
  INITIAL_LEAVES
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  activeRole: Role | null;
  activePage: string;
  erpActiveTab: string;
  isEditMode: boolean;
  editingPage: PageContent | null;
  mediaLibraryOpen: boolean;
  selectedImageTarget: { pageId: string; sectionId: string; field: string } | null;
  employees: Employee[];
  sites: ClientSite[];
  pages: PageContent[];
  mediaItems: MediaItem[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  payroll: PayrollRecord[];
  auditLogs: AuditLog[];
  companySettings: CompanySettings;
  notifications: { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }[];
  
  // Navigation & Auth Actions
  navigateTo: (page: string) => void;
  setErpActiveTab: (tab: string) => void;
  login: (username: string, password?: string) => boolean;
  loginAsPersona: (role: Role) => void;
  logout: () => void;
  setIsEditMode: (val: boolean) => void;
  
  // CMS & Page Builder Actions
  openPageEditor: (pageId: string) => void;
  closePageEditor: () => void;
  savePageChanges: (pageId: string, updatedSections: SectionContent[], publish?: boolean) => void;
  updateSectionField: (pageId: string, sectionId: string, field: string, value: any) => void;
  reorderSections: (pageId: string, startIndex: number, endIndex: number) => void;
  toggleSectionVisibility: (pageId: string, sectionId: string) => void;
  addSection: (pageId: string, newSection: Partial<SectionContent>) => void;
  deleteSection: (pageId: string, sectionId: string) => void;
  restorePageVersion: (pageId: string, versionIndex: number) => void;
  
  // Media Library Actions
  openMediaLibrary: (target?: { pageId: string; sectionId: string; field: string }) => void;
  closeMediaLibrary: () => void;
  uploadMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteMediaItem: (id: string) => void;
  selectMediaForTarget: (url: string) => void;
  
  // Employee Actions
  addEmployee: (emp: Partial<Employee>) => void;
  updateEmployee: (id: string, updated: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  uploadEmployeeDocument: (empId: string, doc: any) => void;
  
  // Site Actions
  addSite: (site: Partial<ClientSite>) => void;
  updateSite: (id: string, site: Partial<ClientSite>) => void;
  updateSiteGeotag: (siteId: string, geotag: { latitude: number; longitude: number; radiusMeters: number; formattedCoordinates: string; address: string }) => void;
  
  // Attendance & Leaves
  markAttendance: (empId: string, status: AttendanceRecord['status'], overtime?: number, siteGeotag?: string) => void;
  punchOut: (empId: string) => void;
  addManualAttendanceRecord: (record: Partial<AttendanceRecord>) => void;
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => void;
  updateLeaveStatus: (leaveId: string, status: 'Approved' | 'Rejected', comment?: string) => void;
  
  // Payroll Actions
  processMonthlyPayroll: (month: string) => void;
  updatePayrollStatus: (payrollId: string, status: PayrollRecord['status']) => void;
  
  // Settings & Audit
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;
  addAuditLog: (action: string, module: string, page?: string, oldValue?: string, newValue?: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activePage, setActivePage] = useState<string>(() => {
    return localStorage.getItem('vphs_active_page') || 'home';
  });
  const [erpActiveTab, setErpActiveTab] = useState<string>('dashboard');

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vphs_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Edit Mode & CMS State
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState<boolean>(false);
  const [selectedImageTarget, setSelectedImageTarget] = useState<{ pageId: string; sectionId: string; field: string } | null>(null);

  // Core Data Stores with localStorage Persistence
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('vphs_employees');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [sites, setSites] = useState<ClientSite[]>(() => {
    const saved = localStorage.getItem('vphs_sites');
    return saved ? JSON.parse(saved) : INITIAL_SITES;
  });

  const [pages, setPages] = useState<PageContent[]>(() => {
    const saved = localStorage.getItem('vphs_pages');
    return saved ? JSON.parse(saved) : INITIAL_PAGES;
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('vphs_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA_ITEMS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('vphs_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem('vphs_settings');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_SETTINGS;
  });

  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('vphs_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('vphs_attendance');
    if (saved) return JSON.parse(saved);
    // Initialize default attendance for today
    const today = new Date().toISOString().split('T')[0];
    return INITIAL_EMPLOYEES.slice(0, 40).map((emp, i) => ({
      id: `att-${i + 1}`,
      employeeId: emp.id,
      employeeName: emp.name,
      siteName: emp.siteUnit || 'Microsoft India Campus',
      date: today,
      checkIn: i % 7 === 0 ? '09:25 AM' : '08:58 AM',
      checkOut: '06:00 PM',
      status: i % 12 === 0 ? 'Absent' : i % 7 === 0 ? 'Late' : 'Present',
      overtimeHours: i % 5 === 0 ? 1.5 : 0,
      location: emp.siteUnit || 'Hyderabad Site Unit 1',
      verifiedBy: 'Suresh Kumar (Supervisor)'
    }));
  });

  const [payroll, setPayroll] = useState<PayrollRecord[]>(() => {
    const saved = localStorage.getItem('vphs_payroll');
    if (saved) return JSON.parse(saved);
    return INITIAL_EMPLOYEES.map((emp, i) => ({
      id: `pay-${emp.id}-2026-08`,
      month: 'August 2026',
      employeeId: emp.id,
      employeeName: emp.name,
      designation: emp.designation,
      department: emp.department,
      siteName: emp.siteUnit,
      workingDays: 26,
      presentDays: 25,
      leavesTaken: 1,
      basicSalary: emp.salary?.basic || 18500,
      hra: emp.salary?.hra || 7400,
      allowances: (emp.salary?.conveyance || 1600) + (emp.salary?.specialAllowance || 2500),
      grossSalary: emp.salary?.gross || 30000,
      epfDeduction: emp.salary?.epf || 2220,
      esiDeduction: emp.salary?.esi || 225,
      ptDeduction: emp.salary?.pt || 200,
      otherDeductions: 0,
      totalDeductions: emp.salary?.totalDeductions || 2645,
      netPay: emp.salary?.net || 27355,
      status: 'Approved',
      disbursedOn: '2026-08-31',
      bankAc: emp.bankAc,
      ifsc: emp.ifsc
    }));
  });

  const [notifications, setNotifications] = useState<{ id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string }[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vphs_active_page', activePage);
  }, [activePage]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vphs_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vphs_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vphs_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('vphs_sites', JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem('vphs_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('vphs_media', JSON.stringify(mediaItems));
  }, [mediaItems]);

  useEffect(() => {
    localStorage.setItem('vphs_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('vphs_settings', JSON.stringify(companySettings));
  }, [companySettings]);

  useEffect(() => {
    localStorage.setItem('vphs_leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('vphs_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('vphs_payroll', JSON.stringify(payroll));
  }, [payroll]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Audit Logger
  const addAuditLog = (action: string, module: string, page?: string, oldValue?: string, newValue?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System Administrator',
      role: currentUser?.role || 'SUPER_ADMIN',
      action,
      module,
      page,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      oldValue,
      newValue,
      ipAddress: '103.14.120.45'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Navigation
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Operations
  const login = (username: string, _password?: string): boolean => {
    const cleanUser = username.trim().toLowerCase();
    
    // Find matching user from credentials or employee list
    let matchedUser = INITIAL_USERS.find(u => 
      u.username.toLowerCase() === cleanUser || 
      u.email.toLowerCase() === cleanUser || 
      (u.employeeId && u.employeeId.toLowerCase() === cleanUser)
    );

    if (!matchedUser) {
      // Check if employee ID exists in master list
      const matchedEmp = employees.find(e => 
        e.id.toLowerCase() === cleanUser || 
        e.email.toLowerCase() === cleanUser
      );
      if (matchedEmp) {
        matchedUser = {
          id: `usr-${matchedEmp.id}`,
          username: matchedEmp.id,
          name: matchedEmp.name,
          email: matchedEmp.email,
          role: matchedEmp.designation.includes('MANAGER') ? 'SITE_MANAGER' :
                matchedEmp.designation.includes('SUPERVISOR') ? 'SUPERVISOR' : 'EMPLOYEE',
          employeeId: matchedEmp.id,
          designation: matchedEmp.designation,
          phone: matchedEmp.mobile
        };
      }
    }

    if (matchedUser) {
      setCurrentUser(matchedUser);
      addAuditLog(`User Authenticated: ${matchedUser.name}`, 'Authentication', 'Login Portal', undefined, matchedUser.role);
      showToast(`Welcome back, ${matchedUser.name}! Signed in as ${matchedUser.role.replace('_', ' ')}.`);
      navigateTo('erp');
      return true;
    }

    showToast('Invalid credentials. Please try demo personas or enter a valid Employee ID.', 'error');
    return false;
  };

  const loginAsPersona = (role: Role) => {
    const persona = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(persona);
    addAuditLog(`Persona Login: ${persona.name}`, 'Authentication', '1-Click Persona', undefined, role);
    showToast(`Switched to ${persona.name} (${role.replace('_', ' ')})`);
    navigateTo('erp');
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog(`User Logout: ${currentUser.name}`, 'Authentication', 'Portal');
    }
    setCurrentUser(null);
    setIsEditMode(false);
    showToast('You have been logged out securely.', 'info');
    navigateTo('home');
  };

  // CMS Page & Section Operations
  const openPageEditor = (pageId: string) => {
    const p = pages.find(item => item.id === pageId);
    if (p) {
      setEditingPage(JSON.parse(JSON.stringify(p)));
    }
  };

  const closePageEditor = () => {
    setEditingPage(null);
  };

  const savePageChanges = (pageId: string, updatedSections: SectionContent[], publish = true) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      
      const newVersion = {
        version: (page.versionHistory?.length || 0) + 1,
        savedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        savedBy: currentUser?.name || 'Super Admin',
        sections: page.sections
      };

      return {
        ...page,
        sections: updatedSections,
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: currentUser?.name || 'Super Admin',
        versionHistory: [newVersion, ...(page.versionHistory || [])].slice(0, 10)
      };
    }));

    addAuditLog(`Page Content Updated: ${pageId}`, 'CMS Page Manager', pageId, undefined, publish ? 'Published' : 'Draft Saved');
    showToast(`Page "${pageId.toUpperCase()}" successfully ${publish ? 'published' : 'saved'}!`);
    closePageEditor();
  };

  const updateSectionField = (pageId: string, sectionId: string, field: string, value: any) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        sections: page.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          return { ...sec, [field]: value };
        })
      };
    }));
    addAuditLog(`Inline Edit: ${field} in ${sectionId}`, 'Live Page Editor', pageId);
  };

  const reorderSections = (pageId: string, startIndex: number, endIndex: number) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      const result = Array.from(page.sections);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return {
        ...page,
        sections: result.map((s, idx) => ({ ...s, order: idx + 1 }))
      };
    }));
    addAuditLog(`Sections Reordered on ${pageId}`, 'CMS Page Builder', pageId);
  };

  const toggleSectionVisibility = (pageId: string, sectionId: string) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        sections: page.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          return { ...sec, visible: !sec.visible };
        })
      };
    }));
    showToast(`Section visibility toggled.`);
  };

  const addSection = (pageId: string, newSection: Partial<SectionContent>) => {
    const sec: SectionContent = {
      id: `sec-${Date.now()}`,
      type: newSection.type || 'custom',
      title: newSection.title || 'New Section Heading',
      subtitle: newSection.subtitle || 'Add descriptive subtext here',
      visible: true,
      order: 99,
      ...newSection
    };

    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        sections: [...page.sections, sec]
      };
    }));
    addAuditLog(`New Section Added: ${sec.title}`, 'CMS Page Builder', pageId);
    showToast('New section added to page!');
  };

  const deleteSection = (pageId: string, sectionId: string) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId) return page;
      return {
        ...page,
        sections: page.sections.filter(s => s.id !== sectionId)
      };
    }));
    addAuditLog(`Section Deleted: ${sectionId}`, 'CMS Page Builder', pageId);
    showToast('Section removed.');
  };

  const restorePageVersion = (pageId: string, versionIndex: number) => {
    setPages(prev => prev.map(page => {
      if (page.id !== pageId || !page.versionHistory || !page.versionHistory[versionIndex]) return page;
      const targetVersion = page.versionHistory[versionIndex];
      return {
        ...page,
        sections: targetVersion.sections,
        lastUpdated: new Date().toISOString().split('T')[0],
        updatedBy: `${currentUser?.name || 'Super Admin'} (Restored v${targetVersion.version})`
      };
    }));
    addAuditLog(`Page Restored to previous version`, 'CMS Page Builder', pageId);
    showToast(`Restored page to version from backup.`);
  };

  // Media Library
  const openMediaLibrary = (target?: { pageId: string; sectionId: string; field: string }) => {
    if (target) setSelectedImageTarget(target);
    setMediaLibraryOpen(true);
  };

  const closeMediaLibrary = () => {
    setMediaLibraryOpen(false);
    setSelectedImageTarget(null);
  };

  const uploadMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt' | 'uploadedBy'>) => {
    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: currentUser?.name || 'Administrator',
      ...item
    };
    setMediaItems(prev => [newItem, ...prev]);
    addAuditLog(`Media Uploaded: ${newItem.name}`, 'Media Library', undefined, undefined, newItem.url);
    showToast(`File "${newItem.name}" added to media library!`);
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
    addAuditLog(`Media Deleted: ${id}`, 'Media Library');
    showToast('Media item deleted.');
  };

  const selectMediaForTarget = (url: string) => {
    if (selectedImageTarget) {
      updateSectionField(selectedImageTarget.pageId, selectedImageTarget.sectionId, selectedImageTarget.field, url);
      showToast('Image updated successfully!');
    }
    closeMediaLibrary();
  };

  // Employee Operations
  const addEmployee = (emp: Partial<Employee>) => {
    const basic = emp.salary?.basic || 18500;
    const hra = Math.round(basic * 0.4);
    const gross = basic + hra + 1600 + 2500;
    const epf = Math.round(basic * 0.12);
    const esi = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
    const pt = 200;
    const totalDeductions = epf + esi + pt;
    const net = gross - totalDeductions;

    const newEmp: Employee = {
      id: emp.id || `VPHS00${employees.length + 10}`,
      name: emp.name || 'New Associate',
      designation: emp.designation || 'Facility Associate',
      department: emp.department || 'Facility Management',
      gender: emp.gender || 'Male',
      maritalStatus: emp.maritalStatus || 'Single',
      empType: emp.empType || 'Permanent',
      aadhar: emp.aadhar || '1234 5678 9012',
      pan: emp.pan || 'ABCDE1234F',
      mobile: emp.mobile || '+91 98490 00000',
      email: emp.email || `${(emp.name || 'associate').toLowerCase().replace(/\s+/g, '')}@vphs.in`,
      fatherName: emp.fatherName || 'Parent Name',
      doj: emp.doj || new Date().toISOString().split('T')[0],
      dob: emp.dob || '1998-01-01',
      bankAc: emp.bankAc || '300012345678',
      ifsc: emp.ifsc || 'SBIN0002740',
      bankName: emp.bankName || 'State Bank of India',
      uan: emp.uan || '102200000000',
      pfNo: emp.pfNo || 'APHYD32471440000010000',
      esiNo: emp.esiNo || '5222000000',
      pfDeduct: emp.pfDeduct || 'YES',
      ptDeduct: emp.ptDeduct || 'YES',
      esiDeduct: emp.esiDeduct || 'YES',
      permanentAddress: emp.permanentAddress || 'Hyderabad, Telangana',
      presentAddress: emp.presentAddress || 'Hyderabad, Telangana',
      siteUnit: emp.siteUnit || 'VPHS Head Office',
      status: emp.status || 'Active',
      salary: emp.salary || {
        basic,
        hra,
        conveyance: 1600,
        medicalAllowance: 1250,
        specialAllowance: 2500,
        gross,
        epf,
        esi,
        pt,
        totalDeductions,
        net
      },
      documents: emp.documents || [
        { fileName: `${emp.name || 'Employee'} Aadhaar Card.pdf`, type: 'PDF', category: 'Aadhaar Card', uploadedAt: new Date().toISOString().split('T')[0], verified: true, size: '850 KB' },
        { fileName: `${emp.name || 'Employee'} PAN Card.jpeg`, type: 'IMAGE', category: 'PAN Card', uploadedAt: new Date().toISOString().split('T')[0], verified: true, size: '420 KB' }
      ]
    };

    setEmployees(prev => [newEmp, ...prev]);
    addAuditLog(`Employee Created: ${newEmp.name} (${newEmp.id})`, 'Employee Master', 'Employee Directory', undefined, JSON.stringify({ id: newEmp.id, site: newEmp.siteUnit }));
    showToast(`Employee ${newEmp.name} onboarded successfully!`);
  };

  const updateEmployee = (id: string, updated: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
    addAuditLog(`Employee Updated: ${id}`, 'Employee Master', 'Employee Directory');
    showToast(`Employee records updated.`);
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    addAuditLog(`Employee Deleted: ${id}`, 'Employee Master');
    showToast(`Employee removed from directory.`);
  };

  const uploadEmployeeDocument = (empId: string, doc: any) => {
    setEmployees(prev => prev.map(e => {
      if (e.id !== empId) return e;
      return {
        ...e,
        documents: [doc, ...(e.documents || [])]
      };
    }));
    addAuditLog(`KYC Document Uploaded for ${empId}`, 'KYC Vault', 'Documents');
    showToast(`Document attached to employee vault!`);
  };

  // Site Operations
  const addSite = (site: Partial<ClientSite>) => {
    const newSite: ClientSite = {
      id: `site-${Date.now()}`,
      name: site.name || 'New Enterprise Campus',
      clientName: site.clientName || 'Enterprise Client Pvt. Ltd.',
      location: site.location || 'Hitech City, Hyderabad',
      city: site.city || 'Hyderabad',
      state: site.state || 'Telangana',
      managerName: site.managerName || 'Ramesh Kumar',
      managerId: site.managerId || 'VPHS-025',
      totalManpower: site.totalManpower || 15,
      servicesProvided: site.servicesProvided || ['Corporate Housekeeping', 'Security'],
      contactEmail: site.contactEmail || 'facilities@client.com',
      contactPhone: site.contactPhone || '+91 40 1234 5678',
      status: 'Active',
      image: site.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      startDate: site.startDate || new Date().toISOString().split('T')[0]
    };
    setSites(prev => [newSite, ...prev]);
    addAuditLog(`Client Site Created: ${newSite.name}`, 'Site Operations', 'Sites');
    showToast(`New client site "${newSite.name}" created!`);
  };

  const updateSite = (id: string, updated: Partial<ClientSite>) => {
    setSites(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    addAuditLog(`Client Site Updated: ${id}`, 'Site Operations', 'Sites');
    showToast(`Site details updated.`);
  };

  const updateSiteGeotag = (siteId: string, geotag: { latitude: number; longitude: number; radiusMeters: number; formattedCoordinates: string; address: string }) => {
    setSites(prev => prev.map(s => s.id === siteId ? { ...s, geotag } : s));
    addAuditLog(`Geotag Coordinates Updated for Site ${siteId}`, 'Site Operations', 'Geotag Configuration', undefined, geotag.formattedCoordinates);
    showToast(`Geotag for site updated: ${geotag.formattedCoordinates}`);
  };

  // Attendance & Leaves
  const markAttendance = (empId: string, status: AttendanceRecord['status'], overtime = 0, siteGeotag?: string) => {
    const emp = employees.find(e => e.id === empId);
    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setAttendance(prev => {
      const existing = prev.find(a => a.employeeId === empId && a.date === today);
      if (existing) {
        return prev.map(a => a.id === existing.id ? {
          ...a,
          status,
          checkIn: a.checkIn || timeNow,
          overtimeHours: overtime,
          geotagSnapshot: siteGeotag || a.geotagSnapshot || '17.4483° N, 78.3915° E (VPHS HEAD OFFICE)'
        } : a);
      }
      const newAtt: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId: empId,
        employeeName: emp?.name || 'Associate',
        designation: emp?.designation || 'Staff',
        siteName: emp?.siteUnit || 'VPHS Head Office',
        date: today,
        checkIn: timeNow,
        status,
        overtimeHours: overtime,
        location: emp?.siteUnit || 'Hyderabad Campus',
        verifiedBy: currentUser?.name || 'Supervisor',
        geotagSnapshot: siteGeotag || '17.4483° N, 78.3915° E (VPHS HEAD OFFICE)'
      };
      return [newAtt, ...prev];
    });

    addAuditLog(`Attendance Punch: ${empId} (${status})`, 'Attendance & Shifts', 'Daily Punch', undefined, siteGeotag);
    showToast(`Attendance marked for ${emp?.name || empId}: ${status}`);
  };

  const punchOut = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setAttendance(prev => {
      const existing = prev.find(a => a.employeeId === empId && a.date === today);
      if (existing) {
        return prev.map(a => a.id === existing.id ? {
          ...a,
          checkOut: timeNow,
          totalHours: 8.5
        } : a);
      }
      const newAtt: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId: empId,
        employeeName: emp?.name || 'Associate',
        designation: emp?.designation || 'Staff',
        siteName: emp?.siteUnit || 'VPHS Head Office',
        date: today,
        checkIn: '09:00:00 AM',
        checkOut: timeNow,
        status: 'Present',
        location: emp?.siteUnit || 'Hyderabad Campus',
        verifiedBy: currentUser?.name || 'Supervisor',
        totalHours: 8.5
      };
      return [newAtt, ...prev];
    });

    addAuditLog(`Punch Out Recorded for ${empId}`, 'Attendance & Shifts', 'Daily Punch', undefined, `Check-out: ${timeNow}`);
    showToast(`Punched Out successfully at ${timeNow} for ${emp?.name || empId}`);
  };

  const addManualAttendanceRecord = (record: Partial<AttendanceRecord>) => {
    const newAtt: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId: record.employeeId || 'VPHS0010',
      employeeName: record.employeeName || 'Staff',
      designation: record.designation || 'Associate',
      siteName: record.siteName || 'VPHS Head Office',
      date: record.date || new Date().toISOString().split('T')[0],
      checkIn: record.checkIn || '09:00 AM',
      checkOut: record.checkOut || '06:00 PM',
      status: record.status || 'Present',
      overtimeHours: record.overtimeHours || 0,
      location: record.location || 'Hyderabad Campus',
      verifiedBy: currentUser?.name || 'Super Admin',
      geotagSnapshot: record.geotagSnapshot || '17.4483° N, 78.3915° E (VPHS HEAD OFFICE)'
    };

    setAttendance(prev => [newAtt, ...prev]);
    addAuditLog(`Manual Attendance Entry: ${newAtt.employeeId} on ${newAtt.date}`, 'Attendance & Shifts', 'Manual Overrides');
    showToast(`Manual attendance record added for ${newAtt.employeeName}`);
  };

  const applyLeave = (leave: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => {
    const newLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...leave
    };
    setLeaves(prev => [newLeave, ...prev]);
    addAuditLog(`Leave Applied by ${leave.employeeName}`, 'Leave Management', 'Requests');
    showToast(`Leave application submitted successfully!`);
  };

  const updateLeaveStatus = (leaveId: string, status: 'Approved' | 'Rejected', comment?: string) => {
    setLeaves(prev => prev.map(l => {
      if (l.id !== leaveId) return l;
      return {
        ...l,
        status,
        reviewedBy: currentUser?.name || 'HR Admin',
        reviewComment: comment || `Leave ${status}`
      };
    }));
    addAuditLog(`Leave Request ${leaveId} set to ${status}`, 'Leave Management', 'Approvals');
    showToast(`Leave request ${status.toLowerCase()}!`);
  };

  // Payroll Actions
  const processMonthlyPayroll = (month: string) => {
    const newRecords: PayrollRecord[] = employees.map(emp => ({
      id: `pay-${emp.id}-${month.replace(/\s+/g, '-')}`,
      month,
      employeeId: emp.id,
      employeeName: emp.name,
      designation: emp.designation,
      department: emp.department,
      siteName: emp.siteUnit,
      workingDays: 26,
      presentDays: 25,
      leavesTaken: 1,
      basicSalary: emp.salary?.basic || 18500,
      hra: emp.salary?.hra || 7400,
      allowances: (emp.salary?.conveyance || 1600) + (emp.salary?.specialAllowance || 2500),
      grossSalary: emp.salary?.gross || 30000,
      epfDeduction: emp.salary?.epf || 2220,
      esiDeduction: emp.salary?.esi || 225,
      ptDeduction: emp.salary?.pt || 200,
      otherDeductions: 0,
      totalDeductions: emp.salary?.totalDeductions || 2645,
      netPay: emp.salary?.net || 27355,
      status: 'Approved',
      disbursedOn: new Date().toISOString().split('T')[0],
      bankAc: emp.bankAc,
      ifsc: emp.ifsc
    }));

    setPayroll(newRecords);
    addAuditLog(`Payroll Processed for ${month} (${employees.length} staff)`, 'Payroll Engine', 'Batch Run');
    showToast(`Monthly payroll for ${month} processed successfully!`);
  };

  const updatePayrollStatus = (payrollId: string, status: PayrollRecord['status']) => {
    setPayroll(prev => prev.map(p => p.id === payrollId ? { ...p, status } : p));
    showToast(`Payslip status updated to ${status}.`);
  };

  // Settings
  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings(prev => ({ ...prev, ...settings }));
    addAuditLog('Company Settings & Theme Updated', 'System Settings', 'Branding');
    showToast('Company profile & settings saved!');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRole: currentUser?.role || null,
        activePage,
        erpActiveTab,
        isEditMode,
        editingPage,
        mediaLibraryOpen,
        selectedImageTarget,
        employees,
        sites,
        pages,
        mediaItems,
        attendance,
        leaves,
        payroll,
        auditLogs,
        companySettings,
        notifications,
        navigateTo,
        setErpActiveTab,
        login,
        loginAsPersona,
        logout,
        setIsEditMode,
        openPageEditor,
        closePageEditor,
        savePageChanges,
        updateSectionField,
        reorderSections,
        toggleSectionVisibility,
        addSection,
        deleteSection,
        restorePageVersion,
        openMediaLibrary,
        closeMediaLibrary,
        uploadMediaItem,
        deleteMediaItem,
        selectMediaForTarget,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        uploadEmployeeDocument,
        addSite,
        updateSite,
        updateSiteGeotag,
        markAttendance,
        punchOut,
        addManualAttendanceRecord,
        applyLeave,
        updateLeaveStatus,
        processMonthlyPayroll,
        updatePayrollStatus,
        updateCompanySettings,
        addAuditLog,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
