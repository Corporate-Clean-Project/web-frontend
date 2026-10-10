export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          <div className="space-y-4">
            <span className="font-display text-lg text-primary">Top Pristine</span>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Elite commercial cleaning, janitorial services, and facility sanitization tailored
              for corporate headquarters, luxury retail boutiques, and medical facilities.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-primary tracking-widest uppercase font-semibold">
              Headquarters
            </h4>
            <p className="text-sm text-on-surface-variant">
              480 Artisan Boulevard
              <br />
              Architectural Design Quarter
              <br />
              Beverly Hills, CA 90210
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-primary tracking-widest uppercase font-semibold">
              Concierge Direct
            </h4>
            <p className="text-sm text-on-surface-variant">+1 (800) 774-7846</p>
            <p className="text-sm text-on-surface-variant">inquiries@toppristine.com</p>
            <p className="text-sm text-on-surface-variant">vip@toppristine.com</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-primary tracking-widest uppercase font-semibold">
              Consultation Hours
            </h4>
            <p className="text-sm text-on-surface-variant">Monday – Friday: 08:00 – 19:00 PST</p>
            <p className="text-sm text-on-surface-variant">Saturday: 09:00 – 16:00 PST</p>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-surface-container-high">
          <p className="text-xs text-on-surface-variant pt-6">
            © {new Date().getFullYear()} Top Pristine Luxury Craft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
