import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Building2,
  CalendarCheck,
  Receipt,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Brush,
  UserCheck,
  FileSpreadsheet,
  CheckCircle2,
  Shield,
  Cpu,
  Award,
  Clock,
  Star,
  PhoneCall,
  Send,
  Lock,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const HomePage: React.FC = () => {
  const { navigateTo, pages, showToast } = useApp();
  const pageData = pages.find(p => p.id === 'home') || pages[0];

  // Quick Audit form state
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    serviceType: 'Integrated Facility Management',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const heroSection = pageData.sections.find(s => s.id === 'hero' && s.visible);
  const statsSection = pageData.sections.find(s => s.id === 'stats' && s.visible);
  const servicesSection = pageData.sections.find(s => s.id === 'services' && s.visible);
  const clientsSection = pageData.sections.find(s => s.id === 'clients' && s.visible);
  const whyUsSection = pageData.sections.find(s => s.id === 'why-us' && s.visible);
  const testimonialsSection = pageData.sections.find(s => s.id === 'testimonials' && s.visible);
  const ctaSection = pageData.sections.find(s => s.id === 'cta' && s.visible);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Site audit request received! Our facility operations team will contact you within 2 hours.', 'success');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5 text-amber-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-sky-400" />;
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5 text-emerald-400" />;
      case 'Receipt': return <Receipt className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Brush': return <Brush className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-400" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-emerald-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
      case 'Shield': return <Shield className="w-6 h-6 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Award': return <Award className="w-6 h-6 text-amber-400" />;
      case 'Clock': return <Clock className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-0 text-slate-100">
      {/* 1. HERO SECTION */}
      {heroSection && (
        <section className="relative min-h-[92vh] flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e]">
          {/* Ambient Lighting & Glows */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

          <ChangeImageButton pageId="home" sectionId="hero" field="image" />

          <div className="max-w-6xl mx-auto w-full text-center relative z-10 space-y-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase animate-pulse-subtle shadow-gold-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <InlineEditable
                pageId="home"
                sectionId="hero"
                field="badge"
                value={heroSection.badge || 'ENTERPRISE HR & FACILITY MANAGEMENT ERP'}
              />
            </div>

            {/* Main Brand Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              VPHS SERVICES <span className="text-amber-500">PVT. LTD.</span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              <InlineEditable
                pageId="home"
                sectionId="hero"
                field="subtitle"
                multiline
                value={heroSection.subtitle || 'Complete facility operations, employee management, multi-site attendance rosters, statutory compliance, automated payroll & digital identity portal.'}
              />
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('login')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-sm tracking-wider uppercase shadow-gold-md hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>{heroSection.buttonText || 'ACCESS ERP PORTAL'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('services')}
                className="w-full sm:w-auto px-7 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-[#1f2f58] hover:border-amber-500/40 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>{heroSection.secondaryButtonText || 'EXPLORE OUR SERVICES'}</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* 4 Core Concept Cards (As Seen in Original VPHS Design) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-12 text-left">
              {heroSection.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329]/80 border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-6 shadow-navy-sm hover:shadow-gold-sm transition-all group backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] group-hover:border-amber-500/40 flex items-center justify-center mb-4 transition-colors">
                      {getIcon(item.icon)}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1f2f58]/50 flex items-center text-[11px] font-semibold text-amber-400/90 group-hover:text-amber-300">
                    <span>Learn capability</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. STATS COUNTER BAR */}
      {statsSection && (
        <section className="py-14 bg-[#050a14] border-y border-[#1f2f58] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {statsSection.items?.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. CORE SERVICES SHOWCASE */}
      {servicesSection && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e] relative">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
                {servicesSection.badge || 'INTEGRATED OPERATIONAL EXPERTISE'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                <InlineEditable
                  pageId="home"
                  sectionId="services"
                  field="title"
                  value={servicesSection.title}
                />
              </h2>
              <p className="text-sm text-slate-400">
                <InlineEditable
                  pageId="home"
                  sectionId="services"
                  field="subtitle"
                  value={servicesSection.subtitle || ''}
                />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesSection.items?.map((serv, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] hover:border-amber-500/50 rounded-2xl p-7 shadow-lg transition-all hover:scale-[1.01] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center">
                      {getIcon(serv.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-white">{serv.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{serv.desc}</p>
                    
                    {serv.features && (
                      <div className="space-y-1.5 pt-2">
                        {serv.features.map((feat: string, fIdx: number) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#1f2f58]/60">
                    <button
                      onClick={() => navigateTo('services')}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>Explore Service Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => navigateTo('services')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#1f2f58] hover:border-amber-500/40 text-xs font-bold tracking-wide transition-all"
              >
                View Complete Technical Service Catalog →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. CLIENT LOGO & CAMPUS SHOWCASE */}
      {clientsSection && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050a14] border-t border-[#1f2f58]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                {clientsSection.badge || 'TRUSTED BY INDUSTRY LEADERS'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {clientsSection.title}
              </h2>
              <p className="text-xs text-slate-400">
                {clientsSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {clientsSection.items?.map((cli, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] rounded-xl p-4 text-center hover:border-amber-500/50 transition-all flex flex-col justify-center items-center group"
                >
                  <span className="text-2xl mb-2">{cli.logo.split(' ')[0]}</span>
                  <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    {cli.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{cli.industry}</p>
                  <span className="mt-2 text-[9px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {cli.staff}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. WHY CHOOSE VPHS (THE VPHS ADVANTAGE) */}
      {whyUsSection && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e] border-t border-[#1f2f58]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
                {whyUsSection.badge || 'THE VPHS ADVANTAGE'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {whyUsSection.title}
              </h2>
              <p className="text-sm text-slate-400">
                {whyUsSection.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUsSection.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-b from-[#0b1329] to-[#070e1e] border border-[#1f2f58] rounded-2xl p-6 shadow-md hover:border-amber-500/40 transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-[#1f2f58] flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. TESTIMONIALS */}
      {testimonialsSection && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050a14] border-t border-[#1f2f58]">
          <div className="max-w-7xl mx-auto space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                {testimonialsSection.badge || 'CLIENT TESTIMONIALS'}
              </span>
              <h2 className="text-3xl font-extrabold text-white">{testimonialsSection.title}</h2>
              <p className="text-xs text-slate-400">{testimonialsSection.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonialsSection.items?.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-7 flex flex-col justify-between shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[#1f2f58] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.author}</h4>
                      <p className="text-[10px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. QUICK SITE AUDIT CONSULTATION FORM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] to-[#050a14] border-t border-[#1f2f58]">
        <div className="max-w-5xl mx-auto bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FREE SITE INSPECTION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Request an Enterprise Facility Audit & Quotation
              </h3>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                Our senior facility engineering team conducts on-site surveys across commercial tech parks, healthcare centers, and logistics warehouses with full statutory cost estimates.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#1f2f58]">
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Compliant with Telangana Labour Dept & CLRA</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Zero Non-Compliance Guarantee (PF/ESI/PT)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Direct Hotline: +91 40 4852 9100 / +91 98490 12345</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-[#1f2f58]">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Thank You for Reaching Out!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your site audit inquiry has been registered in our central operations queue. A VPHS Facility Manager will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Reddy"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tech Solutions India"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98490 00000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Required</label>
                  <select
                    value={formState.serviceType}
                    onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>Integrated Facility Management</option>
                    <option>Mechanized Corporate Housekeeping</option>
                    <option>PSARA Security & Access Control</option>
                    <option>Manpower & Staffing Deployment</option>
                    <option>Valet & Traffic Marshalling</option>
                    <option>HR & Payroll ERP Automation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Site Details / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Provide site location, square footage, expected headcount, or specific requirements"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#070e1e] border border-[#1f2f58] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs tracking-wider uppercase shadow-gold-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Site Audit Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
