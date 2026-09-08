import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { StaticPages } from './pages/StaticPages';
import { AdminPage } from './pages/AdminPage';

const MainContent: React.FC = () => {
  const { activePage } = useStore();

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
