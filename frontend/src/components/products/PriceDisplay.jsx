import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export const PriceDisplay = ({ product, size = 'md', className = '' }) => {
  if (!product) return null;

  const { transactionType, price, rentalRate } = product;

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl font-bold',
  };

  if (transactionType === 'free') {
    return (
      <span className={`text-emerald-600 font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
        Free
      </span>
    );
  }

  if (transactionType === 'rent') {
    return (
      <div className={`flex items-baseline gap-1 text-slate-900 ${className}`}>
        <span className={`${sizeClasses[size]} font-bold text-amber-700`}>
          {formatCurrency(rentalRate || 0)}
        </span>
        <span className="text-xs text-slate-500 font-medium">/ day</span>
      </div>
    );
  }

  if (transactionType === 'exchange') {
    return (
      <span className={`text-slate-700 font-medium ${size === 'lg' || size === 'xl' ? 'text-base font-semibold' : 'text-xs'} ${className}`}>
        {size === 'sm' || size === 'md' ? 'Trade / Swap' : 'Open to Exchange'}
      </span>
    );
  }

  // sale
  return (
    <span className={`text-navy-900 font-bold tracking-tight ${sizeClasses[size]} ${className}`}>
      {formatCurrency(price || 0)}
    </span>
  );
};

export default PriceDisplay;
