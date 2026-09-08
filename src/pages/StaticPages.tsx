import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Recycle,
  Feather,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface StaticPagesProps {
  initialTab?: 'about' | 'contact' | 'faq';
}

export const StaticPages: React.FC<StaticPagesProps> = ({ initialTab = 'about' }) => {
  const { currentTheme, activePage, setActivePage } = useStore();
  const [tab, setTab] = useState<'about' | 'contact' | 'faq'>(
    activePage === 'contact' ? 'contact' : activePage === 'faq' ? 'faq' : 'about'
  );

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Order Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  const faqs = [
    {
      q: 'Where are AURAQ garments designed and fabricated?',
      a: 'AURAQ is conceived in our studio in Brooklyn, New York. Our textiles are ethically sourced from heritage mills in Biella (Italy), Normandy (France), and Inner Mongolia, and cut and sewn in audited, fair-wage ateliers.',
    },
    {
      q: 'What is your shipping schedule and delivery window?',
      a: 'We offer complimentary carbon-neutral standard delivery on domestic orders over $150. Orders placed before 2 PM EST ship the same business day. Standard delivery arrives within 3 to 5 business days, and Express Air arrives in 2 business days.',
    },
    {
      q: 'How do I care for raw wool, cashmere, and Belgian linen garments?',
      a: 'Natural fibers breathe naturally and require less laundering than synthetic textiles. For wool and cashmere, spot clean or gentle hand wash cold with pH-neutral wool wash, then dry flat on a towel. For linen, machine wash cold on delicate and hang to dry.',
    },
    {
      q: 'What is your returns and exchange policy?',
      a: 'We accept returns and size exchanges within 30 days of receipt, provided items are unwashed, unworn, and have all original atelier tags attached. Every shipment includes a prepaid return shipping label in your parcel.',
    },
    {
      q: 'Do you offer international shipping and duties coverage?',
      a: 'Yes, we ship to over 60 countries worldwide via DHL Express. All international taxes, customs duties, and import fees can be calculated and prepaid at checkout for guaranteed delivery without delays.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Tab Switcher Header */}
      <div className="flex justify-center border-b border-neutral-200">
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
          <button
            onClick={() => setTab('about')}
            className={`py-3 border-b-2 transition-colors ${
              tab === 'about'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            The Atelier & Story
          </button>
          <button
            onClick={() => setTab('contact')}
            className={`py-3 border-b-2 transition-colors ${
              tab === 'contact'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Client Services & Concierge
          </button>
          <button
            onClick={() => setTab('faq')}
            className={`py-3 border-b-2 transition-colors ${
              tab === 'faq'
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>
      </div>

      {/* About Tab */}
      {tab === 'about' && (
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              The AURAQ Philosophy
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 font-heading">
              Clothing Designed with Restraint, Sourced with Conscience
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Founded in 2024, AURAQ was born from a singular conviction: the modern wardrobe does
              not need more volume — it demands better textiles, sharper silhouettes, and garments that
              age gracefully through continuous wear.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-8 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                <Feather size={20} />
              </div>
              <h3 className="text-base font-bold font-heading text-neutral-950">
                Architectural Simplicity
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Eliminating decorative noise to spotlight organic drape, structured shoulder lines, and
                relaxed proportions that flatter every silhouette.
              </p>
            </div>

            <div className="p-8 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                <Recycle size={20} />
              </div>
              <h3 className="text-base font-bold font-heading text-neutral-950">
                100% Traceable Fibers
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                From Belgian flax linen to certified cruelty-free Merino wool, every thread can be
                traced directly to family-run agricultural partners.
              </p>
            </div>

            <div className="p-8 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold font-heading text-neutral-950">
                Lifetime Durability
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Double-needle felled seams, reinforced horn buttons, and heavy-gauge yarns engineered
                to outlast cyclical seasonal trends.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {tab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Atelier Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Connect With Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-heading mt-1">
                Atelier Concierge
              </h2>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Have inquiries about bespoke sizing, international deliveries, or fabric sourcing?
                Our client advisory team responds within 4 business hours.
              </p>
            </div>

            <div className="space-y-4 text-xs text-neutral-700">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-neutral-900 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Flagship Atelier</p>
                  <p className="text-neutral-500">482 Broome Street, SoHo, New York, NY 10013</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-neutral-900 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Direct Inquiries</p>
                  <p className="text-neutral-500">concierge@auraq-atelier.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-neutral-900 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Client Hotline</p>
                  <p className="text-neutral-500">+1 (800) 842-8727 (Mon–Sat, 9AM–7PM EST)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-neutral-900 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Boutique Hours</p>
                  <p className="text-neutral-500">Monday &ndash; Sunday: 10:00 AM &ndash; 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 border border-neutral-200 rounded-lg shadow-sm space-y-4">
            <h3 className="text-base font-bold font-heading text-neutral-950">
              Send a Message to the Atelier
            </h3>

            {isSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded text-center space-y-2">
                <span className="text-emerald-700 font-bold text-sm">Message Transmitted</span>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out. A client specialist has received your inquiry.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full p-2.5 border border-neutral-300 rounded outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="elena@domain.com"
                      className="w-full p-2.5 border border-neutral-300 rounded outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-neutral-700">Inquiry Department</label>
                  <select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded outline-none"
                  >
                    <option>Garment Sizing & Fit Consultation</option>
                    <option>Order Status & Tracking</option>
                    <option>Returns, Exchanges & Alterations</option>
                    <option>Wholesale & Editorial Press</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-neutral-700">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="How may we assist you today?"
                    className="w-full p-2.5 border border-neutral-300 rounded outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-opacity flex items-center gap-2"
                  style={{ backgroundColor: currentTheme.accentColor }}
                >
                  <span>Dispatch Message</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {tab === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-heading">
              Client Advisory & FAQ
            </h2>
            <p className="text-xs text-neutral-500">
              Clear answers regarding our sizing, global shipments, care guides, and returns.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-lg overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex justify-between items-center text-xs font-bold text-neutral-900 hover:bg-neutral-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
