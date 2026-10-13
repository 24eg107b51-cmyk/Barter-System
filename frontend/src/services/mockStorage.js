import { INITIAL_PRODUCTS, INITIAL_REQUESTS, CURRENT_USER } from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'campusswap_products',
  REQUESTS: 'campusswap_requests',
  USER: 'campusswap_current_user',
  SAVED: 'campusswap_saved_items',
};

// Initialize local storage with default mock data if not already present
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(CURRENT_USER));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SAVED)) {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(['prod_2']));
  }
};

// Ensure initialized on module load
initializeStorage();

export const mockStorage = {
  getProducts: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  getProductById: (id) => {
    const products = mockStorage.getProducts();
    return products.find((p) => p.id === id) || null;
  },

  createProduct: (product) => {
    const products = mockStorage.getProducts();
    const newProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 1,
      status: 'available',
    };
    const updated = [newProduct, ...products];
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return newProduct;
  },

  updateProduct: (id, updateData) => {
    const products = mockStorage.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updateData };
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    return products[index];
  },

  deleteProduct: (id) => {
    const products = mockStorage.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  },

  getRequests: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return data ? JSON.parse(data) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  },

  createRequest: (reqData) => {
    const requests = mockStorage.getRequests();
    const newReq = {
      ...reqData,
      id: `req_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [newReq, ...requests];
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(updated));
    return newReq;
  },

  updateRequestStatus: (id, newStatus) => {
    const requests = mockStorage.getRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) return null;
    requests[index] = { ...requests[index], status: newStatus };
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return requests[index];
  },

  getUser: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  },

  updateUser: (userData) => {
    const currentUser = mockStorage.getUser();
    const updated = { ...currentUser, ...userData };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
    return updated;
  },

  getSavedItemIds: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleSavedItem: (id) => {
    const saved = mockStorage.getSavedItemIds();
    let updated;
    if (saved.includes(id)) {
      updated = saved.filter((item) => item !== id);
    } else {
      updated = [...saved, id];
    }
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(updated));
    return updated.includes(id);
  },

  resetDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(CURRENT_USER));
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(['prod_2']));
  }
};
