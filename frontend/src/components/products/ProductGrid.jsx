import React from 'react';
import ProductCard from './ProductCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';

export const ProductGrid = ({
  products = [],
  loading = false,
  emptyTitle = 'No items found',
  emptyMessage = 'Try adjusting your search terms or filter criteria.',
  emptyAction,
  columns = 'default', // 'default' (4 cols), 'compact' (3 cols)
}) => {
  if (loading) {
    return <LoadingSkeleton count={8} columns={columns} />;
  }

  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} action={emptyAction} />;
  }

  const gridClasses =
    columns === 'compact'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6';

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
