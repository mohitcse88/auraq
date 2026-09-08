import React, { useState } from 'react';
import {
  Trash2,
  Bookmark,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Tag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    currentTheme,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    saveForLater,
    savedForLater,
    moveToCartFromSaved,
    removeSavedForLater,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActivePage,
    viewProductDetails,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyCoupon(promoInput);
    setPromoMessage({ success: result.success, text: result.message });
    if (result.success) setPromoInput('');
  };

  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-bold font-heading text-neutral-900">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Explore our seasonal releases of architectural linen, Mongolian cashmere, and modern tailoring.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-opacity"
          style={{
            backgroundColor: currentTheme.accentColor,
            borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
          }}
        >
          Explore Clothing Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
          Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Complimentary shipping on orders over $150 &bull; 30-day effortless returns
        </p>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-neutral-700">
            {amountToFreeShipping === 0
              ? '✓ You have unlocked complimentary standard shipping!'
              : `Add $${amountToFreeShipping.toFixed(2)} more for complimentary worldwide shipping.`}
          </span>
          <span className="text-neutral-900 font-bold">${cartSubtotal} / $150</span>
        </div>
        <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{
              width: `${freeShippingProgress}%`,
              backgroundColor: currentTheme.accentColor,
            }}
          />
        </div>
      </div>

      {/* Cart Grid: Items on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Active Bag Items */}
        <div className="lg:col-span-8 space-y-6">
          {cart.length > 0 ? (
            <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex gap-4 sm:gap-6">
                  {/* Item Image */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onClick={() => viewProductDetails(item.product)}
                    className="w-20 h-28 sm:w-28 sm:h-36 object-cover object-center bg-neutral-100 cursor-pointer rounded"
                  />

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h3
                          onClick={() => viewProductDetails(item.product)}
                          className="text-sm sm:text-base font-semibold text-neutral-900 hover:text-neutral-700 cursor-pointer font-heading"
                        >
                          {item.product.name}
                        </h3>
                        <span className="text-sm sm:text-base font-bold text-neutral-950">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-500 space-x-3">
                        <span>Size: <strong className="text-neutral-800">{item.selectedSize}</strong></span>
                        <span>&bull;</span>
                        <span>Color: <strong className="text-neutral-800">{item.selectedColor}</strong></span>
                      </div>

                      <p className="text-[11px] text-neutral-400">{item.product.fabric}</p>
                    </div>

                    {/* Quantity & Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                      {/* Stepper */}
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-950"
                        >
                          &minus;
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-950"
                        >
                          &#43;
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium">
                        <button
                          onClick={() => saveForLater(item.id)}
                          className="text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                        >
                          <Bookmark size={13} />
                          <span>Save for later</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-rose-600 hover:text-rose-800 flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center border rounded bg-neutral-50 text-xs text-neutral-500">
              No active items in bag. Check your saved pieces below.
            </div>
          )}

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-8 space-y-4">
              <h3 className="text-base font-bold font-heading text-neutral-950">
                Saved for Later ({savedForLater.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedForLater.map((saved) => (
                  <div
                    key={saved.id}
                    className="p-4 border border-neutral-200 rounded flex gap-3 bg-white"
                  >
                    <img
                      src={saved.product.images[0]}
                      alt={saved.product.name}
                      className="w-16 h-20 object-cover rounded bg-neutral-100"
                    />
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <p className="font-semibold text-neutral-900 line-clamp-1">
                          {saved.product.name}
                        </p>
                        <p className="text-neutral-500">
                          {saved.selectedSize} &bull; {saved.selectedColor}
                        </p>
                        <p className="font-bold text-neutral-950 mt-1">${saved.product.price}</p>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => moveToCartFromSaved(saved.id)}
                          className="font-semibold underline hover:text-neutral-600"
                          style={{ color: currentTheme.accentColor }}
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => removeSavedForLater(saved.id)}
                          className="text-neutral-400 hover:text-rose-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4 p-6 bg-neutral-50 border border-neutral-200 rounded-lg space-y-6">
          <h2 className="text-lg font-bold font-heading text-neutral-950 border-b border-neutral-200 pb-3">
            Order Summary
          </h2>

          {/* Promo Code Box */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-neutral-900 block">Promotional Code</span>
            {appliedCoupon ? (
              <div className="p-3 bg-white border border-neutral-200 rounded flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Tag size={14} style={{ color: currentTheme.accentColor }} />
                  <div>
                    <span className="font-bold text-neutral-900">{appliedCoupon.code}</span>
                    <span className="text-neutral-500 text-[11px] block">
                      ({appliedCoupon.discountPercent}% off applied)
                    </span>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. AURAQ15, WELCOME20"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs uppercase bg-white border border-neutral-300 rounded outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-white rounded hover:bg-neutral-800"
                >
                  Apply
                </button>
              </form>
            )}

            {promoMessage && (
              <p
                className={`text-[11px] p-2 rounded ${
                  promoMessage.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {promoMessage.text}
              </p>
            )}
          </div>

          {/* Cost Line Items */}
          <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-200 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-950">${cartSubtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount Applied</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-neutral-950">
                {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span className="font-semibold text-neutral-950">${taxAmount.toFixed(2)}</span>
            </div>

            <div className="border-t border-neutral-200 pt-3 flex justify-between items-baseline text-sm font-bold text-neutral-950">
              <span className="text-base font-heading">Estimated Total</span>
              <span className="text-lg">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => {
              setActivePage('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={cart.length === 0}
            className="w-full py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: currentTheme.accentColor,
              borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
            }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={14} />
          </button>

          {/* Trust assurances */}
          <div className="pt-2 text-[11px] text-neutral-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-neutral-700" />
              <span>256-Bit SSL Encrypted & Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={14} className="text-neutral-700" />
              <span>30-Day Hassle-Free Returns Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
