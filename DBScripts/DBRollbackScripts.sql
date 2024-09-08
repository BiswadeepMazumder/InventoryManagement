-- Dropping the tables in reverse order of their dependencies to avoid errors

-- Rollback: Drop the ORDERITEMS table
DROP TABLE IF EXISTS OrderItems;

-- Rollback: Drop the SUPPLIERTOCATEGORY table
DROP TABLE IF EXISTS SupplierToCategory;

-- Rollback: Drop the ORDERS table
DROP TABLE IF EXISTS Orders;

-- Rollback: Drop the ITEMS table
DROP TABLE IF EXISTS Items;

-- Rollback: Drop the USER table
DROP TABLE IF EXISTS Users;

-- Rollback: Drop the SUPPLIER table
DROP TABLE IF EXISTS Supplier;

-- Rollback: Drop the CATEGORY table
DROP TABLE IF EXISTS Category;


-- Rollback script to delete the inserted rows from the Category table

DELETE FROM Category WHERE CategoryCode = 'FZ';
DELETE FROM Category WHERE CategoryCode = 'AB';
DELETE FROM Category WHERE CategoryCode = 'CH';
DELETE FROM Category WHERE CategoryCode = 'CO';
DELETE FROM Category WHERE CategoryCode = 'CK';
DELETE FROM Category WHERE CategoryCode = 'CD';
DELETE FROM Category WHERE CategoryCode = 'PP';
DELETE FROM Category WHERE CategoryCode = 'CF';
DELETE FROM Category WHERE CategoryCode = 'PS';
DELETE FROM Category WHERE CategoryCode = 'TO';
DELETE FROM Category WHERE CategoryCode = 'SU';
DELETE FROM Category WHERE CategoryCode = 'WT';
DELETE FROM Category WHERE CategoryCode = 'OD';
DELETE FROM Category WHERE CategoryCode = 'US';


-- Rollback script to delete the inserted rows from the Users table

DELETE FROM Users WHERE UserID = 'US01';
DELETE FROM Users WHERE UserID = 'US02';
DELETE FROM Users WHERE UserID = 'US03';
DELETE FROM Users WHERE UserID = 'US04';
DELETE FROM Users WHERE UserID = 'US05';
DELETE FROM Users WHERE UserID = 'US06';


-- Rollback script to delete all inserted rows from Items table

DELETE FROM Items WHERE ItemID IN (
    'CD0010', 'CD0020', 'CD0030', 'CD0040', 'CD0050', 'CD0060', 'CD0070', 'CD0080', 'CD0090', 'CD0100',
    'CD0110', 'CD0120', 'CD0130', 'CD0140', 'CD0150', 'CD0160', 'CD0170', 'CD0180', 'CD0190', 'CD0200',
    'CD0210', 'CD0220', 'CD0230', 'CD0240', 'CD0250', 'CD0260', 'CD0270', 'CD0280', 'CD0290', 'CD0300',
    'CD0310', 'CD0320', 'CD0330', 'CD0340', 'CD0350', 'CD0360', 'CD0370', 'CD0380', 'CD0390', 'CD0400',
    'CD0410', 'CD0420', 'CD0430', 'CD0440', 'CD0450', 'PS1201', 'PS1202', 'PS1203', 'PS1204', 'PS1205',
    'PS1206', 'PS1207', 'PS1208', 'PS1209', 'PS1210', 'CF9911', 'CF9912', 'CF9913', 'CF9914', 'CF9915',
    'CF9916', 'CF9917', 'CF9918', 'CF9919', 'CF9920', 'CF9921', 'CF9922', 'CF9923', 'CF9924', 'CF9925',
    'CF9926', 'CF9927', 'CF9928', 'CF9929', 'TO1001', 'TO1002', 'TO1003', 'TO1004', 'TO1005', 'TO1006',
    'TO1007', 'TO1008', 'TO1009', 'TO1010', 'TO1011', 'TO1012', 'TO1013', 'TO1014', 'TO1015', 'PP4561',
    'PP4562', 'PP4563', 'PP4564', 'PP4565', 'PP4566', 'PP4567', 'PP4568', 'PP4569', 'PP4570', 'PP4571',
    'PP4572', 'PP4573', 'PP4574', 'PP4575', 'PP4576', 'PP4577', 'PP4578', 'PP4579', 'PP4580', 'WT0001',
    'WT0002', 'WT0003', 'WT0004', 'WT0005', 'AB2001', 'AB2002', 'AB2003', 'AB2004', 'AB2005', 'AB2006',
    'AB2007', 'AB2008', 'AB2009', 'AB2010', 'AB2011', 'AB2012', 'AB2013', 'AB2014', 'AB2015', 'AB2016',
    'AB2017', 'AB2018', 'AB2019', 'AB2020'
);


-- Rollback script to delete the inserted rows from SupplierToCategory table

DELETE FROM SupplierToCategory WHERE CategoryCode = 'FZ' AND SupplierID = 'SUP9010';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'BR' AND SupplierID = 'SUP9060';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'CH' AND SupplierID = 'SUP9080';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'CO' AND SupplierID = 'SUP9010';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'CK' AND SupplierID = 'SUP9070';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'CD' AND SupplierID = 'SUP9070';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'PP' AND SupplierID = 'SUP9030';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'CF' AND SupplierID = 'SUP9060';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'PS' AND SupplierID = 'SUP9050';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'TO' AND SupplierID = 'SUP9050';
DELETE FROM SupplierToCategory WHERE CategoryCode = 'WT' AND SupplierID = 'SUP9030';


-- Rollback script to delete the inserted rows from OrderItems table

DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'BR002007';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'FZ006130';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'PP4580';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CH81210';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'FZ006080';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CH80510';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'TO1013';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'PP4577';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'PP4576';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'FZ006090';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CH80710';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CH80210';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CD0030';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'WT0003';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CO9802';
DELETE FROM OrderItems WHERE OrderID = 'OD240910' AND ItemID = 'CH81010';

-- Rollback script to delete the inserted rows from Orders table

DELETE FROM Orders WHERE OrderID = 'OD240910';
DELETE FROM Orders WHERE OrderID = 'OD240911';
DELETE FROM Orders WHERE OrderID = 'OD240912';
DELETE FROM Orders WHERE OrderID = 'OD240913';
DELETE FROM Orders WHERE OrderID = 'OD240914';
DELETE FROM Orders WHERE OrderID = 'OD240915';
