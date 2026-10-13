import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  Plus,
  Bell,
  Search,
  User,
  Package,
  Layers,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import UserAvatar from '../common/UserAvatar';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      navigate(`/explore?q=${encodeURIComponent(headerSearch.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-emerald-700 py-1 ${
      isActive ? 'text-emerald-700 font-semibold' : 'text-slate-600'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-lg tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  Campus<span className="text-emerald-600">Swap</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Student Market
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" end className={navLinkClasses}>
                Home
              </NavLink>
              <NavLink to="/explore" className={navLinkClasses}>
                Explore
              </NavLink>
              <NavLink to="/explore?category=all" className={navLinkClasses}>
                Categories
              </NavLink>
              <NavLink to="/my-listings" className={navLinkClasses}>
                My Listings
              </NavLink>
              <NavLink to="/requests" className={navLinkClasses}>
                <span className="relative">
                  Requests
                  <span className="absolute -top-1 -right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
                </span>
              </NavLink>
            </nav>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xs mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search items, books..."
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
              />
            </form>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3">
            {/* + List an Item CTA */}
            <Link
              to="/listings/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">List an Item</span>
              <span className="sm:hidden">List</span>
            </Link>

            {/* Notifications Icon */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      2 New
                    </span>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/requests"
                      onClick={() => setNotificationsOpen(false)}
                      className="block p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="text-xs font-medium text-slate-900">
                        Sarah Miller requested your TI-84 Calculator
                      </p>
                      <span className="text-[10px] text-slate-400">10m ago</span>
                    </Link>
                    <Link
                      to="/requests"
                      onClick={() => setNotificationsOpen(false)}
                      className="block p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <p className="text-xs font-medium text-slate-900">
                        Daniel Kim proposed rental for Mini Projector
                      </p>
                      <span className="text-[10px] text-slate-400">1h ago</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar & Dropdown */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  aria-expanded={profileOpen}
                >
                  <UserAvatar user={user} size="xs" showBadge={true} />
                  <span className="hidden md:inline text-xs font-medium text-slate-700 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {user.college}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/my-listings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Listings ({user.activeListingsCount || 3})
                      </Link>
                      <Link
                        to="/requests"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      >
                        <Layers className="w-4 h-4 text-slate-400" />
                        Requests
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
