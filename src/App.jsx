import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import InquiriesAndQuote from './pages/InquiriesAndQuote';
import Contact from './pages/Contact';
import Maintenance from './pages/Maintenance';

export default function App() {
  return (
    <>
      <SplashScreen />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about-us" element={<About />} />
          <Route path="/inquiries-and-quote" element={<InquiriesAndQuote />} />
          <Route path="/contact-us" element={<Contact />} /> */}
          <Route path="*" element={<Maintenance />} />
        </Routes>
      </Layout>
    </>
  );
}
