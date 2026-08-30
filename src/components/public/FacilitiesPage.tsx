import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Shield, CalendarCheck, Award, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const FacilitiesPage: React.FC = () => {
  const { navigateTo, pages } = useApp();
  const pageData = pages.find(p => p.id === 'facilities') || pages[0];

  const facHero = pageData.sections.find(s => s.id === 'fac-hero' && s.visible);
  const facCards = pageData.sections.find(s => s.id === 'fac-cards' && s.visible);

  return (
    <div className="space-y-0 text-slate-100">
      {/* Hero Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="facilities" sectionId="fac-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {facHero?.badge || 'FACILITIES & INFRASTRUCTURE'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="facilities"
              sectionId="fac-hero"
              field="title"
              value={facHero?.title || 'Modern Machinery & High-Touch Hygiene Protocols'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="facilities"
              sectionId="fac-hero"
              field="subtitle"
              multiline
              value={facHero?.subtitle || 'Equipped with industrial ride-on scrubbers, electrostatic sprayers, and safety-certified equipment.'}
            />
          </p>
        </div>
      </section>

      {/* Facilities Cards */}
      {facCards && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {facCards.title}
              </h2>
              <p className="text-xs text-slate-400">
                {facCards.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facCards.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-all shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center text-amber-400">
                    {idx === 0 ? <Cpu className="w-6 h-6" /> : idx === 1 ? <Shield className="w-6 h-6" /> : idx === 2 ? <CalendarCheck className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mechanized Equipment Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a14] border-t border-[#1f2f58]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">OUR FLEET & TOOLS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">State-of-the-Art Mechanized Assets</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Taski & Kärcher Ride-On Floor Scrubbers',
                desc: 'Cleans up to 50,000 sq.ft/hour with automated suction drying for high-traffic corridors.',
                badge: 'Industrial Grade'
              },
              {
                title: 'Roots Single-Disc Buffing & Polishing',
                desc: 'Diamond-pad granite and marble restoration for corporate lobbies and reception halls.',
                badge: 'High Gloss'
              },
              {
                title: 'High-Reach Glass Facade Crawlers',
                desc: 'Safety-certified rope access harnesses and telescopic de-ionized water reach systems.',
                badge: 'Safety Certified'
              },
              {
                title: 'Electrostatic Disinfection Sprayers',
                desc: 'Hospital-grade aerosol misting with Diversey Virex II for rapid cleanroom decontamination.',
                badge: 'Medical Grade'
              },
              {
                title: 'Heavy Duty Wet & Dry Extraction Units',
                desc: 'Deep carpet shampooing, upholstery allergen extraction, and industrial moisture recovery.',
                badge: 'Deep Cleaning'
              },
              {
                title: 'Smart Waste Segregation Compactors',
                desc: 'Color-coded wet/dry/e-waste segregation compliant with municipal green norms.',
                badge: 'Eco Friendly'
              }
            ].map((tool, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-3">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                  {tool.badge}
                </span>
                <h4 className="text-sm font-bold text-white">{tool.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
