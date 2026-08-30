import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { NotificationToast } from './components/common/NotificationToast';
import { MediaLibraryModal } from './components/common/MediaLibraryModal';
import { EditPageModal } from './components/common/EditPageModal';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { ServicesPage } from './components/public/ServicesPage';
import { FacilitiesPage } from './components/public/FacilitiesPage';
import { HrPayrollPage } from './components/public/HrPayrollPage';
import { ClientsPage } from './components/public/ClientsPage';
import { CareersPage } from './components/public/CareersPage';
import { ContactPage } from './components/public/ContactPage';
import { LoginPage } from './components/auth/LoginPage';
import { ErpLayout } from './components/erp/ErpLayout';

export const App: React.FC = () => {
  const { activePage } = useApp();

  // If on ERP portal or Login screen, customize layout
  const isErp = activePage === 'erp';
  const isLogin = activePage === 'login';

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'facilities': return <FacilitiesPage />;
      case 'hr-payroll': return <HrPayrollPage />;
      case 'clients': return <ClientsPage />;
      case 'careers': return <CareersPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage />;
      case 'erp': return <ErpLayout />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Global Modals & Notifications */}
      <NotificationToast />
      <MediaLibraryModal />
      <EditPageModal />

      {/* Render Public Navbar unless in full-screen Login or ERP mode */}
      {!isErp && !isLogin && <Navbar />}

      {/* Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Render Corporate Footer on all public pages */}
      {!isErp && !isLogin && <Footer />}
    </div>
  );
};
