import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const ClientsPage: React.FC = () => {
  const { navigateTo, pages, sites } = useApp();
  const pageData = pages.find(p => p.id === 'clients') || pages[0];
  const clientsHero = pageData.sections.find(s => s.id === 'clients-hero' && s.visible);

  return (
    <div className="space-y-0 text-slate-100">
      {/* Hero Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="clients" sectionId="clients-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {clientsHero?.badge || 'CLIENT PORTFOLIO'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="clients"
              sectionId="clients-hero"
              field="title"
              value={clientsHero?.title || 'Trusted by Leading Corporate Brands'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="clients"
              sectionId="clients-hero"
              field="subtitle"
              multiline
              value={clientsHero?.subtitle || 'Discover how VPHS Services powers daily operations for technology campuses, premium retail cafes, and specialized healthcare centers.'}
            />
          </p>
        </div>
      </section>

      {/* Client Sites Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Active Client Deployments & Campuses</h2>
            <p className="text-xs text-slate-400">Real-time facility operations deployed across prime locations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sites.map((site) => (
              <div
                key={site.id}
                className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all"
              >
                <div className="h-48 bg-slate-950 relative overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-transparent to-transparent"></div>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    ● {site.status}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">{site.clientName}</span>
                    <h3 className="text-lg font-bold text-white">{site.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{site.location}, {site.city}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#1f2f58]/60">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="text-slate-400">Deployed Workforce:</span>
                      <span className="font-bold text-amber-400">{site.totalManpower} Personnel</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="text-slate-400">Site Lead:</span>
                      <span className="font-semibold text-slate-200">{site.managerName}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1f2f58]/60">
                    <div className="flex flex-wrap gap-1.5">
                      {site.servicesProvided.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 border border-[#1f2f58]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
