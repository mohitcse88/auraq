import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Star,
  Search,
  Tag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, Category } from '../types';

export const AdminPage: React.FC = () => {
  const {
    currentTheme,
    products,
    orders,
    reviews,
    coupons,
    addProduct,
    updateProductStock,
    updateOrderStatus,
    deleteProduct,
    createCoupon,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'reviews'>('overview');

  // New Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Category>('Women');
  const [newProdPrice, setNewProdPrice] = useState(145);
  const [newProdFabric, setNewProdFabric] = useState('100% Organic Linen');
  const [newProdFit, setNewProdFit] = useState('Relaxed');
  const [newProdStock, setNewProdStock] = useState(25);
  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
  );
  const [newProdDesc, setNewProdDesc] = useState('Architecturally draped silhouette constructed with artisan care.');

  // Coupon creator
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);

  // Search in tables
  const [tableSearch, setTableSearch] = useState('');

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  );
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const lowStockCount = products.filter((p) => p.stockCount <= 10).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProdName,
      brand: 'AURAQ Atelier',
      price: Number(newProdPrice),
      category: newProdCategory,
      fabric: newProdFabric,
      fit: newProdFit,
      description: newProdDesc,
      details: ['Hand-finished hems', 'Artisan construction', 'Natural dye pigments'],
      careInstructions: ['Dry clean or hand wash cold', 'Lay flat to dry', 'Iron on low heat'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Warm Taupe', hex: '#b5a397' },
        { name: 'Noir Black', hex: '#1c1b1a' },
      ],
      images: [newProdImage, 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'],
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: Number(newProdStock),
      isNew: true,
      tags: ['New Arrival', 'Atelier', newProdCategory.toLowerCase()],
    });

    setIsAddProductOpen(false);
    setNewProdName('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCouponCode.trim()) {
      createCoupon(newCouponCode.toUpperCase().trim(), Number(newCouponPercent));
      setNewCouponCode('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            AURAQ Back-Office
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
            Store Administration & Atelier Operations
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow"
            style={{ backgroundColor: currentTheme.accentColor }}
          >
            <Plus size={14} />
            <span>Add New Garment</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <TrendingUp size={14} />
          <span>Overview Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <ShoppingBag size={14} />
          <span>Garment Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <Package size={14} />
          <span>Fulfillment & Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`py-3 px-5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'coupons'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <Tag size={14} />
          <span>Promotions & Coupons ({coupons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-3 px-5 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'border-neutral-950 text-neutral-950'
              : 'border-transparent text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <Star size={14} />
          <span>Reviews Moderation ({reviews.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-neutral-200 rounded-lg space-y-1">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Total Store Revenue
              </span>
              <p className="text-2xl font-extrabold text-neutral-950 font-heading">
                ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">↑ +18.4% vs last month</p>
            </div>

            <div className="p-5 bg-white border border-neutral-200 rounded-lg space-y-1">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Total Orders Processed
              </span>
              <p className="text-2xl font-extrabold text-neutral-950 font-heading">
                {orders.length}
              </p>
              <p className="text-[11px] text-neutral-500 font-medium">{totalItemsSold} pieces shipped</p>
            </div>

            <div className="p-5 bg-white border border-neutral-200 rounded-lg space-y-1">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Average Order Value
              </span>
              <p className="text-2xl font-extrabold text-neutral-950 font-heading">
                ${avgOrderValue.toFixed(2)}
              </p>
              <p className="text-[11px] text-neutral-500 font-medium">High luxury customer cohort</p>
            </div>

            <div className="p-5 bg-white border border-neutral-200 rounded-lg space-y-1">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Low Stock Alerts
              </span>
              <p className="text-2xl font-extrabold text-rose-600 font-heading">
                {lowStockCount} items
              </p>
              <p className="text-[11px] text-neutral-500 font-medium">Requires atelier restock</p>
            </div>
          </div>

          {/* Recent Orders Preview */}
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-heading">
              Latest Live Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 uppercase">
                    <th className="py-2.5">Order ID</th>
                    <th className="py-2.5">Customer</th>
                    <th className="py-2.5">Garments</th>
                    <th className="py-2.5">Total</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-neutral-50">
                      <td className="py-3 font-mono font-bold text-neutral-900">{o.id}</td>
                      <td className="py-3">{o.shippingAddress.name}</td>
                      <td className="py-3">{o.items.length} items</td>
                      <td className="py-3 font-bold text-neutral-950">${o.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-100 text-neutral-800">
                          {o.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-500">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Products Inventory */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search catalog by name, fabric..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded outline-none"
              />
            </div>
            <span className="text-xs text-neutral-500 font-medium self-center">
              Total: {products.length} garments
            </span>
          </div>

          <div className="bg-white border border-neutral-200 rounded-lg overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 uppercase font-semibold">
                <tr>
                  <th className="p-3">Garment</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Fabric</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Units</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products
                  .filter((p) => p.name.toLowerCase().includes(tableSearch.toLowerCase()))
                  .map((prod) => (
                    <tr key={prod.id} className="hover:bg-neutral-50/80">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt=""
                          className="w-10 h-14 object-cover rounded bg-neutral-100"
                        />
                        <div>
                          <p className="font-bold text-neutral-900 line-clamp-1">{prod.name}</p>
                          <p className="text-[10px] text-neutral-400 font-mono">ID: {prod.id}</p>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-neutral-700">{prod.category}</td>
                      <td className="p-3 text-neutral-600">{prod.fabric}</td>
                      <td className="p-3 font-bold text-neutral-950">${prod.price}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateProductStock(prod.id, Math.max(0, prod.stockCount - 1))}
                            className="px-1.5 py-0.5 border rounded text-neutral-600 hover:bg-neutral-200"
                          >
                            &minus;
                          </button>
                          <span
                            className={`font-bold ${
                              prod.stockCount <= 5 ? 'text-rose-600' : 'text-neutral-900'
                            }`}
                          >
                            {prod.stockCount}
                          </span>
                          <button
                            onClick={() => updateProductStock(prod.id, prod.stockCount + 1)}
                            className="px-1.5 py-0.5 border rounded text-neutral-600 hover:bg-neutral-200"
                          >
                            &#43;
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-amber-500 font-bold">★ {prod.rating}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded"
                          title="Delete piece"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white border border-neutral-200 rounded-lg overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 uppercase font-semibold">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Garments Ordered</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Status Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50">
                    <td className="p-3 font-mono font-bold text-neutral-900">{order.id}</td>
                    <td className="p-3">
                      <p className="font-bold text-neutral-900">{order.shippingAddress.name}</p>
                      <p className="text-[11px] text-neutral-500">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                    </td>
                    <td className="p-3">
                      {order.items.map((it) => (
                        <div key={it.id} className="text-[11px] text-neutral-600">
                          {it.quantity}x {it.product.name} ({it.selectedSize})
                        </div>
                      ))}
                    </td>
                    <td className="p-3 font-bold text-neutral-950">${order.total.toFixed(2)}</td>
                    <td className="p-3 capitalize text-neutral-600">{order.paymentMethod}</td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="p-1.5 border border-neutral-300 rounded font-semibold text-xs bg-white cursor-pointer"
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Coupons Management */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-heading">
              Active Promo Codes
            </h3>
            <div className="space-y-3">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 bg-white border border-neutral-200 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Tag size={18} style={{ color: currentTheme.accentColor }} />
                    <div>
                      <span className="font-bold text-sm text-neutral-950 tracking-wider">
                        {c.code}
                      </span>
                      <p className="text-xs text-neutral-500">
                        {c.discountPercent}% Discount &bull; Min spend ${c.minOrderAmount}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Create Coupon Form */}
          <div className="md:col-span-5 p-6 bg-white border border-neutral-200 rounded-lg space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-heading">
              Generate New Voucher
            </h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH25"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full p-2.5 uppercase font-mono border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  min={5}
                  max={70}
                  required
                  value={newCouponPercent}
                  onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                  className="w-full p-2.5 border rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white rounded"
                style={{ backgroundColor: currentTheme.accentColor }}
              >
                Create Promo Code
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 5: Reviews Moderation */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-heading">
            Client Review Moderation Feed
          </h3>
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 bg-white border border-neutral-200 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900">{rev.userName}</span>
                    <span className="text-amber-500 font-bold">★ {rev.rating}.0</span>
                    <span className="text-neutral-400">&bull; {rev.date}</span>
                  </div>
                  <p className="font-semibold text-neutral-800">{rev.title}</p>
                  <p className="text-neutral-600">{rev.comment}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded uppercase text-[10px]">
                    Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 max-w-xl w-full rounded-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-base font-bold font-heading">Add Atelier Garment</h3>
              <button onClick={() => setIsAddProductOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Garment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sculpted Selvedge Denim Jacket"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full p-2.5 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as Category)}
                    className="w-full p-2.5 border rounded"
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Retail Price ($USD)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 border rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Fabric Sourcing</label>
                  <input
                    type="text"
                    required
                    value={newProdFabric}
                    onChange={(e) => setNewProdFabric(e.target.value)}
                    className="w-full p-2.5 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full p-2.5 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full p-2.5 border rounded"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Editorial Description</label>
                <textarea
                  rows={3}
                  required
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full p-2.5 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-neutral-950 text-white font-semibold rounded"
                >
                  Publish Garment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
