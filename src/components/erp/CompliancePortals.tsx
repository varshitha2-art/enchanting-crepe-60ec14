import React from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_PORTAL_LINKS } from '../../data/initialData';
import { ExternalLink, ShieldCheck, KeyRound, Building, CheckCircle2, Lock } from 'lucide-react';

export const CompliancePortals: React.FC = () => {
  const { companySettings } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Statutory & Operational Compliance Portals</h2>
        </div>
        <p className="text-xs text-slate-400">
          Direct secure bridges to EPFO India, ESIC, Telangana Labour Department, and Fame DIYOS Multi-Site Management.
        </p>
      </div>

      {/* Grid of Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_PORTAL_LINKS.map((portal, idx) => (
          <div
            key={idx}
            className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {portal.code}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Live</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{portal.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{portal.desc}</p>
            </div>

            <div className="pt-4 border-t border-[#1f2f58] flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">{portal.url}</span>
              <a
                href={portal.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
              >
                <span>Launch Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
