export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          <div className="space-y-4">
            <span className="font-display text-lg text-primary">Pristine Building Maintenance</span>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Elite commercial cleaning, janitorial services, and facility sanitization tailored
              for corporate headquarters, luxury retail boutiques, and medical facilities.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-primary tracking-widest uppercase font-semibold">Location</h4>
            <a
              href="https://share.google/fBDK3nkxARbw5EqYS"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-on-surface-variant hover:text-primary"
            >
              View our location on Google Maps
            </a>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-primary tracking-widest uppercase font-semibold">Contact</h4>
            <a href="tel:+16047355763" className="block text-sm text-on-surface-variant hover:text-primary">+1 (604) 735-5763</a>
            <a href="mailto:info@pristinebuildingmaintenance.com" className="block text-sm text-on-surface-variant hover:text-primary">info@pristinebuildingmaintenance.com</a>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm text-primary tracking-widest uppercase font-semibold">Working Hours</h4>
            <p className="text-sm text-on-surface-variant">Monday – Friday: 8:00 AM – 6:00 PM</p>
            <p className="text-sm text-on-surface-variant">Saturday: 9:00 AM – 3:00 PM</p>
            <p className="text-sm text-on-surface-variant">24/7 emergency response for contracted clients</p>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-surface-container-high">
          <p className="text-xs text-on-surface-variant pt-6">
            © {new Date().getFullYear()} Pristine Building Maintenance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
