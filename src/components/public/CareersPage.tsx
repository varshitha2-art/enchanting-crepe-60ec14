import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, MapPin, CheckCircle2, Send, X, Users, Award, Shield } from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const CareersPage: React.FC = () => {
  const { pages, showToast } = useApp();
  const pageData = pages.find(p => p.id === 'careers') || pages[0];
  const careersHero = pageData.sections.find(s => s.id === 'careers-hero' && s.visible);

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applicant, setApplicant] = useState({ name: '', phone: '', email: '', exp: '', notes: '' });

  const jobOpenings = [
    {
      id: 'job-1',
      title: 'Senior Facility Site Manager',
      site: 'Microsoft India Campus, Hyderabad',
      type: 'Full-Time (Permanent)',
      experience: '4 - 7 Years',
      salary: '₹40,000 - ₹55,000 / Month + PF + ESIC + Bonus',
      skills: ['IFM Operations', 'Client Relations', 'SOP Governance', 'Staff Roster Management']
    },
    {
      id: 'job-2',
      title: 'Operations Field Supervisor',
      site: 'Amazon Fulfillment Center, Shamshabad',
      type: 'Full-Time',
      experience: '2 - 4 Years',
      salary: '₹22,000 - ₹28,000 / Month + Statutory Benefits',
      skills: ['Shift Handover', 'Attendance Verification', 'Machinery Handling', 'Incident Reporting']
    },
    {
      id: 'job-3',
      title: 'Corporate Security Officer / Head Guard',
      site: 'Financial District & Hitech City Campuses',
      type: 'Full-Time (Rotational)',
      experience: '1 - 3 Years (Ex-Servicemen Preferred)',
      salary: '₹18,500 - ₹24,000 / Month + Uniform + Insurance',
      skills: ['PSARA Certified', 'Access Control', 'Visitor Logging', 'First Aid']
    },
    {
      id: 'job-4',
      title: 'HR & Statutory Operations Executive',
      site: 'VPHS Corporate HQ, Madhapur',
      type: 'Full-Time',
      experience: '1 - 3 Years',
      salary: '₹24,000 - ₹32,000 / Month',
      skills: ['EPFO / ESIC Portal Filing', 'Payroll Processing', 'KYC Verification', 'Onboarding']
    }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Application submitted for ${selectedJob}! HR will review your profile.`, 'success');
    setSelectedJob(null);
    setApplicant({ name: '', phone: '', email: '', exp: '', notes: '' });
  };

  return (
    <div className="space-y-0 text-slate-100">
      {/* Hero Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="careers" sectionId="careers-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {careersHero?.badge || 'CAREERS AT VPHS'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="careers"
              sectionId="careers-hero"
              field="title"
              value={careersHero?.title || 'Build Your Future with a Growing Enterprise'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="careers"
              sectionId="careers-hero"
              field="subtitle"
              multiline
              value={careersHero?.subtitle || 'We provide competitive salaries, on-time statutory benefits (EPF, ESIC), medical insurance, and fast career advancement paths.'}
            />
          </p>
        </div>
      </section>

      {/* Why Join VPHS Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050a14] border-b border-[#1f2f58]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-2">
            <Shield className="w-8 h-8 text-amber-400" />
            <h4 className="text-sm font-bold text-white">100% Guaranteed Statutory Social Security</h4>
            <p className="text-xs text-slate-400">Day 1 enrollment into EPFO pension scheme and ESIC medical card covering your entire family.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-2">
            <Award className="w-8 h-8 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Continuous Skill Certification & Training</h4>
            <p className="text-xs text-slate-400">Regular workshops on mechanized machinery, customer etiquette, fire safety, and technical maintenance.</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0b1329] border border-[#1f2f58] space-y-2">
            <Users className="w-8 h-8 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Merit-Based Internal Promotion Track</h4>
            <p className="text-xs text-slate-400">Over 60% of our Field Supervisors and Site Leads started as associates within VPHS.</p>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Current Job Openings</h2>
            <p className="text-xs text-slate-400">Join our corporate facility and operations divisions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-[#0b1329] border border-[#1f2f58] rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{job.title}</h3>
                      <p className="text-xs text-amber-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.site}</span>
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-300 pt-1">
                    <span><strong>Experience:</strong> {job.experience}</span>
                    <span>•</span>
                    <span><strong>Pay Scale:</strong> {job.salary}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-300 border border-[#1f2f58]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1f2f58] flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-semibold">● Immediate Hiring</span>
                  <button
                    onClick={() => setSelectedJob(job.title)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs shadow transition-all"
                  >
                    Apply for Position
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0b1329] border border-[#1f2f58] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f2f58]">
              <div>
                <h4 className="text-sm font-bold text-white">Apply for {selectedJob}</h4>
                <p className="text-xs text-slate-400">Fill in your contact details for HR review</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={applicant.name}
                  onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 00000"
                    value={applicant.phone}
                    onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={applicant.email}
                    onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Years of Relevant Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 3 Years in Corporate Housekeeping"
                  value={applicant.exp}
                  onChange={(e) => setApplicant({ ...applicant, exp: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Brief Note / Qualifications</label>
                <textarea
                  rows={3}
                  placeholder="Mention previous company, certifications, or location preferences"
                  value={applicant.notes}
                  onChange={(e) => setApplicant({ ...applicant, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Job Application</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
