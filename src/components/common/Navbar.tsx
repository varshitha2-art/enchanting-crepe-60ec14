import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Building2,
  Menu,
  X,
  LogIn,
  LayoutDashboard,
  Edit3,
  CheckCircle,
  Eye,
  LogOut,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigateTo,
    currentUser,
    logout,
    isEditMode,
    setIsEditMode,
    openPageEditor,
    pages
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'hr-payroll', label: 'HR & Payroll' },
    { id: 'clients', label: 'Clients / Sites' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  return (
    <>
      {/* Top Corporate Status / Edit Mode Bar if Super Admin */}
      {isSuperAdmin && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between shadow-sm z-50 sticky top-0">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span>SUPER ADMIN EDIT MODE:</span>
            <span className="font-normal opacity-90 hidden sm:inline">
              {isEditMode ? 'Visual In-Place Editing Active. Hover or click edit badges.' : 'Viewing in Live Preview mode.'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                isEditMode ? 'bg-slate-950 text-amber-400 shadow' : 'bg-amber-700/30 hover:bg-amber-700/50 text-slate-950 border border-amber-800/30'
              }`}
            >
              {isEditMode ? '✓ EDIT MODE ON' : 'ENABLE EDIT MODE'}
            </button>
            {activePage !== 'erp' && activePage !== 'login' && (
              <button
                onClick={() => openPageEditor(activePage)}
                className="bg-slate-950 hover:bg-slate-800 text-white px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1 shadow"
              >
                <Edit3 className="w-3 h-3 text-amber-400" />
                <span>Edit This Page</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header className={`sticky ${isSuperAdmin ? 'top-[29px]' : 'top-0'} z-40 bg-[#070e1e]/95 backdrop-blur-md border-b border-[#1f2f58] transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center font-black text-slate-950 text-2xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                V
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold text-white tracking-wider">VPHS SERVICES</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">PVT. LTD.</span>
                  <span className="text-[9px] text-slate-400 font-medium hidden sm:inline">• Facility & HR ERP</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action / Auth Button */}
            <div className="hidden sm:flex items-center gap-3">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-[#1f2f58] hover:border-amber-500/50 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-[120px]">{currentUser.name}</div>
                      <div className="text-[10px] text-amber-400 font-semibold">{currentUser.role.replace('_', ' ')}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0b1329] border border-[#1f2f58] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-[#1f2f58]">
                        <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {currentUser.role}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigateTo('erp');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-slate-800 hover:text-amber-400 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-400" />
                        <span>Open ERP Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 border-t border-[#1f2f58]"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigateTo('login')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Portal Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              {currentUser && (
                <button
                  onClick={() => navigateTo('erp')}
                  className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  title="ERP Dashboard"
                >
                  <LayoutDashboard className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900 border border-[#1f2f58] text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b1329] border-b border-[#1f2f58] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#1f2f58]">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 rounded-lg bg-slate-900 text-xs">
                    <div className="text-white font-bold">{currentUser.name}</div>
                    <div className="text-amber-400">{currentUser.role}</div>
                  </div>
                  <button
                    onClick={() => {
                      navigateTo('erp');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-amber-500 text-slate-950 rounded-lg font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to ERP Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-slate-800 text-rose-400 rounded-lg font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-amber-500 text-slate-950 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Employee / Admin Portal Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
