// src/routes/salesRoutes.js
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/all', salesController.getAllTransactions.bind(salesController));
router.get('/transactions', salesController.getTransactions.bind(salesController));
router.get('/filters', salesController.getFilterOptions.bind(salesController));
router.get('/search', salesController.search.bind(salesController));

module.exports = router;
