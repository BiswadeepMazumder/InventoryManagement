# Project Overview

This inventory management software is designed to help small to mid-sized businesses streamline the process of managing orders and product inventory. 
The system allows the Business Owner, Manager, or Worker to efficiently handle essential inventory tasks while providing clear, intuitive interfaces 
for order creation, modification, and product management.

---

# Project Architecture

The project is built using:
- **Frontend**: React.js
- **Backend**: .NET Core with Entity Framework
- **Database**: Azure SQL Database

This will be hosted on Azure, and managed through Azure DevOps CI/CD pipelines.

---

# System Architecture and Component Mapping

This section describes the architecture and component mappings for the Inventory Management System, which includes the Frontend (React app), Backend (.NET Core API), Azure SQL Database, and Azure DevOps CI/CD pipeline.

## Components Mapping Visualization

### 1. **Frontend (React) → Backend (API)**
- The React app uses **Axios** to send HTTP requests to the backend API.
- Each request is accompanied by an **OAuth** token for secure authentication.
- Example request: `GET /api/orders`

### 2. **Backend (.NET Core API) → Azure SQL Database**
- The .NET Core API handles business logic, processes the request, and communicates with the **Azure SQL Database** using **Entity Framework Core**.
- Example: The `OrderController` fetches all orders from the `Orders` table in the Azure SQL Database.

### 3. **CI/CD Pipeline (Azure DevOps)**
- **Azure DevOps** builds and deploys the React app and .NET Core API to their respective Azure App Services (Frontend and Backend).
- The pipeline integrates testing steps, such as unit testing and integration testing, before final deployment.

---

## Diagram Description

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
│ React App    │  ────────────────►  │  API Layer   │  ────────────────►    │  Service     │  ────────────────►     │ Azure SQL Database │
│ (Frontend)   │    (Axios + OAuth)  │ (.NET Core)  │   Controllers &       │  Layer       │   Entity Framework    │ Orders, Users, etc.│
└──────────────┘                     └──────────────┘   Repositories        └──────────────┘                       └────────────────────┘

                     ▲
                     │
    CI/CD Integration with Azure DevOps
                     │
       ┌────────────────────────────────┐
       │ Automated Build and Deployment │
       │ Frontend & Backend App Services│
       └────────────────────────────────┘