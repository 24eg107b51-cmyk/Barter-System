import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { productService } from '../services/productService';
import SearchBar from '../components/common/SearchBar';
import FilterSidebar from '../components/products/FilterSidebar';
import ProductGrid from '../components/products/ProductGrid';

export const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states from URL or defaults
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    type: searchParams.get('type') || 'all',
    condition: searchParams.get('condition') || 'all',
  });
  const [sort, setSort] = useState(searchParams.get('sort') || 'recent');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state when URL params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category') || 'all';
    const type = searchParams.get('type') || 'all';
    const sortParam = searchParams.get('sort') || 'recent';

    setSearch(q);
    setFilters((prev) => ({ ...prev, category: cat, type }));
    setSort(sortParam);
  }, [searchParams]);

  // Fetch filtered items
  useEffect(() => {
    let isCancelled = false;
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts({
          search,
          category: filters.category,
          type: filters.type,
          condition: filters.condition,
          sort,
        });
        if (!isCancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Failed to load items', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchFiltered();
    return () => {
      isCancelled = true;
    };
  }, [search, filters, sort]);

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      category: 'all',
      type: 'all',
      condition: 'all',
    });
    setSort('recent');
    setSearchParams({});
  };

  const hasActiveFilters =
    search.trim() !== '' ||
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.condition !== 'all' ||
    sort !== 'recent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Search bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse campus swaps, giveaways, sales, and rentals
          </p>
        </div>

        <div className="w-full md:max-w-md">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items, titles, or exchange wants..."
          />
        </div>
      </div>

      {/* Control Bar: Result Count, Filter Trigger (Mobile), and Sort Dropdown */}
      <div className="flex items-center justify-between py-3 border-y border-slate-200/80 bg-white/50 backdrop-blur-xs px-2 rounded-xl">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {(filters.category !== 'all' || filters.type !== 'all' || filters.condition !== 'all') && (
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
            )}
          </button>

          <span className="text-xs sm:text-sm text-slate-600 font-medium">
            Showing <strong className="text-slate-900">{products.length}</strong> {products.length === 1 ? 'item' : 'items'}
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium hidden sm:inline">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="recent">Recently listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Browse Content with Sidebar and Grid */}
      <div className="flex items-start gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            isMobile={true}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />
        )}

        {/* Products Grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={products}
            loading={loading}
            emptyTitle="No items match your criteria"
            emptyMessage="Try broadening your search keywords or resetting active filters."
            emptyAction={
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                Reset all filters
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
