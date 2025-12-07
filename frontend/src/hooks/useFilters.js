// src/hooks/useFilters.js
import { useState, useCallback } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    customerRegions: [],
    genders: [],
    ageRange: { min: 0, max: 100 },
    productCategories: [],
    tags: [],
    paymentMethods: [],
    dateRange: { startDate: '', endDate: '' }
  });

  const updateFilter = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const addToFilter = useCallback((filterName, value) => {
    setFilters(prev => {
      const currentList = prev[filterName] || [];
      if (currentList.includes(value)) {
        return {
          ...prev,
          [filterName]: currentList.filter(item => item !== value)
        };
      }
      return {
        ...prev,
        [filterName]: [...currentList, value]
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      customerRegions: [],
      genders: [],
      ageRange: { min: 0, max: 100 },
      productCategories: [],
      tags: [],
      paymentMethods: [],
      dateRange: { startDate: '', endDate: '' }
    });
  }, []);

  const clearFilter = useCallback((filterName) => {
    setFilters(prev => {
      if (typeof prev[filterName] === 'string') {
        return { ...prev, [filterName]: '' };
      }
      if (Array.isArray(prev[filterName])) {
        return { ...prev, [filterName]: [] };
      }
      if (typeof prev[filterName] === 'object') {
        return { ...prev, [filterName]: {} };
      }
      return prev;
    });
  }, []);

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.customerRegions.length > 0 ||
      filters.genders.length > 0 ||
      filters.productCategories.length > 0 ||
      filters.tags.length > 0 ||
      filters.paymentMethods.length > 0 ||
      (filters.dateRange.startDate && filters.dateRange.endDate)
    );
  };

  return {
    filters,
    updateFilter,
    addToFilter,
    clearFilters,
    clearFilter,
    hasActiveFilters
  };
};
