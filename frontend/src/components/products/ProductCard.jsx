import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin } from 'lucide-react';
import TransactionBadge from './TransactionBadge';
import PriceDisplay from './PriceDisplay';
import UserAvatar from '../common/UserAvatar';
import { getConditionTheme } from '../../utils/formatters';
import { productService } from '../../services/productService';
import { useToast } from '../../context/ToastContext';

export const ProductCard = ({ product }) => {
  const { showToast } = useToast();
  const [saved, setSaved] = useState(() => {
    const savedIds = productService.getSavedIds();
    return savedIds.includes(product.id);
  });

  if (!product) return null;

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isNowSaved = productService.toggleSaved(product.id);
    setSaved(isNowSaved);
    showToast(
      isNowSaved ? 'Saved to your bookmarks' : 'Removed from saved items',
      'info'
    );
  };

  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-0.5"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <TransactionBadge type={product.transactionType} size="xs" />
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmark}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark item'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 shadow-xs ${
            saved
              ? 'bg-emerald-600 text-white'
              : 'bg-white/85 text-slate-700 hover:bg-white hover:text-emerald-700'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Condition Tag */}
        <div className="absolute bottom-2.5 left-3">
          <span
            className={`px-2 py-0.5 text-[11px] font-medium rounded-md backdrop-blur-sm shadow-2xs ${getConditionTheme(
              product.condition
            )}`}
          >
            {product.condition}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span className="capitalize">{product.category}</span>
            {product.location && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[140px]">
                <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                <span className="truncate">{product.location.split('/')[0]}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {product.title}
          </h3>

          {/* Wanted exchange preference preview if barter */}
          {product.transactionType === 'exchange' && product.exchangeFor && (
            <p className="mt-1 text-xs text-slate-500 line-clamp-1 italic">
              Wanted: {product.exchangeFor}
            </p>
          )}
        </div>

        {/* Card Footer: Price & Owner */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <PriceDisplay product={product} size="md" />

          {product.owner && (
            <div className="flex items-center gap-1.5" title={product.owner.name}>
              <UserAvatar user={product.owner} size="xs" />
              <span className="text-xs text-slate-600 font-medium truncate max-w-[90px]">
                {product.owner.name.split(' ')[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
