import React from 'react';

export const LoadingSkeleton = ({ count = 8, columns = 'default' }) => {
  const gridClasses =
    columns === 'compact'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6';

  return (
    <div className={gridClasses}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle animate-pulse"
        >
          {/* Image skeleton */}
          <div className="aspect-[4/3] w-full bg-slate-200" />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-slate-200 rounded" />
              <div className="h-3 w-12 bg-slate-200 rounded" />
            </div>

            <div className="h-4 w-4/5 bg-slate-200 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 rounded" />

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <div className="h-5 w-14 bg-slate-200 rounded" />
              <div className="h-4 w-16 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
