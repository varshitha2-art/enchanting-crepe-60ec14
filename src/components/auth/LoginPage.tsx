import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  X
} from 'lucide-react';
import { Role } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, loginAsPersona, navigateTo, showToast } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      showToast('Please enter your Employee ID or Username', 'error');
      return;
    }
    login(username, password);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Password reset link has been dispatched to ${resetEmail}`, 'success');
    setForgotPasswordOpen(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-screen bg-[#050a14] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Website Button */}
      <div className="w-full max-w-xl mb-4 flex items-center justify-between z-20">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-[#1f2f58] text-xs font-semibold transition-all backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to Corporate Website</span>
        </button>

        <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>RBAC Security Active</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-xl bg-[#0b1329] border border-[#1f2f58] rounded-3xl shadow-2xl overflow-hidden relative z-10">
        <div className="p-8 sm:p-10 space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg shadow-amber-500/20">
                V
              </div>
              <div className="text-left">
                <h1 className="text-xl font-black text-white tracking-wider">VPHS SERVICES</h1>
                <p className="text-[10px] text-amber-400 font-bold tracking-widest uppercase">PVT. LTD. • SECURE, SCALABLE, SEAMLESS</p>
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-xl font-extrabold text-white tracking-wide">ENTERPRISE SIGN IN</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials or select a 1-click role to test data scoping
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Employee ID / Username
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. admin@vphs.in, VPHS-001, hr@vphs.in, VPHS0010"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-slate-900 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] text-amber-400 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password (default: password123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-slate-900 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                />
                <span>Remember credentials</span>
              </label>
              <span className="text-[11px] text-amber-400 font-mono font-medium">Default PW: password123</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs tracking-wider uppercase shadow-gold-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span>SIGN IN TO ERP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Role Fill Section */}
          <div className="pt-5 border-t border-[#1f2f58] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick 1-Click Role Fill</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">Click to test role isolation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginAsPersona('SUPER_ADMIN')}
                className="p-3 rounded-xl border border-purple-500/30 bg-purple-950/20 hover:bg-purple-950/40 text-left transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-purple-300 group-hover:text-purple-200">Vikram Pratap Singh</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40">Super Admin</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">admin@vphs.in • Full System Control</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsPersona('HR_ADMIN')}
                className="p-3 rounded-xl border border-pink-500/30 bg-pink-950/20 hover:bg-pink-950/40 text-left transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-pink-300 group-hover:text-pink-200">Priya Sharma</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-pink-500/30 text-pink-200 border border-pink-400/40">HR Admin</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">hr@vphs.in • HR Master & Payroll</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsPersona('SITE_MANAGER')}
                className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-left transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-cyan-300 group-hover:text-cyan-200">Ramesh Kumar</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-500/30 text-cyan-200 border border-cyan-400/40">Site Manager</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">sitemgr@vphs.in • Microsoft & Amazon Sites</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsPersona('SUPERVISOR')}
                className="p-3 rounded-xl border border-blue-500/30 bg-blue-950/20 hover:bg-blue-950/40 text-left transition-all hover:scale-[1.01] group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-blue-300 group-hover:text-blue-200">Suresh Kumar</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">Supervisor</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">supervisor@vphs.in • Field Team Roster</div>
              </button>

              <button
                type="button"
                onClick={() => loginAsPersona('EMPLOYEE')}
                className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-left transition-all hover:scale-[1.01] sm:col-span-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-emerald-300 group-hover:text-emerald-200">Aamir Khan (Employee Self-Service)</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">Employee</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">VPHS0010 • Own Profile, Attendance & Payslips Only</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="px-8 py-3.5 bg-[#070e1e] border-t border-[#1f2f58] flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secure 256-Bit Encrypted VPHS Enterprise Connection</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Reset Account Password</h4>
              </div>
              <button
                onClick={() => setForgotPasswordOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-xs text-slate-300">
                Enter your registered corporate email or Employee ID. A password reset token will be dispatched.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email / Employee ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. employee@vphs.in"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all"
              >
                Send Password Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
