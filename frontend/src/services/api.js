// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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
