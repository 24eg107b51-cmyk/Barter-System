import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search books, electronics, lab coats...',
  className = '',
  size = 'md',
  autoFocus = false,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  const sizeClasses = {
    sm: 'py-2 pl-9 pr-8 text-sm',
    md: 'py-2.5 pl-10 pr-9 text-sm',
    lg: 'py-3.5 pl-11 pr-10 text-base',
  };

  const iconSizes = {
    sm: 'w-4 h-4 left-3',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search
        className={`absolute text-slate-400 pointer-events-none ${iconSizes[size]}`}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-white border border-slate-200/90 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all shadow-2xs ${sizeClasses[size]}`}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
