// src/services/salesService.js
const SalesData = require('../models/SalesData');

class SalesService {
  getAllTransactions() {
    return SalesData.getAllData();
  }

  getTransactions(filters = {}, sortBy = 'date', sortOrder = 'desc', page = 1, pageSize = 10) {
    // Get filtered data
    let filteredData = SalesData.getFilteredData(filters);

    // Apply sorting
    let sortedData = SalesData.getSortedData(filteredData, sortBy, sortOrder);

    // Apply pagination
    const result = SalesData.getPaginatedData(sortedData, page, pageSize);

    return result;
  }

  getFilterOptions() {
    return {
      customerRegions: SalesData.getUniqueValues('CustomerRegion'),
      genders: SalesData.getUniqueValues('Gender'),
      productCategories: SalesData.getUniqueValues('ProductCategory'),
      paymentMethods: SalesData.getUniqueValues('PaymentMethod'),
      tags: SalesData.getUniqueValues('tags'),
      ageRange: this._getAgeRange()
    };
  }

  _getAgeRange() {
    const allData = SalesData.getAllData();
    const ages = allData.map(item => item.Age);
    return {
      min: Math.min(...ages),
      max: Math.max(...ages)
    };
  }

  searchTransactions(query) {
    const filters = { search: query };
    return SalesData.getFilteredData(filters);
  }

  validateFilters(filters) {
    const errors = [];

    if (filters.ageRange) {
      if (filters.ageRange.min > filters.ageRange.max) {
        errors.push('Age range min cannot be greater than max');
      }
    }

    if (filters.dateRange) {
      const startDate = new Date(filters.dateRange.startDate);
      const endDate = new Date(filters.dateRange.endDate);
      if (startDate > endDate) {
        errors.push('Start date cannot be after end date');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = new SalesService();
