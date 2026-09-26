import { useState } from 'react';
import { submitInquiry } from '../api/inquiries';

const inputClass =
  'w-full bg-surface border border-surface-container-high rounded-md px-4 py-3 text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary transition-colors';

const labelClass = 'block text-[10px] uppercase tracking-wider text-primary font-bold mb-2';

const svgIconProps = {
  className: "w-5 h-5 text-primary",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

export default function Contact() {
  const [form, setForm] = useState({ fullName: '', email: '', scope: 'Architecture', message: '' });
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

  const scopeOptions = ['Architecture', 'Estate Craft', 'Private Advisory'];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Form Section */}
        <div className="bg-surface-container-low rounded-2xl p-8 lg:p-10">
          <div className="mb-8 space-y-2">
            <span className="text-[10px] text-primary tracking-widest uppercase font-bold">Direct Inquiry</span>
            <h1 className="font-display text-3xl font-semibold">Initiate Private Dialogue</h1>
          </div>

          {status === 'success' ? (
            <div className="bg-surface-container rounded-xl p-8 text-center space-y-2">
              <h3 className="font-display text-2xl text-primary">Message Sent</h3>
              <p className="text-on-surface-variant">Thank you — our team will be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 hidden">
              <div>
                <label className={labelClass}>Full Name *</label>
                <div className="relative">
                  <input
                    className={inputClass}
                    name="fullName"
                    required
                    placeholder="Alexander Vance"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                  <div className="absolute right-4 top-3 text-outline-variant">
                    <svg {...svgIconProps} className="w-4 h-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address *</label>
                <div className="relative">
                  <input
                    className={inputClass}
                    type="email"
                    name="email"
                    required
                    placeholder="alexander@luxuryliving.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                  <div className="absolute right-4 top-3 text-outline-variant">
                    <svg {...svgIconProps} className="w-4 h-4"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Scope of Interest</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                  {scopeOptions.map(option => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setForm(f => ({ ...f, scope: option }))}
                      className={`py-3 text-sm rounded-md transition-colors ${form.scope === option
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface border border-surface-container-high text-on-surface hover:border-primary/50'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Message *</label>
                <textarea
                  className={`${inputClass} min-h-[120px] resize-y`}
                  name="message"
                  required
                  placeholder="How can we help you? Describe your architectural vision, project location, or consultation request..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="text-sm text-error">{error}</p>}

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto h-12 px-8 rounded-md bg-primary text-on-primary font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-secondary transition-all disabled:opacity-60"
                >
                  {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                  {/* <svg {...svgIconProps} className="w-4 h-4 text-on-primary"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg> */}
                </button>
                {/* <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <svg {...svgIconProps} className="w-4 h-4 text-outline-variant"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  Your information is safe. Strictly confidential.
                </div> */}
              </div>
            </form>
          )}
        </div>

        {/* Right Sidebar Section */}
        <div className="space-y-6">
          <div className="bg-surface-container-low rounded-2xl p-8">
            <div className="mb-6 space-y-1">
              <span className="text-[10px] text-primary tracking-widest uppercase font-bold">Headquarters & Liaison</span>
              <h3 className="font-display text-2xl font-semibold">Get in Touch</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-surface rounded-md p-2 h-fit border border-surface-container-high">
                  <svg {...svgIconProps} className="w-4 h-4 text-on-surface-variant"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <h4 className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Phone Assistance</h4>
                  <p className="text-sm font-semibold mb-0.5">+1 (555) 123-4567</p>
                  <p className="text-xs text-on-surface-variant">Toll-free dedicated VIP trunk</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface rounded-md p-2 h-fit border border-surface-container-high">
                  <svg {...svgIconProps} className="w-4 h-4 text-on-surface-variant"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <h4 className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">General Inquiries</h4>
                  <p className="text-sm font-semibold mb-0.5">info@toppristine.com</p>
                  <p className="text-xs text-on-surface-variant">Blueprints, architectural bids & RFPs</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface rounded-md p-2 h-fit border border-surface-container-high">
                  <svg {...svgIconProps} className="w-4 h-4 text-on-surface-variant"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h4 className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Atelier Address</h4>
                  <p className="text-sm font-semibold mb-0.5">123 Pristine Way, Suite 100</p>
                  <p className="text-xs text-on-surface-variant">Toronto, ON M1A 1A1</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-surface rounded-md p-2 h-fit border border-surface-container-high">
                  <svg {...svgIconProps} className="w-4 h-4 text-on-surface-variant"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <h4 className="text-[10px] text-primary uppercase font-bold tracking-widest mb-1">Hours of Operation</h4>
                  <p className="text-sm font-semibold mb-0.5">Mon – Fri: 9:00 AM – 6:00 PM</p>
                  <p className="text-xs text-on-surface-variant">Sat: 10:00 AM – 2:00 PM • Sun: Closed (VIP on-call)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-2xl p-2 relative h-56 overflow-hidden group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2713723381667!2d-79.38705668450262!3d43.64256627912173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d2a33d602f%3A0x6b44588506509f6!2sFinancial%20District%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1714151234567!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.75rem', filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Atelier Location"
              className="absolute inset-0 z-0"
            ></iframe>
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-surface-container-lowest/90 backdrop-blur border border-surface-container-high rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-full p-2">
                  <svg {...svgIconProps} className="w-3 h-3 text-on-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold leading-none mb-1">Top Pristine Atelier</p>
                  <p className="text-[10px] text-on-surface-variant leading-none">Toronto Financial & Design District</p>
                </div>
              </div>
              <a href="#" className="text-[10px] uppercase font-bold text-primary tracking-wider hover:text-secondary flex items-center gap-1">
                Navigate <svg {...svgIconProps} className="w-3 h-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container-high/50">
          <svg {...svgIconProps} className="w-5 h-5 mb-4 text-primary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
          <h4 className="font-bold text-sm mb-3">Licensed Architectural Guild</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Full master-builder certification, structural engineering compliance, and bespoke regulatory clearance guaranteed.</p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container-high/50">
          <svg {...svgIconProps} className="w-5 h-5 mb-4 text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          <h4 className="font-bold text-sm mb-3">NDA & Discretion First</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">High-profile residential estates and corporate headquarters treated with the highest tier of confidentiality.</p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container-high/50">
          <svg {...svgIconProps} className="w-5 h-5 mb-4 text-primary"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></svg>
          <h4 className="font-bold text-sm mb-3">Milestone Transparency</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Track materials fabrication, schedule intervals, and on-site craftsmen through our encrypted client portal.</p>
        </div>

        <div className="bg-surface-container-low rounded-xl p-6 border border-surface-container-high/50">
          <svg {...svgIconProps} className="w-5 h-5 mb-4 text-primary"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
          <h4 className="font-bold text-sm mb-3">Master Artisan Warranty</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Lifetime fabrication backing on all structural millwork, custom masonry, and architectural glazing.</p>
        </div>
      </div>
    </div>
  );
}
