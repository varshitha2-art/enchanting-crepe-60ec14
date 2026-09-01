import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_ROLE_PERMISSIONS } from '../../context/AppContext';
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Eye,
  Edit2,
  Trash2,
  FileCheck,
  CheckCircle,
  XCircle,
  Building,
  Phone,
  Mail,
  CreditCard,
  FileText,
  X,
  ExternalLink,
  ShieldCheck,
  Shield,
  KeyRound,
  Sliders,
  Check,
  RotateCcw
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { Employee, Role, User, UserPermissions } from '../../types';

export const EmployeeMaster: React.FC = () => {
  const {
    employees,
    systemUsers,
    currentUser,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    updateUserRbac,
    showToast,
    uploadEmployeeDocument,
    setErpActiveTab
  } = useApp();

  const role = currentUser?.role || 'EMPLOYEE';
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSite, setSelectedSite] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [profileModalEmp, setProfileModalEmp] = useState<Employee | null>(null);
  const [editingEmp, setEditingEmp] = useState<Partial<Employee>>({});

  // RBAC Configurator Modal for Individual Employee
  const [editingRbacUser, setEditingRbacUser] = useState<User | null>(null);
  const [rbacFormData, setRbacFormData] = useState<{
    name: string;
    username: string;
    email: string;
    designation: string;
    password: string;
    role: Role;
    status: 'Active' | 'Suspended';
    assignedSites: string[];
    customPermissions: UserPermissions;
  }>({
    name: '',
    username: '',
    email: '',
    designation: '',
    password: '',
    role: 'EMPLOYEE',
    status: 'Active',
    assignedSites: [],
    customPermissions: DEFAULT_ROLE_PERMISSIONS.EMPLOYEE
  });

  const handleOpenRbacModalForEmp = (emp: Employee) => {
    const matchedUser = systemUsers.find(u => u.employeeId === emp.id || u.username === emp.id || u.email === emp.email);
    const userRole: Role = matchedUser?.role || (
      emp.designation.toUpperCase().includes('DIRECTOR') ? 'SUPER_ADMIN' :
      emp.designation.toUpperCase().includes('HR') ? 'HR_ADMIN' :
      emp.designation.toUpperCase().includes('MANAGER') ? 'SITE_MANAGER' :
      emp.designation.toUpperCase().includes('SUPERVISOR') ? 'SUPERVISOR' : 'EMPLOYEE'
    );
    const defaultPerms = DEFAULT_ROLE_PERMISSIONS[userRole] || DEFAULT_ROLE_PERMISSIONS.EMPLOYEE;
    const currentPerms = matchedUser?.customPermissions || defaultPerms;

    const userObj: User = matchedUser || {
      id: `usr-${emp.id}`,
      username: emp.id,
      name: emp.name,
      email: emp.email,
      role: userRole,
      employeeId: emp.id,
      designation: emp.designation,
      assignedSites: [emp.siteUnit || 'Microsoft India (R & D) Pvt. Ltd'],
      status: emp.status === 'Inactive' ? 'Suspended' : 'Active',
      customPermissions: currentPerms
    };

    setEditingRbacUser(userObj);
    setRbacFormData({
      name: userObj.name || emp.name,
      username: userObj.username || emp.id,
      email: userObj.email || emp.email,
      designation: userObj.designation || emp.designation,
      password: userObj.password || 'VPHS@EMPLOYEE',
      role: userObj.role || 'EMPLOYEE',
      status: userObj.status || 'Active',
      assignedSites: userObj.assignedSites || [emp.siteUnit || 'Microsoft India (R & D) Pvt. Ltd'],
      customPermissions: { ...currentPerms }
    });
  };

  const handleRoleChangeInRbac = (newRole: Role) => {
    setRbacFormData(prev => ({
      ...prev,
      role: newRole,
      customPermissions: {
        ...DEFAULT_ROLE_PERMISSIONS[newRole]
      }
    }));
  };

  const handleTogglePermission = (key: keyof UserPermissions) => {
    setRbacFormData(prev => ({
      ...prev,
      customPermissions: {
        ...prev.customPermissions,
        [key]: !prev.customPermissions[key]
      }
    }));
  };

  const handleToggleSite = (siteName: string) => {
    setRbacFormData(prev => {
      const exists = prev.assignedSites.includes(siteName);
      const updated = exists
        ? prev.assignedSites.filter(s => s !== siteName)
        : [...prev.assignedSites, siteName];
      return { ...prev, assignedSites: updated };
    });
  };

  const handleSaveRbac = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRbacUser) return;
    if (!rbacFormData.username.trim()) {
      showToast('Login ID / Username is required', 'error');
      return;
    }

    updateUserRbac(editingRbacUser.id, {
      username: rbacFormData.username,
      role: rbacFormData.role,
      assignedSites: rbacFormData.assignedSites,
      customPermissions: rbacFormData.customPermissions,
      status: rbacFormData.status,
      password: rbacFormData.password,
      name: rbacFormData.name,
      email: rbacFormData.email,
      designation: rbacFormData.designation
    });

    setEditingRbacUser(null);
  };

  // Scoping based on Role
  let scopedEmployees = employees;
  if (role === 'EMPLOYEE') {
    scopedEmployees = employees.filter(e => e.id === currentUser?.employeeId || e.email === currentUser?.email);
    if (scopedEmployees.length === 0 && employees.length > 0) {
      scopedEmployees = [employees[0]];
    }
  } else if (role === 'SITE_MANAGER') {
    scopedEmployees = employees.filter(e => 
      e.siteUnit.toLowerCase().includes('microsoft') || 
      e.siteUnit.toLowerCase().includes('amazon') ||
      e.siteUnit.toLowerCase().includes('head office')
    );
  } else if (role === 'SUPERVISOR') {
    scopedEmployees = employees.filter(e => 
      e.siteUnit.toLowerCase().includes('microsoft') || 
      e.designation.toLowerCase().includes('valet') ||
      e.designation.toLowerCase().includes('housekeeping')
    );
  }

  // Filter scoped employees
  const filteredEmployees = scopedEmployees.filter(emp => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(q) ||
      emp.id.toLowerCase().includes(q) ||
      emp.mobile.toLowerCase().includes(q) ||
      emp.pan.toLowerCase().includes(q) ||
      emp.aadhar.toLowerCase().includes(q) ||
      emp.designation.toLowerCase().includes(q);

    const matchesSite = selectedSite === 'All' || emp.siteUnit === selectedSite;
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesSite && matchesDept && matchesStatus;
  });

  // Unique sites and depts for filter dropdowns
  const allSites = ['All', ...Array.from(new Set(employees.map(e => e.siteUnit).filter(Boolean)))];
  const allDepts = ['All', ...Array.from(new Set(employees.map(e => e.department).filter(Boolean)))];

  // Excel Export
  const handleExportExcel = () => {
    const exportData = filteredEmployees.map((e, index) => ({
      'S.No': index + 1,
      'Employee ID': e.id,
      'Full Name': e.name,
      'Designation': e.designation,
      'Department': e.department,
      'Gender': e.gender,
      'Mobile Number': e.mobile,
      'Email': e.email,
      'Aadhaar Number': e.aadhar,
      'PAN Number': e.pan,
      'Date of Joining': e.doj,
      'Date of Birth': e.dob,
      'Bank Account No': e.bankAc,
      'IFSC Code': e.ifsc,
      'Bank Name': e.bankName,
      'UAN Number': e.uan,
      'PF Member ID': e.pfNo,
      'ESIC Number': e.esiNo,
      'Permanent Address': e.permanentAddress,
      'Assigned Site': e.siteUnit,
      'Status': e.status,
      'Gross Salary': e.salary?.gross || 0,
      'Net Salary': e.salary?.net || 0
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'VPHS Employees');
    XLSX.writeFile(wb, `VPHS_Master_Employees_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast(`Exported ${exportData.length} records to Excel!`, 'success');
  };

  // Excel Batch Import
  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const firstSheetName = wb.SheetNames[0];
        const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[firstSheetName]);

        let importedCount = 0;
        rows.forEach(r => {
          if (r['Employee ID'] || r['Name'] || r['Full Name']) {
            addEmployee({
              id: r['Employee ID'] || `VPHS00${employees.length + 10}`,
              name: r['Full Name'] || r['Name'] || 'Imported Employee',
              designation: r['Designation'] || 'Facility Associate',
              department: r['Department'] || 'Facility Management',
              gender: r['Gender'] || 'Male',
              mobile: r['Mobile Number'] || r['Mobile'] || '+91 98490 00000',
              email: r['Email'] || 'employee@vphs.in',
              aadhar: r['Aadhaar Number'] || r['Aadhar Number'] || '1234 5678 9012',
              pan: r['PAN Number'] || r['PAN No'] || 'ABCDE1234F',
              siteUnit: r['Assigned Site'] || r['UnitID Name'] || 'VPHS Head Office',
              status: r['Status'] || r['Emp status'] || 'Active'
            });
            importedCount++;
          }
        });

        showToast(`Successfully imported ${importedCount} employee records!`, 'success');
      } catch (err) {
        showToast('Failed to parse Excel file. Please ensure correct template format.', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee(editingEmp);
    setAddModalOpen(false);
    setEditingEmp({});
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmp.id) {
      updateEmployee(editingEmp.id, editingEmp);
      setEditModalOpen(false);
      setEditingEmp({});
    }
  };

  const handleUploadDocToEmployee = (empId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const newDoc = {
      fileName: file.name,
      type: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
      category: 'Uploaded Verification Document',
      uploadedAt: new Date().toISOString().split('T')[0],
      verified: true,
      size: `${(file.size / 1024).toFixed(1)} KB`
    };
    uploadEmployeeDocument(empId, newDoc);
    if (profileModalEmp && profileModalEmp.id === empId) {
      setProfileModalEmp({
        ...profileModalEmp,
        documents: [newDoc as any, ...(profileModalEmp.documents || [])]
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">360° Employee Master Directory</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
              {filteredEmployees.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real data preloaded from VPHS Master Data spreadsheet with statutory PF/ESI/PT numbers & KYC vault attachments.
          </p>
        </div>

        {role !== 'EMPLOYEE' && (
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all">
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Import Excel</span>
              <input type="file" accept=".xlsx, .xls, .csv" onChange={handleImportExcel} className="hidden" />
            </label>

            <button
              onClick={handleExportExcel}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow transition-all"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export XLSX</span>
            </button>

            <button
              onClick={() => {
                setEditingEmp({});
                setAddModalOpen(true);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>New Employee</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-4 shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Name, Emp ID, Mobile, PAN, Aadhaar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {allSites.map((s, i) => (
              <option key={i} value={s}>{s === 'All' ? 'All Client Sites' : s}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {allDepts.map((d, i) => (
              <option key={i} value={d}>{d === 'All' ? 'All Departments' : d}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
            <option value="Inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#070e1e] text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-[#1f2f58]">
              <tr>
                <th className="px-4 py-3.5">Emp ID & Name</th>
                <th className="px-4 py-3.5">Designation / Dept</th>
                <th className="px-4 py-3.5">Assigned Site</th>
                <th className="px-4 py-3.5">Contact / Mobile</th>
                <th className="px-4 py-3.5">Statutory (PF / ESI / UAN)</th>
                <th className="px-4 py-3.5">KYC Documents</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2f58]/60">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    No employee records match the given criteria.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-900/60 transition-colors">
                    {/* Emp ID & Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] font-bold text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-amber-500/30">
                            {emp.id}
                          </span>
                          <p className="font-bold text-white mt-0.5">{emp.name}</p>
                          <span className="text-[10px] text-slate-500">{emp.gender} • {emp.empType}</span>
                        </div>
                      </div>
                    </td>

                    {/* Designation / Dept */}
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-200">{emp.designation}</p>
                      <span className="text-[10px] text-slate-400">{emp.department}</span>
                    </td>

                    {/* Site */}
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-slate-300 font-medium truncate max-w-[180px]" title={emp.siteUnit}>
                        {emp.siteUnit}
                      </p>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-3.5 font-mono text-[11px]">
                      <p className="text-slate-200">{emp.mobile}</p>
                      <p className="text-[10px] text-slate-400 font-sans truncate max-w-[140px]">{emp.email}</p>
                    </td>

                    {/* Statutory PF / ESI */}
                    <td className="px-4 py-3.5 font-mono text-[10px]">
                      <p><span className="text-slate-500">UAN:</span> {emp.uan || 'N/A'}</p>
                      <p><span className="text-slate-500">PAN:</span> {emp.pan || 'N/A'}</p>
                    </td>

                    {/* KYC Documents count */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setProfileModalEmp(emp)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-[10px] font-semibold transition-all"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>{emp.documents?.length || 0} Vault Docs</span>
                      </button>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                        emp.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      }`}>
                        {emp.status === 'Active' ? '● Active' : '○ Inactive'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setProfileModalEmp(emp)}
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                          title="View 360° Profile"
                        >
                          <Eye className="w-4 h-4 text-amber-400" />
                        </button>

                        {/* RBAC & Profile Edit Button for individual employee */}
                        {(isSuperAdmin || role === 'HR_ADMIN') && (
                          <button
                            onClick={() => handleOpenRbacModalForEmp(emp)}
                            className="px-2 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                            title="Configure Person-Specific RBAC, Sites & Profile"
                          >
                            <Shield className="w-3 h-3 text-purple-400" />
                            <span>🛡️ RBAC</span>
                          </button>
                        )}

                        {role !== 'EMPLOYEE' && (
                          <>
                            <button
                              onClick={() => {
                                setEditingEmp(emp);
                                setEditModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                              title="Edit Employee"
                            >
                              <Edit2 className="w-4 h-4 text-sky-400" />
                            </button>
                            {role === 'SUPER_ADMIN' && (
                              <button
                                onClick={() => deleteEmployee(emp.id)}
                                className="p-1.5 rounded-lg bg-slate-900 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 cursor-pointer"
                                title="Delete Employee"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
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

      {/* 360° Employee Detail Modal with KYC Documents */}
      {profileModalEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-4xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1f2f58]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg">
                  {profileModalEmp.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{profileModalEmp.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
                      {profileModalEmp.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{profileModalEmp.designation} • {profileModalEmp.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setProfileModalEmp(null);
                    setErpActiveTab('payroll');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>View Payslips</span>
                </button>
                {(isSuperAdmin || role === 'HR_ADMIN') && (
                  <button
                    onClick={() => {
                      const curEmp = profileModalEmp;
                      setProfileModalEmp(null);
                      handleOpenRbacModalForEmp(curEmp);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    <span>🛡️ Configure RBAC & Logins</span>
                  </button>
                )}
                <button
                  onClick={() => setProfileModalEmp(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Box 1: Personal & Employment */}
              <div className="p-4 rounded-xl bg-slate-900 border border-[#1f2f58] space-y-2">
                <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider mb-2">Personal Details</h4>
                <p><span className="text-slate-400">Gender / Status:</span> {profileModalEmp.gender} • {profileModalEmp.maritalStatus}</p>
                <p><span className="text-slate-400">Date of Birth:</span> {profileModalEmp.dob}</p>
                <p><span className="text-slate-400">Date of Joining:</span> {profileModalEmp.doj}</p>
                <p><span className="text-slate-400">Father's Name:</span> {profileModalEmp.fatherName || 'N/A'}</p>
                <p><span className="text-slate-400">Assigned Unit:</span> {profileModalEmp.siteUnit}</p>
              </div>

              {/* Box 2: Statutory & KYC */}
              <div className="p-4 rounded-xl bg-slate-900 border border-[#1f2f58] space-y-2">
                <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider mb-2">Statutory & ID Numbers</h4>
                <p><span className="text-slate-400">Aadhaar No:</span> <span className="font-mono text-white">{profileModalEmp.aadhar}</span></p>
                <p><span className="text-slate-400">PAN No:</span> <span className="font-mono text-white">{profileModalEmp.pan}</span></p>
                <p><span className="text-slate-400">UAN:</span> <span className="font-mono text-white">{profileModalEmp.uan || 'N/A'}</span></p>
                <p><span className="text-slate-400">PF Member No:</span> <span className="font-mono text-white">{profileModalEmp.pfNo || 'N/A'}</span></p>
                <p><span className="text-slate-400">ESIC IP No:</span> <span className="font-mono text-white">{profileModalEmp.esiNo || 'N/A'}</span></p>
              </div>

              {/* Box 3: Banking & Salary */}
              <div className="p-4 rounded-xl bg-slate-900 border border-[#1f2f58] space-y-2">
                <h4 className="font-bold text-amber-400 uppercase text-[11px] tracking-wider mb-2">Bank & Compensation</h4>
                <p><span className="text-slate-400">Bank Name:</span> {profileModalEmp.bankName}</p>
                <p><span className="text-slate-400">Account No:</span> <span className="font-mono text-white">{profileModalEmp.bankAc}</span></p>
                <p><span className="text-slate-400">IFSC Code:</span> <span className="font-mono text-white">{profileModalEmp.ifsc}</span></p>
                <p><span className="text-slate-400">Gross Salary:</span> <span className="font-mono text-emerald-400 font-bold">₹{profileModalEmp.salary?.gross || 24000}/mo</span></p>
                <p><span className="text-slate-400">Net Take-Home:</span> <span className="font-mono text-amber-400 font-bold">₹{profileModalEmp.salary?.net || 21500}/mo</span></p>
              </div>
            </div>

            {/* Address Details */}
            <div className="p-4 rounded-xl bg-slate-900 border border-[#1f2f58] text-xs space-y-1">
              <span className="font-bold text-amber-400 uppercase text-[11px] tracking-wider block">Residential Address</span>
              <p className="text-slate-300">{profileModalEmp.permanentAddress}</p>
            </div>

            {/* Attached KYC Document Vault */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">KYC Document Vault ({profileModalEmp.documents?.length || 0} Files)</h4>
                </div>
                <label className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Attach Document</span>
                  <input
                    type="file"
                    accept="image/*, .pdf"
                    onChange={(e) => handleUploadDocToEmployee(profileModalEmp.id, e)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {profileModalEmp.documents?.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-[#1f2f58] hover:border-amber-500/40 transition-all flex items-center justify-between"
                  >
                    <div className="space-y-0.5 truncate">
                      <span className="text-[10px] font-bold text-amber-400 uppercase block">{doc.category}</span>
                      <p className="text-xs font-semibold text-white truncate" title={doc.fileName}>{doc.fileName}</p>
                      <p className="text-[10px] text-slate-500">{doc.size || 'Verified'} • {doc.uploadedAt}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex-shrink-0">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Employee Modal */}
      {(addModalOpen || editModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <h3 className="text-base font-bold text-white">
                {addModalOpen ? 'Onboard New Employee' : `Edit Employee: ${editingEmp.name}`}
              </h3>
              <button
                onClick={() => {
                  setAddModalOpen(false);
                  setEditModalOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addModalOpen ? handleSaveAdd : handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Employee ID</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VPHS0082"
                    value={editingEmp.id || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, id: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={editingEmp.name || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, name: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Facility Associate, Supervisor"
                    value={editingEmp.designation || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, designation: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="Facility Management, HR, Security"
                    value={editingEmp.department || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, department: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Mobile</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 00000"
                    value={editingEmp.mobile || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, mobile: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Aadhaar Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012"
                    value={editingEmp.aadhar || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, aadhar: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">PAN Number</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={editingEmp.pan || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, pan: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Assigned Client Site</label>
                  <input
                    type="text"
                    placeholder="e.g. Microsoft India Campus"
                    value={editingEmp.siteUnit || ''}
                    onChange={(e) => setEditingEmp({ ...editingEmp, siteUnit: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={editingEmp.status || 'Active'}
                    onChange={(e) => setEditingEmp({ ...editingEmp, status: e.target.value as any })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Permanent Residential Address</label>
                <textarea
                  rows={2}
                  placeholder="Street, City, State, PIN"
                  value={editingEmp.permanentAddress || ''}
                  onChange={(e) => setEditingEmp({ ...editingEmp, permanentAddress: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-3 border-t border-[#1f2f58] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setEditModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow cursor-pointer"
                >
                  {addModalOpen ? 'Save Employee' : 'Update Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PERSON-SPECIFIC RBAC CONFIGURATOR MODAL */}
      {editingRbacUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1f2f58]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black text-base shadow-lg">
                  🛡️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">
                      Person-Specific RBAC & Profile: {editingRbacUser.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold">
                      Person-Specific Access
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Emp ID: <strong className="text-amber-400 font-mono">{editingRbacUser.employeeId || editingRbacUser.username}</strong> • Login ID: <strong className="text-purple-300 font-mono">{editingRbacUser.username}</strong> • {editingRbacUser.designation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingRbacUser(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-[#1f2f58] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRbac} className="space-y-6 text-xs text-slate-200">
              {/* Profile & Credentials Section */}
              <div className="bg-[#070e1e] border border-[#1f2f58] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>1. User Identity, Login Access & Email Details</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Edit Name, Login ID, and Email for this account</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Full Name (Display Name) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={rbacFormData.name}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, name: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-semibold focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Login ID / Username */}
                  <div>
                    <label className="block text-amber-400 font-bold mb-1">
                      Login ID / Username (Access ID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VPHS0040, rahul.admin"
                      value={rbacFormData.username}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, username: e.target.value })}
                      className="w-full bg-[#0b1329] border border-amber-500/40 rounded-xl px-3 py-2 text-amber-300 font-mono font-bold focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {/* Login Email Address */}
                  <div>
                    <label className="block text-sky-400 font-bold mb-1">
                      Login Email Address (Access Mail) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@vphs.in"
                      value={rbacFormData.email}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, email: e.target.value })}
                      className="w-full bg-[#0b1329] border border-sky-500/40 rounded-xl px-3 py-2 text-sky-200 font-mono focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Designation / Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Facility Manager, Security Lead"
                      value={rbacFormData.designation}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, designation: e.target.value })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Reset Password */}
                  <div>
                    <label className="block text-purple-300 font-bold mb-1">Login Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={rbacFormData.password}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, password: e.target.value })}
                      className="w-full bg-[#0b1329] border border-purple-500/40 rounded-xl px-3 py-2 text-purple-200 font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {/* Account Access Status */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Account Access Status</label>
                    <select
                      value={rbacFormData.status}
                      onChange={(e) => setRbacFormData({ ...rbacFormData, status: e.target.value as 'Active' | 'Suspended' })}
                      className="w-full bg-[#0b1329] border border-[#1f2f58] rounded-xl px-3 py-2 text-white font-bold focus:border-purple-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Active">🟢 Active (Access Granted)</option>
                      <option value="Suspended">🔴 Suspended (Access Blocked)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Role & Site Scope Section */}
              <div className="bg-[#070e1e] border border-[#1f2f58] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>2. Role Tier & Site Scoping</span>
                  </h4>
                  <span className="text-[10px] text-slate-400">Selecting a role applies preset baselines</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">Assigned Primary Role</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { role: 'SUPER_ADMIN', label: '👑 Super Admin (Full Control)', desc: 'Master access to all system modules & edits' },
                        { role: 'HR_ADMIN', label: '👥 HR Admin (HR & Payroll Master)', desc: 'Staff directory, payroll, payslips & fines' },
                        { role: 'SITE_MANAGER', label: '🏢 Site Manager (Site Lead)', desc: 'Scoped to assigned sites & employee attendance' },
                        { role: 'SUPERVISOR', label: '👷 Supervisor (Field Lead)', desc: 'Team rosters and biometric attendance overrides' },
                        { role: 'EMPLOYEE', label: '🟢 Employee (Self-Service)', desc: 'Confidential own attendance and payslip view' },
                      ].map((item) => (
                        <label
                          key={item.role}
                          onClick={() => handleRoleChangeInRbac(item.role as Role)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            rbacFormData.role === item.role
                              ? 'bg-purple-950/60 border-purple-500 text-white shadow-sm'
                              : 'bg-[#0b1329] border-[#1f2f58] text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-xs">{item.label}</div>
                            <div className="text-[10px] text-slate-400">{item.desc}</div>
                          </div>
                          <input
                            type="radio"
                            name="rbacRoleEmp"
                            checked={rbacFormData.role === item.role}
                            onChange={() => handleRoleChangeInRbac(item.role as Role)}
                            className="text-purple-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Scoped Sites Selection */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5">
                      Client Site Scoping (Multi-Select)
                    </label>
                    <p className="text-[10px] text-slate-400 mb-2">
                      Leave empty to grant access across all enterprise sites, or pick specific units.
                    </p>
                    <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      {[
                        'Microsoft India (R & D) Pvt. Ltd',
                        'Amazon HYD-1 Fulfillment Hub',
                        'Google Signature Tower Campus',
                        'Hyderabad Central Mall & Multiplex',
                        'Novartis Knowledge City Campus',
                        'GMR Rajiv Gandhi International Airport',
                        'VPHS Corporate Headquarters'
                      ].map((site) => {
                        const isSelected = rbacFormData.assignedSites.includes(site);
                        return (
                          <div
                            key={site}
                            onClick={() => handleToggleSite(site)}
                            className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition-all ${
                              isSelected
                                ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-semibold'
                                : 'bg-[#0b1329] border-[#1f2f58] text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            <span className="truncate max-w-[240px]">{site}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-600'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 12-Module Granular Custom Permissions Toggles */}
              <div className="bg-[#070e1e] border border-[#1f2f58] rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>3. Granular 12-Module Custom Permission Toggles</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Toggle individual module access for this specific person. Overrides standard role presets.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRbacFormData(prev => ({
                        ...prev,
                        customPermissions: { ...DEFAULT_ROLE_PERMISSIONS[prev.role] }
                      }));
                      showToast('Reset permissions to standard role preset baselines', 'info');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-[#1f2f58] hover:border-amber-500 text-amber-400 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Preset</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { key: 'cms_edit' as keyof UserPermissions, label: '🎨 Visual CMS Page Editor', desc: 'Edit all public website pages & banners live', category: 'Admin & System' },
                    { key: 'media_upload' as keyof UserPermissions, label: '🖼️ Media Library Uploads', desc: 'Upload, delete and replace multimedia images', category: 'Admin & System' },
                    { key: 'user_management' as keyof UserPermissions, label: '👥 User Accounts & RBAC', desc: 'Create, modify, and manage user login credentials', category: 'Admin & System' },
                    { key: 'audit_logs' as keyof UserPermissions, label: '🛡️ Security Audit Logs', desc: 'View complete system audit trail and IP logs', category: 'Admin & System' },
                    { key: 'company_settings' as keyof UserPermissions, label: '⚙️ System Settings & Branding', desc: 'Configure enterprise identity and statutory formulas', category: 'Admin & System' },
                    { key: 'directory_all' as keyof UserPermissions, label: '📖 Employee 360° Directory', desc: 'View all enterprise employees across all sites', category: 'Staff & Operations' },
                    { key: 'kyc_vault' as keyof UserPermissions, label: '🔒 KYC Document Vault', desc: 'Browse and upload verified Aadhaar/PAN documents', category: 'Staff & Operations' },
                    { key: 'attendance_override' as keyof UserPermissions, label: '⏰ Attendance Overrides', desc: 'Verify punches, approve late logins and shifts', category: 'Staff & Operations' },
                    { key: 'leave_approvals' as keyof UserPermissions, label: '✈️ Leave Approvals', desc: 'Review, approve, or reject employee leave requests', category: 'Staff & Operations' },
                    { key: 'salary_sheet_edit' as keyof UserPermissions, label: '📊 August Salary Sheet Master', desc: 'Full edit and sync control over operational salary sheet', category: 'Finance & Payroll' },
                    { key: 'payslip_edit' as keyof UserPermissions, label: '📄 Staff Computerized Payslips', desc: 'Generate and edit staff rate cards and PDF payslips', category: 'Finance & Payroll' },
                    { key: 'fines_management' as keyof UserPermissions, label: '⚖️ Fines & Disciplinary Ledger', desc: 'Log disciplinary fines and penalty deductions', category: 'Finance & Payroll' },
                  ].map((mod) => {
                    const isEnabled = !!rbacFormData.customPermissions[mod.key];
                    return (
                      <div
                        key={mod.key}
                        onClick={() => handleTogglePermission(mod.key)}
                        className={`p-3 rounded-2xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                          isEnabled
                            ? 'bg-purple-950/40 border-purple-500/60 shadow-sm'
                            : 'bg-[#0b1329] border-[#1f2f58] opacity-75 hover:opacity-100 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className={`font-bold text-xs ${isEnabled ? 'text-purple-200' : 'text-slate-300'}`}>
                              {mod.label}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{mod.desc}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#1f2f58]/60 text-[10px]">
                          <span className="text-slate-500 font-mono">{mod.category}</span>
                          <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-500 border border-slate-700'
                          }`}>
                            {isEnabled ? 'Allowed' : 'Locked'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1f2f58]">
                <button
                  type="button"
                  onClick={() => setEditingRbacUser(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-[#1f2f58] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 cursor-pointer"
                >
                  Save Person RBAC Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
