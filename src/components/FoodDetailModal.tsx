import React, { useState } from 'react';
import { X, Flame, Sparkles, Plus, Minus, Check, Leaf, ShoppingBag } from 'lucide-react';
import { MenuItem } from '../types';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, spiceLevel: 'Mild' | 'Medium' | 'Pilipili Kali (Hot)', notes: string) => void;
  initialQuantity?: number;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  initialQuantity = 1,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Pilipili Kali (Hot)'>('Medium');
  const [notes, setNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const totalPrice = item.price * quantity;
  const totalPriceFormatted = `${totalPrice.toLocaleString()}/= TZS`;

  const handleAdd = () => {
    onAddToCart(item, quantity, spiceLevel, notes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col bg-[#121316] border-t sm:border border-neutral-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(92vh-80px)]">
          {/* Hero Dish Image */}
          <div className="relative aspect-[16/10] w-full bg-black">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {item.isSignature && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500 text-black text-xs font-black shadow-md uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  Mamboz Signature
                </span>
              )}
              {item.isPopular && !item.isSignature && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-orange-600 text-white text-xs font-bold shadow-md uppercase">
                  <Flame className="w-3.5 h-3.5 text-white" />
                  Popular
                </span>
              )}
              {item.isVeg && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-800 text-emerald-100 text-xs font-bold shadow-md">
                  <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                  Vegetarian
                </span>
              )}
            </div>

            {/* Price Pill */}
            <div className="absolute bottom-3 right-3 z-10">
              <div className="px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-amber-500/50 shadow-lg">
                <span className="text-lg font-extrabold text-amber-400 font-display">
                  {item.priceFormatted}
                </span>
                <span className="text-xs font-bold text-neutral-300 ml-1">
                  TZS
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display uppercase tracking-tight">
                {item.name}
              </h2>
              {item.portionSize && (
                <span className="inline-block text-xs font-semibold text-amber-400/90 mt-1">
                  Portion: {item.portionSize}
                </span>
              )}
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Key Ingredients */}
            <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Verified Ingredients & Preparation:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-700/80"
                  >
                    • {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Spice Level Selection (if applicable to savory items) */}
            {item.category !== 'desserts' && item.category !== 'drinks-shakes' && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                  Select Spice Level:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mild', 'Medium', 'Pilipili Kali (Hot)'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSpiceLevel(level)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-colors ${
                        spiceLevel === level
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
                Special Requests (Optional):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Extra kachumbari, well done, tamarind sauce separate"
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Quantity:
              </span>
              <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-extrabold w-6 text-center font-display">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Modal Bottom Action Bar */}
        <div className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">
              Total ({quantity} {quantity === 1 ? 'item' : 'items'})
            </div>
            <div className="text-lg font-extrabold text-amber-400 font-display">
              {totalPriceFormatted}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>ADD TO ORDER</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
