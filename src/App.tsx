import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import {
  SalonInfoState,
  SalonService,
  SalonAppointment,
  INITIAL_SALON_INFO,
  INITIAL_SERVICES,
  INITIAL_APPOINTMENTS,
} from './data/salonConfig';

// Layout & Global Components
import { KhusbooNavbar } from './components/KhusbooNavbar';
import { KhusbooFooter } from './components/KhusbooFooter';
import { KhusbooBookingModal } from './components/KhusbooBookingModal';
import { KhusbooMobileBottomBar } from './components/KhusbooMobileBottomBar';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

// Admin Portal & Authentication Components
import { AdminPortal } from './components/AdminPortal';
import { AdminLoginModal } from './components/AdminLoginModal';

// Dedicated Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { HairPage } from './pages/HairPage';
import { BridalBeautyPage } from './pages/BridalBeautyPage';
import { NailsWaxingPage } from './pages/NailsWaxingPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<string>(() => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (['services', 'hair', 'bridal-beauty', 'nails-waxing', 'gallery', 'contact', 'admin'].includes(hash)) {
        return hash;
      }
      return 'home';
    } catch {
      return 'home';
    }
  });

  // 1. Persistent Salon Info State
  const [salonInfo, setSalonInfo] = useState<SalonInfoState>(() => {
    try {
      const saved = localStorage.getItem('khusboo_salon_info');
      return saved ? JSON.parse(saved) : INITIAL_SALON_INFO;
    } catch {
      return INITIAL_SALON_INFO;
    }
  });

  // 2. Persistent Salon Services State
  const [services, setServices] = useState<SalonService[]>(() => {
    try {
      const saved = localStorage.getItem('khusboo_salon_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  // 3. Persistent Appointments & Inquiries State
  const [appointments, setAppointments] = useState<SalonAppointment[]>(() => {
    try {
      const saved = localStorage.getItem('khusboo_salon_appointments');
      if (saved) {
        const parsed = JSON.parse(saved);
        const containsMockData =
          Array.isArray(parsed) &&
          parsed.some((a: SalonAppointment) =>
            ['apt-101', 'apt-102', 'apt-103', 'apt-104'].includes(a.id)
          );
        if (containsMockData) {
          localStorage.setItem('khusboo_salon_appointments', JSON.stringify([]));
          return [];
        }
        return parsed;
      }
      return [];
    } catch {
      return [];
    }
  });

  // 4. Persistent Admin Credentials State
  const [adminUsername, setAdminUsername] = useState<string>(() => {
    try {
      return localStorage.getItem('khusboo_admin_user') || 'admin';
    } catch {
      return 'admin';
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('khusboo_admin_pass') || 'khusboo2026';
    } catch {
      return 'khusboo2026';
    }
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('khusboo_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Client UI States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState('');
  const [activeServicesCategory, setActiveServicesCategory] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route hash with browser
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (['services', 'hair', 'bridal-beauty', 'nails-waxing', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else if (hash === 'admin') {
        handleTriggerAdmin();
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminAuthenticated]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('khusboo_salon_info', JSON.stringify(salonInfo));
    } catch (e) {
      console.warn(e);
    }
  }, [salonInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('khusboo_salon_services', JSON.stringify(services));
    } catch (e) {
      console.warn(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('khusboo_salon_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn(e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('khusboo_admin_user', adminUsername);
      localStorage.setItem('khusboo_admin_pass', adminPassword);
    } catch (e) {
      console.warn(e);
    }
  }, [adminUsername, adminPassword]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedServiceToBook(serviceName || '');
    setBookingModalOpen(true);
  };

  const handleNewBookingCreated = (newAppointment: SalonAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(`Appointment logged for ${newAppointment.clientName}`);
  };

  const handleTriggerAdmin = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('khusboo_admin_auth', 'true');
    } catch {
      // ignore
    }
    setAdminLoginModalOpen(false);
    setIsAdminOpen(true);
    showToast('Admin access authorized. Welcome.');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('khusboo_admin_auth');
    } catch {
      // ignore
    }
    setIsAdminOpen(false);
    showToast('Logged out of Admin Portal.');
  };

  const handleUpdateCredentials = (newUser: string, newPass: string) => {
    setAdminUsername(newUser);
    setAdminPassword(newPass);
    showToast('Admin credentials updated successfully.');
  };

  // IF ADMIN PORTAL IS OPEN: Show dedicated full Admin Portal View
  if (isAdminOpen && isAdminAuthenticated) {
    return (
      <AdminPortal
        onClose={() => setIsAdminOpen(false)}
        onLogout={handleAdminLogout}
        salonInfo={salonInfo}
        onUpdateSalonInfo={(info) => {
          setSalonInfo(info);
          showToast('Salon settings updated.');
        }}
        services={services}
        onUpdateServices={(servs) => {
          setServices(servs);
          showToast('Services updated.');
        }}
        appointments={appointments}
        onUpdateAppointments={(apts) => {
          setAppointments(apts);
          showToast('Appointments updated.');
        }}
        adminUsername={adminUsername}
        adminPassword={adminPassword}
        onUpdateCredentials={handleUpdateCredentials}
      />
    );
  }

  // Multi-Page Dynamic Renderer
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'services':
        return (
          <ServicesPage
            salonInfo={salonInfo}
            services={services}
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => navigateTo('home')}
          />
        );
      case 'hair':
        return (
          <HairPage
            salonInfo={salonInfo}
            services={services}
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => navigateTo('home')}
          />
        );
      case 'bridal-beauty':
        return (
          <BridalBeautyPage
            salonInfo={salonInfo}
            services={services}
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => navigateTo('home')}
          />
        );
      case 'nails-waxing':
        return (
          <NailsWaxingPage
            salonInfo={salonInfo}
            services={services}
            onOpenBooking={handleOpenBooking}
            onNavigateHome={() => navigateTo('home')}
          />
        );
      case 'gallery':
        return (
          <GalleryPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigateHome={() => navigateTo('home')}
          />
        );
      case 'contact':
        return (
          <ContactPage
            salonInfo={salonInfo}
            services={services}
            onNewBookingCreated={handleNewBookingCreated}
            onNavigateHome={() => navigateTo('home')}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            salonInfo={salonInfo}
            services={services}
            onOpenBooking={handleOpenBooking}
            onNavigatePage={navigateTo}
            activeCategory={activeServicesCategory}
            onCategoryChange={setActiveServicesCategory}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#FFFFFF] selection:bg-[#C9A227] selection:text-[#080808] flex flex-col font-primary">
      {/* Sticky Luxury Navbar with Multi-Page Navigation */}
      <KhusbooNavbar
        salonInfo={salonInfo}
        currentPage={currentPage}
        onNavigatePage={navigateTo}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={handleTriggerAdmin}
      />

      {/* Current Page View */}
      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Luxury Footer with Multi-Page Links */}
      <KhusbooFooter
        salonInfo={salonInfo}
        onNavigatePage={navigateTo}
        onOpenAdmin={handleTriggerAdmin}
      />

      {/* Floating WhatsApp Action Button with Dynamic Template Logic */}
      <WhatsAppFloatingButton
        phoneDisplay={salonInfo.phone}
        currentPage={currentPage}
      />

      {/* Mobile Bottom Bar (Call, WhatsApp, Book) */}
      <KhusbooMobileBottomBar
        salonInfo={salonInfo}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Booking Modal */}
      <KhusbooBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        salonInfo={salonInfo}
        services={services}
        preselectedService={selectedServiceToBook}
        onNewBookingCreated={handleNewBookingCreated}
      />

      {/* Admin Login Authentication Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        savedUsername={adminUsername}
        savedPassword={adminPassword}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 md:bottom-8 left-6 z-50 bg-[#111111] border border-[#C9A227] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(201,162,39,0.3)] flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] rounded-sm"
          >
            <Check className="w-4 h-4 text-[#C9A227]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
