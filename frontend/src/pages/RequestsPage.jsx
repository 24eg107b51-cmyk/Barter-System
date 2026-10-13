import React, { useState, useEffect } from 'react';
import { Layers, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { userService } from '../services/userService';
import { useToast } from '../context/ToastContext';
import RequestCard from '../components/requests/RequestCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';

export const RequestsPage = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' | 'sent'
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmConfig, setConfirmConfig] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await userService.getRequests('all');
      setRequests(data);
    } catch (err) {
      console.error(err);
      showToast('Could not load requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await userService.updateRequestStatus(requestId, newStatus);
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
      );
      showToast(`Request updated to ${newStatus}`, 'success');
    } catch (err) {
      showToast('Failed to update request', 'error');
    }
  };

  const incomingRequests = requests.filter((r) => r.direction === 'incoming');
  const sentRequests = requests.filter((r) => r.direction === 'sent');
  const activeList = activeTab === 'incoming' ? incomingRequests : sentRequests;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Requests & Proposals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Coordinate swap proposals, item inquiries, and rental reservations with fellow students.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex items-center gap-2 pb-3 px-1 text-xs sm:text-sm font-semibold transition-all relative ${
            activeTab === 'incoming'
              ? 'text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
          <span>Incoming Requests</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
            {incomingRequests.length}
          </span>
          {activeTab === 'incoming' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 pb-3 px-1 text-xs sm:text-sm font-semibold transition-all relative ${
            activeTab === 'sent'
              ? 'text-emerald-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ArrowUpRight className="w-4 h-4 text-slate-500" />
          <span>Sent by You</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
            {sentRequests.length}
          </span>
          {activeTab === 'sent' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
          )}
        </button>
      </div>

      {/* Requests List */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      ) : activeList.length === 0 ? (
        <EmptyState
          icon={Layers}
          title={
            activeTab === 'incoming'
              ? 'No incoming requests yet'
              : 'You have not sent any requests yet'
          }
          message={
            activeTab === 'incoming'
              ? 'When classmates request to exchange, rent, or buy your items, their proposals will show up here.'
              : 'Browse the marketplace and propose an exchange or request an item to connect with students.'
          }
        />
      ) : (
        <div className="space-y-4">
          {activeList.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onStatusChange={handleStatusChange}
              onOpenConfirm={setConfirmConfig}
            />
          ))}
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmConfig && (
        <ConfirmDialog
          isOpen={!!confirmConfig}
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmLabel={confirmConfig.confirmLabel}
          confirmVariant={confirmConfig.confirmVariant}
          onConfirm={confirmConfig.onConfirm}
          onClose={() => setConfirmConfig(null)}
        />
      )}
    </div>
  );
};

export default RequestsPage;
