import api from './api';
import { mockStorage } from './mockStorage';

// Toggle to force mock mode or try Spring Boot backend first
const USE_MOCK_FALLBACK = true;

export const productService = {
  // Get all products with optional filters
  getProducts: async ({ search = '', category = 'all', type = 'all', condition = 'all', sort = 'recent' } = {}) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.get('/products', {
          params: { search, category, type, condition, sort },
        });
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, falling back to mock dataset', err.message);
    }

    // Mock search, filter, and sort logic
    let products = mockStorage.getProducts();

    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.exchangeFor && p.exchangeFor.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'all') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (type && type !== 'all') {
      products = products.filter((p) => p.transactionType.toLowerCase() === type.toLowerCase());
    }

    if (condition && condition !== 'all') {
      products = products.filter((p) => p.condition.toLowerCase() === condition.toLowerCase());
    }

    // Sorting
    products = [...products].sort((a, b) => {
      if (sort === 'price-low') {
        const priceA = a.price || a.rentalRate || 0;
        const priceB = b.price || b.rentalRate || 0;
        return priceA - priceB;
      }
      if (sort === 'price-high') {
        const priceA = a.price || a.rentalRate || 0;
        const priceB = b.price || b.rentalRate || 0;
        return priceB - priceA;
      }
      // 'recent' by default
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return products;
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.get(`/products/${id}`);
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, using mock storage for product details');
    }
    const product = mockStorage.getProductById(id);
    if (!product) {
      throw new Error(`Product #${id} not found`);
    }
    return product;
  },

  // Create a new listing
  createProduct: async (productData) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.post('/products', productData);
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, saving listing to mock storage');
    }
    return mockStorage.createProduct(productData);
  },

  // Update existing product
  updateProduct: async (id, productData) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, updating mock storage');
    }
    return mockStorage.updateProduct(id, productData);
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        await api.delete(`/products/${id}`);
        return true;
      }
    } catch (err) {
      console.info('Backend unavailable, deleting from mock storage');
    }
    return mockStorage.deleteProduct(id);
  },

  // Get products listed by specific user
  getUserListings: async (userId) => {
    const all = await productService.getProducts();
    return all.filter((p) => p.owner?.id === userId || p.owner?.id === 'usr_me');
  },

  // Saved / Bookmarks
  getSavedIds: () => mockStorage.getSavedItemIds(),
  toggleSaved: (id) => mockStorage.toggleSavedItem(id),
};
