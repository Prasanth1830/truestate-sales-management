// src/models/SalesData.js
const fs = require('fs');
const path = require('path');

class SalesData {
  constructor() {
    const dataPath = path.join(__dirname, '../data/sales_data.json');
    this.data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  getAllData() {
    return this.data;
  }

  getFilteredData(filters = {}) {
    let result = [...this.data];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(item =>
        item.CustomerName.toLowerCase().includes(searchLower) ||
        item.PhoneNumber.toLowerCase().includes(searchLower)
      );
    }

    // Apply customer region filter
    if (filters.customerRegions && filters.customerRegions.length > 0) {
      result = result.filter(item => filters.customerRegions.includes(item.CustomerRegion));
    }

    // Apply gender filter
    if (filters.genders && filters.genders.length > 0) {
      result = result.filter(item => filters.genders.includes(item.Gender));
    }

    // Apply age range filter
    if (filters.ageRange) {
      const { min, max } = filters.ageRange;
      result = result.filter(item => item.Age >= min && item.Age <= max);
    }

    // Apply product category filter
    if (filters.productCategories && filters.productCategories.length > 0) {
      result = result.filter(item => filters.productCategories.includes(item.ProductCategory));
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(item => {
        const itemTags = item.Tags.split(',').map(t => t.trim());
        return filters.tags.some(tag => itemTags.includes(tag));
      });
    }

    // Apply payment method filter
    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      result = result.filter(item => filters.paymentMethods.includes(item.PaymentMethod));
    }

    // Apply date range filter
    if (filters.dateRange) {
      const { startDate, endDate } = filters.dateRange;
      result = result.filter(item => {
        const itemDate = new Date(item.Date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    return result;
  }

  getSortedData(data, sortBy = 'date', sortOrder = 'desc') {
    const sorted = [...data];

    if (sortBy === 'date') {
      sorted.sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
    } else if (sortBy === 'quantity') {
      sorted.sort((a, b) => {
        return sortOrder === 'desc' ? b.Quantity - a.Quantity : a.Quantity - b.Quantity;
      });
    } else if (sortBy === 'customerName') {
      sorted.sort((a, b) => {
        return a.CustomerName.localeCompare(b.CustomerName);
      });
    }

    return sorted;
  }

  getPaginatedData(data, page = 1, pageSize = 10) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / pageSize);

    return {
      data: paginatedData,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: data.length,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  getUniqueValues(field) {
    const values = new Set();
    this.data.forEach(item => {
      if (field === 'tags') {
        const tags = item.Tags.split(',').map(t => t.trim());
        tags.forEach(tag => values.add(tag));
      } else {
        values.add(item[field]);
      }
    });
    return Array.from(values).sort();
  }
}

module.exports = new SalesData();
