import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DesignSelectorModal } from './components/DesignSelectorModal';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { StaticPages } from './pages/StaticPages';
import { AdminPage } from './pages/AdminPage';
import { Palette, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, setIsDesignModalOpen, currentTheme } = useStore();

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Global Top Navbar */}
      <Navbar />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ProductListingPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'order-confirmation' && <OrderConfirmationPage />}
        {activePage === 'account' && <AccountPage />}
        {(activePage === 'about' || activePage === 'contact' || activePage === 'faq') && (
          <StaticPages initialTab={activePage} />
        )}
        {activePage === 'admin' && <AdminPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Design System / Aesthetic Theme Modal */}
      <DesignSelectorModal />

      {/* Persistent Floating Design Theme Switcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsDesignModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-neutral-950/90 hover:bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-2xl backdrop-blur-md border border-neutral-700/60 transition-transform hover:scale-105"
        >
          <span
            className="w-3 h-3 rounded-full border border-white/40"
            style={{ backgroundColor: currentTheme.accentColor }}
          />
          <Palette size={14} />
          <span className="hidden sm:inline">Theme: {currentTheme.name}</span>
          <span className="sm:hidden">Theme</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
