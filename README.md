# Project Overview

This inventory management software is designed to help small to mid-sized businesses streamline the process of managing orders and product inventory. 
The system allows the Business Owner, Manager, or Worker to efficiently handle essential inventory tasks while providing clear, intuitive interfaces 
for order creation, modification, and product management.

**Website**: https://inventory-management-frontend-chi.vercel.app/

**Demo Account**
```
Email: test@gmail.com
Password: 123456
```

---

# Project Architecture

The project is built using:
- **Frontend**: Next.js
- **Backend**: .NET Core with Entity Framework
- **Database**: Azure SQL Database

This will be hosted on Azure, and managed through Azure DevOps CI/CD pipelines.

---

# System Architecture and Component Mapping

This section describes the architecture and component mappings for the Inventory Management System, which includes the Frontend (Next.js app), Backend (.NET Core API), Azure SQL Database, and Azure DevOps CI/CD pipeline.

## Components Mapping Visualization

### 1. **Frontend (React) → Backend (API)**
- The React app uses **Axios** to send HTTP requests to the backend API.
- Each request is accompanied by an **FireBase** token for secure authentication.
- Example request: `GET /api/orders`

### 2. **Backend (.NET Core API) → Azure SQL Database**
- The .NET Core API handles business logic, processes the request, and communicates with the **Azure SQL Database** using **Entity Framework Core**.
- Example: The `OrderController` fetches all orders from the `Orders` table in the Azure SQL Database.

### 3. **CI/CD Pipeline (Azure DevOps)**
- **Azure DevOps** builds and deploys the React app and .NET Core API to their respective Azure App Services (Frontend and Backend).
- The pipeline integrates testing steps, such as unit testing and integration testing, before final deployment.

---

## System Description

### 1. **React Frontend**:
- User interacts with the UI, and Axios makes HTTP requests to the backend.
- This communication uses **OAuth** for authentication and authorization.

### 2. **API Layer**:
- The API is hosted on an Azure cloud server.
- Requests from the frontend are routed through **controllers** that process the request and delegate business logic to the service layer.

### 3. **Service Layer**:
- Applies business rules and logic.
- Calls the repository layer to fetch or update data from the database.

### 4. **Repository and Entity Framework**:
- The repository interacts with the database using **Entity Framework** to perform CRUD operations.

### 5. **Azure SQL Database**:
- All the data is stored here, including orders, users, products, and categories.

### 6. **CI/CD Integration with Azure DevOps**:
- **Azure DevOps pipelines** handle the automation of builds, testing, and deployments. When code is pushed to staging or main branches, Azure DevOps triggers the pipeline to deploy updates.

---

## Visual Representation of System Architecture
```plaintext
┌──────────────┐    HTTP Requests    ┌──────────────┐    Business Logic     ┌──────────────┐    CRUD Operations    ┌────────────────────┐
│ React App    │  ────────────────►  │  API Layer   │  ────────────────►    │  Service     │  ────────────────►    │ Azure SQL Database │
│ (Frontend)   │    (Axios)          | (.NET Core)  │   Controllers &       │  Layer       │   Entity Framework    │ Orders, Users, etc.│
└──────────────┘                     └──────────────┘   Repositories        └──────────────┘                       └────────────────────┘

                     ▲
                     │
    CI/CD Integration with Azure DevOps
                     │
       ┌────────────────────────────────┐
       │ Automated Build and Deployment │
       │ Frontend & Backend App Services│
       └────────────────────────────────┘

```

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


# Database Schema and Entity Relationship Explanation

This document explains how the various tables in the database are connected, detailing the relationships, primary keys, foreign keys, and the flow of data between them.

## Tables and Their Relationships

### 1. **Category Table**
- **Primary Key**: `CategoryCode`
- **Related To**:
  - The `Items` table via the `CategoryCode` foreign key.
  - The `SupplierToCategory` table via the `CategoryCode` foreign key.
- **Explanation**: Categories represent different classifications of items (e.g., Food, Beverage, etc.). Each item belongs to a category, and each supplier may supply items in a specific category.

### 2. **Supplier Table**
- **Primary Key**: `SupplierID`
- **Related To**:
  - The `SupplierToCategory` table via the `SupplierID` foreign key.
- **Explanation**: The supplier stores information about the vendors who provide goods to the store. Each supplier can provide items in multiple categories, as shown by the `SupplierToCategory` relationship.

