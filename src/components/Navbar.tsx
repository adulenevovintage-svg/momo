import React from 'react';
import { ShoppingBag, MapPin, Phone, Search, ChevronDown } from 'lucide-react';
import { Branch } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

interface NavbarProps {
  selectedBranch: Branch;
  onOpenBranchModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onScrollToBranches: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedBranch,
  onOpenBranchModal,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onScrollToBranches,
}) => {
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-amber-500/30 bg-black/40 shadow-inner flex items-center justify-center">
                <img
                  src={RESTAURANT_INFO.logoUrl}
                  alt="Mamboz Corner BBQ Logo"
                  className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to text initials if image network fails
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-white font-display uppercase leading-tight">
                  MAMBOZ <span className="text-amber-500">CORNER BBQ</span>
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-medium tracking-wide flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Dar es Salaam • Open Daily
                </span>
              </div>
            </a>
          </div>

          {/* Branch Selector Pill (Desktop & Tablet) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenBranchModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/70 text-xs text-neutral-200 transition-colors"
              title="Click to switch Mamboz branch"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-neutral-400 font-semibold uppercase">Branch</div>
                <div className="font-semibold text-neutral-100 flex items-center gap-1">
                  {selectedBranch.area}
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </div>
              </div>
            </button>
          </div>

          {/* Search bar on desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Sekela, Mishkaki, Biryani..."
                className="w-full pl-9 pr-3 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/60 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Branch Quick Select */}
            <button
              onClick={onOpenBranchModal}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-amber-400"
            >
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>{selectedBranch.area}</span>
            </button>

            {/* Direct Call Branch */}
            <a
              href={`tel:${selectedBranch.primaryPhone}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 border border-neutral-800 transition-colors"
              title={`Call ${selectedBranch.name}`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden xl:inline">Call Branch</span>
            </a>

            {/* Order Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
              id="cart-trigger-btn"
            >
              <ShoppingBag className="w-4 h-4 text-black shrink-0" />
              <span className="font-extrabold">Order</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-black bg-black text-amber-400 rounded-full border border-amber-400/40">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Input */}
        {showMobileSearch && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search food, drinks, ingredients..."
                autoFocus
                className="w-full pl-9 pr-8 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
