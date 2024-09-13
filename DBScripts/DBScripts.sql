
------********  Table Creation  ********------

-- Creating the CATEGORY table
CREATE TABLE Category (
    CategoryName VARCHAR(20),  -- Category name
    CategoryCode VARCHAR(2) PRIMARY KEY,  -- primary key for category
    Status INT CHECK (Status IN (0, 1)) 
);

-- Creating the SUPPLIER table
CREATE TABLE Supplier (
    SupplierID VARCHAR(7) PRIMARY KEY,  -- Primary key for Supplier
    SupplierName VARCHAR(100),  
    SupplierAddress VARCHAR(100),  
    SupplierCity VARCHAR(20),  
    SupplierZipCode NUMERIC(5), 
    SupplierPhoneNumber NUMERIC(10),  
    SupplierLastOrderDate DATETIME,  -- Last order received date from the supplier
    Status INT CHECK (Status IN (0, 1))  
);

-- Creating the USER table
CREATE TABLE Users (
    UserID VARCHAR(7) PRIMARY KEY, 
    UserName VARCHAR(20), 
    UserDescription VARCHAR(20), 
    UserRole INT CHECK (UserRole IN (1, 2, 3)), 
    Status INT CHECK (Status IN (0, 1)) 
);

-- Creating the ITEMS table
CREATE TABLE Items (
    ItemID VARCHAR(7) PRIMARY KEY,  -- Primary key for Items
    ItemName VARCHAR(20), 
    ItemUnitPrice DECIMAL(3,2), 
    CurrentStock INT CHECK (CurrentStock <= 200),  -- Maximum stock count to order at a time is 200
    Status INT CHECK (Status IN (0, 1, 2, 3, 4, 5)),  
    CategoryCode VARCHAR(2),  -- Foreign key referencing Category table
    FOREIGN KEY (CategoryCode) REFERENCES Category(CategoryCode)  -- CategoryCode in Items references CategoryCode in Category
);

-- Creating the ORDER table
CREATE TABLE Orders (
    OrderID VARCHAR(7) PRIMARY KEY,  -- Primary key for Orders
    OrderDate DATETIME, 
    OrderName VARCHAR(20),  
    UserID VARCHAR(7),  -- Foreign key referencing User table
    OrderAmount DECIMAL(10,2), 
    OrderStatus INT CHECK (OrderStatus IN (0, 1, 2, 3, 4, 5)), 
    CancelComment VARCHAR(550),  
    FOREIGN KEY (UserID) REFERENCES [User](UserID)  -- UserID in Orders references UserID in User
);

/*
ORDERSTATUS INFORMATION

ORDERSTATUS    DESCRIPTION
0              ORDER CANCELLED
1              ORDER PLACED
2              ORDER ACCEPTED BY SUPPLIER
3              ORDER READY
4              ORDER IN TRANSIT
5              ORDER DELIVERED

NOTE: NO UPDATES CAN BE DONE ONCE THE ORDER STATUS IS "3".
*/


-- Creating the SUPPLIERTOCATEGORY table
CREATE TABLE SupplierToCategory (
    CategoryCode VARCHAR(2),  
    SupplierID VARCHAR(7),  
    Status INT CHECK (Status IN (0, 1)),  
    PRIMARY KEY (CategoryCode, SupplierID),  -- Composite primary key (CategoryCode, SupplierID)
    FOREIGN KEY (CategoryCode) REFERENCES Category(CategoryCode),  -- CategoryCode in SupplierToCategory references CategoryCode in Category
    FOREIGN KEY (SupplierID) REFERENCES Supplier(SupplierID)  -- SupplierID in SupplierToCategory references SupplierID in Supplier
);

