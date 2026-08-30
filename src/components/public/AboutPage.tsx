import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  Target,
  Eye,
  HeartHandshake,
  Users,
  Building,
  CheckCircle,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const AboutPage: React.FC = () => {
  const { navigateTo, pages } = useApp();
  const pageData = pages.find(p => p.id === 'about') || pages[0];

  const aboutHero = pageData.sections.find(s => s.id === 'about-hero' && s.visible);
  const missionVision = pageData.sections.find(s => s.id === 'mission-vision' && s.visible);
  const complianceStandards = pageData.sections.find(s => s.id === 'compliance-standards' && s.visible);

  return (
    <div className="space-y-0 text-slate-100">
      {/* Hero Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="about" sectionId="about-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {aboutHero?.badge || 'ABOUT OUR COMPANY'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="about"
              sectionId="about-hero"
              field="title"
              value={aboutHero?.title || 'Engineering Pristine, Secure & Compliant Workplaces'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="about"
              sectionId="about-hero"
              field="subtitle"
              multiline
              value={aboutHero?.subtitle || 'VPHS Services Pvt. Ltd. is a premier Indian Facility Management and Human Resources ERP firm providing end-to-end enterprise solutions for top corporations.'}
            />
          </p>
        </div>
      </section>

      {/* Corporate Overview & Heritage */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">OUR OPERATIONAL EXCELLENCE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                A Unified Force of 1,500+ Professionals Across South & Central India
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Founded with the singular purpose of eliminating corporate operational friction, VPHS Services Pvt. Ltd. has grown from a specialized facility maintenance provider to an integrated enterprise powerhouse serving technology giants (Microsoft India, Amazon), hospitality chains (Third Wave Coffee), and medical facilities.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              What sets VPHS apart is our uncompromising marriage of rigorous field governance with automated digital ERP systems. From biometric attendance geotagging and real-time incident reporting to computerized EPF, ESIC, and PT disbursements, we ensure 100% compliance transparency at every level.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1f2f58]">
                <div className="text-2xl font-black text-amber-400">100%</div>
                <div className="text-xs font-bold text-white mt-1">EPFO & ESIC On-Time</div>
                <div className="text-[11px] text-slate-400">Zero default records</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b1329] border border-[#1f2f58]">
                <div className="text-2xl font-black text-amber-400">ISO 9001</div>
                <div className="text-xs font-bold text-white mt-1">Quality Certified</div>
                <div className="text-[11px] text-slate-400">Standardized SOPs</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#1f2f58] shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80"
                alt="VPHS Operations Hub"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1e] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0b1329]/90 border border-[#1f2f58] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">VPHS Corporate Command Hub</h4>
                    <p className="text-[11px] text-amber-400">Kavuri Hills, Madhapur, Hyderabad</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    Active Operations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      {missionVision && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a14] border-t border-[#1f2f58]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                {missionVision.badge || 'PURPOSE & PRINCIPLES'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {missionVision.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionVision.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-7 space-y-4 hover:border-amber-500/40 transition-all shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center text-amber-400">
                    {idx === 0 ? <Target className="w-6 h-6" /> : idx === 1 ? <Eye className="w-6 h-6" /> : <HeartHandshake className="w-6 h-6" />}
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statutory & Quality Certifications */}
      {complianceStandards && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070e1e] border-t border-[#1f2f58]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                {complianceStandards.badge || 'STATUTORY & QUALITY CERTIFICATIONS'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {complianceStandards.title}
              </h2>
              <p className="text-xs text-slate-400">
                {complianceStandards.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceStandards.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
