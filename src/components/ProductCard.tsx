import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currentTheme, viewProductDetails, toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState(product.sizes[0]);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedQuickSize, product.colors[0]?.name || 'Standard', 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowQuickAdd(false);
    }, 1200);
  };

  return (
    <div
      onClick={() => viewProductDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
      className={`group relative flex flex-col bg-white border cursor-pointer transition-all duration-300 overflow-hidden ${
        currentTheme.borderStyle
      } hover:shadow-lg`}
      style={{
        borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '12px',
      }}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        <img
          src={displayImage}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent && product.discountPercent > 0 && (
            <span
              className="px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm"
              style={{
                backgroundColor: currentTheme.accentColor,
                borderRadius: currentTheme.cardRadius === 'rounded-none' ? '0px' : '4px',
              }}
            >
              -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-neutral-900 text-white uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/95 text-neutral-900 border border-neutral-200 uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 text-neutral-600 hover:text-neutral-950 hover:bg-white shadow-sm'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-200 flex items-center justify-center ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {showQuickAdd ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-white p-2.5 shadow-xl space-y-2 border border-neutral-200"
              style={{
                borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '6px',
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600">
                <span>Select Size:</span>
                <span className="text-neutral-900 font-semibold">{selectedQuickSize}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedQuickSize(sz)}
                    className={`px-2 py-1 text-[10px] font-semibold transition-colors border ${
                      selectedQuickSize === sz
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-full py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-opacity"
                style={{
                  backgroundColor: currentTheme.accentColor,
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
              >
                {justAdded ? '✓ Added to Bag' : 'Confirm & Add'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickAdd(true);
                }}
                className="flex-1 py-2 px-3 bg-white/95 text-neutral-950 hover:bg-white text-xs font-semibold tracking-wider uppercase shadow-md flex items-center justify-center gap-1.5 transition-all"
                style={{
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
              >
                <ShoppingBag size={13} />
                <span>Quick Add</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  viewProductDetails(product);
                }}
                className="p-2 bg-neutral-900/90 text-white hover:bg-neutral-900 shadow-md transition-all"
                style={{
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
                title="View details"
              >
                <Eye size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-wider font-medium">
            <span>{product.brand}</span>
            <div className="flex items-center gap-1 text-neutral-700 font-semibold">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-1 mt-1 font-heading">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1">{product.fabric}</p>
        </div>

        {/* Color Palette Indicators & Pricing */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                title={col.name}
                className="w-2.5 h-2.5 rounded-full border border-black/15"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-neutral-400 font-medium">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1.5">
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-neutral-950">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
