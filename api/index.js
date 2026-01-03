const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Sample sales data embedded directly
const salesData = [
  {
    "TransactionID": 1,
    "Date": "2023-01-15",
    "CustomerID": "CUST-408",
    "CustomerName": "Neha Khanna",
    "PhoneNumber": "9.72E+09",
    "Gender": "Male",
    "Age": 21,
    "CustomerRegion": "East",
    "CustomerType": "Returning",
    "ProductID": "PROD-872",
    "ProductName": "Herbal Face Mask",
    "Brand": "SilkSkin",
    "ProductCategory": "Beauty",
    "Tags": "organic,skincare",
    "Quantity": 5,
    "PricePerUnit": 4268,
    "DiscountPercentage": 12,
    "TotalAmount": 21340,
    "FinalAmount": 18779.2,
    "PaymentMethod": "UPI",
    "OrderStatus": "Cancelled",
    "DeliveryType": "Standard",
    "StoreID": "ST-015",
    "StoreLocation": "Ahmedabad",
    "SalespersonID": "EMP-7554",
    "EmployeeName": "Harsh Agarwal"
  },
  {
    "TransactionID": 2,
    "Date": "2023-02-20",
    "CustomerID": "CUST-795",
    "CustomerName": "Prerna Mehra",
    "PhoneNumber": "9.16E+09",
    "Gender": "Male",
    "Age": 19,
    "CustomerRegion": "Central",
    "CustomerType": "Returning",
    "ProductID": "PROD-545",
    "ProductName": "USB-C Charger",
    "Brand": "TechPulse",
    "ProductCategory": "Electronics",
    "Tags": "portable,wireless",
    "Quantity": 5,
    "PricePerUnit": 4626,
    "DiscountPercentage": 28,
    "TotalAmount": 23130,
    "FinalAmount": 16653.6,
    "PaymentMethod": "UPI",
    "OrderStatus": "Returned",
    "DeliveryType": "Express",
    "StoreID": "ST-006",
    "StoreLocation": "Chennai",
    "SalespersonID": "EMP-1890",
    "EmployeeName": "Ankit Tiwari"
  },
  {
    "TransactionID": 3,
    "Date": "2023-03-10",
    "CustomerID": "CUST-533",
    "CustomerName": "Arjun Das",
    "PhoneNumber": "9.62E+09",
    "Gender": "Male",
    "Age": 24,
    "CustomerRegion": "North",
    "CustomerType": "Returning",
    "ProductID": "PROD-844",
    "ProductName": "Gaming Mouse",
    "Brand": "CyberCore",
    "ProductCategory": "Electronics",
    "Tags": "portable,gadgets",
    "Quantity": 3,
    "PricePerUnit": 575,
    "DiscountPercentage": 43,
    "TotalAmount": 1725,
    "FinalAmount": 983.25,
    "PaymentMethod": "Credit Card",
    "OrderStatus": "Completed",
    "DeliveryType": "Store Pickup",
    "StoreID": "ST-038",
    "StoreLocation": "Pune",
    "SalespersonID": "EMP-5981",
    "EmployeeName": "Khushi Agarwal"
  },
  {
    "TransactionID": 4,
    "Date": "2023-02-03",
    "CustomerID": "CUST-138",
    "CustomerName": "Zoya Joshi",
    "PhoneNumber": "9.4E+09",
    "Gender": "Male",
    "Age": 60,
    "CustomerRegion": "South",
    "CustomerType": "Returning",
    "ProductID": "PROD-591",
    "ProductName": "Slim Fit Jeans",
    "Brand": "UrbanWear",
    "ProductCategory": "Clothing",
    "Tags": "casual,fashion",
    "Quantity": 1,
    "PricePerUnit": 2538,
    "DiscountPercentage": 26,
    "TotalAmount": 2538,
    "FinalAmount": 1878.12,
    "PaymentMethod": "Debit Card",
    "OrderStatus": "Returned",
    "DeliveryType": "Store Pickup",
    "StoreID": "ST-048",
    "StoreLocation": "Lucknow",
    "SalespersonID": "EMP-4266",
    "EmployeeName": "Ashmi Jain"
  },
  {
    "TransactionID": 5,
    "Date": "2023-01-25",
    "CustomerID": "CUST-983",
    "CustomerName": "Anjali Yadav",
    "PhoneNumber": "9.67E+09",
    "Gender": "Male",
    "Age": 25,
    "CustomerRegion": "North",
    "CustomerType": "Loyal",
    "ProductID": "PROD-596",
    "ProductName": "Herbal Face Mask",
    "Brand": "SilkSkin",
    "ProductCategory": "Beauty",
    "Tags": "skincare,natural",
    "Quantity": 4,
    "PricePerUnit": 4890,
    "DiscountPercentage": 44,
    "TotalAmount": 19560,
    "FinalAmount": 10953.6,
    "PaymentMethod": "UPI",
    "OrderStatus": "Completed",
    "DeliveryType": "Express",
    "StoreID": "ST-014",
    "StoreLocation": "Mumbai",
    "SalespersonID": "EMP-9553",
    "EmployeeName": "Ram Chaudh"
  },
  {
    "TransactionID": 6,
    "Date": "2023-01-30",
    "CustomerID": "CUST-533",
    "CustomerName": "Suresh Iyer",
    "PhoneNumber": "9.66E+09",
    "Gender": "Female",
    "Age": 55,
    "CustomerRegion": "North",
    "CustomerType": "Returning",
    "ProductID": "PROD-943",
    "ProductName": "Cotton T-Shirt",
    "Brand": "StreetLaye",
    "ProductCategory": "Clothing",
    "Tags": "unisex,fashion",
    "Quantity": 4,
    "PricePerUnit": 1103,
    "DiscountPercentage": 12,
    "TotalAmount": 4412,
    "FinalAmount": 3882.56,
    "PaymentMethod": "UPI",
    "OrderStatus": "Pending",
    "DeliveryType": "Express",
    "StoreID": "ST-039",
    "StoreLocation": "Mumbai",
    "SalespersonID": "EMP-3759",
    "EmployeeName": "Ashmi Jain"
  },
  {
    "TransactionID": 7,
    "Date": "2023-02-14",
    "CustomerID": "CUST-762",
    "CustomerName": "Ritika Chopra",
    "PhoneNumber": "9.1E+09",
    "Gender": "Male",
    "Age": 42,
    "CustomerRegion": "West",
    "CustomerType": "New",
    "ProductID": "PROD-248",
    "ProductName": "Bluetooth Speaker",
    "Brand": "VoltEdge",
    "ProductCategory": "Electronics",
    "Tags": "smart,gadgets",
    "Quantity": 1,
    "PricePerUnit": 4981,
    "DiscountPercentage": 17,
    "TotalAmount": 4981,
    "FinalAmount": 4134.23,
    "PaymentMethod": "Credit Card",
    "OrderStatus": "Returned",
    "DeliveryType": "Store Pickup",
    "StoreID": "ST-006",
    "StoreLocation": "Jaipur",
    "SalespersonID": "EMP-6815",
    "EmployeeName": "Khushi Agarwal"
  },
  {
    "TransactionID": 8,
    "Date": "2023-03-05",
    "CustomerID": "CUST-108",
    "CustomerName": "Mahesh Nair",
    "PhoneNumber": "9.97E+09",
    "Gender": "Male",
    "Age": 47,
    "CustomerRegion": "East",
    "CustomerType": "New",
    "ProductID": "PROD-915",
    "ProductName": "Hooded Sweatshirt",
    "Brand": "ComfortLi",
    "ProductCategory": "Clothing",
    "Tags": "fashion,casual",
    "Quantity": 1,
    "PricePerUnit": 671,
    "DiscountPercentage": 45,
    "TotalAmount": 671,
    "FinalAmount": 369.05,
    "PaymentMethod": "Credit Card",
    "OrderStatus": "Completed",
    "DeliveryType": "Store Pickup",
    "StoreID": "ST-016",
    "StoreLocation": "Kolkata",
    "SalespersonID": "EMP-6698",
    "EmployeeName": "Ashmi Jain"
  },
  {
    "TransactionID": 9,
    "Date": "2023-02-28",
    "CustomerID": "CUST-438",
    "CustomerName": "Suresh Sharma",
    "PhoneNumber": "9.32E+09",
    "Gender": "Male",
    "Age": 35,
    "CustomerRegion": "South",
    "CustomerType": "New",
    "ProductID": "PROD-747",
    "ProductName": "Bluetooth Speaker",
    "Brand": "CyberCore",
    "ProductCategory": "Electronics",
    "Tags": "smart,portable",
    "Quantity": 3,
    "PricePerUnit": 2720,
    "DiscountPercentage": 45,
    "TotalAmount": 8160,
    "FinalAmount": 4488,
    "PaymentMethod": "Cash",
    "OrderStatus": "Returned",
    "DeliveryType": "Express",
    "StoreID": "ST-032",
    "StoreLocation": "Jaipur",
    "SalespersonID": "EMP-7244",
    "EmployeeName": "Deepak Goyal"
  },
  {
    "TransactionID": 10,
    "Date": "2023-03-12",
    "CustomerID": "CUST-668",
    "CustomerName": "Ritika Joshi",
    "PhoneNumber": "9.64E+09",
    "Gender": "Female",
    "Age": 47,
    "CustomerRegion": "North",
    "CustomerType": "Loyal",
    "ProductID": "PROD-239",
    "ProductName": "Casual Kurti",
    "Brand": "StreetLaye",
    "ProductCategory": "Clothing",
    "Tags": "casual,fashion",
    "Quantity": 5,
    "PricePerUnit": 1787,
    "DiscountPercentage": 30,
    "TotalAmount": 8935,
    "FinalAmount": 6254.5,
    "PaymentMethod": "Cash",
    "OrderStatus": "Returned",
    "DeliveryType": "Express",
    "StoreID": "ST-035",
    "StoreLocation": "Mumbai",
    "SalespersonID": "EMP-6938",
    "EmployeeName": "Yash Balyan"
  }
];

