import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const FABRICS = ['Wool', 'Linen', 'Cotton', 'Silk', 'Cashmere', 'Denim', 'Tencel'];
const FITS = ['Relaxed', 'Slim', 'Oversized', 'Regular', 'Tailored'];

export const ProductListingPage: React.FC = () => {
  const {
    currentTheme,
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  // Filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter application
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Price filter
      if (p.price > maxPrice) return false;

      // In stock
      if (inStockOnly && (!p.inStock || p.stockCount <= 0)) return false;

      // On sale
      if (onSaleOnly && (!p.discountPercent || p.discountPercent <= 0)) return false;

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Fabrics
      if (selectedFabrics.length > 0) {
        const hasFabric = selectedFabrics.some((f) =>
          p.fabric.toLowerCase().includes(f.toLowerCase())
        );
        if (!hasFabric) return false;
      }

      // Fits
      if (selectedFits.length > 0 && !selectedFits.includes(p.fit)) {
        return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    maxPrice,
    inStockOnly,
    onSaleOnly,
    selectedSizes,
    selectedFabrics,
    selectedFits,
  ]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'price-low':
        return list.sort((a, b) => a.price - b.price);
      case 'price-high':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return list.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const toggleFit = (fit: string) => {
    setSelectedFits((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedFabrics([]);
    setSelectedFits([]);
    setMaxPrice(300);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedSizes.length > 0 ||
    selectedFabrics.length > 0 ||
    selectedFits.length > 0 ||
    maxPrice < 300 ||
    inStockOnly ||
    onSaleOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Header & Breadcrumb */}
      <div className="mb-8">
        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
          <span>AURAQ Collection</span>
          <span className="mx-2">&bull;</span>
          <span className="text-neutral-900 font-semibold">{selectedCategory}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 font-heading">
              {selectedCategory === 'All' ? 'All Clothing & Atelier' : `${selectedCategory} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
              Honest natural textiles, clean tailoring, and architectural proportions designed to
              elevate everyday living.
            </p>
          </div>

          {/* Category Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {(['All', 'Women', 'Men', 'Unisex', 'Accessories'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                }`}
                style={{
                  borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '4px',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Controls Bar (Filter toggle, Sort, Grid mode, Result count) */}
      <div className="border-y border-neutral-200 py-3 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded border border-neutral-300"
          >
            <SlidersHorizontal size={14} />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          <span className="text-xs text-neutral-600 font-medium">
            Showing <strong className="text-neutral-950">{sortedProducts.length}</strong> pieces
          </span>

          {searchQuery && (
            <span className="text-xs bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded flex items-center gap-1">
              <span>"{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="text-neutral-500 hover:text-neutral-900">
                <X size={12} />
              </button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-neutral-50 border border-neutral-300 hover:border-neutral-400 text-neutral-900 py-1.5 pl-3 pr-8 rounded text-xs font-semibold outline-none cursor-pointer"
              >
                <option value="featured">Curated (Featured)</option>
                <option value="newest">Newest Releases</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Desktop Grid Columns Toggle */}
          <div className="hidden sm:flex items-center gap-1 border-l border-neutral-200 pl-4">
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 rounded transition-colors ${
                gridColumns === 3 ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-900'
              }`}
              title="3 column view"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 rounded transition-colors ${
                gridColumns === 4 ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-neutral-900'
              }`}
              title="4 column view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar Filters and Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 pr-4 border-r border-neutral-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-950 font-heading">
              Refine Selection
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-neutral-500 hover:text-neutral-950 font-medium flex items-center gap-1 underline"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Quick Toggles: Sale & In Stock */}
          <div className="space-y-2.5 pb-4 border-b border-neutral-100">
            <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <span>In-stock only</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <span>Promotional / On Sale</span>
            </label>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pb-5 border-b border-neutral-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900">Max Price</span>
              <span className="font-bold text-neutral-950">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>$50</span>
              <span>$150</span>
              <span>$300+</span>
            </div>
          </div>

          {/* Sizes Filter */}
          <div className="space-y-2.5 pb-5 border-b border-neutral-100">
            <span className="text-xs font-semibold text-neutral-900 block">Size</span>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-2.5 py-1 text-xs font-semibold border transition-colors ${
                      isSelected
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fabrics Filter */}
          <div className="space-y-2.5 pb-5 border-b border-neutral-100">
            <span className="text-xs font-semibold text-neutral-900 block">Fabric & Fiber</span>
            <div className="space-y-1.5">
              {FABRICS.map((fabric) => {
                const isSelected = selectedFabrics.includes(fabric);
                return (
                  <label
                    key={fabric}
                    className="flex items-center gap-2 text-xs text-neutral-700 hover:text-neutral-950 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFabric(fabric)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <span>{fabric}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Fit Silhouette */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-neutral-900 block">Fit Silhouette</span>
            <div className="space-y-1.5">
              {FITS.map((fit) => {
                const isSelected = selectedFits.includes(fit);
                return (
                  <label
                    key={fit}
                    className="flex items-center gap-2 text-xs text-neutral-700 hover:text-neutral-950 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleFit(fit)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                    />
                    <span>{fit} Fit</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-9">
          {sortedProducts.length > 0 ? (
            <div
              className={`grid grid-cols-2 ${
                gridColumns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'
              } gap-4 sm:gap-6`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-neutral-50 border border-neutral-200 rounded-lg space-y-4">
              <Sparkles size={32} className="mx-auto text-neutral-400" />
              <h3 className="text-lg font-bold text-neutral-900 font-heading">
                No matching garments found
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try expanding your filters, adjusting the price threshold, or clearing size selections.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="text-base font-bold font-heading">Filter Clothing</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* Sizes */}
              <div className="py-4 border-b border-neutral-100 space-y-2">
                <span className="text-xs font-semibold uppercase">Sizes</span>
                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 text-xs font-semibold border ${
                        selectedSizes.includes(size)
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'bg-white text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabrics */}
              <div className="py-4 border-b border-neutral-100 space-y-2">
                <span className="text-xs font-semibold uppercase">Fabrics</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {FABRICS.map((fabric) => (
                    <label key={fabric} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFabrics.includes(fabric)}
                        onChange={() => toggleFabric(fabric)}
                      />
                      <span>{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="py-4 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Max Price</span>
                  <span>${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={300}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-2.5 text-xs font-semibold uppercase tracking-wider bg-neutral-100 text-neutral-800 rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-semibold uppercase tracking-wider bg-neutral-950 text-white rounded"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
