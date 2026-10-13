import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowLeftRight,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  MessageSquareQuote,
  CheckCheck,
} from 'lucide-react';
import UserAvatar from '../common/UserAvatar';
import TransactionBadge from '../products/TransactionBadge';
import { formatDate, formatCurrency } from '../../utils/formatters';

export const RequestCard = ({
  request,
  onStatusChange,
  onOpenConfirm,
}) => {
  if (!request) return null;

  const isIncoming = request.direction === 'incoming';
  const person = request.user;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCheck className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Pending Response
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle hover:shadow-card transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        {/* Person Info */}
        <div className="flex items-center gap-3">
          <UserAvatar user={person} size="md" showBadge={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                {isIncoming ? 'Requested by' : 'Sent to'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{formatDate(request.createdAt)}</span>
            </div>
            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{person?.name}</h4>
            <p className="text-xs text-slate-500">{person?.college}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div>{getStatusBadge(request.status)}</div>
      </div>

      {/* Target Item Row */}
      <div className="py-4 flex items-start gap-4">
        <Link
          to={`/products/${request.listingId}`}
          className="shrink-0 group block"
        >
          <img
            src={request.listingImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'}
            alt={request.listingTitle}
            className="w-20 h-20 rounded-xl object-cover border border-slate-200 group-hover:opacity-90 transition-opacity"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <TransactionBadge type={request.type} size="xs" />
          </div>
          <Link
            to={`/products/${request.listingId}`}
            className="font-semibold text-slate-900 hover:text-emerald-700 text-sm sm:text-base line-clamp-1 transition-colors"
          >
            {request.listingTitle}
          </Link>

          {/* Special Type Badges & Info */}
          <div className="mt-2 space-y-1.5">
            {request.exchangeOffer && (
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                <ArrowLeftRight className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{request.exchangeOffer}</span>
              </div>
            )}

            {request.requestedDates && (
              <div className="flex items-center gap-2 text-xs font-medium text-amber-900 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Rental Dates: {request.requestedDates}</span>
              </div>
            )}

            {request.priceOffer !== null && request.priceOffer !== undefined && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  Offer Amount: {request.priceOffer === 0 ? 'Free Giveaway' : formatCurrency(request.priceOffer)}
                </span>
              </div>
            )}

            {request.message && (
              <div className="flex items-start gap-2 text-xs text-slate-600 italic bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
                <MessageSquareQuote className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>"{request.message}"</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
        {isIncoming && request.status === 'pending' && (
          <>
            <button
              onClick={() =>
                onOpenConfirm({
                  title: 'Reject Request',
                  message: `Are you sure you want to decline this request from ${person?.name}?`,
                  confirmLabel: 'Decline Request',
                  confirmVariant: 'danger',
                  onConfirm: () => onStatusChange(request.id, 'rejected'),
                })
              }
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() =>
                onOpenConfirm({
                  title: 'Accept Request',
                  message: `Accept this request? You and ${person?.name} can coordinate campus handoff.`,
                  confirmLabel: 'Confirm & Accept',
                  confirmVariant: 'primary',
                  onConfirm: () => onStatusChange(request.id, 'accepted'),
                })
              }
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
            >
              Accept Request
            </button>
          </>
        )}

        {isIncoming && request.status === 'accepted' && (
          <button
            onClick={() =>
              onOpenConfirm({
                title: 'Mark as Completed',
                message: 'Has the item been exchanged or returned?',
                confirmLabel: 'Mark Completed',
                confirmVariant: 'primary',
                onConfirm: () => onStatusChange(request.id, 'completed'),
              })
            }
            className="px-4 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            Mark as Completed
          </button>
        )}

        {!isIncoming && request.status === 'pending' && (
          <button
            onClick={() =>
              onOpenConfirm({
                title: 'Cancel Request',
                message: 'Are you sure you want to withdraw this request?',
                confirmLabel: 'Withdraw Request',
                confirmVariant: 'danger',
                onConfirm: () => onStatusChange(request.id, 'rejected'),
              })
            }
            className="px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
          >
            Withdraw Request
          </button>
        )}

        {!isIncoming && request.status === 'accepted' && (
          <div className="text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Owner accepted! Coordinate pickup with {person?.name}.
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
