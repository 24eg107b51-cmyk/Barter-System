import api from './api';
import { mockStorage } from './mockStorage';

// Toggle mock fallback via environment variable or default to live backend
const USE_MOCK_FALLBACK = import.meta.env.VITE_USE_MOCK === 'true';

export const authService = {
  login: async (email, password) => {
    if (!USE_MOCK_FALLBACK) {
      try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
          localStorage.setItem('cs_token', response.data.token);
        }
        const user = response.data.user || response.data.student;
        if (user) {
          localStorage.setItem('cs_user', JSON.stringify(user));
        }
        return user;
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to sign in. Please check your credentials.';
        throw new Error(message);
      }
    }

    // Mock validation
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }
    const user = mockStorage.getUser();
    localStorage.setItem('cs_token', 'mock_jwt_token_' + Date.now());
    localStorage.setItem('cs_user', JSON.stringify({ ...user, email }));
    return { ...user, email };
  },

  register: async (userData) => {
    if (!USE_MOCK_FALLBACK) {
      try {
        const payload = {
          fullName: userData.fullName || userData.name,
          email: userData.email,
          password: userData.password
        };
        await api.post('/auth/register', payload);
        // Automatically login the student after registration to obtain JWT
        return await authService.login(userData.email, userData.password);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to create account. Please try again.';
        throw new Error(message);
      }
    }

    // Mock registration
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name || userData.fullName,
      email: userData.email,
      college: userData.college || userData.collegeName || 'UC Berkeley',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
      memberSince: 'Just joined',
      activeListingsCount: 0,
      completedTransactionsCount: 0,
    };
    mockStorage.updateUser(newUser);
    localStorage.setItem('cs_token', 'mock_jwt_token_' + Date.now());
    localStorage.setItem('cs_user', JSON.stringify(newUser));
    return newUser;
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem('cs_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore parse error
      }
    }
    return USE_MOCK_FALLBACK ? mockStorage.getUser() : null;
  },

  logout: () => {
    localStorage.removeItem('cs_token');
    localStorage.removeItem('cs_user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('cs_token');
  }
};
