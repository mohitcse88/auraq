import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowRight,
  MapPin,
  Lock,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Address } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    currentTheme,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    cartTotal,
    addresses,
    placeOrder,
    setActivePage,
    userProfile,
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading">No Items to Checkout</h2>
        <p className="text-xs text-neutral-500">Your shopping bag is currently empty.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-3 bg-neutral-950 text-white text-xs uppercase tracking-wider"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Address selection & form
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || 'new'
  );
  const [customAddress, setCustomAddress] = useState<Omit<Address, 'id'>>({
    name: userProfile.name || 'Mohit Kumar',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    state: 'NY',
    pincode: '10001',
    phone: '+1 (555) 234-5678',
    isDefault: false,
    type: 'home',
  });

  // Shipping method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('standard');
  const additionalShippingCost = shippingMethod === 'express' ? 15 : shippingMethod === 'overnight' ? 25 : 0;
  const finalTotal = cartTotal + additionalShippingCost;

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(userProfile.name || 'Mohit Kumar');
  const [upiId, setUpiId] = useState('mohitkumar@okhdfcbank');
  const [selectedBank, setSelectedBank] = useState('Chase Manhattan Bank');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalAddress: Address;
    if (selectedAddressId === 'new' || addresses.length === 0) {
      finalAddress = {
        ...customAddress,
        id: `addr-${Date.now()}`,
      };
    } else {
      finalAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    }

    setTimeout(() => {
      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback silently if confetti fails
      }

      placeOrder(finalAddress, paymentMethod);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Checkout Header */}
      <div className="mb-8 border-b border-neutral-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
            Secure Atelier Checkout
          </h1>
          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
            <Lock size={12} className="text-emerald-600" />
            <span>Encrypted 256-Bit SSL Checkout Connection</span>
          </p>
        </div>

        <button
          onClick={() => setActivePage('cart')}
          className="text-xs text-neutral-600 hover:text-neutral-950 underline"
        >
          Return to Shopping Bag
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Columns: Forms */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Delivery Address */}
          <div className="p-6 bg-white border border-neutral-200 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-950 font-heading flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-neutral-950 text-white text-[11px] flex items-center justify-center font-body">
                  1
                </span>
                <span>Shipping Address</span>
              </h2>

              <span className="text-xs text-neutral-500">
                Logged in as <strong>{userProfile.email}</strong>
              </span>
            </div>

            {/* Saved Addresses Picker */}
            {addresses.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-neutral-700 block">Select Address:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-3.5 border rounded cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'border-neutral-950 bg-neutral-50/50 shadow-sm ring-1 ring-neutral-900'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-neutral-900">{addr.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-neutral-200 text-neutral-800 rounded uppercase font-semibold">
                          {addr.type}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">{addr.street}</p>
                      <p className="text-xs text-neutral-600">
                        {addr.city}, {addr.state} {addr.pincode}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-1">{addr.phone}</p>
                    </div>
                  ))}

                  <div
                    onClick={() => setSelectedAddressId('new')}
                    className={`p-3.5 border border-dashed rounded cursor-pointer transition-all flex items-center justify-center text-xs font-semibold ${
                      selectedAddressId === 'new'
                        ? 'border-neutral-950 bg-neutral-50 text-neutral-950'
                        : 'border-neutral-300 text-neutral-500 hover:border-neutral-500'
                    }`}
                  >
                    + Enter New Delivery Address
                  </div>
                </div>
              </div>
            )}

            {/* New Address Form Fields if 'new' is selected */}
            {(selectedAddressId === 'new' || addresses.length === 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-100 text-xs">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Full Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={customAddress.name}
                    onChange={(e) => setCustomAddress({ ...customAddress, name: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={customAddress.phone}
                    onChange={(e) => setCustomAddress({ ...customAddress, phone: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-neutral-700 mb-1">Street Address & Apartment</label>
                  <input
                    type="text"
                    required
                    value={customAddress.street}
                    onChange={(e) => setCustomAddress({ ...customAddress, street: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={customAddress.city}
                    onChange={(e) => setCustomAddress({ ...customAddress, city: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">State / Province</label>
                  <input
                    type="text"
                    required
                    value={customAddress.state}
                    onChange={(e) => setCustomAddress({ ...customAddress, state: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={customAddress.pincode}
                    onChange={(e) => setCustomAddress({ ...customAddress, pincode: e.target.value })}
                    className="w-full p-2 border border-neutral-300 rounded outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Shipping Method */}
          <div className="p-6 bg-white border border-neutral-200 rounded-lg space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-950 font-heading flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-white text-[11px] flex items-center justify-center font-body">
                2
              </span>
              <span>Shipping Method</span>
            </h2>

            <div className="space-y-2.5 text-xs">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-3.5 border rounded flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-neutral-950 bg-neutral-50/60 ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="text-neutral-950"
                  />
                  <div>
                    <p className="font-bold text-neutral-900">Complimentary Standard Delivery</p>
                    <p className="text-neutral-500">Delivered in 3-5 business days. Carbon neutral.</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-800">FREE</span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-3.5 border rounded flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-neutral-950 bg-neutral-50/60 ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="text-neutral-950"
                  />
                  <div>
                    <p className="font-bold text-neutral-900">Express Air Priority</p>
                    <p className="text-neutral-500">Delivered in 2 business days via FedEx Express.</p>
                  </div>
                </div>
                <span className="font-bold text-neutral-900">+$15.00</span>
              </label>

              <label
                onClick={() => setShippingMethod('overnight')}
                className={`p-3.5 border rounded flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'overnight'
                    ? 'border-neutral-950 bg-neutral-50/60 ring-1 ring-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'overnight'}
                    onChange={() => setShippingMethod('overnight')}
                    className="text-neutral-950"
                  />
                  <div>
                    <p className="font-bold text-neutral-900">Guaranteed Next-Day Overnight</p>
                    <p className="text-neutral-500">Orders placed by 2 PM ship immediately.</p>
                  </div>
                </div>
                <span className="font-bold text-neutral-900">+$25.00</span>
              </label>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="p-6 bg-white border border-neutral-200 rounded-lg space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-950 font-heading flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-950 text-white text-[11px] flex items-center justify-center font-body">
                3
              </span>
              <span>Payment Option</span>
            </h2>

            {/* Payment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 border rounded text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-neutral-950 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <CreditCard size={18} />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 border rounded text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-neutral-950 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <QrCode size={18} />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 border rounded text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-neutral-950 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Building2 size={18} />
                <span>Netbanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 border rounded text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-neutral-950 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Banknote size={18} />
                <span>Cash on Deliv</span>
              </button>
            </div>

            {/* Sub-form based on payment option */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full p-2 bg-white border border-neutral-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 bg-white border border-neutral-300 rounded font-mono outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-white border border-neutral-300 rounded font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-neutral-700 mb-1">Security Code (CVV)</label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2 bg-white border border-neutral-300 rounded font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Enter Virtual Payment Address (VPA / UPI ID)</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okhdfcbank"
                    className="w-full p-2 bg-white border border-neutral-300 rounded outline-none"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Supports Google Pay, PhonePe, Paytm, and BHIM UPI.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-2 text-xs">
                <label className="block font-semibold text-neutral-700">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full p-2 bg-white border border-neutral-300 rounded outline-none"
                >
                  <option>Chase Manhattan Bank</option>
                  <option>Bank of America</option>
                  <option>Citibank Luxury</option>
                  <option>Wells Fargo</option>
                  <option>HDFC Bank</option>
                  <option>Barclays Premier</option>
                </select>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-600 space-y-1">
                <p className="font-bold text-neutral-900">Cash on Delivery Eligible</p>
                <p>Pay upon physical inspection and arrival at your doorstep. Please ensure exact cash or card machine payment is ready.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-4 p-6 bg-neutral-50 border border-neutral-200 rounded-lg space-y-5 sticky top-28">
          <h2 className="text-base font-bold font-heading text-neutral-950 pb-3 border-b border-neutral-200">
            Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} garments)
          </h2>

          {/* Mini Items Preview */}
          <div className="max-h-60 overflow-y-auto divide-y divide-neutral-200 pr-1 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="pt-3 flex gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="w-12 h-16 object-cover rounded bg-neutral-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-900 truncate">{item.product.name}</p>
                  <p className="text-neutral-500">
                    {item.selectedSize} &bull; {item.selectedColor} &bull; Qty: {item.quantity}
                  </p>
                  <p className="font-bold text-neutral-950 mt-1">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Promotional Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-semibold text-neutral-900">
                {shippingFee + additionalShippingCost === 0
                  ? 'FREE'
                  : `$${(shippingFee + additionalShippingCost).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-semibold text-neutral-900">${taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-neutral-200 pt-2 flex justify-between items-baseline text-sm font-bold text-neutral-950">
              <span className="font-heading">Total Due</span>
              <span className="text-lg">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
            style={{
              backgroundColor: currentTheme.accentColor,
              borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
            }}
          >
            {isSubmitting ? (
              <span>Confirming Transaction...</span>
            ) : (
              <>
                <span>Authorize & Place Order</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>

          <div className="pt-2 text-[11px] text-neutral-500 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>Complimentary insured shipping with tracking</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