// Helper functions for filtering, sorting, and pagination
function filterData(data, filters) {
  let result = [...data];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(item =>
      item.CustomerName.toLowerCase().includes(searchLower) ||
      item.PhoneNumber.toLowerCase().includes(searchLower)
    );
  }

  if (filters.customerRegions && filters.customerRegions.length > 0) {
    result = result.filter(item => filters.customerRegions.includes(item.CustomerRegion));
  }

  if (filters.genders && filters.genders.length > 0) {
    result = result.filter(item => filters.genders.includes(item.Gender));
  }

  if (filters.ageRange) {
    const { min, max } = filters.ageRange;
    result = result.filter(item => item.Age >= min && item.Age <= max);
  }

  if (filters.productCategories && filters.productCategories.length > 0) {
    result = result.filter(item => filters.productCategories.includes(item.ProductCategory));
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter(item => {
      const itemTags = item.Tags.split(',').map(t => t.trim());
      return filters.tags.some(tag => itemTags.includes(tag));
    });
  }

  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    result = result.filter(item => filters.paymentMethods.includes(item.PaymentMethod));
  }

  return result;
}

function sortData(data, sortBy = 'date', sortOrder = 'desc') {
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
      return sortOrder === 'asc' ? a.CustomerName.localeCompare(b.CustomerName) : b.CustomerName.localeCompare(a.CustomerName);
    });
  }

  return sorted;
}

