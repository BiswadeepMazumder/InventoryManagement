# API Documentation

## OrderController

### **GET /api/Order**
**Purpose:** Retrieve a list of all orders.

---

### **GET /api/Order/ViewOrderDetail/{id}**
**Purpose:** Retrieve detailed information about a specific order by ID.

---

### **POST /api/Order/CreateOrder**
**Purpose:** Create a new order with associated order items.

---

### **PUT /api/Order/CancelOrder/{id}**
**Purpose:** Cancel an existing order by updating its status and adding a cancel comment.

---

### **GET /api/Order/UpcomingOrders**
**Purpose:** Retrieve a list of upcoming orders (status indicating future fulfillment).

---

### **GET /api/Order/CurrentOrders**
**Purpose:** Retrieve a list of current orders (status indicating they are in process).

---

### **GET /api/Order/PastOrders**
**Purpose:** Retrieve a list of past orders (status indicating completion).

---

### **GET /api/Order/GenerateInvoice/{orderId}**
**Purpose:** Generate an invoice in HTML format for a specific order.

---

## ItemController

### **GET /api/Item**
**Purpose:** Retrieve a list of all items in the inventory.

---

### **GET /api/Item/lowstock**
**Purpose:** Retrieve a list of items that are low in stock.

---

### **GET /api/Item/{id}**
**Purpose:** Retrieve details of a specific item by ID.

---

### **POST /api/Item**
**Purpose:** Add a new item to the inventory.

---

### **PUT /api/Item/{id}**
**Purpose:** Update details of an existing item.

---

### **DELETE /api/Item/{id}**
**Purpose:** Delete an item from the inventory.

---

## SupplierController

### **GET /api/Supplier/suppliers**
**Purpose:** Retrieve a list of all suppliers.
