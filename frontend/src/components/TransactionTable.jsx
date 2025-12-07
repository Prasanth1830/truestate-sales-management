// src/components/TransactionTable.jsx
import React from 'react';
import '../styles/TransactionTable.css';
import { formatCurrency, formatDate } from '../utils/filterUtils';

export const TransactionTable = ({ data, loading, error }) => {
  if (error) {
    return (
      <div className="transaction-table">
        <div className="error-message">Error loading data: {error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="transaction-table">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="transaction-table">
        <div className="no-results">No transactions found. Try adjusting your filters.</div>
      </div>
    );
  }

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, index) => (
            <tr key={`${transaction.TransactionID}-${index}`} className="transaction-row">
              <td>{formatDate(transaction.Date)}</td>
              <td>{transaction.CustomerName}</td>
              <td>{transaction.PhoneNumber}</td>
              <td>{transaction.ProductName}</td>
              <td>{transaction.ProductCategory}</td>
              <td className="quantity">{transaction.Quantity}</td>
              <td>{formatCurrency(transaction.PricePerUnit)}</td>
              <td>{transaction.DiscountPercentage}%</td>
              <td className="final-amount">{formatCurrency(transaction.FinalAmount)}</td>
              <td>{transaction.PaymentMethod}</td>
              <td>
                <span className={`status-badge status-${transaction.OrderStatus.toLowerCase()}`}>
                  {transaction.OrderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
