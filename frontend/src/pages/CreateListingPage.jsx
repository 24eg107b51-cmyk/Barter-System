import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Sparkles,
  MapPin,
  X,
  Eye,
} from 'lucide-react';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/products/ProductCard';

const SAMPLE_PRESET_IMAGES = [
  { label: 'Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Laptop / Tech', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
  { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Desk Lamp', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lab Coat', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bicycle', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80' },
];

export const CreateListingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'textbooks',
    condition: 'Like New',
    transactionType: 'exchange',
    price: '',
    rentalRate: '',
    rentalPeriod: '',
    exchangeFor: '',
    location: user?.campusLocation || 'Student Union / Quad',
    images: [SAMPLE_PRESET_IMAGES[0].url],
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Image File Upload Handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          images: [reader.result, ...prev.images],
        }));
        showToast('Image uploaded successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [imageUrlInput.trim(), ...prev.images],
      }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Item title is required';
    if (!formData.description.trim()) newErrors.description = 'Please provide a brief description';
    if (!formData.location.trim()) newErrors.location = 'Campus location is required';

    if (formData.transactionType === 'sale') {
      if (!formData.price || parseFloat(formData.price) <= 0) {
        newErrors.price = 'Please specify a valid sale price';
      }
    }

    if (formData.transactionType === 'rent') {
      if (!formData.rentalRate || parseFloat(formData.rentalRate) <= 0) {
        newErrors.rentalRate = 'Please specify a daily rental rate';
      }
    }

    if (formData.transactionType === 'exchange') {
      if (!formData.exchangeFor.trim()) {
        newErrors.exchangeFor = 'Please specify what you would like in return';
      }
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = 'Please provide at least one photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix required form fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        condition: formData.condition,
        transactionType: formData.transactionType,
        price: formData.transactionType === 'sale' ? parseFloat(formData.price) : (formData.transactionType === 'free' ? 0 : null),
        rentalRate: formData.transactionType === 'rent' ? parseFloat(formData.rentalRate) : null,
        rentalPeriod: formData.transactionType === 'rent' ? formData.rentalPeriod.trim() : null,
        exchangeFor: formData.transactionType === 'exchange' ? formData.exchangeFor.trim() : null,
        location: formData.location.trim(),
        images: formData.images.length > 0 ? formData.images : [SAMPLE_PRESET_IMAGES[0].url],
        owner: {
          id: user?.id || 'usr_me',
          name: user?.name ? `${user.name} (You)` : 'You',
          college: user?.college || 'UC Berkeley',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
          verifiedStudent: true,
          rating: 5.0,
          tradesCount: 15,
        },
      };

      const newListing = await productService.createProduct(payload);
      showToast('Listing published to campus marketplace!', 'success');
      navigate(`/products/${newListing.id}`);
    } catch (err) {
      console.error(err);
      showToast('Error publishing listing', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live preview mockup object
  const previewProduct = {
    id: 'preview_temp',
    title: formData.title || 'Your Item Title Preview',
    description: formData.description || 'Description of your item will appear here.',
    category: formData.category,
    condition: formData.condition,
    transactionType: formData.transactionType,
    price: formData.price ? parseFloat(formData.price) : 0,
    rentalRate: formData.rentalRate ? parseFloat(formData.rentalRate) : 0,
    exchangeFor: formData.exchangeFor,
    location: formData.location,
    images: formData.images,
    owner: {
      name: user?.name || 'You',
      avatar: user?.avatar,
      college: user?.college || 'Campus Quad',
    },
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            List an Item on CampusSwap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Exchange, give away, sell, or rent to verified students in your university.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLivePreview(!showLivePreview)}
          className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Eye className="w-4 h-4" />
          <span>{showLivePreview ? 'Hide Preview' : 'Show Preview'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container (7 Cols on desktop) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          {/* Section 1: Transaction Type Selection */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              1. What would you like to do? <span className="text-rose-500">*</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'exchange', label: 'Exchange', desc: 'Swap for another item' },
                { id: 'free', label: 'Free Giveaway', desc: 'Pass it forward' },
                { id: 'sale', label: 'Sell It', desc: 'Set a cash price' },
                { id: 'rent', label: 'Rent Out', desc: 'Daily loan rate' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setFormData((p) => ({ ...p, transactionType: t.id }))}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    formData.transactionType === t.id
                      ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <p className={`text-xs font-bold ${formData.transactionType === t.id ? 'text-emerald-900' : 'text-slate-800'}`}>
                    {t.label}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Basic Item Details */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              2. Item Details
            </h2>

            {/* Title */}
            <div className="space-y-1.5">
              <label htmlFor="title" className="block text-xs font-semibold text-slate-800">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Campbell Biology 12th Ed or Mini Dorm Desk Lamp"
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 ${
                  errors.title ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.title}
                </p>
              )}
            </div>

            {/* Category & Condition Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="category" className="block text-xs font-semibold text-slate-800">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                >
                  <option value="textbooks">Textbooks & Notes</option>
                  <option value="electronics">Electronics & Tech</option>
                  <option value="dorm">Dorm & Living</option>
                  <option value="lab">Lab Gear & Stationery</option>
                  <option value="sports">Bikes & Sports</option>
                  <option value="clothing">Campus Merch & Clothes</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="condition" className="block text-xs font-semibold text-slate-800">
                  Condition <span className="text-rose-500">*</span>
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                >
                  <option value="New">Brand New (Unopened)</option>
                  <option value="Like New">Like New (Mint)</option>
                  <option value="Good">Good (Normal wear)</option>
                  <option value="Fair">Fair (Noticeable wear)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="description" className="block text-xs font-semibold text-slate-800">
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Mention class/course codes, condition details, accessories included, and pickup preferences..."
                className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 ${
                  errors.description ? 'border-rose-300 focus:border-rose-500' : 'border-slate-300 focus:border-emerald-600'
                }`}
              />
              {errors.description && (
                <p className="text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Section 3: Conditional Fields based on Transaction Type */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              3. Pricing & Terms
            </h2>

            {formData.transactionType === 'sale' && (
              <div className="space-y-1.5">
                <label htmlFor="price" className="block text-xs font-semibold text-slate-800">
                  Sale Price (USD) <span className="text-rose-500">*</span>
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                    $
                  </span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    step="0.5"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25.00"
                    className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
                {errors.price && <p className="text-xs text-rose-500">{errors.price}</p>}
              </div>
            )}

            {formData.transactionType === 'rent' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="rentalRate" className="block text-xs font-semibold text-slate-800">
                    Rental Price per Day ($) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                      $
                    </span>
                    <input
                      id="rentalRate"
                      name="rentalRate"
                      type="number"
                      min="1"
                      value={formData.rentalRate}
                      onChange={handleChange}
                      placeholder="4.00"
                      className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                    />
                  </div>
                  {errors.rentalRate && <p className="text-xs text-rose-500">{errors.rentalRate}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="rentalPeriod" className="block text-xs font-semibold text-slate-800">
                    Available Dates / Duration
                  </label>
                  <input
                    id="rentalPeriod"
                    name="rentalPeriod"
                    type="text"
                    value={formData.rentalPeriod}
                    onChange={handleChange}
                    placeholder="e.g. Finals Week (Up to 7 days)"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                  />
                </div>
              </div>
            )}

            {formData.transactionType === 'exchange' && (
              <div className="space-y-1.5">
                <label htmlFor="exchangeFor" className="block text-xs font-semibold text-slate-800">
                  Wanted Items / Swap Preferences <span className="text-rose-500">*</span>
                </label>
                <input
                  id="exchangeFor"
                  name="exchangeFor"
                  type="text"
                  value={formData.exchangeFor}
                  onChange={handleChange}
                  placeholder="e.g. TI-84 Calculator, Chem 1A notebook, or desk fan"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
                <p className="text-[11px] text-slate-500">
                  Let classmates know what you are looking for in return.
                </p>
                {errors.exchangeFor && <p className="text-xs text-rose-500">{errors.exchangeFor}</p>}
              </div>
            )}

            {formData.transactionType === 'free' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>This item will be offered for free ($0.00) to help fellow students save money.</span>
              </div>
            )}

            {/* Campus Pickup Location */}
            <div className="pt-2 space-y-1.5">
              <label htmlFor="location" className="block text-xs font-semibold text-slate-800">
                Campus Pickup Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Moffitt Library 3rd Floor / Unit 2 Courtyard"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
                />
              </div>
              {errors.location && <p className="text-xs text-rose-500">{errors.location}</p>}
            </div>
          </div>

          {/* Section 4: Image Upload and Previews */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-subtle space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              4. Photos & Media
            </h2>

            {/* Upload Area */}
            <label className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50">
              <Upload className="w-8 h-8 text-emerald-600 mb-2" />
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                Click to upload from your device
              </span>
              <span className="text-[11px] text-slate-500 mt-1">PNG, JPG, WebP up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Quick Sample Presets */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-slate-500">
                Or pick a sample student item photo:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        images: [preset.url, ...p.images.filter((img) => img !== preset.url)],
                      }))
                    }
                    className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg border border-slate-200 transition-colors"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Selected Images */}
            {formData.images.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Active Photos ({formData.images.length})
                </span>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 group">
                      <img src={imgUrl} alt="Upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-emerald-600 text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-2xs">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions: Cancel & Publish */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Listing'}</span>
            </button>
          </div>
        </form>

        {/* Right Preview Card Area (5 Cols on desktop) */}
        <div className={`lg:col-span-5 ${showLivePreview ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Card Preview
              </span>
              <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                As seen on quad
              </span>
            </div>

            <div className="max-w-sm mx-auto">
              <ProductCard product={previewProduct} />
            </div>

            <p className="text-center text-xs text-slate-400 mt-2">
              Updates in real-time as you type your title, price, and details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
