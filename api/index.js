const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Sample sales data
const salesData = require('../backend/src/data/sales_data.json');

// Import controller logic directly
const SalesData = require('../backend/src/models/SalesData');
const salesService = new SalesData(salesData);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all transactions
app.get('/api/sales/all', (req, res) => {
  try {
    const data = salesService.getAllTransactions();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get transactions with filters
app.get('/api/sales/transactions', (req, res) => {
  try {
    const { search, customerRegions, genders, ageMin, ageMax, productCategories, tags, paymentMethods, startDate, endDate, sortBy = 'date', sortOrder = 'desc', page = 1, pageSize = 10 } = req.query;

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

    if (startDate || endDate) {
      filters.dateRange = {
        start: startDate || null,
        end: endDate || null
      };
    }

    const result = salesService.getTransactions(filters, sortBy, sortOrder, page, pageSize);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get filter options
app.get('/api/sales/filters', (req, res) => {
  try {
    const filters = salesService.getFilterOptions();
    res.json({ success: true, data: filters });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search
app.get('/api/sales/search', (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, error: 'Search query is required' });
    }
    const results = salesService.search(query);
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'TruEstate Sales Management API' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

module.exports = app;
