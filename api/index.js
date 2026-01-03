const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const salesRoutes = require('../../backend/src/routes/salesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sales', salesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

module.exports = app;
