import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Shield,
  HelpCircle
} from 'lucide-react';
import { InlineEditable } from '../common/InlineEditable';
import { ChangeImageButton } from '../common/ChangeImageButton';

export const ContactPage: React.FC = () => {
  const { pages, companySettings, showToast } = useApp();
  const pageData = pages.find(p => p.id === 'contact') || pages[0];
  const contactHero = pageData.sections.find(s => s.id === 'contact-hero' && s.visible);

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Your message has been received! Our operations team will respond promptly.', 'success');
  };

  return (
    <div className="space-y-0 text-slate-100">
      {/* Hero Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e1e] via-[#0b1329] to-[#070e1e] border-b border-[#1f2f58] relative">
        <ChangeImageButton pageId="contact" sectionId="contact-hero" field="image" />
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block">
            {contactHero?.badge || 'GET IN TOUCH'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            <InlineEditable
              pageId="contact"
              sectionId="contact-hero"
              field="title"
              value={contactHero?.title || 'Let Discuss Your Facility & HR Requirements'}
            />
          </h1>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            <InlineEditable
              pageId="contact"
              sectionId="contact-hero"
              field="subtitle"
              multiline
              value={contactHero?.subtitle || 'Reach out to our operations team for custom site proposals, facility audits, or ERP demonstrations.'}
            />
          </p>
        </div>
      </section>

      {/* Contact Information & Interactive Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e1e]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Headquarters & Contact Hubs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">CORPORATE DIRECTORY</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Central Operations Headquarters</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with our corporate command team or visit our Hyderabad operations center.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Registered Address</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {companySettings.address}, {companySettings.city}, {companySettings.state} - {companySettings.pincode}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Hotline Numbers</h4>
                  <p className="text-xs text-slate-300 mt-1 font-mono font-medium">{companySettings.primaryPhone}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{companySettings.secondaryPhone} (Operations Escalations)</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b1329] border border-[#1f2f58] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Corporate Email Inquiries</h4>
                  <p className="text-xs text-slate-300 mt-1">{companySettings.email}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{companySettings.supportEmail} (ERP & Client Helpdesk)</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0b1329] border border-[#1f2f58] flex items-center gap-4">
              <Clock className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-white">24/7 Operations Command Available</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Emergency manpower replacement and site incident response around the clock.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-[#0b1329] border border-[#1f2f58] rounded-3xl p-8 sm:p-10 shadow-2xl">
            {sent ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Dispatched Successfully</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Our customer relationship team has received your query and will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-400 mt-1">Please fill in the details below and we will get back to you.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@corporate.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98490 00000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Inquiry Type</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Campus Housekeeping Proposal"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your site details, required service scope, headcount, or any questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-900 border border-[#1f2f58] rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs tracking-wider uppercase shadow-gold-sm transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to VPHS Operations</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
