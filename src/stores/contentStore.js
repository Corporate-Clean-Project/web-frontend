import { create } from 'zustand';
import apiClient from '../api/client';

const useContentStore = create((set) => ({
  contentByPage: {},
  loading: false,
  error: null,

  fetchContent: async (page) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(`/content/${page}`);
      set((state) => ({
        contentByPage: { ...state.contentByPage, [page]: data.data },
        loading: false,
      }));
      return data.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || 'Failed to fetch page content.',
        loading: false,
      });
      return null;
    }
  },
}));

export default useContentStore;
