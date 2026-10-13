import React from 'react';
import {
  LayoutGrid,
  BookOpen,
  Laptop,
  Home,
  FlaskConical,
  Bike,
  Shirt,
} from 'lucide-react';

const CATEGORY_ITEMS = [
  { id: 'all', name: 'All Categories', icon: LayoutGrid },
  { id: 'textbooks', name: 'Textbooks & Notes', icon: BookOpen },
  { id: 'electronics', name: 'Electronics & Tech', icon: Laptop },
  { id: 'dorm', name: 'Dorm & Living', icon: Home },
  { id: 'lab', name: 'Lab Gear & Stationery', icon: FlaskConical },
  { id: 'sports', name: 'Bikes & Sports', icon: Bike },
  { id: 'clothing', name: 'Campus Merch & Clothes', icon: Shirt },
];

export const CategoryChips = ({ selectedCategory = 'all', onSelectCategory, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 ${className}`}>
      {CATEGORY_ITEMS.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
