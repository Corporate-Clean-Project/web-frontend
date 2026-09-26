import apiClient from './client';

export async function getPageContent(page) {
  const { data } = await apiClient.get(`/content/${page}`);
  return data.data;
}
