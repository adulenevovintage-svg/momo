import React from 'react';
import { Flame, Sparkles, Leaf, ArrowUpDown } from 'lucide-react';

export type FilterTag = 'all' | 'signature' | 'popular' | 'spicy' | 'veg';
export type SortOption = 'default' | 'price-asc' | 'price-desc';

interface FilterBarProps {
  activeFilter: FilterTag;
  onSelectFilter: (filter: FilterTag) => void;
  activeSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onSelectFilter,
  activeSort,
  onSelectSort,
  filteredCount,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-neutral-800/80 text-xs">
      
      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => onSelectFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-colors shrink-0 ${
            activeFilter === 'all'
              ? 'bg-neutral-100 text-black'
              : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          All ({filteredCount})
        </button>

        <button
          onClick={() => onSelectFilter('signature')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors shrink-0 ${
            activeFilter === 'signature'
              ? 'bg-amber-500 text-black'
              : 'bg-neutral-900 text-amber-400/90 hover:text-amber-300 border border-neutral-800'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          Signatures
        </button>

        <button
          onClick={() => onSelectFilter('popular')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors shrink-0 ${
            activeFilter === 'popular'
              ? 'bg-orange-600 text-white'
              : 'bg-neutral-900 text-orange-400 hover:text-orange-300 border border-neutral-800'
          }`}
        >
          <Flame className="w-3 h-3" />
          Popular
        </button>

        <button
          onClick={() => onSelectFilter('spicy')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors shrink-0 ${
            activeFilter === 'spicy'
              ? 'bg-red-700 text-white'
              : 'bg-neutral-900 text-red-400 hover:text-red-300 border border-neutral-800'
          }`}
        >
          🌶️ Spicy
        </button>

        <button
          onClick={() => onSelectFilter('veg')}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold transition-colors shrink-0 ${
            activeFilter === 'veg'
              ? 'bg-emerald-600 text-white'
              : 'bg-neutral-900 text-emerald-400 hover:text-emerald-300 border border-neutral-800'
          }`}
        >
          <Leaf className="w-3 h-3" />
          Vegetarian
        </button>
      </div>

      {/* Sort selector */}
      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
        <span className="text-neutral-500 font-medium">Sort:</span>
        <select
          value={activeSort}
          onChange={(e) => onSelectSort(e.target.value as SortOption)}
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
        >
          <option value="default">Featured / Traditional</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

    </div>
  );
};
