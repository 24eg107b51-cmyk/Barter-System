import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Plus,
  ArrowLeftRight,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  Gift,
  Search,
} from 'lucide-react';
import { productService } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import CategoryChips from '../components/products/CategoryChips';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

export const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching home products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    navigate(`/explore?category=${catId}`);
  };

  // Sections
  const featuredItems = products.filter((p) => p.isFeatured).slice(0, 4);
  const recentItems = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const freeItems = products.filter((p) => p.transactionType === 'free').slice(0, 4);
  const rentalItems = products.filter((p) => p.transactionType === 'rent').slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 -mt-2 sm:-mt-6 pb-12 pt-10 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Subtle Campus Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Exclusively for verified college students</span>
          </div>

          {/* Welcoming Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.15]">
            Good finds. <span className="text-emerald-600">Better exchanges.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Your campus. Your community. Your next find. Exchange what you have, find what you need, and borrow what makes student life easier.
          </p>

          {/* Prominent Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto relative flex items-center shadow-subtle hover:shadow-card transition-shadow rounded-2xl"
          >
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, electronics, lab coats, bikes..."
                className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-28 sm:pr-32 py-3.5 sm:py-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-5 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>Explore items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/listings/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4 text-emerald-600" />
              <span>List an item</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Horizontally Scrollable Category Chips */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Browse by Department & Category
            </h2>
            <Link
              to="/explore"
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              View all &rarr;
            </Link>
          </div>
          <CategoryChips
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        {/* Informational Banner: How CampusSwap Works */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>How CampusSwap Works</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            A trusted circular economy right on your quad
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm shadow-2xs">
                1
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Post what you have</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                List finished textbooks, dorm appliances, or gear for swap, sale, rent, or free donation in under 60 seconds.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm shadow-2xs">
                2
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Agree on terms</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Send swap proposals, request borrowing dates, or make offers directly with fellow verified students.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm shadow-2xs">
                3
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Meet on campus</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Handoff items between lectures at the student union, library, or residence hall without shipping fees or scams.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Find something useful (Featured) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Find something useful
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Staff picks and high-demand student items this week
              </p>
            </div>
            <Link
              to="/explore"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {featuredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section 2: Recently Listed */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Recently listed
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Freshly uploaded by students in the last 48 hours
              </p>
            </div>
            <Link
              to="/explore?sort=recent"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {recentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section 3: Free for students */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Free for students
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Senior pass-downs, lab supplies, and dorm giveaways ($0.00)
              </p>
            </div>
            <Link
              to="/explore?type=free"
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Browse free items <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {freeItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section 4: Available to rent */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Available to rent
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Borrow project tools, presentation projectors, and noise-canceling headphones
              </p>
            </div>
            <Link
              to="/explore?type=rent"
              className="text-xs sm:text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              Browse rentals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {rentalItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
