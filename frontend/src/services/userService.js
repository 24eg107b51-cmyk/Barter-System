import api from './api';
import { mockStorage } from './mockStorage';

const USE_MOCK_FALLBACK = true;

export const userService = {
  // Get student profile
  getUserProfile: async (id) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.get(`/users/${id}`);
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, using mock user profile');
    }
    return mockStorage.getUser();
  },

  // Update profile
  updateUserProfile: async (profileData) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.put('/users/profile', profileData);
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, updating mock user profile');
    }
    return mockStorage.updateUser(profileData);
  },

  // Get user requests (incoming & sent)
  getRequests: async (direction = 'all') => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.get('/requests', { params: { direction } });
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, getting mock requests');
    }
    const all = mockStorage.getRequests();
    if (direction === 'all') return all;
    return all.filter((r) => r.direction === direction);
  },

  // Update request status (Accept, Reject, Cancel, Completed)
  updateRequestStatus: async (requestId, newStatus) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.patch(`/requests/${requestId}/status`, { status: newStatus });
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, updating request status in mock storage');
    }
    return mockStorage.updateRequestStatus(requestId, newStatus);
  },

  // Create general inquiry or purchase/free request
  createGeneralRequest: async (reqData) => {
    return mockStorage.createRequest(reqData);
  }
};
