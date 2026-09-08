import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Ruler,
  Check,
  MapPin,
  AlertCircle,
  Sparkles,
  Share2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    currentTheme,
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActivePage,
    products,
    reviews,
    addReview,
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-neutral-500">Garment not found.</p>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-4 px-6 py-2 bg-neutral-900 text-white text-xs uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');

  // Review modal state
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const inWishlist = isInWishlist(selectedProduct.id);
  const productReviews = reviews.filter((r) => r.productId === selectedProduct.id && r.status === 'approved');

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const checkDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 3) {
      setDeliveryEstimate(
        `Complimentary express delivery available by ${new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}. Hassle-free 30-day returns included.`
      );
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewTitle.trim() && reviewComment.trim()) {
      addReview({
        productId: selectedProduct.id,
        userName: reviewName,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        verifiedPurchase: true,
      });
      setIsWriteReviewOpen(false);
      setReviewName('');
      setReviewTitle('');
      setReviewComment('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider">
        <button onClick={() => setActivePage('home')} className="hover:text-neutral-900">
          Home
        </button>
        <ChevronRight size={12} />
        <button
          onClick={() => setActivePage('shop')}
          className="hover:text-neutral-900"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight size={12} />
        <span className="text-neutral-900 font-semibold truncate max-w-xs">
          {selectedProduct.name}
        </span>
      </div>

      {/* Main PDP Grid (Gallery & Product Spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery with Zoom */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
            {selectedProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-neutral-900 ring-1 ring-neutral-900 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-80'
                }`}
                style={{
                  borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '6px',
                }}
              >
                <img src={img} alt="" className="h-full w-full object-cover object-center" />
              </button>
            ))}
          </div>

          {/* Main Large Image with Zoom on Hover */}
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            className="relative flex-1 aspect-[3/4] bg-neutral-100 overflow-hidden cursor-crosshair border border-neutral-200"
            style={{
              borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '12px',
            }}
          >
            <img
              src={selectedProduct.images[activeImageIndex]}
              alt={selectedProduct.name}
              className={`h-full w-full object-cover object-center transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                    }
                  : undefined
              }
            />

            {/* Hover hint */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-medium rounded pointer-events-none">
              Hover to Zoom
            </div>
          </div>
        </div>

        {/* Right Column: Garment Information & Purchase Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 uppercase tracking-widest font-medium mb-1">
              <span>{selectedProduct.brand}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Sparkles size={12} />
                <span>{selectedProduct.stockCount > 10 ? 'In Stock' : `Only ${selectedProduct.stockCount} left`}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 font-heading">
              {selectedProduct.name}
            </h1>

            {/* Rating Stars & Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(selectedProduct.rating) ? 'currentColor' : 'none'}
                    className={i < Math.floor(selectedProduct.rating) ? '' : 'text-neutral-300'}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-900">{selectedProduct.rating}</span>
              <span className="text-xs text-neutral-400">&bull;</span>
              <a href="#reviews" className="text-xs text-neutral-600 underline hover:text-neutral-950">
                {productReviews.length} Verified Reviews
              </a>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-neutral-950">
                ${selectedProduct.price}
              </span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-base text-neutral-400 line-through">
                    ${selectedProduct.originalPrice}
                  </span>
                  <span
                    className="px-2 py-0.5 text-xs font-bold text-white uppercase rounded"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  >
                    Save {selectedProduct.discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 mt-4 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-2.5 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900 uppercase tracking-wider">
                Color Palette: <strong className="text-neutral-950 normal-case">{selectedColor}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {selectedProduct.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-transform ${
                    selectedColor === color.name
                      ? 'border-neutral-900 scale-110 shadow-md ring-1 ring-neutral-900'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={color.name}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/15"
                    style={{ backgroundColor: color.hex }}
                  />
                  {selectedColor === color.name && (
                    <Check
                      size={12}
                      className="absolute inset-0 m-auto text-white drop-shadow"
                      strokeWidth={3}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector + Size Chart Modal Link */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900 uppercase tracking-wider">
                Select Size
              </span>
              <button
                type="button"
                onClick={() => setIsSizeChartOpen(true)}
                className="text-neutral-600 hover:text-neutral-950 font-medium underline flex items-center gap-1"
              >
                <Ruler size={13} />
                <span>Size Chart & Guide</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedProduct.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      isSelected
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-900'
                    }`}
                    style={{
                      borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper & Add to Bag / Buy Now Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-neutral-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-3 text-neutral-600 hover:text-neutral-950 text-sm font-semibold"
                >
                  &minus;
                </button>
                <span className="w-10 text-center text-xs font-bold text-neutral-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(selectedProduct.stockCount, q + 1))}
                  className="px-3 py-3 text-neutral-600 hover:text-neutral-950 text-sm font-semibold"
                >
                  &#43;
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
              >
                <ShoppingBag size={16} />
                <span>{addedAnimation ? '✓ Garment Added' : 'Add to Shopping Bag'}</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3.5 border transition-all ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'border-neutral-300 hover:border-neutral-900 text-neutral-700'
                }`}
                style={{
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3 px-6 text-xs font-bold uppercase tracking-widest bg-neutral-950 hover:bg-neutral-800 text-white transition-colors"
              style={{
                borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
              }}
            >
              Instant Buy Now & Checkout
            </button>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
              <MapPin size={14} style={{ color: currentTheme.accentColor }} />
              <span>Check Delivery Speed & Availability</span>
            </div>
            <form onSubmit={checkDelivery} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter postal code / zip"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-white rounded hover:bg-neutral-800"
              >
                Check
              </button>
            </form>
            {deliveryEstimate && (
              <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded mt-2">
                {deliveryEstimate}
              </p>
            )}
          </div>

          {/* Garment Details & Accordion Tabs */}
          <div className="border-t border-neutral-200 pt-4">
            <div className="flex border-b border-neutral-200 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-3 uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-neutral-950 text-neutral-950'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Fabric & Details
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`py-2 px-3 uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'care'
                    ? 'border-neutral-950 text-neutral-950'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Care Guide
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`py-2 px-3 uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'shipping'
                    ? 'border-neutral-950 text-neutral-950'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Shipping & Returns
              </button>
            </div>

            <div className="py-4 text-xs text-neutral-600 leading-relaxed space-y-2">
              {activeTab === 'details' && (
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Fabric composition:</strong> {selectedProduct.fabric}</li>
                  <li><strong>Silhouette:</strong> {selectedProduct.fit} Fit</li>
                  {selectedProduct.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'care' && (
                <ul className="list-disc pl-5 space-y-1">
                  {selectedProduct.careInstructions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p>Complimentary carbon-neutral standard delivery on domestic orders over $150.</p>
                  <p>Express 2-day delivery available at checkout for $15.</p>
                  <p>We provide a prepaid return shipping slip with all domestic shipments. Returns accepted within 30 days of receipt.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews" className="border-t border-neutral-200 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
              Verified Feedback
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950 font-heading">
              Customer Reviews ({productReviews.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsWriteReviewOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 border border-neutral-900 hover:bg-neutral-950 hover:text-white transition-colors self-start"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown & Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 p-6 bg-neutral-50 border border-neutral-200 rounded space-y-4">
            <div className="text-center">
              <span className="text-5xl font-extrabold text-neutral-950 font-heading">
                {selectedProduct.rating}
              </span>
              <div className="flex justify-center text-amber-400 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-1">Based on {selectedProduct.reviewCount} customer ratings</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-12 text-neutral-600">5 Stars</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-amber-400" />
                </div>
                <span className="w-8 text-right font-medium">85%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-neutral-600">4 Stars</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-amber-400" />
                </div>
                <span className="w-8 text-right font-medium">12%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-12 text-neutral-600">3 Stars</span>
                <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="w-[3%] h-full bg-amber-400" />
                </div>
                <span className="w-8 text-right font-medium">3%</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            {productReviews.length > 0 ? (
              productReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 border border-neutral-200 rounded space-y-2 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < rev.rating ? 'currentColor' : 'none'}
                            className={i < rev.rating ? '' : 'text-neutral-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-neutral-900">{rev.title}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{rev.date}</span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>

                  <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-500">
                    <span className="font-semibold text-neutral-900">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <Check size={11} strokeWidth={3} />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-neutral-500 italic p-6 text-center bg-neutral-50 border rounded">
                Be the first to review this atelier garment.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 max-w-lg w-full rounded-lg shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-base font-bold font-heading">Write a Customer Review</h3>
              <button onClick={() => setIsWriteReviewOpen(false)} className="text-neutral-500">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Sarah J."
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReviewRating(r)}
                      className={`p-1 text-lg ${r <= reviewRating ? 'text-amber-400' : 'text-neutral-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Exceptional tailoring and luxurious drape"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Comments</label>
                <textarea
                  rows={4}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Share details about fit, fabric quality, and sizing..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="px-4 py-2 border rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-neutral-950 text-white font-semibold rounded"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 sm:p-8 max-w-2xl w-full rounded-lg shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <h3 className="text-lg font-bold font-heading">AURAQ Size & Measurement Guide</h3>
              <button onClick={() => setIsSizeChartOpen(false)} className="text-neutral-500 hover:text-neutral-900 text-lg">
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-600">
              All measurements are in inches unless specified. Our silhouettes are designed with
              considered ease for fluid movement.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-neutral-200">
                <thead className="bg-neutral-100 text-neutral-800 uppercase font-semibold">
                  <tr>
                    <th className="p-2.5 border">Size</th>
                    <th className="p-2.5 border">US</th>
                    <th className="p-2.5 border">UK / AU</th>
                    <th className="p-2.5 border">EU</th>
                    <th className="p-2.5 border">Bust / Chest</th>
                    <th className="p-2.5 border">Waist</th>
                    <th className="p-2.5 border">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  <tr>
                    <td className="p-2.5 font-bold border">XS</td>
                    <td className="p-2.5 border">0 - 2</td>
                    <td className="p-2.5 border">4 - 6</td>
                    <td className="p-2.5 border">32 - 34</td>
                    <td className="p-2.5 border">32 - 33"</td>
                    <td className="p-2.5 border">24 - 25"</td>
                    <td className="p-2.5 border">34 - 35"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border">S</td>
                    <td className="p-2.5 border">4 - 6</td>
                    <td className="p-2.5 border">8 - 10</td>
                    <td className="p-2.5 border">36 - 38</td>
                    <td className="p-2.5 border">34 - 35"</td>
                    <td className="p-2.5 border">26 - 27"</td>
                    <td className="p-2.5 border">36 - 37"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border">M</td>
                    <td className="p-2.5 border">8 - 10</td>
                    <td className="p-2.5 border">12 - 14</td>
                    <td className="p-2.5 border">40 - 42</td>
                    <td className="p-2.5 border">36 - 38"</td>
                    <td className="p-2.5 border">28 - 30"</td>
                    <td className="p-2.5 border">38 - 40"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border">L</td>
                    <td className="p-2.5 border">12 - 14</td>
                    <td className="p-2.5 border">16 - 18</td>
                    <td className="p-2.5 border">44 - 46</td>
                    <td className="p-2.5 border">39 - 41"</td>
                    <td className="p-2.5 border">31 - 33"</td>
                    <td className="p-2.5 border">41 - 43"</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border">XL</td>
                    <td className="p-2.5 border">16</td>
                    <td className="p-2.5 border">20</td>
                    <td className="p-2.5 border">48</td>
                    <td className="p-2.5 border">42 - 44"</td>
                    <td className="p-2.5 border">34 - 36"</td>
                    <td className="p-2.5 border">44 - 46"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-xs text-neutral-500 space-y-1 bg-neutral-50 p-3 rounded">
              <p><strong>Fit Tip:</strong> If you are between sizes, we recommend sizing down for tailored cuts and sizing up for relaxed or oversized fits.</p>
            </div>
          </div>
        </div>
      )}

      {/* "You May Also Like" Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 pt-12">
          <h2 className="text-xl font-bold uppercase tracking-wider text-neutral-950 font-heading mb-6">
            Complementary Pieces
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
