import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  X
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, navigateTo, showToast } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      showToast('Please enter both your Login ID and Password.', 'error');
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
      <div className="w-full max-w-lg mb-4 flex items-center justify-between z-20">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-[#1f2f58] text-xs font-semibold transition-all backdrop-blur-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to Corporate Website</span>
        </button>

        <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>RBAC Protected</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-lg bg-[#0b1329] border border-[#1f2f58] rounded-3xl shadow-2xl overflow-hidden relative z-10">
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
                Enter your registered Login ID and Password to access the ERP portal
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Login ID / Username
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Enter Login ID (e.g. VPHS ADMIN, VPHS0040)"
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
                  className="text-[11px] text-amber-400 hover:underline font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:bg-slate-900 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
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
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs tracking-wider uppercase shadow-gold-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>SIGN IN TO ERP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Guarantee */}
        <div className="px-8 py-3.5 bg-[#070e1e] border-t border-[#1f2f58] flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secure 256-Bit Encrypted VPHS Enterprise Connection</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Reset Account Password</h4>
              </div>
              <button
                onClick={() => setForgotPasswordOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-xs text-slate-300">
                Enter your registered corporate email or Employee ID. A password reset instruction will be sent to your registered contact.
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
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all cursor-pointer"
              >
                Send Password Reset Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
