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

const INQUIRY_TYPES = [
  { value: 'renovation', label: 'Residential Architectural Renovation' },
  { value: 'new-build', label: 'New Custom Estate Build' },
  { value: 'commercial', label: 'Commercial Luxury Fit-Out' },
  { value: 'consultation', label: 'General Design Consultation' },
];

const ADDITIONS = [
  {
    id: 'materials',
    title: 'Premium Natural Materials',
    desc: 'Calacatta marble bookmatching, aged brass, quarter-sawn European white oak',
  },
  {
    id: 'design',
    title: 'Custom Design Drafting & 3D Photoreal Renderings',
    desc: 'Complete architectural visualization, BIM models, and finishes sample board',
  },
  {
    id: 'rush',
    title: 'Rush Timeline Priority Protocol',
    desc: 'Dual-shift dedicated artisan crew & expedited priority supply procurement',
  },
];

const inputClass =
  'w-full bg-[#101419] border-none text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary focus:outline-none transition-all rounded-md px-4 py-3 text-sm';

const labelClass = 'block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2';

function QuoteTab() {
  const [form, setForm] = useState({
    serviceType: SERVICES[0].value,
    projectSize: SIZES[0].value,
    timeline: TIMELINES[0].value,
    additions: { materials: true, design: false, rush: true },
  });
  const [estimate, setEstimate] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCheckbox = (id) => {
    setForm((f) => ({
      ...f,
      additions: { ...f.additions, [id]: !f.additions[id] },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await submitQuoteRequest({ ...form, fullName: 'Instant User', email: 'user@example.com' });
      setEstimate(res.estimate);
      setStatus('success');
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#1c2025] rounded-xl p-10 text-center space-y-4 border border-surface-container-highest">
        <h3 className="font-display text-3xl text-primary">Analysis Complete</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Based on your parameters, the estimated architectural investment is{' '}
          <span className="text-primary font-semibold text-base block mt-2">
            ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
          </span>
        </p>
        <p className="text-xs text-on-surface-variant/70 mt-4">
          A Master Builder will contact you to finalize the exact quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1c2025] rounded-xl p-8 lg:p-12 shadow-2xl border border-surface-container-highest/60 flex flex-col h-full relative">
      <div className="absolute top-8 right-8 w-10 h-10 rounded bg-[#262a30] flex items-center justify-center text-on-surface-variant">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
        </svg>
      </div>

      <div className="mb-10">
        <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">Algorithmic Estimator</span>
        <h2 className="font-display text-2xl lg:text-3xl text-on-surface">GET AN INSTANT QUOTE</h2>
        <p className="text-xs text-on-surface-variant mt-2">Configure project specifications for real-time pricing analysis</p>
      </div>

      <div className="space-y-6 flex-grow">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass + " !mb-0"}>1. WHAT TYPE OF CRAFT / SERVICE IS REQUIRED?</label>
            <span className="text-[9px] text-on-surface-variant">Step 1 of 4</span>
          </div>
          <select name="serviceType" value={form.serviceType} onChange={handleChange} className={inputClass}>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass + " !mb-0"}>2. WHAT IS THE APPROXIMATE FOOTPRINT SIZE?</label>
            <span className="text-[9px] text-on-surface-variant">Step 2 of 4</span>
          </div>
          <select name="projectSize" value={form.projectSize} onChange={handleChange} className={inputClass}>
            {SIZES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={labelClass + " !mb-0"}>3. WHAT IS THE TARGET TIMELINE?</label>
            <span className="text-[9px] text-on-surface-variant">Step 3 of 4</span>
          </div>
          <select name="timeline" value={form.timeline} onChange={handleChange} className={inputClass}>
            {TIMELINES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>4. DISTINCT ARCHITECTURAL ADDITIONS & SPECIFICATIONS</label>
          <div className="space-y-3">
            {ADDITIONS.map((add) => (
              <div
                key={add.id}
                onClick={() => handleCheckbox(add.id)}
                className={`flex gap-4 p-4 rounded bg-[#101419] cursor-pointer border ${form.additions[add.id] ? 'border-primary/50' : 'border-transparent'} transition-colors`}
              >
                <div className={`shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5 border transition-colors ${form.additions[add.id] ? 'bg-primary border-primary text-on-primary' : 'bg-transparent border-surface-container-highest text-transparent'}`}>
                  <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">{add.title}</p>
                  <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">{add.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-error mt-4">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full h-14 mt-8 rounded bg-primary text-on-primary font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Processing...' : 'Get Full Quote'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  );
}

function GeneralInquiryTab() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', inquiryType: INQUIRY_TYPES[0].value, message: '' });
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
      <div className="bg-[#1c2025] rounded-xl p-10 text-center space-y-4 border border-surface-container-highest">
        <h3 className="font-display text-3xl text-primary">Inquiry Received</h3>
        <p className="text-on-surface-variant text-sm">
          Thank you, {form.fullName.split(' ')[0]}. Our team will reach out within one business day to coordinate your consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1c2025] rounded-xl p-8 lg:p-12 shadow-2xl border border-surface-container-highest/60 flex flex-col h-full relative">
      <div className="absolute top-8 right-8 w-10 h-10 rounded bg-[#262a30] flex items-center justify-center text-on-surface-variant">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      </div>

      <div className="mb-10">
        <span className="text-[10px] text-primary tracking-[0.2em] uppercase font-bold block mb-2">Direct Consultation</span>
        <h2 className="font-display text-2xl lg:text-3xl text-on-surface">REQUEST AN INQUIRY</h2>
        <p className="text-xs text-on-surface-variant mt-2">Private walkthrough, technical survey & VIP consultation</p>
      </div>

      <div className="space-y-6 flex-grow">
        <div>
          <label className={labelClass}>FULL NAME *</label>
          <input
            className={inputClass}
            name="fullName"
            required
            placeholder="e.g. Lord Alistair Vance"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>EMAIL ADDRESS *</label>
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
          <div>
            <label className={labelClass}>PHONE NUMBER *</label>
            <input
              className={inputClass}
              name="phone"
              required
              placeholder="+1 (555) 019-2834"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>TYPE OF INQUIRY *</label>
          <select name="inquiryType" value={form.inquiryType} onChange={handleChange} className={inputClass}>
            {INQUIRY_TYPES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>PROJECT SCOPE & DETAILS *</label>
          <textarea
            className={`${inputClass} h-28 resize-none`}
            name="message"
            required
            placeholder="Tell us about your estate footprint, square footage, design intent, or specific material selections..."
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* <div>
           <label className={labelClass}>ATTACH BLUEPRINTS OR RENDERINGS <span className="text-on-surface-variant/50 font-normal normal-case">(OPTIONAL)</span></label>
           <div className="h-28 rounded border border-dashed border-outline-variant/60 bg-[#101419] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-primary">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <p className="text-xs text-on-surface"><span className="text-primary font-bold">Click to upload</span> or drag schematic file</p>
              <p className="text-[10px] text-on-surface-variant">PDF, CAD/DWG, High-Res TIFF up to 25MB</p>
           </div>
        </div> */}
      </div>

      {error && <p className="text-sm text-error mt-4">{error}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full h-14 mt-8 rounded bg-primary text-on-primary font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
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
          <span className="text-[10px] text-primary tracking-[0.3em] uppercase font-bold">Pricing & Proposals</span>
          <span className="w-10 h-px bg-surface-container-highest" />
        </div>
        <h1 className="font-display text-4xl lg:text-5xl tracking-tight text-on-surface">INQUIRIES & QUOTE</h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Fill out the concierge form or engage our live estimation architecture to receive an immediate tailored proposal for your estate or commercial residence.
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={() => setTab('inquiry')}
          className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${tab === 'inquiry' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'
            }`}
        >
          Request an Inquiry
        </button>
        <button
          onClick={() => setTab('quote')}
          className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${tab === 'quote' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'
            }`}
        >
          Instant Quote
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {tab === 'inquiry' ? <GeneralInquiryTab /> : <QuoteTab />}
      </div>
    </div>
  );
}
