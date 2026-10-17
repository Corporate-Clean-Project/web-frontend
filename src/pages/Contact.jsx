import { useState } from 'react';
import { submitInquiry } from '../api/inquiries';

const inputClass =
  'w-full bg-[#101419] border-none rounded-md px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary focus:outline-none transition-all';

const labelClass = 'block text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2';

const svgIconProps = {
  className: "w-5 h-5 text-on-surface-variant",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24"
};

export default function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitInquiry(form);
      setStatus('success');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const inquiryTypes = ['General Inquiry', 'Partnership', 'Feedback', 'Other'];
  const locationUrl = 'https://share.google/fBDK3nkxARbw5EqYS';

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center bg-surface-container/50 border border-surface-container-highest px-4 py-1.5 rounded-full mb-2">
           <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
           <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold">Contact Pristine Building Maintenance</span>
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-on-surface">Get in Touch With Our Cleanliness Experts</h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Have a question about our commercial cleaning packages or need a tailored facility hygiene plan? Fill out the form below, and our team will respond within 24 business hours. For urgent facility requests, please call us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        {/* Left Form Section */}
        <div className="bg-[#1c2025] rounded-xl p-8 lg:p-12 border border-surface-container-highest/60 shadow-2xl flex flex-col relative h-full">
          <div className="mb-10">
            <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">Contact Form</span>
            <h2 className="font-display text-2xl lg:text-3xl text-on-surface">Send Us a Message</h2>
          </div>

          {status === 'success' ? (
            <div className="bg-[#101419] rounded-xl p-10 text-center space-y-3 border border-surface-container-highest flex-grow flex flex-col items-center justify-center">
              <h3 className="font-display text-3xl text-primary">Message Sent</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Thank you — our team will respond within 24 business hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
              <div>
                <label className={labelClass}>Full Name *</label>
                <div className="relative">
                  <input
                    className={inputClass}
                    name="fullName"
                    required
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                  <div className="absolute right-4 top-3.5 text-on-surface-variant/50">
                    <svg {...svgIconProps} className="w-4 h-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Company / Organization Name</label>
                <input
                  className={inputClass}
                  name="companyName"
                  autoComplete="organization"
                  placeholder="Company or organization"
                  value={form.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    className={inputClass}
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="+1 (604) 555-0123"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Subject / Category *</label>
                <select
                  className={inputClass}
                  name="inquiryType"
                  required
                  value={form.inquiryType}
                  onChange={handleChange}
                >
                  {inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Message *</label>
                <textarea
                  className={`${inputClass} min-h-[120px] resize-none`}
                  name="message"
                  required
                  placeholder="Tell us how we can help with your commercial cleaning or facility hygiene needs..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="text-sm text-error">{error}</p>}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 mt-auto">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto h-12 px-8 rounded bg-primary text-[#1c2025] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-60 shrink-0"
                >
                  {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE / REQUEST CONSULTATION'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/70">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  Your information is safe. Strictly confidential.
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Right Sidebar Section */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-[#1c2025] rounded-xl p-8 lg:p-10 border border-surface-container-highest/60 shadow-2xl flex-grow">
            <div className="mb-8">
              <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">Headquarters & Liaison</span>
              <h3 className="font-display text-2xl text-on-surface">Get in Touch</h3>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-[#262a30] rounded-md p-2.5 h-fit text-on-surface-variant flex items-center justify-center">
                  <svg {...svgIconProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <h4 className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Phone Assistance</h4>
                  <a href="tel:+16047355763" className="text-sm font-bold text-on-surface mb-0.5 hover:text-primary">+1 (604) 735-5763</a>
                  <p className="text-[10px] text-on-surface-variant/70">Call us for urgent facility requests.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#262a30] rounded-md p-2.5 h-fit text-on-surface-variant flex items-center justify-center">
                  <svg {...svgIconProps}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <h4 className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">General Inquiries</h4>
                  <a href="mailto:info@pristinebuildingmaintenance.com" className="text-sm font-bold text-on-surface mb-0.5 hover:text-primary">info@pristinebuildingmaintenance.com</a>
                  <p className="text-[10px] text-on-surface-variant/70">Questions, service inquiries, and quote requests</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#262a30] rounded-md p-2.5 h-fit text-on-surface-variant flex items-center justify-center">
                  <svg {...svgIconProps}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h4 className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Emergency Response</h4>
                  <p className="text-sm font-bold text-on-surface mb-0.5">24/7 rapid response</p>
                  <p className="text-[10px] text-on-surface-variant/70">Available for contracted clients</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#262a30] rounded-md p-2.5 h-fit text-on-surface-variant flex items-center justify-center">
                  <svg {...svgIconProps}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <h4 className="text-[9px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Hours of Operation</h4>
                  <p className="text-sm font-bold text-on-surface mb-0.5">Monday – Friday: 8:00 AM – 6:00 PM</p>
                  <p className="text-[10px] text-on-surface-variant/70">Saturday: 9:00 AM – 3:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1c2025] border border-surface-container-highest/60 rounded-xl p-2 overflow-hidden shrink-0">
            <iframe
              src="https://www.google.com/maps?q=Pristine%20Building%20Maintenance%20Inc.&output=embed"
              title="Pristine Building Maintenance location map"
              width="100%"
              height="240"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-lg grayscale invert-[0.9] contrast-[1.2]"
            />
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="text-xs font-bold text-on-surface">Find us on Google Maps</p>
              <a href={locationUrl} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-bold text-primary tracking-wider hover:text-secondary transition-colors">
                Open Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <div className="bg-[#1c2025] rounded-xl p-8 border border-surface-container-highest/60 hover:border-primary/30 transition-colors shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mb-5 text-primary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
          <h4 className="font-bold text-sm text-on-surface mb-3">Commercial Cleaning</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Cleaning plans tailored to your workplace and facility needs.</p>
        </div>

        <div className="bg-[#1c2025] rounded-xl p-8 border border-surface-container-highest/60 hover:border-primary/30 transition-colors shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mb-5 text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          <h4 className="font-bold text-sm text-on-surface mb-3">Confidential Inquiries</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Your inquiry is kept strictly confidential and your information is never shared.</p>
        </div>

        <div className="bg-[#1c2025] rounded-xl p-8 border border-surface-container-highest/60 hover:border-primary/30 transition-colors shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mb-5 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
          <h4 className="font-bold text-sm text-on-surface mb-3">Timely Response</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Our team responds to inquiries within 24 business hours.</p>
        </div>

        <div className="bg-[#1c2025] rounded-xl p-8 border border-surface-container-highest/60 hover:border-primary/30 transition-colors shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 mb-5 text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
          <h4 className="font-bold text-sm text-on-surface mb-3">Rapid Response</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">24/7 emergency response is available for contracted clients.</p>
        </div>
      </div>
    </div>
  );
}
