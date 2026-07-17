import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/biens" element={<Properties />} />
          <Route path="/biens/:id" element={<PropertyDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
