import { useState } from 'react';
import { submitInquiry, submitQuoteRequest } from '../api/inquiries';

const SERVICES = [
  { value: 'kitchen', label: 'Kitchen Renovation & Architectural Island' },
  { value: 'primary-bath', label: 'Master Ensuite & Wet Room Fabrication' },
  { value: 'full-estate', label: 'Entire Residence Architectural Fit-Out' },
  { value: 'millwork', label: 'Custom Integrated Millwork & Library' },
  { value: 'exterior', label: 'Exterior Luxury Living & Thermal Pavilion' },
];

const SIZES = [
  { value: 'compact', label: 'Under 500 sq ft (Bespoke Room Focus)' },
  { value: 'medium', label: '500 - 1,500 sq ft (Substantial Wing)' },
  { value: 'large', label: '1,500 - 3,500 sq ft (Major Residence)' },
  { value: 'estate', label: '3,500+ sq ft (Full Grand Estate)' },
];

const TIMELINES = [
  { value: 'rush', label: 'Immediate / Expedited (< 1 Month)' },
  { value: 'standard', label: 'Within 1 - 3 Months (Standard)' },
  { value: 'flexible', label: 'Within 3 - 6 Months (Flexible Cadence)' },
  { value: 'longterm', label: '6+ Months (Scheduled Phasing)' },
];

const inputClass =
  'w-full h-11 px-4 rounded bg-surface-container-lowest border border-outline-variant/40 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors';

function QuoteTab() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: SERVICES[0].value,
    projectSize: SIZES[0].value,
    timeline: TIMELINES[0].value,
    projectAddress: '',
    message: '',
  });
  const [estimate, setEstimate] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await submitQuoteRequest(form);
      setEstimate(res.estimate);
      setStatus('success');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-surface-container rounded-xl p-8 text-center space-y-3">
        <h3 className="font-display text-2xl text-primary">Thank you, {form.fullName.split(' ')[0]}!</h3>
        <p className="text-on-surface-variant">
          Your instant estimate range is{' '}
          <span className="text-primary font-semibold">
            ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
          </span>
          . A member of our concierge team will follow up shortly with a detailed proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="hidden grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-1 md:col-span-2">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Service Type</label>
        <select name="serviceType" value={form.serviceType} onChange={handleChange} className={inputClass}>
          {SERVICES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Project Size</label>
        <select name="projectSize" value={form.projectSize} onChange={handleChange} className={inputClass}>
          {SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Timeline</label>
        <select name="timeline" value={form.timeline} onChange={handleChange} className={inputClass}>
          {TIMELINES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Full Name</label>
        <input
          className={inputClass}
          name="fullName"
          required
          placeholder="e.g. Lord Alistair Vance"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Email Address</label>
        <input
          className={inputClass}
          type="email"
          name="email"
          required
          placeholder="vance@residence.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Phone</label>
        <input
          className={inputClass}
          name="phone"
          placeholder="+1 (555) 019-2834"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Project Address</label>
        <input
          className={inputClass}
          name="projectAddress"
          placeholder="Property / project location"
          value={form.projectAddress}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Project Details</label>
        <textarea
          className={`${inputClass} h-28 py-3`}
          name="message"
          placeholder="Tell us about your estate footprint, square footage, design intent, or specific material selections..."
          value={form.message}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-sm text-error md:col-span-2">{error}</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="md:col-span-2 h-12 rounded-full bg-primary text-on-primary font-bold uppercase tracking-wider hover:bg-secondary transition-all disabled:opacity-60"
      >
        {status === 'submitting' ? 'Calculating…' : 'Get an Instant Quote'}
      </button>
    </form>
  );
}

function GeneralInquiryTab() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', projectAddress: '', message: '' });
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

  if (status === 'success') {
    return (
      <div className="bg-surface-container rounded-xl p-8 text-center space-y-2">
        <h3 className="font-display text-2xl text-primary">Inquiry Received</h3>
        <p className="text-on-surface-variant">
          Thank you, {form.fullName.split(' ')[0]}. Our team will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="hidden grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Full Name</label>
        <input
          className={inputClass}
          name="fullName"
          required
          placeholder="e.g. Lord Alistair Vance"
          value={form.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Email Address</label>
        <input
          className={inputClass}
          type="email"
          name="email"
          required
          placeholder="vance@residence.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Phone</label>
        <input
          className={inputClass}
          name="phone"
          placeholder="+1 (555) 019-2834"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Project Address</label>
        <input
          className={inputClass}
          name="projectAddress"
          placeholder="Property / project location"
          value={form.projectAddress}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-1 md:col-span-2">
        <label className="text-xs uppercase tracking-wider text-on-surface-variant">Message</label>
        <textarea
          className={`${inputClass} h-28 py-3`}
          name="message"
          required
          placeholder="Tell us about your estate footprint, square footage, design intent, or specific material selections..."
          value={form.message}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-sm text-error md:col-span-2">{error}</p>}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="md:col-span-2 h-12 rounded-full bg-primary text-on-primary font-bold uppercase tracking-wider hover:bg-secondary transition-all disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
      </button>
    </form>
  );
}

export default function InquiriesAndQuote() {
  const [tab, setTab] = useState('quote');

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-24 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-xs text-primary tracking-widest uppercase font-bold">Inquiries & Quote</span>
        <h1 className="font-display text-3xl lg:text-4xl">Get an Instant Quote</h1>
        <p className="text-on-surface-variant">
          Tell us about your project and we'll follow up with a detailed proposal.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setTab('quote')}
          className={`px-5 py-2 rounded-full text-sm uppercase tracking-wider font-semibold transition-colors ${
            tab === 'quote' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          Instant Quote
        </button>
        <button
          onClick={() => setTab('general')}
          className={`px-5 py-2 rounded-full text-sm uppercase tracking-wider font-semibold transition-colors ${
            tab === 'general' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          General Inquiry
        </button>
      </div>

      <div className="bg-surface-container/60 rounded-2xl p-6 md:p-10 shadow-xl">
        {tab === 'quote' ? <QuoteTab /> : <GeneralInquiryTab />}
      </div>
    </div>
  );
}
