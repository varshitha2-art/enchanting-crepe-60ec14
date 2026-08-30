import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  CalendarCheck,
  Receipt,
  ShieldCheck,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database
} from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const HrPayrollPage: React.FC = () => {
  const { navigateTo, pages } = useApp();
  const pageData = pages.find(p => p.id === 'hr-payroll') || pages[0];

  const hrHero = pageData.sections.find(s => s.id === 'hr-hero' && s.visible);
  const hrFeatures = pageData.sections.find(s => s.id === 'hr-features' && s.visible);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-6 h-6 text-amber-400" />;
      case 'CalendarCheck': return <CalendarCheck className="w-6 h-6 text-sky-400" />;
      case 'Receipt': return <Receipt className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-amber-400" />;
      default: return <FileSpreadsheet className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-0 text-slate-100">
      {/* Hero Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="hr-payroll" sectionId="hr-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {hrHero?.badge || 'HR & PAYROLL ERP'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="hr-payroll"
              sectionId="hr-hero"
              field="title"
              value={hrHero?.title || 'Unified Workforce Management & Automated Payroll'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="hr-payroll"
              sectionId="hr-hero"
              field="subtitle"
              multiline
              value={hrHero?.subtitle || 'From onboarding and KYC document vaults to computerized statutory payroll calculations and instant PDF payslips.'}
            />
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigateTo('login')}
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-gold-md hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Employee Self-Service / ERP</span>
            </button>
          </div>
        </div>
      </section>

      {/* HR Pillars */}
      {hrFeatures && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{hrFeatures.title}</h2>
              <p className="text-xs text-slate-400">{hrFeatures.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hrFeatures.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-8 shadow-xl space-y-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>

                  {item.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#1f2f58]/60">
                      {item.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statutory Architecture Diagram */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a14] border-t border-[#1f2f58]">
        <div className="max-w-5xl mx-auto bg-slate-900/60 border border-[#1f2f58] rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-amber-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Full Indian Statutory Compliance Engine</h3>
              <p className="text-xs text-slate-400">Integrated EPF, ESIC, Professional Tax & CLRA Rules</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1f2f58] space-y-1.5">
              <span className="text-xs font-bold text-amber-400">EPFO (12% + 12%)</span>
              <p className="text-xs text-slate-300">Automatic ECR text generation, UAN mapping, and EPF Form 3A/6A reports.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1f2f58] space-y-1.5">
              <span className="text-xs font-bold text-amber-400">ESIC (0.75% + 3.25%)</span>
              <p className="text-xs text-slate-300">Wage threshold auto-calculation, IP insurance numbers, and dispensary slips.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1f2f58] space-y-1.5">
              <span className="text-xs font-bold text-amber-400">Telangana Labour Slabs</span>
              <p className="text-xs text-slate-300">Minimum wage compliance for Skilled, Semi-Skilled, and Unskilled roles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
