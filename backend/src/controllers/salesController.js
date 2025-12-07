// src/controllers/salesController.js
const salesService = require('../services/salesService');

class SalesController {
  getAllTransactions(req, res) {
    try {
      const data = salesService.getAllTransactions();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  getTransactions(req, res) {
    try {
      const { search, customerRegions, genders, ageMin, ageMax, productCategories, tags, paymentMethods, startDate, endDate, sortBy = 'date', sortOrder = 'desc', page = 1, pageSize = 10 } = req.query;

      // Build filters object
      const filters = {};

      if (search) {
        filters.search = search;
      }

      if (customerRegions) {
        filters.customerRegions = Array.isArray(customerRegions) ? customerRegions : [customerRegions];
      }

      if (genders) {
        filters.genders = Array.isArray(genders) ? genders : [genders];
      }

      if (ageMin !== undefined || ageMax !== undefined) {
        filters.ageRange = {
          min: parseInt(ageMin) || 0,
          max: parseInt(ageMax) || 100
        };
      }

      if (productCategories) {
        filters.productCategories = Array.isArray(productCategories) ? productCategories : [productCategories];
      }

      if (tags) {
        filters.tags = Array.isArray(tags) ? tags : [tags];
      }

      if (paymentMethods) {
        filters.paymentMethods = Array.isArray(paymentMethods) ? paymentMethods : [paymentMethods];
      }

      if (startDate && endDate) {
        filters.dateRange = { startDate, endDate };
      }

      // Validate filters
      const validation = salesService.validateFilters(filters);
      if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }

      const result = salesService.getTransactions(
        filters,
        sortBy,
        sortOrder,
        parseInt(page) || 1,
        parseInt(pageSize) || 10
      );

      res.json({ success: true, ...result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  getFilterOptions(req, res) {
    try {
      const options = salesService.getFilterOptions();
      res.json({ success: true, data: options });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  search(req, res) {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ success: false, error: 'Search query is required' });
      }
      const results = salesService.searchTransactions(query);
      res.json({ success: true, data: results, count: results.length });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new SalesController();
