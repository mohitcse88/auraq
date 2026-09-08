import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Printer,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { currentTheme, latestOrder, setActivePage } = useStore();

  if (!latestOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <p className="text-neutral-500 text-xs">No recent order found.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-6 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-wider"
        >
          Explore Clothing
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      {/* Header Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
          <CheckCircle2 size={32} strokeWidth={2.5} />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Payment & Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-heading">
            Thank you for shopping AURAQ
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
            Your tailored garments have been reserved. An invoice and tracking notifications have been
            dispatched to your account.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs">
          <div className="px-3 py-1.5 bg-neutral-100 rounded text-neutral-700 font-medium">
            Order Reference: <strong className="text-neutral-950">{latestOrder.id}</strong>
          </div>
          <div className="px-3 py-1.5 bg-neutral-100 rounded text-neutral-700 font-medium">
            Tracking Number: <strong className="text-neutral-950">{latestOrder.trackingNumber}</strong>
          </div>
          <div className="px-3 py-1.5 bg-neutral-100 rounded text-neutral-700 font-medium">
            Estimated Delivery: <strong className="text-neutral-950">{latestOrder.estimatedDelivery}</strong>
          </div>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="p-6 bg-white border border-neutral-200 rounded-lg space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950 font-heading">
          Fulfillment Journey
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-2">
            <div className="w-7 h-7 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto font-bold text-xs">
              ✓
            </div>
            <p className="font-bold text-neutral-900">Placed</p>
            <p className="text-[10px] text-neutral-400">Received by Atelier</p>
          </div>

          <div className="space-y-2">
            <div
              className="w-7 h-7 rounded-full text-white flex items-center justify-center mx-auto font-bold text-xs"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              2
            </div>
            <p className="font-bold text-neutral-900">Preparing</p>
            <p className="text-[10px] text-neutral-400">Fabric Inspection</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center mx-auto font-bold text-xs">
              3
            </div>
            <p className="font-medium text-neutral-700">Shipped</p>
            <p className="text-[10px] text-neutral-400">Carrier Dispatch</p>
          </div>

          <div className="space-y-2 opacity-50">
            <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center mx-auto font-bold text-xs">
              4
            </div>
            <p className="font-medium text-neutral-700">Delivered</p>
            <p className="text-[10px] text-neutral-400">At Your Doorstep</p>
          </div>
        </div>
      </div>

      {/* Order Itemized Receipt */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
          <h2 className="text-base font-bold font-heading text-neutral-950">
            Itemized Receipt
          </h2>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-950 font-medium"
          >
            <Printer size={14} />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Garment List */}
        <div className="divide-y divide-neutral-200">
          {latestOrder.items.map((item) => (
            <div key={item.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="w-12 h-16 object-cover rounded bg-neutral-100"
                />
                <div>
                  <p className="font-bold text-neutral-900">{item.product.name}</p>
                  <p className="text-neutral-500">
                    Size: {item.selectedSize} &bull; Color: {item.selectedColor} &bull; Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <span className="font-bold text-neutral-950">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs text-neutral-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-950">${latestOrder.subtotal.toFixed(2)}</span>
          </div>
          {latestOrder.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Promotional Savings ({latestOrder.couponCode})</span>
              <span>-${latestOrder.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold text-neutral-950">
              {latestOrder.shippingFee === 0 ? 'Complimentary' : `$${latestOrder.shippingFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold text-neutral-950">${latestOrder.tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-neutral-200 pt-3 flex justify-between items-baseline text-sm font-bold text-neutral-950">
            <span className="font-heading">Total Paid</span>
            <span className="text-lg">${latestOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Address and Method Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200 text-xs">
          <div>
            <span className="font-bold text-neutral-900 uppercase tracking-wider block mb-1">
              Delivery Address
            </span>
            <p className="text-neutral-700">{latestOrder.shippingAddress.name}</p>
            <p className="text-neutral-500">{latestOrder.shippingAddress.street}</p>
            <p className="text-neutral-500">
              {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} {latestOrder.shippingAddress.pincode}
            </p>
            <p className="text-neutral-500 mt-1">{latestOrder.shippingAddress.phone}</p>
          </div>

          <div>
            <span className="font-bold text-neutral-900 uppercase tracking-wider block mb-1">
              Payment Method
            </span>
            <p className="text-neutral-700 capitalize font-medium">
              {latestOrder.paymentMethod === 'card'
                ? 'Credit Card ending in 4242'
                : latestOrder.paymentMethod === 'upi'
                ? 'UPI Virtual Payment (Verified)'
                : latestOrder.paymentMethod === 'netbanking'
                ? 'Online Netbanking Transfer'
                : 'Cash on Delivery Verified'}
            </p>
            <p className="text-emerald-700 text-[11px] mt-1 flex items-center gap-1">
              <span>● Status: Completed & Authenticated</span>
            </p>
          </div>
        </div>
      </div>

      {/* Post Checkout Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => {
            setActivePage('account');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-6 py-3 border border-neutral-900 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
        >
          View in My Account & Track Delivery
        </button>

        <button
          onClick={() => {
            setActivePage('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-8 py-3 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
          style={{
            backgroundColor: currentTheme.accentColor,
          }}
        >
          <span>Continue Exploring AURAQ</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