-- Creating the ORDERITEMS table
CREATE TABLE OrderItems (
    OrderID VARCHAR(7),  -- Foreign key referencing Orders table
    ItemID VARCHAR(7),  -- Foreign key referencing Items table
    OrderDate DATETIME,  
    ItemCount INT CHECK (ItemCount <= 200),  
    ItemName VARCHAR(20),  
    TotalPrice DECIMAL(10,2),  
    OrderStatus VARCHAR(20),  
    PRIMARY KEY (OrderID, ItemID, OrderDate),  -- Composite primary key (OrderID, ItemID, OrderDate)
    FOREIGN KEY (ItemID) REFERENCES Items(ItemID),  -- ItemID in OrderItems references ItemID in Items
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)  -- OrderID in OrderItems references OrderID in Orders
);



------********  Data Entry  ********------

-- Inserting data into Category table

INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('FROZEN FOOD', 'FZ', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('ALCOHOLIC BEVERAGE', 'AB', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('CHIPS', 'CH', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('COOKIE', 'CO', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('CAKE', 'CK', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('Candy', 'CD', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('pop', 'PP', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('can food', 'CF', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('Pet Supply', 'PS', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('Toiletry', 'TO', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('SUPPLIER', 'SU', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('Water', 'WT', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('Orders', 'OD', 1);
INSERT INTO Category (CategoryName, CategoryCode, Status) VALUES ('Users', 'US', 1);

-- Inserting all values into Items table

INSERT INTO Items (ItemID, ItemName, ItemUnitPrice, CurrentStock, Status, CategoryCode) VALUES
('CD0010', 'Reese Peanut Butter Cups', 2, 345, 1, 'CD'),
('CD0020', 'Reese Take 5', 2, 546, 1, 'CD'),
('CD0030', 'Reese Nutrageous', 2, 213, 1, 'CD'),
('CD0040', 'Reese Medals', 2, 645, 1, 'CD'),
('CD0050', 'Reese Pieces', 2, 567, 1, 'CD'),
('CD0060', 'Reese Fastbreak', 2, 789, 1, 'CD'),
('CD0070', 'Reese Sticks', 2, 243, 1, 'CD'),
('CD0080', 'Hersey Mr Goodboy', 2, 755, 1, 'CD'),
('CD0090', 'Hersey Cookie Cream', 2, 435, 1, 'CD'),
('CD0100', 'Hersey Milk Chocolate', 2, 756, 1, 'CD'),
('CD0110', 'Hersey Almonds Chocolate', 2, 438, 1, 'CD'),
('CD0120', 'Twix', 2, 675, 1, 'CD'),
('CD0130', 'Snicker', 2, 234, 1, 'CD'),
('CD0140', 'Snicker Almont', 2, 789, 1, 'CD'),
('CD0150', 'Twis Caramel', 2, 546, 1, 'CD'),
('CD0160', 'Butterfinger', 2, 876, 1, 'CD'),
('CD0170', 'Milkyway', 2, 345, 1, 'CD'),
('CD0180', 'M&M peanuts', 2, 869, 1, 'CD'),
('CD0190', 'M&M Chocolate', 2, 374, 1, 'CD'),
('CD0200', 'Twizzlers', 2, 587, 1, 'CD'),
('CD0210', 'Crunch', 2, 345, 1, 'CD'),
('CD0220', 'Chunky', 2, 546, 1, 'CD'),
('CD0230', 'Heath Bar', 2, 213, 1, 'CD'),
('CD0240', 'Payday', 2, 645, 1, 'CD'),
('CD0250', 'Kitkat', 2, 567, 1, 'CD'),
('CD0260', 'Kitkat white', 2, 789, 1, 'CD'),
('CD0270', 'Mounds', 2, 243, 1, 'CD'),
('CD0280', 'Almond Joy', 2, 755, 1, 'CD'),
('CD0290', 'Tutles', 2, 435, 1, 'CD'),
('CD0300', 'Skittles Blue', 2, 756, 1, 'CD'),
('CD0310', 'Skittles Green', 2, 438, 1, 'CD'),
('CD0320', 'Skittles Red', 2, 675, 1, 'CD'),
('CD0330', 'Mamba', 2, 234, 1, 'CD'),
('CD0340', 'Sour Punch', 2, 789, 1, 'CD'),
('CD0350', 'Kinder Bueno', 2, 546, 1, 'CD'),
('CD0360', 'Airheads', 2, 876, 1, 'CD'),
('CD0370', 'Swedish fish', 2, 345, 1, 'CD'),
('CD0380', 'Life Savers', 2, 869, 1, 'CD'),
('CD0390', 'Dot', 2, 374, 1, 'CD'),
('CD0400', 'Mentos', 2, 587, 1, 'CD'),
('CD0410', 'Welches', 2, 546, 1, 'CD'),
('CD0420', 'Trollis', 2, 876, 1, 'CD'),
('CD0430', 'Pop Tart', 2, 345, 1, 'CD'),
('CD0440', 'Haribo', 2, 869, 1, 'CD'),
('CD0450', 'Gummy Bear', 2, 374, 1, 'CD'),
('PS1201', 'Cat Food Can', 5, 324, 1, 'PS'),
('PS1202', 'Cat Food Bags', 5, 435, 1, 'PS'),
('PS1203', 'Dog Food Can', 5, 213, 1, 'PS'),
('PS1204', 'Dog Food Bag', 5, 234, 1, 'PS'),
('PS1205', 'Cat Litter', 5, 765, 1, 'PS'),
('PS1206', 'Dog Litter', 5, 879, 1, 'PS'),
('PS1207', 'Fish Food', 5, 897, 1, 'PS'),
('PS1208', 'Rabbit Food', 5, 234, 1, 'PS'),
('PS1209', 'Litter Box', 20, 980, 1, 'PS'),
('PS1210', 'Pet Waste Trash Bag', 10, 976, 1, 'PS'),
('CF9911', 'Tuna', 3, 324, 1, 'CF'),
('CF9912', 'Sardines', 3, 243, 1, 'CF'),
('CF9913', 'Vienna Sausage', 3, 635, 1, 'CF'),
('CF9914', 'Chicken Broth', 3, 657, 1, 'CF'),
('CF9915', 'Chopped Spinach', 3, 789, 1, 'CF'),
('CF9916', 'Sweet Corn', 4, 451, 1, 'CF'),
('CF9917', 'Chicken Noodles', 2, 456, 1, 'CF'),
('CF9918', 'Chili Beans', 6, 908, 1, 'CF'),
('CF9919', 'Beef Gravy', 2, 120, 1, 'CF'),
('CF9920', 'Turkey Gravy', 8, 976, 1, 'CF'),
('CF9921', 'Black Beans', 3, 564, 1, 'CF'),
('CF9922', 'Condensed Milk', 8, 687, 1, 'CF'),
('CF9923', 'Ravioli', 9, 534, 1, 'CF'),
('CF9924', 'Sphageti', 5, 675, 1, 'CF'),
('CF9925', 'Calm Chowder', 2, 641, 1, 'CF'),
('CF9926', 'Beefaroni', 9, 437, 1, 'CF'),
('CF9927', 'Cut Beans', 2, 435, 1, 'CF'),
('CF9928', 'Tomato Puree', 6, 786, 1, 'CF'),
('CF9929', 'Spam', 2, 213, 1, 'CF'),
('TO1001', 'Dove Soap', 3, 456, 1, 'TO'),
('TO1002', 'Irish Soap', 3, 654, 1, 'TO'),
('TO1003', 'Rubbing Alcohol', 5, 765, 1, 'TO'),
('TO1004', 'Shower Gel', 5, 876, 1, 'TO'),
('TO1005', 'Shampoo', 5, 324, 1, 'TO'),
('TO1006', 'Shaving Gel', 5, 756, 1, 'TO'),
('TO1007', 'Hair Gel', 4, 236, 1, 'TO'),
('TO1008', 'Paper Roll', 3, 453, 1, 'TO'),
('TO1009', 'Toilet Paper', 2, 897, 1, 'TO'),
('TO1010', 'Handwash', 2, 326, 1, 'TO'),
('TO1011', 'Drain Cleaner', 5, 789, 1, 'TO'),
('TO1012', 'Scrub Daddy', 3, 543, 1, 'TO'),
('TO1013', 'Hand Sanitzers', 4, 456, 1, 'TO'),
('TO1014', 'Face Tissue', 2, 453, 1, 'TO'),
('TO1015', 'Table Napkins', 3, 87, 1, 'TO'),
('PP4561', 'SPRITE LIME', 4, 324, 1, 'PP'),
('PP4562', 'SPRITE CHERRY', 4, 243, 1, 'PP'),
('PP4563', 'SPRITE', 4, 635, 1, 'PP'),
('PP4564', 'Coco Cola Cherry', 4, 657, 1, 'PP'),
('PP4565', 'CocoCola Zero', 4, 789, 1, 'PP'),
('PP4566', 'Coco Cola Spice', 4, 451, 1, 'PP'),
('PP4567', 'CocoCola Black', 4, 456, 1, 'PP'),
('PP4568', 'Fanta Orange', 4, 908, 1, 'PP'),
('PP4569', 'Fanta Cherry', 4, 120, 1, 'PP'),
('PP4570', 'Fanta Pineapple', 4, 976, 1, 'PP'),
('PP4571', 'Pepsi Zero', 4, 564, 1, 'PP'),
('PP4572', 'Pepsi Cherry', 4, 687, 1, 'PP'),
('PP4573', 'Pepsi Peach', 4, 534, 1, 'PP'),
('PP4574', 'Pepsi', 4, 675, 1, 'PP'),
('PP4575', 'Canada Dry Ginger Ale', 4, 641, 1, 'PP'),
('PP4576', 'Minutemaid Lemonade', 4, 437, 1, 'PP'),
('PP4577', 'Brisk Ice Tea', 4, 435, 1, 'PP'),
('PP4578', 'Mountain Dew', 4, 786, 1, 'PP'),
('PP4579', 'Seven Up', 4, 213, 1, 'PP'),
('PP4580', 'Dr Pepper', 4, 456, 1, 'PP'),
('WT0001', 'Zen', 2, 423, 1, 'WT'),
('WT0002', 'Evian', 3, 657, 1, 'WT'),
('WT0003', 'Aquafina', 3, 534, 1, 'WT'),
('WT0004', 'Fuji', 5, 876, 1, 'WT'),
('WT0005', 'Dasani', 2, 987, 1, 'WT'),
('AB2001', 'Orange beer', 7, 324, 1, 'AB'),
('AB2002', 'Grape Beer', 8, 243, 1, 'AB'),
('AB2003', 'Cherry Beer', 9, 635, 1, 'AB'),
('AB2004', 'Apple Beer', 7, 657, 1, 'AB'),
('AB2005', 'Mango Beer', 8, 789, 1, 'AB'),
('AB2006', 'Peach Beer', 9, 451, 1, 'AB'),
('AB2007', 'Kiwi Beer', 7, 456, 1, 'AB'),
('AB2008', 'lemon Beer', 8, 908, 1, 'AB'),
('AB2009', 'Berry Beer', 9, 120, 1, 'AB'),
('AB2010', 'Strawberry Beer', 7, 976, 1, 'AB'),
('AB2011', 'Raspberry Beer', 8, 564, 1, 'AB'),
('AB2012', 'Watermelon Beer', 9, 687, 1, 'AB'),
('AB2013', 'Pineapple Beer', 7, 534, 1, 'AB'),
('AB2014', 'Fruit Punch Beer', 8, 675, 1, 'AB'),
('AB2015', 'Tropical Beer', 9, 641, 1, 'AB'),
('AB2016', 'Green Apple Wine', 7, 437, 1, 'AB'),
('AB2017', 'Grape Wine', 8, 435, 1, 'AB'),
('AB2018', 'Cherry Wine', 9, 786, 1, 'AB'),
('AB2019', 'Red Wine', 7, 213, 1, 'AB'),
('AB2020', 'White Wine', 9, 456, 1, 'AB');



-- Inserting data into SupplierToCategory table

INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('FZ', 'SUP9010', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('BR', 'SUP9060', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('CH', 'SUP9080', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('CO', 'SUP9010', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('CK', 'SUP9070', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('CD', 'SUP9070', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('PP', 'SUP9030', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('CF', 'SUP9060', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('PS', 'SUP9050', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('TO', 'SUP9050', 1);
INSERT INTO SupplierToCategory (CategoryCode, SupplierID, Status) VALUES ('WT', 'SUP9030', 1);


-- Inserting data into OrderItems table

INSERT INTO OrderItems (OrderID, ItemID, OrderDate, ItemCount, ItemName, TotalPrice, OrderStatus) VALUES
('OD240910', 'BR002007', '2024-08-01', 324, 'Kiwi Beer', 7240, 4),
('OD240910', 'FZ006130', '2024-08-01', 456, 'Gyros', 9915, 4),
('OD240910', 'PP4580', '2024-08-01', 50, 'Dr Pepper', 336, 4),
('OD240910', 'CH81210', '2024-08-01', 234, 'Ruffles Classic', 4941, 4),
('OD240910', 'FZ006080', '2024-08-01', 786, 'Meat balls', 17598, 4),
('OD240910', 'CH80510', '2024-08-01', 678, 'Lays Honey', 15021, 4),
('OD240910', 'TO1013', '2024-08-01', 876, 'Hand Sanitizers', 19365, 4),
('OD240910', 'PP4577', '2024-08-01', 50, 'Brisk Ice Tea', 639, 4),
('OD240910', 'PP4576', '2024-08-01', 50, 'Minutemaid Lemonade', 1125, 4),
('OD240910', 'FZ006090', '2024-08-01', 345, 'Shepard pie', 7762.5, 4),
('OD240910', 'CH80710', '2024-08-01', 789, 'Cheetos Puff', 17752.5, 4),
('OD240910', 'CH80210', '2024-08-01', 324, 'Lays Classic', 363, 4),
('OD240910', 'CD0030', '2024-08-01', 87, 'Reese Nutrageous', 126, 4),
('OD240910', 'WT0003', '2024-08-01', 234, 'Aquafina', 273, 4),
('OD240910', 'CO9802', '2024-08-01', 345, 'Grandma Choco Cookie', 7762.5, 4),
('OD240910', 'CH81010', '2024-08-01', 486, 'Cheetos Hot Fries', 10935, 4);



-- Inserting data into Orders table

INSERT INTO Orders (OrderID, OrderDate, OrderName, UserID, OrderAmount, OrderStatus, CancelComment) VALUES
('OD240910', '2024-08-01', 'AUG_01', 2, 234234, 4, NULL),
('OD240911', '2024-08-10', 'AUG_02', 1, 67567, 3, NULL),
('OD240912', '2024-08-20', 'AUG_03', 1, 87676, 2, NULL),
('OD240913', '2024-08-25', 'AUG_04', 2, 870879, 1, NULL),
('OD240914', '2024-09-01', 'SEPT_01', 1, 523452, 0, 'CANCEL COMMENTS'),
('OD240915', '2024-09-02', 'SEPT_02', 1, 453455, 1, NULL);

-- Inserting data into Users table

INSERT INTO Users (UserID, UserName, UserDescription, UserRole, Status) VALUES ('US01', 'Brian', 'Owner', 1, 1);
INSERT INTO Users (UserID, UserName, UserDescription, UserRole, Status) VALUES ('US02', 'Poom', 'Owner', 1, 1);
INSERT INTO Users (UserID, UserName, UserDescription, UserRole, Status) VALUES ('US03', 'Uday', 'Owner', 1, 1);
INSERT INTO Users (UserID, UserName, UserDescription, UserRole, Status) VALUES ('US04', 'Owner', 'Owner', 1, 1);
INSERT INTO Users (UserID, UserName, UserDescription, UserRole, Status) VALUES ('US05', 'Manager', 'Manager', 2, 1);
INSERT INTO Users (UserID, UserName, UserDescription, UserRole, Status) VALUES ('US06', 'Worker', 'Worker', 3, 1);
