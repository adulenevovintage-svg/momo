import React, { useRef, useEffect } from 'react';
import {
  Flame,
  Layers,
  UtensilsCrossed,
  Drumstick,
  Beef,
  Sparkles,
  FlameKindling,
  Fish,
  Soup,
  Pizza,
  Cookie,
  Salad,
  Sandwich,
  IceCream,
  Coffee,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { MenuCategoryId } from '../types';

interface CategoryNavProps {
  activeCategory: MenuCategoryId | 'all';
  onSelectCategory: (id: MenuCategoryId | 'all') => void;
  categoryCounts: Record<string, number>;
}

// Map category icon name to Lucide component
const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Layers,
  UtensilsCrossed,
  Drumstick,
  Beef,
  Sparkles,
  FlameKindling,
  Fish,
  Soup,
  Pizza,
  Cookie,
  Salad,
  Sandwich,
  IceCream,
  Coffee,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active item into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2.5">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
        >
          {/* "ALL DISHES" Pill */}
          <button
            data-active={activeCategory === 'all'}
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <span>All Dishes</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                activeCategory === 'all'
                  ? 'bg-black/20 text-black'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {Object.values(categoryCounts).reduce((a: number, b: number) => a + b, 0)}
            </span>
          </button>

          {/* Individual Category Pills */}
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Flame;
            const count = categoryCounts[cat.id] || 0;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                data-active={isActive}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 scale-[1.02]'
                    : 'bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
                }`}
              >
                <IconComponent
                  className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-black' : 'text-amber-500'
                  }`}
                />
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-black/20 text-black'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
