import React, { useState, useMemo, useEffect } from 'react';
import {
  Flame,
  Search,
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  Utensils,
} from 'lucide-react';
import { MenuItem, MenuCategoryId, CartItem, Branch, OrderType, OrderCheckoutData } from './types';
import { BRANCHES } from './data/branches';
import { CATEGORIES } from './data/categories';
import { MENU_ITEMS } from './data/menuData';
import { RESTAURANT_INFO } from './data/restaurantInfo';

// Modular Components
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { FoodCard } from './components/FoodCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BranchesModal } from './components/BranchesModal';
import { BranchesSection } from './components/BranchesSection';
import { FilterBar, FilterTag, SortOption } from './components/FilterBar';
import { Footer } from './components/Footer';

export default function App() {
  // Branch State
  const [selectedBranch, setSelectedBranch] = useState<Branch>(() => {
    const saved = localStorage.getItem('mamboz_selected_branch');
    if (saved) {
      const found = BRANCHES.find((b) => b.id === saved);
      if (found) return found;
    }
    return BRANCHES[0]; // Kisutu Flagship
  });

  useEffect(() => {
    localStorage.setItem('mamboz_selected_branch', selectedBranch.id);
  }, [selectedBranch]);

  // Menu Navigation & Search States
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTag>('all');
  const [activeSort, setActiveSort] = useState<SortOption>('default');

  // Modal / Drawer States
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('takeaway');

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('mamboz_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mamboz_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart total items count
  const cartTotalQuantity = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  }, [cart]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Tag filter
      if (activeFilter === 'signature' && !item.isSignature) return false;
      if (activeFilter === 'popular' && !item.isPopular) return false;
      if (activeFilter === 'spicy' && !item.isSpicy) return false;
      if (activeFilter === 'veg' && !item.isVeg) return false;

      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredient = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIngredient;
      }

      return true;
    }).sort((a, b) => {
      if (activeSort === 'price-asc') return a.price - b.price;
      if (activeSort === 'price-desc') return b.price - a.price;
      // Default: signature first, then popular, then original order
      if (a.isSignature && !b.isSignature) return -1;
      if (!a.isSignature && b.isSignature) return 1;
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });
  }, [activeCategory, activeFilter, searchQuery, activeSort]);

  // Cart Operations
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    spiceLevel?: 'Mild' | 'Medium' | 'Pilipili Kali (Hot)',
    notes?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          spiceLevel: spiceLevel || updated[existingIndex].spiceLevel,
          notes: notes !== undefined ? notes : updated[existingIndex].notes,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            item,
            quantity,
            spiceLevel: spiceLevel || 'Medium',
            notes: notes || '',
          },
        ];
      }
    });
  };

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(item, 1);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Scroll to menu section
  const handleScrollToMenu = () => {
    const menuEl = document.getElementById('menu-showcase');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToBranches = () => {
    const contactEl = document.getElementById('contact-branches');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#f4f4f5] flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Top Banner: Authentic Mamboz BBQ Dar es Salaam Notice */}
      <div className="bg-gradient-to-r from-red-950 via-neutral-900 to-amber-950 border-b border-amber-500/20 text-center py-1 px-3 text-[11px] sm:text-xs font-semibold text-amber-300 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span>Official Digital Menu for Mamboz Corner BBQ • Dar es Salaam, Tanzania • All Prices in TZS</span>
        <button
          onClick={handleScrollToBranches}
          className="hidden sm:inline-block text-white hover:text-amber-200 underline underline-offset-2 ml-2"
        >
          View 4 Branches
        </button>
      </div>

      {/* Primary Navigation Bar */}
      <Navbar
        selectedBranch={selectedBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        cartCount={cartTotalQuantity}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToBranches={handleScrollToBranches}
      />

      {/* Hero BBQ Section */}
      <HeroBanner
        selectedBranch={selectedBranch}
        onOpenBranchesModal={() => setIsBranchModalOpen(true)}
        onScrollToMenu={handleScrollToMenu}
      />

      {/* Sticky Categories Navigation Bar */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          handleScrollToMenu();
        }}
        categoryCounts={categoryCounts}
      />

      {/* Main Menu Grid Area */}
      <main id="menu-showcase" className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        
        {/* Category Header & Filter Toolbar */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
                <span>
                  {activeCategory === 'all'
                    ? 'Full Digital Menu'
                    : CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </span>
                <span className="text-xs sm:text-sm font-bold text-amber-500 font-sans">
                  ({filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'})
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                {activeCategory === 'all'
                  ? 'All authentic dishes prepared fresh over lump charcoal and clay tandoor in Dar es Salaam'
                  : CATEGORIES.find((c) => c.id === activeCategory)?.description}
              </p>
            </div>

            {searchQuery && (
              <div className="text-xs text-amber-400 font-medium">
                Filtering by &ldquo;{searchQuery}&rdquo; •{' '}
                <button
                  onClick={() => setSearchQuery('')}
                  className="underline hover:text-white"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Filter & Sort Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
            activeSort={activeSort}
            onSelectSort={setActiveSort}
            filteredCount={filteredItems.length}
          />
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 bg-neutral-900/40 rounded-3xl border border-neutral-800">
            <Utensils className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white font-display uppercase">
              No dishes found matching your criteria
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              Try changing your search term, removing dietary filters, or selecting &ldquo;All Dishes&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold shadow-md hover:bg-amber-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => {
              const inCart = cart.find((ci) => ci.item.id === item.id);
              return (
                <FoodCard
                  key={item.id}
                  item={item}
                  onSelectItem={setSelectedItemForDetail}
                  onQuickAdd={handleQuickAdd}
                  cartQuantity={inCart ? inCart.quantity : 0}
                />
              );
            })}
          </div>
        )}

      </main>

      {/* Verified Branches & Contact Section */}
      <BranchesSection
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
      />

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Cart Bar (when items in cart and drawer closed) */}
      {cartTotalQuantity > 0 && !isCartOpen && !isCheckoutOpen && (
        <aside aria-label="Order summary" className="fixed bottom-3 inset-x-3 sm:bottom-5 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in slide-in-from-bottom duration-300">
          <div
            onClick={() => setIsCartOpen(true)}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-2xl shadow-black/80 flex items-center justify-between cursor-pointer border border-amber-300/40 hover:scale-[1.02] active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-amber-400 flex items-center justify-center font-black text-sm">
                {cartTotalQuantity}
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-black/80">
                  {selectedBranch.area} • Order Total
                </div>
                <div className="text-base font-black font-display leading-tight">
                  {cartSubtotal.toLocaleString()}/= TZS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 font-extrabold text-xs tracking-wide bg-black text-amber-400 px-3.5 py-2 rounded-xl shadow-md">
              <span>VIEW ORDER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </aside>
      )}

      {/* Item Detail Modal */}
      <FoodDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onAddToCart={handleAddToCart}
        initialQuantity={
          selectedItemForDetail
            ? cart.find((c) => c.item.id === selectedItemForDetail.id)?.quantity || 1
            : 1
        }
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedBranch={selectedBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        orderType={orderType}
        onSelectOrderType={setOrderType}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal with M-Pesa & Payment Simulation */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        selectedBranch={selectedBranch}
        orderType={orderType}
        onOrderSuccess={(orderData) => {
          // Clear cart upon successful order
          setCart([]);
        }}
      />

      {/* Branch Switcher Modal */}
      <BranchesModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
      />

    </div>
  );
}
