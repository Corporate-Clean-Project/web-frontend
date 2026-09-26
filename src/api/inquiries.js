import apiClient from './client';

export async function submitInquiry(payload) {
  const { data } = await apiClient.post('/inquiries', payload);
  return data;
}

export async function submitQuoteRequest(payload) {
  const { data } = await apiClient.post('/inquiries/quote', payload);
  return data;
}
