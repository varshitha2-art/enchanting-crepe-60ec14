import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, companySettings } = useApp();

  return (
    <footer className="bg-[#050a14] border-t border-[#1f2f58] text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1f2f58]/80">
          {/* Company Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-black text-slate-950 text-xl shadow-md shadow-amber-500/20">
                V
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-wider">VPHS SERVICES</span>
                <span className="block text-[10px] text-amber-400 font-bold tracking-widest uppercase">PVT. LTD.</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              {companySettings.tagline || 'Leading Indian facility management, mechanized housekeeping, armed security, staffing, and automated HR ERP enterprise.'}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-[#1f2f58]">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-200">ISO 9001 & 45001</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-[#1f2f58]">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">100% Statutory Compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'About Us', 'Services', 'Facilities', 'HR & Payroll', 'Clients / Sites', 'Careers', 'Contact'].map((name, i) => {
                const slugs: Record<string, string> = {
                  'Home': 'home',
                  'About Us': 'about',
                  'Services': 'services',
                  'Facilities': 'facilities',
                  'HR & Payroll': 'hr-payroll',
                  'Clients / Sites': 'clients',
                  'Careers': 'careers',
                  'Contact': 'contact'
                };
                return (
                  <li key={i}>
                    <button
                      onClick={() => navigateTo(slugs[name] || 'home')}
                      className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-300"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                      <span>{name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Core Verticals
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('services')}>Integrated Facility Management</li>
              <li className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('services')}>Mechanized Housekeeping</li>
              <li className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('services')}>Corporate & Industrial Security</li>
              <li className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('services')}>Manpower & Contract Staffing</li>
              <li className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('services')}>Valet & Event Marshalling</li>
              <li className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('hr-payroll')}>Automated HR & Payroll ERP</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Headquarters
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{companySettings.address}, {companySettings.city} {companySettings.pincode}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{companySettings.primaryPhone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{companySettings.email}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="w-full py-2 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Employee & Admin Sign In</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Statutory Registrations */}
        <div className="py-6 border-b border-[#1f2f58]/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-slate-400">
          <div>
            <span className="font-semibold text-slate-300">CIN:</span> {companySettings.cin}
          </div>
          <div>
            <span className="font-semibold text-slate-300">GSTIN:</span> {companySettings.gstin}
          </div>
          <div>
            <span className="font-semibold text-slate-300">EPFO Code:</span> {companySettings.epfoCode}
          </div>
          <div>
            <span className="font-semibold text-slate-300">ESIC Code:</span> {companySettings.esicCode}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 {companySettings.legalName}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('about')}>Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('about')}>Terms of Service</span>
            <span>•</span>
            <span className="hover:text-amber-400 cursor-pointer" onClick={() => navigateTo('contact')}>Statutory Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
