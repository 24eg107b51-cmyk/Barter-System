import React, { useState } from 'react';
import {
  User,
  School,
  Mail,
  Calendar,
  ShieldCheck,
  Package,
  CheckCheck,
  Save,
  MapPin,
  Bell,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import UserAvatar from '../components/common/UserAvatar';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    college: user?.college || '',
    email: user?.email || '',
    campusLocation: user?.campusLocation || '',
    bio: user?.bio || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'settings'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      showToast('Profile information saved!', 'success');
    } catch (err) {
      showToast('Error saving profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <UserAvatar user={user} size="xl" showBadge={true} />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {user?.name}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Student
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {user?.college}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {user?.email}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Member since {user?.memberSince || 'Fall 2024'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Chips */}
        <div className="flex sm:flex-col gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-center sm:text-right">
            <span className="text-lg font-bold text-slate-900 block leading-tight">
              {user?.activeListingsCount || 3}
            </span>
            <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
              Active Listings
            </span>
          </div>

          <div className="flex-1 sm:flex-initial bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 py-2.5 text-center sm:text-right">
            <span className="text-lg font-bold text-emerald-800 block leading-tight">
              {user?.completedTransactionsCount || 14}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium uppercase tracking-wider">
              Completed Trades
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-1 text-xs sm:text-sm font-semibold transition-all relative ${
            activeTab === 'profile' ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Edit Student Profile
          {activeTab === 'profile' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-1 text-xs sm:text-sm font-semibold transition-all relative ${
            activeTab === 'settings' ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Account & Campus Settings
          {activeTab === 'settings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-t-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Edit Profile Form */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold text-slate-800">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="college" className="block text-xs font-semibold text-slate-800">
                College / University
              </label>
              <input
                id="college"
                name="college"
                type="text"
                value={formData.college}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-slate-800">
                Student Email (Must end in .edu)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                disabled
                value={formData.email}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-400">Verified institutional address</span>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="campusLocation" className="block text-xs font-semibold text-slate-800">
                Primary Campus Location / Dorm
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="campusLocation"
                  name="campusLocation"
                  type="text"
                  value={formData.campusLocation}
                  onChange={handleChange}
                  placeholder="e.g. Unit 2 Residence Halls, Rm 412"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="bio" className="block text-xs font-semibold text-slate-800">
              Student Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell fellow students what you study and what items you typically look for..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Account Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Marketplace Preferences
            </h3>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Exchange Proposal Alerts</h4>
                  <p className="text-xs text-slate-500">
                    Get in-app and email notifications when a student requests one of your items.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/70">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Campus Visibility Only</h4>
                  <p className="text-xs text-slate-500">
                    Restricts viewing your active listings only to students with your college domain.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
