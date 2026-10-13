import React from 'react';
import { RotateCcw, X } from 'lucide-react';

const TRANSACTION_TYPES = [
  { id: 'all', label: 'All Types' },
  { id: 'exchange', label: 'Exchange / Swap' },
  { id: 'free', label: 'Free Giveaway' },
  { id: 'sale', label: 'For Sale' },
  { id: 'rent', label: 'For Rent' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'textbooks', label: 'Textbooks & Notes' },
  { id: 'electronics', label: 'Electronics & Tech' },
  { id: 'dorm', label: 'Dorm & Living' },
  { id: 'lab', label: 'Lab Gear & Stationery' },
  { id: 'sports', label: 'Bikes & Sports' },
  { id: 'clothing', label: 'Campus Merch & Clothes' },
];

const CONDITIONS = [
  { id: 'all', label: 'Any Condition' },
  { id: 'new', label: 'Brand New' },
  { id: 'like new', label: 'Like New' },
  { id: 'good', label: 'Good' },
  { id: 'fair', label: 'Fair' },
];

export const FilterSidebar = ({
  filters,
  onChange,
  onReset,
  isMobile = false,
  onCloseMobile,
}) => {
  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.condition !== 'all';

  const content = (
    <div className="space-y-6">
      {/* Header for mobile or clear */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="font-semibold text-slate-900 text-base">Filters</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset all
            </button>
          )}
          {isMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Transaction Type Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
          Transaction Type
        </label>
        <div className="space-y-1.5">
          {TRANSACTION_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange({ ...filters, type: t.id })}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                filters.type === t.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{t.label}</span>
              {filters.type === t.id && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
          Category
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange({ ...filters, category: cat.id })}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.id && (
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
          Item Condition
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {CONDITIONS.map((cond) => (
            <button
              key={cond.id}
              onClick={() => onChange({ ...filters, condition: cond.id })}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
                filters.condition === cond.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end">
        <div className="w-full max-w-xs bg-white h-full p-5 shadow-2xl overflow-y-auto">
          {content}
          <div className="mt-8 pt-4 border-t border-slate-200">
            <button
              onClick={onCloseMobile}
              className="w-full py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-xl shadow-xs hover:bg-emerald-700 transition-colors"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 shrink-0 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-subtle self-start sticky top-24">
      {content}
    </aside>
  );
};

export default FilterSidebar;
