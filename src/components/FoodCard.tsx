import React from 'react';
import { Flame, Sparkles, Plus, Check, Leaf } from 'lucide-react';
import { MenuItem } from '../types';

interface FoodCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  cartQuantity: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onSelectItem,
  onQuickAdd,
  cartQuantity,
}) => {
  return (
    <article
      onClick={() => onSelectItem(item)}
      className="group relative flex flex-col justify-between bg-neutral-900/90 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
      id={`dish-${item.id}`}
    >
      {/* Top Image Container with Badges */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 pointer-events-none" />

          {/* Badges in top-left */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            {item.isSignature && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-black text-[11px] font-extrabold shadow-md tracking-tight uppercase">
                <Sparkles className="w-3 h-3 text-black" />
                Mamboz Signature
              </span>
            )}
            {item.isPopular && !item.isSignature && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-600 text-white text-[11px] font-bold shadow-md tracking-tight uppercase">
                <Flame className="w-3 h-3 text-white" />
                Best Seller
              </span>
            )}
            {item.isSpicy && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-950/90 border border-red-700 text-red-300 text-[10px] font-bold tracking-tight">
                🌶️ Spicy
              </span>
            )}
            {item.isVeg && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-[10px] font-bold tracking-tight">
                <Leaf className="w-3 h-3 text-emerald-400" />
                Veg
              </span>
            )}
          </div>

          {/* Price Tag in top-right with high contrast */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <div className="px-2.5 py-1 rounded-xl bg-black/90 backdrop-blur-md border border-amber-500/40 text-right shadow-md">
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-tight font-display">
                {item.priceFormatted}
              </span>
              <span className="block text-[9px] font-bold text-neutral-400 -mt-0.5">
                TZS
              </span>
            </div>
          </div>

          {/* Optional Portion Size badge bottom left */}
          {item.portionSize && (
            <div className="absolute bottom-2 left-2.5 z-10">
              <span className="text-[10px] font-semibold text-neutral-300 bg-neutral-900/80 backdrop-blur-sm px-2 py-0.5 rounded-md border border-neutral-700">
                {item.portionSize}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-4">
          {/* EXACT Dish Name */}
          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors tracking-tight font-display">
            {item.name}
          </h3>

          {/* Short Appetizing Description */}
          <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* 2-5 Key Ingredients */}
          <div className="mt-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              Key Ingredients:
            </div>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.map((ingredient, idx) => (
                <span
                  key={idx}
                  className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60 font-medium"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer with Price and Order Button */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 flex items-center justify-between border-t border-neutral-800/80 mt-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
            Price
          </span>
          <span className="text-base sm:text-lg font-extrabold text-amber-400 font-display">
            {item.priceFormatted} <span className="text-xs text-neutral-400 font-sans">TZS</span>
          </span>
        </div>

        {/* ORDER NOW button */}
        <button
          type="button"
          onClick={(e) => onQuickAdd(item, e)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md ${
            cartQuantity > 0
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/30'
              : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
          }`}
          title={`Order ${item.name}`}
        >
          {cartQuantity > 0 ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Added ({cartQuantity})</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>ORDER NOW</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
