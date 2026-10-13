import api from './api';
import { mockStorage } from './mockStorage';

const USE_MOCK_FALLBACK = true;

export const barterService = {
  // Propose an item exchange
  requestExchange: async ({ listingId, listingTitle, listingImage, exchangeOffer, message, targetUser }) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.post('/barter/requests', {
          listingId,
          exchangeOffer,
          message,
        });
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, saving exchange request to mock storage');
    }

    const currentUser = mockStorage.getUser();
    return mockStorage.createRequest({
      listingId,
      listingTitle,
      listingImage,
      type: 'exchange',
      direction: 'sent',
      user: targetUser || {
        id: 'usr_other',
        name: 'Listing Owner',
        college: 'Campus Peer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      },
      requester: currentUser,
      exchangeOffer,
      message,
      priceOffer: null,
      requestedDates: null,
    });
  },

  // Get barter requests
  getBarterRequests: async () => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.get('/barter/requests');
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, reading mock requests');
    }
    const all = mockStorage.getRequests();
    return all.filter((r) => r.type === 'exchange');
  },
};
