import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { currentTheme, setActivePage, setSelectedCategory } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800 transition-colors">
      {/* Trust Badges Strip */}
      <div className="border-b border-neutral-800 py-8 px-4 sm:px-6 lg:px-8 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-full text-white shrink-0 mt-0.5"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              <Truck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Worldwide express on orders over $150
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-full text-white shrink-0 mt-0.5"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              <RotateCcw size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                30-Day Effortless Returns
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Prepaid return label with every domestic order
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-full text-white shrink-0 mt-0.5"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              <Award size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Heirloom Quality
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Natural Mongolian cashmere & Belgian flax linen
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className="p-2.5 rounded-full text-white shrink-0 mt-0.5"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                Encrypted Checkout
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Bank-grade 256-bit SSL transaction protection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Newsletter Column */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="text-2xl font-extrabold tracking-[0.25em] text-white uppercase block font-heading">
                AURAQ
              </span>
              <span className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase block mt-0.5">
                Contemporary Fashion Atelier
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Crafted with intention. AURAQ explores the intersection of architectural structure,
              sumptuous natural fibers, and timeless restraint. Designed in New York, produced ethically.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Join the Atelier Circle
              </h5>
              <p className="text-xs text-neutral-400 mb-3">
                Receive private lookbook releases and 15% off your inaugural order.
              </p>

              {subscribed ? (
                <div className="p-3 bg-neutral-900 border border-neutral-700 rounded text-xs text-emerald-400 flex items-center gap-2">
                  <Check size={16} />
                  <span>Welcome! Use code <strong className="text-white">AURAQ15</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-neutral-500 rounded text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-opacity shrink-0"
                    style={{
                      backgroundColor: currentTheme.accentColor,
                      borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                    }}
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Shop Categories */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
                Collections
              </h5>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Women');
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Women's Atelier
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Men');
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Men's Homme
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Unisex');
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Unisex Outerwear
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Accessories');
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Leather & Cashmere
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setActivePage('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-amber-400/90 font-medium"
                  >
                    New Arrivals
                  </button>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
                Client Care
              </h5>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => {
                      setActivePage('size-guide');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Size & Fit Guide
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('shipping-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Shipping & Customs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('return-policy');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('faq');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Contact Concierge
                  </button>
                </li>
              </ul>
            </div>

            {/* Brand & Legal */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
                The House
              </h5>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={() => {
                      setActivePage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    About AURAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage('admin');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-neutral-300 font-medium"
                  >
                    Admin Back-Office
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500 cursor-not-allowed">
                    Sustainable Flax Initiative
                  </span>
                </li>
                <li>
                  <span className="text-neutral-500 cursor-not-allowed">
                    Ethics & Supply Chain
                  </span>
                </li>
                <li>
                  <span className="text-neutral-500 cursor-not-allowed">
                    Privacy Policy
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} AURAQ Apparel Inc. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono rounded">
              VISA
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono rounded">
              MASTERCARD
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono rounded">
              AMEX
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono rounded">
              APPLE PAY
            </span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400 font-mono rounded">
              UPI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
