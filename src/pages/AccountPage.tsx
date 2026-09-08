import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  RotateCcw,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  Truck,
  ArrowRight,
  Shield,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Address, OrderStatus } from '../types';

export const AccountPage: React.FC = () => {
  const {
    currentTheme,
    userProfile,
    loginUser,
    logoutUser,
    orders,
    wishlist,
    products,
    addresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    addToCart,
    toggleWishlist,
    returnRequests,
    submitReturnRequest,
    viewProductDetails,
    setActivePage,
  } = useStore();

  // Active tab inside Account
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'returns' | 'profile'>('orders');

  // Login form state
  const [authMode, setAuthMode] = useState<'email' | 'otp'>('email');
  const [loginEmail, setLoginEmail] = useState('mohitkumardoctor@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginPhone, setLoginPhone] = useState('+1 (555) 234-5678');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Address modal / form
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddr, setNewAddr] = useState<Omit<Address, 'id'>>({
    name: userProfile.name || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: userProfile.phone || '',
    isDefault: false,
    type: 'home',
  });

  // Return request form
  const [returnOrderId, setReturnOrderId] = useState(orders[0]?.id || '');
  const [returnProductId, setReturnProductId] = useState(orders[0]?.items[0]?.productId || '');
  const [returnReason, setReturnReason] = useState('Size too small/large');
  const [returnComment, setReturnComment] = useState('');
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'email') {
      loginUser(loginEmail, 'Mohit Kumar');
    } else {
      if (!otpSent) {
        setOtpSent(true);
      } else {
        loginUser(loginPhone, 'Mohit Kumar');
      }
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddr);
    setIsAddAddressOpen(false);
    setNewAddr({
      name: userProfile.name || '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: userProfile.phone || '',
      isDefault: false,
      type: 'home',
    });
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find((o) => o.id === returnOrderId);
    const item = order?.items.find((i) => i.productId === returnProductId);
    submitReturnRequest(
      returnOrderId,
      returnProductId,
      item ? item.product.name : 'AURAQ Garment',
      returnReason,
      returnComment
    );
    setReturnSubmitted(true);
    setTimeout(() => {
      setReturnSubmitted(false);
      setReturnComment('');
      setActiveTab('returns');
    }, 1500);
  };

  if (!userProfile.isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white p-8 border border-neutral-200 rounded-lg shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <span className="text-2xl font-extrabold tracking-[0.2em] uppercase font-heading block">
              AURAQ
            </span>
            <h2 className="text-lg font-bold font-heading text-neutral-900">
              Sign In to Your Client Account
            </h2>
            <p className="text-xs text-neutral-500">
              Access curated order histories, saved pieces, and return requests.
            </p>
          </div>

          <div className="flex border-b border-neutral-200 text-xs font-semibold">
            <button
              onClick={() => setAuthMode('email')}
              className={`flex-1 py-2 border-b-2 uppercase tracking-wider ${
                authMode === 'email' ? 'border-neutral-950 text-neutral-950' : 'border-transparent text-neutral-400'
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setAuthMode('otp')}
              className={`flex-1 py-2 border-b-2 uppercase tracking-wider ${
                authMode === 'otp' ? 'border-neutral-950 text-neutral-950' : 'border-transparent text-neutral-400'
              }`}
            >
              Mobile OTP Code
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {authMode === 'email' ? (
              <>
                <div>
                  <label className="block font-semibold mb-1 text-neutral-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-2.5 border rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-neutral-700">Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-2.5 border rounded outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block font-semibold mb-1 text-neutral-700">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full p-2.5 border rounded outline-none"
                  />
                </div>
                {otpSent && (
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700">6-Digit OTP</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 749201"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full p-2.5 border rounded outline-none font-mono"
                    />
                    <p className="text-[10px] text-emerald-700 mt-1">Mock OTP sent to {loginPhone} (Enter any 6 digits)</p>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white transition-opacity"
              style={{
                backgroundColor: currentTheme.accentColor,
              }}
            >
              {authMode === 'otp' && !otpSent ? 'Request Mobile OTP' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Account Profile Header */}
      <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-neutral-900 text-white flex items-center justify-center font-extrabold text-xl font-heading shadow-md">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-neutral-950">
              Welcome back, {userProfile.name}
            </h1>
            <p className="text-xs text-neutral-500">
              {userProfile.email} &bull; Tier: <strong className="text-neutral-800">Atelier Patron</strong>
            </p>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="flex items-center gap-1.5 px-4 py-2 border border-neutral-300 rounded text-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 font-semibold"
        >
          <LogOut size={13} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-neutral-200 overflow-x-auto text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Package size={14} />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'wishlist'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Heart size={14} />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'addresses'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <MapPin size={14} />
          <span>Saved Addresses ({addresses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`py-3 px-4 border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'returns'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <RotateCcw size={14} />
          <span>Returns & Exchanges ({returnRequests.length})</span>
        </button>
      </div>

      {/* Tab 1: Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-neutral-200 rounded-lg p-6 space-y-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-neutral-900 text-sm">{order.id}</span>
                    <span className="text-neutral-400 mx-2">&bull;</span>
                    <span className="text-neutral-500">Placed on {order.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${
                        order.status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : order.status === 'shipped'
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      Status: {order.status.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-neutral-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Progress Stepper for this order */}
                <div className="p-3 bg-neutral-50 rounded border border-neutral-100">
                  <div className="flex justify-between text-[11px] font-semibold text-neutral-700">
                    <span className="text-neutral-950">1. Placed</span>
                    <span className={order.status !== 'placed' ? 'text-neutral-950' : 'text-neutral-400'}>
                      2. Confirmed
                    </span>
                    <span
                      className={
                        order.status === 'shipped' || order.status === 'out_for_delivery' || order.status === 'delivered'
                          ? 'text-neutral-950'
                          : 'text-neutral-400'
                      }
                    >
                      3. Shipped
                    </span>
                    <span className={order.status === 'delivered' ? 'text-emerald-700 font-bold' : 'text-neutral-400'}>
                      4. Delivered
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 transition-all"
                      style={{
                        width:
                          order.status === 'delivered'
                            ? '100%'
                            : order.status === 'out_for_delivery'
                            ? '80%'
                            : order.status === 'shipped'
                            ? '60%'
                            : '25%',
                      }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-neutral-100">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between text-xs">
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
                      <div className="text-right">
                        <p className="font-bold text-neutral-950">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => {
                            setReturnOrderId(order.id);
                            setReturnProductId(item.productId);
                            setActiveTab('returns');
                          }}
                          className="text-[11px] text-neutral-500 hover:text-neutral-900 underline mt-1"
                        >
                          Request Return / Exchange
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-neutral-500 border-t border-neutral-100">
                  <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                  <span>Estimated Delivery: <strong>{order.estimatedDelivery}</strong></span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-neutral-500 p-8 text-center bg-white border rounded">
              No orders placed yet.
            </p>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-neutral-200 rounded p-4 flex flex-col justify-between space-y-3"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full aspect-[3/4] object-cover rounded bg-neutral-100"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">{prod.name}</h4>
                    <p className="text-xs text-neutral-500">{prod.fabric}</p>
                    <p className="text-sm font-bold text-neutral-950 mt-1">${prod.price}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart(prod, prod.sizes[0], prod.colors[0]?.name || 'Standard', 1);
                        toggleWishlist(prod.id);
                      }}
                      className="flex-1 py-2 text-xs font-semibold uppercase tracking-wider text-white rounded"
                      style={{ backgroundColor: currentTheme.accentColor }}
                    >
                      Move to Bag
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 border border-neutral-300 hover:border-rose-500 text-rose-500 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white border rounded space-y-3">
              <Heart size={28} className="mx-auto text-neutral-400" />
              <p className="text-xs text-neutral-500">Your wishlist is currently empty.</p>
              <button
                onClick={() => setActivePage('shop')}
                className="px-6 py-2 bg-neutral-900 text-white text-xs uppercase"
              >
                Browse Collections
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Address Book
            </h3>
            <button
              onClick={() => setIsAddAddressOpen(true)}
              className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 rounded"
            >
              <Plus size={14} />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-5 border rounded-lg bg-white relative space-y-2 ${
                  addr.isDefault ? 'border-neutral-950 ring-1 ring-neutral-950' : 'border-neutral-200'
                }`}
              >
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">{addr.name}</span>
                    <span className="ml-2 px-1.5 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] uppercase font-bold rounded">
                      {addr.type}
                    </span>
                  </div>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      Default Delivery
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600">{addr.street}</p>
                <p className="text-xs text-neutral-600">
                  {addr.city}, {addr.state} {addr.pincode}
                </p>
                <p className="text-xs text-neutral-500">{addr.phone}</p>

                <div className="flex items-center gap-3 pt-3 border-t border-neutral-100 text-xs">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="font-semibold text-neutral-900 hover:underline"
                    >
                      Make Default
                    </button>
                  )}
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-rose-600 hover:underline ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Address Modal */}
          {isAddAddressOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="bg-white p-6 max-w-md w-full rounded-lg shadow-xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <h3 className="text-base font-bold font-heading">Add New Address</h3>
                  <button onClick={() => setIsAddAddressOpen(false)}>✕</button>
                </div>
                <form onSubmit={handleAddressSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">State / Zip</label>
                      <input
                        type="text"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="def"
                      checked={newAddr.isDefault}
                      onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                    />
                    <label htmlFor="def">Set as primary default address</label>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddAddressOpen(false)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-neutral-950 text-white rounded font-semibold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Returns & Exchanges Tab */}
      {activeTab === 'returns' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Return Tickets */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Active Return Tickets ({returnRequests.length})
            </h3>

            {returnRequests.length > 0 ? (
              returnRequests.map((ret) => (
                <div
                  key={ret.id}
                  className="p-5 border border-neutral-200 rounded-lg bg-white space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center font-bold text-neutral-900">
                    <span>{ret.id}</span>
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded font-semibold">
                      {ret.status}
                    </span>
                  </div>
                  <p className="font-semibold">{ret.productName}</p>
                  <p className="text-neutral-500">Reason: {ret.reason}</p>
                  <p className="text-neutral-500">Requested on: {ret.date}</p>
                  <p className="text-emerald-700 font-medium">Prepaid return label sent to email.</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-500 p-6 text-center bg-white border rounded">
                No active return or exchange tickets.
              </p>
            )}
          </div>

          {/* New Return Request Form */}
          <div className="lg:col-span-6 p-6 bg-white border border-neutral-200 rounded-lg space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-heading">
              Initiate Return or Exchange
            </h3>
            <p className="text-xs text-neutral-500">
              Items can be returned within 30 days of delivery with original tags attached.
            </p>

            <form onSubmit={handleReturnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Order</label>
                <select
                  value={returnOrderId}
                  onChange={(e) => setReturnOrderId(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.id} - Placed on {o.date} (${o.total})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Reason for Return</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>Size too small</option>
                  <option>Size too large</option>
                  <option>Color mismatch with photos</option>
                  <option>Fabric texture not as expected</option>
                  <option>Damaged or defective</option>
                  <option>Exchange for different size/color</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  value={returnComment}
                  onChange={(e) => setReturnComment(e.target.value)}
                  placeholder="Describe your request..."
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white rounded transition-opacity"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                {returnSubmitted ? '✓ Return Ticket Generated' : 'Submit Return Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
