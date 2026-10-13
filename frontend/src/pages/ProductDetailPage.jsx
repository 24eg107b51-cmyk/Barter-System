import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  ShieldCheck,
  Share2,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeftRight,
  Gift,
  X,
  MessageSquare,
} from 'lucide-react';
import { productService } from '../services/productService';
import { barterService } from '../services/barterService';
import { rentalService } from '../services/rentalService';
import { userService } from '../services/userService';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import TransactionBadge from '../components/products/TransactionBadge';
import PriceDisplay from '../components/products/PriceDisplay';
import UserAvatar from '../components/common/UserAvatar';
import ProductCard from '../components/products/ProductCard';
import { formatDate, getConditionTheme } from '../utils/formatters';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user: currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Action Modal State
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [exchangeItemInput, setExchangeItemInput] = useState('');
  const [rentalDays, setRentalDays] = useState(2);
  const [offerPriceInput, setOfferPriceInput] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const loadProductData = async () => {
      setLoading(true);
      try {
        const item = await productService.getProductById(id);
        if (!isCancelled) {
          setProduct(item);
          setSelectedImageIndex(0);
          setOfferPriceInput(item.price ? String(item.price) : '');
          setIsSaved(productService.getSavedIds().includes(item.id));

          // Load related products
          const all = await productService.getProducts({ category: item.category });
          setRelatedProducts(all.filter((p) => p.id !== item.id).slice(0, 4));
        }
      } catch (err) {
        if (!isCancelled) {
          console.error(err);
          showToast('Product not found or unavailable', 'error');
          navigate('/explore');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadProductData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      isCancelled = true;
    };
  }, [id, navigate, showToast]);

  const handleToggleBookmark = () => {
    if (!product) return null;
    const updated = productService.toggleSaved(product.id);
    setIsSaved(updated);
    showToast(updated ? 'Saved to bookmarks' : 'Removed from bookmarks', 'info');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard!', 'success');
    }
  };

  // Submit Request Modal
  const handleSubmitAction = async (e) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);

    try {
      if (product.transactionType === 'exchange') {
        if (!exchangeItemInput.trim()) {
          showToast('Please specify the item you are offering to swap', 'error');
          setIsSubmitting(false);
          return;
        }
        await barterService.requestExchange({
          listingId: product.id,
          listingTitle: product.title,
          listingImage: product.images?.[0],
          exchangeOffer: exchangeItemInput.trim(),
          message: actionMessage.trim() || 'Hi! I would love to trade this item with you.',
          targetUser: product.owner,
        });
        showToast('Exchange proposal submitted! Check Requests tab.', 'success');
      } else if (product.transactionType === 'rent') {
        const today = new Date();
        const returnDate = new Date();
        returnDate.setDate(today.getDate() + Number(rentalDays));
        const datesString = `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${returnDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} (${rentalDays} days)`;

        await rentalService.requestRental({
          listingId: product.id,
          listingTitle: product.title,
          listingImage: product.images?.[0],
          rentalRate: product.rentalRate,
          rentalDates: datesString,
          days: Number(rentalDays),
          message: actionMessage.trim() || 'Requesting to borrow this for my project.',
          targetUser: product.owner,
        });
        showToast('Rental booking request submitted!', 'success');
      } else if (product.transactionType === 'free') {
        await userService.createGeneralRequest({
          listingId: product.id,
          listingTitle: product.title,
          listingImage: product.images?.[0],
          type: 'free',
          direction: 'sent',
          user: product.owner,
          priceOffer: 0,
          message: actionMessage.trim() || 'Hi! I would appreciate picking up this free item.',
        });
        showToast('Free item claim request sent to owner!', 'success');
      } else {
        // Sale
        await userService.createGeneralRequest({
          listingId: product.id,
          listingTitle: product.title,
          listingImage: product.images?.[0],
          type: 'sale',
          direction: 'sent',
          user: product.owner,
          priceOffer: offerPriceInput ? parseFloat(offerPriceInput) : product.price,
          message: actionMessage.trim() || 'Interested in buying this item.',
        });
        showToast('Inquiry sent to seller!', 'success');
      }

      setIsActionModalOpen(false);
      navigate('/requests');
    } catch (err) {
      showToast('Failed to submit request. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[4/3] bg-slate-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-slate-200 rounded" />
            <div className="h-6 w-1/3 bg-slate-200 rounded" />
            <div className="h-24 w-full bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  ];

  const getActionButtonText = () => {
    switch (product.transactionType) {
      case 'exchange':
        return 'Request Exchange';
      case 'free':
        return 'Request Item ($0)';
      case 'rent':
        return 'Request Rental';
      case 'sale':
      default:
        return 'Contact Owner';
    }
  };

  const isOwner = currentUser?.id === product.owner?.id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Share item link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Bookmarked' : 'Bookmark item'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-subtle">
            <img
              src={images[selectedImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <TransactionBadge type={product.transactionType} size="lg" showIcon={true} />
            </div>
            <div className="absolute bottom-4 left-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-lg backdrop-blur-md shadow-xs ${getConditionTheme(
                  product.condition
                )}`}
              >
                Condition: {product.condition}
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:border-slate-300 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>{product.category}</span>
              <span>•</span>
              <span>Listed {formatDate(product.createdAt)}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Price / Rate Block */}
            <div className="pt-2">
              <PriceDisplay product={product} size="xl" />
            </div>
          </div>

          {/* Special Banner for Transaction Type */}
          {product.transactionType === 'exchange' && product.exchangeFor && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide">
                <ArrowLeftRight className="w-4 h-4 text-emerald-600" />
                <span>Owner's Exchange Wishlist</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">
                {product.exchangeFor}
              </p>
            </div>
          )}

          {product.transactionType === 'rent' && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Rental Duration & Terms</span>
              </div>
              <p className="text-xs text-amber-800">
                {product.rentalPeriod || 'Standard student borrowing terms. Return in original condition.'}
              </p>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Campus Location */}
          {product.location && (
            <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-slate-900">Pickup Location</h4>
                <p className="text-xs text-slate-600">{product.location}</p>
              </div>
            </div>
          )}

          {/* Owner Profile Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Listed by verified student
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar user={product.owner} size="md" showBadge={true} />
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    {product.owner?.name}
                  </h4>
                  <p className="text-xs text-slate-500">{product.owner?.college}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ★ {product.owner?.rating || '4.9'}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {product.owner?.tradesCount || '10+'} verified trades
                </p>
              </div>
            </div>
          </div>

          {/* Contextual Action Button */}
          <div>
            {isOwner ? (
              <div className="p-3 bg-slate-100 rounded-xl text-center text-xs font-semibold text-slate-600">
                This is your active listing. View it in <Link to="/my-listings" className="text-emerald-700 underline">My Listings</Link>.
              </div>
            ) : (
              <button
                onClick={() => setIsActionModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{getActionButtonText()}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Modal (Request Exchange / Rent / Free / Buy) */}
      {isActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  {product.transactionType.toUpperCase()}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {getActionButtonText()}
                </h3>
              </div>
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAction} className="space-y-4">
              {/* Product mini preview */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <img
                  src={images[0]}
                  alt={product.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {product.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Owner: {product.owner?.name} ({product.owner?.college})
                  </p>
                </div>
              </div>

              {/* Conditional Field: Exchange Item Input */}
              {product.transactionType === 'exchange' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-900">
                    What item are you offering in exchange? <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={exchangeItemInput}
                    onChange={(e) => setExchangeItemInput(e.target.value)}
                    placeholder="e.g., TI-84 Plus CE or Chem 1A Lab Manual"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                  {product.exchangeFor && (
                    <p className="text-[11px] text-slate-500 italic">
                      Tip: Owner requested "{product.exchangeFor}"
                    </p>
                  )}
                </div>
              )}

              {/* Conditional Field: Rental Days */}
              {product.transactionType === 'rent' && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-900">
                      How many days do you need this?
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
                      />
                      <span className="text-xs text-slate-500">
                        @ ${product.rentalRate || 5}/day = <strong className="text-slate-900">${(product.rentalRate || 5) * rentalDays} estimated total</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditional Field: Sale offer amount */}
              {product.transactionType === 'sale' && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-900">
                    Offer Amount ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={offerPriceInput}
                    onChange={(e) => setOfferPriceInput(e.target.value)}
                    placeholder="Offer price"
                    className="w-32 px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
                  />
                  <span className="text-xs text-slate-500 ml-2">
                    Listed price: ${product.price}
                  </span>
                </div>
              )}

              {/* Note / Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-900">
                  Message for {product.owner?.name?.split(' ')[0]}
                </label>
                <textarea
                  rows={3}
                  value={actionMessage}
                  onChange={(e) => setActionMessage(e.target.value)}
                  placeholder="Suggest a meetup location on campus (e.g., student union or library)..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsActionModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Related items section */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-slate-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Related items in {product.category}
              </h2>
              <p className="text-xs text-slate-500">
                Other items listed by fellow students in this department
              </p>
            </div>
            <Link
              to={`/explore?category=${product.category}`}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              See all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
