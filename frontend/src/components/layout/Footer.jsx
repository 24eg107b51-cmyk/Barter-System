import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 mt-16 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-900 text-lg">
                Campus<span className="text-emerald-600">Swap</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm font-medium text-slate-800">
              Your campus. Your community. Your next find.
            </p>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Exchange what you have, find what you need, and borrow what makes student life easier. Designed exclusively for verified college students to trade, donate, sell, and rent on campus safely.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Restricted to verified college email domains</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Explore Campus
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/explore?type=exchange" className="hover:text-emerald-600 transition-colors">
                  Product Exchanges
                </Link>
              </li>
              <li>
                <Link to="/explore?type=free" className="hover:text-emerald-600 transition-colors">
                  Free Student Giveaways
                </Link>
              </li>
              <li>
                <Link to="/explore?type=rent" className="hover:text-emerald-600 transition-colors">
                  Rentals & Gear Borrowing
                </Link>
              </li>
              <li>
                <Link to="/explore?category=textbooks" className="hover:text-emerald-600 transition-colors">
                  Textbooks & Course Notes
                </Link>
              </li>
              <li>
                <Link to="/explore?category=dorm" className="hover:text-emerald-600 transition-colors">
                  Dorm Move-in Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Student Hub
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link to="/listings/new" className="hover:text-emerald-600 transition-colors">
                  + List an Item
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="hover:text-emerald-600 transition-colors">
                  Manage Listings
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-emerald-600 transition-colors">
                  Swap & Rental Requests
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-600 transition-colors">
                  My Profile & Campus Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusSwap Marketplace. Built for university communities.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for student life</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
