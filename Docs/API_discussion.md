# API Endpoints Overview

This document outlines the available API endpoints for managing orders, viewing order details, handling the product inventory, and providing data for the dashboard in the Inventory Management System.

---

## 1. Order Management

- **POST /api/orders**:  
  Creates a new upcoming order.

- **PUT /api/orders/{id}**:  
  Modifies an existing order by `Order ID`.

- **DELETE /api/orders/{id}**:  
  Removes an order from the inventory by `Order ID`.

---

## 2. Order Details Viewing

- **GET /api/orders**:  
  Retrieves a list of all orders, both upcoming and previous.

- **GET /api/orders/upcoming**:  
  Retrieves a list of upcoming orders.

- **GET /api/orders/{id}**:  
  Retrieves details of a specific order by `Order ID`.

- **GET /api/orders/previous**:  
  Retrieves a list of previous orders.

---

## 3. Product List Management

- **POST /api/products**:  
  Adds a new product to the inventory.

- **DELETE /api/products/{id}**:  
  Removes a product from the inventory by `Product ID`.

- **GET /api/products**:  
  Retrieves a list of all products in the inventory.

- **PUT /api/products/{id}**:  
  Updates product information such as price, stock, etc., by `Product ID`.

---

## 4. Dashboard and Home Screen

- **GET /api/dashboard/orders**:  
  Retrieves an overview of previous and upcoming orders for the dashboard.

- **GET /api/dashboard/top-products**:  
  Retrieves data for the top-selling products for the chart.

- **GET /api/dashboard/low-products**:  
  Retrieves data for the lowest-selling products for the chart.

---

## Total API Endpoints Breakdown

- **Order Management**: 3 endpoints
- **Order Details Viewing**: 4 endpoints
- **Product List Management**: 4 endpoints
- **Dashboard and Home Screen**: 3 endpoints

---

## Total: 14 API Endpoints
