DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Candle", "Home Goods", 10.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pan", "Cookware", 29.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Uncharted 4", "Video Games", 59.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone Xs", "Personal Electronics", 1299.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grill Cover", "Outside Furniture", 29.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike", "Sporting Goods", 179.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Couch", "Furniture", 799.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Reclining Chair", "Furniture", 499.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Call of Duty 4", "Video Games", 39.99, 130);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diamond Necklace", "Jewelry", 2999.99, 50);

SELECT * FROM products;