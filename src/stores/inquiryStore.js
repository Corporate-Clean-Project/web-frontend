import { create } from 'zustand';
import apiClient from '../api/client';

const useInquiryStore = create((set) => ({
  loading: false,
  error: null,

  submitInquiry: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/inquiries', payload);
      set({ loading: false });
      return data.inquiry;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Failed to submit inquiry.',
        loading: false,
      });
      throw error;
    }
  },

  submitQuoteRequest: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post('/inquiries/quote', payload);
      set({ loading: false });
      return data.inquiry;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Failed to submit quote request.',
        loading: false,
      });
      throw error;
    }
  },
}));

export default useInquiryStore;