function paginateData(data, page = 1, pageSize = 10) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / pageSize);

  return {
    data: paginatedData,
    pagination: {
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalItems: data.length,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all transactions
app.get('/api/sales/all', (req, res) => {
  try {
    res.json({ success: true, data: salesData });
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

    const filteredData = filterData(salesData, filters);
    const sortedData = sortData(filteredData, sortBy, sortOrder);
    const result = paginateData(sortedData, page, pageSize);

    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get filter options
app.get('/api/sales/filters', (req, res) => {
  try {
    const filters = {
      customerRegions: [...new Set(salesData.map(item => item.CustomerRegion))].sort(),
      genders: [...new Set(salesData.map(item => item.Gender))].sort(),
      productCategories: [...new Set(salesData.map(item => item.ProductCategory))].sort(),
      tags: [...new Set(salesData.flatMap(item => item.Tags.split(',').map(t => t.trim())))].sort(),
      paymentMethods: [...new Set(salesData.map(item => item.PaymentMethod))].sort()
    };
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
    const searchLower = query.toLowerCase();
    const results = salesData.filter(item =>
      item.CustomerName.toLowerCase().includes(searchLower) ||
      item.PhoneNumber.toLowerCase().includes(searchLower)
    );
    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'TruEstate Sales Management API is running' });
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

// Export for Vercel
module.exports = app;
module.exports.default = app;
