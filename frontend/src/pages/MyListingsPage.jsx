import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Package,
  CheckCircle,
  Clock,
  Eye,
} from 'lucide-react';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import TransactionBadge from '../components/products/TransactionBadge';
import PriceDisplay from '../components/products/PriceDisplay';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { formatDate } from '../utils/formatters';

export const MyListingsPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'reserved' | 'completed'

  // Confirm delete modal state
  const [itemToDelete, setItemToDelete] = useState(null);

  // Edit status modal state
  const [editingItem, setEditingItem] = useState(null);

  const fetchUserListings = async () => {
    setLoading(true);
    try {
      const data = await productService.getUserListings(user?.id || 'usr_me');
      setListings(data);
    } catch (err) {
      console.error(err);
      showToast('Could not load your listings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, [user]);

  const handleDeleteListing = async () => {
    if (!itemToDelete) return;
    try {
      await productService.deleteProduct(itemToDelete.id);
      setListings((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      showToast('Listing deleted successfully', 'success');
    } catch (err) {
      showToast('Error deleting listing', 'error');
    } finally {
      setItemToDelete(null);
    }
  };

  const handleUpdateStatus = async (item, newStatus) => {
    try {
      const updated = await productService.updateProduct(item.id, { status: newStatus });
      setListings((prev) =>
        prev.map((l) => (l.id === item.id ? { ...l, status: newStatus } : l))
      );
      showToast(`Listing marked as ${newStatus}`, 'success');
      setEditingItem(null);
    } catch (err) {
      showToast('Error updating listing status', 'error');
    }
  };

  // Filter listings based on active tab
  const filteredListings = listings.filter((item) => {
    if (activeTab === 'active') return !item.status || item.status === 'available';
    if (activeTab === 'reserved') return item.status === 'reserved';
    if (activeTab === 'completed') return item.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Campus Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your items listed on campus, update availability, or mark items completed.
          </p>
        </div>

        <Link
          to="/listings/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ List New Item</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        {[
          { id: 'active', label: 'Active Items' },
          { id: 'reserved', label: 'Pending / Reserved' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => {
          const count = listings.filter((l) => {
            if (tab.id === 'active') return !l.status || l.status === 'available';
            if (tab.id === 'reserved') return l.status === 'reserved';
            if (tab.id === 'completed') return l.status === 'completed';
            return false;
          }).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-emerald-700'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-600">
                {count}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Listings Content */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        <EmptyState
          icon={Package}
          title={
            activeTab === 'active'
              ? 'You have no active listings'
              : activeTab === 'reserved'
              ? 'No items currently pending or reserved'
              : 'No completed listings yet'
          }
          message="Got textbooks, electronics, or dorm gear you no longer need? List them now for classmates to find."
          action={
            <Link
              to="/listings/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium text-xs sm:text-sm hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" />
              <span>List your first item</span>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3.5">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-subtle hover:shadow-card transition-shadow"
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <Link to={`/products/${item.id}`} className="shrink-0">
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200"
                  />
                </Link>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <TransactionBadge type={item.transactionType} size="xs" />
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Listed {formatDate(item.createdAt)}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Eye className="w-3 h-3 text-slate-400" />
                      {item.views || 1} views
                    </span>
                  </div>

                  <Link
                    to={`/products/${item.id}`}
                    className="font-bold text-slate-900 hover:text-emerald-700 text-sm sm:text-base line-clamp-1 transition-colors block"
                  >
                    {item.title}
                  </Link>

                  <div className="flex items-center gap-3 pt-0.5">
                    <PriceDisplay product={item} size="sm" />
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Status:{' '}
                      <strong className="text-slate-800 capitalize">
                        {item.status || 'available'}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Link
                  to={`/products/${item.id}`}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  title="View on marketplace"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                {/* Status Toggle Button */}
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(
                      item,
                      item.status === 'completed'
                        ? 'available'
                        : item.status === 'reserved'
                        ? 'completed'
                        : 'reserved'
                    )
                  }
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  {item.status === 'reserved'
                    ? 'Mark Completed'
                    : item.status === 'completed'
                    ? 'Reactivate'
                    : 'Mark Reserved'}
                </button>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => setItemToDelete(item)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                  title="Delete listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog before Deleting Listing */}
      <ConfirmDialog
        isOpen={!!itemToDelete}
        title="Delete Listing"
        message={`Are you sure you want to permanently delete "${itemToDelete?.title}"? This cannot be undone.`}
        confirmLabel="Delete Item"
        confirmVariant="danger"
        onConfirm={handleDeleteListing}
        onClose={() => setItemToDelete(null)}
      />
    </div>
  );
};

export default MyListingsPage;
