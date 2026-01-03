// src/services/api.js
import axios from 'axios';

// Get API base URL from environment variable or construct from current location
const getAPIBaseUrl = () => {
  // In production, use the same origin as the frontend
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, use localhost:5000
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  
  // In production, assume backend is on same server/domain
  return `${window.location.protocol}//${window.location.host}/api`;
};

const API_BASE_URL = getAPIBaseUrl();

export const api = {
  getTransactions: async (filters = {}, sortBy = 'date', sortOrder = 'desc', page = 1, pageSize = 10) => {
    const params = {
      ...filters,
      sortBy,
      sortOrder,
      page,
      pageSize
    };

    const response = await axios.get(`${API_BASE_URL}/sales/transactions`, { params });
    return response.data;
  },

  getFilterOptions: async () => {
    const response = await axios.get(`${API_BASE_URL}/sales/filters`);
    return response.data.data;
  },

  search: async (query) => {
    const response = await axios.get(`${API_BASE_URL}/sales/search`, { params: { query } });
    return response.data.data;
  },

  getAllTransactions: async () => {
    const response = await axios.get(`${API_BASE_URL}/sales/all`);
    return response.data.data;
  }
};
