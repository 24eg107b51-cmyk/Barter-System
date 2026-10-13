import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Layers, User, PlusCircle } from 'lucide-react';

export const MobileNavigation = () => {
  const getNavLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-[11px] font-medium transition-colors ${
      isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg pb-safe">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        <NavLink to="/" end className={getNavLinkClass}>
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/explore" className={getNavLinkClass}>
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/listings/new"
          className="flex flex-col items-center justify-center -mt-5 text-emerald-600 hover:text-emerald-700"
          title="Create Listing"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold mt-0.5 text-slate-700">List</span>
        </NavLink>

        <NavLink to="/requests" className={getNavLinkClass}>
          <div className="relative">
            <Layers className="w-5 h-5 mb-0.5" />
            <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span>Requests</span>
        </NavLink>

        <NavLink to="/profile" className={getNavLinkClass}>
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNavigation;
