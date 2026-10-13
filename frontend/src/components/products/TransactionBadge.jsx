import React from 'react';
import { getTransactionLabel, getTransactionTheme } from '../../utils/formatters';
import { ArrowLeftRight, Gift, ShoppingBag, Clock } from 'lucide-react';

export const TransactionBadge = ({ type, size = 'sm', showIcon = false, className = '' }) => {
  const theme = getTransactionTheme(type);
  const label = getTransactionLabel(type);

  const renderIcon = () => {
    const iconSize = size === 'lg' ? 'w-3.5 h-3.5' : 'w-3 h-3';
    switch (type?.toLowerCase()) {
      case 'exchange':
        return <ArrowLeftRight className={iconSize} />;
      case 'free':
        return <Gift className={iconSize} />;
      case 'rent':
        return <Clock className={iconSize} />;
      case 'sale':
      default:
        return <ShoppingBag className={iconSize} />;
    }
  };

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[10px] font-semibold tracking-wider',
    sm: 'px-2.5 py-1 text-xs font-semibold tracking-wide',
    lg: 'px-3 py-1.5 text-sm font-semibold tracking-wide',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border uppercase ${theme.badge} ${sizeClasses[size]} ${className}`}
    >
      {showIcon ? (
        renderIcon()
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
      )}
      {label}
    </span>
  );
};

export default TransactionBadge;
