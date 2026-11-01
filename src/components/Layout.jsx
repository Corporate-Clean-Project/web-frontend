import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      <main className="w-full pt-20 md:pt-24 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