### 3. **Users Table**
- **Primary Key**: `UserID`
- **Related To**:
  - The `Orders` table via the `UserID` foreign key.
- **Explanation**: Users represent individuals who interact with the system, such as business owners, managers, and workers. Each order is associated with a specific user (e.g., the manager placing an order or the owner approving an order).

### 4. **Items Table**
- **Primary Key**: `ItemID`
- **Related To**:
  - The `Category` table via the `CategoryCode` foreign key.
  - The `OrderItems` table via the `ItemID` foreign key.
- **Explanation**: Items represent individual products or goods being ordered, stored, and managed. Each item is part of a category. Items are included in orders, and their relationship to the order is maintained in the `OrderItems` table.

### 5. **Orders Table**
- **Primary Key**: `OrderID`
- **Related To**:
  - The `Users` table via the `UserID` foreign key.
  - The `OrderItems` table via the `OrderID` foreign key.
- **Explanation**: Orders represent the transaction of goods either being placed or fulfilled. Each order is placed by a specific user and contains multiple items.

### 6. **SupplierToCategory Table**
- **Composite Primary Key**: (`CategoryCode`, `SupplierID`)
- **Related To**:
  - The `Category` table via the `CategoryCode` foreign key.
  - The `Supplier` table via the `SupplierID` foreign key.
- **Explanation**: This table manages the relationship between suppliers and categories they supply.

### 7. **OrderItems Table**
- **Composite Primary Key**: (`OrderID`, `ItemID`, `OrderDate`)
- **Related To**:
  - The `Orders` table via the `OrderID` foreign key.
  - The `Items` table via the `ItemID` foreign key.
- **Explanation**: This table represents the items that belong to a specific order. Each order contains multiple items, and each item is tracked individually by quantity, total price, and status.

## Data Flow Between Tables (Relationships)

1. **Category ↔ Items**
   - **One-to-Many**: Each item belongs to a specific category, and the `CategoryCode` in the `Items` table references the `CategoryCode` in the `Category` table.
   
2. **Supplier ↔ SupplierToCategory**
   - **Many-to-Many**: A supplier can supply items in multiple categories, and each category can have multiple suppliers. This is managed via the `SupplierToCategory` table.
   
3. **Users ↔ Orders**
   - **One-to-Many**: Each user can place multiple orders, but each order is associated with only one user.

4. **Orders ↔ OrderItems**
   - **One-to-Many**: Each order contains multiple items, and the `OrderID` in the `OrderItems` table references the `OrderID` in the `Orders` table.

5. **Items ↔ OrderItems**
   - **One-to-Many**: Each item can appear in multiple orders. The `ItemID` in the `OrderItems` table references the `ItemID` in the `Items` table.

6. **SupplierToCategory ↔ Category & Supplier**
   - **Many-to-Many**: The `SupplierToCategory` table manages the relationship between suppliers and categories. 

## Visual Representation of Entity Relationships

```plaintext
┌──────────────┐        ┌───────────────┐        ┌───────────────┐        ┌─────────────┐
│  Category    │        │   Supplier    │        │    Users      │        │   Orders     │
└─────┬────────┘        └─────┬─────────┘        └─────┬─────────┘        └─────┬───────┘
      │                       │                        │                       │
      ▼                       ▼                        │                       │
┌─────────────┐        ┌──────────────┐                │                       ▼
│   Items     │        │SupplierToCat │                └────────────┐    ┌────────────┐
└─────┬───────┘        └─────┬────────┘                             │    │ OrderItems │
      │                      │                                      ▼    └────────────┘
      │                      ▼                                ┌────────────┐
      └──────────────────────────────────────────────────────►│   Orders   │
                                                              └────────────┘

```

# How to START the Frontend of the application.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3020](http://localhost:300) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resource


# How to START the Backend WebAPI of the application.

### Download the github repository

### Copy the contents of the Backend branch to a folder called backend.

### Now navigate to the API folder under the backend folder. 

    cd backend/API

### Download the required .NET SDKs and NODE for your system. 
    (https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### Restore the project dependencies:

    DOTNET RESTORE

### Then BUILD and RUN the backend.

    DOTNET BUILD
    DOTNET RUN

###  Your backend is now live on localhost:5236.

###  API endpoints can be accessed at : localhost:5236/swagger/index.html
