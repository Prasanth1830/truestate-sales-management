// src/utils/filterUtils.js

export const buildFilterParams = (filters) => {
  const params = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.customerRegions && filters.customerRegions.length > 0) {
    params.customerRegions = filters.customerRegions;
  }

  if (filters.genders && filters.genders.length > 0) {
    params.genders = filters.genders;
  }

  if (filters.ageRange) {
    params.ageMin = filters.ageRange.min;
    params.ageMax = filters.ageRange.max;
  }

  if (filters.productCategories && filters.productCategories.length > 0) {
    params.productCategories = filters.productCategories;
  }

  if (filters.tags && filters.tags.length > 0) {
    params.tags = filters.tags;
  }

  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    params.paymentMethods = filters.paymentMethods;
  }

  if (filters.dateRange && filters.dateRange.startDate && filters.dateRange.endDate) {
    params.startDate = filters.dateRange.startDate;
    params.endDate = filters.dateRange.endDate;
  }

  return params;
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(value);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};
