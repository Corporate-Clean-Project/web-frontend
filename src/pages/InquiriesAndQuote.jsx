import { useState } from 'react';
import { submitInquiry, submitQuoteRequest } from '../api/inquiries';

const SERVICES = [
  'Commercial Office Cleaning',
  'Janitorial Services',
  'Deep Sanitization & Disinfection',
  'Post-Construction Cleaning',
  'Floor Care',
];

const INQUIRY_TYPES = ['General Inquiry', 'Partnership', 'Feedback', 'Other'];
const SCHEDULES = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'One-time'];
const BUDGETS = ['Under $1,000/mo', '$1,000 - $3,000/mo', '$3,000+ / Custom'];

const inputClass =
  'w-full bg-[#101419] border-none text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary focus:outline-none transition-all rounded-md px-4 py-3 text-sm';

const labelClass = 'block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2';

function QuoteTab() {
  const [form, setForm] = useState({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceType: SERVICES[0],
    facilitySize: '',
    cleaningSchedule: SCHEDULES[1],
    startDate: '',
    budgetRange: BUDGETS[0],
    notes: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitQuoteRequest(form);
      setStatus('success');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#1c2025] rounded-xl p-10 text-center space-y-4 border border-surface-container-highest">
        <h3 className="font-display text-3xl text-primary">Quote Request Received</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Thank you, {form.contactName.split(' ')[0]}. Our team will review your facility needs and respond within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1c2025] rounded-xl p-8 lg:p-12 shadow-2xl border border-surface-container-highest/60 flex flex-col">
      <div className="mb-10">
        <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">Tailored Cleaning Proposal</span>
        <h2 className="font-display text-2xl lg:text-3xl text-on-surface">REQUEST A CLEANING QUOTE</h2>
        <p className="text-xs text-on-surface-variant mt-2">Tell us about your facility and preferred cleaning plan.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Contact Name *</label>
            <input className={inputClass} name="contactName" required autoComplete="name" value={form.contactName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Company Name</label>
            <input className={inputClass} name="companyName" autoComplete="organization" value={form.companyName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input className={inputClass} type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Phone Number *</label>
            <input className={inputClass} type="tel" name="phone" required autoComplete="tel" value={form.phone} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Service Type Desired *</label>
          <select name="serviceType" required value={form.serviceType} onChange={handleChange} className={inputClass}>
            {SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Approximate Facility Size (Square Feet) *</label>
            <input className={inputClass} type="number" name="facilitySize" min="1" step="1" required placeholder="e.g. 5000" value={form.facilitySize} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Preferred Cleaning Schedule *</label>
            <select name="cleaningSchedule" required value={form.cleaningSchedule} onChange={handleChange} className={inputClass}>
              {SCHEDULES.map((schedule) => <option key={schedule} value={schedule}>{schedule}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Target Start Date</label>
            <input className={inputClass} type="date" name="startDate" value={form.startDate} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Budget Range</label>
            <select name="budgetRange" value={form.budgetRange} onChange={handleChange} className={inputClass}>
              {BUDGETS.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Additional Notes or Specific Requirements</label>
          <textarea className={`${inputClass} h-28 resize-y`} name="notes" value={form.notes} onChange={handleChange} />
        </div>
      </div>

      {error && <p className="text-sm text-error mt-4" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full h-14 mt-8 rounded bg-primary text-on-primary font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting...' : 'Request a Quote'}
      </button>
    </form>
  );
}

function GeneralInquiryTab() {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

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

  if (status === 'success') {
    return (
      <div className="bg-[#1c2025] rounded-xl p-10 text-center space-y-4 border border-surface-container-highest">
        <h3 className="font-display text-3xl text-primary">Inquiry Received</h3>
        <p className="text-on-surface-variant text-sm">
          Thank you, {form.fullName.split(' ')[0]}. Our team will respond within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1c2025] rounded-xl p-8 lg:p-12 shadow-2xl border border-surface-container-highest/60 flex flex-col">
      <div className="mb-10">
        <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">Contact Our Team</span>
        <h2 className="font-display text-2xl lg:text-3xl text-on-surface">SEND AN INQUIRY</h2>
        <p className="text-xs text-on-surface-variant mt-2">All inquiries are kept strictly confidential. Your information is never shared.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input className={inputClass} name="fullName" required autoComplete="name" value={form.fullName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Company / Organization Name</label>
            <input className={inputClass} name="companyName" autoComplete="organization" value={form.companyName} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Email Address *</label>
            <input className={inputClass} type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>Phone Number *</label>
            <input className={inputClass} type="tel" name="phone" required autoComplete="tel" value={form.phone} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Subject / Category *</label>
          <select name="inquiryType" required value={form.inquiryType} onChange={handleChange} className={inputClass}>
            {INQUIRY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Message *</label>
          <textarea className={`${inputClass} h-28 resize-y`} name="message" required value={form.message} onChange={handleChange} />
        </div>
      </div>

      {error && <p className="text-sm text-error mt-4" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full h-14 mt-8 rounded bg-primary text-on-primary font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}

export default function InquiriesAndQuote() {
  const [tab, setTab] = useState('inquiry');

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center gap-4 mb-2">
          <span className="w-10 h-px bg-surface-container-highest" />
          <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-bold">Inquiries & Quotes</span>
          <span className="w-10 h-px bg-surface-container-highest" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-on-surface">HOW CAN WE HELP?</h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Ask us a question or request a tailored commercial cleaning quote. Our team will respond within 24 business hours.
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-10">
        <button
          type="button"
          onClick={() => setTab('inquiry')}
          aria-pressed={tab === 'inquiry'}
          className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${tab === 'inquiry' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'}`}
        >
          General Inquiry
        </button>
        <button
          type="button"
          onClick={() => setTab('quote')}
          aria-pressed={tab === 'quote'}
          className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${tab === 'quote' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'}`}
        >
          Request a Quote
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {tab === 'inquiry' ? <GeneralInquiryTab /> : <QuoteTab />}
      </div>
    </div>
  );
}
