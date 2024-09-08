## Project Overview

This inventory management software is designed to help small to mid-sized businesses streamline the process of managing orders and product inventory. 
The system allows the Business Owner, Manager, or Worker to efficiently handle essential inventory tasks while providing clear, intuitive interfaces 
for order creation, modification, and product management.


## Project Architechture

Reeact.js + .net core entity framework + azure sql server. 
This will be hosted on azure.

## Entity Mapping Visual Representation


Here’s the visual representation of the entity and table mapping for the project:

```plaintext
┌──────────────┐        ┌───────────────┐        ┌───────────────┐        ┌─────────────┐
│  Category    │        │   Supplier    │        │    Users      │        │   Orders    │
└─────┬────────┘        └─────┬─────────┘        └─────┬─────────┘        └─────┬───────┘
      │                       │                        │                        │
      ▼                       ▼                        │                        │
┌─────────────┐        ┌──────────────┐                │                        ▼
│   Items     │        │SupplierToCat │                └────────────┐    ┌────────────┐
└─────┬───────┘        └─────┬────────┘                             │    │ OrderItems │
      │                      │                                      ▼    └────────────┘
      │                      ▼                                ┌────────────┐
      └──────────────────────────────────────────────────────►│   Orders   │
                                                              └────────────┘

