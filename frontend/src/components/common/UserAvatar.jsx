import React from 'react';

export const UserAvatar = ({ user, size = 'md', showBadge = false, className = '' }) => {
  const name = user?.name || 'Student';
  const avatarUrl = user?.avatar;

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const getInitials = (str) => {
    return str
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border border-slate-200/80 shadow-xs`}
          loading="lazy"
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-emerald-100 text-emerald-800 font-medium flex items-center justify-center border border-emerald-200/60 shadow-xs`}
        >
          {getInitials(name)}
        </div>
      )}
      {showBadge && (
        <span
          className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
          title="Verified Student"
        />
      )}
    </div>
  );
};

export default UserAvatar;
