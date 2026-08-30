import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Brush,
  ShieldCheck,
  UserCheck,
  FileSpreadsheet,
  CheckCircle2,
  Cpu,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const ServicesPage: React.FC = () => {
  const { navigateTo, pages } = useApp();
  const pageData = pages.find(p => p.id === 'services') || pages[0];

  const servicesHero = pageData.sections.find(s => s.id === 'services-hero' && s.visible);
  const detailedServices = pageData.sections.find(s => s.id === 'detailed-services' && s.visible);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Brush': return <Brush className="w-6 h-6 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-rose-400" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-emerald-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-blue-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-0 text-slate-100">
      {/* Services Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="services" sectionId="services-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {servicesHero?.badge || 'OUR SERVICES'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="services"
              sectionId="services-hero"
              field="title"
              value={servicesHero?.title || 'End-to-End Enterprise Facility & Manpower Solutions'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="services"
              sectionId="services-hero"
              field="subtitle"
              multiline
              value={servicesHero?.subtitle || 'From pristine corporate housekeeping and armed security to contract staffing and cloud HR ERP, VPHS delivers excellence across every square foot.'}
            />
          </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      {detailedServices && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {detailedServices.title}
              </h2>
              <p className="text-xs text-slate-400">
                {detailedServices.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedServices.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-8 shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01]"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>

                    {item.features && (
                      <div className="space-y-2 pt-3 border-t border-[#1f2f58]/60">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                          Included Capabilities:
                        </span>
                        {item.features.map((f: string, i: number) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1f2f58]">
                    <button
                      onClick={() => navigateTo('contact')}
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Request Quote for {item.title.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
