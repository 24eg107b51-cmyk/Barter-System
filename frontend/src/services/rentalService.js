import api from './api';
import { mockStorage } from './mockStorage';

const USE_MOCK_FALLBACK = true;

export const rentalService = {
  // Submit a rental booking/borrow request
  requestRental: async ({ listingId, listingTitle, listingImage, rentalRate, rentalDates, days, message, targetUser }) => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.post('/rentals/requests', {
          listingId,
          rentalDates,
          days,
          message,
        });
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, saving rental request to mock storage');
    }

    const calculatedPrice = (rentalRate || 5) * (days || 1);
    return mockStorage.createRequest({
      listingId,
      listingTitle,
      listingImage,
      type: 'rent',
      direction: 'sent',
      user: targetUser || {
        id: 'usr_other',
        name: 'Listing Owner',
        college: 'Campus Peer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      },
      priceOffer: calculatedPrice,
      requestedDates: rentalDates,
      exchangeOffer: null,
      message,
    });
  },

  // Get rental requests
  getRentalRequests: async () => {
    try {
      if (!USE_MOCK_FALLBACK) {
        const response = await api.get('/rentals/requests');
        return response.data;
      }
    } catch (err) {
      console.info('Backend unavailable, reading mock rental requests');
    }
    const all = mockStorage.getRequests();
    return all.filter((r) => r.type === 'rent');
  },
};
