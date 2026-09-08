import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Palette,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentTheme,
    setIsDesignModalOpen,
    activePage,
    setActivePage,
    cartCount,
    wishlist,
    setSelectedCategory,
    products,
    viewProductDetails,
    searchQuery,
    setSearchQuery,
    userProfile,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search filtering
  const matchingProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setActivePage('shop');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-colors">
      {/* Top Announcement Bar + Design Switcher Ticker */}
      <div className="bg-neutral-900 text-neutral-200 text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="hidden sm:flex items-center gap-2 text-neutral-400">
            <ShieldCheck size={13} className="text-neutral-300" />
            <span>Complimentary worldwide shipping on orders over $150</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-2 text-center">
            <span className="font-medium text-white">SPRING ATELIER:</span>
            <span className="text-neutral-300">Use code</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white tracking-wider"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              AURAQ15
            </span>
            <span className="hidden md:inline text-neutral-400">for 15% off</span>
          </div>

          {/* Interactive Design System Selector Pill */}
          <button
            onClick={() => setIsDesignModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-[11px] font-medium transition-all shadow-sm border border-neutral-700 hover:border-neutral-500"
            title="Choose or preview design system theme"
          >
            <Palette size={12} style={{ color: currentTheme.accentColor }} />
            <span className="hidden lg:inline text-neutral-300">Design:</span>
            <span className="font-semibold">{currentTheme.name.split(' ')[0]}</span>
            <span className="text-[10px] text-neutral-400 underline ml-0.5">Change</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              onClick={() => {
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group focus:outline-none"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.2em] uppercase text-neutral-950 block font-heading group-hover:opacity-90 transition-opacity">
                AURAQ
              </span>
              <span className="text-[9px] tracking-[0.35em] text-neutral-400 uppercase block -mt-1 font-body">
                Atelier &bull; Clothing
              </span>
            </button>
          </div>

          {/* Desktop Categories Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => handleCategoryClick('Women')}
              className="text-neutral-700 hover:text-neutral-950 transition-colors py-2 relative group"
            >
              Women
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: currentTheme.accentColor }}
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Men')}
              className="text-neutral-700 hover:text-neutral-950 transition-colors py-2 relative group"
            >
              Men
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: currentTheme.accentColor }}
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Unisex')}
              className="text-neutral-700 hover:text-neutral-950 transition-colors py-2 relative group"
            >
              Unisex
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: currentTheme.accentColor }}
              />
            </button>

            <button
              onClick={() => handleCategoryClick('Accessories')}
              className="text-neutral-700 hover:text-neutral-950 transition-colors py-2 relative group"
            >
              Accessories
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: currentTheme.accentColor }}
              />
            </button>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setActivePage('shop');
              }}
              className="text-neutral-700 hover:text-neutral-950 transition-colors py-2 relative group"
            >
              All Collections
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-950 transition-all duration-200 group-hover:w-full"
                style={{ backgroundColor: currentTheme.accentColor }}
              />
            </button>

            <button
              onClick={() => setActivePage('admin')}
              className="text-xs px-2.5 py-1 rounded bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors uppercase tracking-wider font-semibold"
            >
              Back-office
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Live Autocomplete Search Bar */}
            <div ref={searchRef} className="relative hidden sm:block w-48 md:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search clothing, fabrics..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchDropdownOpen(true);
                  }}
                  onFocus={() => setSearchDropdownOpen(true)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-100 border border-transparent focus:border-neutral-400 focus:bg-white text-neutral-900 placeholder-neutral-500 rounded-full transition-all outline-none"
                />
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {searchDropdownOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-neutral-200 shadow-xl rounded-lg overflow-hidden z-50 p-2">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
                    Matching Pieces ({matchingProducts.length})
                  </div>

                  {matchingProducts.length > 0 ? (
                    <div className="divide-y divide-neutral-100">
                      {matchingProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            viewProductDetails(p);
                            setSearchDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-neutral-50 cursor-pointer rounded transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-12 object-cover rounded bg-neutral-100"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-medium text-neutral-900 truncate">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-neutral-500">{p.fabric}</p>
                          </div>
                          <span className="text-xs font-semibold text-neutral-900">
                            ${p.price}
                          </span>
                        </div>
                      ))}

                      <div
                        onClick={() => {
                          setActivePage('shop');
                          setSearchDropdownOpen(false);
                        }}
                        className="p-2 text-center text-xs font-semibold text-neutral-700 hover:text-neutral-950 cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>View all search results</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-neutral-500">
                      No matching products found for "{searchQuery}".
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="sm:hidden p-2 text-neutral-700 hover:text-neutral-950"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => setActivePage('wishlist')}
              className="p-2 text-neutral-700 hover:text-neutral-950 relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span
                  className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentTheme.accentColor }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              onClick={() => setActivePage('account')}
              className="p-2 text-neutral-700 hover:text-neutral-950 relative group"
              aria-label="Account"
            >
              <User size={20} />
              <span className="sr-only">Account</span>
            </button>

            {/* Shopping Bag / Cart Button */}
            <button
              onClick={() => setActivePage('cart')}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-950 text-white rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
              style={{
                borderRadius: currentTheme.buttonRadius === 'rounded-none' ? '0px' : '9999px',
              }}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <span className="text-xs font-semibold">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Expanded */}
        {isSearchOpen && (
          <div className="sm:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clothing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-900"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Navigation
            </span>
            <button
              onClick={() => {
                setIsDesignModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-neutral-900 flex items-center gap-1 font-medium underline"
            >
              <Palette size={12} style={{ color: currentTheme.accentColor }} />
              Theme: {currentTheme.name}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleCategoryClick('Women')}
              className="text-left p-2.5 rounded bg-neutral-50 hover:bg-neutral-100 text-neutral-900"
            >
              Women's Apparel
            </button>
            <button
              onClick={() => handleCategoryClick('Men')}
              className="text-left p-2.5 rounded bg-neutral-50 hover:bg-neutral-100 text-neutral-900"
            >
              Men's Apparel
            </button>
            <button
              onClick={() => handleCategoryClick('Unisex')}
              className="text-left p-2.5 rounded bg-neutral-50 hover:bg-neutral-100 text-neutral-900"
            >
              Unisex Outwear
            </button>
            <button
              onClick={() => handleCategoryClick('Accessories')}
              className="text-left p-2.5 rounded bg-neutral-50 hover:bg-neutral-100 text-neutral-900"
            >
              Leather & Knits
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex flex-col space-y-2 text-sm">
            <button
              onClick={() => {
                setActivePage('account');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-neutral-700 hover:text-neutral-950 py-1"
            >
              My Account & Order History
            </button>
            <button
              onClick={() => {
                setActivePage('wishlist');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-neutral-700 hover:text-neutral-950 py-1"
            >
              Saved Wishlist ({wishlist.length})
            </button>
            <button
              onClick={() => {
                setActivePage('admin');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-semibold text-neutral-900 py-1"
            >
              Admin Back-office Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
