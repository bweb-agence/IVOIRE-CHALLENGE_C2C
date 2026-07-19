import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Properties from '@/pages/Properties';
import PropertyDetail from '@/pages/PropertyDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import MentionsLegales from '@/pages/MentionsLegales';
import Confidentialite from '@/pages/Confidentialite';
import Actualites from '@/pages/Actualites';
import ActualiteDetail from '@/pages/ActualiteDetail';
import NotFound from '@/pages/NotFound';

// Administration
import { AuthProvider } from '@/admin/AuthContext';
import RequireAuth from '@/admin/RequireAuth';
import AdminLayout from '@/admin/AdminLayout';
import Login from '@/admin/Login';
import PropertiesList from '@/admin/properties/PropertiesList';
import PropertyForm from '@/admin/properties/PropertyForm';
import RequestsList from '@/admin/requests/RequestsList';
import TestimonialsList from '@/admin/testimonials/TestimonialsList';
import TeamList from '@/admin/team/TeamList';
import AnnouncementsList from '@/admin/announcements/AnnouncementsList';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Site public */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/biens" element={<Properties />} />
            <Route path="/biens/:id" element={<PropertyDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:slug" element={<ActualiteDetail />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Administration */}
          <Route path="/admin/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<PropertiesList />} />
              <Route path="biens/nouveau" element={<PropertyForm />} />
              <Route path="biens/:id" element={<PropertyForm />} />
              <Route path="actualites" element={<AnnouncementsList />} />
              <Route path="temoignages" element={<TestimonialsList />} />
              <Route path="equipe" element={<TeamList />} />
              <Route path="demandes" element={<RequestsList />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}
