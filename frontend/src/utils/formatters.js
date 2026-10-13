// Helper formatters for CampusSwap

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '';
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getTransactionLabel = (type) => {
  switch (type?.toLowerCase()) {
    case 'exchange':
      return 'EXCHANGE';
    case 'free':
      return 'FREE';
    case 'sale':
      return 'FOR SALE';
    case 'rent':
      return 'FOR RENT';
    default:
      return type?.toUpperCase() || 'ITEM';
  }
};

export const getTransactionTheme = (type) => {
  switch (type?.toLowerCase()) {
    case 'free':
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        dot: 'bg-emerald-500',
        text: 'text-emerald-700',
        accent: 'emerald',
      };
    case 'exchange':
      return {
        badge: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        text: 'text-slate-800',
        accent: 'slate',
      };
    case 'rent':
      return {
        badge: 'bg-amber-50 text-amber-800 border-amber-200/80',
        dot: 'bg-amber-500',
        text: 'text-amber-800',
        accent: 'amber',
      };
    case 'sale':
    default:
      return {
        badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
        dot: 'bg-blue-500',
        text: 'text-blue-700',
        accent: 'blue',
      };
  }
};

export const getConditionTheme = (condition) => {
  switch (condition?.toLowerCase()) {
    case 'new':
      return 'bg-emerald-50 text-emerald-700';
    case 'like new':
      return 'bg-teal-50 text-teal-700';
    case 'good':
      return 'bg-slate-100 text-slate-700';
    case 'fair':
      return 'bg-orange-50 text-orange-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};
