# Project Overview

This inventory management software is designed to help small to mid-sized businesses streamline the process of managing orders and product inventory. 
The system allows the Business Owner, Manager, or Worker to efficiently handle essential inventory tasks while providing clear, intuitive interfaces 
for order creation, modification, and product management.


# Project Architechture

Reeact.js + .net core entity framework + azure sql server. 
This will be hosted on azure.



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
│  Category    │        │   Supplier    │        │    Users      │        │   Orders    │
└─────┬────────┘        └─────┬─────────┘        └─────┬─────────┘        └─────┬───────┘
      │                       │                        │                        │
      ▼                       ▼                        │                        │
┌─────────────┐        ┌──────────────┐                │                        ▼
│   Items     │        │SupplierToCat │                └────────────┐    ┌────────────┐
└─────┬───────┘        └─────┬────────┘                             │    │ OrderItems │
      │                      |                                      ▼    └────────────┘
      │                      ▼                                ┌────────────┐
      └──────────────────────────────────────────────────────►│   Orders   │
                                                              └────────────┘
